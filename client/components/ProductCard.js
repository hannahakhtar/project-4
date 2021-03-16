import React from 'react'
import { getLoggedInUserId } from '../lib/auth.js'

const ProductCard = ({ location, productId, productName, productImage, productPrice, productSize, productDescription, purchaseDate, userId, removeFromWishlist }) => {

  var moment = require('moment')

  return <div className='column is-one-quarter'>

    <div className='card  bm--card-equal-height'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <a href={`/products/${productId}`}><img src={productImage} alt={`${productName} image`} /></a>
        </figure>
      </div>
      <div className='card-content'>

        <div className='content'>
          <a href={`/products/${productId}`}><h5 className='title is-size-5 mb-2'>{productName}</h5></a>
          <p className='is-size-7'>Size: {productSize}</p>
          <h5 className='title is-size-4 has-text-danger'>£{productPrice}</h5>
          {purchaseDate &&
            <p className='is-size-7'>
              Purchased on: {moment(purchaseDate).format('LLLL')}
            </p>}
          <p>{productDescription}</p>
        </div>
      </div>

      <footer className='card-footer'>

        <a href={`/products/${productId}`} className='card-footer-item'>View</a>

        {location === 'Listings' && <>
          {parseInt(getLoggedInUserId()) === parseInt(userId) &&
            <a href={`/productform/${productId}`} className='card-footer-item'>Edit</a>
          }
        </>}

        {location === 'Wishlist' && <a className='card-footer-item' onClick={() => removeFromWishlist(productId, userId)}>Remove</a>}
      </footer>
    </div>
  </div>
}

export default ProductCard