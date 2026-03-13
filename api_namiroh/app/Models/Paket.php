<?php
// ============================================================
// app/Models/Paket.php
// ============================================================
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Paket extends Model
{
    protected $table = 'paket';

    protected $fillable = [
        'jenis_layanan_id', 'kode_paket', 'nama_paket', 'deskripsi',
        'durasi_hari', 'kapasitas_maks', 'harga_dasar',
        'include_detail', 'exclude_detail', 'syarat_khusus',
        'flyer_url', 'is_published', 'is_active',
    ];

    protected $casts = [
        'harga_dasar'  => 'decimal:2',
        'is_published' => 'boolean',
        'is_active'    => 'boolean',
    ];

    // Otomatis kembalikan full URL storage agar frontend tidak perlu tahu lokasinya
    public function getFlyerUrlAttribute(?string $value): ?string
    {
        if (!$value) return null;
        // Jika sudah berupa URL lengkap, kembalikan apa adanya
        if (str_starts_with($value, 'http')) return $value;
        // Strip leading slash jika ada, lalu buat storage URL
        return Storage::disk('public')->url(ltrim($value, '/'));
    }

    public function jenisLayanan()   { return $this->belongsTo(JenisLayanan::class, 'jenis_layanan_id'); }
    public function harga()          { return $this->hasMany(PaketHarga::class, 'paket_id'); }
    public function jadwal()         { return $this->hasMany(Jadwal::class, 'paket_id')->orderBy('tanggal_berangkat', 'asc'); }
    public function itinerary()      { return $this->hasMany(Itinerary::class, 'paket_id')->orderBy('hari_ke'); }
}
