import React from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth.js'


const navbarStyle = {
  display: 'inline'
}

function Navbar() {

  const loggedInUserId = getLoggedInUserId()

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <ul className="is-flex is-justify-content-space-around">
      <Link to={'/search-home'}><li style={navbarStyle}>Search</li></Link>
      <Link to={'/productform'}><li style={navbarStyle}>List</li></Link>
      <Link to={`/users/${loggedInUserId}`}><li style={navbarStyle}>Profile</li></Link>
    </ul>
  </nav>
}

export default Navbar