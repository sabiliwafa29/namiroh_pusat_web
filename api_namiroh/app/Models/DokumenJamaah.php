<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenJamaah extends Model
{
    protected $table = 'dokumen_jamaah';
    protected $fillable = ['pendaftaran_id', 'jenis_dokumen_id', 'file_url', 'status_verifikasi', 'catatan_verifikasi', 'tanggal_upload'];
}
