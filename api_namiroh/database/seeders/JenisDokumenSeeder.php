<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisDokumenSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jenis_dokumen')->insert([
            ['kode' => 'PASPOR',        'nama' => 'Paspor',                    'is_wajib' => 1, 'keterangan' => 'Berlaku minimal 6 bulan sebelum keberangkatan'],
            ['kode' => 'KTP',           'nama' => 'KTP',                       'is_wajib' => 1, 'keterangan' => 'Kartu Tanda Penduduk yang masih berlaku'],
            ['kode' => 'KK',            'nama' => 'Kartu Keluarga',            'is_wajib' => 1, 'keterangan' => 'Fotokopi Kartu Keluarga'],
            ['kode' => 'AKTA',          'nama' => 'Akta Lahir / Buku Nikah',   'is_wajib' => 0, 'keterangan' => 'Diperlukan untuk mahram'],
            ['kode' => 'FOTO',          'nama' => 'Pas Foto',                  'is_wajib' => 1, 'keterangan' => 'Foto terbaru 4x6, background putih'],
            ['kode' => 'VAKSIN',        'nama' => 'Buku Vaksin Meningitis',    'is_wajib' => 1, 'keterangan' => 'Vaksin meningitis minimal 2 minggu sebelum berangkat'],
            ['kode' => 'BUKU_TABUNGAN', 'nama' => 'Buku Tabungan',             'is_wajib' => 0, 'keterangan' => 'Diperlukan untuk pengajuan visa tertentu'],
        ]);

        $this->command->info('✅ JenisDokumenSeeder: 7 jenis dokumen ditambahkan.');
    }
}
