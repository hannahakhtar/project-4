import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomSelection from '../components/randomSelection'

import Navbar from '../components/Navbar'

function SingleProduct({ match }) {

  const userPng = './images/avatar.png'
  const wishlist = './images/like.png'

  const productId = match.params.id
  const [product, updateProduct] = useState({})

  useEffect(() => {
    async function fetchProductData() {
      const { data } = await axios.get(`/api/products/${productId}`)
      updateProduct(data)
    }
    fetchProductData()
  }, [])

  // function handleOnClick() {
  //   useEffect(() => {
  //     async function fetchData() {
  //       const { data } = await axios.post(`/api/whishlist/${productId}`)
  //       updateProduct(data)
  //     }
  //     fetchData()
  //   }, [])
  // }

  function handleInStock() {
    if (product.in_stock === true) {
      return <>
        <Link to={{
          pathname: '/checkout',
          state: {
            product: product
          }
        }}><button className="button is-primary">Buy now</button></Link>
      </>
    } else {
      return <>
        <h3>Sold</h3>
      </>
    }
  }

  function handleInStockImage() {
    if (product.in_stock === false) {
      return <>
        <h4 className="has-text-centered"><strong className="is-size-1 has-text-danger">Sold</strong></h4>
      </>
    }
  }

  const backgroundStyle = {
    background: 'url(https://cdn.shopify.com/s/files/1/1074/5128/products/vb1713977_Winter-2020---Knitwear---JJ-117_865b831c-b398-4646-bb6e-a0ee0e24d911_1200x.jpg?v=1602769681)',
    borderRadius: '5%',
    backgroundrepeat: 'no-repeat',
    backgroundsize: 'auto',
    height: '375px'
  }

  const boxStyle = {
    border: '2px solid black'
  }

  console.log(product)

  return <>
    <Navbar />
    <div className="container">
      <div className="content">
        <div className="level">
          {product.user && <Link to={`/users/${product.user.id}`}><img className="image is-32x32 is-rounded" src={'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} /></Link>}
          {product.user && <h4 className="sub-title">{product.user.username}</h4>}
        </div>
      </div>
      <h3 className="m-4"><strong>{product.product_name}</strong></h3>
      <div className="hero m-4">
        <div className="hero-body" style={backgroundStyle}>
          {handleInStockImage()}
        </div>
      </div>
      <div className="content m-4">
        <div>
          {product.user && <Link to={`/users/${product.user.id}`}><img src={wishlist} /></Link>}
          {product.user && <Link to={`/users/${product.user.id}`}><img src={userPng} /></Link>}
        </div>
        <div>
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
      </div>
      <div className="content m-4" style={boxStyle}>
        <img className="image is-32x32 is-rounded" src={'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/79/New_Shield.gif/revision/latest?cb=20201206050524'} />
        <h6 className="has-text-centered">All in app purchases are covered by Buyer Protection</h6>
      </div>
      <div className="content m-4">
        <h4>More things you might like</h4>
        <RandomSelection />
      </div>
    </div>
  </>
}

export default SingleProduct

