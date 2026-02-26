import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const TIPE_KAMAR = ['QUAD', 'TRIPLE', 'DOUBLE', 'SINGLE']
const fmt = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

const EMPTY_FORM = {
  jenis_layanan_id: '',
  kode_paket: '',
  nama_paket: '',
  deskripsi: '',
  durasi_hari: '',
  kapasitas_maks: '',
  harga_dasar: '',
  include_detail: '',
  exclude_detail: '',
  syarat_khusus: '',
  is_published: false,
  harga: [],
}

export default function AdminPaket() {
  const [data, setData]               = useState([])
  const [jenisLayanan, setJenisLayanan] = useState([])
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState('')
  const [toggling, setToggling]       = useState(null)
  const [deleting, setDeleting]       = useState(null)
  const [saving, setSaving]           = useState(false)
  const [msg, setMsg]                 = useState(null)
  const [slideOpen, setSlideOpen]     = useState(false)
  const [editTarget, setEditTarget]   = useState(null)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [errors, setErrors]           = useState({})

  const load = useCallback(() => {
    setLoading(true)
    Promise.all([
      api.get('/paket?per_page=100'),
      api.get('/jenis-layanan'),
    ]).then(([paketRes, jenisRes]) => {
      const d = paketRes.data?.data
      setData(Array.isArray(d) ? d : (d?.data || []))
      setJenisLayanan(jenisRes.data?.data || [])
    }).catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  // ── Slide-over helpers ───────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setSlideOpen(true)
  }
  const openEdit = (p) => {
    setEditTarget(p)
    setForm({
      jenis_layanan_id: p.jenis_layanan_id ?? '',
      kode_paket:       p.kode_paket ?? '',
      nama_paket:       p.nama_paket ?? '',
      deskripsi:        p.deskripsi ?? '',
      durasi_hari:      p.durasi_hari ?? '',
      kapasitas_maks:   p.kapasitas_maks ?? '',
      harga_dasar:      p.harga_dasar ?? '',
      include_detail:   p.include_detail ?? '',
      exclude_detail:   p.exclude_detail ?? '',
      syarat_khusus:    p.syarat_khusus ?? '',
      is_published:     !!p.is_published,
      harga:            p.harga?.map(h => ({ tipe_kamar: h.tipe_kamar, harga: h.harga })) || [],
    })
    setErrors({}); setSlideOpen(true)
  }
  const closeSlide = () => { setSlideOpen(false); setEditTarget(null) }
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setHarga = (idx, k, v) =>
    setForm(f => ({ ...f, harga: f.harga.map((h, i) => i === idx ? { ...h, [k]: v } : h) }))
  const addHarga = () => {
    const used = form.harga.map(h => h.tipe_kamar)
    const next = TIPE_KAMAR.find(t => !used.includes(t))
    if (next) setForm(f => ({ ...f, harga: [...f.harga, { tipe_kamar: next, harga: '' }] }))
  }
  const removeHarga = (idx) => setForm(f => ({ ...f, harga: f.harga.filter((_, i) => i !== idx) }))

  // ── Save ────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e?.preventDefault()
    setSaving(true); setErrors({}); setMsg(null)
    const payload = {
      ...form,
      durasi_hari:    Number(form.durasi_hari),
      kapasitas_maks: Number(form.kapasitas_maks),
      harga_dasar:    Number(form.harga_dasar),
      harga: form.harga.map(h => ({ ...h, harga: Number(h.harga) })),
    }
    try {
      if (editTarget) {
        await api.put(`/paket/${editTarget.id}`, payload)
        setMsg({ type: 'ok', text: `Paket "${form.nama_paket}" berhasil diperbarui` })
      } else {
        await api.post('/paket', payload)
        setMsg({ type: 'ok', text: `Paket "${form.nama_paket}" berhasil dibuat` })
      }
      closeSlide(); load()
    } catch (err) {
      const errs = err.response?.data?.errors || {}
      setErrors(errs)
      if (!Object.keys(errs).length)
        setMsg({ type: 'err', text: err.response?.data?.meta?.message || 'Gagal menyimpan paket' })
    } finally { setSaving(false) }
  }

  // ── Publish toggle ──────────────────────────────────────────
  const togglePublish = async (paket) => {
    setToggling(paket.id); setMsg(null)
    try {
      await api.patch(`/paket/${paket.id}/publish`)
      setMsg({ type: 'ok', text: `Paket "${paket.nama_paket}" ${paket.is_published ? 'disembunyikan' : 'dipublikasikan'}` })
      load()
    } catch { setMsg({ type: 'err', text: 'Gagal mengubah status publish' }) }
    finally { setToggling(null) }
  }

  // ── Delete ──────────────────────────────────────────────────
  const handleDelete = async (paket) => {
    if (!confirm(`Nonaktifkan paket "${paket.nama_paket}"?`)) return
    setDeleting(paket.id); setMsg(null)
    try {
      await api.delete(`/paket/${paket.id}`)
      setMsg({ type: 'ok', text: `Paket "${paket.nama_paket}" dinonaktifkan` })
      load()
    } catch { setMsg({ type: 'err', text: 'Gagal menghapus paket' }) }
    finally { setDeleting(null) }
  }

  const filtered = data.filter(p =>
    p.nama_paket?.toLowerCase().includes(search.toLowerCase()) ||
    p.kode_paket?.toLowerCase().includes(search.toLowerCase())
  )

  const Err = ({ field }) => errors[field]
    ? <p className="text-red-500 text-xs mt-1">{errors[field][0]}</p> : null

  return (
    <AdminLayout title="Paket Umroh">
      {/* Topbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input type="text" placeholder="Cari nama / kode paket…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-green-600" />
        <button onClick={load} className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50">
          Refresh
        </button>
        <button onClick={openCreate}
          className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 flex items-center gap-2">
          ＋ Tambah Paket
        </button>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.type === 'ok'
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {msg.text}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 animate-pulse">Memuat…</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400">Belum ada paket</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
                    <th className="px-5 py-3 text-left">Kode</th>
                    <th className="px-5 py-3 text-left">Nama Paket</th>
                    <th className="px-5 py-3 text-left">Jenis</th>
                    <th className="px-5 py-3 text-left">Durasi</th>
                    <th className="px-5 py-3 text-left">Harga Dasar</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(p => (
                    <tr key={p.id} className={`hover:bg-gray-50 ${!p.is_active ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-3 text-xs text-gray-400 font-mono">{p.kode_paket}</td>
                      <td className="px-5 py-3 font-medium text-gray-800 max-w-[200px]">
                        <div className="truncate">{p.nama_paket}</div>
                        {!p.is_active && <span className="text-xs text-red-400">Nonaktif</span>}
                      </td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{p.jenis_layanan?.nama || '-'}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{p.durasi_hari} hari</td>
                      <td className="px-5 py-3 text-green-800 font-semibold text-xs">{fmt(p.harga_dasar)}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.is_published
                          ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.is_published ? 'Publik' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <a href={`/paket/${p.id}`} target="_blank" rel="noreferrer"
                            className="text-gray-400 hover:text-green-700 text-xs" title="Lihat di website">👁</a>
                          <button onClick={() => openEdit(p)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                          <button onClick={() => togglePublish(p)}
                            disabled={toggling === p.id || !p.is_active}
                            className="text-xs text-orange-500 hover:text-orange-700 font-medium disabled:opacity-40">
                            {toggling === p.id ? '…' : p.is_published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button onClick={() => handleDelete(p)}
                            disabled={deleting === p.id || !p.is_active}
                            className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40">
                            {deleting === p.id ? '…' : '🗑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Slide-over form ───────────────────────────────────── */}
      {slideOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={closeSlide} />
          <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-green-900 text-white flex-shrink-0">
              <h2 className="font-heading font-bold text-lg">
                {editTarget ? 'Edit Paket' : 'Tambah Paket Baru'}
              </h2>
              <button onClick={closeSlide} className="text-white/70 hover:text-white text-2xl leading-none">✕</button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  Mohon perbaiki kolom yang ditandai merah.
                </div>
              )}

              {/* Jenis Layanan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Layanan <span className="text-red-500">*</span>
                </label>
                <select value={form.jenis_layanan_id} onChange={e => setField('jenis_layanan_id', e.target.value)} required
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.jenis_layanan_id ? 'border-red-400' : 'border-gray-200'}`}>
                  <option value="">— Pilih jenis layanan —</option>
                  {jenisLayanan.map(j => <option key={j.id} value={j.id}>{j.nama}</option>)}
                </select>
                <Err field="jenis_layanan_id" />
              </div>

              {/* Kode + Durasi */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Paket <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.kode_paket} onChange={e => setField('kode_paket', e.target.value)}
                    placeholder="UMR-REG-2026"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.kode_paket ? 'border-red-400' : 'border-gray-200'}`} />
                  <Err field="kode_paket" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durasi (hari) <span className="text-red-500">*</span></label>
                  <input type="number" required min={1} value={form.durasi_hari} onChange={e => setField('durasi_hari', e.target.value)}
                    placeholder="9"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.durasi_hari ? 'border-red-400' : 'border-gray-200'}`} />
                  <Err field="durasi_hari" />
                </div>
              </div>

              {/* Nama Paket */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket <span className="text-red-500">*</span></label>
                <input type="text" required value={form.nama_paket} onChange={e => setField('nama_paket', e.target.value)}
                  placeholder="Umroh Reguler 9D Mei 2026"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.nama_paket ? 'border-red-400' : 'border-gray-200'}`} />
                <Err field="nama_paket" />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea rows={3} value={form.deskripsi} onChange={e => setField('deskripsi', e.target.value)}
                  placeholder="Deskripsi singkat paket…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
              </div>

              {/* Kapasitas + Harga Dasar */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Maks <span className="text-red-500">*</span></label>
                  <input type="number" required min={1} value={form.kapasitas_maks} onChange={e => setField('kapasitas_maks', e.target.value)}
                    placeholder="45"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.kapasitas_maks ? 'border-red-400' : 'border-gray-200'}`} />
                  <Err field="kapasitas_maks" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga Dasar (Rp) <span className="text-red-500">*</span></label>
                  <input type="number" required min={0} value={form.harga_dasar} onChange={e => setField('harga_dasar', e.target.value)}
                    placeholder="23000000"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.harga_dasar ? 'border-red-400' : 'border-gray-200'}`} />
                  <Err field="harga_dasar" />
                </div>
              </div>

              {/* Harga per Tipe Kamar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Harga per Tipe Kamar</label>
                  {form.harga.length < TIPE_KAMAR.length && (
                    <button type="button" onClick={addHarga}
                      className="text-xs text-green-700 hover:text-green-900 font-medium">+ Tambah Tipe</button>
                  )}
                </div>
                {form.harga.length === 0
                  ? <p className="text-xs text-gray-400">Kosong — hanya gunakan harga dasar di atas</p>
                  : (
                    <div className="space-y-2">
                      {form.harga.map((h, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <select value={h.tipe_kamar} onChange={e => setHarga(idx, 'tipe_kamar', e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-600">
                            {TIPE_KAMAR.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <input type="number" min={0} value={h.harga} onChange={e => setHarga(idx, 'harga', e.target.value)}
                            placeholder="Harga (Rp)"
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                          <button type="button" onClick={() => removeHarga(idx)}
                            className="text-red-400 hover:text-red-600 text-xl leading-none px-1">×</button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Include */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sudah Termasuk</label>
                <textarea rows={4} value={form.include_detail} onChange={e => setField('include_detail', e.target.value)}
                  placeholder="Tiket PP, hotel bintang 4, makan 3x sehari…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
              </div>

              {/* Exclude */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tidak Termasuk</label>
                <textarea rows={3} value={form.exclude_detail} onChange={e => setField('exclude_detail', e.target.value)}
                  placeholder="Visa, biaya pribadi, tip muthowwif…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
              </div>

              {/* Syarat Khusus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Syarat Khusus</label>
                <textarea rows={3} value={form.syarat_khusus} onChange={e => setField('syarat_khusus', e.target.value)}
                  placeholder="Minimal usia 17 tahun, mahrom untuk wanita…"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
              </div>

              {/* Toggle publish */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => setField('is_published', !form.is_published)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.is_published ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {form.is_published ? 'Publik (tampil di website)' : 'Draft (disembunyikan)'}
                </span>
              </label>

              <div className="h-2" />
            </div>

            {/* Sticky footer */}
            <div className="flex gap-3 px-6 py-4 border-t bg-gray-50 flex-shrink-0">
              <button type="button" onClick={closeSlide}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100">
                Batal
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition disabled:opacity-60">
                {saving ? 'Menyimpan…' : editTarget ? 'Simpan Perubahan' : 'Buat Paket'}
              </button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
