<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalSeeder extends Seeder
{
    public function run(): void
    {
        // Idempotent — wipe & re-seed safely
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        DB::table('sesi_manasik')->truncate();
        DB::table('jadwal_hotel')->truncate();
        DB::table('jadwal')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        /*
         * Hotel ID reference:
         *  2=Maysan Al Maqam(Mek), 3=Tallah Ajyad(Mek), 4=Mather Jiwar(Mek),
         *  7=Amjad(Mad), 8=Thaiba Suite(Mad),
         *  14=Al Qeswah(Mek), 15=Burj Mawaddah(Mad),
         *  16=Azka Al Safa(Mek), 17=Durat Al Eiman(Mad),
         *  18=Manazil Wisam(Mek), 19=Le Meredien Tower(Mad), 20=ODST Hotel(Mek),
         *  21=Mekkah Tower(Mek), 22=Al Anshor Golden Tulip(Mad), 23=Waha Dheafa(Mek), 24=Arkan Golden(Mad),
         *  25=Villa Retaj(Mek), 26=Royal Madinah(Mad), 27=Villa Hilton(Mek), 28=Thaiba Front(Mek),
         *  29=Shofwa Tower(Mad), 30=Paradise Hotel(Mek),
         *  31=Al Muwahidin(Mek), 32=Barakah Karem(Mad), 33=Al Miqat(Mek), 34=Rawabi Zam Zam(Mek),
         *  35=Manazil Hijrah(Mek), 36=Amjad Salam(Mad),
         *  37=Al Miqad(Mek)
         *
         * Maskapai ID reference:
         *  1=Garuda(GA), 2=Lion Air(JT), 7=Etihad(EY), 10=Egypt Air(MS)
         */

        $jadwals = [
            // Paket 1 — Flash Sale 13H (CLOSED / SOLD OUT)
            ['paket_id'=>1, 'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JAN26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-01-21','tanggal_kembali'=>'2026-02-02','kuota_total'=>40,'kuota_terisi'=>40,'status'=>'CLOSED','catatan_internal'=>'SOLD OUT — keberangkatan perdana 2026','created_at'=>now(),'updated_at'=>now()],
            // Paket 2 — Full Ramadan 1447
            ['paket_id'=>2, 'maskapai_id'=>1,  'kode_jadwal'=>'JDW-FEB26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-22','tanggal_kembali'=>'2026-03-23','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'CLOSED','catatan_internal'=>'Sudah berangkat — Full Ramadan 1447','created_at'=>now(),'updated_at'=>now()],
            // Paket 3 — Ramadan Plus Cairo kloter 1 (17 Feb)
            ['paket_id'=>3, 'maskapai_id'=>10, 'kode_jadwal'=>'JDW-FEB26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-17','tanggal_kembali'=>'2026-02-25','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'CLOSED','catatan_internal'=>'Sudah berangkat — Kloter 1 via Cairo','created_at'=>now(),'updated_at'=>now()],
            // Paket 3 — Ramadan Plus Cairo kloter 2 (24 Feb)
            ['paket_id'=>3, 'maskapai_id'=>10, 'kode_jadwal'=>'JDW-FEB26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-02-24','tanggal_kembali'=>'2026-03-04','kuota_total'=>40,'kuota_terisi'=>20,'status'=>'CLOSED','catatan_internal'=>'Sudah berangkat — Kloter 2 via Cairo','created_at'=>now(),'updated_at'=>now()],
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
            // Paket 17 — Juli 2026 New Season 1448H (11 program)
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-05','tanggal_kembali'=>'2026-07-20','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mekkah Tower 5N / Al Anshor GT 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-005','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-06','tanggal_kembali'=>'2026-07-17','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Mekkah Tower 5N / Al Anshor GT 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-006','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-06','tanggal_kembali'=>'2026-07-17','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Al Qeswah 5N / Burj Mawaddah 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-007','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-08','tanggal_kembali'=>'2026-07-21','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H SUB-MED — Arkan Golden 5N / Waha Dheafa 7N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-008','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-12','tanggal_kembali'=>'2026-07-27','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mather Jiwar 5N / Amjad 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-JUL26-009','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-13','tanggal_kembali'=>'2026-07-24','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda SUB-MED — Amjad 5N / Maysan Al Maqam 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-010','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-19','tanggal_kembali'=>'2026-08-03','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Villa Retaj 5N / Royal Madinah 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-011','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-20','tanggal_kembali'=>'2026-07-31','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Villa Hilton 5N / Al Anshor GT 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-012','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-23','tanggal_kembali'=>'2026-08-03','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Thaiba Front 6N / Shofwa Tower 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-013','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-26','tanggal_kembali'=>'2026-08-10','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Tallah Ajyad 5N / Amjad 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>17,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-JUL26-014','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-07-01','tanggal_kembali'=>'2026-07-30','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'30H Full Month — Paradise Hotel 19N / Burj Mawaddah 9N','created_at'=>now(),'updated_at'=>now()],
            // Paket 18 — Agustus 2026 Bulan Kemerdekaan (15 program)
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-005','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-02','tanggal_kembali'=>'2026-08-17','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Al Muwahidin 5N / Thaiba Suite 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-AGS26-006','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-03','tanggal_kembali'=>'2026-08-14','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda SUB-JED<>MED-SUB — Manazil Wisam 5N / Barakah Karem 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-007','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-06','tanggal_kembali'=>'2026-08-18','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'13H — Al Miqat 5N / Thaiba Suite 6N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-008','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-09','tanggal_kembali'=>'2026-08-24','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mekkah Tower 5N / Al Anshor GT 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-009','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-13','tanggal_kembali'=>'2026-08-25','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'13H — Thaiba Front 6N / Shofwa Tower 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-010','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-17','tanggal_kembali'=>'2026-08-28','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Mekkah Tower 5N / Al Anshor GT 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-AGS26-011','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-19','tanggal_kembali'=>'2026-09-01','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda — Paradise Hotel 7N / Burj Mawaddah 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-012','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-20','tanggal_kembali'=>'2026-09-01','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'13H — Tallah Ajyad 5N / Thaiba Suite 6N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-013','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-22','tanggal_kembali'=>'2026-09-02','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Villa Hilton 5N / Al Anshor GT 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-014','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-23','tanggal_kembali'=>'2026-09-07','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mekkah Tower 5N / Al Anshor GT 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-015','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-23','tanggal_kembali'=>'2026-09-07','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Al Qeswah 9N / Burj Mawaddah 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-016','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-24','tanggal_kembali'=>'2026-09-04','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Maysan Al Maqam 5N / Thaiba Suite 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-AGS26-017','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-26','tanggal_kembali'=>'2026-09-08','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda SUB-MED<>JED-SUB — Thaiba Suite 5N / Rawabi Zam Zam 7N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-018','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-30','tanggal_kembali'=>'2026-09-14','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mather Jiwar 5N / Amjad 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>18,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-AGS26-019','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-08-01','tanggal_kembali'=>'2026-08-30','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'30H Full Month — Paradise Hotel 19N / Burj Mawaddah 9N','created_at'=>now(),'updated_at'=>now()],
            // Paket 19 — Oktober 2026 Oktoberkah (8 program)
            ['paket_id'=>19,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-OKT26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-03','tanggal_kembali'=>'2026-10-18','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Garuda — Paradise Hotel 5N / Burj Mawaddah 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-OKT26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-04','tanggal_kembali'=>'2026-10-19','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Manazil Hijrah 9N / Barakah Karem 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-OKT26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-07','tanggal_kembali'=>'2026-10-20','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda SUB-MED — Arkan Golden 5N / Tallah Ajyad 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-OKT26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-19','tanggal_kembali'=>'2026-10-30','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda — Mather Jiwar 5N / Amjad Salam 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-OKT26-005','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-21','tanggal_kembali'=>'2026-11-19','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'30H Full Month — Paradise Hotel 9N / Burj Mawaddah 19N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-OKT26-006','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-25','tanggal_kembali'=>'2026-11-09','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Al Muwahidin 9N / Burj Mawaddah 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-OKT26-007','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-26','tanggal_kembali'=>'2026-11-06','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Maysan Al Maqam 5N / Arkan Golden 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>19,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-OKT26-008','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-10-28','tanggal_kembali'=>'2026-11-10','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda SUB-MED — Thaiba Suite 7N / Rawabi Zamzam 5N','created_at'=>now(),'updated_at'=>now()],
            // Paket 20 — September 2026 (12 program)
            ['paket_id'=>20,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-SEP26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-02','tanggal_kembali'=>'2026-09-15','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda — Waha Dheafa 7N / Arkan Golden 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-SEP26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-05','tanggal_kembali'=>'2026-09-20','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Garuda — Al Muwahidin 5N / Arkan Golden 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-06','tanggal_kembali'=>'2026-09-21','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mekkah Tower 5N / Al Anshor GT 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-13','tanggal_kembali'=>'2026-09-28','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Al Muwahidin 5N / Amjad 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-005','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-14','tanggal_kembali'=>'2026-09-25','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Mekkah Tower 5N / Al Anshor GT 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-006','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-14','tanggal_kembali'=>'2026-09-25','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Mather Jiwar 5N / Amjad 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-007','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-17','tanggal_kembali'=>'2026-09-29','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'13H — Al Miqad 5N / Thaiba Suite 6N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-008','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-20','tanggal_kembali'=>'2026-10-05','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Mekkah Tower 5N / Al Anshor GT 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-009','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-21','tanggal_kembali'=>'2026-10-02','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H — Al Muwahidin 5N / Barakah Karem 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-010','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-27','tanggal_kembali'=>'2026-10-12','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H — Rawabi Zam Zam 5N / Royal Madinah 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-SEP26-011','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-28','tanggal_kembali'=>'2026-10-09','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda — Manazil Wisam 5N / Barakah Karem 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>20,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-SEP26-012','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-09-01','tanggal_kembali'=>'2026-09-30','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'30H Full Month — Paradise Hotel 9N / Burj Mawaddah 19N','created_at'=>now(),'updated_at'=>now()],
            // Paket 21 — November Hijrah 1448H (7 program)
            ['paket_id'=>21,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-NOV26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-02','tanggal_kembali'=>'2026-11-13','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda SUB-JED — Tallah Ajyad 5N / Barakah Karem 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-NOV26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-11','tanggal_kembali'=>'2026-11-24','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda SUB-MED — Arkan Golden 5N / Waha Dheafa 7N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-NOV26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-21','tanggal_kembali'=>'2026-12-06','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Garuda SUB-JED — Paradise Hotel 5N / Burj Mawaddah 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>1,'kode_jadwal'=>'JDW-NOV26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-21','tanggal_kembali'=>'2026-12-20','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'30H Transit SUB-JED — Paradise Hotel 19N / Burj Mawaddah 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-NOV26-005','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-23','tanggal_kembali'=>'2026-12-04','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Lion Air SUB-JED — Maysan Al Maqam 5N / Amjad 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-NOV26-006','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-29','tanggal_kembali'=>'2026-12-14','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Lion Air SUB-JED — Rawabi Zam Zam 5N / Amjad 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>21,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-NOV26-007','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-11-30','tanggal_kembali'=>'2026-12-11','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Garuda SUB-JED — Mather Jiwar 5N / Amjad 5N','created_at'=>now(),'updated_at'=>now()],
            // Paket 22 — Desember Akhir Tahun 2026 (4 program)
            ['paket_id'=>22,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-DES26-001','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-12-09','tanggal_kembali'=>'2026-12-22','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'14H Garuda SUB-MED — Burj Mawaddah 5N / Paradise Hotel 7N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>22,'maskapai_id'=>1,  'kode_jadwal'=>'JDW-DES26-002','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-12-12','tanggal_kembali'=>'2026-12-27','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Garuda SUB-JED — Manazil Wisam 5N / Barakah Karem 9N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>22,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-DES26-003','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-12-14','tanggal_kembali'=>'2026-12-25','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'12H Lion Air SUB-JED — Mather Jiwar 5N / Amjad 5N','created_at'=>now(),'updated_at'=>now()],
            ['paket_id'=>22,'maskapai_id'=>2,  'kode_jadwal'=>'JDW-DES26-004','kota_keberangkatan'=>'Surabaya','bandara_keberangkatan'=>'SUB','tanggal_berangkat'=>'2026-12-20','tanggal_kembali'=>'2027-01-04','kuota_total'=>40,'kuota_terisi'=>0,'status'=>'OPEN','catatan_internal'=>'16H Lion Air SUB-JED — Manazil Wisam 9N / Amjad 5N','created_at'=>now(),'updated_at'=>now()],
        ];

        DB::table('jadwal')->insert($jadwals);

        // Mapping jadwal_hotel — checkin/checkout per hotel per jadwal
        $jadwalHotels = [
            // jadwal 1 Flash Sale (Jan 21–Feb 2) — Manazil Wisam(Mek=18), Amjad(Mad=7)
            ['jadwal_id'=>1, 'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-01-22','checkout'=>'2026-01-27'],
            ['jadwal_id'=>1, 'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-01-27','checkout'=>'2026-02-01'],
            // jadwal 2 Full Ramadan (Feb 22–Mar 23) — Mather Jiwar(Mek=4), Burj Mawaddah(Mad=15)
            ['jadwal_id'=>2, 'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-02-23','checkout'=>'2026-03-14'],
            ['jadwal_id'=>2, 'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-03-14','checkout'=>'2026-03-22'],
            // jadwal 3 Cairo kloter 1 (Feb 17–Feb 25) — ODST(Mek=20), Le Meredien Tower(Mad=19)
            ['jadwal_id'=>3, 'hotel_id'=>20,'urutan'=>1,'checkin'=>'2026-02-18','checkout'=>'2026-02-22'],
            ['jadwal_id'=>3, 'hotel_id'=>19,'urutan'=>2,'checkin'=>'2026-02-22','checkout'=>'2026-02-25'],
            // jadwal 4 Cairo kloter 2 (Feb 24–Mar 4) — ODST(Mek=20), Le Meredien Tower(Mad=19)
            ['jadwal_id'=>4, 'hotel_id'=>20,'urutan'=>1,'checkin'=>'2026-02-25','checkout'=>'2026-03-01'],
            ['jadwal_id'=>4, 'hotel_id'=>19,'urutan'=>2,'checkin'=>'2026-03-01','checkout'=>'2026-03-04'],
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
            // jadwal 14: 16H 5-Jul — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 9N
            ['jadwal_id'=>14,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-07-06','checkout'=>'2026-07-11'],
            ['jadwal_id'=>14,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-07-11','checkout'=>'2026-07-20'],
            // jadwal 15: 12H 6-Jul — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 5N
            ['jadwal_id'=>15,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-07-07','checkout'=>'2026-07-12'],
            ['jadwal_id'=>15,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-07-12','checkout'=>'2026-07-17'],
            // jadwal 16: 12H 6-Jul — Al Qeswah(Mek=14) 5N, Burj Mawaddah(Mad=15) 5N
            ['jadwal_id'=>16,'hotel_id'=>14,'urutan'=>1,'checkin'=>'2026-07-07','checkout'=>'2026-07-12'],
            ['jadwal_id'=>16,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-07-12','checkout'=>'2026-07-17'],
            // jadwal 17: 14H 8-Jul SUB-MED — Arkan Golden(Mad=24) 5N dulu, Waha Dheafa(Mek=23) 7N
            ['jadwal_id'=>17,'hotel_id'=>24,'urutan'=>1,'checkin'=>'2026-07-09','checkout'=>'2026-07-14'],
            ['jadwal_id'=>17,'hotel_id'=>23,'urutan'=>2,'checkin'=>'2026-07-14','checkout'=>'2026-07-21'],
            // jadwal 18: 16H 12-Jul — Mather Jiwar(Mek=4) 5N, Amjad(Mad=7) 9N
            ['jadwal_id'=>18,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-07-13','checkout'=>'2026-07-18'],
            ['jadwal_id'=>18,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-07-18','checkout'=>'2026-07-27'],
            // jadwal 19: 12H 13-Jul Garuda SUB-MED — Amjad(Mad=7) 5N dulu, Maysan Al Maqam(Mek=2) 5N
            ['jadwal_id'=>19,'hotel_id'=>7, 'urutan'=>1,'checkin'=>'2026-07-14','checkout'=>'2026-07-19'],
            ['jadwal_id'=>19,'hotel_id'=>2, 'urutan'=>2,'checkin'=>'2026-07-19','checkout'=>'2026-07-24'],
            // jadwal 20: 16H 19-Jul — Villa Retaj(Mek=25) 5N, Royal Madinah(Mad=26) 9N
            ['jadwal_id'=>20,'hotel_id'=>25,'urutan'=>1,'checkin'=>'2026-07-20','checkout'=>'2026-07-25'],
            ['jadwal_id'=>20,'hotel_id'=>26,'urutan'=>2,'checkin'=>'2026-07-25','checkout'=>'2026-08-03'],
            // jadwal 21: 12H 20-Jul — Villa Hilton(Mek=27) 5N, Al Anshor GT(Mad=22) 5N
            ['jadwal_id'=>21,'hotel_id'=>27,'urutan'=>1,'checkin'=>'2026-07-21','checkout'=>'2026-07-26'],
            ['jadwal_id'=>21,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-07-26','checkout'=>'2026-07-31'],
            // jadwal 22: 12H 23-Jul — Thaiba Front(Mek=28) 6N, Shofwa Tower(Mad=29) 5N
            ['jadwal_id'=>22,'hotel_id'=>28,'urutan'=>1,'checkin'=>'2026-07-24','checkout'=>'2026-07-30'],
            ['jadwal_id'=>22,'hotel_id'=>29,'urutan'=>2,'checkin'=>'2026-07-30','checkout'=>'2026-08-03'],
            // jadwal 23: 16H 26-Jul — Tallah Ajyad(Mek=3) 5N, Amjad(Mad=7) 9N
            ['jadwal_id'=>23,'hotel_id'=>3, 'urutan'=>1,'checkin'=>'2026-07-27','checkout'=>'2026-08-01'],
            ['jadwal_id'=>23,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-08-01','checkout'=>'2026-08-10'],
            // jadwal 24: 30H Full Month Jul — Paradise Hotel(Mek=30) 19N, Burj Mawaddah(Mad=15) 9N
            ['jadwal_id'=>24,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-07-02','checkout'=>'2026-07-21'],
            ['jadwal_id'=>24,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-07-21','checkout'=>'2026-07-30'],
            // jadwal 25: 16H 2-Ags — Al Muwahidin(Mek=31) 5N, Thaiba Suite(Mad=8) 9N
            ['jadwal_id'=>25,'hotel_id'=>31,'urutan'=>1,'checkin'=>'2026-08-03','checkout'=>'2026-08-08'],
            ['jadwal_id'=>25,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-08','checkout'=>'2026-08-17'],
            // jadwal 26: 12H 3-Ags Garuda SUB-JED<>MED-SUB — Manazil Wisam(Mek=18) 5N, Barakah Karem(Mad=32) 5N
            ['jadwal_id'=>26,'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-08-04','checkout'=>'2026-08-09'],
            ['jadwal_id'=>26,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-08-09','checkout'=>'2026-08-14'],
            // jadwal 27: 13H 6-Ags — Al Miqat(Mek=33) 5N, Thaiba Suite(Mad=8) 6N
            ['jadwal_id'=>27,'hotel_id'=>33,'urutan'=>1,'checkin'=>'2026-08-07','checkout'=>'2026-08-12'],
            ['jadwal_id'=>27,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-12','checkout'=>'2026-08-18'],
            // jadwal 28: 16H 9-Ags — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 9N
            ['jadwal_id'=>28,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-08-10','checkout'=>'2026-08-15'],
            ['jadwal_id'=>28,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-08-15','checkout'=>'2026-08-24'],
            // jadwal 29: 13H 13-Ags — Thaiba Front(Mek=28) 6N, Shofwa Tower(Mad=29) 5N
            ['jadwal_id'=>29,'hotel_id'=>28,'urutan'=>1,'checkin'=>'2026-08-14','checkout'=>'2026-08-20'],
            ['jadwal_id'=>29,'hotel_id'=>29,'urutan'=>2,'checkin'=>'2026-08-20','checkout'=>'2026-08-25'],
            // jadwal 30: 12H 17-Ags — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 5N
            ['jadwal_id'=>30,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-08-18','checkout'=>'2026-08-23'],
            ['jadwal_id'=>30,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-08-23','checkout'=>'2026-08-28'],
            // jadwal 31: 14H 19-Ags Garuda — Paradise Hotel(Mek=30) 7N, Burj Mawaddah(Mad=15) 5N
            ['jadwal_id'=>31,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-08-20','checkout'=>'2026-08-27'],
            ['jadwal_id'=>31,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-08-27','checkout'=>'2026-09-01'],
            // jadwal 32: 13H 20-Ags — Tallah Ajyad(Mek=3) 5N, Thaiba Suite(Mad=8) 6N
            ['jadwal_id'=>32,'hotel_id'=>3, 'urutan'=>1,'checkin'=>'2026-08-21','checkout'=>'2026-08-26'],
            ['jadwal_id'=>32,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-26','checkout'=>'2026-09-01'],
            // jadwal 33: 12H 22-Ags — Villa Hilton(Mek=27) 5N, Al Anshor GT(Mad=22) 5N
            ['jadwal_id'=>33,'hotel_id'=>27,'urutan'=>1,'checkin'=>'2026-08-23','checkout'=>'2026-08-28'],
            ['jadwal_id'=>33,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-08-28','checkout'=>'2026-09-02'],
            // jadwal 34: 16H 23-Ags — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 9N
            ['jadwal_id'=>34,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-08-24','checkout'=>'2026-08-29'],
            ['jadwal_id'=>34,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-08-29','checkout'=>'2026-09-07'],
            // jadwal 35: 16H 23-Ags — Al Qeswah(Mek=14) 9N, Burj Mawaddah(Mad=15) 5N
            ['jadwal_id'=>35,'hotel_id'=>14,'urutan'=>1,'checkin'=>'2026-08-24','checkout'=>'2026-09-02'],
            ['jadwal_id'=>35,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-09-02','checkout'=>'2026-09-07'],
            // jadwal 36: 12H 24-Ags — Maysan Al Maqam(Mek=2) 5N, Thaiba Suite(Mad=8) 5N
            ['jadwal_id'=>36,'hotel_id'=>2, 'urutan'=>1,'checkin'=>'2026-08-25','checkout'=>'2026-08-30'],
            ['jadwal_id'=>36,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-08-30','checkout'=>'2026-09-04'],
            // jadwal 37: 14H 26-Ags Garuda SUB-MED<>JED-SUB — Thaiba Suite(Mad=8) 5N dulu, Rawabi Zam Zam(Mek=34) 7N
            ['jadwal_id'=>37,'hotel_id'=>8, 'urutan'=>1,'checkin'=>'2026-08-27','checkout'=>'2026-09-01'],
            ['jadwal_id'=>37,'hotel_id'=>34,'urutan'=>2,'checkin'=>'2026-09-01','checkout'=>'2026-09-08'],
            // jadwal 38: 16H 30-Ags — Mather Jiwar(Mek=4) 5N, Amjad(Mad=7) 9N
            ['jadwal_id'=>38,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-08-31','checkout'=>'2026-09-05'],
            ['jadwal_id'=>38,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-09-05','checkout'=>'2026-09-14'],
            // jadwal 39: 30H Full Month Ags — Paradise Hotel(Mek=30) 19N, Burj Mawaddah(Mad=15) 9N
            ['jadwal_id'=>39,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-08-02','checkout'=>'2026-08-21'],
            ['jadwal_id'=>39,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-08-21','checkout'=>'2026-08-30'],
            // jadwal 40: 16H 3-Okt Garuda — Paradise Hotel(Mek=30) 5N, Burj Mawaddah(Mad=15) 9N
            ['jadwal_id'=>40,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-10-04','checkout'=>'2026-10-09'],
            ['jadwal_id'=>40,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-10-09','checkout'=>'2026-10-18'],
            // jadwal 41: 16H 4-Okt — Manazil Hijrah(Mek=35) 9N, Barakah Karem(Mad=32) 5N
            ['jadwal_id'=>41,'hotel_id'=>35,'urutan'=>1,'checkin'=>'2026-10-05','checkout'=>'2026-10-14'],
            ['jadwal_id'=>41,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-10-14','checkout'=>'2026-10-19'],
            // jadwal 42: 14H 7-Okt Garuda SUB-MED — Arkan Golden(Mad=24) 5N dulu, Tallah Ajyad(Mek=3) 5N
            ['jadwal_id'=>42,'hotel_id'=>24,'urutan'=>1,'checkin'=>'2026-10-08','checkout'=>'2026-10-13'],
            ['jadwal_id'=>42,'hotel_id'=>3, 'urutan'=>2,'checkin'=>'2026-10-13','checkout'=>'2026-10-18'],
            // jadwal 43: 12H 19-Okt Garuda — Mather Jiwar(Mek=4) 5N, Amjad Salam(Mad=36) 5N
            ['jadwal_id'=>43,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-10-20','checkout'=>'2026-10-25'],
            ['jadwal_id'=>43,'hotel_id'=>36,'urutan'=>2,'checkin'=>'2026-10-25','checkout'=>'2026-10-30'],
            // jadwal 44: 30H 21-Okt — Paradise Hotel(Mek=30) 9N, Burj Mawaddah(Mad=15) 19N
            ['jadwal_id'=>44,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-10-22','checkout'=>'2026-10-31'],
            ['jadwal_id'=>44,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-10-31','checkout'=>'2026-11-19'],
            // jadwal 45: 16H 25-Okt — Al Muwahidin(Mek=31) 9N, Burj Mawaddah(Mad=15) 5N
            ['jadwal_id'=>45,'hotel_id'=>31,'urutan'=>1,'checkin'=>'2026-10-26','checkout'=>'2026-11-04'],
            ['jadwal_id'=>45,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-11-04','checkout'=>'2026-11-09'],
            // jadwal 46: 12H 26-Okt — Maysan Al Maqam(Mek=2) 5N, Arkan Golden(Mad=24) 5N
            ['jadwal_id'=>46,'hotel_id'=>2, 'urutan'=>1,'checkin'=>'2026-10-27','checkout'=>'2026-11-01'],
            ['jadwal_id'=>46,'hotel_id'=>24,'urutan'=>2,'checkin'=>'2026-11-01','checkout'=>'2026-11-06'],
            // jadwal 47: 14H 28-Okt Garuda SUB-MED — Thaiba Suite(Mad=8) 7N dulu, Rawabi Zam Zam(Mek=34) 5N
            ['jadwal_id'=>47,'hotel_id'=>8, 'urutan'=>1,'checkin'=>'2026-10-29','checkout'=>'2026-11-05'],
            ['jadwal_id'=>47,'hotel_id'=>34,'urutan'=>2,'checkin'=>'2026-11-05','checkout'=>'2026-11-10'],
            // jadwal 48: 14H 2-Sep Garuda — Waha Dheafa(Mek=23) 7N, Arkan Golden(Mad=24) 5N
            ['jadwal_id'=>48,'hotel_id'=>23,'urutan'=>1,'checkin'=>'2026-09-03','checkout'=>'2026-09-10'],
            ['jadwal_id'=>48,'hotel_id'=>24,'urutan'=>2,'checkin'=>'2026-09-10','checkout'=>'2026-09-15'],
            // jadwal 49: 16H 5-Sep Garuda — Al Muwahidin(Mek=31) 5N, Arkan Golden(Mad=24) 9N
            ['jadwal_id'=>49,'hotel_id'=>31,'urutan'=>1,'checkin'=>'2026-09-06','checkout'=>'2026-09-11'],
            ['jadwal_id'=>49,'hotel_id'=>24,'urutan'=>2,'checkin'=>'2026-09-11','checkout'=>'2026-09-20'],
            // jadwal 50: 16H 6-Sep — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 9N
            ['jadwal_id'=>50,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-09-07','checkout'=>'2026-09-12'],
            ['jadwal_id'=>50,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-09-12','checkout'=>'2026-09-21'],
            // jadwal 51: 16H 13-Sep — Al Muwahidin(Mek=31) 5N, Amjad(Mad=7) 9N
            ['jadwal_id'=>51,'hotel_id'=>31,'urutan'=>1,'checkin'=>'2026-09-14','checkout'=>'2026-09-19'],
            ['jadwal_id'=>51,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-09-19','checkout'=>'2026-09-28'],
            // jadwal 52: 12H 14-Sep — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 5N
            ['jadwal_id'=>52,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-09-15','checkout'=>'2026-09-20'],
            ['jadwal_id'=>52,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-09-20','checkout'=>'2026-09-25'],
            // jadwal 53: 12H 14-Sep — Mather Jiwar(Mek=4) 5N, Amjad(Mad=7) 5N
            ['jadwal_id'=>53,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-09-15','checkout'=>'2026-09-20'],
            ['jadwal_id'=>53,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-09-20','checkout'=>'2026-09-25'],
            // jadwal 54: 13H 17-Sep — Al Miqad(Mek=37) 5N, Thaiba Suite(Mad=8) 6N
            ['jadwal_id'=>54,'hotel_id'=>37,'urutan'=>1,'checkin'=>'2026-09-18','checkout'=>'2026-09-23'],
            ['jadwal_id'=>54,'hotel_id'=>8, 'urutan'=>2,'checkin'=>'2026-09-23','checkout'=>'2026-09-29'],
            // jadwal 55: 16H 20-Sep — Mekkah Tower(Mek=21) 5N, Al Anshor GT(Mad=22) 9N
            ['jadwal_id'=>55,'hotel_id'=>21,'urutan'=>1,'checkin'=>'2026-09-21','checkout'=>'2026-09-26'],
            ['jadwal_id'=>55,'hotel_id'=>22,'urutan'=>2,'checkin'=>'2026-09-26','checkout'=>'2026-10-05'],
            // jadwal 56: 12H 21-Sep — Al Muwahidin(Mek=31) 5N, Barakah Karem(Mad=32) 5N
            ['jadwal_id'=>56,'hotel_id'=>31,'urutan'=>1,'checkin'=>'2026-09-22','checkout'=>'2026-09-27'],
            ['jadwal_id'=>56,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-09-27','checkout'=>'2026-10-02'],
            // jadwal 57: 16H 27-Sep — Rawabi Zam Zam(Mek=34) 5N, Royal Madinah(Mad=26) 9N
            ['jadwal_id'=>57,'hotel_id'=>34,'urutan'=>1,'checkin'=>'2026-09-28','checkout'=>'2026-10-03'],
            ['jadwal_id'=>57,'hotel_id'=>26,'urutan'=>2,'checkin'=>'2026-10-03','checkout'=>'2026-10-12'],
            // jadwal 58: 12H 28-Sep Garuda — Manazil Wisam(Mek=18) 5N, Barakah Karem(Mad=32) 5N
            ['jadwal_id'=>58,'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-09-29','checkout'=>'2026-10-04'],
            ['jadwal_id'=>58,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-10-04','checkout'=>'2026-10-09'],
            // jadwal 59: 30H Full Month Sep — Paradise Hotel(Mek=30) 9N, Burj Mawaddah(Mad=15) 19N
            ['jadwal_id'=>59,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-09-02','checkout'=>'2026-09-11'],
            ['jadwal_id'=>59,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-09-11','checkout'=>'2026-09-30'],
            // jadwal 60: 12H 2-Nov Garuda SUB-JED — Tallah Ajyad(Mek=3) 5N, Barakah Karem(Mad=32) 5N
            ['jadwal_id'=>60,'hotel_id'=>3, 'urutan'=>1,'checkin'=>'2026-11-03','checkout'=>'2026-11-08'],
            ['jadwal_id'=>60,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-11-08','checkout'=>'2026-11-13'],
            // jadwal 61: 14H 11-Nov Garuda SUB-MED — Arkan Golden(Mad=24) 5N dulu, Waha Dheafa(Mek=23) 7N
            ['jadwal_id'=>61,'hotel_id'=>24,'urutan'=>1,'checkin'=>'2026-11-12','checkout'=>'2026-11-17'],
            ['jadwal_id'=>61,'hotel_id'=>23,'urutan'=>2,'checkin'=>'2026-11-17','checkout'=>'2026-11-24'],
            // jadwal 62: 16H 21-Nov Garuda SUB-JED — Paradise Hotel(Mek=30) 5N, Burj Mawaddah(Mad=15) 9N
            ['jadwal_id'=>62,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-11-22','checkout'=>'2026-11-27'],
            ['jadwal_id'=>62,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-11-27','checkout'=>'2026-12-06'],
            // jadwal 63: 30H 21-Nov Transit SUB-JED — Paradise Hotel(Mek=30) 19N, Burj Mawaddah(Mad=15) 9N
            ['jadwal_id'=>63,'hotel_id'=>30,'urutan'=>1,'checkin'=>'2026-11-22','checkout'=>'2026-12-11'],
            ['jadwal_id'=>63,'hotel_id'=>15,'urutan'=>2,'checkin'=>'2026-12-11','checkout'=>'2026-12-20'],
            // jadwal 64: 12H 23-Nov Lion Air SUB-JED — Maysan Al Maqam(Mek=2) 5N, Amjad(Mad=7) 5N
            ['jadwal_id'=>64,'hotel_id'=>2, 'urutan'=>1,'checkin'=>'2026-11-24','checkout'=>'2026-11-29'],
            ['jadwal_id'=>64,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-11-29','checkout'=>'2026-12-04'],
            // jadwal 65: 16H 29-Nov Lion Air SUB-JED — Rawabi Zam Zam(Mek=34) 5N, Amjad(Mad=7) 9N
            ['jadwal_id'=>65,'hotel_id'=>34,'urutan'=>1,'checkin'=>'2026-11-30','checkout'=>'2026-12-05'],
            ['jadwal_id'=>65,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-12-05','checkout'=>'2026-12-14'],
            // jadwal 66: 12H 30-Nov Garuda SUB-JED — Mather Jiwar(Mek=4) 5N, Amjad(Mad=7) 5N
            ['jadwal_id'=>66,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-12-01','checkout'=>'2026-12-06'],
            ['jadwal_id'=>66,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-12-06','checkout'=>'2026-12-11'],
            // jadwal 67: 14H 9-Des Garuda SUB-MED — Burj Mawaddah(Mad=15) 5N dulu, Paradise Hotel(Mek=30) 7N
            ['jadwal_id'=>67,'hotel_id'=>15,'urutan'=>1,'checkin'=>'2026-12-10','checkout'=>'2026-12-15'],
            ['jadwal_id'=>67,'hotel_id'=>30,'urutan'=>2,'checkin'=>'2026-12-15','checkout'=>'2026-12-22'],
            // jadwal 68: 16H 12-Des Garuda SUB-JED — Manazil Wisam(Mek=18) 5N, Barakah Karem(Mad=32) 9N
            ['jadwal_id'=>68,'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-12-13','checkout'=>'2026-12-18'],
            ['jadwal_id'=>68,'hotel_id'=>32,'urutan'=>2,'checkin'=>'2026-12-18','checkout'=>'2026-12-27'],
            // jadwal 69: 12H 14-Des Lion Air SUB-JED — Mather Jiwar(Mek=4) 5N, Amjad(Mad=7) 5N
            ['jadwal_id'=>69,'hotel_id'=>4, 'urutan'=>1,'checkin'=>'2026-12-15','checkout'=>'2026-12-20'],
            ['jadwal_id'=>69,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-12-20','checkout'=>'2026-12-25'],
            // jadwal 70: 16H 20-Des Lion Air SUB-JED — Manazil Wisam(Mek=18) 9N, Amjad(Mad=7) 5N
            ['jadwal_id'=>70,'hotel_id'=>18,'urutan'=>1,'checkin'=>'2026-12-21','checkout'=>'2026-12-30'],
            ['jadwal_id'=>70,'hotel_id'=>7, 'urutan'=>2,'checkin'=>'2026-12-30','checkout'=>'2027-01-04'],
        ];

        DB::table('jadwal_hotel')->insert($jadwalHotels);

        // Sesi Manasik
        $sesiManasik = [
            ['jadwal_id'=>2, 'tanggal'=>'2026-02-15','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh & Tata Cara Ibadah','pembimbing'=>'Ust. H. Ahmad Fauzi'],
            ['jadwal_id'=>2, 'tanggal'=>'2026-02-20','jam_mulai'=>'08:00:00','jam_selesai'=>'12:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Manasik Final + Perlengkapan & Perbekalan','pembimbing'=>'Ust. H. Ahmad Fauzi'],
            ['jadwal_id'=>6, 'tanggal'=>'2026-03-25','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh & Doa-Doa Penting','pembimbing'=>null],
            ['jadwal_id'=>7, 'tanggal'=>'2026-06-27','jam_mulai'=>'08:00:00','jam_selesai'=>'11:00:00','lokasi'=>'Kantor Namiroh, Jl. Gajah Mada No.10/03 Mojosari','materi'=>'Fiqih Umroh, Zikir & Doa di Tanah Suci','pembimbing'=>null],
        ];

        DB::table('sesi_manasik')->insert($sesiManasik);

        $this->command->info('✅ JadwalSeeder: '.count($jadwals).' jadwal, '.count($jadwalHotels).' jadwal_hotel, '.count($sesiManasik).' sesi_manasik berhasil ditambahkan.');
    }
}
