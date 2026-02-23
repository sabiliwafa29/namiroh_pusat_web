<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maskapai extends Model
{
    protected $table    = 'maskapai';
    protected $fillable = ['kode_iata', 'nama', 'logo_url', 'is_active'];
    public    $timestamps = false;

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class);
    }
}