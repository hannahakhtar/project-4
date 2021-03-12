import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ! current issues:
// ! 1) do not return any results that are owned by logged in user
// ! 2) if no results, return message saying this and back button to take user to search-home endpoint

// ? To do:
// ? 1) make the results lower case (if they are a string)
// ? 2) do above

function SearchResults({ location }) {

  const [results, updateResults] = useState([])

  const searchResults = location.state.search.toLowerCase()

  async function fetchAllProducts() {
    const { data } = await axios.get('/api/products')
    const dataArray = data.map((result) => {
      const valuesArray = Object.values(result)
      // const lowerCaseArray = valuesArray.map(value => {
      //   return value.toLowerCase()
      // })
      console.log('I am all the products in arrays: ', valuesArray)
    })
    updateResults(dataArray)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  // console.log('search result on line 23: ', searchResults)
  // const mappedResults = results.map(array => {
  //   // console.log('I\'m line 24: ', array)
  //   if (array.includes(searchResults)) {
  //     console.log(array)
  //   }
  // })

  return <div>
    Search Result
  </div>
}

export default SearchResults