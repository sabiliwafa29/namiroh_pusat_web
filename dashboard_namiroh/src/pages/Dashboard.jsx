import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#14532d', '#16a34a', '#4ade80', '#86efac', '#bbf7d0']

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value ?? '-'}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
)

export default function Dashboard() {
  const [stats, setStats]           = useState(null)
  const [jadwalList, setJadwalList] = useState([])
  const [chartData, setChartData]   = useState([])
  const [pieData, setPieData]       = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [paketRes, jadwalRes, pendaftaranRes, jamaahRes] = await Promise.all([
        api.get('/paket?per_page=100'),
        api.get('/jadwal?per_page=5&status=OPEN'),
        api.get('/pendaftaran?per_page=100'),
        api.get('/jamaah?per_page=100'),
      ])

      const pendaftaranData = pendaftaranRes.data.data || []

      setStats({
        total_paket:       paketRes.data.meta?.total || 0,
        jadwal_open:       jadwalRes.data.meta?.total || 0,
        total_jamaah:      jamaahRes.data.meta?.total || 0,
        total_pendaftaran: pendaftaranRes.data.meta?.total || 0,
      })

      setJadwalList(jadwalRes.data.data || [])

      // Chart data: pendaftaran per bulan (simulasi dari data)
      const bulanMap = {}
      pendaftaranData.forEach((p) => {
        const bulan = new Date(p.tanggal_daftar).toLocaleString('id-ID', { month: 'short' })
        bulanMap[bulan] = (bulanMap[bulan] || 0) + 1
      })
      setChartData(Object.entries(bulanMap).map(([bulan, total]) => ({ bulan, total })))

      // Pie: status pendaftaran
      const statusMap = {}
      pendaftaranData.forEach((p) => {
        statusMap[p.status] = (statusMap[p.status] || 0) + 1
      })
      setPieData(Object.entries(statusMap).map(([name, value]) => ({ name, value })))

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <Layout title="Dashboard">
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-lg animate-pulse">Memuat data...</div>
      </div>
    </Layout>
  )

  return (
    <Layout title="Dashboard">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Paket"       value={stats?.total_paket}       icon="📦" color="border-green-600" />
        <StatCard label="Jadwal Aktif"      value={stats?.jadwal_open}       icon="📅" color="border-blue-500" />
        <StatCard label="Total Jamaah"      value={stats?.total_jamaah}      icon="👥" color="border-yellow-500" />
        <StatCard label="Total Pendaftaran" value={stats?.total_pendaftaran} icon="📋" color="border-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Pendaftaran Per Bulan</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#15803d" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              Belum ada data pendaftaran
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Status Pendaftaran</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              Belum ada data pendaftaran
            </div>
          )}
        </div>
      </div>

      {/* Jadwal Terdekat */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Jadwal Keberangkatan Terdekat</h2>
        {jadwalList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Kode</th>
                  <th className="pb-2 font-medium">Paket</th>
                  <th className="pb-2 font-medium">Berangkat</th>
                  <th className="pb-2 font-medium">Maskapai</th>
                  <th className="pb-2 font-medium">Kuota</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {jadwalList.map((j) => (
                  <tr key={j.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 font-mono text-xs">{j.kode_jadwal}</td>
                    <td className="py-2">{j.paket?.nama_paket}</td>
                    <td className="py-2">{new Date(j.tanggal_berangkat).toLocaleDateString('id-ID')}</td>
                    <td className="py-2">{j.maskapai?.nama}</td>
                    <td className="py-2">{j.kuota_terisi}/{j.kuota_total}</td>
                    <td className="py-2">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {j.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm py-8">Belum ada jadwal aktif</div>
        )}
      </div>

    </Layout>
  )
}
