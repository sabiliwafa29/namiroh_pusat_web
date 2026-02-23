<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PendaftaranSeeder extends Seeder
{
    public function run(): void
    {
        $pendaftaran = [
            [
                'nomor_registrasi' => 'REG-202608-00001',
                'jadwal_id' => 3, 'jamaah_id' => 1,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 34250000,
                'status' => 'LUNAS', 'didaftarkan_oleh' => 1,
                'catatan' => 'Lunas transfer BCA',
                'tanggal_daftar' => '2026-06-01 09:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202608-00002',
                'jadwal_id' => 3, 'jamaah_id' => 2,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 34250000,
                'status' => 'LUNAS', 'didaftarkan_oleh' => 1,
                'catatan' => 'Paket suami istri, lunas bersama',
                'tanggal_daftar' => '2026-06-01 09:30:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202606-00001',
                'jadwal_id' => 5, 'jamaah_id' => 3,
                'tipe_kamar' => 'DOUBLE', 'harga_disepakati' => 55000000,
                'status' => 'VISA_APPROVED', 'didaftarkan_oleh' => 1,
                'catatan' => 'Paket VIP, visa sudah approved',
                'tanggal_daftar' => '2026-06-15 10:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202607-00001',
                'jadwal_id' => 1, 'jamaah_id' => 4,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 33600000,
                'status' => 'DP_DIBAYAR', 'didaftarkan_oleh' => 3,
                'catatan' => 'DP 5 juta sudah diterima',
                'tanggal_daftar' => '2026-07-01 08:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202607-00002',
                'jadwal_id' => 1, 'jamaah_id' => 5,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 33600000,
                'status' => 'DP_DIBAYAR', 'didaftarkan_oleh' => 3,
                'catatan' => 'Paket suami istri',
                'tanggal_daftar' => '2026-07-01 08:30:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202607-00003',
                'jadwal_id' => 2, 'jamaah_id' => 6,
                'tipe_kamar' => 'TRIPLE', 'harga_disepakati' => 36500000,
                'status' => 'MENUNGGU_DOKUMEN', 'didaftarkan_oleh' => 3,
                'catatan' => 'Menunggu scan paspor dan KK',
                'tanggal_daftar' => '2026-07-10 11:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202607-00004',
                'jadwal_id' => 4, 'jamaah_id' => 7,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 23000000,
                'status' => 'MENUNGGU_DP', 'didaftarkan_oleh' => 3,
                'catatan' => 'Mendaftar via website',
                'tanggal_daftar' => '2026-07-20 14:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202607-00005',
                'jadwal_id' => 3, 'jamaah_id' => 8,
                'tipe_kamar' => 'DOUBLE', 'harga_disepakati' => 42000000,
                'status' => 'DOKUMEN_LENGKAP', 'didaftarkan_oleh' => 1,
                'catatan' => 'Semua dokumen sudah diverifikasi',
                'tanggal_daftar' => '2026-07-25 09:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202608-00003',
                'jadwal_id' => 6, 'jamaah_id' => 9,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 37250000,
                'status' => 'MENUNGGU_DP', 'didaftarkan_oleh' => 3,
                'catatan' => 'Paket Turkey, menunggu konfirmasi DP',
                'tanggal_daftar' => '2026-08-01 10:00:00', 'updated_at' => now(),
            ],
            [
                'nomor_registrasi' => 'REG-202608-00004',
                'jadwal_id' => 2, 'jamaah_id' => 10,
                'tipe_kamar' => 'QUAD', 'harga_disepakati' => 33800000,
                'status' => 'LUNAS', 'didaftarkan_oleh' => 1,
                'catatan' => 'Pelunasan via transfer BNI',
                'tanggal_daftar' => '2026-08-05 13:00:00', 'updated_at' => now(),
            ],
        ];

        DB::table('pendaftaran')->insert($pendaftaran);

        // Log status pendaftaran
        $logs = [
            ['pendaftaran_id' => 1, 'status_lama' => 'MENUNGGU_DP', 'status_baru' => 'DP_DIBAYAR',      'catatan' => 'DP diterima', 'created_at' => '2026-06-03 10:00:00'],
            ['pendaftaran_id' => 1, 'status_lama' => 'DP_DIBAYAR',  'status_baru' => 'LUNAS',            'catatan' => 'Pelunasan diterima', 'created_at' => '2026-07-01 10:00:00'],
            ['pendaftaran_id' => 2, 'status_lama' => 'MENUNGGU_DP', 'status_baru' => 'DP_DIBAYAR',      'catatan' => 'DP bersama suami', 'created_at' => '2026-06-03 10:30:00'],
            ['pendaftaran_id' => 2, 'status_lama' => 'DP_DIBAYAR',  'status_baru' => 'LUNAS',            'catatan' => 'Lunas bersama', 'created_at' => '2026-07-01 10:30:00'],
            ['pendaftaran_id' => 3, 'status_lama' => 'MENUNGGU_DP', 'status_baru' => 'DP_DIBAYAR',      'catatan' => null, 'created_at' => '2026-06-17 09:00:00'],
            ['pendaftaran_id' => 3, 'status_lama' => 'DP_DIBAYAR',  'status_baru' => 'LUNAS',            'catatan' => null, 'created_at' => '2026-07-15 09:00:00'],
            ['pendaftaran_id' => 3, 'status_lama' => 'LUNAS',       'status_baru' => 'VISA_DIPROSES',    'catatan' => null, 'created_at' => '2026-08-01 09:00:00'],
            ['pendaftaran_id' => 3, 'status_lama' => 'VISA_DIPROSES','status_baru' => 'VISA_APPROVED',   'catatan' => 'Visa approved', 'created_at' => '2026-08-10 09:00:00'],
        ];

        DB::table('pendaftaran_log')->insert($logs);

        // Dokumen jamaah
        $dokumen = [
            ['pendaftaran_id' => 1, 'jenis_dokumen_id' => 1, 'file_url' => 'dokumen/1/paspor.pdf',     'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 1, 'jenis_dokumen_id' => 2, 'file_url' => 'dokumen/1/ktp.jpg',        'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 1, 'jenis_dokumen_id' => 3, 'file_url' => 'dokumen/1/kk.jpg',         'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 1, 'jenis_dokumen_id' => 6, 'file_url' => 'dokumen/1/vaksin.pdf',     'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 3, 'jenis_dokumen_id' => 1, 'file_url' => 'dokumen/3/paspor.pdf',     'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 3, 'jenis_dokumen_id' => 2, 'file_url' => 'dokumen/3/ktp.jpg',        'status_verifikasi' => 'DIVERIFIKASI', 'tanggal_upload' => now()],
            ['pendaftaran_id' => 6, 'jenis_dokumen_id' => 2, 'file_url' => 'dokumen/6/ktp.jpg',        'status_verifikasi' => 'DIUPLOAD',     'tanggal_upload' => now()],
        ];

        DB::table('dokumen_jamaah')->insert($dokumen);

        $this->command->info('✅ PendaftaranSeeder: ' . count($pendaftaran) . ' pendaftaran, ' . count($logs) . ' log, ' . count($dokumen) . ' dokumen ditambahkan.');
    }
}
