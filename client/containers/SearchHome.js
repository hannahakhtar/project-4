import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getLoggedInUserId } from '../lib/auth'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard.js'
import Carousel from '../components/Carousel.js'
// import { parseConnectionUrl } from 'nodemailer/lib/shared'


function SearchHome() {

  const currentUser = getLoggedInUserId()
  const [search, updateSearch] = useState('')
  const [featuredItems, updateFeaturedItems] = useState([])
  const [allCategories, updateAllCategories] = useState([])

  async function fetchFeaturedItems() {
    const { data } = await axios.get('/api/products')
    const categories = data.map(result => {
      return result.category
    })
    const uniqueCategories = new Set(categories.sort())
    const uniqueCategoriesArray = [...uniqueCategories]
    const inStock = data.filter(result => {
      return result.in_stock === true
    })
    const shuffledItems = inStock.sort(() => 0.5 - Math.random()).filter(x => x.id !== currentUser)
    const featuredItems = shuffledItems.slice(0, 12)
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
    <Navbar />
    <section className="container">
      <form className="search-home-form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Search Garms" onChange={(e) => updateSearch(e.target.value)} />
        <Link className="button is-primary search-home-button" value="search" to={{
          pathname: `/search-results/${search}`
        }}>Click to search</Link>
      </form>
    </section>

    <section>
      <h4 className="search-home-headings">Categories</h4>
      <div className="section">
        <div className="container carousel-container">
          <div className="columns is-multiline is-mobile">
            <div className="carousel-wrapper">
              <Carousel show={3}>
                {allCategories.map((category, index) => {
                  return <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile categories">
                    <Link key={category} to={{
                      pathname: `/search-results/${category}`
                    }}>
                      <div className="card">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <h2 className="title is-centered category-card">
                                {category}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h4 className="search-home-headings">Our favourites!</h4>
      <div className="section">
        <div className="container">
          <div className="columns is-multiline">
            {featuredItems.map((item, index) => {
              return < ProductCard
                key={index}
                productId={item.id}
                productName={item.product_name}
                productImage={item.product_image}
                productPrice={item.price}
                productSize={item.size}
                productCategory={item.category}
                productCondition={item.condition}
                productGender={item.gender}
                productDescription={item.description}
              />

            })}
          </div>
        </div>
      </div>
    </section>
  </>
}

export default SearchHome

