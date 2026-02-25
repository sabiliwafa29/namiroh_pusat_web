import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function FloatingWidgets() {
  const [paketPromo, setPaketPromo] = useState([])
  const [currentPromo, setCurrentPromo] = useState(0)
  const [bannerVisible, setBannerVisible] = useState(true)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  useEffect(() => {
    api.get('/paket?per_page=5&published=1')
      .then(res => {
        const data = res.data.data || []
        setPaketPromo(data)
      })
      .catch(() => {})
  }, [])

  // Auto-rotate promo every 4s
  useEffect(() => {
    if (paketPromo.length <= 1) return
    const timer = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % paketPromo.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [paketPromo.length])

  // Hide banner after scroll down, show again on scroll up
  useEffect(() => {
    if (bannerDismissed) return
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setBannerVisible(y < lastY || y < 100)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [bannerDismissed])

  const promo = paketPromo[currentPromo]

  return (
    <>
      {/* ── Promo Banner — bottom left ── */}
      {!bannerDismissed && promo && (
        <div className={`fixed bottom-6 left-4 z-50 w-72 transition-all duration-500 ${
          bannerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-700 px-4 py-2 flex items-center justify-between">
              <span className="text-white text-xs font-bold tracking-wide uppercase">🔥 Promo Terbaru</span>
              <div className="flex items-center gap-2">
                {/* Dots */}
                <div className="flex gap-1">
                  {paketPromo.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPromo(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === currentPromo ? 'bg-orange-400 w-3' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="text-white/70 hover:text-white text-lg leading-none ml-1"
                  aria-label="Tutup"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 flex gap-3 items-center">
              {promo.flyer_url ? (
                <img
                  src={promo.flyer_url}
                  alt={promo.nama_paket}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  🕌
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-0.5">{promo.jenis_layanan?.nama}</div>
                <div className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{promo.nama_paket}</div>
                <div className="text-orange-500 font-bold text-sm mt-1">
                  Rp {Number(promo.harga_dasar).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            <div className="px-3 pb-3">
              <Link
                to={`/paket/${promo.id}`}
                className="block text-center bg-green-700 text-white text-xs font-bold py-2 rounded-xl hover:bg-green-800 transition"
              >
                Lihat Detail Paket →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── WhatsApp FAB — bottom right ── */}
      <a
        href="https://wa.me/6282335611999?text=Assalamualaikum, saya ingin info paket umroh An Namiroh"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-4 z-50 group"
        aria-label="Chat WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40 group-hover:opacity-0" />

        <div className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white pl-3 pr-4 py-3 rounded-full shadow-2xl transition-all duration-300 group-hover:shadow-green-400/40">
          {/* WA icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 flex-shrink-0 fill-white">
            <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l8-2c2.2 1.16 4.7 1.83 7.5 1.83 8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.17c-2.57 0-4.97-.69-7.03-1.9l-.5-.29-5.2 1.36 1.39-5.07-.33-.52A12.4 12.4 0 0 1 3.33 16C3.33 9.37 8.87 3.83 16 3.83S28.67 9.37 28.67 16 23.13 28.67 16 28.67zm6.8-9.3c-.37-.19-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63-.22-.01-.47-.01-.72-.01-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
          </svg>
        </div>
      </a>
    </>
  )
}
