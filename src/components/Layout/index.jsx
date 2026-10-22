import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import './index.scss'

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="page">
        <span className="tags top-tags"></span>
        <Outlet />
        <span className="tags bottom-tags">
          <br />
          <span className="bottom-tag-html"></span>
        </span>
      </div>
    </div>
  )
}

export default Layout
