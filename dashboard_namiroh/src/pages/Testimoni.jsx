import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const TESTIMONI = [
  {
    name: 'Bu Ika K-Cunk Motor',
    kota: 'Tulungagung',
    tahun: '2025',
    bintang: 5,
    foto: '/testimoni/bu-ika-tulungagung.jpg',
    text: 'Alhamdulillah, rasanya sungguh luar biasa dan sangat mengharukan umroh bersama An Namiroh Travelindo! Saya merasa sangat terbantu dan senantiasa didampingi dalam setiap proses ibadah. Kehadiran Ibu Hari juga sebagai pendamping jemaah perempuan sangat memudahkan kami, terutama karena beliau menguasai bahasa Arab. Pelayanan yang diberikan pun sangat memuaskan. Alhamdulillah, terima kasih banyak An Namiroh Travelindo!',
  },
  {
    name: 'Ning Umi Laila',
    kota: 'Surabaya',
    tahun: '2025',
    bintang: 5,
    foto: '/testimoni/ning-umi-laila-surabaya.jpg',
    text: 'Proses pelayanannya sangat praktis dan cepat, dimulai dari pendampingan pembuatan paspor hingga keberangkatan. Kami selalu didampingi sehingga tidak merasa bingung. Para mutawif sangat mengayomi seluruh jemaah, baik yang berusia muda maupun yang sudah lanjut usia. Prinsip An-Namiroh, "Jemaah senang, ibadah pun tenang," benar-benar terasa nyata.',
  },
  {
    name: 'Faridatus Sholichah',
    kota: 'Kandangan, Kediri',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/faridatus-sholichah-kediri.jpeg',
    text: 'Alhamdulillah saya dari jamaah An Namiroh merasakan suasana pada saat itu bagus sekali begitupun untuk pelayanannya. Mulai dari hotel, juga bisa sholat beribadah berjamaah tidak ada halangan apapun. Kami juga bisa melakukan ibadah towaf berkali kali dan bisa ke roudhoh, Alhamdulillah. Terimakasih banyak untuk PT An Namiroh Travelindo, Semoga semakin baik dan Jaya.',
  },
  {
    name: 'Abah Sholeh',
    kota: 'Blitar',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/abah-sholeh-blitar.jpeg',
    text: 'Alhamdulillah kami rombongan dari Blitar diberi kesempatan untuk bisa umroh New Normal 25 Januari 2021. Kita dikasih fasilitas yang luar biasa, paket ekonomi dengan fasilitas bintang 5. Di Madinah kami di Hotel Nozol Royal Inn, di Makkah kami di Hotel Marriot. Ibadah thawaf dan sai kita diberi kemudahan yang luar biasa. Sekian pengalaman dari Abah Soleh-Blitar.',
  },
  {
    name: 'Neng Kholifah',
    kota: 'Pandaan, Pasuruan',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/neng-kholifah-pasuruan.jpeg',
    text: 'Alhamdulillah saya beserta rombongan ditakdirkan oleh Allah SWT Umroh New Normal pada 25 Januari 2021. Kami dilayani, diperhatikan, dan hotel yang ditempati sangat bagus dan nyaman. Muthowifnya sangat baik, sabar mendampingi jamaah. Tamu tamu Allah istimewa sekali. Terimakasih PT An Namiroh Travelindo maju terus untuk melayani tamu-tamu Allah.',
  },
  {
    name: 'Bpk Jayati & Ibu Yuliatin',
    kota: '—',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/bpk-jayati-yuliatin.jpg',
    text: 'Terimakasih sekali kepada TL Neng Ifah Badri, dari awal keberangkatan sampai Jeddah Madinah dan menuju Masjidil Haram benar benar ibadah yang tidak pernah saya bayangkan sebelumnya. Betul betul ibadah yang istimewa sekali dan sangat puas. Mudah mudahan semoga bisa berangkat lagi bersama keluarga besar An Namiroh.',
  },
  {
    name: 'Bu Ilmi Fatmawati',
    kota: 'Sidoarjo',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/bu-ilmi-fatmawati-sidoarjo.jpeg',
    text: 'Alhamdulillah saya sangat bersyukur, puas sekali dengan pelayanan yang diberikan dari An Namiroh selama kita di Indonesia, di Mekkah, juga di Madinah. Untuk hotel dan makanan yang telah disediakan sangat memuaskan sekali. Terimakasih banyak kepada travel An Namiroh yang memberikan fasilitas yang sebagus dan sebaik-baiknya.',
  },
  {
    name: 'Bu Endang',
    kota: 'Tuban',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/bu-endang-tuban.jpeg',
    text: 'Saya sangat puas dengan pelayanan PT An Namiroh, mulai dari transportasi nyaman, kamar hotel berbintang 5 yang membuat kita sangat nyaman, dan kita juga memilih makanan sendiri sesuai selera. Ingin lagi kembali ke rumah Baitullah bersama PT An Namiroh. Bagi teman teman yang ingin umroh, ikut PT An Namiroh saja, dijamin tidak mengecewakan.',
  },
  {
    name: 'Apiq',
    kota: 'Tuban',
    tahun: '2021',
    bintang: 5,
    foto: '/testimoni/apiq-tuban.jpeg',
    text: 'Alhamdulillah Umroh New Normal keberangkatan tgl 25/01/2021 bersama PT. An Namiroh Travelindo sangat nyaman dan aman, ibadah lebih khusyuk, pelayanan memuaskan dan hotel sangat dekat dengan Masjid Nabawi maupun Masjidil Haram. Umroh New Normal bersama PT An Namiroh Travelindo jelas travelnya jelas harganya dan jelas pelayanannya.',
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
              <div key={i} className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Foto */}
                {t.foto && (
                  <img
                    src={t.foto}
                    alt={t.name}
                    className="w-full h-90 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-6">
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
                      <div className="text-xs text-gray-400">{t.tahun}</div>
                    </div>
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
