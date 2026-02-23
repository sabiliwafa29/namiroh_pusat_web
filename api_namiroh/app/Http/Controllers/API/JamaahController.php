<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jamaah;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class JamaahController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Jamaah::with('kota.provinsi')
            ->when($request->search, fn($q) => $q
                ->where('nama_lengkap', 'like', "%{$request->search}%")
                ->orWhere('no_hp', 'like', "%{$request->search}%")
                ->orWhere('nik', 'like', "%{$request->search}%")
                ->orWhere('no_paspor', 'like', "%{$request->search}%")
            )
            ->when($request->kota_id, fn($q) => $q->where('kota_id', $request->kota_id))
            ->orderBy('nama_lengkap');

        return $this->paginated($query->paginate($request->per_page ?? 15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik'                  => 'nullable|digits:16|unique:jamaah,nik',
            'nama_lengkap'         => 'required|string|max:200',
            'nama_latin'           => 'nullable|string|max:200',
            'jenis_kelamin'        => 'required|in:L,P',
            'tempat_lahir'         => 'nullable|string|max:100',
            'tanggal_lahir'        => 'nullable|date|before:today',
            'golongan_darah'       => 'nullable|in:A,B,AB,O,TIDAK_DIKETAHUI',
            'no_hp'                => 'required|string|max:20',
            'no_hp_alternatif'     => 'nullable|string|max:20',
            'email'                => 'nullable|email|max:150',
            'alamat_jalan'         => 'nullable|string',
            'kota_id'              => 'nullable|exists:kota,id',
            'kode_pos'             => 'nullable|digits:5',
            'no_paspor'            => 'nullable|string|unique:jamaah,no_paspor|max:20',
            'paspor_berlaku_sd'    => 'nullable|date|after:today',
            'paspor_diterbitkan'   => 'nullable|string|max:100',
            'nama_kontak_darurat'  => 'nullable|string|max:200',
            'hp_kontak_darurat'    => 'nullable|string|max:20',
            'hubungan_darurat'     => 'nullable|string|max:50',
            'kondisi_kesehatan'    => 'nullable|string',
        ]);

        $jamaah = Jamaah::create($validated);

        return $this->success(
            $jamaah->load('kota.provinsi'),
            'Data jamaah berhasil disimpan',
            201
        );
    }

    public function show(Jamaah $jamaah)
    {
        return $this->success(
            $jamaah->load(['kota.provinsi', 'pendaftaran.jadwal.paket', 'pendaftaran.jadwal.maskapai']),
            'Detail jamaah'
        );
    }

    public function update(Request $request, Jamaah $jamaah)
    {
        $validated = $request->validate([
            'nik'                  => "nullable|digits:16|unique:jamaah,nik,{$jamaah->id}",
            'nama_lengkap'         => 'sometimes|string|max:200',
            'nama_latin'           => 'nullable|string|max:200',
            'jenis_kelamin'        => 'sometimes|in:L,P',
            'tempat_lahir'         => 'nullable|string|max:100',
            'tanggal_lahir'        => 'nullable|date|before:today',
            'golongan_darah'       => 'nullable|in:A,B,AB,O,TIDAK_DIKETAHUI',
            'no_hp'                => 'sometimes|string|max:20',
            'no_hp_alternatif'     => 'nullable|string|max:20',
            'email'                => 'nullable|email|max:150',
            'alamat_jalan'         => 'nullable|string',
            'kota_id'              => 'nullable|exists:kota,id',
            'kode_pos'             => 'nullable|digits:5',
            'no_paspor'            => "nullable|string|unique:jamaah,no_paspor,{$jamaah->id}|max:20",
            'paspor_berlaku_sd'    => 'nullable|date',
            'paspor_diterbitkan'   => 'nullable|string|max:100',
            'nama_kontak_darurat'  => 'nullable|string|max:200',
            'hp_kontak_darurat'    => 'nullable|string|max:20',
            'hubungan_darurat'     => 'nullable|string|max:50',
            'kondisi_kesehatan'    => 'nullable|string',
        ]);

        $jamaah->update($validated);

        return $this->success(
            $jamaah->load('kota.provinsi'),
            'Data jamaah berhasil diupdate'
        );
    }

    public function destroy(Jamaah $jamaah)
    {
        $jamaah->update(['is_active' => 0]);
        return $this->success(null, 'Data jamaah berhasil dinonaktifkan');
    }

    public function riwayat(Jamaah $jamaah)
    {
        $riwayat = $jamaah->pendaftaran()
            ->with(['jadwal.paket', 'jadwal.maskapai'])
            ->orderBy('tanggal_daftar', 'desc')
            ->get();

        return $this->success($riwayat, 'Riwayat pendaftaran jamaah');
    }
}
