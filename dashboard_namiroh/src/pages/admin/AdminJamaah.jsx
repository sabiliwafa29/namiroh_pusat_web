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
    const params = new URLSearchParams({ page, per_page: 15 })
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

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-5">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="🔍  Cari nama atau nomor HP…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button onClick={load}
            className="bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-green-800 transition">
            🔄 Refresh
          </button>
        </div>
        {meta.total > 0 && (
          <div className="mt-2 text-sm text-gray-500">Total {meta.total} jamaah terdaftar</div>
        )}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 animate-pulse text-lg">Memuat data…</div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-5xl mb-3">👥</div>
          <div className="text-gray-500 text-lg">Tidak ada data jamaah</div>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((j, i) => {
            const hp = j.no_hp?.replace(/\D/g, '')
            return (
              <div key={j.id} className="bg-white rounded-xl shadow-sm px-3 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 hover:shadow-md transition">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-base sm:text-lg flex-shrink-0">
                  {j.nama_lengkap?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-base sm:text-lg">{j.nama_lengkap}</div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                    <span className="text-sm text-gray-600">{j.no_hp || '—'}</span>
                    {j.email && <span className="text-xs text-gray-400 hidden sm:inline">{j.email}</span>}
                    {j.kota?.nama && <span className="text-xs text-gray-400">📍 {j.kota.nama}</span>}
                  </div>
                  {j.no_paspor && (
                    <div className="text-xs text-gray-400 mt-0.5">Paspor: {j.no_paspor}</div>
                  )}
                </div>
                <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                  {hp && (
                    <a href={`https://wa.me/${hp}`} target="_blank" rel="noreferrer"
                      className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition">
                      💬 WA
                    </a>
                  )}
                  <Link to={`/admin/pendaftaran?search=${encodeURIComponent(j.nama_lengkap)}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition">
                    Riwayat
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
