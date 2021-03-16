import React from 'react'
import Navbar from '../components/Navbar'

function About() {
  return <>
    <Navbar />
    <div className="container">
      <h2>About Garms</h2>
      <p>This is all about Garms</p>
    </div>
    <div className="container">
      <h2>Created By</h2>
      <p><a href="https://github.com/hannahakhtar">Hannah Akhtar</a>, <a href="https://github.com/ikalff">India</a> & <a href="https://github.com/Jacobaston">Jake</a> for project 4 of <a href="https://generalassemb.ly/">General Assembly’s</a> Software Engeering Immersive.</p>
    </div>
    <div className="container">
      <h2>Technologies</h2>
    </div>
  </>
}


// return <>
// <Navbar />
// <div className="hero is-fullheight-with-navbar">
//   <div className="order-confirmation-div">
//     <div className="order-confirmation-container container pt-5 pb-5 px-4">
//       <p className="order-confirmation">Thank you for your order.</p>
//       <p className="order-confirmation">Check your emails for confirmation and shipping updates.</p>
//       <Link className="button is-primary order-confirmation-button" to={{ pathname: '/search-home' }}>Back to search</Link>
//     </div>
//   </div>
// </div>
// </>
// }

export default About