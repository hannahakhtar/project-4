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

  async function removeFromWishlist(WishlistItemId, userId) {
    try {
      const { data } = await axios.delete(`/api/users/${userId}/wishlist/${WishlistItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err)
    }
    fetchUser()
  }

  return <>
    <Navbar />
    <div className="hero is-fullheight-with-navbar">
      <div>
        <div className="container pt-5 pb-5 px-4">

          {userData &&
            <div className='columns is-vcentered mb-5'>
              <div className='column is-narrow'>
                <img src={userData.image} className='profile-image'></img>
              </div>

              <div className='column is-narrow'>
                <h1 className='title is-size-3 mb-1'>{userData.username}</h1>

                <p><i className='fas fa-map-marker-alt mr-1'></i> {userData.location} 
                  {isOwner && <span className='purpletext'><i className='fas fa-pen mr-1 ml-4'></i><Link className='mt-2 is-primary purpletext' to={`/edituser/${userData.id}`}>Edit profile</Link></span>}
                </p>
                {isOwner &&
                  <div className='buttons'>

                    <button className={`mt-2 button ${tab === 'Listings' && 'is-primary'}`} onClick={() => updateTab('Listings')}>Listings</button>
                    <button className={`mt-2 button ${tab === 'Sold' && 'is-primary'}`} onClick={() => updateTab('Sold')}>Sold items</button>
                    <button className={`mt-2 button ${tab === 'Orders' && 'is-primary'}`} onClick={() => updateTab('Orders')}>Order history</button>
                    <button className={`mt-2 button ${tab === 'Wishlist' && 'is-primary'}`} onClick={() => updateTab('Wishlist')}>Wishlist</button>
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
                      <h5 className='title is-size-3'>Listings</h5>
                    </div>
                    {isOwner && <div className='column is-narrow'>
                      <Link to='/productform' className='button is-primary'>Add listing</Link>
                    </div>}
                  </div>

                  {userData.product.filter(product => product.in_stock === true).length === 0 ?
                    <p>No products listed yet</p>
                    :
                    <div>
                      <Paginate
                        onChange={handlePageChange}
                        pageNum={pageNumListings}
                        location='Listings'
                        totalResults={userData.product.filter(product => product.in_stock === true).length}
                        resultsPerPage={resultsPerPage}
                      />
                      <div className='columns is-multiline'>
                        {userData.product.filter(product => product.in_stock === true).slice((pageNumListings - 1) * resultsPerPage, ((pageNumListings - 1) * resultsPerPage) + resultsPerPage).map((product, index) => {
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


          {tab === 'Sold' &&
            <>
              {isOwner &&
                <div className='box'>
                  <h5 className='title is-size-3'>Sold items</h5>
                  {userData.product && <div>
                    {userData.product.filter(product => product.in_stock === false).length === 0 ?
                      <p>No products sold yet</p>
                      :
                      <div>
                        <Paginate
                          onChange={handlePageChange}
                          pageNum={pageNumOrders}
                          location='Orders'
                          totalResults={userData.product.filter(product => product.in_stock === false).length}
                          resultsPerPage={resultsPerPage}
                        />
                        <div className='columns is-multiline'>
                          {userData.product.filter(product => product.in_stock === false).slice((pageNumOrders - 1) * resultsPerPage, ((pageNumOrders - 1) * resultsPerPage) + resultsPerPage).map((item, index) => {
                            return <ProductCard
                              key={index}
                              location='Orders'
                              productId={item.id}
                              productName={item.product_name}
                              productImage={item.product_image}
                              productPrice={item.price}
                              productSize={item.size}
                              productCategory={item.category}
                              productCondition={item.condition}
                              productGender={item.gender}
                              productDescription={item.description}
                              purchaseDate={item.created_at}
                              userId={match.params.userId}
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




          {tab === 'Orders' &&
            <>
              {isOwner &&
                <div className='box'>
                  <h5 className='title is-size-3'>Order history</h5>
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
                  <h5 className='title is-size-3'>Wishlist</h5>
                  {userData.wishlist && <div>
                    {userData.wishlist.filter(product => product.product.in_stock === true).length === 0 ?
                      <p>No products saved to wishlist</p>
                      :
                      <div>
                        <Paginate
                          onChange={handlePageChange}
                          pageNum={pageNumWishlist}
                          location='Wishlist'
                          totalResults={userData.wishlist.filter(product => product.product.in_stock === true).length}
                          resultsPerPage={resultsPerPage}
                        />
                        <div className='columns is-multiline'>
                          {userData.wishlist.filter(product => product.product.in_stock === true).slice((pageNumWishlist - 1) * resultsPerPage, ((pageNumWishlist - 1) * resultsPerPage) + resultsPerPage).map((item, index) => {
                            return <ProductCard
                              key={index}
                              location='Wishlist'
                              productId={item.product.id}
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
                              WishlistItemId={item.id}
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
      </div>
    </div>
  </>
}

export default Profile