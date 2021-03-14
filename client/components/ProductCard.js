import React from 'react'

const ProductCard = ({ productId, productName, productImage, productPrice, productSize, productCategory, productCondition, productGender, productDescription }) => {
  return <div className='column is-one-quarter'>




    <div className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <a href={`singleproduct/${productId}`}><img src={productImage} alt={`${productName} image`} /></a>
        </figure>
      </div>
      <div className='card-content'>

        <div className='content'>
          <a href={`singleproduct/${productId}`}><h5 className='title is-size-5 mb-2'>{productName}</h5></a>
          <p className='is-size-7'>Size: {productSize}</p>
          <h5 className='title is-size-4 has-text-danger'>£{productPrice}</h5>
          <p>{productDescription}</p>
        </div>
      </div>


      <footer className='card-footer'>
        <a href={`singleproduct/${productId}`} className='card-footer-item'>View</a>
      </footer>
    </div>
  </div>
}

export default ProductCard