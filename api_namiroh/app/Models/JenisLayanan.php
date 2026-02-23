<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisLayanan extends Model
{
    protected $table    = 'jenis_layanan';
    protected $fillable = ['kode', 'nama', 'deskripsi', 'is_active'];
    public    $timestamps = false;

    public function paket()
    {
        return $this->hasMany(Paket::class, 'jenis_layanan_id');
    }
}