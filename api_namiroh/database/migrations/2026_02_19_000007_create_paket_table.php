<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paket', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_layanan_id')->constrained('jenis_layanan');
            $table->string('kode_paket', 50)->unique();
            $table->string('nama_paket');
            $table->text('deskripsi')->nullable();
            $table->unsignedSmallInteger('durasi_hari');
            $table->unsignedSmallInteger('kapasitas_maks')->default(45);
            $table->decimal('harga_dasar', 15, 2)->default(0);
            $table->text('include_detail')->nullable();
            $table->text('exclude_detail')->nullable();
            $table->text('syarat_khusus')->nullable();
            $table->string('flyer_url')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paket');
    }
};
