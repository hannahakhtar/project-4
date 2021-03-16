import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar.js'

function Register({ history }) {
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')

  async function onSubmit(data) {
    updateErrorbox('')
    const formdata = {
      'username': data.username,
      'email': data.email,
      'password': data.password,
      'first_name': data.first_name,
      'last_name': data.last_name,
      'location': data.location,
      'image': 'https://i.ibb.co/6Zyw6CD/garms-icon.png'
    }

    try {
      const { data } = await axios.post('/api/signup', formdata,)
      //console.log(data)
      if (data.id) {
        history.push('/login/success')
      } else {
        updateErrorbox('Unable to register user. Username and email address must be unique.')
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }



  return <>
    <Navbar />

    <div className="hero is-fullheight-with-navbar register">
      <div className="hero-body">
        <div className="container">
          <div className='box mt-4 mb-4 mx-4'>

            <h1 className="title has-text-centered mt-2 mb-5">Register</h1>

            {errorbox && <div className='box has-background-danger has-text-white'>{errorbox}</div>}

            <form onSubmit={handleSubmit(onSubmit)} >

              <div className='field'>
                <label>
                  <p>Username</p>
                </label>
                <input
                  className={`input ${errors.username && 'is-danger'}`}
                  name='username'
                  placeholder='Username'
                  type='text'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.username && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <div className='field'>
                <label>
                  <p>First name</p>
                </label>
                <input
                  className={`input ${errors.first_name && 'is-danger'}`}
                  name='first_name'
                  placeholder='First Name'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.first_name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <div className='field'>
                <label>
                  <p>Last name</p>
                </label>
                <input
                  className={`input ${errors.last_name && 'is-danger'}`}
                  name='last_name'
                  placeholder='Last Name'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.last_name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>


              <div className='field'>
                <label>
                  <p>Location</p>
                </label>
                <input
                  className={`input ${errors.location && 'is-danger'}`}
                  name='location'
                  placeholder='Location'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.location && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>
              <div className='field'>
                <label>
                  <p>Email</p>
                </label>
                <input
                  className={`input ${errors.email && 'is-danger'}`}
                  name='email'
                  placeholder='Email@email.com'
                  type='text'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.email && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <div className='field'>
                <label>
                  <p>Password</p>
                </label>
                <input
                  className={`input ${errors.password && 'is-danger'}`}
                  name='password'
                  placeholder='Password'
                  type='password'
                  defaultValue=''
                  ref={register({ required: true })}
                />
                {errors.password && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <button className='button is-primary mt-3'>Register</button>
            </form >

          </div>
        </div>
      </div >
    </div >
  </>
}

export default Register