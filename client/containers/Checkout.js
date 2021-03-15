import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Checkout({ location }) {

  const product = location.state
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const token = localStorage.getItem('token')
  // const [checkout, updateCheckout] = useState('')
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

  const purchased = {
    'in_stock': false
  }

  // End point needed for posting to order history

  // async function saveToOrderHistory() {
  //   const { data } = await axios.post(``, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   console.log(data)
  // }

  async function handleSubmitProduct() {
    const { data } = await axios.put(`/api/products/${product.product.id}`, purchased, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)
  }

  const imageStyle = {
    borderRadius: '5%'
  }

  return (<div className="m-4">
    <div>
      <h1 className="title has-text-centered m-5">Shipping Details</h1>
    </div>
    <div className='container mb-4'>
      <div className="card">
        <div className="card-content">
          <div className="media-left p-0 m-0">
            <figure>
              <img className="image" src={'https://cdn.shopify.com/s/files/1/1074/5128/products/vb1713977_Winter-2020---Knitwear---JJ-117_865b831c-b398-4646-bb6e-a0ee0e24d911_1200x.jpg?v=1602769681'} style={imageStyle} />
            </figure>
          </div>
          <div className="media-content mt-2">
            <h3>{product.product.product_name}</h3>
            <h3>£{product.product.price}</h3>
          </div>
        </div>
      </div>
    </div>
    <div className='container'>

      {errorbox && <div className='box has-background-danger has-text-white'>{errorbox}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">

        <h3 className="mt-3 mb-3">Enter your address details</h3>

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

        <h3 className="mt-3 mb-3">Enter your card details</h3>

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

        <h3>Shipping: £{shipping}</h3>
        <h3>Total plus shipping:</h3>
        <h3>£{(product.product.price + shipping).toFixed(2)}</h3>

        {product.product.id && <Link to={'/search-home'}><button
          className='button is-info mr-3'
          onClick={handleSubmitProduct}
        >
          Continue
        </button></Link>}

      </form >

      <Link to={`products/${product.product.id}`}><button className='button is-info'>Continue Shopping</button></Link>
      <div className='mt-4'>
        <small>Please note, this is just a project and real card details should not be entered</small>
      </div>
    </div>
  </div>
  )
}

export default Checkout