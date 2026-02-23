<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Paket;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class PaketController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Paket::with(['jenisLayanan', 'harga'])
            ->when($request->jenis_layanan_id, fn($q) => $q->where('jenis_layanan_id', $request->jenis_layanan_id))
            ->when($request->search, fn($q) => $q->where('nama_paket', 'like', "%{$request->search}%"))
            ->when($request->published, fn($q) => $q->where('is_published', 1))
            ->orderBy('created_at', 'desc');

        return $this->paginated($query->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_layanan_id' => 'required|exists:jenis_layanan,id',
            'kode_paket'       => 'required|unique:paket,kode_paket|max:30',
            'nama_paket'       => 'required|string|max:200',
            'deskripsi'        => 'nullable|string',
            'durasi_hari'      => 'required|integer|min:1',
            'kapasitas_maks'   => 'required|integer|min:1',
            'harga_dasar'      => 'required|numeric|min:0',
            'include_detail'   => 'nullable|string',
            'exclude_detail'   => 'nullable|string',
            'syarat_khusus'    => 'nullable|string',
            'is_published'     => 'boolean',
            // Varian harga
            'harga'            => 'nullable|array',
            'harga.*.tipe_kamar' => 'required_with:harga|in:QUAD,TRIPLE,DOUBLE,SINGLE',
            'harga.*.harga'      => 'required_with:harga|numeric|min:0',
        ]);

        $paket = Paket::create($validated);

        if (!empty($validated['harga'])) {
            foreach ($validated['harga'] as $h) {
                $paket->harga()->create($h);
            }
        }

        return $this->success(
            $paket->load(['jenisLayanan', 'harga']),
            'Paket berhasil dibuat',
            201
        );
    }

    public function show(Paket $paket)
    {
        return $this->success(
            $paket->load(['jenisLayanan', 'harga', 'itinerary', 'jadwal.maskapai']),
            'Detail paket'
        );
    }

    public function update(Request $request, Paket $paket)
    {
        $validated = $request->validate([
            'jenis_layanan_id' => 'sometimes|exists:jenis_layanan,id',
            'kode_paket'       => "sometimes|unique:paket,kode_paket,{$paket->id}|max:30",
            'nama_paket'       => 'sometimes|string|max:200',
            'deskripsi'        => 'nullable|string',
            'durasi_hari'      => 'sometimes|integer|min:1',
            'kapasitas_maks'   => 'sometimes|integer|min:1',
            'harga_dasar'      => 'sometimes|numeric|min:0',
            'include_detail'   => 'nullable|string',
            'exclude_detail'   => 'nullable|string',
            'syarat_khusus'    => 'nullable|string',
            'is_published'     => 'boolean',
            'is_active'        => 'boolean',
        ]);

        $paket->update($validated);

        return $this->success(
            $paket->load(['jenisLayanan', 'harga']),
            'Paket berhasil diupdate'
        );
    }

    public function destroy(Paket $paket)
    {
        // Soft delete - cukup nonaktifkan
        $paket->update(['is_active' => 0, 'is_published' => 0]);
        return $this->success(null, 'Paket berhasil dinonaktifkan');
    }

    public function publish(Paket $paket)
    {
        $paket->update(['is_published' => !$paket->is_published]);
        $status = $paket->is_published ? 'dipublikasikan' : 'disembunyikan';
        return $this->success($paket, "Paket berhasil {$status}");
    }
}
