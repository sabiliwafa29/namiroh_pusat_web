import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/',       label: 'Beranda' },
    { to: '/paket',  label: 'Paket' },
    { to: '/galeri', label: 'Galeri' },
    { to: '/daftar', label: 'Daftar Sekarang' },
  ]

  const linkClass = (to) => {
    if (to === '/daftar') {
      return scrolled
        ? 'bg-green-700 text-white px-5 py-2.5 text-base font-semibold hover:bg-green-800 transition'
        : 'bg-orange-500/90 text-white px-5 py-2.5 text-base font-semibold hover:bg-orange-400 transition'
    }
    const active = pathname === to
    return scrolled
      ? `text-base font-medium transition ${active ? 'text-green-700 font-semibold' : 'text-gray-600 hover:text-green-700'}`
      : `text-base font-medium transition ${active ? 'text-orange-300 font-semibold' : 'text-white/85 hover:text-orange-300'}` 
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center leading-none">
              <img
                src="/logo-namiroh.webp"
                alt="An Namiroh Travelindo"
                className="h-12 w-auto"
              />
              <span className={`font-arabic text-[11px] tracking-wide -mt-0.5 transition-colors duration-300 ${
                scrolled ? 'text-green-700' : 'text-orange-300/80'
              }`}>النَّمِيرَة تِرَافِيل</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className={linkClass(l.to)}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden text-2xl transition-colors duration-300 ${
                scrolled ? 'text-gray-600' : 'text-white'
              }`}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className={`md:hidden border-t py-3 space-y-2 pb-4 ${
              scrolled ? 'border-gray-200' : 'border-white/20 bg-green-900/90 backdrop-blur-md'
            }`}>
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={`block px-3 py-3 text-base rounded-lg ${
                    l.to === '/daftar'
                      ? 'bg-green-700 text-white font-semibold text-center'
                      : scrolled ? 'text-gray-700 hover:bg-gray-50' : 'text-white/90 hover:bg-white/10'
                  }`}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      {/* Spacer so page content sits below the fixed navbar */}
      <div className="h-20" />
    </>
  )
}
