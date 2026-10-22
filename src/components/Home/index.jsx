import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import PhotoFrame from '../Gallery/PhotoFrame'
import usePhotos from '../../lib/usePhotos'
import './index.scss'

const emailAddress = 'jomi.g.ruiz@gmail.com'
const instagramUrl = 'https://www.instagram.com/pics.by.jomi/'

// Gradient placeholder until the bucket responds
const placeholder = { title: 'Golden hour', subtitle: '' }

const Home = () => {
  const { photos } = usePhotos()
  const featured = photos[0] || placeholder
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="home-content">
          <div className="intro-block">
            <p className="kicker">Photos In My Free Time</p>
            <h1>
              <span className="sunset-text">
                <AnimatedLetters letterClass={letterClass} strArray={'pics.by.jomi'.split('')} idx={17} />
              </span>
            </h1>
            <p className="summary">
              A memoir to all my experiences, memories, and trips, captured through the lens of my camera.
            </p>
            <div className="actions">
              <Link to="/gallery" className="flat-button">VIEW GALLERY</Link>
            </div>
            <p className="contact-line">
              Want to shoot together or book portraits? DM{' '}
              <a href={instagramUrl} target="_blank" rel="noreferrer">@pics.by.jomi</a>.
            </p>
          </div>

          <aside className="featured-panel panel">
              <div className="featured-image">
                <PhotoFrame photo={featured} index={0} />
              </div>
              <div className="featured-meta">
                <span className="featured-title">{featured.title}</span>
                <span className="featured-location">{featured.subtitle}</span>
              </div>
            </aside>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
