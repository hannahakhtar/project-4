import React from 'react'
import { Link } from 'react-router-dom'

function Home() {



  return <>
    <header>
      <div className="hero is-fullheight-with-navbar is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1 mb-6">GARMS</h1>
            <div className="field">
              <div className="control">
                <Link className="button is-primary is-size-6  has-text-centered is-fullwidth" to={'/register'}>
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
  </>
}

export default Home