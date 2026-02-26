import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'LUNAS', 'BATAL']
const statusBadge = (s) => ({
  PENDING:   'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  LUNAS:     'bg-green-100 text-green-800',
  BATAL:     'bg-red-100 text-red-800',
}[s] || 'bg-gray-100 text-gray-600')

export default function AdminPendaftaranDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [catatan, setCatatan]   = useState('')
  const [msg, setMsg]           = useState(null) // { type: 'ok'|'err', text }

  useEffect(() => {
    api.get(`/pendaftaran/${id}`)
      .then(res => {
        const d = res.data?.data
        setData(d)
        setNewStatus(d?.status || '')
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleUpdateStatus = async () => {
    setSaving(true)
    setMsg(null)
    try {
      await api.patch(`/pendaftaran/${id}/status`, { status: newStatus, catatan })
      setMsg({ type: 'ok', text: 'Status berhasil diperbarui' })
      setData(prev => ({ ...prev, status: newStatus }))
    } catch (e) {
      setMsg({ type: 'err', text: e.response?.data?.meta?.message || 'Gagal memperbarui status' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Yakin hapus pendaftaran ini?')) return
    try {
      await api.delete(`/pendaftaran/${id}`)
      navigate('/admin/pendaftaran')
    } catch {
      alert('Gagal menghapus pendaftaran')
    }
  }

  if (loading) return (
    <AdminLayout title="Detail Pendaftaran">
      <div className="text-gray-400 animate-pulse p-10 text-center">Memuat…</div>
    </AdminLayout>
  )
  if (!data) return (
    <AdminLayout title="Detail Pendaftaran">
      <div className="text-center text-gray-400 p-10">
        <p>Data tidak ditemukan</p>
        <Link to="/admin/pendaftaran" className="text-green-700 text-sm hover:underline">← Kembali</Link>
      </div>
    </AdminLayout>
  )

  const j = data.jamaah || {}
  const jadwal = data.jadwal || {}

  return (
    <AdminLayout title="Detail Pendaftaran">
      <div className="mb-4">
        <Link to="/admin/pendaftaran" className="text-sm text-green-700 hover:underline">← Kembali ke daftar</Link>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Kiri — Info Jamaah & Paket */}
        <div className="lg:col-span-2 space-y-5">

          {/* Data Jamaah */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-heading font-semibold text-green-900 mb-4">Data Jamaah</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Nama Lengkap',    j.nama_lengkap],
                ['No. HP',         j.no_hp],
                ['Email',          j.email],
                ['Tempat, Tgl Lahir', `${j.tempat_lahir || '-'}, ${j.tanggal_lahir ? new Date(j.tanggal_lahir).toLocaleDateString('id-ID') : '-'}`],
                ['Jenis Kelamin',  j.jenis_kelamin],
                ['No. KTP',        j.no_ktp],
                ['No. Passport',   j.no_passport],
                ['Alamat',         j.alamat],
                ['Provinsi',       j.provinsi?.nama],
                ['Kota',           j.kota?.nama],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="font-medium text-gray-800">{val || '-'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Paket & Jadwal */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-heading font-semibold text-green-900 mb-4">Paket & Jadwal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Paket',             jadwal.paket?.nama_paket],
                ['Maskapai',          jadwal.maskapai?.nama],
                ['Kota Keberangkatan', jadwal.kota_keberangkatan],
                ['Tanggal Berangkat', jadwal.tanggal_berangkat ? new Date(jadwal.tanggal_berangkat).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-'],
                ['Tipe Kamar',        data.tipe_kamar],
                ['Catatan Pendaftar', data.catatan],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="font-medium text-gray-800">{val || '-'}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Kanan — Status */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-heading font-semibold text-green-900 mb-1">Status Pendaftaran</h3>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(data.status)}`}>
                {data.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Ubah Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Catatan Admin (opsional)</label>
                <textarea
                  rows={3}
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  placeholder="Misal: Bukti transfer dikonfirmasi"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={saving || newStatus === data.status}
                className="w-full bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition disabled:opacity-50"
              >
                {saving ? 'Menyimpan…' : 'Simpan Status'}
              </button>
            </div>
          </div>

          {/* Didaftarkan */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-sm">
            <div className="text-xs text-gray-400 mb-0.5">Waktu Mendaftar</div>
            <div className="font-medium text-gray-800">
              {data.created_at ? new Date(data.created_at).toLocaleString('id-ID') : '-'}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-red-100">
            <p className="text-xs text-red-400 mb-3">Hapus pendaftaran ini secara permanen</p>
            <button
              onClick={handleDelete}
              className="w-full border border-red-400 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition"
            >
              🗑 Hapus Pendaftaran
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
