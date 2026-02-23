<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maskapai', function (Blueprint $table) {
            $table->id();
            $table->string('kode_iata', 10)->unique();
            $table->string('nama');
            $table->string('logo_url')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maskapai');
    }
};
