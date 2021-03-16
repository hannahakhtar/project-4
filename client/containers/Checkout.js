import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar'
// import nodemailer from 'nodemailer'

function Checkout({ location }) {

  const product = location.state
  const { register, handleSubmit, errors } = useForm()
  const [errorbox, updateErrorbox] = useState('')
  const token = localStorage.getItem('token')
  const loggedInUserId = getLoggedInUserId()

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

  async function saveToOrderHistory() {
    const { data } = await axios.post(`api/users/${loggedInUserId}/order-history/${product.product.id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)
  }

  async function handleSubmitProduct() {
    const { data } = await axios.put(`/api/products/${product.product.id}`, purchased, {
      headers: { Authorization: `Bearer ${token}` }
    })
    saveToOrderHistory()
    // email()
    console.log(data)
  }

  // async function email() {
  //   const testAccount = await nodemailer.createTestAccount()

  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: testAccount.user, 
  //       pass: testAccount.pass
  //     }
  //   })

  //   const info = await transporter.sendMail({
  //     from: '"Garms 🧦" <checkout@garms.com>', 
  //     to: 'jacobaston92@gmail.com', 
  //     subject: 'Hello ✔', 
  //     text: 'Hello world?', 
  //     html: '<b>Your purchase is complete</b>'
  //   })

  //   console.log('Message sent: %s', info.messageId)

  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // }

  const imageStyle = {
    borderRadius: '5%'
  }

  return <div>
    <Navbar />
    <div className="m-4">
      <div>
        <h1 className="title has-text-centered m-5">Shipping Details</h1>
      </div>
      <div className='container mb-4'>
        <div className="card">
          <div className="card-content">
            <div className="media-left p-0 m-0">
              <figure>
                <img className="image" src={product.product.product_image} style={imageStyle} />
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

        <form onSubmit={handleSubmit(onSubmit), handleSubmitProduct()} className="mb-4">

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

          {/* {product.product.id && <Link to={'/search-home'}> */}
          <button
            className='button is-info mr-3'
            // onSubmit={handleSubmitProduct}
          >
            Continue
          </button>
          {/* </Link>} */}

        </form >

        <Link to={`products/${product.product.id}`}><button className='button is-info'>Continue Shopping</button></Link>
        <div className='mt-4'>
          <small>Please note, this is just a project and real card details should not be entered</small>
        </div>
      </div>
    </div>
  </div>
}

export default Checkout