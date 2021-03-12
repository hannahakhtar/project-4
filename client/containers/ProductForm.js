import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { getLoggedInUserId } from '../lib/auth.js'

export default function ProductForm({ match, history }) {
  const LoggedInUserId = getLoggedInUserId()
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const [populateForm, updatePopulateForm] = useState('')
  const [loading, updateLoading] = useState(true)


  useEffect(() => {

    async function fetchProduct() {
      if (match.params.productId) {
        try {
          const { data } = await axios.get(`/api/products/${match.params.productId}`, {
            // headers: { Authorization: `Bearer ${token}` }
            headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU1MTc4NiwiZXhwIjoxNjE1NjM4MTg2fQ.-bmpBtd9pGSjRHwxbdh9Roekv3Ev3I2UjCEnsUzUu_w' }
          })
          if (data.errors) {
            updateErrorbox('Sorry - could not find that product')
          }
          updatePopulateForm(data)
          updateLoading(false)
          //console.log(data)
        } catch (err) {
          console.log(err)
          updateErrorbox('Sorry - could not find that product')
          updateLoading(false)
        }
      } else {
        updateLoading(false)
      }
    }
    fetchProduct()

  }, [])





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
      'product_image': data.product_image,
      'in_stock': true
    }


    if (match.params.productId) {
      try {
        const { data } = await axios.put(`/api/products/${match.params.productId}`, formdata, {
          // headers: { Authorization: `Bearer ${token}` }
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU1MTc4NiwiZXhwIjoxNjE1NjM4MTg2fQ.-bmpBtd9pGSjRHwxbdh9Roekv3Ev3I2UjCEnsUzUu_w' }
        })
        if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        }
        //console.log(data)
        history.push(`/productform/${match.params.productId}`)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const { data } = await axios.post('/api/products', formdata, {
          // headers: { Authorization: `Bearer ${token}` }
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTYxNTU1MTc4NiwiZXhwIjoxNjE1NjM4MTg2fQ.-bmpBtd9pGSjRHwxbdh9Roekv3Ev3I2UjCEnsUzUu_w' }
        })
        if (data.errors) {
          updateErrorbox('Sorry - could not save your data')
        }
        //console.log(data)
        history.push(`/productform/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    }

  }





  return (
    <div className='container'>


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
                <option value='Trousers'>Trousers</option>
                <option value='Skirts'>Skirts</option>
                <option value='Dresses'>Dresses</option>
              </select>
            </div>
            {errors.category && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
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
                <option value='Brand new with tags'>Brand new with tags</option>
                <option value='New without tags'>New without tags</option>
                <option value='Worn occasionally - good condition'>Worn occasionally - good condition</option>
                <option value='Worn often - some damage/wear'>Worn often - some damage/wear</option>
              </select>
            </div>
            {errors.condition && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
          </div>
        }


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



        <input
          className='button is-primary'
          type='submit'
        />
      </form >
    </div>
  )



}
