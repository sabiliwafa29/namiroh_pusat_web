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
  {
    name: 'Bu Ika K-Cunk Motor', kota: 'Tulungagung', bintang: 5,
    foto: '/testimoni/bu-ika-tulungagung.jpg',
    text: 'Alhamdulillah, rasanya sungguh luar biasa dan sangat mengharukan umroh bersama An Namiroh Travelindo! Saya merasa sangat terbantu dan senantiasa didampingi dalam setiap proses ibadah. Pelayanan yang diberikan pun sangat memuaskan. Alhamdulillah, terima kasih banyak An Namiroh Travelindo!',
  },
  {
    name: 'Ning Umi Laila', kota: 'Surabaya', bintang: 5,
    foto: '/testimoni/ning-umi-laila-surabaya.jpg',
    text: 'Proses pelayanannya sangat praktis dan cepat, dimulai dari pendampingan pembuatan paspor hingga keberangkatan. Kami selalu didampingi sehingga tidak merasa bingung. Prinsip An-Namiroh, "Jemaah senang, ibadah pun tenang," benar-benar terasa nyata.',
  },
  {
    name: 'Neng Kholifah', kota: 'Pandaan, Pasuruan', bintang: 5,
    foto: '/testimoni/neng-kholifah-pasuruan.jpeg',
    text: 'Kami dilayani, diperhatikan, dan hotel yang ditempati sangat bagus dan nyaman. Muthowifnya sangat baik, sabar mendampingi jamaah. Tamu tamu Allah istimewa sekali. Terimakasih PT An Namiroh Travelindo maju terus untuk melayani tamu-tamu Allah.',
  },
]

const JENIS_LIST = [
  { id: '1', label: 'Umroh Reguler', icon: '🕌' },
  { id: '2', label: 'Umroh VIP',     icon: '⭐' },
  { id: '3', label: 'Badal Umroh',   icon: '💚' },
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
  const [promoPopup, setPromoPopup] = useState(true)

  const bulanList = Array.from({ length: 12 - new Date().getMonth() }, (_, i) => {
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

      {/* POPUP PROMO BANNER */}
      {promoPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          onClick={() => setPromoPopup(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md"
            onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setPromoPopup(false)}
              className="absolute top-3 right-3 z-10 w-11 h-11 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-3xl leading-none transition"
              aria-label="Tutup"
            >×</button>
            {/* Banner image */}
            <img
              src="/galeri/banner-umroh-baru.webp"
              alt="Promo Umroh Terbaru"
              className="w-full object-cover max-h-48 sm:max-h-64"
              loading="eager"
            />
            {/* Content */}
            <div className="bg-green-700 px-6 py-5 text-white text-center">
              <div className="text-2xl sm:text-3xl font-extrabold leading-snug mb-1">
                📢 Untuk Dapatkan Info Promo Terbaru, Chat Admin!
              </div>
              <div className="text-green-200 text-base mb-4">Respon cepat, siap membantu Anda memilih paket terbaik</div>
              <div className="flex gap-3 justify-center">
                <a href="https://wa.me/6285711755881?text=Assalamualaikum, saya ingin info promo paket umroh terbaru"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-white flex-shrink-0">
                    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l8-2c2.2 1.16 4.7 1.83 7.5 1.83 8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.17c-2.57 0-4.97-.69-7.03-1.9l-.5-.29-5.2 1.36 1.39-5.07-.33-.52A12.4 12.4 0 0 1 3.33 16C3.33 9.37 8.87 3.83 16 3.83S28.67 9.37 28.67 16 23.13 28.67 16 28.67zm6.8-9.3c-.37-.19-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63-.22-.01-.47-.01-.72-.01-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
                  </svg>
                  Admin 1
                </a>
                <a href="https://wa.me/6282141932722?text=Assalamualaikum, saya ingin info promo paket umroh terbaru"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-white flex-shrink-0">
                    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l8-2c2.2 1.16 4.7 1.83 7.5 1.83 8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.17c-2.57 0-4.97-.69-7.03-1.9l-.5-.29-5.2 1.36 1.39-5.07-.33-.52A12.4 12.4 0 0 1 3.33 16C3.33 9.37 8.87 3.83 16 3.83S28.67 9.37 28.67 16 23.13 28.67 16 28.67zm6.8-9.3c-.37-.19-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63-.22-.01-.47-.01-.72-.01-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
                  </svg>
                  Admin 2
                </a>
              </div>
              <button onClick={() => setPromoPopup(false)}
                className="mt-3 text-green-300 hover:text-white text-sm underline transition">
                Tutup & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="text-white pt-24 pb-10 px-4 relative overflow-hidden"
        style={{ backgroundImage: "url('/galeri/Galeri-Jamaah-Umroh-An-Namiroh-1.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Dark overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-green-950/55" />
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
          <div className="font-arabic text-3xl sm:text-4xl text-orange-200/80 mb-8 leading-loose">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>

          <div className="inline-block bg-orange-500 text-white text-base font-black px-4 py-1.5 mb-5 rounded-3xl">
            Terakreditasi A — Kementerian Agama RI
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight mb-4">
            Perjalanan Umroh <br/>
            <span className="text-orange-400 italic">Aman, Nyaman & Membahagiakan</span>
          </h1>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold leading-tight mb-4">
            Program Umroh dan Haji Terbaik Bersama ANNAMIROH TRAVELINDO<br/>
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Lebih dari 24 tahun melayani jamaah Indonesia menuju Tanah Suci. Bergabunglah dengan 60.000+ jamaah yang telah mempercayakan ibadahnya bersama kami.
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Link to="/paket"
                  className="bg-orange-500 text-white font-black px-4 py-3 rounded-3xl hover:bg-orange-400 transition text-base sm:text-xl shadow-lg whitespace-nowrap tracking-wide">
              Lihat Paket Umroh
            </Link>
            <Link to="/daftar"
              className="bg-white text-green-900 px-4 py-3 rounded-3xl hover:bg-gray-100 transition text-base sm:text-xl font-black shadow-lg whitespace-nowrap tracking-wide">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO DRIVE */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-green-900 mb-2">
            Video Ini Membuat Banyak Orang Rindu Ke Tanah Suci <br />
          </h2>
          <h2 className="font-heading text-xl sm:text-3xl font-bold text-green-900 mb-2">
            Jangan Biarkan Panggilan itu Hanya Menjadi Keinginan <br />Bersama An Namiroh Travelindo, InsyaAllah Perjalanan Suci Anda Mudah, Aman, dan Penuh Keberkahan <br />Sekarang Giliran Anda Menjadi Tamu Allah
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2 mb-6">
            <div className="h-px w-12 bg-orange-400/50" />
            <span className="text-orange-400 text-sm">✦</span>
            <div className="h-px w-12 bg-orange-400/50" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-black mx-auto" style={{ aspectRatio: '9/16', maxWidth: '360px' }}>
            <iframe
              src="https://drive.google.com/file/d/1Cz6z1cCGSkbyMIOKTc3eHakTN6MdPj-O/preview"
              title="Video Ini Membuat Banyak Orang Rindu ke Tanah Suci"
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SEARCH CTA */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-heading-bold text-3xl sm:text-4xl font-black text-green-900">Cari Jadwal Keberangkatan</h2>
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
                <label className="block text-base font-bold text-gray-700 mb-2">📅 Bulan Keberangkatan</label>
                <select value={search.bulan} onChange={e => sf('bulan', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Bulan</option>
                  {bulanList.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>

              {/* Jenis Paket */}
              <div>
                <label className="block text-base font-bold text-gray-700 mb-2">🕌 Jenis Paket</label>
                <select value={search.jenis_layanan_id} onChange={e => sf('jenis_layanan_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Jenis</option>
                  {JENIS_LIST.map(j => <option key={j.id} value={j.id}>{j.icon} {j.label}</option>)}
                </select>
              </div>

              {/* Maskapai */}
              <div>
                <label className="block text-base font-bold text-gray-700 mb-2">✈️ Maskapai</label>
                <select value={search.maskapai_id} onChange={e => sf('maskapai_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Maskapai</option>
                  {maskapaiList.map(m => <option key={m.id} value={m.id}>{m.nama} ({m.kode_iata})</option>)}
                </select>
              </div>

              {/* Bandara */}
              <div>
                <label className="block text-base font-bold text-gray-700 mb-2">🛫 Bandara Keberangkatan</label>
                <select value={search.bandara} onChange={e => sf('bandara', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Semua Bandara</option>
                  {BANDARA_LIST.map(b => <option key={b.kode} value={b.kode}>{b.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleSearch}
                className="flex-1 bg-green-700 text-white font-extrabold py-4 rounded-xl hover:bg-green-800 active:scale-95 transition text-lg">
                🔍 Cari Jadwal Sekarang
              </button>
              <Link to="/paket"
                className="px-6 py-4 border border-gray-300 rounded-xl text-lg text-gray-700 hover:bg-gray-100 transition text-center font-bold">
                Lihat Semua Paket
              </Link>
            </div>

            {/* Shortcut Bulan Populer */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium">Populer:</span>
              {bulanList.slice(0, 12).map(b => (
                <button key={b.value}
                  onClick={() => { sf('bulan', b.value); }}
                  className={`text-sm font-bold px-4 py-1.5 rounded-full border transition ${
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
      <section className="px-4 bg-gray-50 bg-islamic-pattern-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading-bold text-3xl sm:text-4xl font-bold text-green-900">Layanan Terbaik Kami</h2>
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
                      <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-2">{p.nama_paket}</h3>
                    )}
                    <div className="flex items-center gap-2 text-base text-gray-700 mb-1">
                      <span>⏱</span> {p.durasi_hari} Hari
                    </div>
                    <div className="flex items-center gap-2 text-base text-gray-700 mb-3">
                      <span>👥</span> Maks {p.kapasitas_maks} Orang
                    </div>
                    {p.include_detail && (
                      <p className="text-base text-gray-600 mb-3 line-clamp-2">{p.include_detail}</p>
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
      <section className="py-3 px-4 bg-green-900 text-white bg-islamic-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-orange-400 text-2xl mb-1">✦</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Mengapa Memilih<br />An Namiroh Travelindo?</h2>
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
      <section className="py-3 px-4 bg-gray-50">
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
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {t.foto && (
                  <img src={t.foto} alt={t.name} className="w-full h-90 object-cover" loading="lazy" />
                )}
                <div className="p-5">
                  <div className="text-orange-400 text-lg mb-2">{'★'.repeat(t.bintang)}</div>
                  <p className="text-base text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div>
                    <div className="font-semibold text-green-900 text-base">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.kota}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="py-3 px-4 bg-white">
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
              { src: '/galeri/keberangkatan3.webp', alt: 'Keberangkatan bersama' },
              { src: '/galeri/keberangkatan4.webp', alt: 'Persiapan keberangkatan' },
              { src: '/galeri/Galeri-Jamaah-Umroh-An-Namiroh-1.webp', alt: 'Keberangkatan umroh' },
              { src: '/galeri/Galeri-Jamaah-Umroh-An-Namiroh-2.webp', alt: 'Keberangkatan umroh' },
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
      <section className="py-7 px-4 bg-green-950 bg-islamic-pattern relative overflow-hidden">
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
              className="bg-orange-500 text-white font-black px-4 py-3 rounded-3xl hover:bg-orange-400 transition text-base sm:text-xl shadow-lg whitespace-nowrap tracking-wide">
              Daftar Umroh Sekarang
            </Link>
            <a href="https://wa.me/6285711755881?text=Assalamualaikum, saya ingin info paket umroh"
              target="_blank" rel="noreferrer"
              className="border-2 border-orange-400 text-orange-400 font-black px-4 py-3 rounded-3xl hover:bg-orange-400 transition text-base sm:text-xl shadow-lg whitespace-nowrap tracking-wide">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
