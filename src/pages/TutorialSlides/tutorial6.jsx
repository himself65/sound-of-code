import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import { getUrl } from '../../utils'
export function Tutorial6 () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial6 | Sound of Code' />


      <div className="slidetext">
            <p>6. Set a breakpoint to debug your codes. Clear the breakpoint when
            you're done debugging.</p>
        </div>
      <div className="slide">
        <img src={getUrl('./img/tutorial/6.gif')}
            alt='Set the breakpoint to debug. Clear it out when done.'/>
    </div>


      <div className="buttons">
          <Link role="button" to={getUrl('./tutorial5')} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={getUrl('./tutorial')} className="buttoncolor">
            Next
          </Link>
      </div>


      </React.Fragment>
  )
}

export default Tutorial6