import React from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth.js'


const navbarStyle = {
  display: 'inline',
  paddingTop: '12px'
}

const backgroundNav = {
  backgroundColor: '#ededed'
}

function Navbar() {

  const loggedInUserId = getLoggedInUserId()

  return <nav className="navbar" role="navigation" aria-label="main navigation" style={backgroundNav}>
    <ul className="is-flex is-justify-content-space-around" style={navbarStyle}>
      <Link to={'/search-home'}><li style={navbarStyle}><strong>Search</strong></li></Link>
      <Link to={'/productform'}><li style={navbarStyle}><strong>List</strong></li></Link>
      <Link to={`/users/${loggedInUserId}`}><li style={navbarStyle}><strong>Profile</strong></li></Link>
    </ul>
  </nav>
}

export default Navbar