<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Izinkan FRONTEND_URL yang didaftarkan di .env (tanpa www maupun dengan www)
    'allowed_origins' => array_filter([
        env('FRONTEND_URL'),
    ]),

    // Regex: izinkan domain utama dengan atau tanpa www, http maupun https
    // Contoh: cocok untuk annamirohtravelindo.com dan www.annamirohtravelindo.com
    'allowed_origins_patterns' => [
        '#^https?://(www\.)?annamirohtravelindo\.com$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];

