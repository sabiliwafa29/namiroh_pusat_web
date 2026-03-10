import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const TESTIMONI = [
  {
    name: 'Ibu Siti Nurjanah',
    kota: 'Surabaya',
    paket: 'Umroh Reguler 13 Hari',
    tahun: '2024',
    bintang: 5,
    text: 'Alhamdulillah, perjalanan Umroh bersama An Namiroh sangat lancar. Hotel dekat Masjidil Haram dan makanannya cocok di lidah. Terima kasih An Namiroh!',
  },
  {
    name: 'Bapak H. Mulyadi',
    kota: 'Bandung',
    paket: 'Umroh VIP',
    tahun: '2024',
    bintang: 5,
    text: 'Tour leader dan muthowwif selalu sigap menjawab pertanyaan kami. Semua fasilitas sesuai yang dijanjikan. InsyaAllah akan direkomendasikan ke keluarga.',
  },
  {
    name: 'Ning Umi Laila',
    kota: 'Surabaya',
    paket: 'Umroh Reguler',
    tahun: '2023',
    bintang: 5,
    text: 'Pelayanan sangat praktis, cepat, dan didampingi sejak awal. Para mutawif mengayomi jamaah muda maupun tua. An-Namiroh recommended!',
  },
  {
    name: 'Bapak Hendra Kusuma',
    kota: 'Malang',
    paket: 'Umroh Plus Aqsa',
    tahun: '2024',
    bintang: 5,
    text: 'Subhanallah, bisa sholat di Masjidil Haram, Masjid Nabawi, dan Masjid Al-Aqsa dalam satu perjalanan. Luar biasa! Terima kasih An Namiroh sudah mewujudkan impian kami.',
  },
  {
    name: 'Ibu Fatimah Azzahra',
    kota: 'Gresik',
    paket: 'Umroh Full Ramadan',
    tahun: '2025',
    bintang: 5,
    text: 'Ramadan di Tanah Suci adalah mimpi terbesar saya. Alhamdulillah terwujud bersama An Namiroh. Makan enak, hotel nyaman, mutawif sabar. Semoga bisa kembali lagi.',
  },
  {
    name: 'Bapak Sugiarto & Keluarga',
    kota: 'Sidoarjo',
    paket: 'Umroh Keluarga',
    tahun: '2023',
    bintang: 5,
    text: 'Kami berangkat berlima sekeluarga. Proses pendaftaran mudah, pembimbing ramah, dan semua anak-anak kami terlayani dengan baik. Terima kasih banyak!',
  },
  {
    name: 'Hj. Rukmini',
    kota: 'Surabaya',
    paket: 'Haji Plus',
    tahun: '2022',
    bintang: 5,
    text: 'Sudah dua kali saya berangkat bersama An Namiroh, umroh dan haji plus. Dua-duanya memuaskan. Fasilitas sesuai janji, pembimbing amanah, saya rekomendasikan ke semua.',
  },
  {
    name: 'Ustadz Mahfudz',
    kota: 'Lamongan',
    paket: 'Wisata Halal Turki',
    tahun: '2024',
    bintang: 5,
    text: 'Istanbul dan Bursa luar biasa! Selain umroh kami juga city tour ke tempat-tempat bersejarah Islam. Program An Namiroh sangat thoughtful dan profesional.',
  },
  {
    name: 'Ibu Dewi Rahayu',
    kota: 'Mojokerto',
    paket: 'Umroh Syawal',
    tahun: '2025',
    bintang: 5,
    text: 'Ini pertama kali saya umroh dan sangat bersyukur memilih An Namiroh. Semuanya diurus dengan baik dari awal sampai pulang. Insya Allah tahun depan umroh lagi!',
  },
]

export default function Testimoni() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <section className="bg-green-900 pt-[8.5rem] pb-14 px-4 text-white text-center bg-islamic-pattern relative overflow-hidden">
        <div className="font-arabic text-2xl text-orange-300/70 mb-2">رَضِيَ اللهُ عَنْهُمْ وَرَضُوا عَنْهُ</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-2">Testimoni Jamaah</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-12 bg-orange-400/40" />
          <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
          <div className="h-px w-12 bg-orange-400/40" />
        </div>
        <p className="text-green-200 text-base mt-3">Pengalaman nyata dari jamaah yang telah berangkat bersama kami</p>
      </section>

      {/* RATING SUMMARY */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <div className="text-center">
              <div className="font-heading text-6xl font-bold text-green-900">5.0</div>
              <div className="text-orange-400 text-2xl mt-1">{'★'.repeat(5)}</div>
              <div className="text-gray-500 text-sm mt-1">Rating Rata-rata</div>
            </div>
            <div className="hidden sm:block w-px h-24 bg-gray-200" />
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-heading text-3xl font-bold text-green-900">60.000+</div>
                <div className="text-gray-500 text-sm mt-1">Total Jamaah</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold text-green-900">24+</div>
                <div className="text-gray-500 text-sm mt-1">Tahun Melayani</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold text-green-900">A</div>
                <div className="text-gray-500 text-sm mt-1">Akreditasi Kemenag</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONI GRID */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {TESTIMONI.map((t, i) => (
              <div key={i} className="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* Bintang */}
                <div className="text-orange-400 text-base mb-3">{'★'.repeat(t.bintang)}</div>
                {/* Quote */}
                <p className="text-gray-700 text-base leading-relaxed mb-4 italic">"{t.text}"</p>
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="font-semibold text-green-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.kota}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-orange-500 font-medium">{t.paket}</div>
                    <div className="text-xs text-gray-400">{t.tahun}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-green-900 bg-islamic-pattern text-white text-center">
        <div className="max-w-xl mx-auto">
          <div className="text-orange-400 text-2xl mb-2">✦</div>
          <h2 className="font-heading text-3xl font-bold mb-3">Jadilah Bagian dari Keluarga Besar An Namiroh</h2>
          <p className="text-green-200 text-base mb-6">Bergabunglah dengan 60.000+ jamaah yang telah mempercayakan ibadahnya bersama kami.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/paket" className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-400 transition text-base">
              Lihat Paket Umroh
            </Link>
            <a href="https://wa.me/6282335611999?text=Assalamualaikum, saya ingin info paket umroh"
              target="_blank" rel="noreferrer"
              className="border-2 border-orange-400 text-orange-400 font-semibold px-8 py-3 rounded-xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition text-base">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
