import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white bg-islamic-pattern">
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
            <h3 className="font-heading text-xl font-semibold mb-4">Layanan</h3>
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
            <h3 className="font-heading text-xl font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-base text-green-200">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Jl. Gajah Mada No.10/03, Menanggal, Kec. Mojosari, Kabupaten Mojokerto, Jawa Timur 61382</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
                <a href="https://wa.me/6285711755881" className="hover:text-white transition">0857-1175-5881</a>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
                <a href="https://wa.me/6282141932722" className="hover:text-white transition">0821-4193-2722</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>admin@annamirohtravelindo.com</span>
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
