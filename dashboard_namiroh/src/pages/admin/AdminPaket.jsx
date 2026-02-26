import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../api/axios'

const fmt = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

export default function AdminPaket() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [toggling, setToggling] = useState(null)
  const [msg, setMsg]           = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    api.get('/paket')
      .then(res => {
        const d = res.data?.data
        setData(Array.isArray(d) ? d : (d?.data || []))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const togglePublish = async (paket) => {
    setToggling(paket.id)
    setMsg(null)
    try {
      await api.patch(`/paket/${paket.id}/publish`)
      setMsg({ type: 'ok', text: `Paket "${paket.nama_paket}" berhasil diperbarui` })
      load()
    } catch (e) {
      setMsg({ type: 'err', text: e.response?.data?.meta?.message || 'Gagal memperbarui' })
    } finally {
      setToggling(null)
    }
  }

  const filtered = data.filter(p =>
    p.nama_paket?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout title="Paket Umroh">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Cari nama paket…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button onClick={load} className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800">
          Refresh
        </button>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {msg.text}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 animate-pulse">Memuat…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400 py-10">Tidak ada paket</div>
          ) : filtered.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
              {p.flyer_url && (
                <img src={p.flyer_url} alt={p.nama_paket} className="w-full h-40 object-cover" />
              )}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-green-900 text-base leading-tight">{p.nama_paket}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.is_published ? 'Publik' : 'Draft'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{p.jenis_layanan?.nama} · {p.durasi_hari} hari</div>
                {p.harga_dasar && (
                  <div className="font-bold text-green-800 text-sm mb-3">{fmt(p.harga_dasar)}</div>
                )}
                <div className="mt-auto flex gap-2">
                  <a
                    href={`/paket/${p.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center border border-green-600 text-green-700 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition"
                  >
                    Lihat
                  </a>
                  <button
                    onClick={() => togglePublish(p)}
                    disabled={toggling === p.id}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${
                      p.is_published
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-700 text-white hover:bg-green-800'
                    } disabled:opacity-50`}
                  >
                    {toggling === p.id ? '…' : p.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
