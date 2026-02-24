import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/',       label: 'Beranda' },
    { to: '/paket',  label: 'Paket' },
    { to: '/galeri', label: 'Galeri' },
    { to: '/daftar', label: 'Daftar Sekarang' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <img
              src="/logo-namiroh.webp"
              alt="An Namiroh Travelindo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              l.to === '/daftar' ? (
                <Link key={l.to} to={l.to}
                  className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-green-800 transition">
                  {l.label}
                </Link>
              ) : (
                <Link key={l.to} to={l.to}
                  className={`text-base font-medium transition ${pathname === l.to ? 'text-green-700' : 'text-gray-600 hover:text-green-700'}`}>
                  {l.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-600 text-2xl">
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t py-3 space-y-2 pb-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`block px-3 py-3 text-base rounded-lg ${
                  l.to === '/daftar'
                    ? 'bg-green-700 text-white font-semibold text-center'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
