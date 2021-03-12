import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { getLoggedInUserId } from '../lib/auth.js'

export default function ProductForm({ match }) {
  const LoggedInUserId = getLoggedInUserId()
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const [populateForm, updatePopulateForm] = useState('')
  const [gender, updateGender] = useState('Unisex')


  useEffect(() => {


    async function fetchProduct() {
      if (match.params.productId) {
        try {
          const { data } = await axios.get(`/api/products/${match.params.productId}`, {
            // headers: { Authorization: `Bearer ${token}` }
            headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU1MTc4NiwiZXhwIjoxNjE1NjM4MTg2fQ.-bmpBtd9pGSjRHwxbdh9Roekv3Ev3I2UjCEnsUzUu_w' }
          })
          if (data.errors) {
            updateErrorbox('Sorry - could not fetch your data')
          }
          updatePopulateForm(data)
          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchProduct()

  }, [])

  async function onSubmit(data) {
    updateErrorbox('')
    const formdata = {
      'product_name': data.product_name,
      'size': data.size,
      'brand': data.brand,
      'description': data.description,
      'category': data.category,
      'condition': data.condition,
      'gender': data.gender,
      'price': data.price,
      'product_image': data.product_image,
      'in_stock': true
    }
    console.log(formdata)
    try {
      const { data } = await axios.post('/api/products', formdata, {
        // headers: { Authorization: `Bearer ${token}` }
        headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU1MTc4NiwiZXhwIjoxNjE1NjM4MTg2fQ.-bmpBtd9pGSjRHwxbdh9Roekv3Ev3I2UjCEnsUzUu_w' }
      })
      if (data.errors) {
        updateErrorbox('Sorry - could not save your data')
      }
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }





  return (
    <div className='container'>
      <h1>ADD/EDIT PRODUCT</h1>

      {errorbox && <div className='box has-background-danger has-text-white'>{errorbox}</div>}

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




        <div className='field'>
          <div className={`is-fullwidth select ${errors.gender && 'is-danger'}`}>
            <select name='gender'
              value={populateForm.gender}
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



        <div className='field'>
          <div className={`is-fullwidth select ${errors.category && 'is-danger'}`}>

            <select name='category'
              value={populateForm.category}
              ref={register({
                required: 'select one option'
              })}>
              <option value=''>Item category</option>
              <option value='Outerwear'>Outerwear</option>
              <option value='Accessories'>Accessories</option>
              <option value='Tops'>Tops</option>
              <option value='Trousers'>Trousers</option>
              <option value='Skirts'>Skirts</option>
              <option value='Dresses'>Dresses</option>
            </select>
          </div>
          {errors.category && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>


        <div className='field'>
          <div className={`is-fullwidth select ${errors.condition && 'is-danger'}`}>

            <select name='condition'
              value={populateForm.condition}
              ref={register({
                required: 'select one option'
              })}>
              <option value=''>Item condition</option>
              <option value='Brand new with tags'>Brand new with tags</option>
              <option value='New without tags'>New without tags</option>
              <option value='Worn occasionally - good condition'>Worn occasionally - good condition</option>
              <option value='Worn often - some damage/wear'>Worn often - some damage/wear</option>
            </select>
          </div>
          {errors.condition && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>



        <div className='field'>
          <input
            className={`input ${errors.product_image && 'is-danger'}`}
            name='product_image'
            placeholder='Image'
            defaultValue={populateForm.product_image}
            ref={register({ required: true })}
          />
          {errors.product_image && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>


        <div className='field'>
          <input
            className='mr-1'
            type='checkbox'
            placeholder='in_stock'
            name='in_stock'
            ref={register} />
            In stock
        </div>

        <input
          className='button is-primary'
          type='submit'
        />
      </form >
    </div>
  )



}
