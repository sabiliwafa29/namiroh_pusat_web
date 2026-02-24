import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Paket from './pages/Paket'
import PaketDetail from './pages/PaketDetail'
import Daftar from './pages/Daftar'
import Galeri from './pages/Galeri'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/paket"      element={<Paket />} />
        <Route path="/paket/:id"  element={<PaketDetail />} />
        <Route path="/daftar"     element={<Daftar />} />
        <Route path="/galeri"     element={<Galeri />} />
      </Routes>
    </BrowserRouter>
  )
}
