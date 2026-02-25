import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/axios'

const JENIS = [
  { id: '',  label: 'Semua' },
  { id: '1', label: 'Umroh Reguler' },
  { id: '2', label: 'Umroh VIP' },
  { id: '4', label: 'Haji Plus' },
  { id: '5', label: 'Badal Umroh' },
  { id: '7', label: 'Halal Tour' },
]

export default function Paket() {
  const [urlParams]               = useSearchParams()
  const [data, setData]           = useState([])
  const [meta, setMeta]           = useState({})
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [jenis, setJenis]         = useState(urlParams.get('jenis_layanan_id') || '')
  const [page, setPage]           = useState(1)
  const [jadwalList, setJadwalList]     = useState([])
  const [jadwalLoading, setJadwalLoading] = useState(false)

  const bulan      = urlParams.get('bulan')
  const tahun      = urlParams.get('tahun')
  const maskapaiId = urlParams.get('maskapai_id')
  const bandara    = urlParams.get('bandara')
  const hasJadwalFilter = bulan || maskapaiId || bandara

  useEffect(() => { fetchData() }, [page, search, jenis])

  useEffect(() => {
    if (!hasJadwalFilter) return
    setJadwalLoading(true)
    api.get('/jadwal', {
      params: {
        per_page: 50,
        status:        'OPEN',
        bulan:         bulan || undefined,
        tahun:         tahun || undefined,
        maskapai_id:   maskapaiId || undefined,
        bandara:       bandara || undefined,
        jenis_layanan_id: urlParams.get('jenis_layanan_id') || undefined,
      }
    })
      .then(res => setJadwalList(res.data.data || []))
      .catch(() => setJadwalList([]))
      .finally(() => setJadwalLoading(false))
  }, [bulan, tahun, maskapaiId, bandara])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/paket', {
        params: { page, per_page: 9, published: 1, search: search || undefined, jenis_layanan_id: jenis || undefined }
      })
      setData(res.data.data || [])
      setMeta(res.data.meta || {})
    } catch { setData([]) }
    finally { setLoading(false) }
  }

  // Label bulan dari angka
  const namabulan = bulan ? new Date(tahun || new Date().getFullYear(), bulan - 1, 1)
    .toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-green-900 text-white py-12 px-4 bg-islamic-pattern relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="font-arabic text-2xl text-orange-300/70 mb-2">طلب العلم فريضة</div>
          <h1 className="font-heading text-4xl font-bold mb-2">Paket Umroh &amp; Haji</h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-orange-400/40" />
            <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
            <div className="h-px w-12 bg-orange-400/40" />
          </div>
          <p className="text-green-100 text-base mt-3">Temukan paket ibadah yang sesuai dengan kebutuhan Anda</p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white border-b px-4 py-4 sticky top-20 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Cari paket..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="border rounded-lg px-4 py-3 text-base flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2 flex-wrap">
            {JENIS.map(j => (
              <button key={j.id} onClick={() => { setJenis(j.id); setPage(1) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  jenis === j.id ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {j.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Paket Grid */}
      <main className="flex-1 bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Jadwal Search Results */}
          {hasJadwalFilter && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold text-green-900">
                  ✈️ Jadwal Tersedia
                  {namabulan && <span className="text-green-600"> — {namabulan}</span>}
                </h2>
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  {jadwalLoading ? '...' : `${jadwalList.length} jadwal`}
                </span>
              </div>

              {jadwalLoading ? (
                <div className="text-center py-8 text-gray-500">Mencari jadwal...</div>
              ) : jadwalList.length === 0 ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center text-base text-orange-800">
                  <div className="text-2xl mb-2">📭</div>
                  Tidak ada jadwal tersedia untuk kriteria ini. Coba ubah filter atau
                  <Link to="/paket" className="text-green-700 font-medium ml-1 hover:underline">lihat semua paket</Link>.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jadwalList.map(j => {
                    const sisa = j.kuota_total - j.kuota_terisi
                    return (
                      <div key={j.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
                        {/* Header biru-hijau */}
                        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-3">
                          <div className="text-sm text-green-100 mb-0.5">{j.paket?.jenis_layanan?.nama}</div>
                          <div className="font-semibold text-base leading-snug">{j.paket?.nama_paket}</div>
                        </div>
                        {/* Body */}
                        <div className="px-4 py-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span>📅</span>
                            <span className="font-medium text-gray-800 text-base">
                              {new Date(j.tanggal_berangkat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-gray-500 text-sm">–</span>
                            <span className="text-gray-600 text-sm">
                              {new Date(j.tanggal_kembali).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>✈️</span> {j.maskapai?.nama} ({j.maskapai?.kode_iata}) · {j.bandara_keberangkatan}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>⏱</span> {j.paket?.durasi_hari} hari
                            <span className="ml-auto">
                                <span className={`font-semibold text-base ${
                                  sisa <= 5 ? 'text-red-600' : 'text-green-700'
                                }`}>
                                  {sisa}
                                </span>
                                <span className="text-gray-500"> seat tersisa</span>
                            </span>
                          </div>
                          <div className="pt-1 border-t">
                            <div className="text-orange-500 font-bold text-lg">
                              Rp {Number(j.paket?.harga_dasar || 0).toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-500">per orang (quad)</div>
                          </div>
                        </div>
                        {/* Footer */}
                        <div className="px-4 pb-4 flex gap-2">
                          <Link to={`/paket/${j.paket_id}`}
                            className="flex-1 text-center border border-green-700 text-green-700 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition">
                            Detail
                          </Link>
                          <Link to={`/daftar?paket_id=${j.paket_id}&jadwal_id=${j.id}`}
                            className="flex-1 text-center bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                            Daftar
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              <hr className="mt-8 border-gray-200" />
              <p className="text-sm text-gray-500 mt-3">Atau pilih dari semua paket di bawah ini:</p>
            </div>
          )}
          {loading ? (
            <div className="text-center py-20 text-gray-600">Memuat paket...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-base">Tidak ada paket ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((p) => (
                <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                  {/* Flyer Image or Gradient Header */}
                  {p.flyer_url ? (
                    <div className="relative">
                      <img
                        src={p.flyer_url}
                        alt={p.nama_paket}
                        className="w-full"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-4">
                        <div className="text-xs text-green-300 font-medium mb-0.5">{p.jenis_layanan?.nama}</div>
                        <div className="text-orange-300 font-extrabold text-xl leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          Rp {Number(p.harga_dasar).toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-white/90">per orang (quad)</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-green-800 to-green-900 text-white p-5">
                      <div className="text-sm text-green-100 mb-1 font-medium">{p.jenis_layanan?.nama}</div>
                      <h3 className="font-bold text-lg leading-snug">{p.nama_paket}</h3>
                      {p.deskripsi && <p className="text-sm text-green-200 mt-1 line-clamp-1">{p.deskripsi}</p>}
                      <div className="mt-3">
                        <div className="text-orange-400 font-bold text-2xl">
                          Rp {Number(p.harga_dasar).toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-green-200">per orang (quad)</div>
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Package name shown only when flyer image is present */}
                    {p.flyer_url && (
                      <h3 className="font-bold text-base text-gray-800 leading-snug mb-2 line-clamp-2">{p.nama_paket}</h3>
                    )}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <span>⏱</span> {p.durasi_hari} Hari
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <span>👥</span> Maks {p.kapasitas_maks}
                      </div>
                    </div>

                    {p.include_detail && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-600 mb-1">Termasuk:</div>
                        <p className="text-sm text-gray-700 line-clamp-2">{p.include_detail}</p>
                      </div>
                    )}

                    {/* Harga varian */}
                    {p.harga?.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-3">
                        {p.harga.map(h => (
                          <span key={h.tipe_kamar} className="text-sm bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                            {h.tipe_kamar}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link to={`/paket/${p.id}`}
                        className="flex-1 text-center border border-green-700 text-green-700 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition">
                        Detail
                      </Link>
                      <Link to={`/daftar?paket_id=${p.id}`}
                        className="flex-1 text-center bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                        Daftar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {meta.last_page > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-5 py-2.5 rounded-lg border text-base disabled:opacity-40 hover:bg-gray-100">← Prev</button>
              <span className="px-4 py-2.5 text-base text-gray-700">{page} / {meta.last_page}</span>
              <button disabled={page === meta.last_page} onClick={() => setPage(p => p + 1)}
                className="px-5 py-2.5 rounded-lg border text-base disabled:opacity-40 hover:bg-gray-100">Next →</button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
