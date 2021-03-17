import React from 'react'
import { FacebookShareButton } from 'react-share'

export default function ShareButtonFacebook({ productId }) {
  const shareButtonProps = {
    url: `https://garms-shopping.herokuapp.com/products/${productId}`,
    network: 'Facebook',
    text: 'Check out this cool listing on Garms!',
    longtext:
      ''
  }

  return <FacebookShareButton {...shareButtonProps}>
    <div className="button facebook" ><i className='fab fa-facebook-f mr-2'></i>Share</div>
  </FacebookShareButton>

}