import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// ! current issues:
// ! 1) when user clicks enter if typing in input, page reloads - stop this from happening
// ! 2) when featured products are populated, ensure that the logged in user's products do not show
// ! 3) does state need updating for search bar - page isn't reloading when user clicks back arrow from search-results endpoint
// ! 4) categories - we need to finalise a list of categories and decide how to display (via front or backend) - and then populate using cards? Pagination, carosel or display all?

function SearchHome() {

  const [search, updateSearch] = useState('')
  // const [categories, updateCategories] = useState('')
  const [featuredItems, updateFeaturedItems] = useState([])

  async function fetchFeaturedItems() {
    const { data } = await axios.get('/api/products')
    const shuffledItems = data.sort(() => 0.5 - Math.random())
    const featuredItems = shuffledItems.slice(0, 6)
    updateFeaturedItems(featuredItems)
  }

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  console.log(search)
  return <>
    <div>
      <h1>Search Page</h1>
    </div>
    <section>
      <h4>Search</h4>
      <form>
        <label>
          Search:
          <input type="text" placeholder="search Garms" onChange={(e) => updateSearch(e.target.value)}/>
        </label>
        <Link className="button" value="Search" to={{
          pathname: '/search-results',
          state: { search }
        }}>Search</Link>
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