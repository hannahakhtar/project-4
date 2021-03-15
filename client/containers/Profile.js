import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'
import ProductCard from '../components/ProductCard.js'
import { Link } from 'react-router-dom'
const token = localStorage.getItem('token')


function Profile({ match, history }) {
  const [userData, updateUserData] = useState('')
  const [isOwner, updateIsOwner] = useState(false)
  const [loading, updateLoading] = useState(true)
  const [errorbox, updateErrorbox] = useState('')
  const LoggedInUserId = getLoggedInUserId()

  useEffect(() => {
    async function fetchProduct() {

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
            updateLoading(false)
          }


        } catch (err) {
          console.log(err)
          updateErrorbox('Sorry - could not find that user profile')
          updateLoading(false)
        }
      } else {
        updateErrorbox('Sorry - no user ID supplied')
      }
    }
    fetchProduct()

 

  }, [])







  return <div className='container mx-4 mt-4 mb4'>

    {userData &&
      <div className='columns is-vcentered'>
        <div className='column is-narrow'>
          <img src={userData.image} className='profile-image'></img>
        </div>

        <div className='column is-narrow'>
          <h1 className='title mb-1'>{userData.username}</h1>

          <p><i className='fas fa-map-marker-alt mr-1'></i> {userData.location}</p>
          {isOwner && <Link to={`editprofile/${userData.id}`} className='mt-2 button is-primary'>Edit your profile</Link>}
        </div>
      </div>
    }


    {errorbox && <div className='box mt-4 has-background-danger has-text-white'>{errorbox}</div>}


    {userData.product && <div className='box'>


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
        <div className='columns is-multiline'>
          {userData.product.map((product, index) => {
            return <ProductCard
              key={index}
              productId={product.id}
              productName={product.product_name}
              productImage={product.product_image}
              productPrice={product.price}
              productSize={product.size}
              productCategory={product.category}
              productCondition={product.condition}
              productGender={product.gender}
              productDescription={product.description}
            />
          })}
        </div>
      }

    </div>
    }
    {isOwner && <div className='box'>
      <h5 className='title is-size-5'>Order history</h5>
      {userData.order_history && <div>
        {userData.order_history.length === 0 ?
          <p>No products purchased yet</p>
          :
          <div className='columns is-multiline'>
            {userData.order_history.map((item, index) => {
              return <ProductCard
                key={index}
                productId={item.product.id}
                productName={item.product.product_name}
                productImage={item.product.product_image}
                productPrice={item.product.price}
                productSize={item.product.size}
                productCategory={item.product.category}
                productCondition={item.product.condition}
                productGender={item.product.gender}
                productDescription={item.product.description}
              />
            })}
          </div>
        }
      </div>}
    </div>
    }
    {isOwner && <div className='box'>
      <h5 className='title is-size-5'>Wishlist</h5>
      {userData.order_history && <div>
        {userData.order_history.length === 0 ?
          <p>No products saved to wishlist</p>
          :
          <div className='columns is-multiline'>
            {userData.wishlist.map((item, index) => {
              return <ProductCard
                key={index}
                productId={item.product.id}
                productName={item.product.product_name}
                productImage={item.product.product_image}
                productPrice={item.product.price}
                productSize={item.product.size}
                productCategory={item.product.category}
                productCondition={item.product.condition}
                productGender={item.product.gender}
                productDescription={item.product.description}
              />
            })}
          </div>
        }
      </div>}
    </div>
    }


  </div>
}

export default Profile