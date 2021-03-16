import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'
import ProductCard from '../components/ProductCard.js'
import Paginate from '../components/Paginate.js'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.js'
const token = localStorage.getItem('token')


function Profile({ match }) {
  const [userData, updateUserData] = useState('')
  const [isOwner, updateIsOwner] = useState(false)
  const [errorbox, updateErrorbox] = useState('')
  const [pageNumListings, updatePageNumListings] = useState(1)
  const [pageNumOrders, updatePageNumOrders] = useState(1)
  const [pageNumWishlist, updatePageNumWishlist] = useState(1)
  const [tab, updateTab] = useState('Listings')
  const resultsPerPage = 4
  const LoggedInUserId = getLoggedInUserId()


  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    if (match.params.userId) {
      try {
        const { data } = await axios.get(`/api/users/${match.params.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.errors) {
          updateErrorbox('Sorry - could not find that user profile')
        } else {
          if (LoggedInUserId === data.id) {
            updateIsOwner(true)
          }
          updateUserData(data)
        }
      } catch (err) {
        console.log(err)
        updateErrorbox('Sorry - could not find that user profile')
      }
    } else {
      updateErrorbox('Sorry - no user ID supplied')
    }
  }

  function handlePageChange(newValue, location) {
    if (location === 'Listings') {
      updatePageNumListings(newValue)
    } else if (location === 'Orders') {
      updatePageNumOrders(newValue)
    } else if (location === 'Wishlist') {
      updatePageNumWishlist(newValue)
    }
  }

  async function removeFromWishlist(productId, userId) {
    try {
      const { data } = await axios.delete(`/api/users/${userId}/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.errors) {
        console.log(data.errors)
      } else {
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
    fetchUser()
  }


  return <>
    <Navbar />
    <div className='container mx-4 mt-4 mb4'>

      {userData &&
        <div className='columns is-vcentered'>
          <div className='column is-narrow'>
            <img src={userData.image} className='profile-image'></img>
          </div>

          <div className='column is-narrow'>
            <h1 className='title mb-1'>{userData.username}</h1>

            <p><i className='fas fa-map-marker-alt mr-1'></i> {userData.location}</p>
            {isOwner &&
              <div className='buttons'>
                <Link className='mt-2 button is-primary' to={`/edituser/${userData.id}`}>Edit your profile</Link>
                <button className={`mt-2 button ${tab !== 'Listings' && 'is-primary'}`} onClick={() => updateTab('Listings')}>Listings</button>
                <button className={`mt-2 button ${tab !== 'Orders' && 'is-primary'}`} onClick={() => updateTab('Orders')}>Order history</button>
                <button className={`mt-2 button ${tab !== 'Wishlist' && 'is-primary'}`} onClick={() => updateTab('Wishlist')}>Wishlist</button>
              </div>
            }
          </div>
        </div>
      }


      {errorbox && <div className='box mt-4 has-background-danger has-text-white'>{errorbox}</div>}

      {tab === 'Listings' &&
        <>
          {userData.product &&
            <div className='box'>
              <div className='columns is-vcentered'>
                <div className='column'>
                  <h5 className='title is-size-5'>Listings</h5>
                </div>
                {isOwner && <div className='column is-narrow'>
                  <Link to='/productform' className='button is-primary'>Add listing</Link>
                </div>}
              </div>

              {userData.product.length === 0 ?
                <p>No products listed yet</p>
                :
                <div>
                  <Paginate
                    onChange={handlePageChange}
                    pageNum={pageNumListings}
                    location='Listings'
                    totalResults={userData.product.length}
                    resultsPerPage={resultsPerPage}
                  />
                  <div className='columns is-multiline'>
                    {userData.product.slice((pageNumListings - 1) * resultsPerPage, ((pageNumListings - 1) * resultsPerPage) + resultsPerPage).map((product, index) => {
                      return <ProductCard
                        key={index}
                        location='Listings'
                        productId={product.id}
                        productName={product.product_name}
                        productImage={product.product_image}
                        productPrice={product.price}
                        productSize={product.size}
                        productCategory={product.category}
                        productCondition={product.condition}
                        productGender={product.gender}
                        productDescription={product.description}
                        userId={match.params.userId}
                        removeFromWishlist={removeFromWishlist}
                      />
                    })}
                  </div>
                </div>
              }

            </div>
          }
        </>
      }
      {tab === 'Orders' &&
        <>
          {isOwner &&
            <div className='box'>
              <h5 className='title is-size-5'>Order history</h5>
              {userData.order_history && <div>
                {userData.order_history.length === 0 ?
                  <p>No products purchased yet</p>
                  :
                  <div>
                    <Paginate
                      onChange={handlePageChange}
                      pageNum={pageNumOrders}
                      location='Orders'
                      totalResults={userData.order_history.length}
                      resultsPerPage={resultsPerPage}
                    />
                    <div className='columns is-multiline'>
                      {userData.order_history.slice((pageNumOrders - 1) * resultsPerPage, ((pageNumOrders - 1) * resultsPerPage) + resultsPerPage).map((item, index) => {
                        return <ProductCard
                          key={index}
                          location='Orders'
                          productId={item.product.id}
                          productName={item.product.product_name}
                          productImage={item.product.product_image}
                          productPrice={item.product.price}
                          productSize={item.product.size}
                          productCategory={item.product.category}
                          productCondition={item.product.condition}
                          productGender={item.product.gender}
                          productDescription={item.product.description}
                          purchaseDate={item.created_at}
                          userId={match.params.userId}
                          removeFromWishlist={removeFromWishlist}
                        />
                      })}
                    </div>
                  </div>
                }
              </div>}
            </div>
          }
        </>
      }

      {tab === 'Wishlist' &&
        <>
          {isOwner &&
            <div className='box'>
              <h5 className='title is-size-5'>Wishlist</h5>
              {userData.wishlist && <div>
                {userData.wishlist.length === 0 ?
                  <p>No products saved to wishlist</p>
                  :
                  <div>
                    <Paginate
                      onChange={handlePageChange}
                      pageNum={pageNumWishlist}
                      location='Wishlist'
                      totalResults={userData.wishlist.length}
                      resultsPerPage={resultsPerPage}
                    />
                    <div className='columns is-multiline'>
                      {userData.wishlist.slice((pageNumWishlist - 1) * resultsPerPage, ((pageNumWishlist - 1) * resultsPerPage) + resultsPerPage).map((item, index) => {
                        return <ProductCard
                          key={index}
                          location='Wishlist'
                          productId={item.id}
                          productName={item.product.product_name}
                          productImage={item.product.product_image}
                          productPrice={item.product.price}
                          productSize={item.product.size}
                          productCategory={item.product.category}
                          productCondition={item.product.condition}
                          productGender={item.product.gender}
                          productDescription={item.product.description}
                          userId={match.params.userId}
                          removeFromWishlist={removeFromWishlist}
                        />
                      })}
                    </div>
                  </div>
                }
              </div>}
            </div>
          }
        </>
      }



    </div>
  </>
}

export default Profile