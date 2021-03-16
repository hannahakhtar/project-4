import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar.js'

export default function UserForm({ match, history }) {
  const LoggedInUserId = getLoggedInUserId()
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const [populateForm, updatePopulateForm] = useState('')
  const [loading, updateLoading] = useState(true)
  const [imageUrl, updateImageUrl] = useState(undefined)
  const token = localStorage.getItem('token')

  useEffect(() => {

    async function fetchUser() {

      if (match.params.userId) {
        try {
          const { data } = await axios.get(`/api/users/${match.params.userId}`, {
            headers: { Authorization: `Bearer ${token}` }
            // headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
          })
          if (data.errors) {
            updateErrorbox('Sorry - could not find that user')
          } else if (data.id !== LoggedInUserId) {
            updateErrorbox('Sorry - you do not have access to edit that user')
          } else {
            updatePopulateForm(data)
            updateImageUrl(data.image)
            updateLoading(false)
          }

          //console.log(data)
        } catch (err) {
          console.log(err)
          updateErrorbox('Sorry - could not find that user')
          updateLoading(false)
        }
      } else {
        updateErrorbox('Sorry - no user ID supplied')
        updateLoading(false)
      }
    }
    fetchUser()

  }, [])



  function handleImageUpload() {
    updateErrorbox('')
    const { files } = document.querySelector('input[type="file"]')
    if (files[0]) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('upload_preset', 'imagepreset')
      const options = {
        method: 'POST',
        body: formData
      }
      return fetch('https://api.cloudinary.com/v1_1/ikalff/image/upload', options)
        .then(res => res.json())
        .then(res => {
          updateImageUrl(res.secure_url)
        })
        .catch(err => console.log(err))
    } else {
      updateErrorbox('Please select an image to upload')
    }
  }

  async function onSubmit(data) {

    console.log(data)

    const formdata = {
      'username': data.username,
      'first_name': data.first_name,
      'last_name': data.last_name,
      'email': data.email,
      'location': data.location,
      'image': imageUrl
    }

    if (match.params.userId) {
      try {
        const { data } = await axios.put(`/api/users/${match.params.userId}`, formdata, {
          headers: { Authorization: `Bearer ${token}` }
          // headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
        })
        console.log(data)
        if (!imageUrl) {
          updateErrorbox('Please upload an image')
        } else if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        } else {
          history.push(`/users/${match.params.userId}`)
          updateErrorbox('')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const { data } = await axios.post('/api/users', formdata, {
          headers: { Authorization: `Bearer ${token}` }
          //headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
        })
        console.log(data)
        if (!imageUrl) {
          updateErrorbox('Please upload an image')
        } else if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        } else {
          history.push(`/users/${data.id}`)
          updateErrorbox('')
        }
      } catch (err) {
        console.log(err)
      }
    }

  }


  return <>
    <Navbar />
    <div className="hero is-fullheight-with-navbar">
      <div>
        <div className="container pt-5 pb-5 px-4">

          <h1 className='title'>Edit your profile</h1>

          {errorbox && <div className='box mt-4 has-background-danger has-text-white'>{errorbox}</div>}


          {populateForm &&
            <form onSubmit={handleSubmit(onSubmit)} >


              <div className='field'>
                <input
                  className={`input ${errors.username && 'is-danger'}`}
                  name='username'
                  placeholder='Name'
                  defaultValue={populateForm.username}
                  ref={register({ required: true })}
                />
                {errors.username && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>


              <div className='field'>
                <input
                  className={`input ${errors.first_name && 'is-danger'}`}
                  name='first_name'
                  placeholder='First Name'
                  defaultValue={populateForm.first_name}
                  ref={register({ required: true })}
                />
                {errors.first_name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <div className='field'>
                <input
                  className={`input ${errors.last_name && 'is-danger'}`}
                  name='last_name'
                  placeholder='Last Name'
                  defaultValue={populateForm.last_name}
                  ref={register({ required: true })}
                />
                {errors.last_name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>


              <div className='field'>
                <input
                  className={`input ${errors.location && 'is-danger'}`}
                  name='location'
                  placeholder='Location'
                  defaultValue={populateForm.location}
                  ref={register({ required: true })}
                />
                {errors.location && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>

              <div className='field'>
                <input
                  className={`input ${errors.email && 'is-danger'}`}
                  name='email'
                  placeholder='Email'
                  defaultValue={populateForm.email}
                  ref={register({ required: true })}
                />
                {errors.email && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>


              <div className='box mt-4 mb-4'>
                <h5 className='title is-size-5'>Upload a profile image</h5>

                <div className='columns is-vcentered'>

                  <div className='column is-narrow'>
                    <img src={imageUrl ? imageUrl : 'http://placehold.it/400x400?text=IMAGE'} className='profile-image' />
                  </div>

                  <div className='column is-narrow'>
                    <input type='file' className='fileinput button' />
                  </div>
                  <div className='column is-narrow'>
                    <button type='button' className='button' onClick={handleImageUpload}>Upload</button></div>
                </div>

              </div>



              <input
                className='button is-primary'
                type='submit'
              />
            </form >
          }
        </div>
      </div>
    </div>
  </>



}