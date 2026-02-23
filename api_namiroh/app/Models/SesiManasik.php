<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SesiManasik extends Model
{
    protected $table = 'sesi_manasik';
    protected $fillable = ['jadwal_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'lokasi', 'materi', 'pembimbing'];
}
