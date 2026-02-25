import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GALERI = [
  { src: '/galeri/keberangkatan1.webp', alt: 'Pemberangkatan jamaah',    kategori: 'Keberangkatan' },
  { src: '/galeri/keberangkatan2.webp', alt: 'Keberangkatan umroh',      kategori: 'Keberangkatan' },
  { src: '/galeri/keberangkatan3.webp', alt: 'Keberangkatan bersama',    kategori: 'Keberangkatan' },
  { src: '/galeri/keberangkatan4.webp', alt: 'Persiapan keberangkatan',  kategori: 'Keberangkatan' },
  { src: '/galeri/keberangkatan5.webp', alt: 'Jamaah siap berangkat',    kategori: 'Keberangkatan' },
  { src: '/galeri/keberangkatan6.webp', alt: 'Momen keberangkatan',      kategori: 'Keberangkatan' },
  { src: '/galeri/hotel.webp',          alt: 'Hotel di Mekkah',          kategori: 'Fasilitas' },
  { src: '/galeri/fasilitas_kopi.webp', alt: 'Fasilitas jamaah',         kategori: 'Fasilitas' },
]

const KATEGORI = ['Semua', 'Keberangkatan', 'Fasilitas']

export default function Galeri() {
  const [aktif, setAktif]       = useState('Semua')
  const [lightbox, setLightbox] = useState(null) // index atau null

  const filtered = aktif === 'Semua' ? GALERI : GALERI.filter(g => g.kategori === aktif)

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <section className="bg-green-900 pt-[8.5rem] pb-14 px-4 text-white text-center bg-islamic-pattern relative overflow-hidden">
        <div className="font-arabic text-2xl text-orange-300/70 mb-2">وجاهدوا في سبيله</div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-2">Galeri Kegiatan Jamaah</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-12 bg-orange-400/40" />
          <div className="w-1.5 h-1.5 bg-orange-400 rotate-45" />
          <div className="h-px w-12 bg-orange-400/40" />
        </div>
        <p className="text-green-200 text-base mt-3">Dokumentasi perjalanan ibadah bersama An-Namiroh Travelindo</p>
      </section>

      {/* FILTER TABS */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-10">
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          {KATEGORI.map(k => (
            <button
              key={k}
              onClick={() => setAktif(k)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                aktif === k
                  ? 'bg-green-900 text-white shadow'
                  : 'bg-white text-green-900 border border-green-900 hover:bg-green-50'
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-16">
          {filtered.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setLightbox(i)}
              className="overflow-hidden rounded-xl aspect-square group focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          {/* Prev */}
          <button
            className="absolute left-4 text-white text-4xl font-bold px-3 py-1 hover:text-orange-300 transition"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Sebelumnya"
          >&#8249;</button>

          {/* Image */}
          <div className="max-w-4xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
            />
            <p className="text-white text-center mt-3 text-sm opacity-80">{filtered[lightbox].alt}</p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 text-white text-4xl font-bold px-3 py-1 hover:text-orange-300 transition"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Selanjutnya"
          >&#8250;</button>

          {/* Close */}
          <button
            className="absolute top-4 right-5 text-white text-3xl font-bold hover:text-orange-300 transition"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >&times;</button>

          {/* Counter */}
          <div className="absolute bottom-5 text-white text-sm opacity-60">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
