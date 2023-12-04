import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import "../styles/main.less"

export function Home (): ReactElement {
  return (
    <React.Fragment>
      <Helmet title='Sound of Code' />

      <div className='row'>
        <div className='col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10'>
          <h1>Welcome</h1>

          <div className='description'>
            <p>
              The sound of code is an interactive JavaScript environment for
              learning (and hearing) JavaScript. We leverage state of the art
              sonification techniques to augment your code. You simply write
              JavaScript (or load from a file) and our system annotates it with
              sounds. You will be able to hear the difference between different
              data types and structures as well as hear both syntax and runtime
              errors.
            </p>
            <p>We hope you enjoy this site. Now sit back, listen and learn!</p>
          </div>
        </div>
      </div>

      <div className='row'>
        <hr className='col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10' />
      </div>

      <div className='row'>
        <div className='col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10'>
          <h2>Navigating the Site</h2>

          <div className='description'>
            <p>
              To get started with our interactive development evironment (IDE)
              go to the Sonify tab. At the bottom of that tab, you can listen to
              the map of sounds and/or load example programs into the IDE. Or
              you can just load your own JavaScript file or type it in directly.
              We also provide some general JavaScript resources (JS Resources)
              for learning to code and a set of tutorials for working with our
              system.
            </p>
          </div>
        </div>
      </div>

      <div className='buttons'>
        <Link role="button" to={'/sonify'} className="button_color_green">
            Get started now!
          </Link>
      </div>

    </React.Fragment>
  )
}

export default Home
