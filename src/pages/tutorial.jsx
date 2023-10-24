import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import { getUrl } from '../utils'
import "../styles/main.less"
export function Tutorial () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial | Sound of Code' />

{/* Tutorials */}



    <div className="slidetext">
            <p>1. Start typing your code in the editor section and click 'Play' to
            sonify your code.</p>
        </div>
      <div className="slide">
        <img src={getUrl('./img/tutorial/1.gif')}
            alt='Typing JavaScript code into editor, then pressing the play button.'/>
    </div>


      <div className="buttons">
          <Link role="button" to={getUrl('./tutorial6')} className="buttoncolor">
            Prev
          </Link>
          <Link role="button" to={getUrl('./tutorial2')} className="buttoncolor">
            Next
          </Link>
      </div>





      </React.Fragment>
  )
}

export default Tutorial