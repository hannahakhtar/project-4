import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function OrderConfirmation() {
  
  return <>
  <Navbar />
  <p>Thank you for your order!</p>
  <Link className="button is-primary" to={{ pathname: '/search-home' }}>Back to search</Link>
  </>
}

export default OrderConfirmation