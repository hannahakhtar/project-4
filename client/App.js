import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test/backend" component={TestBackend} />
    </Switch>
  </BrowserRouter>
)

const Home = () => <Link to={'/test/backend'}>
  Go to /hello/world page.
</Link>

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