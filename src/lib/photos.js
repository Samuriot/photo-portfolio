// Loads gallery photos straight from the rustfs bucket (S3 API).
// Bucket needs anonymous read + list. Folders are "<location>-<year>",
// e.g. "san-francisco-2025/IMG_0042.jpg" -> "San Francisco" · "2025".

const BASE = (import.meta.env.VITE_PHOTO_BASE_URL || '/bucket').replace(/\/$/, '')
const BUCKET = import.meta.env.VITE_PHOTO_BUCKET || 'photos'
const BUCKET_URL = `${BASE}/${BUCKET}`
const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i

// "san-francisco-2025" / "SanFrancisco-2025" -> { location: "San Francisco", year: "2025" }
export const parseFolder = (folder) => {
  const match = folder.match(/^(.*?)[-_ ]?(\d{4})$/)
  const rawLocation = match ? match[1] : folder
  const location = rawLocation
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
  return { location: location || 'Unsorted', year: match ? match[2] : '' }
}

// ListObjectsV2, following pages until done
async function listKeys() {
  const keys = []
  let token = ''
  do {
    const params = new URLSearchParams({ 'list-type': '2' })
    if (token) params.set('continuation-token', token)
    const res = await fetch(`${BUCKET_URL}?${params}`)
    if (!res.ok) throw new Error(`Bucket list failed (${res.status})`)
    const xml = new DOMParser().parseFromString(await res.text(), 'application/xml')
    xml.querySelectorAll('Contents > Key').forEach((n) => keys.push(n.textContent))
    const truncated = xml.querySelector('IsTruncated')?.textContent === 'true'
    token = truncated ? xml.querySelector('NextContinuationToken')?.textContent || '' : ''
  } while (token)
  return keys
}

let cache
export function fetchPhotos() {
  cache ??= listKeys()
    .then((keys) =>
      keys
        // skip macOS "._" metadata files
        .filter((key) => IMAGE_RE.test(key) && !key.split('/').pop().startsWith('._'))
        .map((key) => {
          const parts = key.split('/')
          const { location, year } = parseFolder(parts.length > 1 ? parts[0] : '')
          return {
            key,
            src: `${BUCKET_URL}/${parts.map(encodeURIComponent).join('/')}`,
            title: location,
            subtitle: year,
            category: year ? `${location} ${year}` : location,
          }
        })
        // newest year first, then by folder/file name
        .sort((a, b) => b.subtitle.localeCompare(a.subtitle) || a.key.localeCompare(b.key))
    )
    .catch((err) => {
      cache = undefined // allow retry on next visit
      throw err
    })
  return cache
}
