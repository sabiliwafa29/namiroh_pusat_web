import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

export default function AdminJamaah() {
  const [data, setData]       = useState([])
  const [meta, setMeta]       = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(1)
  const [search, setSearch]   = useState('')

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, per_page: 20 })
    if (search) params.append('search', search)
    api.get(`/jamaah?${params}`)
      .then(res => {
        const d = res.data?.data
        setData(Array.isArray(d) ? d : (d?.data || []))
        setMeta(res.data?.meta || d?.meta || {})
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { load() }, [load])

  return (
    <AdminLayout title="Data Jamaah">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Cari nama / no. HP…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button onClick={load} className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 animate-pulse">Memuat data…</div>
        ) : data.length === 0 ? (
          <div className="p-10 text-center text-gray-400">Tidak ada data jamaah</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">Nama Lengkap</th>
                  <th className="px-5 py-3 text-left">No. HP</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">No. KTP</th>
                  <th className="px-5 py-3 text-left">Kota</th>
                  <th className="px-5 py-3 text-left">Riwayat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((j, i) => (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-400 text-xs">{((page - 1) * 20) + i + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{j.nama_lengkap}</td>
                    <td className="px-5 py-3 text-gray-600">
                      <a href={`https://wa.me/${j.no_hp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                        className="hover:text-green-700">
                        {j.no_hp || '-'}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{j.email || '-'}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{j.no_ktp || '-'}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{j.kota?.nama || '-'}</td>
                    <td className="px-5 py-3">
                      <Link to={`/admin/pendaftaran?search=${encodeURIComponent(j.nama_lengkap)}`}
                        className="text-green-700 hover:underline text-xs">
                        Lihat →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
