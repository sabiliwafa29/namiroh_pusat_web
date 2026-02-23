<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_registrasi', 30)->unique();
            $table->foreignId('jadwal_id')->constrained('jadwal');
            $table->foreignId('jamaah_id')->constrained('jamaah');
            $table->string('tipe_kamar', 20)->default('QUAD'); // QUAD, TRIPLE, DOUBLE, SINGLE
            $table->text('permintaan_khusus')->nullable();
            $table->decimal('harga_disepakati', 15, 2)->nullable();
            $table->string('status', 30)->default('MENUNGGU_DP');
            $table->string('referral_kode', 20)->nullable();
            $table->foreignId('didaftarkan_oleh')->nullable()->constrained('users');
            $table->text('catatan')->nullable();
            $table->timestamp('tanggal_daftar')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
