<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jamaah extends Model
{
    protected $table    = 'jamaah';
    protected $fillable = [
        'nik', 'nama_lengkap', 'nama_latin', 'jenis_kelamin',
        'tempat_lahir', 'tanggal_lahir', 'golongan_darah',
        'no_hp', 'no_hp_alternatif', 'email',
        'alamat_jalan', 'kota_id', 'kode_pos',
        'no_paspor', 'paspor_berlaku_sd', 'paspor_diterbitkan',
        'nama_kontak_darurat', 'hp_kontak_darurat', 'hubungan_darurat',
        'kondisi_kesehatan', 'is_active',
    ];
    protected $casts = [
        'tanggal_lahir'     => 'date',
        'paspor_berlaku_sd' => 'date',
    ];

    public function kota()        { return $this->belongsTo(Kota::class); }
    public function pendaftaran() { return $this->hasMany(Pendaftaran::class); }
}