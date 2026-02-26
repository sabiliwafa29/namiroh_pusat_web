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
      <aside className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white z-30 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-green-700 flex items-center gap-3">
          <img src="/logo-namiro-putih.png" alt="Namiroh" className="h-9 w-auto" />
          <div>
            <div className="font-heading font-bold text-base leading-tight">An Namiroh</div>
            <div className="text-green-300 text-xs">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                ${isActive(item)
                  ? 'bg-orange-500 text-white'
                  : 'text-green-100 hover:bg-green-800'}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-green-700">
          <div className="text-xs text-green-300 mb-1 truncate">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-300 hover:text-red-200 transition flex items-center gap-2"
          >
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 text-xl">☰</button>
            <h1 className="font-heading text-xl font-bold text-green-900">{title}</h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
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
