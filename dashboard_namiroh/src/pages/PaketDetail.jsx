import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/axios'

export default function PaketDetail() {
  const { id } = useParams()
  const [paket, setPaket] = useState(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]
  const upcomingJadwal = (paket?.jadwal || [])
    .filter(j => j.status === 'OPEN' && j.tanggal_berangkat >= today)
    .sort((a, b) => a.tanggal_berangkat.localeCompare(b.tanggal_berangkat))
  const kondisi = upcomingJadwal.length > 0 ? 'A' : (paket?.jadwal?.length ?? 0) > 0 ? 'B' : 'C'

  useEffect(() => {
    api.get(`/paket/${id}`)
      .then(res => setPaket(res.data.data))
      .catch(() => setPaket(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">Memuat detail paket...</div>
    </div>
  )

  if (!paket) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-3">😔</div>
          <p>Paket tidak ditemukan</p>
          <Link to="/paket" className="text-green-700 text-sm mt-2 inline-block hover:underline">← Kembali ke daftar paket</Link>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header — always gradient with name & info */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 text-white pt-[7.5rem] pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-green-300 text-xs mb-2">{paket.jenis_layanan?.nama}</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">{paket.nama_paket}</h1>
          {paket.deskripsi && <p className="text-green-300 text-sm max-w-2xl">{paket.deskripsi}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><span>⏱</span> {paket.durasi_hari} Hari</span>
            <span className="flex items-center gap-1"><span>👥</span> Maks {paket.kapasitas_maks} Orang</span>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — Detail Keterangan */}
          <div className="lg:col-span-2 space-y-5">

            {/* Include / Exclude */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paket.include_detail && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="font-heading font-semibold text-green-800 mb-3 flex items-center gap-2">✅ Sudah Termasuk</h2>
                  <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">{paket.include_detail}</p>
                </div>
              )}
              {paket.exclude_detail && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="font-heading font-semibold text-red-700 mb-3 flex items-center gap-2">❌ Tidak Termasuk</h2>
                  <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">{paket.exclude_detail}</p>
                </div>
              )}
            </div>

            {/* Syarat Khusus */}
            {paket.syarat_khusus && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <h2 className="font-heading font-semibold text-orange-800 mb-2">⚠️ Syarat Khusus</h2>
                <p className="text-sm text-orange-700">{paket.syarat_khusus}</p>
              </div>
            )}

            {/* Itinerary */}
            {paket.itinerary?.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h2 className="font-heading font-semibold text-green-800 mb-4">📅 Program Perjalanan</h2>
                <div className="space-y-3">
                  {paket.itinerary.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-800 flex-shrink-0">
                        {item.hari_ke}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-800">{item.judul}</div>
                        {item.deskripsi && <p className="text-xs text-gray-500 mt-0.5">{item.deskripsi}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jadwal Tersedia */}
            {upcomingJadwal.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h2 className="font-heading font-semibold text-green-800 mb-4">✈️ Jadwal Keberangkatan</h2>
                <div className="space-y-2">
                  {upcomingJadwal.map((j) => (
                    <div key={j.id} className="flex items-center justify-between border rounded-lg px-4 py-3">
                      <div>
                        <div className="text-base font-medium text-gray-800">
                          {new Date(j.tanggal_berangkat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="text-sm text-gray-500">{j.maskapai?.nama} · {j.kota_keberangkatan}</div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}
            {kondisi === 'B' && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <h2 className="font-heading font-semibold text-orange-800 mb-2">🕐 Tidak Ada Jadwal Aktif</h2>
                <p className="text-sm text-orange-700">Paket ini saat ini tidak memiliki jadwal keberangkatan aktif. Hubungi kami untuk informasi jadwal terbaru atau untuk masuk daftar tunggu.</p>
              </div>
            )}
            {kondisi === 'C' && [4, 5, 6].includes(Number(paket.jenis_layanan_id)) && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h2 className="font-heading font-semibold text-green-800 mb-2">📋 Pendaftaran Terbuka</h2>
                <p className="text-sm text-green-700">Layanan ini tersedia sepanjang tahun tanpa jadwal tetap. Daftar sekarang dan tim kami akan menghubungi Anda untuk proses selanjutnya.</p>
              </div>
            )}
            {kondisi === 'C' && ![4, 5, 6].includes(Number(paket.jenis_layanan_id)) && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h2 className="font-heading font-semibold text-blue-800 mb-2">🔔 Jadwal Segera Hadir</h2>
                <p className="text-sm text-blue-700">Jadwal keberangkatan untuk paket ini sedang dalam persiapan. Hubungi kami untuk mendaftar waiting list.</p>
              </div>
            )}
          </div>

          {/* Right — Flyer + Harga */}
          <div className="space-y-4">

            {/* Flyer Image */}
            {paket.flyer_url && (
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img
                  src={paket.flyer_url}
                  alt={paket.nama_paket}
                  className="w-full"
                />
              </div>
            )}

            {/* Harga */}
            <div className="bg-white rounded-xl p-5 shadow-sm sticky top-24">
              <h2 className="font-heading font-semibold text-gray-800 mb-3">Harga Per Orang</h2>
              {paket.harga?.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {paket.harga.map(h => (
                    <div key={h.tipe_kamar} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-base text-gray-600">Kamar {h.tipe_kamar}</span>
                      <span className="font-semibold text-green-800 text-base">
                        Rp {Number(h.harga).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-2xl font-bold text-green-800 mb-4">
                  Rp {Number(paket.harga_dasar).toLocaleString('id-ID')}
                </div>
              )}

              {kondisi === 'A' && (
                <>
                  <Link to={`/daftar?paket_id=${paket.id}`}
                    className="block text-center bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition text-base mb-3">
                    Daftar Sekarang
                  </Link>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, saya ingin mendaftar paket "${paket.nama_paket}". Mohon bantuannya.`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center border border-green-700 text-green-700 py-2.5 rounded-xl text-base font-medium hover:bg-green-50 transition">
                    💬 Tanya via WhatsApp
                  </a>
                </>
              )}
              {kondisi === 'B' && (
                <>
                  <div className="text-center bg-gray-100 text-gray-500 py-3 rounded-xl text-sm font-medium mb-3">
                    🕐 Tidak ada jadwal aktif
                  </div>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, saya ingin tahu jadwal terbaru paket "${paket.nama_paket}". Apakah ada jadwal baru?`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition text-base mb-3">
                    🔔 Beritahu Saya
                  </a>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, saya mau tanya soal paket "${paket.nama_paket}".`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center border border-gray-400 text-gray-600 py-2.5 rounded-xl text-base font-medium hover:bg-gray-50 transition">
                    💬 Tanya via WhatsApp
                  </a>
                </>
              )}
              {kondisi === 'C' && [4, 5, 6].includes(Number(paket.jenis_layanan_id)) && (
                <>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, saya tertarik dengan layanan "${paket.nama_paket}". Mohon info lebih lanjut.`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition text-base mb-0">
                    💬 Tanya via WhatsApp
                  </a>
                </>
              )}
              {kondisi === 'C' && ![4, 5, 6].includes(Number(paket.jenis_layanan_id)) && (
                <>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, saya tertarik dengan paket "${paket.nama_paket}". Kapan jadwal tersedia?`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition text-base mb-3">
                    💬 Hubungi Kami
                  </a>
                  <a href={`https://wa.me/6285711755881?text=${encodeURIComponent(`Assalamualaikum, tolong daftarkan saya ke waiting list paket "${paket.nama_paket}".`)}`}
                    target="_blank" rel="noreferrer"
                    className="block text-center border border-green-700 text-green-700 py-2.5 rounded-xl text-base font-medium hover:bg-green-50 transition">
                    🔔 Daftar Waiting List
                  </a>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
