<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('hotel')->insertOrIgnore([
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
            ['nama' => 'Le Meredien Tower',    'kota' => 'MADINAH', 'bintang' => 5, 'jarak_masjid_meter' => 200,  'is_active' => 1],
            ['nama' => 'ODST Hotel',           'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            // Hotel baru dari flyer Paket Juli 2026 New Season 1448H — id 21-30
            ['nama' => 'Mekkah Tower',          'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            ['nama' => 'Al Anshor Golden Tulip','kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 350,  'is_active' => 1],
            ['nama' => 'Waha Dheafa',           'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 700,  'is_active' => 1],
            ['nama' => 'Arkan Golden',          'kota' => 'MADINAH', 'bintang' => 3, 'jarak_masjid_meter' => 500,  'is_active' => 1],
            ['nama' => 'Villa Retaj',           'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 400,  'is_active' => 1],
            ['nama' => 'Royal Madinah',         'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 300,  'is_active' => 1],
            ['nama' => 'Villa Hilton',          'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 450,  'is_active' => 1],
            ['nama' => 'Thaiba Front',          'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 600,  'is_active' => 1],
            ['nama' => 'Shofwa Tower',          'kota' => 'MADINAH', 'bintang' => 4, 'jarak_masjid_meter' => 280,  'is_active' => 1],
            ['nama' => 'Paradise Hotel',        'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 550,  'is_active' => 1],
            // Hotel baru dari flyer Paket Agustus 2026 Bulan Kemerdekaan — id 31-34
            ['nama' => 'Al Muwahidin',          'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 650,  'is_active' => 1],
            ['nama' => 'Barakah Karem',         'kota' => 'MADINAH', 'bintang' => 3, 'jarak_masjid_meter' => 450,  'is_active' => 1],
            ['nama' => 'Al Miqat',              'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 800,  'is_active' => 1],
            ['nama' => 'Rawabi Zam Zam',        'kota' => 'MEKKAH',  'bintang' => 4, 'jarak_masjid_meter' => 400,  'is_active' => 1],
            // Hotel baru dari flyer Paket Oktober 2026 Oktoberkah — id 35-36
            ['nama' => 'Manazil Hijrah',         'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 600,  'is_active' => 1],
            ['nama' => 'Amjad Salam',            'kota' => 'MADINAH', 'bintang' => 3, 'jarak_masjid_meter' => 400,  'is_active' => 1],
            // Hotel baru dari flyer Paket September 2026 — id 37
            ['nama' => 'Al Miqad',               'kota' => 'MEKKAH',  'bintang' => 3, 'jarak_masjid_meter' => 750,  'is_active' => 1],
        ]);

        $this->command->info('✅ HotelSeeder: 37 hotel ditambahkan.');
    }
}
