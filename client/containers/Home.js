import React from 'react'
import { Link } from 'react-router-dom'
// import Navbar from './components/Navbar'

function Home() {

  const backgroundStyle = {
    height: '100vh',
    background: 'url(http://papers.co/wallpaper/papers.co-mp61-jeff-sheldon-clothes-hanger-life-dark-4-wallpaper.jpg)',
    backgroundSize: 'auto'
  }

  return <>
    <header>
      <div className="hero is-fullheight-with-navbar is-primary">
        <div className="hero-body" style={backgroundStyle}>
          <div className="container has-text-centered">
            <h1 className="title is-size-1 mb-6">GARMS</h1>
            <div className="field">
              <div className="control">
                <Link className="button is-link is-primary is-size-6  has-text-centered is-fullwidth" to={'/register'}>
                  Sign up
                </Link>
              </div>
            </div>
            <div>
              <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div>
      {/* <Navbar /> */}
    </div>
  </>
}

export default Home