import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const STATUS_OPTIONS = [
  '', 'MENUNGGU_DP', 'DP_DIBAYAR', 'LUNAS',
  'MENUNGGU_DOKUMEN', 'DOKUMEN_LENGKAP',
  'VISA_DIPROSES', 'VISA_APPROVED',
  'BERANGKAT', 'SELESAI', 'BATAL_JAMAAH', 'BATAL_TRAVEL',
]
const STATUS_LABEL = {
  MENUNGGU_DP:       'Menunggu DP',
  DP_DIBAYAR:        'DP Dibayar',
  LUNAS:             'Lunas',
  MENUNGGU_DOKUMEN:  'Menunggu Dokumen',
  DOKUMEN_LENGKAP:   'Dokumen Lengkap',
  VISA_DIPROSES:     'Visa Diproses',
  VISA_APPROVED:     'Visa Disetujui',
  BERANGKAT:         'Sudah Berangkat',
  SELESAI:           'Selesai',
  BATAL_JAMAAH:      'Batal (Jamaah)',
  BATAL_TRAVEL:      'Batal (Travel)',
}
const statusBadge = (s) => ({
  MENUNGGU_DP:      'bg-yellow-100 text-yellow-800',
  DP_DIBAYAR:       'bg-blue-100 text-blue-800',
  LUNAS:            'bg-green-100 text-green-800',
  MENUNGGU_DOKUMEN: 'bg-orange-100 text-orange-800',
  DOKUMEN_LENGKAP:  'bg-teal-100 text-teal-800',
  VISA_DIPROSES:    'bg-purple-100 text-purple-800',
  VISA_APPROVED:    'bg-indigo-100 text-indigo-800',
  BERANGKAT:        'bg-cyan-100 text-cyan-800',
  SELESAI:          'bg-green-200 text-green-900',
  BATAL_JAMAAH:     'bg-red-100 text-red-800',
  BATAL_TRAVEL:     'bg-red-200 text-red-900',
}[s] || 'bg-gray-100 text-gray-600')

export default function AdminPendaftaran() {
  const [urlParams] = useSearchParams()
  const [data, setData]       = useState([])
  const [meta, setMeta]       = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(1)
  const [search, setSearch]   = useState(urlParams.get('search') || '')
  const [status, setStatus]   = useState(urlParams.get('status') || '')
  const [confirmingId, setConfirmingId] = useState(null)

  const handleKonfirmDP = async (id) => {
    if (!window.confirm('Konfirmasi pembayaran DP untuk pendaftaran ini?')) return
    setConfirmingId(id)
    try {
      await api.patch(`/pendaftaran/${id}/status`, { status: 'DP_DIBAYAR' })
      load()
    } catch {
      alert('Gagal mengkonfirmasi pembayaran. Coba lagi.')
    } finally {
      setConfirmingId(null)
    }
  }

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, per_page: 15 })
    if (search) params.append('search', search)
    if (status) params.append('status', status)
    api.get(`/pendaftaran?${params}`)
      .then(res => {
        const d = res.data?.data
        setData(Array.isArray(d) ? d : (d?.data || []))
        setMeta(res.data?.meta || d?.meta || {})
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [page, search, status])

  useEffect(() => { load() }, [load])

  return (
    <AdminLayout title="Pendaftaran">

      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-5">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="🔍  Cari nama, no. HP, atau no. reg…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600 min-w-[160px] sm:min-w-[180px]"
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s ? (STATUS_LABEL[s] || s) : 'Semua Status'}</option>
            ))}
          </select>
          <button onClick={load}
            className="bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-green-800 transition">
            🔄 Refresh
          </button>
        </div>
        {meta.total > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            Menampilkan {data.length} dari {meta.total} pendaftaran
          </div>
        )}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 animate-pulse text-lg">Memuat data…</div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-5xl mb-3">📭</div>
          <div className="text-gray-500 text-lg">Tidak ada data pendaftaran</div>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((r) => {
            const nama   = r.jamaah?.nama_lengkap || '-'
            const hp     = r.jamaah?.no_hp || r.no_hp || ''
            const paket  = r.jadwal?.paket?.nama_paket || '-'
            const tglBrkt = r.jadwal?.tanggal_berangkat
              ? new Date(r.jadwal.tanggal_berangkat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
              : '—'
            const tglDaftar = r.tanggal_daftar
              ? new Date(r.tanggal_daftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : '-'
            return (
              <div key={r.id} className="bg-white rounded-xl shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-md transition">
                {/* Info utama */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-gray-900 text-lg">{nama}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-semibold ${statusBadge(r.status)}`}>
                      {STATUS_LABEL[r.status] || r.status}
                    </span>
                  </div>
                  <div className="text-sm text-green-700 font-mono font-semibold mb-1">{r.nomor_registrasi || '-'}</div>
                  <div className="text-base text-gray-600 truncate">🕌 {paket}</div>
                  <div className="text-sm text-gray-500 mt-0.5">✈️ Berangkat: {tglBrkt} &nbsp;·&nbsp; 📅 Daftar: {tglDaftar}</div>
                </div>
                {/* Aksi */}
                <div className="flex gap-2 flex-shrink-0">
                  {r.status === 'MENUNGGU_DP' && (
                    <button
                      onClick={() => handleKonfirmDP(r.id)}
                      disabled={confirmingId === r.id}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition disabled:opacity-50">
                      {confirmingId === r.id ? '⏳…' : '✅ Konfirm DP'}
                    </button>
                  )}
                  <Link to={`/admin/pendaftaran/${r.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition">
                    Detail
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {meta.last_page > 1 && (
        <div className="flex items-center justify-between mt-4 sm:mt-5 bg-white rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <span className="text-sm sm:text-base text-gray-600">Hal. {page} / {meta.last_page}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl border text-sm sm:text-base font-semibold disabled:opacity-40 hover:bg-gray-50">← Prev</button>
            <button disabled={page >= meta.last_page} onClick={() => setPage(p => p + 1)}
              className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl border text-sm sm:text-base font-semibold disabled:opacity-40 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
