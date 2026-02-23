<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Models\Jadwal;
use App\Models\Jamaah;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PendaftaranController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Pendaftaran::with(['jamaah', 'jadwal.paket', 'jadwal.maskapai'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->jadwal_id, fn($q) => $q->where('jadwal_id', $request->jadwal_id))
            ->when($request->search, fn($q) => $q->whereHas('jamaah', fn($jq) =>
                $jq->where('nama_lengkap', 'like', "%{$request->search}%")
                   ->orWhere('no_hp', 'like', "%{$request->search}%")
            ))
            ->orderBy('tanggal_daftar', 'desc');

        return $this->paginated($query->paginate($request->per_page ?? 15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jadwal_id'          => 'required|exists:jadwal,id',
            'jamaah_id'          => 'required|exists:jamaah,id',
            'tipe_kamar'         => 'required|in:QUAD,TRIPLE,DOUBLE,SINGLE',
            'harga_disepakati'   => 'required|numeric|min:0',
            'permintaan_khusus'  => 'nullable|string',
            'referral_kode'      => 'nullable|string|max:50',
            'catatan'            => 'nullable|string',
        ]);

        // Cek apakah sudah terdaftar di jadwal yang sama
        $exists = Pendaftaran::where('jamaah_id', $validated['jamaah_id'])
            ->where('jadwal_id', $validated['jadwal_id'])
            ->whereNotIn('status', ['BATAL_JAMAAH', 'BATAL_TRAVEL'])
            ->exists();

        if ($exists) {
            return $this->error('Jamaah sudah terdaftar di jadwal ini', 422);
        }

        // Cek kuota
        $jadwal = Jadwal::findOrFail($validated['jadwal_id']);
        if ($jadwal->kuota_terisi >= $jadwal->kuota_total) {
            return $this->error('Kuota jadwal sudah penuh', 422);
        }

        // Generate nomor registrasi
        $validated['nomor_registrasi'] = $this->generateNomorRegistrasi();
        $validated['didaftarkan_oleh'] = $request->user()->id;

        $pendaftaran = Pendaftaran::create($validated);

        return $this->success(
            $pendaftaran->load(['jamaah', 'jadwal.paket', 'jadwal.maskapai']),
            'Pendaftaran berhasil',
            201,
            ['nomor_registrasi' => $pendaftaran->nomor_registrasi]
        );
    }

    public function show(Pendaftaran $pendaftaran)
    {
        return $this->success(
            $pendaftaran->load(['jamaah.kota.provinsi', 'jadwal.paket', 'jadwal.maskapai', 'jadwal.hotel', 'dokumen.jenisDokumen', 'log']),
            'Detail pendaftaran'
        );
    }

    public function updateStatus(Request $request, Pendaftaran $pendaftaran)
    {
        $request->validate([
            'status'  => 'required|in:MENUNGGU_DP,DP_DIBAYAR,LUNAS,MENUNGGU_DOKUMEN,DOKUMEN_LENGKAP,VISA_DIPROSES,VISA_APPROVED,BERANGKAT,SELESAI,BATAL_JAMAAH,BATAL_TRAVEL',
            'catatan' => 'nullable|string',
        ]);

        $pendaftaran->update([
            'status'  => $request->status,
            'catatan' => $request->catatan ?? $pendaftaran->catatan,
        ]);

        return $this->success(
            $pendaftaran->fresh(['jamaah', 'jadwal']),
            'Status pendaftaran berhasil diupdate'
        );
    }

    public function uploadDokumen(Request $request, Pendaftaran $pendaftaran)
    {
        $request->validate([
            'jenis_dokumen_id' => 'required|exists:jenis_dokumen,id',
            'file'             => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $path = $request->file('file')->store(
            "dokumen/{$pendaftaran->id}",
            'public'
        );

        $dokumen = $pendaftaran->dokumen()->updateOrCreate(
            ['jenis_dokumen_id' => $request->jenis_dokumen_id],
            [
                'file_url'           => $path,
                'status_verifikasi'  => 'DIUPLOAD',
                'tanggal_upload'     => now(),
            ]
        );

        return $this->success($dokumen->load('jenisDokumen'), 'Dokumen berhasil diupload');
    }

    public function verifikasiDokumen(Request $request, Pendaftaran $pendaftaran, $dokumenId)
    {
        $request->validate([
            'status'  => 'required|in:DIVERIFIKASI,DITOLAK',
            'catatan' => 'nullable|string',
        ]);

        $dokumen = $pendaftaran->dokumen()->findOrFail($dokumenId);
        $dokumen->update([
            'status_verifikasi'   => $request->status,
            'catatan_verifikasi'  => $request->catatan,
            'diverifikasi_oleh'   => $request->user()->id,
            'diverifikasi_at'     => now(),
        ]);

        return $this->success($dokumen, 'Verifikasi dokumen berhasil');
    }

    public function destroy(Pendaftaran $pendaftaran)
    {
        if (in_array($pendaftaran->status, ['BERANGKAT', 'SELESAI'])) {
            return $this->error('Pendaftaran yang sudah berangkat tidak dapat dihapus', 422);
        }

        $pendaftaran->update(['status' => 'BATAL_JAMAAH']);
        return $this->success(null, 'Pendaftaran berhasil dibatalkan');
    }

    /**
     * Pendaftaran publik (tanpa login) — membuat jamaah baru + pendaftaran sekaligus.
     */
    public function daftarPublik(Request $request)
    {
        $request->validate([
            // Data jadwal
            'jadwal_id'          => 'required|exists:jadwal,id',
            'tipe_kamar'         => 'required|in:QUAD,TRIPLE,DOUBLE,SINGLE',
            'harga_disepakati'   => 'required|numeric|min:0',
            // Data jamaah
            'nama_lengkap'       => 'required|string|max:200',
            'nama_latin'         => 'nullable|string|max:200',
            'jenis_kelamin'      => 'required|in:L,P',
            'tempat_lahir'       => 'nullable|string|max:100',
            'tanggal_lahir'      => 'nullable|date',
            'no_hp'              => 'required|string|max:20',
            'email'              => 'nullable|email|max:100',
            'alamat_jalan'       => 'nullable|string',
            'no_paspor'          => 'nullable|string|max:20',
            'paspor_berlaku_sd'  => 'nullable|date',
            'nama_kontak_darurat'=> 'nullable|string|max:100',
            'hp_kontak_darurat'  => 'nullable|string|max:20',
            'hubungan_darurat'   => 'nullable|string|max:50',
        ]);

        // Cek kuota
        $jadwal = Jadwal::findOrFail($request->jadwal_id);
        if ($jadwal->kuota_terisi >= $jadwal->kuota_total) {
            return $this->error('Kuota jadwal sudah penuh', 422);
        }

        // Buat atau temukan jamaah berdasarkan no_hp
        $jamaah = Jamaah::firstOrCreate(
            ['no_hp' => $request->no_hp],
            [
                'nama_lengkap'        => $request->nama_lengkap,
                'nama_latin'          => $request->nama_latin ?? strtoupper($request->nama_lengkap),
                'jenis_kelamin'       => $request->jenis_kelamin,
                'tempat_lahir'        => $request->tempat_lahir,
                'tanggal_lahir'       => $request->tanggal_lahir,
                'email'               => $request->email,
                'alamat_jalan'        => $request->alamat_jalan,
                'no_paspor'           => $request->no_paspor,
                'paspor_berlaku_sd'   => $request->paspor_berlaku_sd,
                'nama_kontak_darurat' => $request->nama_kontak_darurat,
                'hp_kontak_darurat'   => $request->hp_kontak_darurat,
                'hubungan_darurat'    => $request->hubungan_darurat,
                'is_active'           => 1,
            ]
        );

        // Cek apakah sudah terdaftar di jadwal yang sama
        $exists = Pendaftaran::where('jamaah_id', $jamaah->id)
            ->where('jadwal_id', $request->jadwal_id)
            ->whereNotIn('status', ['BATAL_JAMAAH', 'BATAL_TRAVEL'])
            ->exists();

        if ($exists) {
            return $this->error('Nomor HP ini sudah terdaftar di jadwal yang sama', 422);
        }

        $pendaftaran = Pendaftaran::create([
            'nomor_registrasi' => $this->generateNomorRegistrasi(),
            'jadwal_id'        => $request->jadwal_id,
            'jamaah_id'        => $jamaah->id,
            'tipe_kamar'       => $request->tipe_kamar,
            'harga_disepakati' => $request->harga_disepakati,
            'status'           => 'MENUNGGU_DP',
        ]);

        return $this->success(
            $pendaftaran->load(['jamaah', 'jadwal.paket', 'jadwal.maskapai']),
            'Pendaftaran berhasil',
            201
        );
    }

    private function generateNomorRegistrasi(): string
    {
        $prefix = 'REG-' . now()->format('Ym') . '-';
        $count  = Pendaftaran::whereRaw("nomor_registrasi LIKE '{$prefix}%'")->count() + 1;
        return $prefix . str_pad($count, 5, '0', STR_PAD_LEFT);
    }
}
