<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('hotel')->insert([
            // Mekkah — id 1-6 existing
            ['nama' => 'Grand Massa',          'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 200,  'is_active' => 1],
            ['nama' => 'Maysan Al Maqam',      'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 300,  'is_active' => 1],
            ['nama' => 'Tallah Ajyad',         'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            ['nama' => 'Mather Jiwar',         'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 400,  'is_active' => 1],
            ['nama' => 'Hilton Suites Makkah', 'kota' => 'MEKKAH',  'bintang' => 5, 'jarak_masjid_meter' => 100,  'is_active' => 1],
            ['nama' => 'Swissotel Makkah',     'kota' => 'MEKKAH',  'bintang' => 5, 'jarak_masjid_meter' => 50,   'is_active' => 1],
            // Madinah — id 7-10 existing
            ['nama' => 'Amjad',                'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 300,  'is_active' => 1],
            ['nama' => 'Thaiba Suite',         'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 250,  'is_active' => 1],
            ['nama' => 'Dar Al Taqwa',         'kota' => 'MADINAH', 'bintang' => 5, 'jarak_masjid_meter' => 100,  'is_active' => 1],
            ['nama' => 'Al Ansar Gold',        'kota' => 'MADINAH', 'bintang' => 3, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            // Jeddah & Istanbul — id 11-13 existing
            ['nama' => 'Holiday Inn Jeddah',   'kota' => 'JEDDAH',  'bintang' => 4, 'jarak_masjid_meter' => 2000, 'is_active' => 1],
            ['nama' => 'Radisson Blu Istanbul','kota' => 'ISTANBUL', 'bintang' => 5, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            ['nama' => 'Holiday Inn Istanbul', 'kota' => 'ISTANBUL', 'bintang' => 4, 'jarak_masjid_meter' => 800,  'is_active' => 1],
            // Hotel baru dari jadwal namiroh.com — id 14-20
            ['nama' => 'Al Qeswah',            'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 700,  'is_active' => 1],
            ['nama' => 'Burj Mawaddah',        'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 350,  'is_active' => 1],
            ['nama' => 'Azka Al Safa',         'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 400,  'is_active' => 1],
            ['nama' => 'Durat Al Eiman',       'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 280,  'is_active' => 1],
            ['nama' => 'Manazil Wisam',        'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 600,  'is_active' => 1],
            ['nama' => 'Le Meredien Tower',    'kota' => 'MEKKAH',  'bintang' => 5, 'jarak_masjid_meter' => 200,  'is_active' => 1],
            ['nama' => 'ODST Hotel',           'kota' => 'MADINAH', 'bintang' => 3, 'jarak_masjid_meter' => 500,  'is_active' => 1],
        ]);

        $this->command->info('✅ HotelSeeder: 20 hotel ditambahkan.');
    }
}
