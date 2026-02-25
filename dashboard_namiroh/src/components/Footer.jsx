import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/logo-namiro-putih.png"
                alt="An Namiroh Travelindo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-base text-green-200 leading-relaxed">
              Melayani perjalanan Umrah & Haji dengan penuh amanah sejak lebih dari 24 tahun. Lebih dari 60.000+ jamaah telah mempercayakan ibadahnya bersama kami.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2 text-base text-green-200">
              <li><Link to="/paket" className="hover:text-white transition">Paket Umroh Reguler</Link></li>
              <li><Link to="/paket" className="hover:text-white transition">Paket Umroh VIP</Link></li>
              <li><Link to="/paket" className="hover:text-white transition">Haji Plus</Link></li>
              <li><Link to="/paket" className="hover:text-white transition">Badal Umroh & Haji</Link></li>
              <li><Link to="/paket" className="hover:text-white transition">Halal Tour</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3 text-base text-green-200">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Jl. Gajah Mada No.10/03, Mojokerto, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="https://wa.me/6282335611999" className="hover:text-white transition">0823-3561-1999</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>info@namiroh.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Senin–Sabtu: 09.00–17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

          <div className="border-t border-green-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-green-200">
          <span>© 2026 PT An Namiroh Travelindo. All rights reserved.</span>
          <span>PPIU 949/2019 · PIHK 151/2021 · KBIH 611/2014</span>
        </div>
      </div>
    </footer>
  )
}
