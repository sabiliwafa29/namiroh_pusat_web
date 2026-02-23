<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jadwal;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Jadwal::with(['paket.jenisLayanan', 'maskapai', 'hotel'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->paket_id, fn($q) => $q->where('paket_id', $request->paket_id))
            ->when($request->maskapai_id, fn($q) => $q->where('maskapai_id', $request->maskapai_id))
            ->when($request->jenis_layanan_id, fn($q) => $q->whereHas('paket', fn($pq) => $pq->where('jenis_layanan_id', $request->jenis_layanan_id)))
            ->when($request->bulan, fn($q) => $q->whereMonth('tanggal_berangkat', $request->bulan))
            ->when($request->tahun, fn($q) => $q->whereYear('tanggal_berangkat', $request->tahun))
            ->when($request->kota, fn($q) => $q->where('kota_keberangkatan', $request->kota))
            ->when($request->bandara, fn($q) => $q->where('bandara_keberangkatan', $request->bandara))
            ->orderBy('tanggal_berangkat', 'asc');

        return $this->paginated($query->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'paket_id'              => 'required|exists:paket,id',
            'maskapai_id'           => 'required|exists:maskapai,id',
            'kode_jadwal'           => 'required|unique:jadwal,kode_jadwal|max:30',
            'tanggal_berangkat'     => 'required|date|after:today',
            'tanggal_kembali'       => 'required|date|after:tanggal_berangkat',
            'kota_keberangkatan'    => 'required|in:SURABAYA,JAKARTA,MEDAN,MAKASSAR,LAINNYA',
            'bandara_keberangkatan' => 'nullable|string|max:10',
            'kuota_total'           => 'required|integer|min:1',
            'catatan_internal'      => 'nullable|string',
            // Hotel
            'hotel'                 => 'nullable|array',
            'hotel.*.hotel_id'      => 'required_with:hotel|exists:hotel,id',
            'hotel.*.urutan'        => 'required_with:hotel|integer|min:1',
            'hotel.*.checkin'       => 'nullable|date',
            'hotel.*.checkout'      => 'nullable|date',
        ]);

        $jadwal = Jadwal::create($validated);

        if (!empty($validated['hotel'])) {
            foreach ($validated['hotel'] as $h) {
                $jadwal->hotel()->create($h);
            }
        }

        return $this->success(
            $jadwal->load(['paket', 'maskapai', 'hotel']),
            'Jadwal berhasil dibuat',
            201
        );
    }

    public function show(Jadwal $jadwal)
    {
        return $this->success(
            $jadwal->load(['paket.jenisLayanan', 'paket.harga', 'maskapai', 'hotel', 'pendaftaran.jamaah']),
            'Detail jadwal'
        );
    }

    public function update(Request $request, Jadwal $jadwal)
    {
        $validated = $request->validate([
            'maskapai_id'           => 'sometimes|exists:maskapai,id',
            'tanggal_berangkat'     => 'sometimes|date',
            'tanggal_kembali'       => 'sometimes|date|after:tanggal_berangkat',
            'kota_keberangkatan'    => 'sometimes|in:SURABAYA,JAKARTA,MEDAN,MAKASSAR,LAINNYA',
            'bandara_keberangkatan' => 'nullable|string|max:10',
            'kuota_total'           => 'sometimes|integer|min:1',
            'status'                => 'sometimes|in:DRAFT,OPEN,PENUH,BERJALAN,SELESAI,BATAL',
            'catatan_internal'      => 'nullable|string',
        ]);

        $jadwal->update($validated);

        return $this->success(
            $jadwal->load(['paket', 'maskapai', 'hotel']),
            'Jadwal berhasil diupdate'
        );
    }

    public function destroy(Jadwal $jadwal)
    {
        if ($jadwal->kuota_terisi > 0) {
            return $this->error('Jadwal tidak dapat dihapus karena sudah ada jamaah terdaftar', 422);
        }
        $jadwal->delete();
        return $this->success(null, 'Jadwal berhasil dihapus');
    }

    public function updateStatus(Request $request, Jadwal $jadwal)
    {
        $request->validate([
            'status' => 'required|in:DRAFT,OPEN,PENUH,BERJALAN,SELESAI,BATAL',
        ]);

        $jadwal->update(['status' => $request->status]);
        return $this->success($jadwal, 'Status jadwal berhasil diupdate');
    }

    public function peserta(Jadwal $jadwal)
    {
        $peserta = $jadwal->pendaftaran()
            ->with('jamaah')
            ->whereNotIn('status', ['BATAL_JAMAAH', 'BATAL_TRAVEL'])
            ->get();

        return $this->success($peserta, 'Daftar peserta', 200, [
            'total_peserta' => $peserta->count(),
            'sisa_kuota'    => $jadwal->kuota_total - $jadwal->kuota_terisi,
        ]);
    }
}
