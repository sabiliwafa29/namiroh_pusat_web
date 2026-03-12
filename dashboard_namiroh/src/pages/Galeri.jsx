import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { storageUrl } from '../api/storage'

const VIDEOS = [
  { videoId: 'EkZOn4fLoF0', judul: '#EPS 1 Kenal Lebih Dekat dengan An Namiroh Travelindo', durasi: '04:07' },
  { videoId: 'IAer8rGX-HA', judul: '#EPS 2 Kenal Lebih Dekat dengan An Namiroh Travelindo', durasi: '04:07' },
  { videoId: 'JIpZDcSFA_I', judul: '#EPS 3 Kenal Lebih Dekat dengan An Namiroh Travelindo', durasi: '03:57' },
  { videoId: 'QN_B8kkR7Vc', judul: '#EPS 4 Kenal Lebih Dekat dengan An Namiroh Travelindo', durasi: '01:00' },
  { videoId: '-madLZ8Bp0M', judul: 'An Namiroh Podcast - Dari Nada ke Makna | Kupas Tuntas Lahirnya Mars An Namiroh Travelindo', durasi: '16:26' },
]

const FOTOS = [
  { src: storageUrl('galeri/keberangkatan1.webp'),               alt: 'Pemberangkatan jamaah' },
  { src: storageUrl('galeri/keberangkatan2.webp'),               alt: 'Keberangkatan umroh' },
  { src: storageUrl('galeri/keberangkatan3.webp'),               alt: 'Keberangkatan bersama' },
  { src: storageUrl('galeri/keberangkatan4.webp'),               alt: 'Persiapan keberangkatan' },
  { src: storageUrl('galeri/keberangkatan5.webp'),               alt: 'Jamaah siap berangkat' },
  { src: storageUrl('galeri/keberangkatan6.webp'),               alt: 'Momen keberangkatan' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-1.webp'), alt: 'Galeri jamaah umroh 1' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-2.webp'), alt: 'Galeri jamaah umroh 2' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-3.webp'), alt: 'Galeri jamaah umroh 3' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-4.webp'), alt: 'Galeri jamaah umroh 4' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-5.webp'), alt: 'Galeri jamaah umroh 5' },
  { src: storageUrl('galeri/Galeri-Jamaah-Umroh-An-Namiroh-6.webp'), alt: 'Galeri jamaah umroh 6' },
]

export default function Galeri() {
  const [aktifVideo, setAktifVideo] = useState(0)
  const [lightbox, setLightbox]     = useState(null)

  const prev = () => setLightbox(i => (i - 1 + FOTOS.length) % FOTOS.length)
  const next = () => setLightbox(i => (i + 1) % FOTOS.length)

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

      {/* VIDEO PLAYLIST */}
      <section className="max-w-6xl mx-auto w-full px-4 py-14">
        <h2 className="font-heading text-2xl font-bold text-green-900 mb-6 text-center">An Namiroh in History</h2>
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Player utama */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                key={aktifVideo}
                src={`https://www.youtube.com/embed/${VIDEOS[aktifVideo].videoId}?autoplay=0`}
                title={VIDEOS[aktifVideo].judul}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 font-semibold text-green-900 text-base text-center">{VIDEOS[aktifVideo].judul}</p>
          </div>

          {/* Playlist */}
          <div className="lg:w-72 flex flex-col gap-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Playlist · {VIDEOS.length} Videos
            </div>
            {VIDEOS.map((v, i) => (
              <button
                key={v.videoId}
                onClick={() => setAktifVideo(i)}
                className={`flex gap-3 items-center rounded-xl p-2 text-left transition ${
                  aktifVideo === i
                    ? 'bg-green-900 text-white'
                    : 'bg-white hover:bg-green-50 text-gray-800 border border-gray-100'
                }`}
              >
                <div className="relative flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                    alt={v.judul}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug line-clamp-2">{v.judul}</p>
                  {v.durasi && (
                    <p className={`text-xs mt-1 ${aktifVideo === i ? 'text-green-200' : 'text-gray-400'}`}>{v.durasi}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOTO GALLERY */}
      <section className="max-w-6xl mx-auto w-full px-4 pb-16">
        <h2 className="font-heading text-2xl font-bold text-green-900 mb-2 text-center">Galeri Foto</h2>
        <p className="text-gray-500 text-xl mb-6 text-center">Rasakan bagaimana ceria dan bahagianya para jamaah berangkat ibadah Umroh dan Haji bersama kami</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {FOTOS.map((item, i) => (
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
      </section>

      {/* LIGHTBOX FOTO */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute left-4 text-white text-4xl font-bold px-3 py-1 hover:text-orange-300 transition"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Sebelumnya"
          >&#8249;</button>

          <div className="max-w-4xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
            <img
              src={FOTOS[lightbox].src}
              alt={FOTOS[lightbox].alt}
              className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
            />
            <p className="text-white text-center mt-3 text-sm opacity-80">{FOTOS[lightbox].alt}</p>
          </div>

          <button
            className="absolute right-4 text-white text-4xl font-bold px-3 py-1 hover:text-orange-300 transition"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Selanjutnya"
          >&#8250;</button>

          <button
            className="absolute top-4 right-5 text-white text-3xl font-bold hover:text-orange-300 transition"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >&times;</button>

          <div className="absolute bottom-5 text-white text-sm opacity-60">
            {lightbox + 1} / {FOTOS.length}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}


