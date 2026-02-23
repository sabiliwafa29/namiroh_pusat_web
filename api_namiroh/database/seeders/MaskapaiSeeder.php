<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaskapaiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('maskapai')->insert([
            ['kode_iata' => 'GA', 'nama' => 'Garuda Indonesia',  'is_active' => 1],
            ['kode_iata' => 'JT', 'nama' => 'Lion Air',          'is_active' => 1],
            ['kode_iata' => 'ID', 'nama' => 'Batik Air',         'is_active' => 1],
            ['kode_iata' => 'EK', 'nama' => 'Emirates',          'is_active' => 1],
            ['kode_iata' => 'QR', 'nama' => 'Qatar Airways',     'is_active' => 1],
            ['kode_iata' => 'TK', 'nama' => 'Turkish Airlines',  'is_active' => 1],
            ['kode_iata' => 'EY', 'nama' => 'Etihad Airways',    'is_active' => 1],
            ['kode_iata' => 'WY', 'nama' => 'Oman Air',          'is_active' => 1],
            ['kode_iata' => 'SV', 'nama' => 'Saudia',            'is_active' => 1],
            ['kode_iata' => 'MS', 'nama' => 'Egypt Air',         'is_active' => 1],
            ['kode_iata' => 'TR', 'nama' => 'Scoot',             'is_active' => 1],
        ]);

        $this->command->info('✅ MaskapaiSeeder: 11 maskapai ditambahkan.');
    }
}
