<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisDokumen extends Model
{
    protected $table = 'jenis_dokumen';
    public $timestamps = false;
    protected $fillable = ['kode', 'nama', 'is_wajib', 'keterangan'];
}
