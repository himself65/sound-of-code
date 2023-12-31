import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export function Tutorial5 () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial5 | Sound of Code' />

      <div className="slidetext">
            <p>5. Get error feedback and be able to fix it.</p>
        </div>
      <div className="slide">
        <img src={'/img/tutorial/5.gif'}
            alt='Pressed play button. Virtual console shows syntax error.'/>
    </div>


      <div className="buttons">
          <Link role="button" to={'/tutorial4'} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={'/tutorial6'} className="buttoncolor">
            Next
          </Link>
      </div>

      </React.Fragment>
  )
}

export default Tutorial5
