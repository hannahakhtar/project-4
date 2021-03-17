import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomSelection from '../components/randomSelection'
import { getLoggedInUserId } from '../lib/auth.js'
import Navbar from '../components/Navbar'
import ShareButton from '../components/facebookShare'
import { update } from 'lodash'

function SingleProduct({ match, history }) {

  const productId = match.params.id
  const loggedInUserId = getLoggedInUserId()
  const token = localStorage.getItem('token')
  const [product, updateProduct] = useState({})
  const [user, updateUser] = useState({})
  const [inWishlist, updateIsInWishlist] = useState(false)
  const [wishlistId, updateWishlistId] = useState(0)

  async function fetchProductData() {
    const { data } = await axios.get(`/api/products/${productId}`)
    updateProduct(data)
  }

  async function fetchUserData() {
    const { data } = await axios.get(`/api/users/${loggedInUserId}`)
    updateUser(data)
    const wishlistItem = data.wishlist.find(item => item.product.id === parseInt(match.params.id))
    if (wishlistItem) {

      updateIsInWishlist(true)
      updateWishlistId(wishlistItem.id)
    }
  }

  useEffect(() => {
    fetchProductData()
    fetchUserData()
  }, [productId])

  async function handleWishlist() {
    try {
      const { data } = await axios.post(`/api/users/${loggedInUserId}/wishlist/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateIsInWishlist(true)
      updateWishlistId(data.id)
    } catch (err) {
      console.log(err)
    }
  }

  async function removeFromWishlist() {
    try {
      const { data } = await axios.delete(`/api/users/${loggedInUserId}/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateIsInWishlist(false)
      updateWishlistId(0)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDelete() {
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push(`/users/${loggedInUserId}`)
  }

  function handleInStock() {
    if (loggedInUserId === (product.user && product.user.id)) {
      return
    } else {
      if (product.in_stock === true) {
        return <>
          <Link className="button is-primary" to={{
            pathname: '/checkout',
            state: {
              product: product
            }
          }}>Buy now</Link>
        </>
      }
    }
  }

  const boxStyle = {
    margin: 'auto',
    display: 'block'
  }

  const borderStyle = {
    border: '2px solid black'
  }

  const imageStyle = {
    borderRadius: '100%'
  }
  
  return <>
    <Navbar />
    <div className="container mt-6">
      <div className="columns is-tablet">
        <div className="column ml-3 mr-3 pb-0">
          <section className="card">
            <div className="card-image">
              <figure className="image is-square">
                <img src={product.product_image} alt={product.product_name} />
              </figure>
              {product.in_stock === false ? <h4 className="has-text-centered"><strong className="is-size-1 has-text-danger">Sold</strong></h4> : <></>}
            </div>
          </section>
        </div>
        <div className="column pt-0">
          <section className="content m-3">
            <div>
              <h3 className="title"><strong>{product.product_name}</strong></h3>
            </div>
            <div>
              <p className='block'><strong>Description:</strong> {product.description}</p>
              <p className='block'><strong>Size:</strong> {product.size}</p>
              <p className='block'><strong>Condition:</strong> {product.condition}</p>
              <p className='block'><strong>Brand:</strong> {product.brand}</p>
              <p className='block'><strong>Price:</strong> £{product.price}</p>
            </div>
            <div className='buttons mt-5'>
              {handleInStock()}



              {product.user && <>
                {loggedInUserId === product.user.id &&
                  <>
                    {product.in_stock &&
                      <>
                        <Link to={`/productform/${productId}`} className="button is-primary">Edit</Link>
                        <button className="button is-primary" onClick={handleDelete}>Delete</button>
                      </>
                    }
                  </>
                }
              </>}


              {product.user && <>
                {loggedInUserId !== product.user.id && <>

                  {inWishlist ?
                    <button className="button" onClick={removeFromWishlist}><i className='fas fa-heart mr-2'></i> Remove From Wishlist</button>
                    :
                    <button className="button" onClick={handleWishlist}><i className='fas fa-heart mr-2'></i> Add To Wishlist</button>
                  }
                </>
                }
              </>}
              <ShareButton
                productId={productId}
              />

            </div>

            {product.user && <div className='columns mt-4'>
              <div className='column is-narrow'>
                <Link to={`/users/${product.user.id}`}><img className="image is-32x32" src={product.user.image} style={imageStyle} /></Link>
              </div>
              <div className='column'>
                <p className='is-size-7 has-text-left mb-0'>Listed by:</p>
                <Link to={`/users/${product.user.id}`}><h4 className="sub-title has-text-left">{product.user.username}</h4></Link>
              </div>
            </div>
            }
            <section className="content" style={boxStyle}>
              <div className="content mt-4 is-flex" style={borderStyle}>
                <img className="image is-32x32 is-rounded m-3" src={'https://i.pinimg.com/originals/49/cd/d8/49cdd84297f34cb03fabe17eb346adb3.png'} />
                <h6 className="has-text-left mt-1 mb-1 mr-3 p-2">All in app purchases are covered by Buyer Protection</h6>
              </div>
            </section>
          </section>
        </div>
      </div>
      <section className="content m-3">
        <h4>More things you might like</h4>
        <RandomSelection />
      </section>
    </div>
  </>
}

export default SingleProduct

