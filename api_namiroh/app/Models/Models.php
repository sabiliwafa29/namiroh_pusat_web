<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

// ── JenisLayanan ──────────────────────────────────────────
class JenisLayanan extends Model
{
    protected $table    = 'jenis_layanan';
    protected $fillable = ['kode', 'nama', 'deskripsi', 'is_active'];
    public    $timestamps = false;
    public function paket() { return $this->hasMany(Paket::class, 'jenis_layanan_id'); }
}

// ── PaketHarga ────────────────────────────────────────────
class PaketHarga extends Model
{
    protected $table    = 'paket_harga';
    protected $fillable = ['paket_id', 'tipe_kamar', 'harga', 'keterangan'];
    public    $timestamps = false;
    protected $casts    = ['harga' => 'decimal:2'];
    public function paket() { return $this->belongsTo(Paket::class); }
}

// ── Maskapai ──────────────────────────────────────────────
class Maskapai extends Model
{
    protected $table    = 'maskapai';
    protected $fillable = ['kode_iata', 'nama', 'logo_url', 'is_active'];
    public    $timestamps = false;
    public function jadwal() { return $this->hasMany(Jadwal::class); }
}

// ── Hotel ─────────────────────────────────────────────────
class Hotel extends Model
{
    protected $table    = 'hotel';
    protected $fillable = ['nama', 'kota', 'bintang', 'jarak_masjid_meter', 'alamat', 'is_active'];
    public    $timestamps = false;
}

// ── Jadwal ────────────────────────────────────────────────
class Jadwal extends Model
{
    protected $table    = 'jadwal';
    protected $fillable = [
        'paket_id', 'maskapai_id', 'kode_jadwal', 'tanggal_berangkat',
        'tanggal_kembali', 'kota_keberangkatan', 'bandara_keberangkatan',
        'kuota_total', 'kuota_terisi', 'status', 'catatan_internal',
    ];
    protected $casts = [
        'tanggal_berangkat' => 'date',
        'tanggal_kembali'   => 'date',
    ];

    public function paket()       { return $this->belongsTo(Paket::class); }
    public function maskapai()    { return $this->belongsTo(Maskapai::class); }
    public function hotel()       { return $this->hasMany(JadwalHotel::class); }
    public function pendaftaran() { return $this->hasMany(Pendaftaran::class); }
    public function manasik()     { return $this->hasMany(SesiManasik::class); }
}

// ── JadwalHotel ───────────────────────────────────────────
class JadwalHotel extends Model
{
    protected $table    = 'jadwal_hotel';
    protected $fillable = ['jadwal_id', 'hotel_id', 'urutan', 'checkin', 'checkout', 'keterangan'];
    public    $timestamps = false;
    public function hotel() { return $this->belongsTo(Hotel::class); }
}

// ── Itinerary ─────────────────────────────────────────────
class Itinerary extends Model
{
    protected $table    = 'itinerary';
    protected $fillable = ['paket_id', 'hari_ke', 'judul', 'deskripsi'];
    public    $timestamps = false;
}

// ── Provinsi & Kota ───────────────────────────────────────
class Provinsi extends Model
{
    protected $table    = 'provinsi';
    protected $fillable = ['nama'];
    public    $timestamps = false;
    public function kota() { return $this->hasMany(Kota::class); }
}

class Kota extends Model
{
    protected $table    = 'kota';
    protected $fillable = ['provinsi_id', 'nama'];
    public    $timestamps = false;
    public function provinsi() { return $this->belongsTo(Provinsi::class); }
}

// ── JenisDokumen ──────────────────────────────────────────
class JenisDokumen extends Model
{
    protected $table    = 'jenis_dokumen';
    protected $fillable = ['nama', 'keterangan', 'is_wajib'];
    public    $timestamps = false;
}

// ── Jamaah ────────────────────────────────────────────────
class Jamaah extends Model
{
    protected $table    = 'jamaah';
    protected $fillable = [
        'nik', 'nama_lengkap', 'nama_latin', 'jenis_kelamin',
        'tempat_lahir', 'tanggal_lahir', 'golongan_darah',
        'no_hp', 'no_hp_alternatif', 'email',
        'alamat_jalan', 'kota_id', 'kode_pos',
        'no_paspor', 'paspor_berlaku_sd', 'paspor_diterbitkan',
        'nama_kontak_darurat', 'hp_kontak_darurat', 'hubungan_darurat',
        'kondisi_kesehatan', 'is_active',
    ];
    protected $casts = [
        'tanggal_lahir'     => 'date',
        'paspor_berlaku_sd' => 'date',
    ];
    protected $hidden = ['kondisi_kesehatan'];

    public function kota()        { return $this->belongsTo(Kota::class); }
    public function pendaftaran() { return $this->hasMany(Pendaftaran::class); }
}

// ── Pendaftaran ───────────────────────────────────────────
class Pendaftaran extends Model
{
    protected $table      = 'pendaftaran';
    protected $primaryKey = 'id';
    const CREATED_AT      = 'tanggal_daftar';
    const UPDATED_AT      = 'updated_at';

    protected $fillable = [
        'nomor_registrasi', 'jadwal_id', 'jamaah_id', 'tipe_kamar',
        'permintaan_khusus', 'harga_disepakati', 'status',
        'referral_kode', 'didaftarkan_oleh', 'catatan',
    ];
    protected $casts = ['harga_disepakati' => 'decimal:2'];

    public function jamaah()   { return $this->belongsTo(Jamaah::class); }
    public function jadwal()   { return $this->belongsTo(Jadwal::class); }
    public function dokumen()  { return $this->hasMany(DokumenJamaah::class); }
    public function log()      { return $this->hasMany(PendaftaranLog::class)->orderBy('created_at', 'desc'); }
}

// ── PendaftaranLog ────────────────────────────────────────
class PendaftaranLog extends Model
{
    protected $table    = 'pendaftaran_log';
    protected $fillable = ['pendaftaran_id', 'status_lama', 'status_baru', 'catatan', 'diubah_oleh'];
    const UPDATED_AT    = null;
}

// ── DokumenJamaah ─────────────────────────────────────────
class DokumenJamaah extends Model
{
    protected $table    = 'dokumen_jamaah';
    protected $fillable = [
        'pendaftaran_id', 'jenis_dokumen_id', 'file_url',
        'status_verifikasi', 'catatan_verifikasi',
        'diverifikasi_oleh', 'diverifikasi_at',
    ];
    const UPDATED_AT = null;

    public function jenisDokumen() { return $this->belongsTo(JenisDokumen::class, 'jenis_dokumen_id'); }
}

// ── SesiManasik ───────────────────────────────────────────
class SesiManasik extends Model
{
    protected $table    = 'sesi_manasik';
    protected $fillable = ['jadwal_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'lokasi', 'materi', 'pembimbing', 'catatan'];
    public    $timestamps = false;
}
