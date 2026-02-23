import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

const STATUS_COLORS = {
  DRAFT:     'bg-gray-100 text-gray-600',
  OPEN:      'bg-green-100 text-green-700',
  PENUH:     'bg-yellow-100 text-yellow-700',
  BERJALAN:  'bg-blue-100 text-blue-700',
  SELESAI:   'bg-purple-100 text-purple-700',
  BATAL:     'bg-red-100 text-red-700',
}

const emptyForm = {
  paket_id: '',
  maskapai_id: '',
  kode_jadwal: '',
  tanggal_berangkat: '',
  tanggal_kembali: '',
  kota_keberangkatan: 'SURABAYA',
  bandara_keberangkatan: 'SUB',
  kuota_total: 45,
  catatan_internal: '',
}

export default function Jadwal() {
  const [data, setData]           = useState([])
  const [meta, setMeta]           = useState({})
  const [paketList, setPaketList] = useState([])
  const [maskapaiList, setMaskapaiList] = useState([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId]       = useState(null)
  const [form, setForm]           = useState(emptyForm)
  const [error, setError]         = useState('')
  const [saving, setSaving]       = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage]           = useState(1)

  useEffect(() => { fetchMaster() }, [])
  useEffect(() => { fetchData() }, [page, filterStatus])

  const fetchMaster = async () => {
    try {
      const [paketRes, maskapaiRes] = await Promise.all([
        api.get('/paket?per_page=100'),
        api.get('/jadwal?per_page=1'),
      ])
      setPaketList(paketRes.data.data || [])
    } catch (err) { console.error(err) }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/jadwal', {
        params: { page, per_page: 10, status: filterStatus || undefined }
      })
      setData(res.data.data)
      setMeta(res.data.meta)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditId(null)
    setError('')
    setShowModal(true)
  }

  const openEdit = (jadwal) => {
    setForm({
      paket_id:              jadwal.paket_id,
      maskapai_id:           jadwal.maskapai_id,
      kode_jadwal:           jadwal.kode_jadwal,
      tanggal_berangkat:     jadwal.tanggal_berangkat,
      tanggal_kembali:       jadwal.tanggal_kembali,
      kota_keberangkatan:    jadwal.kota_keberangkatan,
      bandara_keberangkatan: jadwal.bandara_keberangkatan || '',
      kuota_total:           jadwal.kuota_total,
      catatan_internal:      jadwal.catatan_internal || '',
    })
    setEditId(jadwal.id)
    setError('')
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      if (editId) {
        await api.put(`/jadwal/${editId}`, form)
      } else {
        await api.post('/jadwal', form)
      }
      setShowModal(false)
      fetchData()
    } catch (err) {
      const errors = err.response?.data?.meta?.errors
      setError(errors ? Object.values(errors).flat().join(', ') : err.response?.data?.meta?.message || 'Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  const handleStatus = async (id, status) => {
    await api.patch(`/jadwal/${id}/status`, { status })
    fetchData()
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus jadwal ini?')) return
    try {
      await api.delete(`/jadwal/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.meta?.message || 'Gagal menghapus')
    }
  }

  return (
    <Layout title="Manajemen Jadwal">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Semua Status</option>
          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex-1" />
        <button
          onClick={openCreate}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition"
        >
          + Tambah Jadwal
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Kode</th>
                <th className="px-4 py-3 font-medium">Paket</th>
                <th className="px-4 py-3 font-medium">Berangkat</th>
                <th className="px-4 py-3 font-medium">Kembali</th>
                <th className="px-4 py-3 font-medium">Kota</th>
                <th className="px-4 py-3 font-medium">Kuota</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">Memuat data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">Tidak ada jadwal</td></tr>
              ) : data.map((j) => (
                <tr key={j.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{j.kode_jadwal}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{j.paket?.nama_paket}</div>
                    <div className="text-xs text-gray-400">{j.maskapai?.nama}</div>
                  </td>
                  <td className="px-4 py-3">{new Date(j.tanggal_berangkat).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">{new Date(j.tanggal_kembali).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">{j.kota_keberangkatan}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      <span className="font-medium">{j.kuota_terisi}</span>
                      <span className="text-gray-400">/{j.kuota_total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${(j.kuota_terisi / j.kuota_total) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={j.status}
                      onChange={e => handleStatus(j.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer focus:outline-none ${STATUS_COLORS[j.status]}`}
                    >
                      {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(j)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => handleDelete(j.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
            <span>Total: {meta.total} jadwal</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-50">←</button>
              <span className="px-3 py-1">{page} / {meta.last_page}</span>
              <button disabled={page === meta.last_page} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-50">→</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-semibold text-gray-800">{editId ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Paket *</label>
                  <select value={form.paket_id} onChange={e => setForm({...form, paket_id: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Pilih Paket</option>
                    {paketList.map(p => <option key={p.id} value={p.id}>{p.nama_paket}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Maskapai ID *</label>
                  <input type="number" value={form.maskapai_id} onChange={e => setForm({...form, maskapai_id: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="1=Garuda, 2=Lion Air..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Kode Jadwal *</label>
                <input value={form.kode_jadwal} onChange={e => setForm({...form, kode_jadwal: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="JDW-AGS26-001" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Berangkat *</label>
                  <input type="date" value={form.tanggal_berangkat} onChange={e => setForm({...form, tanggal_berangkat: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Kembali *</label>
                  <input type="date" value={form.tanggal_kembali} onChange={e => setForm({...form, tanggal_kembali: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Kota Keberangkatan</label>
                  <select value={form.kota_keberangkatan} onChange={e => setForm({...form, kota_keberangkatan: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    {['SURABAYA','JAKARTA','MEDAN','MAKASSAR','LAINNYA'].map(k =>
                      <option key={k} value={k}>{k}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Kuota</label>
                  <input type="number" value={form.kuota_total} onChange={e => setForm({...form, kuota_total: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Internal</label>
                <textarea value={form.catatan_internal} onChange={e => setForm({...form, catatan_internal: e.target.value})}
                  rows={2} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t justify-end">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving}
                className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-60">
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
