# Deploy via Git - Hostinger + API Subdomain

Panduan ini untuk workspace:
- `api_namiroh` (Laravel API)
- `dashboard_namiroh` (React Vite)
- domain utama + subdomain API (rekomendasi)

Contoh:
- Frontend: `https://annamirohtravelindo.com`
- API: `https://api.annamirohtravelindo.com`

## 1) Prasyarat di Hostinger

- Domain dan subdomain API aktif + SSL aktif.
- SSH aktif.
- PHP `8.3.28` (sudah cocok setelah requirement diubah ke `^8.3`).
- Composer tersedia di server.
- Node.js + npm tersedia untuk build frontend.

Jika server tidak punya npm, gunakan mode backend-only pada script (frontend tidak di-build/publish dari server).

## 2) Struktur target di server

- Repo clone: `/home/USER/namiroh_pusat_web`
- Main domain web root: `/home/USER/public_html`
- API subdomain web root (contoh): `/home/USER/domains/api.annamirohtravelindo.com/public_html`

## 3) Clone via Git

```bash
cd ~
git clone <PRIVATE_OR_GITHUB_REPO_URL> namiroh_pusat_web
cd namiroh_pusat_web
```

Jika private repo GitHub, gunakan SSH key Hostinger ke GitHub.

## 4) Siapkan environment

### Backend Laravel

Buat file:
- `/home/USER/namiroh_pusat_web/api_namiroh/.env`

Isi minimum:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.annamirohtravelindo.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

FRONTEND_URL=https://annamirohtravelindo.com
```

### Frontend React

Buat file:
- `/home/USER/namiroh_pusat_web/dashboard_namiroh/.env.production`

```env
VITE_API_URL=https://api.annamirohtravelindo.com/api
VITE_STORAGE_URL=https://api.annamirohtravelindo.com/storage
```

## 5) Jalankan deploy script

Script siap pakai:
- `scripts/deploy_hostinger_subdomain.sh`

Eksekusi (contoh):

```bash
cd ~/namiroh_pusat_web
chmod +x scripts/deploy_hostinger_subdomain.sh
MAIN_PUBLIC=$HOME/domains/annamirohtravelindo.com/public_html API_DOMAIN=api.annamirohtravelindo.com ./scripts/deploy_hostinger_subdomain.sh main
```

Mode tanpa npm (deploy backend saja):

```bash
SKIP_FRONTEND=1 API_DOMAIN=api.annamirohtravelindo.com ./scripts/deploy_hostinger_subdomain.sh main
```

Catatan:
- Dengan `SKIP_FRONTEND=1`, file frontend di `public_html` tidak diubah.
- Cocok jika frontend sudah pernah dipublish dan saat ini Anda hanya update API.

Jika root subdomain API berbeda, set manual:

```bash
API_PUBLIC=/path/ke/root-subdomain-api ./scripts/deploy_hostinger_subdomain.sh main
```

Script akan:
- `git pull` branch yang dipilih
- install dependency Laravel
- migrate + cache Laravel
- build React
- publish `dist` ke `public_html`
- publish `api_namiroh/public` ke root subdomain API
- patch `index.php` Laravel agar menunjuk source API yang benar

## 6) Update rilis berikutnya (Git deploy)

Setelah push ke `main` dari lokal:

```bash
cd ~/namiroh_pusat_web
API_DOMAIN=api.annamirohtravelindo.com ./scripts/deploy_hostinger_subdomain.sh main
```

Atau backend-only:

```bash
SKIP_FRONTEND=1 MAIN_PUBLIC=$HOME/domains/annamirohtravelindo.com/public_html API_DOMAIN=api.annamirohtravelindo.com ./scripts/deploy_hostinger_subdomain.sh main
```

## 7) Verifikasi

- API: `https://api.annamirohtravelindo.com/api/paket`
- Web: `https://annamirohtravelindo.com`

Jika API gagal:
- cek `APP_URL`
- cek `FRONTEND_URL`
- cek kredensial DB
- jalankan ulang script deploy
