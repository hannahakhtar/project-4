import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomSelection from '../components/randomSelection'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar'
// import { findLastKey } from 'lodash'

function SingleProduct({ match, history }) {

  const productId = match.params.id
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')
  const [product, updateProduct] = useState({})
  const [user, updateUser] = useState({})


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
  }, [match.params.id])

  // user.wishlist && user.wishlist.filter(item => item.product.id === product.id) ? <></> : <button className="button is-primary mb-3" onClick={handleWishlist}>Wishlist</button>

  {
    user.wishlist && user.wishlist.find(item => {
      if (item.product.id === product.id) {
        console.log(true)
        return <></>
      }
    })
  }

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
          }}><button className="button is-primary mt-3">Buy now</button></Link>
        </>
      } else {
        return <>
          <h3>Sold</h3>
        </>
      }
    }
  }

  const boxStyle = {
    width: '370px',
    margin: 'auto',
    display: 'block'
  }

  const borderStyle = {
    border: '2px solid black'
  }

  return <>
    <Navbar />
    <div className="container">
      <section className="content is-flex mb-0">
        {product.user && <Link to={`/users/${product.user.id}`}><img className="image is-32x32 is-rounded ml-4 m-2 p-1" src={'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} /></Link>}
        {product.user && <Link to={`/users/${product.user.id}`}><h4 className="sub-title m-3 p-1">{product.user.username}</h4></Link>}
      </section>
      <section className="card">
        <div className="card-image">
          <figure className="image is-square">
            <img src={'https://www.crewclothing.co.uk/images/products/large/MLC004_MIDGRYMRL.jpg'} alt="Placeholder image" />
          </figure>
          {product.in_stock === false ? <h4 className="has-text-centered"><strong className="is-size-1 has-text-danger">Sold</strong></h4> : <></>}
        </div>
      </section>
      <section className="content m-4">
        <div>
          {product.user && loggedInUserId === product.user.id
            ? product.in_stock === false ? <></>
              : <Link to={`/productform/${productId}`}><button className="button is-primary mb-3 mr-1">Edit</button></Link>
            : product.in_stock === true
              ? user.wishlist && user.wishlist.find(item => item.product.id === product.id)
                ? <></>
                : <button className="button is-primary mb-3" onClick={handleWishlist}>Wishlist</button>
              : <></>}
          {product.user && loggedInUserId === product.user.id
            ? product.in_stock === false ? <></>
              : <button className="button is-primary mb-3" onClick={handleDelete}>Delete</button>
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
      <section className="content" style={boxStyle}>
        <div className="content m-4 is-flex" style={borderStyle}>
          <img className="image is-48x48 is-rounded m-3" src={'https://i.pinimg.com/originals/49/cd/d8/49cdd84297f34cb03fabe17eb346adb3.png'} />
          <h6 className="has-text-centered mt-3 mb-3 mr-3 p-2">All in app purchases are covered by Buyer Protection</h6>
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

