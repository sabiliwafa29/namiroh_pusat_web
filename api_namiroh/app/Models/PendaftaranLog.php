<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendaftaranLog extends Model
{
    protected $table = 'pendaftaran_log';
    const UPDATED_AT = null;
    protected $fillable = ['pendaftaran_id', 'status_lama', 'status_baru', 'catatan', 'diubah_oleh'];
}
