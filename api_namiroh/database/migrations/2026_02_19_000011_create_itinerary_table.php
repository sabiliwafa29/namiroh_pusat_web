<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('itinerary', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_id')->constrained('paket')->cascadeOnDelete();
            $table->unsignedSmallInteger('hari_ke');
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->string('kota')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('itinerary');
    }
};
