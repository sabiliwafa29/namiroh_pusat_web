#!/usr/bin/env bash
set -euo pipefail

# Deploy script for Hostinger Single Hosting + API subdomain.
# Expected project layout:
# - Repo clone: /home/USER/namiroh_pusat_web
# - Laravel source: /home/USER/namiroh_pusat_web/api_namiroh
# - React source: /home/USER/namiroh_pusat_web/dashboard_namiroh
# - Main domain web root: /home/USER/public_html
# - API subdomain web root: /home/USER/domains/api.example.com/public_html

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$ROOT_DIR/api_namiroh"
WEB_DIR="$ROOT_DIR/dashboard_namiroh"
MAIN_PUBLIC="${MAIN_PUBLIC:-$HOME/public_html}"
API_DOMAIN="${API_DOMAIN:-api.example.com}"
API_PUBLIC="${API_PUBLIC:-$HOME/domains/$API_DOMAIN/public_html}"
BRANCH="${1:-main}"
SKIP_FRONTEND="${SKIP_FRONTEND:-0}"

sync_dir() {
  local src="$1"
  local dst="$2"

  mkdir -p "$dst"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$src" "$dst"
  else
    rm -rf "$dst"/*
    cp -a "$src". "$dst"/
  fi
}

printf "[0/8] Checking runtime dependencies\n"
command -v php >/dev/null 2>&1 || { echo "php is required"; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "composer is required"; exit 1; }
if [ "$SKIP_FRONTEND" != "1" ]; then
  command -v npm >/dev/null 2>&1 || { echo "npm is required (or set SKIP_FRONTEND=1)"; exit 1; }
fi
php -r 'exit(version_compare(PHP_VERSION, "8.3.0", ">=") ? 0 : 1);' || {
  echo "PHP 8.3+ is required";
  exit 1;
}

printf "[1/8] Updating repository branch %s\n" "$BRANCH"
cd "$ROOT_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

printf "[2/8] Installing Laravel dependencies\n"
cd "$API_DIR"
composer install --no-dev --optimize-autoloader

printf "[3/8] Running Laravel optimizations\n"
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

printf "[4/8] Building frontend\n"
if [ "$SKIP_FRONTEND" = "1" ]; then
  printf "Skipping frontend build because SKIP_FRONTEND=1\n"
else
  cd "$WEB_DIR"
  npm ci
  npm run build
fi

printf "[5/8] Publishing frontend to main domain\n"
if [ "$SKIP_FRONTEND" = "1" ]; then
  printf "Skipping frontend publish because SKIP_FRONTEND=1\n"
else
  if [ ! -d "$WEB_DIR/dist" ]; then
    echo "Frontend dist not found at $WEB_DIR/dist"
    echo "Run npm build first or set SKIP_FRONTEND=1 for backend-only deploy"
    exit 1
  fi
  sync_dir "$WEB_DIR/dist/" "$MAIN_PUBLIC/"
fi

printf "[6/8] Publishing Laravel public files to API subdomain\n"
sync_dir "$API_DIR/public/" "$API_PUBLIC/"

printf "[7/8] Patching API front controller path\n"
cat > "$API_PUBLIC/index.php" <<PHP
<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists(
  \$maintenance = '${API_DIR}/storage/framework/maintenance.php'
)) {
  require \$maintenance;
}

require '${API_DIR}/vendor/autoload.php';

\$app = require_once '${API_DIR}/bootstrap/app.php';

\$kernel = \$app->make(Kernel::class);

\$response = \$kernel->handle(
  \$request = Request::capture()
)->send();

\$kernel->terminate(\$request, \$response);
PHP

printf "[8/8] Writing SPA rewrite for main domain\n"
cat > "$MAIN_PUBLIC/.htaccess" <<'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS

printf "Deploy complete.\n"
printf "Main site: https://your-domain.com\n"
printf "API health check: https://%s/api/paket\n" "$API_DOMAIN"
