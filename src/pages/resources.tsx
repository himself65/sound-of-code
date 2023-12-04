import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

export function Resources (): ReactElement {
  return (
    <React.Fragment>
      <Helmet title="Resources | Sound of Code"/>
      <div className="row">
        <h1 className="col-sm-12 col-md-offset-1 col-md-10">
          Resources
        </h1>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-offset-1 col-md-10">
          <ul>
            <li>
              <a href="https://github.com/getify/You-Dont-Know-JS">
                You Don't Know JS (book series)
              </a>
            </li>

            <li>
              <a
                href="https://www.khanacademy.org/computing/computer-programming/programming">
                Khan Academy
              </a>
            </li>

            <li>
              <a href="https://javascript.info/">The Modern JavaScript</a>
            </li>

            <li>
              <a href="https://www.tutorialspoint.com/javascript/">
                Tutorials Point
              </a>
            </li>

            <li>
              <a href="https://www.w3schools.com/js/">W3Schools</a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Resources
