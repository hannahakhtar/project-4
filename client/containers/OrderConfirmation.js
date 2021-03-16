import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function OrderConfirmation() {

  return <>
    <Navbar />
    <div className="hero is-fullheight-with-navbar">
      <div className="order-confirmation-div">
        <div className="order-confirmation-container container pt-5 pb-5 px-4">
          <p className="order-confirmation">Thank you for your order.</p>
          <p className="order-confirmation">Check your emails for confirmation and shipping updates.</p>
          <Link className="button is-primary order-confirmation-button" to={{ pathname: '/search-home' }}>Back to search</Link>
        </div>
      </div>
    </div>
  </>
}

export default OrderConfirmation