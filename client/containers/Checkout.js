import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Checkout({ location, history }) {

  const product = location.state
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  // const [showModal, updateShowModal] = useState(false)

  const shipping = 3.99

  async function onSubmit(data) {

    updateErrorbox('')

    const formdata = {
      'address1': data.address1,
      'address2': data.address2,
      'city': data.city,
      'post_code': data.post_code,
      'phone': data.phone,
      'card': data.card,
      'expire': data.expire,
      'name': data.name,
      'security': data.security
    }

    console.log(formdata)
  }

  async function handleSubmitProduct() {
    const { data } = await axios.delete(`/api/product${product.product.id}`)
    console.log(data._id)
    history.push('/search-home')
  }

  console.log(product)

  return (<div className="m-4">
    <div>
      <h1 className="title has-text-centered">Shipping Details</h1>
    </div>
    <div className='container'>
      <h3>{product.product.product_name}</h3>
      <h3>{product.product.product_image}</h3>
      <h3>£{product.product.price}</h3>
    </div>
    <div className='container'>

      {errorbox && <div className='box has-background-danger has-text-white'>{errorbox}</div>}

      <form onSubmit={handleSubmit(onSubmit)} >

        <div className='field'>
          <input
            className={`input ${errors.address1 && 'is-danger'}`}
            name='address1'
            placeholder='Address Line 1'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.address1 && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.address2 && 'is-danger'}`}
            name='address2'
            placeholder='Address Line 2'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.address2 && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.city && 'is-danger'}`}
            name='city'
            placeholder='City'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.city && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.post_code && 'is-danger'}`}
            name='post_code'
            placeholder='Post code'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.post_code && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.phone && 'is-danger'}`}
            name='phone'
            placeholder='Phone (Optional)'
            type='text'
            defaultValue=''
            ref={register({ required: false })}
          />
          {errors.phone && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <h3>Enter your card details</h3>

        <div className='field'>
          <input
            className={`input ${errors.card && 'is-danger'}`}
            name='card'
            placeholder='16 Digit Card Number'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.card && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.expire && 'is-danger'}`}
            name='expire'
            placeholder='Example 10/20'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.expire && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.name && 'is-danger'}`}
            name='name'
            placeholder='Name on card'
            type='text'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.name && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <div className='field'>
          <input
            className={`input ${errors.security && 'is-danger'}`}
            name='security'
            placeholder='3 Digit security code'
            type='password'
            defaultValue=''
            ref={register({ required: true })}
          />
          {errors.security && <div className='mt-2 mb-2 is-size-7'>This field is required</div>}
        </div>

        <h3>Total plus shipping:</h3>
        <h3>£{(product.product.price + shipping).toFixed(2)}</h3>

      </form >
      {product.product.id && <button
        className='button is-primary'
        onClick={handleSubmitProduct}
      >
        Continue
      </button>}
      <Link to={`products/${product.product.id}`}><button className='button is-primary'>Continue Shopping</button></Link>
      <div>
        <small>Please note, this is just a project and real card details should not be entered</small>
      </div>
    </div>
  </div>
  )
}

export default Checkout