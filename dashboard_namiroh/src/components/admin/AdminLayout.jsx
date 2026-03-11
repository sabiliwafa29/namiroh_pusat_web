import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin',             icon: '🏠', label: 'Dashboard',    exact: true },
  { to: '/admin/pendaftaran', icon: '📋', label: 'Pendaftaran' },
  { to: '/admin/paket',       icon: '🕌', label: 'Paket Umroh' },
  { to: '/admin/jamaah',      icon: '👥', label: 'Data Jamaah' },
]

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const isActive = (item) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-green-900 text-white z-30 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-green-700 flex items-center gap-3">
          <img src="/logo-namiro-putih.png" alt="Namiroh" className="h-11 w-auto" />
          {/* <div>
            <div className="font-heading font-bold text-lg leading-tight">An Namiroh</div>
            <div className="text-green-300 text-sm">Panel Admin</div>
          </div> */}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-semibold transition
                ${isActive(item)
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-green-100 hover:bg-green-800'}`}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-green-700 mt-2">
            <a href="/" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-semibold text-green-200 hover:bg-green-800 transition">
              <span className="text-2xl">🌐</span>
              Lihat Website
            </a>
          </div>
        </nav>

        {/* User footer */}
        <div className="px-5 py-5 border-t border-green-700">
          <div className="text-sm text-green-300 mb-0.5 truncate">Masuk sebagai:</div>
          <div className="text-base text-white font-medium truncate mb-3">{user?.name || user?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-200 hover:text-white py-2.5 rounded-lg text-base font-semibold transition"
          >
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 h-18 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden bg-gray-100 hover:bg-gray-200 text-gray-600 text-2xl w-11 h-11 rounded-lg flex items-center justify-center"
            >
              ☰
            </button>
            <h1 className="font-heading text-2xl font-bold text-green-900">{title}</h1>
          </div>
          <div className="text-base text-gray-600 hidden sm:block font-medium">
            👤 {user?.name || user?.email}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
