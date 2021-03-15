import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function randomSelection() {

  const [featuredItems, updateFeaturedItems] = useState([])


  async function fetchFeaturedItems() {
    const { data } = await axios.get('/api/products')
    const inStock = data.filter(result => {
      return result.in_stock === true
    })
    const shuffledItems = inStock.sort(() => 0.5 - Math.random())
    const featuredItems = shuffledItems.slice(0, 6)
    updateFeaturedItems(featuredItems)
  }

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  const cardStyle = {
    height: '155px'
  }

  return <>
    <div className="section p-1">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {featuredItems.map((item, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <Link to={`/products/${item.id}`}>
                <div className="card" style={cardStyle}>
                  <div className="card-image">
                    <figure className="image is 4by3">
                      <img src={item.product_image} alt={item.product_image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <h2 className="title is-6 is-centered">
                          {item.product_name}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  </>
}

export default randomSelection