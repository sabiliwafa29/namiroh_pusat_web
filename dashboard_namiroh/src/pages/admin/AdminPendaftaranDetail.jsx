import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const STATUS_OPTIONS = [
  'MENUNGGU_DP', 'DP_DIBAYAR', 'LUNAS',
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
  const hp = j.no_hp || ''

  return (
    <AdminLayout title="Detail Pendaftaran">
      <div className="mb-5 flex items-center gap-3">
        <Link to="/admin/pendaftaran"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-base font-semibold transition">
          ← Kembali
        </Link>
        <span className={`px-3 py-1.5 rounded-full text-base font-bold ${statusBadge(data.status)}`}>
          {STATUS_LABEL[data.status] || data.status}
        </span>
        <span className="font-mono text-green-700 font-semibold text-base">{data.nomor_registrasi}</span>
      </div>

      {msg && (
        <div className={`mb-5 px-5 py-4 rounded-xl text-base font-medium ${
          msg.type === 'ok' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {msg.type === 'ok' ? '✅ ' : '⚠️ '}{msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Kiri — Info Jamaah & Paket */}
        <div className="lg:col-span-2 space-y-5">

          {/* Data Jamaah */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-green-900 text-xl">📋 Data Jamaah</h3>
              {hp && (
                <a href={`https://wa.me/${hp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                  className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-xl text-base font-semibold transition">
                  💬 Hubungi via WA
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Nama Lengkap',       j.nama_lengkap],
                ['No. HP / WA',        j.no_hp],
                ['Email',              j.email],
                ['Jenis Kelamin',      j.jenis_kelamin === 'L' ? 'Laki-laki' : j.jenis_kelamin === 'P' ? 'Perempuan' : j.jenis_kelamin],
                ['Tempat Lahir',       j.tempat_lahir],
                ['Tanggal Lahir',      j.tanggal_lahir ? new Date(j.tanggal_lahir).toLocaleDateString('id-ID', { dateStyle: 'long' }) : null],
                ['NIK',                j.nik],
                ['No. Paspor',         j.no_paspor],
                ['Paspor Berlaku s/d', j.paspor_berlaku_sd ? new Date(j.paspor_berlaku_sd).toLocaleDateString('id-ID', { dateStyle: 'long' }) : null],
                ['Alamat',             j.alamat_jalan],
                ['Kota',               j.kota?.nama],
                ['Provinsi',           j.kota?.provinsi?.nama],
                ['Kontak Darurat',     j.nama_kontak_darurat ? `${j.nama_kontak_darurat} (${j.hubungan_darurat || '-'}) — ${j.hp_kontak_darurat || '-'}` : null],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                  <div className="text-sm text-gray-500 mb-0.5">{label}</div>
                  <div className="font-semibold text-gray-800 text-base">{val || '—'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Paket & Jadwal */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-heading font-bold text-green-900 text-xl mb-5">🕌 Paket & Jadwal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Nama Paket',         jadwal.paket?.nama_paket],
                ['Maskapai',           jadwal.maskapai?.nama],
                ['Kota Keberangkatan', jadwal.kota_keberangkatan || jadwal.bandara_keberangkatan],
                ['Tanggal Berangkat',  jadwal.tanggal_berangkat ? new Date(jadwal.tanggal_berangkat).toLocaleDateString('id-ID', { dateStyle: 'long' }) : null],
                ['Tipe Kamar',         data.tipe_kamar],
                ['Harga Disepakati',   data.harga_disepakati ? 'Rp ' + Number(data.harga_disepakati).toLocaleString('id-ID') : null],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                  <div className="text-sm text-gray-500 mb-0.5">{label}</div>
                  <div className="font-semibold text-gray-800 text-base">{val || '—'}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Kanan — Ubah Status */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-heading font-bold text-green-900 text-xl mb-4">⚙️ Ubah Status</h3>

            <div className="space-y-4">
              <div>
                <label className="text-base text-gray-600 mb-2 block font-medium">Status Baru</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{STATUS_LABEL[s] || s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-base text-gray-600 mb-2 block font-medium">Catatan (opsional)</label>
                <textarea
                  rows={3}
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  placeholder="Contoh: Bukti transfer sudah dikonfirmasi"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={saving || newStatus === data.status}
                className="w-full bg-green-700 text-white py-3.5 rounded-xl text-base font-bold hover:bg-green-800 transition disabled:opacity-50"
              >
                {saving ? '⏳ Menyimpan…' : '💾 Simpan Status'}
              </button>
            </div>
          </div>

          {/* Waktu daftar */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500 mb-1">Waktu Mendaftar</div>
            <div className="font-semibold text-gray-800 text-base">
              {data.tanggal_daftar ? new Date(data.tanggal_daftar).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : '-'}
            </div>
          </div>

          {/* Hapus */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-red-100">
            <p className="text-sm text-red-400 mb-3">⚠️ Hapus pendaftaran ini secara permanen. Tindakan ini tidak bisa dibatalkan.</p>
            <button
              onClick={handleDelete}
              className="w-full border-2 border-red-400 text-red-500 py-3 rounded-xl text-base font-semibold hover:bg-red-50 transition"
            >
              🗑️ Hapus Pendaftaran
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
