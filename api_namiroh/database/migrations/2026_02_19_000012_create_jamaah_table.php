<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jamaah', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 20)->nullable()->unique();
            $table->string('nama_lengkap');
            $table->string('nama_latin');
            $table->char('jenis_kelamin', 1); // L / P
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('golongan_darah', 5)->nullable();
            $table->string('no_hp', 20);
            $table->string('no_hp_alternatif', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('alamat_jalan')->nullable();
            $table->foreignId('kota_id')->nullable()->constrained('kota');
            $table->string('kode_pos', 10)->nullable();
            $table->string('no_paspor', 20)->nullable()->unique();
            $table->date('paspor_berlaku_sd')->nullable();
            $table->string('paspor_diterbitkan')->nullable();
            $table->string('nama_kontak_darurat')->nullable();
            $table->string('hp_kontak_darurat', 20)->nullable();
            $table->string('hubungan_darurat')->nullable();
            $table->text('kondisi_kesehatan')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jamaah');
    }
};
