import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar.js'

export default function ProductForm({ match, history }) {
  const LoggedInUserId = getLoggedInUserId()
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const [populateForm, updatePopulateForm] = useState('')
  const [loading, updateLoading] = useState(true)
  const [imageUrl, updateImageUrl] = useState(undefined)
  const token = localStorage.getItem('token')

  useEffect(() => {

    async function fetchProduct() {

      if (match.params.productId) {
        try {
          const { data } = await axios.get(`/api/products/${match.params.productId}`, {
            headers: { Authorization: `Bearer ${token}` }
            // headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
          })
          if (data.errors) {
            updateErrorbox('Sorry - could not find that product')
          }
          updatePopulateForm(data)
          updateImageUrl(data.product_image)
          updateLoading(false)
        } catch (err) {
    
          updateErrorbox('Sorry - could not find that product')
          updateLoading(false)
        }
      } else {
        updateLoading(false)
      }
    }
    fetchProduct()

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

    const formdata = {
      'product_name': data.product_name,
      'size': data.size,
      'brand': data.brand,
      'description': data.description,
      'category': data.category,
      'condition': data.condition,
      'gender': data.gender,
      'price': data.price,
      'product_image': imageUrl,
      'in_stock': true
    }

    if (match.params.productId) {
      try {
        const { data } = await axios.put(`/api/products/${match.params.productId}`, formdata, {
          headers: { Authorization: `Bearer ${token}` }
          // headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
        })

        if (!imageUrl) {
          updateErrorbox('Please upload an image')
        } else if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        } else {
          history.push(`/products/${match.params.productId}`)
          updateErrorbox('')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const { data } = await axios.post('/api/products', formdata, {
          headers: { Authorization: `Bearer ${token}` }
          //headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTY1MDE3MSwiZXhwIjoxNjE1NzM2NTcxfQ.ZNaHSQGbMTpIz_uQQr15iU-MCYFj6aIZZKcoSyPE0zc' }
        })
        if (!imageUrl) {
          updateErrorbox('Please upload an image')
        } else if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        } else {
          history.push(`/products/${data.id}`)
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

          <h1 className='title'>{match.params.productId ? 'Edit product' : 'List a new product'}</h1>

          {errorbox && <div className='box mt-4 has-background-danger has-text-white'>{errorbox}</div>}

          <form onSubmit={handleSubmit(onSubmit)} >
            <div className='field'>
              <input
                className={`input ${errors.product_name && 'is-danger'}`}
                name='product_name'
                placeholder='Name'
                defaultValue={populateForm.product_name}
                ref={register({ required: true })}
              />
              {errors.product_name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
            </div>
            <div className='field'>
              <input
                className={`input ${errors.price && 'is-danger'}`}
                type='number'
                step='.01'
                name='price'
                placeholder='Price'
                defaultValue={populateForm.price}
                ref={register({ required: true, valueAsNumber: true })}
              />
              {errors.price && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
            </div>
            <div className='field'>
              <input
                className={`input ${errors.brand && 'is-danger'}`}
                name='brand'
                placeholder='Brand'
                defaultValue={populateForm.brand}
                ref={register({ required: true })}
              />
              {errors.brand && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
            </div>
            <div className='field'>
              <textarea
                className={`textarea ${errors.description && 'is-danger'}`}
                name='description'
                placeholder='Description'
                defaultValue={populateForm.description}
                ref={register({ required: true })}
              />
              {errors.description && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
            </div>
            <div className='field'>
              <input
                className={`input ${errors.size && 'is-danger'}`}
                name='size'
                placeholder='Size'
                defaultValue={populateForm.size}
                ref={register({ required: true })}
              />
              {errors.size && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
            </div>
            {!loading &&
              <div className='field'>
                <div className={`is-fullwidth select ${errors.gender && 'is-danger'}`}>
                  <select name='gender'
                    defaultValue={populateForm.gender}
                    ref={register({
                      required: 'select one option'
                    })}>
                    <option value=''>Item gender</option>
                    <option value='Unisex'>Unisex</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
                {errors.gender && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
              </div>
            }
            {!loading &&
              <div className='field'>
                <div className={`is-fullwidth select ${errors.category && 'is-danger'}`}>
                  <select name='category'
                    defaultValue={populateForm.category}
                    ref={register({
                      required: 'select one option'
                    })}>
                    <option value=''>Item category</option>
                    <option value='Outerwear'>Outerwear</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Tops'>Tops</option>
                    <option value='Bottoms'>Bottoms</option>
                    <option value='Skirts'>Skirts</option>
                    <option value='Dresses'>Dresses</option>
                    <option value='Underwear'>Underwear</option>
                    <option value='Shoes'>Shoes</option>
                    <option value='Lingerie'>Lingerie</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>
            }
            {!loading &&
              <div className='field'>
                <div className={`is-fullwidth select ${errors.condition && 'is-danger'}`}>

                  <select name='condition'
                    defaultValue={populateForm.condition}
                    ref={register({
                      required: 'select one option'
                    })}>
                    <option value=''>Item condition</option>
                    <option value='Brand new with tags'>Worn often - some damage/wear</option>
                    <option value='New without tags'>New without tags</option>
                    <option value='Worn occasionally - good condition'>Worn occasionally - good condition</option>
                    <option value='Worn often - some damage/wear'>Worn often - some damage/wear</option>
                  </select>
                </div>
              </div>
            }
            <div className='box mt-4 mb-4'>
              <h5 className='title is-size-5'>Upload an image</h5>
              <div className='columns is-vcentered'>
                <div className='column is-narrow'>
                  <img src={imageUrl ? imageUrl : 'http://placehold.it/400x400?text=IMAGE'} className="displayed-image" width='100' />
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
        </div>
      </div>
    </div>
  </>



}