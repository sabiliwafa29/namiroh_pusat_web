<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $table = 'hotel';
    protected $fillable = ['nama', 'kota', 'bintang', 'jarak_masjid_meter', 'is_active'];

    public function jadwalHotel()
    {
        return $this->hasMany(JadwalHotel::class);
    }
}
