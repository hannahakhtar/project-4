import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'
import Navbar from '../components/Navbar'

function SearchResults({ match }) {

  const currentUser = getLoggedInUserId()
  const [filteredResults, updateFilteredResults] = useState([])
  const [furtherFilteredResults, updateFurtherFilteredResults] = useState([])
  const [isLoading, updateIsLoading] = useState(true)
  const [gender, updateGender] = useState([])
  const [brands, updateBrands] = useState([])
  const [sizes, updateSizes] = useState([])
  const [categories, updateCategories] = useState([])
  const [prices, updatePrices] = useState([])
  const [conditions, updateConditions] = useState([])
  const [searchResults, updateSearchResults] = useState(match.params.id)
  const [genderIsShown, updateGenderIsShown] = useState(false)
  const [brandIsShown, updateBrandIsShown] = useState(false)
  const [sizeIsShown, updateSizeIsShown] = useState(false)
  const [categoryIsShown, updateCategoryIsShown] = useState(false)
  const [priceIsShown, updatePriceIsShown] = useState(false)
  const [conditionIsShown, updateConditionIsShown] = useState(false)

  async function fetchAllProducts() {
    const { data } = await axios.get('/api/products')
    const matchesSearchArray = data.map(result => {
      if (result.brand.toLowerCase().includes(searchResults.toLowerCase()) || result.description.toLowerCase().includes(searchResults.toLowerCase()) || result.product_name.toLowerCase().includes(searchResults.toLowerCase()) || result.category.toLowerCase().includes(searchResults.toLowerCase())) {
        return result
      }
    })
    const removingUndefinedArray = matchesSearchArray.filter(x => x !== undefined).filter(x => x.user.id !== currentUser)
    const removingCurrentUser = removingUndefinedArray.filter(x => x.id !== currentUser)
    const inStockArray = removingCurrentUser.filter(result => {
      return result.in_stock === true
    })

    const genders = data.map(result => {
      return result.gender
    })
    const uniqueGenders = new Set(genders.sort())
    const uniqueGendersArray = [...uniqueGenders]

    const brands = inStockArray.map(result => {
      return result.brand
    })
    const uniqueBrands = new Set(brands.sort())
    const uniqueBrandsArray = [...uniqueBrands]

    const sizes = inStockArray.map(result => {
      return result.size
    })
    const uniqueSizes = new Set(sizes.sort())
    const uniqueSizesArray = [...uniqueSizes]

    const categories = inStockArray.map(result => {
      return result.category
    })
    const uniqueCategories = new Set(categories.sort())
    const uniqueCategoriesArray = [...uniqueCategories]

    const prices = inStockArray.map(result => {
      return result.price
    })
    const uniquePricesArray = ['Less than £10', 'Less than £25', 'Less than £50', '£50+']
    // const uniquePrices = new Set(prices.sort(function (a, b) {
    //   return a - b
    // }))
    // const uniquePricesArray = [...uniquePrices]

    const conditions = inStockArray.map(result => {
      return result.condition
    })
    const uniqueContitions = new Set(conditions.sort())
    const uniqueContitionsArray = [...uniqueContitions]

    updateGender(uniqueGendersArray)
    updateBrands(uniqueBrandsArray)
    updateSizes(uniqueSizesArray)
    updateCategories(uniqueCategoriesArray)
    updatePrices(uniquePricesArray)
    updateConditions(uniqueContitionsArray)
    updateFilteredResults(inStockArray)
    updateFurtherFilteredResults(inStockArray)
    updateIsLoading(false)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [searchResults])

  function handleGenderHover(gender) {
    try {
      const filteredGender = furtherFilteredResults.filter(result => {
        return gender === result.gender
      })
      handleGenderButtonMouseEnter()
      updateFurtherFilteredResults(filteredGender)
    } catch (err) {
      console.log(err)
    }
  }

  function handleBrandHover(brand) {
    try {
      const filteredBrand = furtherFilteredResults.filter(result => {
        return brand === result.brand
      })
      handleBrandButtonMouseEnter()
      updateFurtherFilteredResults(filteredBrand)
    } catch (err) {
      console.log(err)
    }
  }

  function handleSizeHover(size) {
    try {
      const filteredSize = furtherFilteredResults.filter(result => {
        return size === result.size
      })
      handleSizeButtonMouseEnter()
      updateFurtherFilteredResults(filteredSize)
    } catch (err) {
      console.log(err)
    }
  }

  function handleCategoryHover(category) {
    try {
      const filteredCategory = furtherFilteredResults.filter(result => {
        return category === result.category
      })
      handleCategoryButtonMouseEnter()
      updateFurtherFilteredResults(filteredCategory)
    } catch (err) {
      console.log(err)
    }
  }

  function handlePriceHover(price) {
    try {
      const filteredPrice = furtherFilteredResults.filter(result => {
        

        return price === result.price
      })
      handlePriceButtonMouseEnter()
      updateFurtherFilteredResults(filteredPrice)
    } catch (err) {
      console.log(err)
    }
  }

  function handleConditionHover(condition) {
    try {
      const filteredCondition = furtherFilteredResults.filter(result => {
        return condition === result.condition
      })
      handleConditionButtonMouseEnter()
      updateFurtherFilteredResults(filteredCondition)
    } catch (err) {
      console.log(err)
    }
  }

  function handleGenderButtonMouseEnter() {
    console.log('gender', genderIsShown)
    if (!genderIsShown) {
      updateGenderIsShown(true)
    } else {
      updateGenderIsShown(false)
    }
    // updateGenderIsShown(true)
    const dropdown = document.querySelector('.genderDropdown')
    dropdown.classList.toggle('is-active')
  }

  // handleGenderButtonMouseLeave() {
  //   if (genderIsShown) {

  //   }
  // }

  function handleBrandButtonMouseEnter() {
    const dropdown = document.querySelector('.brandDropdown')
    dropdown.classList.toggle('is-active')
    updateBrandIsShown(true)
  }

  function handleSizeButtonMouseEnter() {
    const dropdown = document.querySelector('.sizeDropdown')
    dropdown.classList.toggle('is-active')
    updateSizeIsShown(true)
  }

  function handleCategoryButtonMouseEnter() {
    const dropdown = document.querySelector('.categoryDropdown')
    dropdown.classList.toggle('is-active')
    updateCategoryIsShown(true)
  }

  function handlePriceButtonMouseEnter() {
    const dropdown = document.querySelector('.priceDropdown')
    dropdown.classList.toggle('is-active')
    updatePriceIsShown(true)
  }

  function handleConditionButtonMouseEnter() {
    const dropdown = document.querySelector('.conditionDropdown')
    dropdown.classList.toggle('is-active')
    updateConditionIsShown(true)

  }

  function genderNoOfItems(gender) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.gender === gender) {
        return item
      }
    })
    return numOfItems.length
  }

  function brandsNoOfItems(brand) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.brand === brand) {
        return item
      }
    })
    return numOfItems.length
  }

  function sizeNoOfItems(size) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.size === size) {
        return item
      }
    })
    return numOfItems.length
  }

  function categoryNoOfItems(category) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.category === category) {
        return item
      }
    })
    return numOfItems.length
  }

  function priceNoOfItems(price) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.price === price) {
        return item
      }
    })
    return numOfItems.length
  }

  function conditionNoOfItems(condition) {
    const numOfItems = furtherFilteredResults.filter(item => {
      if (item.condition === condition) {
        return item
      }
    })
    return numOfItems.length
  }

  function clearFilters() {
    fetchAllProducts()
  }

  let displaySearchResults

  if (furtherFilteredResults.length > 0) {
    displaySearchResults = <>
      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {furtherFilteredResults.map((item, index) => {
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
    </>
  }

  if (filteredResults.length === 0) {
    displaySearchResults = <>
      <p>Sorry, there are no results matching your search. Try again?</p>
      <Link className="button" to={{ pathname: '/search-home' }}>Back to search</Link>
    </>
  }

  if (furtherFilteredResults.length === 0) {
    displaySearchResults = <>
      <p>Sorry, there are no results matching your search. Try again?</p>
      <Link className="button" to={{ pathname: '/search-home' }}>Back to search</Link>
    </>
  }

  if (isLoading) {
    return <>
      <p>Loading...</p>
    </>
  }

  return <>
    <Navbar />
    <h2 className="search-results-searched-word">Your search results for "<strong>{searchResults}</strong>"</h2>
    <section className="search-results-filters-div">
      <div className="genderDropdown dropdown">
        <div className="dropdown-trigger">
          <button className="button search-results-filters" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleGenderButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye gender button')}>
            <span>Gender</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {genderIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello gender dropdown')} onMouseLeave={() => handleGenderButtonMouseEnter()}>
            <div className="dropdown-content">
              {gender.map((gender, index) => {
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleGenderHover(gender)}>{gender} <strong>({genderNoOfItems(gender)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className="brandDropdown dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleBrandButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye brand button')}>
            <span>Brand</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {brandIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello brand dropdown')} onMouseLeave={() => updateBrandIsShown(false)}>
            <div className="dropdown-content">
              {brands.map((brand, index) => {
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleBrandHover(brand)}>{brand} <strong>({brandsNoOfItems(brand)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className="sizeDropdown dropdown">
        <div className="dropdown-trigger">
          <button className=" button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleSizeButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye size button')}>
            <span>Size</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {sizeIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello size dropdown')} onMouseLeave={() => updateSizeIsShown(false)}>
            <div className="dropdown-content">
              {sizes.map((size, index) => {
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleSizeHover(size)}>{size} <strong>({sizeNoOfItems(size)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className="categoryDropdown dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleCategoryButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye category button')}>
            <span>Category</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {categoryIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello category dropdown')} onMouseLeave={() => updateCategoryIsShown(false)}>
            <div className="dropdown-content">
              {categories.map((category, index) => {
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleCategoryHover(category)}>{category} <strong>({categoryNoOfItems(category)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className="priceDropdown dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handlePriceButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye price button')}>
            <span>Price</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {priceIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello price dropdown')} onMouseLeave={() => updatePriceIsShown(false)}>
            <div className="dropdown-content">
              {prices.map((price, index) => {
                console.log('price: ', price)
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handlePriceHover(price)}>£{price} <strong>({priceNoOfItems(price)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className="conditionDropdown dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleConditionButtonMouseEnter()} onMouseLeave={() => console.log('Goodbye condition button')}>
            <span>Condition</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
          {conditionIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseEnter={() => console.log('Hello condition dropdown')} onMouseLeave={() => updateConditionIsShown(false)}>
            <div className="dropdown-content">
              {conditions.map((condition, index) => {
                return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleConditionHover(condition)}>{condition} <strong>({conditionNoOfItems(condition)})</strong></div>
              })}
            </div>
          </div>}
        </div>
      </div>
      <button className="button" onClick={clearFilters}>Clear filters</button>
    </section>
    <section>
      {displaySearchResults}
    </section>
  </>
}

export default SearchResults

