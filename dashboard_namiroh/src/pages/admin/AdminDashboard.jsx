import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const fmt = (n) => Number(n || 0).toLocaleString('id-ID')

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/pendaftaran?per_page=5').catch(() => null),
      api.get('/paket').catch(() => null),
      api.get('/jamaah?per_page=1').catch(() => null),
    ]).then(([pend, paket, jamaah]) => {
      const pendData = pend?.data?.data || {}
      const paketData = paket?.data?.data || []
      const jamaahMeta = jamaah?.data?.meta || {}

      setStats({
        totalPendaftaran: pendData.total ?? pendData.length ?? 0,
        totalPaket: Array.isArray(paketData) ? paketData.length : (paket?.data?.meta?.total ?? 0),
        totalJamaah: jamaahMeta.total ?? 0,
      })
      setRecent(Array.isArray(pendData) ? pendData.slice(0, 5) : (pendData.data?.slice(0, 5) || []))
    }).finally(() => setLoading(false))
  }, [])

  const statusBadge = (s) => {
    const map = {
      PENDING:    'bg-yellow-100 text-yellow-800',
      CONFIRMED:  'bg-blue-100 text-blue-800',
      LUNAS:      'bg-green-100 text-green-800',
      BATAL:      'bg-red-100 text-red-800',
    }
    return map[s] || 'bg-gray-100 text-gray-600'
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Pendaftaran', value: loading ? '…' : fmt(stats?.totalPendaftaran), icon: '📋', color: 'border-l-4 border-orange-400' },
          { label: 'Paket Aktif',       value: loading ? '…' : fmt(stats?.totalPaket),       icon: '🕌', color: 'border-l-4 border-green-500' },
          { label: 'Data Jamaah',       value: loading ? '…' : fmt(stats?.totalJamaah),      icon: '👥', color: 'border-l-4 border-blue-400' },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 ${s.color}`}>
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="font-heading text-2xl font-bold text-green-900">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { to: '/admin/pendaftaran', label: 'Kelola Pendaftaran', icon: '📋' },
          { to: '/admin/paket',       label: 'Kelola Paket',       icon: '🕌' },
          { to: '/admin/jamaah',      label: 'Data Jamaah',        icon: '👥' },
          { to: '/',                  label: 'Lihat Website',      icon: '🌐' },
        ].map(l => (
          <Link key={l.to} to={l.to}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center group"
          >
            <div className="text-2xl mb-1">{l.icon}</div>
            <div className="text-xs font-medium text-gray-700 group-hover:text-green-700">{l.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Pendaftaran */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="font-heading font-semibold text-green-900">Pendaftaran Terbaru</h3>
          <Link to="/admin/pendaftaran" className="text-sm text-green-700 hover:underline">Lihat semua →</Link>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-400 text-sm animate-pulse">Memuat data…</div>
        ) : recent.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">Belum ada pendaftaran</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="px-5 py-3 text-left">Nama</th>
                  <th className="px-5 py-3 text-left">Paket</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Tanggal</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{r.jamaah?.nama_lengkap || r.nama_lengkap || '-'}</td>
                    <td className="px-5 py-3 text-gray-600">{r.jadwal?.paket?.nama_paket || '-'}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-5 py-3 text-right">
                      <Link to={`/admin/pendaftaran/${r.id}`} className="text-green-700 hover:underline text-xs">Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
