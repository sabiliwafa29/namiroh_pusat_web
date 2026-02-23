<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KotaSeeder extends Seeder
{
    public function run(): void
    {
        // provinsi_id mengacu pada urutan insert ProvinsiSeeder
        // 11=DKI Jakarta, 12=Jawa Barat, 13=Jawa Tengah, 14=DI Yogyakarta, 15=Jawa Timur, 16=Banten, 27=Sulawesi Selatan
        $data = [
            // Jawa Timur (15)
            ['provinsi_id' => 15, 'nama' => 'Surabaya'],
            ['provinsi_id' => 15, 'nama' => 'Mojokerto'],
            ['provinsi_id' => 15, 'nama' => 'Malang'],
            ['provinsi_id' => 15, 'nama' => 'Sidoarjo'],
            ['provinsi_id' => 15, 'nama' => 'Gresik'],
            ['provinsi_id' => 15, 'nama' => 'Kediri'],
            ['provinsi_id' => 15, 'nama' => 'Blitar'],
            ['provinsi_id' => 15, 'nama' => 'Jember'],
            ['provinsi_id' => 15, 'nama' => 'Banyuwangi'],
            ['provinsi_id' => 15, 'nama' => 'Pasuruan'],
            ['provinsi_id' => 15, 'nama' => 'Probolinggo'],
            ['provinsi_id' => 15, 'nama' => 'Madiun'],
            ['provinsi_id' => 15, 'nama' => 'Tuban'],
            ['provinsi_id' => 15, 'nama' => 'Lamongan'],
            ['provinsi_id' => 15, 'nama' => 'Bojonegoro'],
            // DKI Jakarta (11)
            ['provinsi_id' => 11, 'nama' => 'Jakarta Pusat'],
            ['provinsi_id' => 11, 'nama' => 'Jakarta Selatan'],
            ['provinsi_id' => 11, 'nama' => 'Jakarta Utara'],
            ['provinsi_id' => 11, 'nama' => 'Jakarta Barat'],
            ['provinsi_id' => 11, 'nama' => 'Jakarta Timur'],
            // Jawa Barat (12)
            ['provinsi_id' => 12, 'nama' => 'Bandung'],
            ['provinsi_id' => 12, 'nama' => 'Bekasi'],
            ['provinsi_id' => 12, 'nama' => 'Depok'],
            ['provinsi_id' => 12, 'nama' => 'Bogor'],
            ['provinsi_id' => 12, 'nama' => 'Cimahi'],
            // Jawa Tengah (13)
            ['provinsi_id' => 13, 'nama' => 'Semarang'],
            ['provinsi_id' => 13, 'nama' => 'Solo'],
            ['provinsi_id' => 13, 'nama' => 'Pekalongan'],
            ['provinsi_id' => 13, 'nama' => 'Tegal'],
            ['provinsi_id' => 13, 'nama' => 'Kudus'],
            // DI Yogyakarta (14)
            ['provinsi_id' => 14, 'nama' => 'Yogyakarta'],
            ['provinsi_id' => 14, 'nama' => 'Sleman'],
            ['provinsi_id' => 14, 'nama' => 'Bantul'],
            // Sulawesi Selatan (27)
            ['provinsi_id' => 27, 'nama' => 'Makassar'],
            ['provinsi_id' => 27, 'nama' => 'Gowa'],
            // Sumatera Utara (2)
            ['provinsi_id' => 2, 'nama' => 'Medan'],
            ['provinsi_id' => 2, 'nama' => 'Deli Serdang'],
        ];

        DB::table('kota')->insert($data);
        $this->command->info('✅ KotaSeeder: ' . count($data) . ' kota ditambahkan.');
    }
}
