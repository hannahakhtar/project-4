import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {



  return <footer>

    <div className='container px-4 pt-4 pb-4'>
      <div className='nostackcolumns'>
        <div>
          <Link to={'/search-home'}><img src='https://i.ibb.co/2ZSffTJ/logo-garms-white.png' alt='Garms logo' className='logo'></img></Link>
        </div>
        <div className='right'>
          <p className='has-text-white'>© Garms 2021</p>
        </div>
      </div>
    </div>
  </footer>
}

export default Footer