import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

// import Navbar from './components/Navbar'

function randomSelection() {

  // const productId = match.params.id
  const [product, updateProduct] = useState({})

  useEffect(() => {
    async function fetchProductData() {
      const { data } = await axios.get('/api/products')
      const arrayData = Object.entries(data)
      updateProduct(arrayData.map((result) => {
        return result
      }))

    }
    fetchProductData()
  }, [])

  console.log(product[0])

  return <>
    <h3>{product.brand}</h3>
  </>

}

export default randomSelection