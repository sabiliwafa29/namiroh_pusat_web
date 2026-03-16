import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Setup PDF.js worker via CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// Dev: selalu pakai path relatif (/storage) → Vite proxy intercept → no CORS
// Prod: pakai VITE_STORAGE_URL (full URL ke production server)
const STORAGE_BASE = import.meta.env.DEV
  ? '/storage'
  : (import.meta.env.VITE_STORAGE_URL || 'https://api.annamirohtravelindo.com/storage')
const PDF_URL    = `${STORAGE_BASE}/Company-Profile-An-Namiroh.pdf`
const PDF_DL_URL = `${PDF_URL}?v=${Date.now()}`

// ─── PDF Viewer Component ────────────────────────────────────────────────────
function PdfViewer() {
  const [pdfData, setPdfData]       = useState(null)   // ArrayBuffer dari fetch
  const [numPages, setNumPages]     = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(false)
  const [width, setWidth]           = useState(null)

  const fetchedRef = useRef(false)

  // Fetch PDF sebagai Uint8Array di main thread (lewat Vite proxy → no CORS)
  // Simpan sebagai Uint8Array bukan ArrayBuffer agar tidak di-transfer/detach oleh PDF.js Worker
  useEffect(() => {
    if (fetchedRef.current) return   // cegah double-fetch di React StrictMode
    fetchedRef.current = true
    setLoading(true)
    fetch(PDF_DL_URL)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed')
        return res.arrayBuffer()
      })
      .then(buffer => {
        setPdfData(new Uint8Array(buffer))  // Uint8Array tidak bisa di-detach
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  const onDocumentLoadSuccess = useCallback(({ numPages }) => setNumPages(numPages), [])
  const onDocumentLoadError   = useCallback(() => setError(true), [])

  // Memoize file prop agar Document tidak reload saat re-render
  const pdfFile = useMemo(() => pdfData ? { data: pdfData } : null, [pdfData])

  // Ukur lebar kontainer agar PDF fit lebar layar
  const measureRef = useCallback(node => {
    if (!node) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries)
        setWidth(Math.floor(entry.contentRect.width))
    })
    ro.observe(node)
    setWidth(Math.floor(node.getBoundingClientRect().width))
  }, [])

  const handleWheel = useCallback((e) => {
    if (!numPages) return
    if (e.deltaY < 0) {
      // Scroll up - halaman sebelumnya
      setPageNumber(p => Math.max(1, p - 1))
    } else {
      // Scroll down - halaman berikutnya
      setPageNumber(p => Math.min(numPages, p + 1))
    }
    e.preventDefault()
  }, [numPages])

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-green-100 bg-white">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-green-900 border-b border-green-800 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-orange-400 text-lg flex-shrink-0">📄</span>
          <span className="text-white font-semibold text-sm truncate">Company Profile An Namiroh Travelindo</span>
        </div>
        <a
          href={PDF_URL}
          download="Company-Profile-An-Namiroh.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          <span>⬇</span>
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* ── PDF Canvas Area ── */}
      <div 
        ref={measureRef} 
        className="bg-gray-100 flex flex-col items-center"
        onWheel={handleWheel}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Memuat Company Profile…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
            <span className="text-4xl">📄</span>
            <p className="text-gray-600 text-sm">Gagal memuat PDF. Silakan download atau buka di tab baru.</p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-800 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
            >
              Buka PDF ↗
            </a>
          </div>
        )}

        {!error && pdfFile && width && (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
          >
            <Page
              pageNumber={pageNumber}
              width={width}
              renderAnnotationLayer={true}
              renderTextLayer={false}
            />
          </Document>
        )}
      </div>

      {/* ── Navigasi Halaman (Scroll Info) ── */}
      {numPages && (
        <div className="flex items-center justify-center px-4 py-3 bg-green-50 border-t border-green-100">
          <div className="text-sm text-gray-600 font-medium">
            Halaman <span className="text-green-700 font-bold">{pageNumber}</span> dari <span className="text-green-700 font-bold">{numPages}</span> 
            <span className="text-gray-500 ml-3 text-xs">(Scroll untuk navigasi)</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
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
            <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/TB1qIon-ZSQ"
                title="An Namiroh Travelindo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-orange-400 text-2xl mb-1 text-center">✦</div>
              <h2 className="font-heading text-3xl font-bold text-green-900 mb-4 text-center">Tentang An Namiroh Travelindo</h2>
              <div className="h-1 w-16 bg-orange-400 rounded mb-5 mx-auto" />
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
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE PDF */}
      <section className="px-4 bg-gray-50">
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

          <PdfViewer />
        </div>
      </section>

      <Footer />
    </div>
  )
}
