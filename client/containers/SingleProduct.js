import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomSelection from '../components/randomSelection'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar'
// import { findLastKey } from 'lodash'

function SingleProduct({ match, history }) {

  // const wishlist = './images/like.png'

  const productId = match.params.id
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')
  const [product, updateProduct] = useState({})
  const [user, updateUser] = useState({})
  // const [inWishlist, updateInWishlist] = useState(false)


  async function fetchProductData() {
    const { data } = await axios.get(`/api/products/${productId}`)
    updateProduct(data)
  }

  async function fetchUserData() {
    const { data } = await axios.get(`/api/users/${loggedInUserId}`)
    updateUser(data)
  }

  useEffect(() => {
    fetchProductData()
    fetchUserData()
  }, [])

  // user.wishlist && user.wishlist.filter(item => item.product.id === product.id) ? updateInWishlist(true) : updateInWishlist(false)

  user.wishlist && user.wishlist.find(item => {
    if (item.product.id === product.id) {
      console.log(true)
      return <></>
    } else {
      console.log(false)
      return <button className="mb-3" onClick={handleWishlist}>Wishlist</button>
    }
  })

  async function handleWishlist() {
    const { data } = await axios.post(`/api/users/${loggedInUserId}/wishlist/${productId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)
  }

  async function handleDelete() {
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push(`/users/${loggedInUserId}`)
  }

  function handleInStock() {
    if (loggedInUserId === (product.user && product.user.id)) {
      return
    } else {
      if (product.in_stock === true) {
        return <>
          <Link to={{
            pathname: '/checkout',
            state: {
              product: product
            }
          }}><button className="button is-info mt-3">Buy now</button></Link>
        </>
      } else {
        return <>
          <h3>Sold</h3>
        </>
      }
    }
  }

  const backgroundImage = {
    background: 'url(https://prolocksni.co.uk/wp-content/uploads/2018/04/400x400.png)',
    borderRadius: '5%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '375px'
  }

  const boxStyle = {
    border: '2px solid black'
  }

  return <>
    <Navbar />
    <div className="container">
      <section className="content is-flex mb-2">
        {product.user && <Link to={`/users/${product.user.id}`}><img className="image is-32x32 is-rounded ml-4 m-2" src={'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} /></Link>}
        {product.user && <Link to={`/users/${product.user.id}`}><h4 className="sub-title m-3">{product.user.username}</h4></Link>}
      </section>
      <section className="hero m-4">
        <div className="hero-body" style={backgroundImage}>
          {product.in_stock === false ? <h4 className="has-text-centered"><strong className="is-size-1-mobile has-text-danger">Sold</strong></h4> : <></>}
        </div>
      </section>
      <section className="content m-4">
        <div>
          {product.user && loggedInUserId === product.user.id
            ? product.in_stock === false ? <></>
              : <Link to={`/productform/${productId}`}><button className="mb-3 mr-1">Edit</button></Link>
            : product.in_stock === true
              ? <button className="mb-3" onClick={handleWishlist}>Wishlist</button>
              : <></>}
          {product.user && loggedInUserId === product.user.id
            ? product.in_stock === false ? <></>
              : <button className="mb-3" onClick={handleDelete}>Delete</button>
            : <></>}
        </div>
        <div>
          <h3 className="title"><strong>{product.product_name}</strong></h3>
          <p><strong>Description:</strong>{product.description}</p>
        </div>
        <div>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
        </div>
        <div>
          <strong><p>Price: £{product.price}</p></strong>
        </div>
        <div>{handleInStock()}</div>
      </section>
      <section className="content">
        <div className="content m-4 is-flex" style={boxStyle}>
          <img className="image is-32x32 is-rounded mt-3 ml-3" src={'https://i.pinimg.com/originals/49/cd/d8/49cdd84297f34cb03fabe17eb346adb3.png'} />
          <h6 className="has-text-centered mt-3">All in app purchases are covered by Buyer Protection</h6>
        </div>
      </section>
      <section className="content m-4">
        <h4>More things you might like</h4>
        <RandomSelection />
      </section>
    </div>
  </>
}

export default SingleProduct

