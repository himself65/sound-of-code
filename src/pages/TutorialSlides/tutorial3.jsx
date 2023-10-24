import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import { getUrl } from '../../utils'
export function Tutorial3 () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial3 | Sound of Code' />

      <div className="slidetext">
            <p>3. Click 'Import JS File' to import your own JS files.</p>
        </div>
      <div className="slide">
        <img src={getUrl('./img/tutorial/3.gif')}
            alt='Pressing Import JS File button. Selecting JavaScript file. Contents of file are displayed in the editor.'/>
    </div>


      <div className="buttons">
          <Link role="button" to={getUrl('./tutorial2')} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={getUrl('./tutorial4')} className="buttoncolor">
            Next
          </Link>
      </div>


      </React.Fragment>
  )
}

export default Tutorial3