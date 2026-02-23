<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaketSeeder extends Seeder
{
    public function run(): void
    {
        $inc = 'Tiket PP, Hotel Mekkah & Madinah, Makan 3x Sehari, Muthowwif, Tour Leader, Akomodasi selama di Saudi, Handling Indonesia & Saudi, Visa Umroh, Siskopatuh';
        $exc = 'Perlengkapan Umroh, Biaya Paspor, Vaksin Meningitis, Pengeluaran Pribadi';

        $pakets = [
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-JAN26-FLASH',  'nama_paket'=>'Paket Flash Sale Umroh 13 Hari',             'deskripsi'=>'Keb. 21 Jan 2026 (SUB→Jed). Hotel Mek: Manazil Wisam · Mad: Amjad. Maskapai: Lion Air',                             'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>32900000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/01-flash-sale-jan26.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-FEB26-RAMADAN', 'nama_paket'=>'Spesial Umroh Full Ramadan 1447',            'deskripsi'=>'Keb. 22 Feb 2026 (SUB→Jed). Hotel Mek: Mather Jiwar · Mad: Burj Mawaddah. Maskapai: Garuda Indonesia',            'durasi_hari'=>30,'kapasitas_maks'=>40,'harga_dasar'=>53400000,'include_detail'=>$inc.', Paket Full Ramadan 1447 H','exclude_detail'=>$exc,'flyer_url'=>'/flyer/02-full-ramadan-1447.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>7,'kode_paket'=>'UMR-FEB26-CAIRO',   'nama_paket'=>'Spesial Umroh 9 Hari Ramadan Plus Cairo',   'deskripsi'=>'Keb. 17 & 24 Feb 2026. Hotel Mek: Le Meredien Tower · Mad: ODST. Maskapai: Egypt Air. Termasuk city tour Cairo', 'durasi_hari'=>9, 'kapasitas_maks'=>40,'harga_dasar'=>34400000,'include_detail'=>$inc.', City Tour Cairo (Mesir), Hotel Cairo','exclude_detail'=>$exc,'flyer_url'=>'/flyer/03-ramadan-cairo.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>3,'kode_paket'=>'UMR-MAR26-AQSA',    'nama_paket'=>'Umroh Spesial Plus AQSA 13 Hari',           'deskripsi'=>'Keb. 23 Mar 2026 (SUB→Jed). Hotel Mek: Azka Al Safa · Mad: Durat Al Eiman. Maskapai: Etihad Airways. + Ziarah Al-Aqsa','durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>50995000,'include_detail'=>$inc.', Ziarah Masjid Al-Aqsa Palestina, Hotel di Yerusalem','exclude_detail'=>$exc,'flyer_url'=>'/flyer/04-plus-aqsa.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-APR26-SYAWAL',  'nama_paket'=>'Paket Umroh Istiqomah Syawal 13 Hari',      'deskripsi'=>'Keb. 1 Apr 2026 (SUB→Jed). Hotel Mek: Mather Jiwar · Mad: Amjad. Maskapai: Lion Air',                            'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>33500000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/05-istiqomah-syawal.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-JUL26-NEWSEASON','nama_paket'=>'Paket Umroh Spesial New Season 12 Hari',   'deskripsi'=>'Keb. 4 Jul 2026 (SUB→Jed). Hotel Mek: Al Qeswah (5N) · Mad: Burj Mawaddah (5N). Jarak ±500m–1KM. Lion Air',    'durasi_hari'=>12,'kapasitas_maks'=>40,'harga_dasar'=>30350000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/06-new-season-jul26.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-JUL26-PROMO13', 'nama_paket'=>'Promo Spesial Umroh Package 13 Hari',       'deskripsi'=>'Keb. 14 Jul 2026 (SUB→Jed). Hotel Mek: Mather Jiwar (5N) · Mad: Amjad (6N). Jarak ±500m–1KM. Lion Air',        'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>32100000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/07-promo-13h-jul26.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-JUL26-PROMO16', 'nama_paket'=>'Paket Umroh Spesial Promo 16 Hari',         'deskripsi'=>'Keb. 22 Jul 2026 (SUB→Jed). Hotel Mek: Al Qeswah (9N) · Mad: Burj Mawaddah (5N). Jarak ±500m–1KM. Lion Air',   'durasi_hari'=>16,'kapasitas_maks'=>40,'harga_dasar'=>31500000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/08-promo-16h-jul26.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-AGS26-KMRD13',  'nama_paket'=>'Umroh Kemerdekaan 13 Hari',                 'deskripsi'=>'Keb. 18 Ags 2026 (SUB→Jed). Hotel Mek: Tallah Ajyad · Mad: Thaiba Suite. Maskapai: Lion Air',                    'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>33600000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/09-kemerdekaan-13h.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-AGS26-13HARI',  'nama_paket'=>'Paket Umroh Agustus 13 Hari',              'deskripsi'=>'Keb. 13 Ags 2026 (SUB→Jed). Hotel Mek: Tallah Ajyad · Mad: Amjad. Maskapai: Lion Air',                           'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>34600000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/10-agustus-13h.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-AGS26-MRDKA16', 'nama_paket'=>'Umroh Merdeka NKRI 16 Hari',               'deskripsi'=>'Keb. 20 Ags 2026 (SUB→Jed). Hotel Mek: Mather Jiwar · Mad: Amjad. Maskapai: Lion Air',                          'durasi_hari'=>16,'kapasitas_maks'=>40,'harga_dasar'=>33800000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/11-merdeka-nkri-16h.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>1,'kode_paket'=>'UMR-AGS26-SPESIAL', 'nama_paket'=>'Umroh Spesial Agustus 13 Hari',            'deskripsi'=>'Keb. 22 Ags 2026 (SUB→Jed). Hotel Mek: Maysan Al Maqam · Mad: Thaiba Suite. Maskapai: Lion Air',               'durasi_hari'=>13,'kapasitas_maks'=>40,'harga_dasar'=>34250000,'include_detail'=>$inc,'exclude_detail'=>$exc,'flyer_url'=>'/flyer/12-spesial-ags-13h.webp','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            // Layanan lain
            ['jenis_layanan_id'=>4,'kode_paket'=>'HAJI-PLUS-2026',    'nama_paket'=>'Haji Plus 2026',                            'deskripsi'=>'Daftar sekarang hanya Rp500.000. Porsi haji plus resmi Kemenag RI, fasilitas VIP.','durasi_hari'=>40,'kapasitas_maks'=>30,'harga_dasar'=>500000,'flyer_url'=>null,'include_detail'=>'Porsi Haji Plus Resmi, Maktab VIP, Visa Haji, Hotel Dekat Pelataran, Bimbingan Eksklusif, Asuransi','exclude_detail'=>'Biaya Pelunasan (diinformasikan kemudian), Biaya Paspor, Pengeluaran Pribadi','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>5,'kode_paket'=>'BADAL-UMROH-2026',   'nama_paket'=>'Badal Umroh',                              'deskripsi'=>'Ibadah umroh ditunaikan mutawif profesional atas nama yang telah meninggal atau tidak mampu berangkat.','durasi_hari'=>9,'kapasitas_maks'=>10,'harga_dasar'=>3000000,'flyer_url'=>null,'include_detail'=>'Ibadah Umroh Pengganti oleh Mutawif, Piagam Badal Umroh, Air Zamzam 500ml, Souvenir','exclude_detail'=>'-','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>6,'kode_paket'=>'BADAL-HAJI-2026',    'nama_paket'=>'Badal Haji',                               'deskripsi'=>'Ibadah haji ditunaikan mutawif senior atas nama keluarga yang telah berpulang atau tidak mampu berangkat.','durasi_hari'=>40,'kapasitas_maks'=>5,'harga_dasar'=>13500000,'flyer_url'=>null,'include_detail'=>'Ibadah Haji Pengganti oleh Mutawif Senior, Piagam Badal Haji, Air Zamzam 500ml, Souvenir','exclude_detail'=>'-','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['jenis_layanan_id'=>7,'kode_paket'=>'HALAL-TURKEY-2026',  'nama_paket'=>'Umroh Plus Turkey — Istanbul & Bursa',     'deskripsi'=>'12 hari, start Surabaya. Menelusuri jejak peradaban Islam di Mekkah, Madinah, Istanbul & Bursa Turki.','durasi_hari'=>12,'kapasitas_maks'=>35,'harga_dasar'=>37250000,'flyer_url'=>null,'include_detail'=>$inc.', Tiket Jeddah–Istanbul, City Tour Istanbul & Bursa, Hotel Istanbul & Bursa','exclude_detail'=>$exc.', Biaya Masuk Objek Wisata Berbayar','is_published'=>1,'is_active'=>1,'created_at'=>now(),'updated_at'=>now()],
        ];

        DB::table('paket')->insert($pakets);

        // Harga Kamar
        $harga = [
            [1,32900000,36400000,40400000,52900000],
            [2,53400000,58400000,65400000,80400000],
            [3,34400000,37900000,41900000,54400000],
            [4,50995000,55995000,62995000,77995000],
            [5,33500000,37000000,41000000,53500000],
            [6,30350000,33850000,37850000,50350000],
            [7,32100000,35600000,39600000,52100000],
            [8,31500000,35000000,39000000,51500000],
            [9,33600000,37100000,41100000,53600000],
            [10,34600000,38100000,42100000,54600000],
            [11,33800000,37300000,41300000,53800000],
            [12,34250000,37750000,41750000,54250000],
            [13,500000,null,null,null],
            [14,3000000,null,null,null],
            [15,13500000,null,null,null],
            [16,37250000,40750000,44750000,57250000],
        ];

        $hargaRows = [];
        foreach ($harga as $h) {
            $hargaRows[] = ['paket_id'=>$h[0],'tipe_kamar'=>'QUAD',  'harga'=>$h[1]];
            if ($h[2]) $hargaRows[] = ['paket_id'=>$h[0],'tipe_kamar'=>'TRIPLE','harga'=>$h[2]];
            if ($h[3]) $hargaRows[] = ['paket_id'=>$h[0],'tipe_kamar'=>'DOUBLE','harga'=>$h[3]];
            if ($h[4]) $hargaRows[] = ['paket_id'=>$h[0],'tipe_kamar'=>'SINGLE','harga'=>$h[4]];
        }
        DB::table('paket_harga')->insert($hargaRows);

        // Itinerary sample untuk paket New Season 12 Hari (id=6)
        $itinerary = [
            ['paket_id'=>6,'hari_ke'=>1, 'judul'=>'Berangkat dari Surabaya',    'deskripsi'=>'Kumpul di Bandara Juanda (SUB), briefing, penerbangan menuju Jeddah via Lion Air.'],
            ['paket_id'=>6,'hari_ke'=>2, 'judul'=>'Tiba di Jeddah – ke Madinah','deskripsi'=>'Tiba di Bandara King Abdulaziz Jeddah, perjalanan darat menuju Madinah al-Munawwarah.'],
            ['paket_id'=>6,'hari_ke'=>3, 'judul'=>'Ibadah di Madinah (1)',      'deskripsi'=>'Sholat Arbain di Masjid Nabawi, ziarah Raudhah, Makam Rasulullah SAW, Masjid Quba.'],
            ['paket_id'=>6,'hari_ke'=>5, 'judul'=>'Ibadah di Madinah (2)',      'deskripsi'=>'Ziarah Jabal Uhud, Masjid Qiblatain, Kebun Kurma, Pasar Kurma.'],
            ['paket_id'=>6,'hari_ke'=>7, 'judul'=>'Perjalanan ke Mekkah',       'deskripsi'=>'Miqat di Bir Ali, niat umroh, perjalanan ke Mekkah, check-in Hotel Al Qeswah.'],
            ['paket_id'=>6,'hari_ke'=>8, 'judul'=>'Ibadah di Mekkah (1)',       'deskripsi'=>'Tawaf Qudum, Sai, Tahallul, Sholat Jumat di Masjidil Haram.'],
            ['paket_id'=>6,'hari_ke'=>10,'judul'=>'Ibadah di Mekkah (2)',       'deskripsi'=>'Ziarah Jabal Nur, Jabal Tsur, Arafah, Muzdalifah, Mina.'],
            ['paket_id'=>6,'hari_ke'=>12,'judul'=>'Pulang ke Tanah Air',        'deskripsi'=>'Perjalanan ke Bandara Jeddah, penerbangan kembali ke Surabaya, tiba dengan penuh berkah.'],
        ];
        DB::table('itinerary')->insert($itinerary);

        $this->command->info('✅ PaketSeeder: '.count($pakets).' paket, '.count($hargaRows).' varian harga berhasil ditambahkan.');
    }
}
