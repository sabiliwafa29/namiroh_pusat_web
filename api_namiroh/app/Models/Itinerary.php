<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    protected $table = 'itinerary';
    protected $fillable = ['paket_id', 'hari_ke', 'judul', 'deskripsi', 'kota'];
}
