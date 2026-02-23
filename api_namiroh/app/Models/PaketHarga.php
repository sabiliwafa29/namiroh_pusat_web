<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaketHarga extends Model
{
    protected $table    = 'paket_harga';
    protected $fillable = ['paket_id', 'tipe_kamar', 'harga', 'keterangan'];
    public    $timestamps = false;
    protected $casts    = ['harga' => 'decimal:2'];

    public function paket()
    {
        return $this->belongsTo(Paket::class);
    }
}