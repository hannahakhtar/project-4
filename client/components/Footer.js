import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  
  return <footer>

    <div className='container px-4 pt-4 pb-4'>
      <div className='nostackcolumns'>
        <div>
          <Link to={'/about'} className='has-text-white'>About</Link>
        </div>
        <div>
        </div>
        <div className='right'>
          <p className='has-text-white'>© Garms 2021</p>
        </div>
      </div>
    </div>
  </footer>
}

export default Footer