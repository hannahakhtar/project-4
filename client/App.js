import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'
import 'bulma'


import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import EditProducts from './containers/EditProducts'
import AddProducts from './containers/AddProducts'
import SearchHome from './containers/SearchHome'
import SearchResults from './containers/SearchResults'
import Profile from './containers/Profile'
import Checkout from './containers/Checkout'
import SingleProduct from './containers/SingleProduct'

const App = () => {
  return <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/edit-products" component={EditProducts} />
        <Route exact path="/add-product" component={AddProducts} />
        <Route exact path="/search-home" component={SearchHome} />
        <Route exact path="/search-results" component={SearchResults} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/products/:id" component={SingleProduct} />
      </Switch>
    </BrowserRouter>
  </>
}



// ! Just a little component to test that you can talk to your flask server, check if it
// ! works in network tab.
const TestBackend = () => {
  useEffect(() => {
    // ? This is going to try localhost:5000/api
    axios.get('/api')
      .then(({ data }) => console.log(data))
  }, [])

  return <p>
    Hello World
  </p>
}

export default App