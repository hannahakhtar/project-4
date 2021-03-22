import React from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from '../components/Navbar'
import { getLoggedInUserId } from '../lib/auth.js'
import { withRouter } from 'react-router-dom'

function NotFound() {

  const loggedIn = getLoggedInUserId()
  const history = useHistory()

  return <>
    <NavBar />
    <div className="hero is-fullheight-with-navbar">
      <div>
        <div className="container pt-5 pb-5 px-4 display-no-search-results">
          <h1 className="no-search-results">Oops!</h1>
          <p className="no-search-results">Your page was not found...</p>
          <br />
          {!loggedIn && <button className="button is-primary">Register or Login</button>}
          {loggedIn && <button className="button is-primary" onClick={() => history.goBack()}>Go back</button>}
        </div>
      </div>
    </div>
  </>
}

export default withRouter(NotFound)