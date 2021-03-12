import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function SearchHome() {

  // const [search, updateState] = useState('')
  // const [categories, updateCategories] = useState('')
  const [featuredItems, updateFeaturedItems] = useState([])

  async function fetchFeaturedItems() {
    const { data } = await axios.get('/api/products')
    const shuffledItems = data.sort(() => 0.5 - Math.random())
    const featuredItems = shuffledItems.slice(0, 6)
    console.log(featuredItems)
    updateFeaturedItems(featuredItems)
  }

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  return <>
    <div>
      <h1>Search Page</h1>
    </div>
    <section>
      <h4>Search</h4>
      <form>
        <label>
          Search:
          <input type="text" name="Search here" />
        </label>
        <Link className="button" value="Search" to}>Search</Link>
      </form>
    </section>

    <section>
      <h4>Categories</h4>
    </section>
    
    <section>
      <h4>Featured Items</h4>
      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {featuredItems.map((item, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                <Link key={item.id} to={{
                  pathname: `/products/${item.id}`,
                  state: { item }
                }}>
                  <div className="card">
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
                      <div className="content">
                        £{item.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  </>
}

export default SearchHome