import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'

function randomSelection() {

  const [featuredItems, updateFeaturedItems] = useState([])
  const currentUser = getLoggedInUserId()

  async function fetchFeaturedItems() {

    const { data } = await axios.get('/api/products')
    const inStock = data.filter(result => {
      return result.in_stock === true
    })
    const shuffledItems = inStock.sort(() => 0.5 - Math.random()).filter(x => x.user.id !== currentUser)
    const featuredItems = shuffledItems.slice(0, 6)
    updateFeaturedItems(featuredItems)
  }

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  return <>
    <div className="section p-1">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {featuredItems.map((item, index) => {
            return <div key={index} className="column is-one-third-desktop is-one-third-tablet is-half-mobile">
              <Link to={`/products/${item.id}`} >
                <section>
                  <div className="card">
                    <div className="card-image pt-5">
                      <figure className="image is-4by3 mr-5 ml-5">
                        <img src={item.product_image} alt={item.product_name} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <h2 className="title is-6 is-centered">{item.product_name}</h2>
                      </div>
                    </div>
                  </div >
                </section>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  </>
}

export default randomSelection

