import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/axios'

const steps = ['Data Paket', 'Data Diri', 'Konfirmasi']

const emptyForm = {
  // Step 1
  paket_id: '',
  jadwal_id: '',
  tipe_kamar: 'QUAD',
  // Step 2
  nama_lengkap: '',
  nama_latin: '',
  jenis_kelamin: 'L',
  tempat_lahir: '',
  tanggal_lahir: '',
  no_hp: '',
  email: '',
  alamat_jalan: '',
  no_paspor: '',
  paspor_berlaku_sd: '',
  nama_kontak_darurat: '',
  hp_kontak_darurat: '',
  hubungan_darurat: '',
}

export default function Daftar() {
  const [searchParams] = useSearchParams()
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState({
    ...emptyForm,
    paket_id:  searchParams.get('paket_id')  || '',
    jadwal_id: searchParams.get('jadwal_id') || '',
  })
  const [paketList, setPaketList] = useState([])
  const [jadwalList, setJadwalList] = useState([])
  const [paketDetail, setPaketDetail] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [nomorReg, setNomorReg] = useState('')

  useEffect(() => {
    api.get('/paket?per_page=100&published=1')
      .then(res => setPaketList(res.data.data || []))
  }, [])

  useEffect(() => {
    if (form.paket_id) {
      setPaketDetail(null)
      setJadwalList([])
      api.get(`/paket/${form.paket_id}`)
        .then(res => {
          const detail = res.data.data
          setPaketDetail(detail)
          const jadwal = detail?.jadwal?.filter(j => j.status === 'OPEN') || []
          setJadwalList(jadwal)
          // Reset jadwal_id jika jadwal berubah
          setForm(prev => ({ ...prev, jadwal_id: '' }))
        })
        .catch(err => {
          console.error('Gagal memuat detail paket:', err)
          setError('Gagal memuat data jadwal. Silakan coba lagi.')
        })
    } else {
      setPaketDetail(null)
      setJadwalList([])
    }
  }, [form.paket_id])

  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const validateStep = () => {
    if (step === 0) {
      if (!form.paket_id) return 'Pilih paket terlebih dahulu'
      if (!form.jadwal_id) return 'Pilih jadwal keberangkatan'
    }
    if (step === 1) {
      if (!form.nama_lengkap) return 'Nama lengkap wajib diisi'
      if (!form.no_hp) return 'Nomor HP wajib diisi'
      if (!form.jenis_kelamin) return 'Jenis kelamin wajib diisi'
    }
    return ''
  }

  const nextStep = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const hargaPaket = paketDetail?.harga?.find(h => h.tipe_kamar === form.tipe_kamar)
      const harga = hargaPaket?.harga || paketDetail?.harga_dasar || 0

      const res = await api.post('/daftar', {
        // Data jadwal
        jadwal_id:           form.jadwal_id,
        tipe_kamar:          form.tipe_kamar,
        harga_disepakati:    harga,
        // Data jamaah
        nama_lengkap:        form.nama_lengkap,
        nama_latin:          form.nama_latin || undefined,
        jenis_kelamin:       form.jenis_kelamin,
        tempat_lahir:        form.tempat_lahir || undefined,
        tanggal_lahir:       form.tanggal_lahir || undefined,
        no_hp:               form.no_hp,
        email:               form.email || undefined,
        alamat_jalan:        form.alamat_jalan || undefined,
        no_paspor:           form.no_paspor || undefined,
        paspor_berlaku_sd:   form.paspor_berlaku_sd || undefined,
        nama_kontak_darurat: form.nama_kontak_darurat || undefined,
        hp_kontak_darurat:   form.hp_kontak_darurat || undefined,
        hubungan_darurat:    form.hubungan_darurat || undefined,
      })

      setNomorReg(res.data.data.nomor_registrasi)
      setSuccess(true)
    } catch (err) {
      const errors = err.response?.data?.meta?.errors
      setError(errors ? Object.values(errors).flat().join(', ') : err.response?.data?.meta?.message || 'Terjadi kesalahan, coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (success) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-md w-full">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-green-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 text-base mb-4">Nomor registrasi Anda:</p>
          <div className="bg-green-50 border border-green-200 rounded-xl py-3 px-4 font-mono font-bold text-green-800 text-lg mb-4">
            {nomorReg}
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Simpan nomor registrasi ini. Tim kami akan menghubungi Anda dalam 1×24 jam untuk konfirmasi dan informasi pembayaran DP.
          </p>
          <a href={`https://wa.me/6285728945777?text=Assalamualaikum, saya baru mendaftar umroh dengan nomor registrasi ${nomorReg}`}
            target="_blank" rel="noreferrer"
            className="block bg-green-700 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-green-800 transition mb-3">
            💬 Konfirmasi via WhatsApp
          </a>
          <Link to="/" className="text-green-700 text-base font-medium hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-green-900 text-white py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Formulir Pendaftaran Umroh</h1>
          <p className="text-green-100 text-base">Isi data dengan lengkap dan benar</p>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  i <= step ? 'bg-yellow-400 text-green-900' : 'bg-green-700 text-green-200'
                }`}>{i + 1}</div>
                <span className={`text-sm hidden sm:block ${i <= step ? 'text-yellow-400' : 'text-green-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-10 h-px ${i < step ? 'bg-yellow-400' : 'bg-green-700'}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-base font-medium">{error}</div>
            )}

            {/* STEP 0 — Data Paket */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-800 text-xl mb-5">Pilih Paket & Jadwal</h2>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">Pilih Paket *</label>
                  <select value={form.paket_id} onChange={e => f('paket_id', e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">-- Pilih Paket --</option>
                    {paketList.map(p => <option key={p.id} value={p.id}>{p.nama_paket} — Rp {Number(p.harga_dasar).toLocaleString('id-ID')}</option>)}
                  </select>
                </div>

                {jadwalList.length > 0 && (
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-1">Pilih Jadwal *</label>
                    <div className="space-y-2">
                      {jadwalList.map(j => (
                        <label key={j.id} className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition ${
                          form.jadwal_id == j.id ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'
                        }`}>
                          <div className="flex items-center gap-3">
                            <input type="radio" name="jadwal" value={j.id}
                              checked={form.jadwal_id == j.id}
                              onChange={e => f('jadwal_id', e.target.value)}
                              className="accent-green-700" />
                            <div>
                              <div className="text-base font-semibold">
                                {new Date(j.tanggal_berangkat).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}
                              </div>
                              <div className="text-sm text-gray-600">{j.maskapai?.nama} · {j.kota_keberangkatan}</div>
                            </div>
                          </div>
                          <div className="text-right">
                              <div className="text-sm text-gray-600">Sisa</div>
                              <div className="font-bold text-green-700 text-base">{j.kuota_total - j.kuota_terisi} seat</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {form.paket_id && jadwalList.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl text-sm">
                    Tidak ada jadwal tersedia untuk paket ini saat ini.
                  </div>
                )}

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">Tipe Kamar</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['QUAD','TRIPLE','DOUBLE','SINGLE'].map(t => {
                      const h = paketDetail?.harga?.find(h => h.tipe_kamar === t)
                      return (
                        <label key={t} className={`border rounded-xl p-3 text-center cursor-pointer transition ${
                          form.tipe_kamar === t ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'
                        }`}>
                          <input type="radio" name="tipe" value={t} checked={form.tipe_kamar === t}
                            onChange={e => f('tipe_kamar', e.target.value)} className="hidden" />
                          <div className="text-sm font-bold text-gray-700">{t}</div>
                          {h && <div className="text-sm text-green-700 font-medium mt-0.5">Rp {Number(h.harga).toLocaleString('id-ID')}</div>}
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 — Data Diri */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-800 text-xl mb-5">Data Diri Calon Jamaah</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-base font-medium text-gray-800 mb-1">Nama Lengkap *</label>
                    <input value={form.nama_lengkap} onChange={e => f('nama_lengkap', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Sesuai KTP" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-base font-medium text-gray-800 mb-1">Nama Latin (sesuai paspor)</label>
                    <input value={form.nama_latin} onChange={e => f('nama_latin', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="NAMA SESUAI PASPOR (huruf kapital)" />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">Jenis Kelamin *</label>
                    <select value={form.jenis_kelamin} onChange={e => f('jenis_kelamin', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">Tanggal Lahir</label>
                    <input type="date" value={form.tanggal_lahir} onChange={e => f('tanggal_lahir', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">No. HP / WhatsApp *</label>
                    <input value={form.no_hp} onChange={e => f('no_hp', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="628xxxxxxxxx" />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => f('email', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">No. Paspor</label>
                    <input value={form.no_paspor} onChange={e => f('no_paspor', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-1">Paspor Berlaku s/d</label>
                    <input type="date" value={form.paspor_berlaku_sd} onChange={e => f('paspor_berlaku_sd', e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Kontak Darurat</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input value={form.nama_kontak_darurat} onChange={e => f('nama_kontak_darurat', e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                      <input value={form.hp_kontak_darurat} onChange={e => f('hp_kontak_darurat', e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hubungan</label>
                      <input value={form.hubungan_darurat} onChange={e => f('hubungan_darurat', e.target.value)}
                        placeholder="Suami / Anak / dll"
                        className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Konfirmasi */}
            {step === 2 && (
              <div>
                <h2 className="font-semibold text-gray-800 text-xl mb-5">Konfirmasi Pendaftaran</h2>

                <div className="bg-green-50 rounded-xl p-5 mb-4 space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Paket</span>
                    <span className="font-semibold text-gray-800">{paketDetail?.nama_paket}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Jadwal</span>
                    <span className="font-semibold text-gray-800">
                      {jadwalList.find(j => j.id == form.jadwal_id) &&
                        new Date(jadwalList.find(j => j.id == form.jadwal_id).tanggal_berangkat).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tipe Kamar</span>
                    <span className="font-semibold text-gray-800">{form.tipe_kamar}</span>
                  </div>
                  <div className="flex justify-between text-base border-t pt-2">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-semibold text-gray-800">{form.nama_lengkap}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">No. HP</span>
                    <span className="font-semibold text-gray-800">{form.no_hp}</span>
                  </div>
                  {form.no_paspor && (
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">No. Paspor</span>
                      <span className="font-semibold text-gray-800">{form.no_paspor}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base border-t pt-2">
                    <span className="text-gray-700 font-semibold">Total Harga</span>
                    <span className="font-bold text-green-800 text-xl">
                      Rp {Number(paketDetail?.harga?.find(h => h.tipe_kamar === form.tipe_kamar)?.harga || paketDetail?.harga_dasar || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                  <strong>Catatan:</strong> Setelah mendaftar, tim kami akan menghubungi Anda dalam 1×24 jam untuk konfirmasi dan informasi pembayaran DP.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button onClick={() => { setStep(s => s - 1); setError('') }}
                  className="px-6 py-3.5 border rounded-xl text-base font-medium hover:bg-gray-50 transition">
                  ← Kembali
                </button>
              )}
              {step < 2 ? (
                <button onClick={nextStep}
                  className="flex-1 bg-green-700 text-white py-3.5 rounded-xl text-base font-semibold hover:bg-green-800 transition">
                  Lanjut →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-green-700 text-white py-3.5 rounded-xl text-base font-bold hover:bg-green-800 transition disabled:opacity-60">
                  {loading ? 'Mendaftarkan...' : '✅ Kirim Pendaftaran'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
