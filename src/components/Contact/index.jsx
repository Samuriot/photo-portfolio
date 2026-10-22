import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const emailAddress = 'jomi.g.ruiz@gmail.com'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container contact-page">
        <div className="contact-content panel">
          <p className="kicker">Let&apos;s talk</p>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={'Say hello'.split('')} idx={15} />
          </h1>
          <p>
            Want to shoot together, ask about a photo, or just talk cameras? Send me a note — I&apos;d
            love to hear from you.
          </p>

          <div className="contact-links">
            <a className="flat-button" href={`mailto:${emailAddress}`}>
              EMAIL
            </a>
            <a className="flat-button secondary" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
