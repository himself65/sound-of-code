import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import '../styles/main.less'

export function Tutorial (): ReactElement {
  return (
    <React.Fragment>
      <Helmet title="Tutorial | Sound of Code"/>
      <div className="slidetext">
        <p>1. Start typing your code in the editor section and click 'Play' to
          sonify your code.</p>
      </div>
      <div className="slide">
        <img src={'./img/tutorial/1.gif'}
             alt="Typing JavaScript code into editor, then pressing the play button."/>
      </div>
      <div className="buttons">
        <Link role="button" to={'/tutorial6'} className="buttoncolor">
          Prev
        </Link>
        <Link role="button" to={'/tutorial2'} className="buttoncolor">
          Next
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Tutorial
