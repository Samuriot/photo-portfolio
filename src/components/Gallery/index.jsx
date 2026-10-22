import { useEffect, useMemo, useState } from 'react'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import PhotoFrame from './PhotoFrame'
import usePhotos from '../../lib/usePhotos'
import './index.scss'

const Gallery = () => {
  const { photos, loading, error } = usePhotos()
  const [letterClass, setLetterClass] = useState('text-animate')
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(photos.map((p) => p.category))], [photos])
  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos]
  )

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard controls for the enlarged view
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % visible.length)
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + visible.length) % visible.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, visible.length])

  const step = (dir) => (e) => {
    e.stopPropagation()
    setOpenIndex((i) => (i + dir + visible.length) % visible.length)
  }

  const active = openIndex !== null ? visible[openIndex] : null

  return (
    <>
      <div className="container gallery-page">
        <header className="gallery-header">
          <p className="kicker">Selected work</p>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={'Gallery'.split('')} idx={15} />
          </h1>

          {categories.length > 1 && (
            <div className="filters" role="group" aria-label="Filter by trip">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip${filter === cat ? ' is-active' : ''}`}
                  onClick={() => {
                    setFilter(cat)
                    setOpenIndex(null)
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </header>

        {loading && <p className="gallery-status">Loading photos…</p>}
        {error && (
          <p className="gallery-status">
            Couldn&apos;t load photos from the bucket ({error.message}). Check that rustfs is running
            and the bucket allows public read.
          </p>
        )}

        <div className="photo-grid">
          {visible.map((photo, idx) => (
            <button
              type="button"
              className="photo-card"
              key={photo.key}
              onClick={() => setOpenIndex(idx)}
            >
              <PhotoFrame photo={photo} index={idx} />
              <div className="photo-caption">
                <h3>{photo.title}</h3>
                <span>{photo.subtitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpenIndex(null)}>
          <button className="lightbox-close" aria-label="Close" onClick={() => setOpenIndex(null)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button className="lightbox-nav prev" aria-label="Previous photo" onClick={step(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <figure onClick={(e) => e.stopPropagation()}>
            <PhotoFrame photo={active} index={openIndex} className="lightbox-image" />
            <figcaption>
              <strong>{active.title}</strong>
              <span>{active.subtitle}</span>
            </figcaption>
          </figure>

          <button className="lightbox-nav next" aria-label="Next photo" onClick={step(1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      <Loader type="pacman" />
    </>
  )
}

export default Gallery
