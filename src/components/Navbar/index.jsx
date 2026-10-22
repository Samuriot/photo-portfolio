import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faImages, faUser } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import './index.scss'

const links = [
  { to: '/', icon: faHome, label: 'Home', end: true },
  { to: '/gallery', icon: faImages, label: 'Gallery' },
  { to: '/about', icon: faUser, label: 'About' },
]

// Swap these for your photography socials
const socials = [
  { href: 'https://www.instagram.com/pics.by.jomi/', icon: faInstagram, label: 'Instagram' },
]

const Navbar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <span className="logo-text">Jomi Ruiz</span>
    </Link>

    <nav>
      {links.map(({ to, icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          aria-label={label}
          title={label}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <FontAwesomeIcon icon={icon} />
        </NavLink>
      ))}
    </nav>

    <ul className="social-links">
      {socials.map(({ href, icon, label }) => (
        <li key={label}>
          <a target="_blank" rel="noreferrer" href={href} aria-label={label} title={label}>
            <FontAwesomeIcon icon={icon} />
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default Navbar
