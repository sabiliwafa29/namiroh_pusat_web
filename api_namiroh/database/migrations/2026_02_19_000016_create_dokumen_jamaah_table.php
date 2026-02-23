<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumen_jamaah', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftaran_id')->constrained('pendaftaran')->cascadeOnDelete();
            $table->foreignId('jenis_dokumen_id')->constrained('jenis_dokumen');
            $table->string('file_url');
            $table->string('status_verifikasi', 20)->default('DIUPLOAD'); // DIUPLOAD, DIVERIFIKASI, DITOLAK
            $table->text('catatan_verifikasi')->nullable();
            $table->timestamp('tanggal_upload')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumen_jamaah');
    }
};
