import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const fmt = (n) => Number(n || 0).toLocaleString('id-ID')

const STATUS_LABEL = {
  MENUNGGU_DP:      'Menunggu DP',
  DP_DIBAYAR:       'DP Dibayar',
  LUNAS:            'Lunas',
  MENUNGGU_DOKUMEN: 'Menunggu Dokumen',
  DOKUMEN_LENGKAP:  'Dokumen Lengkap',
  VISA_DIPROSES:    'Visa Diproses',
  VISA_APPROVED:    'Visa Disetujui',
  BERANGKAT:        'Sudah Berangkat',
  SELESAI:          'Selesai',
  BATAL_JAMAAH:     'Batal (Jamaah)',
  BATAL_TRAVEL:     'Batal (Travel)',
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

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/pendaftaran?per_page=6').catch(() => null),
      api.get('/paket?per_page=1').catch(() => null),
      api.get('/jamaah?per_page=1').catch(() => null),
      api.get('/pendaftaran?per_page=1&status=MENUNGGU_DP').catch(() => null),
    ]).then(([pend, paket, jamaah, menunggu]) => {
      setStats({
        totalPendaftaran: pend?.data?.meta?.total ?? 0,
        totalPaket:       paket?.data?.meta?.total ?? 0,
        totalJamaah:      jamaah?.data?.meta?.total ?? 0,
        menungguDP:       menunggu?.data?.meta?.total ?? 0,
      })
      setRecent(pend?.data?.data || [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Dashboard">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Pendaftaran', value: loading ? '…' : fmt(stats?.totalPendaftaran), icon: '📋', color: 'bg-white border-l-4 border-orange-400' },
          { label: 'Menunggu DP',       value: loading ? '…' : fmt(stats?.menungguDP),       icon: '⏳', color: 'bg-yellow-50 border-l-4 border-yellow-400' },
          { label: 'Paket Tersedia',    value: loading ? '…' : fmt(stats?.totalPaket),        icon: '🕌', color: 'bg-white border-l-4 border-green-500' },
          { label: 'Data Jamaah',       value: loading ? '…' : fmt(stats?.totalJamaah),       icon: '👥', color: 'bg-white border-l-4 border-blue-400' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4 ${s.color}`}>
            <div className="text-2xl sm:text-4xl">{s.icon}</div>
            <div>
              <div className="font-heading text-xl sm:text-3xl font-bold text-green-900">{s.value}</div>
              <div className="text-xs sm:text-base text-gray-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Jika ada yang menunggu DP, tampilkan peringatan */}
      {!loading && stats?.menungguDP > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-3 py-3 sm:px-5 sm:py-4 mb-6 flex items-center gap-3">
          <span className="text-xl sm:text-3xl">⚠️</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-yellow-900 text-sm sm:text-lg">
              Ada {fmt(stats.menungguDP)} pendaftaran menunggu konfirmasi DP
            </div>
            <div className="text-yellow-700 text-xs sm:text-base hidden sm:block">Segera hubungi calon jamaah untuk melakukan pembayaran DP.</div>
          </div>
          <Link to="/admin/pendaftaran?status=MENUNGGU_DP"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition flex-shrink-0">
            Lihat →
          </Link>
        </div>
      )}

      {/* Menu Cepat */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { to: '/admin/pendaftaran', label: 'Kelola Pendaftaran', icon: '📋', desc: 'Lihat & ubah status jamaah' },
          { to: '/admin/paket',       label: 'Kelola Paket',       icon: '🕌', desc: 'Tambah atau edit paket' },
          { to: '/admin/jamaah',      label: 'Data Jamaah',        icon: '👥', desc: 'Cari data jamaah' },
          { to: '/',                  label: 'Lihat Website',      icon: '🌐', desc: 'Buka halaman publik', external: true },
        ].map(l => (
          l.external
            ? <a key={l.to} href={l.to} target="_blank" rel="noreferrer"
                className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition text-center group block">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{l.icon}</div>
                <div className="text-sm sm:text-base font-bold text-gray-700 group-hover:text-green-700">{l.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">{l.desc}</div>
              </a>
            : <Link key={l.to} to={l.to}
                className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition text-center group">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{l.icon}</div>
                <div className="text-sm sm:text-base font-bold text-gray-700 group-hover:text-green-700">{l.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">{l.desc}</div>
              </Link>
        ))}
      </div>

      {/* Pendaftaran Terbaru */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="font-heading font-bold text-green-900 text-base sm:text-xl">Pendaftaran Terbaru</h3>
          <Link to="/admin/pendaftaran" className="text-sm sm:text-base text-green-700 hover:underline font-medium">Lihat semua →</Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 animate-pulse text-base">Memuat data…</div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-base">Belum ada pendaftaran</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.map(r => {
              const nama = r.jamaah?.nama_lengkap || '-'
              const hp   = r.jamaah?.no_hp || r.no_hp || ''
              const paket = r.jadwal?.paket?.nama_paket || '-'
              const tgl  = r.jadwal?.tanggal_berangkat
                ? new Date(r.jadwal.tanggal_berangkat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                : '-'
              return (
                <div key={r.id} className="px-3 py-3 flex items-center gap-3 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm truncate">{nama}</div>
                    <div className="text-xs text-gray-500 truncate">{paket} · ✈️ {tgl}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${statusBadge(r.status)}`}>
                    {STATUS_LABEL[r.status] || r.status}
                  </span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {hp && (
                      <a href={`https://wa.me/${hp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                        className="bg-green-100 hover:bg-green-200 text-green-700 px-2.5 py-1.5 rounded-lg text-sm font-medium transition">
                        💬
                      </a>
                    )}
                    <Link to={`/admin/pendaftaran/${r.id}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition">
                      Detail
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
