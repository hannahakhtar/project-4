import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// * current bugs:
// * 1) enter button doesn't work to search
// * 2) when featured products are populated, ensure that the logged in user's products do not show
// * 3) pagination on categories
// * 4) on click, take user through to results page with items that match the categories - current onclick isn't passing through state.

function SearchHome() {

  const [search, updateSearch] = useState('')
  const [featuredItems, updateFeaturedItems] = useState([])
  const [allCategories, updateAllCategories] = useState([])
  const [categoryChosen, updateCategoryChosen] = useState('')

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
          <input type="text" placeholder="search Garms" onChange={(e) => updateSearch(e.target.value)} />
        </label>
        <Link className="button" value="search" to={{
          pathname: '/search-results',
          state: { search }
        }}>Click to search</Link>
      </form>
    </section>

    <section>
      <h4>Categories</h4>
      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {allCategories.map((category, index) => {
              return <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile" onClick={() => updateCategoryChosen(category)}>
                <Link key={category} to={{
                  pathname: '/search-results',
                  state: { categoryChosen }
                }}>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <h2 className="title is-6 is-centered">
                            {category}
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
      <h4>Our favourites!</h4>
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