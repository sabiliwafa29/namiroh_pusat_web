<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PaketController;
use App\Http\Controllers\API\JadwalController;
use App\Http\Controllers\API\JamaahController;
use App\Http\Controllers\API\PendaftaranController;
use App\Models\Maskapai;
use Illuminate\Http\Request;

// ============================================================
// PUBLIC ROUTES (tidak perlu token)
// ============================================================

// Auth
Route::prefix('auth')->group(function () {
    Route::post('login',    [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Publik: lihat paket & jadwal yang tersedia
Route::get('paket',          [PaketController::class, 'index']);
Route::get('paket/{paket}',  [PaketController::class, 'show']);
Route::get('jadwal',         [JadwalController::class, 'index']);
Route::get('jadwal/{jadwal}',[JadwalController::class, 'show']);
Route::get('maskapai',       fn() => response()->json(['data' => Maskapai::where('is_active', 1)->get()]));

// Publik: pendaftaran tanpa login
Route::post('daftar', [PendaftaranController::class, 'daftarPublik']);

// ============================================================
// PROTECTED ROUTES (butuh token Sanctum)
// ============================================================

Route::middleware('auth:sanctum')->group(function () {

    // -- Auth --------------------------------------------------
    Route::prefix('auth')->group(function () {
        Route::get('me',              [AuthController::class, 'me']);
        Route::post('logout',         [AuthController::class, 'logout']);
        Route::put('change-password', [AuthController::class, 'changePassword']);
    });

    // -- Paket (CRUD) ------------------------------------------
    Route::prefix('paket')->group(function () {
        Route::post('/',                    [PaketController::class, 'store']);
        Route::put('/{paket}',              [PaketController::class, 'update']);
        Route::delete('/{paket}',           [PaketController::class, 'destroy']);
        Route::patch('/{paket}/publish',    [PaketController::class, 'publish']);
    });

    // -- Jadwal (CRUD) -----------------------------------------
    Route::prefix('jadwal')->group(function () {
        Route::post('/',                         [JadwalController::class, 'store']);
        Route::put('/{jadwal}',                  [JadwalController::class, 'update']);
        Route::delete('/{jadwal}',               [JadwalController::class, 'destroy']);
        Route::patch('/{jadwal}/status',         [JadwalController::class, 'updateStatus']);
        Route::get('/{jadwal}/peserta',          [JadwalController::class, 'peserta']);
    });

    // -- Jamaah (CRUD) -----------------------------------------
    Route::prefix('jamaah')->group(function () {
        Route::get('/',                  [JamaahController::class, 'index']);
        Route::post('/',                 [JamaahController::class, 'store']);
        Route::get('/{jamaah}',          [JamaahController::class, 'show']);
        Route::put('/{jamaah}',          [JamaahController::class, 'update']);
        Route::delete('/{jamaah}',       [JamaahController::class, 'destroy']);
        Route::get('/{jamaah}/riwayat',  [JamaahController::class, 'riwayat']);
    });

    // -- Pendaftaran (CRUD) ------------------------------------
    Route::prefix('pendaftaran')->group(function () {
        Route::get('/',                                          [PendaftaranController::class, 'index']);
        Route::post('/',                                         [PendaftaranController::class, 'store']);
        Route::get('/{pendaftaran}',                             [PendaftaranController::class, 'show']);
        Route::patch('/{pendaftaran}/status',                    [PendaftaranController::class, 'updateStatus']);
        Route::post('/{pendaftaran}/dokumen',                    [PendaftaranController::class, 'uploadDokumen']);
        Route::patch('/{pendaftaran}/dokumen/{dokumenId}/verifikasi', [PendaftaranController::class, 'verifikasiDokumen']);
        Route::delete('/{pendaftaran}',                          [PendaftaranController::class, 'destroy']);
    });

});
