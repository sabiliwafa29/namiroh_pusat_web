import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MILESTONES = [
  { tahun: '2000', teks: 'An Namiroh Travelindo berdiri di Surabaya sebagai biro perjalanan umroh & haji.' },
  { tahun: '2005', teks: 'Mendapatkan izin resmi PPIU dari Kementerian Agama RI.' },
  { tahun: '2010', teks: 'Memperluas layanan dengan program Haji Plus dan Badal Umroh/Haji.' },
  { tahun: '2015', teks: 'Mencapai 30.000 jamaah diberangkatkan. Meraih akreditasi KBIH terbaik.' },
  { tahun: '2019', teks: 'Meluncurkan program Wisata Halal ke Turki, Mesir, dan Palestina.' },
  { tahun: '2024', teks: 'Lebih dari 60.000 jamaah diberangkatkan. Meraih Akreditasi A dari Kemenag RI.' },
]

const TIM = [
  { nama: 'H. Imam Fauzi, S.Ag', jabatan: 'Direktur Utama', deskripsi: 'Lebih dari 24 tahun memimpin An Namiroh dengan dedikasi melayani jamaah menuju Tanah Suci.' },
  { nama: 'Hj. Nur Laila, M.Pd', jabatan: 'Direktur Operasional', deskripsi: 'Mengkoordinasi seluruh operasional keberangkatan agar jamaah berangkat dengan aman dan nyaman.' },
  { nama: 'Ust. Ahmad Faruq, Lc', jabatan: 'Kepala Muthowwif', deskripsi: 'Alumni Universitas Al-Azhar Kairo, berpengalaman membimbing ribuan jamaah di Tanah Suci.' },
]

const IZIN = [
  { kode: 'PPIU', nama: 'Penyelenggara Perjalanan Ibadah Umroh', nomor: 'SK Kemenag No. Umroh-001/2005' },
  { kode: 'PIHK', nama: 'Penyelenggara Ibadah Haji Khusus', nomor: 'SK Kemenag No. Haji-045/2010' },
  { kode: 'KBIH', nama: 'Kelompok Bimbingan Ibadah Haji & Umroh', nomor: 'SK Kemenag No. KBIH-112/2008' },
  { kode: 'AKR A', nama: 'Akreditasi A Kementerian Agama RI', nomor: 'Tahun 2024' },
]

export default function Profil() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <section className="bg-green-900 pt-[8.5rem] pb-14 px-4 text-white text-center bg-islamic-pattern relative overflow-hidden">
        <div className="font-arabic text-2xl text-orange-300/70 mb-2">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-2">Company Profile</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-12 bg-orange-400/40" />
          <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
          <div className="h-px w-12 bg-orange-400/40" />
        </div>
        <p className="text-green-200 text-base mt-3">Lebih dari 24 tahun melayani jamaah Indonesia menuju Tanah Suci</p>
      </section>

      {/* TENTANG KAMI */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-orange-400 text-2xl mb-1">✦</div>
              <h2 className="font-heading text-3xl font-bold text-green-900 mb-4">Tentang An Namiroh Travelindo</h2>
              <div className="h-1 w-16 bg-orange-400 rounded mb-5" />
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                <strong>An Namiroh Travelindo</strong> adalah biro perjalanan umroh dan haji yang berdiri sejak tahun 2000 di Surabaya, Jawa Timur. Selama lebih dari dua dekade, kami telah menjadi mitra terpercaya lebih dari <strong>60.000 jamaah</strong> dalam mewujudkan impian beribadah di Tanah Suci.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Berbekal izin resmi PPIU, PIHK, dan KBIH dari Kementerian Agama RI serta Akreditasi A, kami berkomitmen memberikan pelayanan terbaik — mulai dari pendaftaran, bimbingan pra-keberangkatan, akomodasi berkualitas, hingga pendampingan mutawif berpengalaman selama di Tanah Suci.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Dengan semangat <em>"Melayani dengan Hati, Memberangkatkan dengan Amanah"</em>, kami hadir untuk memastikan setiap jamaah dapat menjalani ibadah dengan tenang, khusyuk, dan penuh makna.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { value: '24+',    label: 'Tahun Pengalaman',         icon: '🕐' },
                { value: '60.000+',label: 'Jamaah Diberangkatkan',   icon: '🤲' },
                { value: 'A',      label: 'Akreditasi Kemenag RI',   icon: '🏆' },
                { value: '24/7',   label: 'Layanan Customer Service', icon: '📞' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="text-3xl">{s.icon}</div>
                  <div>
                    <div className="font-heading text-2xl font-bold text-green-900">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-16 px-4 bg-gray-50 bg-islamic-pattern-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl font-bold text-green-900">Visi & Misi</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-900 text-white rounded-2xl p-8">
              <div className="text-orange-400 text-3xl mb-3">🌟</div>
              <h3 className="font-heading text-2xl font-bold mb-3">Visi</h3>
              <p className="text-green-100 text-base leading-relaxed">
                Menjadi penyelenggara perjalanan ibadah umroh dan haji terpercaya, terbaik, dan terdepan di Indonesia yang mengutamakan kepuasan jamaah dan keberkahan dalam setiap langkah perjalanan menuju Tanah Suci.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="text-green-700 text-3xl mb-3">🎯</div>
              <h3 className="font-heading text-2xl font-bold text-green-900 mb-3">Misi</h3>
              <ul className="space-y-2 text-gray-700 text-base">
                <li className="flex gap-2"><span className="text-orange-500 mt-0.5">✓</span> Menyelenggarakan perjalanan ibadah yang aman, nyaman, dan bermakna</li>
                <li className="flex gap-2"><span className="text-orange-500 mt-0.5">✓</span> Memberikan pelayanan profesional dengan bimbingan mutawif berpengalaman</li>
                <li className="flex gap-2"><span className="text-orange-500 mt-0.5">✓</span> Memastikan fasilitas terbaik dengan harga yang terjangkau</li>
                <li className="flex gap-2"><span className="text-orange-500 mt-0.5">✓</span> Membangun kepercayaan jamaah melalui transparansi dan amanah</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LEGALITAS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl font-bold text-green-900">Legalitas & Izin Resmi</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
            <p className="text-gray-600 mt-3 text-base">Beroperasi secara resmi dan terdaftar di Kementerian Agama RI</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {IZIN.map((iz, i) => (
              <div key={i} className="flex gap-4 items-start bg-green-50 border border-green-100 rounded-xl p-5">
                <div className="w-14 h-14 flex-shrink-0 bg-green-700 rounded-xl flex items-center justify-center text-white font-bold text-sm text-center leading-tight px-1">
                  {iz.kode}
                </div>
                <div>
                  <div className="font-semibold text-green-900 text-base">{iz.nama}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{iz.nomor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="py-16 px-4 bg-gray-50 bg-islamic-pattern-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl font-bold text-green-900">Perjalanan Kami</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-green-200" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-14 h-14 flex-shrink-0 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xs relative z-10">
                    {m.tahun}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex-1 mt-2">
                    <p className="text-gray-700 text-base">{m.teks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIM */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl font-bold text-green-900">Tim Kami</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TIM.map((t, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">👤</div>
                <h3 className="font-semibold text-green-900 text-base mb-1">{t.nama}</h3>
                <div className="text-orange-500 text-sm font-medium mb-2">{t.jabatan}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{t.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
