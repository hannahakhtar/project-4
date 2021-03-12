import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Navbar from './components/Navbar'

function SingleProduct({ match }) {

  const productId = match.params.id
  const [product, updateProduct] = useState({})

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/products/${productId}`)
      updateProduct(data)
    }
    fetchData()
  }, [])

  console.log(product)

  const imageStyle = {
    width: '32px',
    borderRadius: '100%'
  }

  return <div className="container">
    <div className="content">
      <div className="level">
        <img className="level-item" src={'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} style={imageStyle}/>
        <h4 className="level-item">{product.product_name}</h4>
      </div>
    </div>
    <figure className="image is-375x375">
      <img src='https://cdn.shopify.com/s/files/1/1074/5128/products/vb1713977_Winter-2020---Knitwear---JJ-117_865b831c-b398-4646-bb6e-a0ee0e24d911_1200x.jpg?v=1602769681' />
    </figure>
    <div className="content">
      <div>
        <button>Wish list</button>
        <button>Seller profile</button>
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
        <strong><p>£{product.price}</p></strong>
      </div>
      <div>
        <button>Buy now</button>
      </div>
    </div>
    <div>
      <img src={'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/79/New_Shield.gif/revision/latest?cb=20201206050524'} style={imageStyle}/>
      <h6>All in app purchases are covered by Buyer Protection</h6>
    </div>
    <div className="content">
      <h4>More about the seller</h4>
    </div>
  </div>
}

export default SingleProduct