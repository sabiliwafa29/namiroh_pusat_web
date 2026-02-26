import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const STATUS_OPTIONS = ['', 'PENDING', 'CONFIRMED', 'LUNAS', 'BATAL']
const statusBadge = (s) => ({
  PENDING:   'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  LUNAS:     'bg-green-100 text-green-800',
  BATAL:     'bg-red-100 text-red-800',
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
          placeholder="Cari nama / nomor pendaftaran…"
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
            <option key={s} value={s}>{s || 'Semua Status'}</option>
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
                  <th className="px-5 py-3 text-left">#</th>
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
                    <td className="px-5 py-3 text-gray-400 text-xs">{((page - 1) * 15) + i + 1}</td>
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
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '-'}
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
