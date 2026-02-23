<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalHotel extends Model
{
    protected $table = 'jadwal_hotel';
    protected $fillable = ['jadwal_id', 'hotel_id', 'urutan', 'checkin', 'checkout'];
}
