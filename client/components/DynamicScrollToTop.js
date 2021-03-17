import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

function DynamicScrollToTop(props) {

  useEffect(() => {
    if (props.history.action === 'POP') {
      return
    }
    const hash = props.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  })
  return (
    <div />
  )
}

export default withRouter(DynamicScrollToTop)