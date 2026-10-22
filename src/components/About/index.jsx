import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSun, faMountainSun, faPersonWalking } from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

// Replace public/photos/headshot.jpg with your own photo (portrait orientation looks best)
const headshot = {
  src: '/photos/headshot.jpg',
  caption: "swag o7",
}

// Edit these to match your setup
const gear = [
  { label: 'Bodies', value: 'Sony A7II & A6100' },
  { label: 'Everyday lens', value: 'e.g. 35mm f/1.8' },
  { label: 'Other Lens I carry around', value: 'e.g. 24-70mm f/2.8 & 11mm f/1.8' },
  { label: 'Editing', value: 'Lightroom, Davinci Resolve' },
]

const interests = [
  { icon: faSun, label: 'Sunset Shots' },
  { icon: faMountainSun, label: 'Landscapes' },
  { icon: faPersonWalking, label: 'Street Photography' },
  { icon: faCamera, label: 'Portraits' },
]

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="about-shell">
          <section className="about-main panel">
            <figure className="headshot">
              <div className="headshot-image">
                <img src={headshot.src} alt="Portrait of Jomi Ruiz" />
              </div>
              <figcaption>{headshot.caption}</figcaption>
            </figure>

            <p className="kicker">Behind the lens</p>
            <h1>
              <AnimatedLetters letterClass={letterClass} strArray={'About me'.split('')} idx={15} />
            </h1>
            <p>
              I&apos;m Jomi — a photographer based out of the Bay Area. I am a SWE in my day job but enjoy the
              creative freedom photography provides.
            </p>
            <p>
              Most of my work involves street photography, capturing natural, everyday moments. Whether that is 
              a subway stop, crosswalk panning, or candid shots of events!
            </p>
            <p>
              I also can shoot portraits! Please reach out if ya ever want to book! Doing it for the love of the game rn.
            </p>

            <ul className="interest-list">
              {interests.map(({ icon, label }) => (
                <li key={label}>
                  <FontAwesomeIcon icon={icon} />
                  {label}
                </li>
              ))}
            </ul>
          </section>

          <aside className="gear-panel panel">
            <p className="kicker">In the bag</p>
            <dl>
              {gear.map(({ label, value }) => (
                <div key={label} className="gear-row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
