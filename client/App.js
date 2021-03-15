import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import 'bulma'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import ProductForm from './containers/ProductForm'
import SearchHome from './containers/SearchHome'
import SearchResults from './containers/SearchResults'
import Profile from './containers/Profile'
import Checkout from './containers/Checkout'
import SingleProduct from './containers/SingleProduct'
import EditUser from './containers/EditUser'


const App = () => {
  return <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login/:message" component={Login} />
        <Route exact path="/productform" component={ProductForm} />
        <Route exact path="/productform/:productId" component={ProductForm} />
        <Route exact path="/search-home" component={SearchHome} />
        <Route exact path="/search-results/:id" component={SearchResults} />
        <Route exact path="/users" component={Profile} />
        <Route exact path="/users/:userId" component={Profile} />
        <Route exact path="/edituser/" component={EditUser} />
        <Route exact path="/edituser/:userId" component={EditUser} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/products/:id" component={SingleProduct} />
        
      </Switch>
    </BrowserRouter>
  </>
}

export default App