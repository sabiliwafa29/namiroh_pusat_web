const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'http://127.0.0.1:8000/storage'

/**
 * Membuat URL lengkap ke file di backend storage.
 * @param {string} path - Path relatif, contoh: 'galeri/foto.webp' atau '/galeri/foto.webp'
 * @returns {string} URL lengkap
 */
export const storageUrl = (path) => `${STORAGE_URL}/${path.replace(/^\//, '')}`

export default STORAGE_URL
