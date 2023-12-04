import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export function Tutorial2 () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial2 | Sound of Code' />


      <div className="slidetext">
            <p>2. Click 'Save' to store your code in the browser's localstorage and
            click 'Load' to reload them back at anytime.</p>
        </div>
      <div className="slide">
        <img src={'/img/tutorial/2.gif'}
            alt='Pressing save button. Refreshing page. Pressing load button.'/>
    </div>

      <div className="buttons">
          <Link role="button" to={'/tutorial'} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={'/tutorial3'} className="buttoncolor">
            Next
          </Link>
      </div>




      </React.Fragment>
  )
}

export default Tutorial2
