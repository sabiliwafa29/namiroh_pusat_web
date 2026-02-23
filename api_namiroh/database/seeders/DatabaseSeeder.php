<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProvinsiSeeder::class,
            KotaSeeder::class,
            MaskapaiSeeder::class,
            HotelSeeder::class,
            UserSeeder::class,
            JenisLayananSeeder::class,
            JenisDokumenSeeder::class,
            PaketSeeder::class,
            JadwalSeeder::class,
            JamaahSeeder::class,
            PendaftaranSeeder::class,
        ]);
    }
}
