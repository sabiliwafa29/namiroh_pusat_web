<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JamaahSeeder extends Seeder
{
    public function run(): void
    {
        $jamaah = [
            [
                'nik' => '3578011234567890', 'nama_lengkap' => 'Budi Santoso',         'nama_latin' => 'BUDI SANTOSO',
                'jenis_kelamin' => 'L', 'tempat_lahir' => 'Surabaya',    'tanggal_lahir' => '1975-03-15',
                'golongan_darah' => 'O', 'no_hp' => '6281234567890', 'email' => 'budi@gmail.com',
                'alamat_jalan' => 'Jl. Raya Gubeng No. 10', 'kota_id' => 1, 'kode_pos' => '60281',
                'no_paspor' => 'B1234567', 'paspor_berlaku_sd' => '2030-06-01',
                'nama_kontak_darurat' => 'Siti Santoso', 'hp_kontak_darurat' => '6289876543210', 'hubungan_darurat' => 'Istri',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578011234567891', 'nama_lengkap' => 'Siti Santoso',         'nama_latin' => 'SITI SANTOSO',
                'jenis_kelamin' => 'P', 'tempat_lahir' => 'Surabaya',    'tanggal_lahir' => '1978-07-22',
                'golongan_darah' => 'A', 'no_hp' => '6281234567891', 'email' => 'siti@gmail.com',
                'alamat_jalan' => 'Jl. Raya Gubeng No. 10', 'kota_id' => 1, 'kode_pos' => '60281',
                'no_paspor' => 'B1234568', 'paspor_berlaku_sd' => '2030-06-01',
                'nama_kontak_darurat' => 'Budi Santoso', 'hp_kontak_darurat' => '6281234567890', 'hubungan_darurat' => 'Suami',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578021234567892', 'nama_lengkap' => 'H. Mulyadi',           'nama_latin' => 'MULYADI',
                'jenis_kelamin' => 'L', 'tempat_lahir' => 'Bandung',     'tanggal_lahir' => '1965-11-05',
                'golongan_darah' => 'B', 'no_hp' => '6282345678901', 'email' => 'mulyadi@gmail.com',
                'alamat_jalan' => 'Jl. Dago No. 55', 'kota_id' => 21, 'kode_pos' => '40135',
                'no_paspor' => 'C2345678', 'paspor_berlaku_sd' => '2029-03-15',
                'nama_kontak_darurat' => 'Hj. Mulyadi', 'hp_kontak_darurat' => '6282345678902', 'hubungan_darurat' => 'Istri',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578031234567893', 'nama_lengkap' => 'Ahmad Fauzi',           'nama_latin' => 'AHMAD FAUZI',
                'jenis_kelamin' => 'L', 'tempat_lahir' => 'Mojokerto',   'tanggal_lahir' => '1980-04-20',
                'golongan_darah' => 'AB','no_hp' => '6283456789012', 'email' => 'fauzi@gmail.com',
                'alamat_jalan' => 'Jl. Gajah Mada No. 22', 'kota_id' => 2, 'kode_pos' => '61300',
                'no_paspor' => 'D3456789', 'paspor_berlaku_sd' => '2031-08-10',
                'nama_kontak_darurat' => 'Rina Fauzi', 'hp_kontak_darurat' => '6283456789013', 'hubungan_darurat' => 'Istri',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578041234567894', 'nama_lengkap' => 'Rina Fauzi',            'nama_latin' => 'RINA FAUZI',
                'jenis_kelamin' => 'P', 'tempat_lahir' => 'Malang',      'tanggal_lahir' => '1983-09-12',
                'golongan_darah' => 'O', 'no_hp' => '6284567890123', 'email' => 'rina@gmail.com',
                'alamat_jalan' => 'Jl. Gajah Mada No. 22', 'kota_id' => 2, 'kode_pos' => '61300',
                'no_paspor' => 'E4567890', 'paspor_berlaku_sd' => '2031-08-10',
                'nama_kontak_darurat' => 'Ahmad Fauzi', 'hp_kontak_darurat' => '6283456789012', 'hubungan_darurat' => 'Suami',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578051234567895', 'nama_lengkap' => 'Hj. Fatimah Zahra',    'nama_latin' => 'FATIMAH ZAHRA',
                'jenis_kelamin' => 'P', 'tempat_lahir' => 'Kediri',      'tanggal_lahir' => '1960-01-30',
                'golongan_darah' => 'A', 'no_hp' => '6285678901234', 'email' => null,
                'alamat_jalan' => 'Jl. Dhoho No. 8', 'kota_id' => 6, 'kode_pos' => '64121',
                'no_paspor' => 'F5678901', 'paspor_berlaku_sd' => '2028-12-20',
                'nama_kontak_darurat' => 'Umar Zahra', 'hp_kontak_darurat' => '6285678901235', 'hubungan_darurat' => 'Anak',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578061234567896', 'nama_lengkap' => 'Rizky Pratama',         'nama_latin' => 'RIZKY PRATAMA',
                'jenis_kelamin' => 'L', 'tempat_lahir' => 'Jakarta',     'tanggal_lahir' => '1990-05-17',
                'golongan_darah' => 'B', 'no_hp' => '6286789012345', 'email' => 'rizky@gmail.com',
                'alamat_jalan' => 'Jl. Sudirman No. 100', 'kota_id' => 17, 'kode_pos' => '12190',
                'no_paspor' => 'G6789012', 'paspor_berlaku_sd' => '2032-04-05',
                'nama_kontak_darurat' => 'Dewi Pratama', 'hp_kontak_darurat' => '6286789012346', 'hubungan_darurat' => 'Ibu',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578071234567897', 'nama_lengkap' => 'Dewi Rahayu',           'nama_latin' => 'DEWI RAHAYU',
                'jenis_kelamin' => 'P', 'tempat_lahir' => 'Yogyakarta',  'tanggal_lahir' => '1985-08-25',
                'golongan_darah' => 'O', 'no_hp' => '6287890123456', 'email' => 'dewi@gmail.com',
                'alamat_jalan' => 'Jl. Malioboro No. 45', 'kota_id' => 31, 'kode_pos' => '55213',
                'no_paspor' => 'H7890123', 'paspor_berlaku_sd' => '2030-11-30',
                'nama_kontak_darurat' => 'Agus Rahayu', 'hp_kontak_darurat' => '6287890123457', 'hubungan_darurat' => 'Suami',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578081234567898', 'nama_lengkap' => 'Ust. Ahmad Ridwan',    'nama_latin' => 'AHMAD RIDWAN',
                'jenis_kelamin' => 'L', 'tempat_lahir' => 'Yogyakarta',  'tanggal_lahir' => '1970-12-10',
                'golongan_darah' => 'A', 'no_hp' => '6288901234567', 'email' => 'ridwan@gmail.com',
                'alamat_jalan' => 'Jl. Kaliurang No. 33', 'kota_id' => 32, 'kode_pos' => '55581',
                'no_paspor' => 'I8901234', 'paspor_berlaku_sd' => '2029-07-14',
                'nama_kontak_darurat' => 'Siti Ridwan', 'hp_kontak_darurat' => '6288901234568', 'hubungan_darurat' => 'Istri',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'nik' => '3578091234567899', 'nama_lengkap' => 'Ning Umi Laila',        'nama_latin' => 'UMI LAILA',
                'jenis_kelamin' => 'P', 'tempat_lahir' => 'Surabaya',    'tanggal_lahir' => '1972-02-14',
                'golongan_darah' => 'B', 'no_hp' => '6289012345678', 'email' => 'umilailah@gmail.com',
                'alamat_jalan' => 'Jl. Pemuda No. 12', 'kota_id' => 1, 'kode_pos' => '60271',
                'no_paspor' => 'J9012345', 'paspor_berlaku_sd' => '2030-09-20',
                'nama_kontak_darurat' => 'Kiai Laila', 'hp_kontak_darurat' => '6289012345679', 'hubungan_darurat' => 'Suami',
                'is_active' => 1, 'created_at' => now(), 'updated_at' => now(),
            ],
        ];

        DB::table('jamaah')->insert($jamaah);
        $this->command->info('✅ JamaahSeeder: ' . count($jamaah) . ' jamaah ditambahkan.');
    }
}
