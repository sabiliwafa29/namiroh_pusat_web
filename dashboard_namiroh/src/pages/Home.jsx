import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/axios'

const stats = [
  { value: '24+',    label: 'Tahun Pengalaman' },
  { value: '60.000+', label: 'Jamaah Diberangkatkan' },
  { value: 'A',      label: 'Akreditasi Kemenag' },
  { value: '24/7',   label: 'Layanan Customer' },
]

const layanan = [
  { icon: '🕌', title: 'Umroh Reguler',    desc: 'Paket umroh terjangkau mulai 23 jutaan dengan fasilitas lengkap dan pembimbing berpengalaman.' },
  { icon: '⭐', title: 'Umroh VIP',         desc: 'Nikmati ibadah dengan fasilitas premium, hotel bintang 5, dan layanan eksklusif.' },
  { icon: '🤲', title: 'Haji Plus',         desc: 'Wujudkan impian berangkat haji lebih cepat dengan porsi haji plus resmi.' },
  { icon: '💚', title: 'Badal Umroh & Haji', desc: 'Tunaikan ibadah untuk keluarga tercinta yang sudah berpulang, oleh mutawif profesional.' },
  { icon: '✈️', title: 'Halal Tour',        desc: 'Kunjungi destinasi wisata halal dunia: Turki, Mesir, Aqsa, dan lainnya.' },
  { icon: '💳', title: 'Program Cicilan',   desc: 'Berangkat umroh cukup bayar 5 juta, sisa bisa dicicil lewat mitra syariah.' },
]

const testimonials = [
  { name: 'Ibu Siti Nurjanah', kota: 'Surabaya', text: 'Alhamdulillah, perjalanan Umroh bersama An Namiroh sangat lancar. Hotel dekat Masjidil Haram dan makanannya cocok di lidah. Terima kasih!', bintang: 5 },
  { name: 'Bapak H. Mulyadi', kota: 'Bandung', text: 'Tour leader dan muthowwif selalu sigap menjawab pertanyaan kami. Semua fasilitas sesuai yang dijanjikan. InsyaAllah akan direkomendasikan ke keluarga.', bintang: 5 },
  { name: 'Ning Umi Laila', kota: 'Surabaya', text: 'Pelayanan sangat praktis, cepat, dan didampingi sejak awal. Para mutawif mengayomi jamaah muda maupun tua. An-Namiroh recommended!', bintang: 5 },
]

const JENIS_LIST = [
  { id: '1', label: 'Umroh Reguler', icon: '🕌' },
  { id: '2', label: 'Umroh VIP',     icon: '⭐' },
  { id: '4', label: 'Haji Plus',     icon: '🤲' },
  { id: '7', label: 'Halal Tour',    icon: '✈️' },
]

const BANDARA_LIST = [
  { kode: 'SUB', label: 'Surabaya (SUB)' },
  { kode: 'CGK', label: 'Jakarta (CGK)' },
  { kode: 'MDN', label: 'Medan (KNO)' },
  { kode: 'UPG', label: 'Makassar (UPG)' },
]

export default function Home() {
  const navigate = useNavigate()
  const [paketUnggulan, setPaketUnggulan] = useState([])
  const [maskapaiList, setMaskapaiList]   = useState([])
  const [search, setSearch] = useState({ bulan: '', jenis_layanan_id: '', maskapai_id: '', bandara: '' })

  const bulanList = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(new Date().getFullYear(), new Date().getMonth() + i, 1)
    return {
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
    }
  })

  useEffect(() => {
    api.get('/paket?per_page=3&published=1').then(res => setPaketUnggulan(res.data.data || [])).catch(() => {})
    api.get('/maskapai').then(res => setMaskapaiList(res.data.data || [])).catch(() => {})
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search.bulan) {
      const [tahun, bulan] = search.bulan.split('-')
      params.set('bulan', bulan)
      params.set('tahun', tahun)
    }
    if (search.jenis_layanan_id) params.set('jenis_layanan_id', search.jenis_layanan_id)
    if (search.maskapai_id)      params.set('maskapai_id', search.maskapai_id)
    if (search.bandara)          params.set('bandara', search.bandara)
    navigate(`/paket?${params.toString()}`)
  }

  const sf = (key, val) => setSearch(prev => ({ ...prev, [key]: val }))

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white py-20 px-4 relative overflow-hidden">
        {/* Islamic geometric star pattern overlay */}
        <div className="absolute inset-0 bg-islamic-pattern" />

        {/* Arch frame — Islamic mihrab arch */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 440 540" className="h-full max-h-[540px] opacity-[0.08] w-auto" preserveAspectRatio="xMidYMid meet">
            <path d="M60,530 L60,230 Q60,60 220,60 Q380,60 380,230 L380,530" fill="none" stroke="white" strokeWidth="2.5"/>
            <path d="M90,530 L90,240 Q90,100 220,100 Q350,100 350,240 L350,530" fill="none" stroke="white" strokeWidth="1.2"/>
            <path d="M38,530 L38,225 Q38,30 220,30 Q402,30 402,225 L402,530" fill="none" stroke="white" strokeWidth="1" strokeDasharray="6,4"/>
            {/* Arch keystone ornament */}
            <polygon points="220,52 228,68 220,64 212,68" fill="white" opacity="0.6"/>
            <circle cx="220" cy="42" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Basmalah */}
          <div className="font-arabic text-3xl sm:text-4xl text-orange-200/80 mb-3 leading-loose">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>

          <div className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 mb-5" style={{clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)'}}>
            ✦ Terakreditasi A — Kementerian Agama RI
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight mb-4">
            Perjalanan Umroh <br/>
            <span className="text-orange-400 italic">Aman, Nyaman & Membahagiakan</span>
          </h1>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Lebih dari 24 tahun melayani jamaah Indonesia menuju Tanah Suci. Bergabunglah dengan 60.000+ jamaah yang telah mempercayakan ibadahnya bersama kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/paket"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-none hover:bg-orange-400 transition text-sm" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              Lihat Paket Umroh
            </Link>
            <Link to="/daftar"
              className="border border-white/60 text-white px-8 py-3 rounded-none hover:bg-white hover:text-green-900 transition text-sm font-medium" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* bottom arch wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full block">
            <path d="M0,48 L0,28 Q120,0 240,24 Q360,48 480,28 Q600,8 720,24 Q840,40 960,24 Q1080,8 1200,24 Q1320,40 1440,28 L1440,48 Z" fill="rgba(255,255,255,0.05)"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-800 py-10 relative overflow-hidden bg-islamic-pattern">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              {/* Diamond wrapper */}
              <div className="w-16 h-16 mx-auto mb-3 relative">
                <div className="absolute inset-0 bg-orange-500/20 rotate-45 rounded-sm" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-2xl font-heading font-bold text-white">{s.value}</div>
                </div>
              </div>
              <div className="text-sm text-orange-300 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH CTA */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-green-900">Cari Jadwal Keberangkatan</h2>
            <div className="flex items-center justify-center gap-3 mt-2 mb-3">
              <div className="h-px w-12 bg-orange-400/50" />
              <span className="text-orange-400 text-sm">✦</span>
              <div className="h-px w-12 bg-orange-400/50" />
            </div>
            <p className="text-gray-600 text-base">Temukan jadwal umroh sesuai waktu dan pilihan maskapai Anda</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">

              {/* Bulan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Bulan Keberangkatan</label>
                <select value={search.bulan} onChange={e => sf('bulan', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Bulan</option>
                  {bulanList.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>

              {/* Jenis Paket */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">🕌 Jenis Paket</label>
                <select value={search.jenis_layanan_id} onChange={e => sf('jenis_layanan_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Jenis</option>
                  {JENIS_LIST.map(j => <option key={j.id} value={j.id}>{j.icon} {j.label}</option>)}
                </select>
              </div>

              {/* Maskapai */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">✈️ Maskapai</label>
                <select value={search.maskapai_id} onChange={e => sf('maskapai_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Maskapai</option>
                  {maskapaiList.map(m => <option key={m.id} value={m.id}>{m.nama} ({m.kode_iata})</option>)}
                </select>
              </div>

              {/* Bandara */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">🛫 Bandara Keberangkatan</label>
                <select value={search.bandara} onChange={e => sf('bandara', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Bandara</option>
                  {BANDARA_LIST.map(b => <option key={b.kode} value={b.kode}>{b.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleSearch}
                className="flex-1 bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 active:scale-95 transition text-base">
                🔍 Cari Jadwal Sekarang
              </button>
              <Link to="/paket"
                className="px-6 py-4 border border-gray-300 rounded-xl text-base text-gray-700 hover:bg-gray-100 transition text-center font-medium">
                Lihat Semua Paket
              </Link>
            </div>

            {/* Shortcut Bulan Populer */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium">Populer:</span>
              {bulanList.slice(0, 4).map(b => (
                <button key={b.value}
                  onClick={() => { sf('bulan', b.value); }}
                  className={`text-sm px-4 py-1.5 rounded-full border transition ${
                    search.bulan === b.value
                      ? 'bg-green-700 text-white border-green-700'
                      : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-700'
                  }`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="py-16 px-4 bg-gray-50 bg-islamic-pattern-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-green-900">Layanan Terbaik Kami</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
            <p className="text-gray-600 mt-3 text-base">Pilih paket ibadah sesuai kebutuhan dan kemampuan Anda</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {layanan.map((l, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 group">
                {/* Diamond icon */}
                <div className="w-14 h-14 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-green-700 rotate-45 rounded-sm group-hover:bg-orange-500 transition-colors" />
                  <div className="relative z-10 h-full flex items-center justify-center text-2xl">{l.icon}</div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-green-900 mb-2 text-center">{l.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed text-center">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAKET UNGGULAN */}
      {paketUnggulan.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-orange-400 text-2xl mb-1">✦</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-green-900">Paket Pilihan</h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-16 bg-orange-400/40" />
                <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
                <div className="h-px w-16 bg-orange-400/40" />
              </div>
              <p className="text-gray-600 mt-3 text-base">Paket umroh terpopuler pilihan jamaah kami</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paketUnggulan.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  {p.flyer_url ? (
                    <div className="relative">
                      <img
                        src={p.flyer_url}
                        alt={p.nama_paket}
                        className="w-full"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-4">
                        <div className="text-orange-300 font-extrabold text-base drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          Rp {Number(p.harga_dasar).toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-white/90">per orang</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-800 text-white p-4">
                      <div className="text-sm text-green-100 mb-1 font-medium">{p.jenis_layanan?.nama}</div>
                      <h3 className="font-bold text-base leading-tight">{p.nama_paket}</h3>
                      <div className="text-orange-400 font-bold text-lg mt-2">
                        Rp {Number(p.harga_dasar).toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-green-100">per orang</div>
                    </div>
                  )}
                  <div className="p-4">
                    {p.flyer_url && (
                      <h3 className="font-bold text-sm text-gray-800 leading-tight mb-2 line-clamp-2">{p.nama_paket}</h3>
                    )}
                    <div className="flex items-center gap-2 text-base text-gray-700 mb-1">
                      <span>⏱</span> {p.durasi_hari} Hari
                    </div>
                    <div className="flex items-center gap-2 text-base text-gray-700 mb-3">
                      <span>👥</span> Maks {p.kapasitas_maks} Orang
                    </div>
                    {p.include_detail && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{p.include_detail}</p>
                    )}
                    <Link to={`/paket/${p.id}`}
                      className="block text-center bg-green-700 text-white py-3 rounded-lg text-base font-semibold hover:bg-green-800 transition">
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/paket" className="text-green-700 font-semibold text-base hover:underline">
                Lihat Semua Paket →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* KENAPA KAMI */}
      <section className="py-16 px-4 bg-green-900 text-white bg-islamic-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-orange-400 text-2xl mb-1">✦</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Mengapa Memilih An Namiroh?</h2>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-16 bg-orange-400/40" />
            <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
            <div className="h-px w-16 bg-orange-400/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'Izin Resmi', desc: 'PPIU, PIHK & KBIH resmi dari Kemenag RI' },
              { icon: '🏨', title: 'Hotel Dekat', desc: 'Hotel strategis dekat Masjidil Haram & Nabawi' },
              { icon: '👨‍🏫', title: 'Pembimbing Pro', desc: 'Muthowwif berpengalaman & sabar mendampingi' },
              { icon: '💰', title: 'Harga Terjangkau', desc: 'Mulai 23 juta dengan fasilitas lengkap' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <div className="absolute inset-0 border border-orange-400/50 rotate-45 rounded-sm" />
                  <div className="absolute inset-2 bg-orange-500/15 rotate-45 rounded-sm" />
                  <div className="relative z-10 h-full flex items-center justify-center text-3xl">{item.icon}</div>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-base text-green-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-green-900">Kata Jamaah Kami</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
            <p className="text-gray-600 mt-3 text-base">Pengalaman nyata dari jamaah yang telah berangkat bersama kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-orange-400 text-lg mb-2">{'★'.repeat(t.bintang)}</div>
                <p className="text-base text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-green-900 text-base">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.kota}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-green-900">Galeri Kegiatan Jamaah</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
            <p className="text-gray-600 mt-3 text-base">Momen berharga perjalanan ibadah bersama An-Namiroh Travelindo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/galeri/keberangkatan1.webp', alt: 'Pemberangkatan jamaah' },
              { src: '/galeri/keberangkatan2.webp', alt: 'Keberangkatan umroh' },
              { src: '/galeri/hotel.webp',          alt: 'Hotel di Mekkah' },
              { src: '/galeri/keberangkatan3.webp', alt: 'Keberangkatan bersama' },
              { src: '/galeri/keberangkatan4.webp', alt: 'Persiapan keberangkatan' },
              { src: '/galeri/fasilitas_kopi.webp', alt: 'Fasilitas jamaah' },
              { src: '/galeri/keberangkatan5.webp', alt: 'Jamaah siap berangkat' },
              { src: '/galeri/keberangkatan6.webp', alt: 'Momen keberangkatan' },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-xl aspect-square group">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/galeri"
              className="inline-block bg-green-900 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-800 transition text-base">
              Lihat Semua Foto &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-950 bg-islamic-pattern relative overflow-hidden">
        {/* Arabic calligraphy watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-arabic text-[160px] text-white/[0.03] leading-none">الله</span>
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="font-arabic text-2xl text-orange-300/70 mb-3">لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
            Jangan Tunda Niat Baikmu!
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-orange-400/40" />
            <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
            <div className="h-px w-16 bg-orange-400/40" />
          </div>
          <p className="text-green-200 mb-8 text-base">
            Selagi masih sehat, masih ada kesempatan dan masih ada rezeki. Daftarkan dirimu sekarang.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/daftar"
              className="bg-orange-500 text-white font-semibold px-8 py-4 hover:bg-orange-400 transition text-base" style={{clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)'}}>
              Daftar Umroh Sekarang
            </Link>
            <a href="https://wa.me/6282335611999?text=Assalamualaikum, saya ingin info paket umroh"
              target="_blank" rel="noreferrer"
              className="border-2 border-orange-400 text-orange-400 font-semibold px-8 py-4 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition text-base" style={{clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)'}}>
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
