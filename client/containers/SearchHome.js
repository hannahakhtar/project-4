import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// * current bugs:
// * 1) enter button doesn't work to search
// * 2) when featured products are populated, ensure that the logged in user's products do not show
// * 3) categories - we need to finalise a list of categories - and then populate using cards? Pagination, carosel or display all?
// * 4) on click, take user through to page with categories that match the category they click on - do we need to create all the endpoints?

function SearchHome() {

  const [search, updateSearch] = useState('')
  const [featuredItems, updateFeaturedItems] = useState([])
  const [allCategories, updateAllCategories] = useState([])

  async function fetchFeaturedItems() {
    const { data } = await axios.get('/api/products')
    const categories = data.map(result => {
      return result.category
    })
    const uniqueCategories = new Set(categories)
    const uniqueCategoriesArray = [...uniqueCategories]
    const inStock = data.filter(result => {
      return result.in_stock === true
    })
    const shuffledItems = inStock.sort(() => 0.5 - Math.random())
    const featuredItems = shuffledItems.slice(0, 6)
    updateFeaturedItems(featuredItems)
    updateAllCategories(uniqueCategoriesArray)
  }

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
  }

  return <>
    <div>
      <h1>Search Page</h1>
    </div>
    <section>
      <h4>Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" placeholder="search Garms for items and brands" onChange={(e) => updateSearch(e.target.value)} />
        </label>
        <Link className="button" value="Search" to={{
          pathname: '/search-results',
          state: { search }
        }}>Search</Link>
      </form>
    </section>

    <section>
      <h4>Categories</h4>
      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {allCategories.map((item, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                <Link key={item} to={{
                  pathname: `/products/${item}`,
                  state: { item }
                }}>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <h2 className="title is-6 is-centered">
                            {item}
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