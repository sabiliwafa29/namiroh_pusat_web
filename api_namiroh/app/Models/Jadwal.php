<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table    = 'jadwal';
    protected $fillable = [
        'paket_id', 'maskapai_id', 'kode_jadwal', 'tanggal_berangkat',
        'tanggal_kembali', 'kota_keberangkatan', 'bandara_keberangkatan',
        'kuota_total', 'kuota_terisi', 'status', 'catatan_internal',
    ];
    protected $casts = [
        'tanggal_berangkat' => 'date',
        'tanggal_kembali'   => 'date',
    ];

    public function paket()       { return $this->belongsTo(Paket::class); }
    public function maskapai()    { return $this->belongsTo(Maskapai::class); }
    public function hotel()       { return $this->hasMany(JadwalHotel::class); }
    public function pendaftaran() { return $this->hasMany(Pendaftaran::class); }
}