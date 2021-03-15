import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomSelection from '../components/randomSelection'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar'

function SingleProduct({ match }) {

  const userPng = './images/avatar.png'
  const wishlist = './images/like.png'

  const productId = match.params.id
  const loggedInUserId = getLoggedInUserId()
  const [product, updateProduct] = useState({})

  console.log(loggedInUserId)

  useEffect(() => {
    async function fetchProductData() {
      const { data } = await axios.get(`/api/products/${productId}`)
      updateProduct(data)
    }
    fetchProductData()
  }, [])

  console.log(product)

  function handleWishlist() {
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.post(`/users/${loggedInUserId}/wishlist/${productId}>`, {
          //  headers: { Authorization: `Bearer ${token}` }
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlhdCI6MTYxNTgxNTkwNywiZXhwIjoxNjE1OTAyMzA3fQ.tgZmZZ8sFG9cBVxUzZKAU12ojcPNdZ_04GivWiBF03w' }
        })
        updateProduct(data)
      }
      fetchData()
    }, [])
  }

  function handleInStock() {
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

  // function handleIsUser() {
  //   if (product.user && product.user.id === loggedInUserId) {
  //     return <button>Edit</button>
  //   } else {
  //     return <button onClick={handleWishlist()}>Wishlist</button>
  //   }
  // }

  function handleInStockImage() {
    if (product.in_stock === false) {
      return <>
        <div className="hello" >
          <h4 className="has-text-centered"><strong className="is-size-1-mobile has-text-danger">Sold</strong></h4>
        </div>
      </>
    }
  }

  const backgroundImage = {
    background: 'url(https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borderRadius: '5%',
    backgroundrepeat: 'no-repeat',
    backgroundsize: 'auto',
    height: '375px'
  }

  const boxStyle = {
    border: '2px solid black'
  }

  return <>
    <div className="container">
      <section className="content is-flex">
        {product.user && <Link to={`/users/${product.user.id}`}><img className="image is-32x32 is-rounded ml-4 m-2" src={'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} /></Link>}
        {product.user && <Link to={`/users/${product.user.id}`}><h4 className="sub-title m-3">{product.user.username}</h4></Link>}
      </section>
      <section className="hero m-4">
        <div className="hero-body" style={backgroundImage}>
          {handleInStockImage()}
        </div>
      </section>
      <section className="content m-4">
        <div>
          {/* {handleIsUser()} */}
          {product.user && <Link to={`/users/${product.user.id}`}><img src={userPng} /></Link>}
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
    <Navbar />
  </>
}

export default SingleProduct

