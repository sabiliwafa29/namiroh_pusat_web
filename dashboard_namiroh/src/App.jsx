import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Paket from './pages/Paket'
import PaketDetail from './pages/PaketDetail'
import Daftar from './pages/Daftar'
import Galeri from './pages/Galeri'
import FloatingWidgets from './components/FloatingWidgets'
import ProtectedRoute from './components/ProtectedRoute'

import AdminLogin              from './pages/admin/AdminLogin'
import AdminDashboard          from './pages/admin/AdminDashboard'
import AdminPendaftaran        from './pages/admin/AdminPendaftaran'
import AdminPendaftaranDetail  from './pages/admin/AdminPendaftaranDetail'
import AdminPaket              from './pages/admin/AdminPaket'
import AdminJamaah             from './pages/admin/AdminJamaah'

export default function App() {
  return (
    <BrowserRouter>
      <FloatingWidgets />
      <Routes>
        {/* Public */}
        <Route path="/"           element={<Home />} />
        <Route path="/paket"      element={<Paket />} />
        <Route path="/paket/:id"  element={<PaketDetail />} />
        <Route path="/daftar"     element={<Daftar />} />
        <Route path="/galeri"     element={<Galeri />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/pendaftaran" element={<ProtectedRoute><AdminPendaftaran /></ProtectedRoute>} />
        <Route path="/admin/pendaftaran/:id" element={<ProtectedRoute><AdminPendaftaranDetail /></ProtectedRoute>} />
        <Route path="/admin/paket" element={<ProtectedRoute><AdminPaket /></ProtectedRoute>} />
        <Route path="/admin/jamaah" element={<ProtectedRoute><AdminJamaah /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
