<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisLayananSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jenis_layanan')->insert([
            ['kode' => 'UMROH',        'nama' => 'Umroh Reguler',  'deskripsi' => 'Paket umroh standar reguler',               'is_active' => 1],
            ['kode' => 'UMROH_VIP',    'nama' => 'Umroh VIP',      'deskripsi' => 'Paket umroh eksklusif hotel bintang 5',      'is_active' => 1],
            ['kode' => 'UMROH_PLUS',   'nama' => 'Umroh Plus',     'deskripsi' => 'Paket umroh plus destinasi wisata tambahan', 'is_active' => 1],
            ['kode' => 'HAJI_PLUS',    'nama' => 'Haji Plus',      'deskripsi' => 'Paket haji plus dengan fasilitas VIP',       'is_active' => 1],
            ['kode' => 'BADAL_UMROH',  'nama' => 'Badal Umroh',    'deskripsi' => 'Ibadah umroh yang diwakilkan',               'is_active' => 1],
            ['kode' => 'BADAL_HAJI',   'nama' => 'Badal Haji',     'deskripsi' => 'Ibadah haji yang diwakilkan',                'is_active' => 1],
            ['kode' => 'WISATA_HALAL', 'nama' => 'Wisata Halal',   'deskripsi' => 'Paket wisata halal ke destinasi islami',     'is_active' => 1],
        ]);

        $this->command->info('✅ JenisLayananSeeder: 7 jenis layanan ditambahkan.');
    }
}
