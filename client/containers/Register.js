import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function Register({ history }) {
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  // const [showModal, updateShowModal] = useState(false)

  async function onSubmit(data) {

    updateErrorbox('')

    const formdata = {
      'username': data.username,
      'email': data.email,
      'password': data.password,
      'first_name': data.first_name,
      'last_name': data.last_name,
      'location': data.location,
      'image': data.image
    }

    console.log(formdata)

    try {
      const { data } = await axios.post('/api/signup', formdata,)
      console.log(data._id)
      // history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // const modalFormControls = {
  //   submit: {
  //     handler: async () => {
  //       try {
  //         const formData = {}
  //         for (const field in formdata) {
  //           formData[field] = formdata[field].value
  //         }
  //         formData.isTravelling = formdata.isTravelling.value.value
  //         formData.isPublic = formdata.isPublic.value.value
  //         await axios.post('/api/register', formData)
  //           .then(({ data }) => {
  //             console.log('I have registered', data)
  //           })
  //         updateShowModal(false)
  //         history.push('/login')
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     },
  //     label: 'Sign Up'
  //   }
  // }

  const backgroundStyle = {
    height: '100vh',
    background: 'url(https://i.pinimg.com/736x/a1/1e/ae/a11eae81ff3fd4da53e676cd64d876cf.jpg)',
    backgroundSize: 'cover'
  }

  return (
    <div className='container'>
      <div className="hero is-fullheight-with-navbar is-primary">
        <div className="hero-body is-felx is-flex-direction-column" style={backgroundStyle}>
          <h1 className="title is-size-1 has-text-centered">Getting started</h1>

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
          </form >
          <button
            className='button is-primary m-5'
            // onClick={updateShowModal(true)}
          >
            Continue
          </button>


        </div>
      </div>
    </div >
  )
}

export default Register