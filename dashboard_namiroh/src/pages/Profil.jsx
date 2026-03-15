import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PDF_URL = `${import.meta.env.VITE_STORAGE_URL || 'https://api.annamirohtravelindo.com/storage'}/Company-Profile-An-Namiroh.pdf`

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
            <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/TB1qIon-ZSQ"
                title="An Namiroh Travelindo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE PDF */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-orange-400 text-2xl mb-1">✦</div>
            <h2 className="font-heading text-3xl font-bold text-green-900">Company Profile</h2>
            <div className="flex items-center justify-center gap-3 mt-2 mb-3">
              <div className="h-px w-16 bg-orange-400/40" />
              <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
              <div className="h-px w-16 bg-orange-400/40" />
            </div>
            <p className="text-gray-600 text-base">Unduh atau baca langsung Company Profile An Namiroh Travelindo</p>
          </div>

          {/* PDF Viewer */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-green-100 bg-white">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 bg-green-900 border-b border-green-800">
              <div className="flex items-center gap-2">
                <span className="text-orange-400 text-lg">📄</span>
                <span className="text-white font-semibold text-sm">Company Profile AnNamiroh Travelindo</span>
              </div>
              <a
                href={PDF_URL}
                download="Company-Profile-An-Namiroh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-150"
              >
                <span>⬇</span>
                <span>Download PDF</span>
              </a>
            </div>

            {/* Iframe Viewer */}
            <iframe
              src={`${PDF_URL}#toolbar=0&navpanes=0&view=FitH`}
              title="Company Profile An Namiroh Travelindo"
              className="w-full border-0"
              style={{ height: '780px' }}
            />

            {/* Footer bar */}
            <div className="flex items-center justify-center gap-4 px-5 py-4 bg-green-50 border-t border-green-100">
              <a
                href={PDF_URL}
                download="Company-Profile-An-Namiroh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-800 hover:bg-green-700 active:scale-95 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150 shadow-sm"
              >
                <span>⬇</span>
                <span>Download Company Profile</span>
              </a>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-green-800 text-green-800 hover:bg-green-800 hover:text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150"
              >
                <span>↗</span>
                <span>Buka di Tab Baru</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}
