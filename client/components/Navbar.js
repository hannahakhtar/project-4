import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'

function Navbar({ history }) {

  const [userData, updateUserData] = useState({})
  const [loggedIn, updateLoggedIn] = useState(false)
  let loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')



  useEffect(() => {
    async function fetchData() {
      loggedInUserId = getLoggedInUserId()
      // console.log('id:')
      // console.log(loggedInUserId)
      if (!isNaN(loggedInUserId)) {
        try {
          const { data } = await axios.get(`/api/users/${loggedInUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (data.errors) {
            console.log(data.errors)
          } else {
            updateUserData(data)
            updateLoggedIn(true)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [loggedIn])

  function logOut() {
    localStorage.clear()
    updateLoggedIn(false)
    history.push('/login')
  }

  // console.log('logged in?"')
  // console.log(loggedIn)

  return <nav className='navbar' role='navigation' aria-label='main navigation'>



    <div className='container px-4 pt-4 pb-4'>

      <div className='nostackcolumns'>
        <div>
          <Link to={'/search-home'}><img src='https://i.ibb.co/2ZSffTJ/logo-garms-white.png' alt='Garms logo' className='logo'></img></Link>
        </div>

        <div className='buttons'>


          {loggedIn ? <div className='nostackcolumns'>

            <div className='mr-4'>
              <Link className='has-text-white' to={`/users/${loggedInUserId}`}><img src={userData.image} className='profile-image'></img>
              </Link>
            </div>

            <div className='has-text-white is-hidden-mobile'>
              Logged in as <Link className='mr-2 has-text-white  underline' to={`/users/${loggedInUserId}`}><strong>{userData.username}</strong></Link> 
              | 
              <a className='ml-2 has-text-white underline' onClick={logOut}>Log out</a>

            </div>
          </div>
            :
            <>
              <Link className='button' to='/register'>Register</Link>
              <Link className='button' to='/login'>Login</Link>
            </>
          }



        </div>
      </div>
    </div>
  </nav >


}

export default withRouter(Navbar)