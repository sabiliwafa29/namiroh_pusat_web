<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_id')->constrained('paket');
            $table->foreignId('maskapai_id')->constrained('maskapai');
            $table->string('kode_jadwal', 30)->unique();
            $table->date('tanggal_berangkat');
            $table->date('tanggal_kembali');
            $table->string('kota_keberangkatan', 50);
            $table->string('bandara_keberangkatan', 10);
            $table->unsignedSmallInteger('kuota_total')->default(45);
            $table->unsignedSmallInteger('kuota_terisi')->default(0);
            $table->string('status', 20)->default('DRAFT'); // DRAFT, OPEN, CLOSED, SELESAI
            $table->text('catatan_internal')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal');
    }
};
