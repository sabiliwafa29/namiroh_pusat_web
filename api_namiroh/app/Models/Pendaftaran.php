<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table      = 'pendaftaran';
    const CREATED_AT      = 'tanggal_daftar';
    const UPDATED_AT      = 'updated_at';

    protected $fillable = [
        'nomor_registrasi', 'jadwal_id', 'jamaah_id', 'tipe_kamar',
        'permintaan_khusus', 'harga_disepakati', 'status',
        'referral_kode', 'didaftarkan_oleh', 'catatan',
    ];
    protected $casts = ['harga_disepakati' => 'decimal:2'];

    public function jamaah()  { return $this->belongsTo(Jamaah::class); }
    public function jadwal()  { return $this->belongsTo(Jadwal::class); }
    public function dokumen() { return $this->hasMany(DokumenJamaah::class); }
    public function log()     { return $this->hasMany(PendaftaranLog::class)->orderBy('created_at', 'desc'); }
}