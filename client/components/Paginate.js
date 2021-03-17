import React from 'react'

export default function Paginate({ onChange, pageNum, location, totalResults, resultsPerPage }) {

  function handlePageChange(value, location) {
    onChange(value, location)
  }

  // include pagination if there are multiple pages of results
  if (totalResults > resultsPerPage) {

    const pagesArray = []
    for (let i = 0; i < Math.ceil(totalResults / resultsPerPage); i++) {
      pagesArray.push(i + 1)
    }

    return <div className='columns'>
      <div className='column'> Total results: {totalResults} </div>
      <div className='column has-text-right has-text-left-mobile buttons'>

        {pagesArray.map((num, index) => {
          return <button index={index} onClick={() => handlePageChange((index + 1), location)} key={index} href='' className={pageNum === (index + 1) ? 'button is-primary is-small' : 'button is-small'}> {num} </button>
        })}
      </div>
    </div>

  } else {
    return <div>
      <p className='has-text-center mb-4'> Total results: {totalResults} </p>
    </div>
  }
}