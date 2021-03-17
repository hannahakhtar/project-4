import React from 'react'
// import FaFacebook from 'react-icons/lib/fa/facebook'
import { FacebookShareButton, FacebookIcon } from 'react-share'

export default function ShareButtonFacebook({ productId }) {
  const shareButtonProps = {
    url: `https:/localhost:8001/products/${productId}`,
    // change url and deployment link`,
    network: 'Facebook',
    text: 'Check out this cool listing on Garms!',
    longtext:
      ''
  }

  return <FacebookShareButton {...shareButtonProps}>
    <FacebookIcon></FacebookIcon>
  </FacebookShareButton>

}