<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalSeeder extends Seeder
{
    public function run(): void
    {
        /*
         * Hotel ID reference:
         *  2=Maysan Al Maqam(Mek), 3=Tallah Ajyad(Mek), 4=Mather Jiwar(Mek),
         *  7=Amjad(Mad), 8=Thaiba Suite(Mad),
         *  14=Al Qeswah(Mek), 15=Burj Mawaddah(Mad),
         *  16=Azka Al Safa(Mek), 17=Durat Al Eiman(Mad),
         *  18=Manazil Wisam(Mek), 19=Le Meredien Tower(Mek), 20=ODST Hotel(Mad)
         *
         * Maskapai ID reference:
         *  1=Garuda(GA), 2=Lion Air(JT), 7=Etihad(EY), 10=Egypt Air(MS)
         */

        $jadwals = [
            // Paket 1 — Flash Sale 13H (CLOSED / SOLD OUT)
            ['paket_id'=>1, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JAN26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-01-21','tanggal_kembali'=>'2026-02-02','kuota_total'=>40,'kuota_terisi'=>40,'status'=>'CLOSED','catatan_internal'=>'SOLD OUT — keberangkatan perdana 2026','created_at'=>now(),'updated_at'=>now()],
            // Paket 2 — Full Ramadan 1447
            ['paket_id'=>2, 'maskapai_id'=>1,  'kode_jadwal'=>'JDW-FEB26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-22','tanggal_kembali'=>'2026-03-23','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'OPEN','catatan_internal'=>'Sisa 20 seat','created_at'=>now(),'updated_at'=>now()],
            // Paket 3 — Ramadan Plus Cairo kloter 1 (17 Feb)
            ['paket_id'=>3, 'maskapai_id'=>10, 'kode_jadwal'=>'JDW-FEB26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-17','tanggal_kembali'=>'2026-02-25','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'OPEN','catatan_internal'=>'Kloter 1 — via Cairo','created_at'=>now(),'updated_at'=>now()],
            // Paket 3 — Ramadan Plus Cairo kloter 2 (24 Feb)
            ['paket_id'=>3, 'maskapai_id'=>10, 'kode_jadwal'=>'JDW-FEB26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-24','tanggal_kembali'=>'2026-03-04','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'OPEN','catatan_internal'=>'Kloter 2 — via Cairo','created_at'=>now(),'updated_at'=>now()],
            // Paket 4 — Umroh Plus AQSA
            ['paket_id'=>4, 'maskapai_id'=>7,  'kode_jadwal'=>'JDW-MAR26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-03-23','tanggal_kembali'=>'2026-04-04','kuota_total'=>40,'kuota_terisi'=>2, 'status'=>'OPEN','catatan_internal'=>'Sisa 38 seat','created_at'=>now(),'updated_at'=>now()],
            // Paket 5 — Istiqomah Syawal
            ['paket_id'=>5, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-APR26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-04-01','tanggal_kembali'=>'2026-04-13','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 6 — New Season 12H (4 Jul)
            ['paket_id'=>6, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-04','tanggal_kembali'=>'2026-07-15','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 7 — Promo 13H (14 Jul)
            ['paket_id'=>7, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-14','tanggal_kembali'=>'2026-07-26','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 8 — Spesial Promo 16H (22 Jul)
            ['paket_id'=>8, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-22','tanggal_kembali'=>'2026-08-06','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 10 — Umroh Agustus 13H (13 Ags)
            ['paket_id'=>10,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-13','tanggal_kembali'=>'2026-08-25','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 11 — Merdeka NKRI 16H (20 Ags)
            ['paket_id'=>11,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-20','tanggal_kembali'=>'2026-09-04','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 9 — Kemerdekaan 13H (18 Ags)
            ['paket_id'=>9, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-18','tanggal_kembali'=>'2026-08-30','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
            // Paket 12 — Spesial Agustus 13H (22 Ags)
            ['paket_id'=>12,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-22','tanggal_kembali'=>'2026-09-03','kuota_total'=>40,'kuota_terisi'=>0, 'status'=>'OPEN','catatan_internal'=>null,'created_at'=>now(),'updated_at'=>now()],
        ];

        DB::table('jadwal')->insertOrIgnore($jadwals);

        // Mapping jadwal_hotel — checkin/checkout per hotel per jadwal
        $jadwalHotels = [
            // jadwal 1 Flash Sale (Jan 21–Feb 2) — Manazil Wisam(Mek=18), Amjad(Mad=7)
            ['jadwal_id'=>1, 'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-01-22','checkout'=>'2026-01-27'],
            ['jadwal_id'=>1, 'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-01-27','checkout'=>'2026-02-01'],
            // jadwal 2 Full Ramadan (Feb 22–Mar 23) — Mather Jiwar(Mek=4), Burj Mawaddah(Mad=15)
            ['jadwal_id'=>2, 'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-02-23','checkout'=>'2026-03-14'],
            ['jadwal_id'=>2, 'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-03-14','checkout'=>'2026-03-22'],
            // jadwal 3 Cairo kloter 1 (Feb 17–Feb 25) — Le Meredien Tower(Mek=19), ODST(Mad=20)
            ['jadwal_id'=>3, 'hotel_id'=>19,'urutan'=>1,'checkin'=>'2026-02-18','checkout'=>'2026-02-22'],
            ['jadwal_id'=>3, 'hotel_id'=>20,'urutan'=>2,'checkin'=>'2026-02-22','checkout'=>'2026-02-25'],
            // jadwal 4 Cairo kloter 2 (Feb 24–Mar 4) — Le Meredien Tower(Mek=19), ODST(Mad=20)
            ['jadwal_id'=>4, 'hotel_id'=>19,'urutan'=>1,'checkin'=>'2026-02-25','checkout'=>'2026-03-01'],
            ['jadwal_id'=>4, 'hotel_id'=>20,'urutan'=>2,'checkin'=>'2026-03-01','checkout'=>'2026-03-04'],
            // jadwal 5 Plus AQSA (Mar 23–Apr 4) — Azka Al Safa(Mek=16), Durat Al Eiman(Mad=17)
            ['jadwal_id'=>5, 'hotel_id'=>16,'urutan'=>1,'checkin'=>'2026-03-24','checkout'=>'2026-03-29'],
            ['jadwal_id'=>5, 'hotel_id'=>17,'urutan'=>2,'checkin'=>'2026-03-29','checkout'=>'2026-04-04'],
            // jadwal 6 Istiqomah Syawal (Apr 1–Apr 13) — Mather Jiwar(Mek=4), Amjad(Mad=7)
            ['jadwal_id'=>6, 'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-04-02','checkout'=>'2026-04-08'],
            ['jadwal_id'=>6, 'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-04-08','checkout'=>'2026-04-13'],
            // jadwal 7 New Season 12H (Jul 4–Jul 15) — Al Qeswah(Mek=14), Burj Mawaddah(Mad=15)
            ['jadwal_id'=>7, 'hotel_id'=>14,'urutan'=>1,'checkin'=>'2026-07-05','checkout'=>'2026-07-10'],
            ['jadwal_id'=>7, 'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-07-10','checkout'=>'2026-07-15'],
            // jadwal 8 Promo 13H (Jul 14–Jul 26) — Mather Jiwar(Mek=4), Amjad(Mad=7)
            ['jadwal_id'=>8, 'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-07-15','checkout'=>'2026-07-21'],
            ['jadwal_id'=>8, 'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-07-21','checkout'=>'2026-07-26'],
            // jadwal 9 Promo 16H (Jul 22–Aug 6) — Al Qeswah(Mek=14), Burj Mawaddah(Mad=15)
            ['jadwal_id'=>9, 'hotel_id'=>14,'urutan'=>1,'checkin'=>'2026-07-23','checkout'=>'2026-08-01'],
            ['jadwal_id'=>9, 'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-08-01','checkout'=>'2026-08-06'],
            // jadwal 10 Ags 13H (Aug 13–Aug 25) — Tallah Ajyad(Mek=3), Amjad(Mad=7)
            ['jadwal_id'=>10,'hotel_id'=>3, 'urutan'=>1,'checkin'=>'2026-08-14','checkout'=>'2026-08-19'],
            ['jadwal_id'=>10,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-08-19','checkout'=>'2026-08-25'],
            // jadwal 11 Merdeka 16H (Aug 20–Sep 4) — Mather Jiwar(Mek=4), Amjad(Mad=7)
            ['jadwal_id'=>11,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-08-21','checkout'=>'2026-08-30'],
            ['jadwal_id'=>11,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-08-30','checkout'=>'2026-09-03'],
            // jadwal 12 Kemerdekaan 13H (Aug 18–Aug 30) — Tallah Ajyad(Mek=3), Thaiba Suite(Mad=8)
            ['jadwal_id'=>12,'hotel_id'=>3, 'urutan'=>1,'checkin'=>'2026-08-19','checkout'=>'2026-08-24'],
            ['jadwal_id'=>12,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-24','checkout'=>'2026-08-30'],
            // jadwal 13 Spesial Ags 13H (Aug 22–Sep 3) — Maysan Al Maqam(Mek=2), Thaiba Suite(Mad=8)
            ['jadwal_id'=>13,'hotel_id'=>2, 'urutan'=>1,'checkin'=>'2026-08-23','checkout'=>'2026-08-28'],
            ['jadwal_id'=>13,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-28','checkout'=>'2026-09-03'],
        ];

        DB::table('jadwal_hotel')->insertOrIgnore($jadwalHotels);

        // Sesi Manasik
        $sesiManasik = [
            ['jadwal_id'=>2, 'tanggal'=>'2026-02-15','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh & Tata Cara Ibadah','pembimbing'=>'Ust. H. Ahmad Fauzi'],
            ['jadwal_id'=>2, 'tanggal'=>'2026-02-20','jam_mulai'=>'08:00:00','jam_selesai'=>'12:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Manasik Final + Perlengkapan & Perbekalan','pembimbing'=>'Ust. H. Ahmad Fauzi'],
            ['jadwal_id'=>5, 'tanggal'=>'2026-03-25','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh & Doa-Doa Penting','pembimbing'=>null],
            ['jadwal_id'=>7, 'tanggal'=>'2026-06-27','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh, Zikir & Doa di Tanah Suci','pembimbing'=>null],
        ];

        DB::table('sesi_manasik')->insertOrIgnore($sesiManasik);

        $this->command->info('✅ JadwalSeeder: '.count($jadwals).' jadwal, '.count($jadwalHotels).' jadwal_hotel, '.count($sesiManasik).' sesi_manasik berhasil ditambahkan.');
    }
}
