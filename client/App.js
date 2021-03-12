import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
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

export default App