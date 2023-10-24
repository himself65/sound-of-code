import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import { getUrl } from '../../utils'
export function Tutorial4 () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial4 | Sound of Code' />


      <div className="slidetext">
            <p>4. Click 'Export JS File' to download codes from the editor to a JS
            file.</p>
        </div>
      <div className="slide">
        <img src={getUrl('./img/tutorial/4.gif')}
            alt='Pressing Export JS File button. Typing basicExample.js into prompt. Select destination directory. Contents of the editor saved into a new file.'/>
    </div>


      <div className="buttons">
          <Link role="button" to={getUrl('./tutorial3')} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={getUrl('./tutorial5')} className="buttoncolor">
            Next
          </Link>
      </div>



      </React.Fragment>
  )
}

export default Tutorial4