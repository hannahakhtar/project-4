import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Home({ history }) {

  function logOut() {
    localStorage.clear()
    history.push('/login')
  }
  return <>
    <header>
      <div className="hero is-fullheight-with-navbar homepage">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className='box mt-4 mb-4 mx-4'>

              <Link to={'/search-home'}><img src='https://i.ibb.co/0YfbzWr/logo-garms.png' alt='Garms logo' className='mt-2 mb-2'></img></Link>

              <p className='is-size-5 mb-4'>Buy and sell pre-loved clothing</p>
              <div className="field">
                <div className="control">
                  <Link className="button is-primary is-size-6  has-text-centered is-fullwidth mb-2" to={'/login'}>
                    Log in</Link>
                  <Link className="button is-link is-size-6  has-text-centered is-fullwidth mb-2" to={'/register'}>
                    Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
}


export default withRouter(Home)