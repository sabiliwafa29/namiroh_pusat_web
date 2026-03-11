import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
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
  VISA_APPROVED:     'Visa Approved',
  BERANGKAT:         'Berangkat',
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
  const [data, setData]       = useState([])
  const [meta, setMeta]       = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(1)
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('')

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
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Cari nama, no. HP, atau no. reg…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s ? (STATUS_LABEL[s] || s) : 'Semua Status'}</option>
          ))}
        </select>
        <button onClick={load} className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 animate-pulse">Memuat data…</div>
        ) : data.length === 0 ? (
          <div className="p-10 text-center text-gray-400">Tidak ada data pendaftaran</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
                  <th className="px-5 py-3 text-left">No. Reg</th>
                  <th className="px-5 py-3 text-left">Nama Jamaah</th>
                  <th className="px-5 py-3 text-left">No. HP</th>
                  <th className="px-5 py-3 text-left">Paket</th>
                  <th className="px-5 py-3 text-left">Berangkat</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Daftar</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-xs font-mono text-green-800 font-semibold whitespace-nowrap">{r.nomor_registrasi || '-'}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {r.jamaah?.nama_lengkap || r.nama_lengkap || '-'}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{r.jamaah?.no_hp || r.no_hp || '-'}</td>
                    <td className="px-5 py-3 text-gray-600 max-w-[160px] truncate">
                      {r.jadwal?.paket?.nama_paket || '-'}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {r.jadwal?.tanggal_berangkat
                        ? new Date(r.jadwal.tanggal_berangkat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '-'}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>
                        {STATUS_LABEL[r.status] || r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {r.tanggal_daftar ? new Date(r.tanggal_daftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link to={`/admin/pendaftaran/${r.id}`}
                        className="text-green-700 hover:underline text-xs font-medium">
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t text-sm text-gray-600">
            <span>Halaman {page} dari {meta.last_page}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded border disabled:opacity-40 hover:bg-gray-50">← Prev</button>
              <button disabled={page >= meta.last_page} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded border disabled:opacity-40 hover:bg-gray-50">Next →</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
