import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { storageUrl } from '../api/storage'

const PROMO_LIST = [
  { id: 1, label: 'Umroh Best Seller', desc: 'Mulai Rp 23.000.000', img: storageUrl('banner/umroh-gus-ferry.webp') },
  { id: 2, label: 'Umroh Spesial Ramadhan', desc: 'Mulai Rp 34.000.000', img: storageUrl('banner/umroh-spesial-ramadhan.webp') },
  { id: 3, label: 'Program Badal Umroh dan Haji', desc: 'Mulai Rp 3.000.000', img: storageUrl('banner/program-badal.webp') },
  { id: 4, label: 'Umroh Hanya 500rb', desc: 'Seat Terbatas!', img: storageUrl('banner/haji_500rb.webp') },
]

export default function FloatingWidgets() {
  const { pathname } = useLocation()
  const [currentPromo, setCurrentPromo] = useState(0)
  // Banner hanya muncul setelah delay 4 detik & tidak muncul lagi jika sudah di-dismiss dalam sesi ini
  const [bannerVisible, setBannerVisible] = useState(false)

  // Jangan render apapun di halaman admin
  if (pathname.startsWith('/admin')) return null

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promoBannerDismissed')
    if (dismissed) return
    // Delay 4 detik agar tidak tabrakan dengan modal promo di Home
    const timer = setTimeout(() => setBannerVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setBannerVisible(false)
    sessionStorage.setItem('promoBannerDismissed', '1')
  }

  // Auto-rotate promo setiap 4 detik
  useEffect(() => {
    if (PROMO_LIST.length <= 1) return
    const timer = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % PROMO_LIST.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ── Promo Banner — kiri bawah, muncul setelah 4 detik ── */}
      {bannerVisible && (
        <div className="fixed bottom-2 left-2 z-50 w-48 sm:w-32 landscape:w-48">
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-700 px-2 py-1 flex items-center justify-between">
              <span className="text-white text-[10px] font-bold tracking-wide uppercase">🔥 Promo Terbaru</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {PROMO_LIST.map((_, i) => (
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
                  onClick={handleDismiss}
                  className="text-white/70 hover:text-white text-lg leading-none ml-1"
                  aria-label="Tutup banner promo"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Konten promo aktif */}
            <div className="px-2 py-1.5 flex items-center gap-2">
              <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden border-2 border-orange-300 bg-gray-100">
                {PROMO_LIST[currentPromo].img
                  ? <img src={PROMO_LIST[currentPromo].img} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">🕌</div>
                }
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-800 text-[11px] leading-tight line-clamp-2">
                  {PROMO_LIST[currentPromo].label}
                </div>
                <div className="text-orange-500 font-bold text-[10px] mt-0.5">
                  {PROMO_LIST[currentPromo].desc}
                </div>
              </div>
            </div>

            <div className="px-1.5 pb-1.5">
              <a
                href={`https://wa.me/6285711755881?text=Assalamualaikum, saya ingin info promo: ${encodeURIComponent(PROMO_LIST[currentPromo].label)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-1 rounded-lg transition"
              >
                <svg viewBox="0 0 32 32" className="w-3 h-3 fill-white flex-shrink-0">
                  <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l8-2c2.2 1.16 4.7 1.83 7.5 1.83 8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.17c-2.57 0-4.97-.69-7.03-1.9l-.5-.29-5.2 1.36 1.39-5.07-.33-.52A12.4 12.4 0 0 1 3.33 16C3.33 9.37 8.87 3.83 16 3.83S28.67 9.37 28.67 16 23.13 28.67 16 28.67zm6.8-9.3c-.37-.19-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63-.22-.01-.47-.01-.72-.01-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
                </svg>
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── WhatsApp FAB — kanan bawah ── */}
      <a
        href="https://wa.me/6285711755881?text=Assalamualaikum, saya ingin info paket umroh An Namiroh"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 group landscape:bottom-2 landscape:right-2"
        aria-label="Chat WhatsApp Admin"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40 group-hover:opacity-0" />
        <div className="relative flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 landscape:px-3 landscape:py-2 rounded-full shadow-2xl transition-all duration-300 group-hover:shadow-green-400/40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 landscape:w-5 landscape:h-5 flex-shrink-0 fill-white">
            <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l8-2c2.2 1.16 4.7 1.83 7.5 1.83 8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.17c-2.57 0-4.97-.69-7.03-1.9l-.5-.29-5.2 1.36 1.39-5.07-.33-.52A12.4 12.4 0 0 1 3.33 16C3.33 9.37 8.87 3.83 16 3.83S28.67 9.37 28.67 16 23.13 28.67 16 28.67zm6.8-9.3c-.37-.19-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63-.22-.01-.47-.01-.72-.01-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
          </svg>
          <span className="text-sm landscape:text-xs font-bold leading-tight">Chat<br/>Admin</span>
        </div>
      </a>
    </>
  )
}
