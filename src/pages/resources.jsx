import React from 'react'
import { Helmet } from 'react-helmet'

import { getUrl } from '../utils'

export function Resources () {
  return (
    <React.Fragment>
      <Helmet title='Tutorial & Resources | Sound of Code' />

      <div className='row'>
        <h1 className='col-sm-12 col-md-offset-1 col-md-10'>
          Tutorial & Resources
        </h1>
      </div>

      {/* Tutorials */}

      <div className='row'>
        <h3 className='col-sm-12 col-md-offset-1 col-md-10'>Tutorial</h3>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>
            1. Start typing your code in the editor section and click 'Play' to
            sonify your code.
          </p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/1.gif')}
            alt='Typing JavaScript code into editor, then pressing the play button.'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>
            2. Click 'Save' to store your code in the browser's localstorage and
            click 'Load' to reload them back at anytime.
          </p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/2.gif')}
            alt='Pressing save button. Refreshing page. Pressing load button.'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>3. Click 'Import JS File' to import your own JS files.</p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/3.gif')}
            alt='Pressing Import JS File button. Selecting JavaScript file. Contents of file are displayed in the editor.'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>
            4. Click 'Export JS File' to download codes from the editor to a JS
            file.
          </p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/4.gif')}
            alt='Pressing Export JS File button. Typing basicExample.js into prompt. Select destination directory. Contents of the editor saved into a new file.'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>5. Get error feedback and be able to fix it.</p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/5.gif')}
            alt='Pressed play button. Virtual console shows syntax error.'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-4'>
          <p>
            6. Set a breakpoint to debug your codes. Clear the breakpoint when
            you're done debugging.
          </p>
        </div>
        <div className='col-md-offset-1 col-md-5'>
          <img
            src={getUrl('./img/tutorial/6.gif')}
            alt='Set the breakpoint to debug. Clear it out when done.'
          />
        </div>
      </div>

      {/* Tutorials */}

      <div className='row'>
        <h3 className='col-sm-12 col-md-offset-1 col-md-10'>
          JavaScript Resources
        </h3>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-10'>
          <ul>
            <li>
              <a href='https://github.com/getify/You-Dont-Know-JS'>
                You Don't Know JS (book series)
              </a>
            </li>

            <li>
              <a href='https://www.khanacademy.org/computing/computer-programming/programming'>
                Khan Academy
              </a>
            </li>

            <li>
              <a href='https://javascript.info/'>The Modern JavaScript</a>
            </li>

            <li>
              <a href='https://www.tutorialspoint.com/javascript/'>
                Tutorials Point
              </a>
            </li>

            <li>
              <a href='https://www.w3schools.com/js/'>W3Schools</a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Resources
