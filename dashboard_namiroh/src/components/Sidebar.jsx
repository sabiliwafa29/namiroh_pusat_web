import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/paket',     icon: '📦', label: 'Paket' },
  { to: '/jadwal',    icon: '📅', label: 'Jadwal' },
  { to: '/jamaah',    icon: '👥', label: 'Jamaah' },
  { to: '/pendaftaran', icon: '📋', label: 'Pendaftaran' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-64 bg-green-900 text-white flex flex-col fixed h-full z-10">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-green-700">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 text-xl font-bold">
          ☪
        </div>
        <div>
          <div className="font-bold text-sm leading-tight">AN NAMIROH</div>
          <div className="text-xs text-green-300">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-green-700 text-white font-medium'
                  : 'text-green-200 hover:bg-green-800'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name || 'Admin'}</div>
            <div className="text-xs text-green-400 capitalize">{user?.role || 'staff'}</div>
          </div>
          <button onClick={logout} className="text-green-400 hover:text-white text-lg" title="Logout">
            ⏻
          </button>
        </div>
      </div>
    </aside>
  )
}
