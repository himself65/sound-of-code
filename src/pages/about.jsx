import React from 'react'
import { Helmet } from 'react-helmet'

import { getUrl } from '../utils'

export function About () {
  return (
    <React.Fragment>
      <Helmet title='About | Sound of Code' />

      <div className='row'>
        <h1 className='col-sm-12 col-md-offset-1 col-md-10'>About</h1>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-offset-1 col-md-10'>
          <div className='description'>
            <p>
              The sound of code started as a student project for Java at UNL
              under the guidance of professors Myra Cohen and Anita Sarma. They
              used that project to refine their sonification research for
              studying the history of git conflicts (refs) which was the basis
              of an MS thesis by Kevin North.
            </p>
            <p>
              The original version for JavaScript was developed as part of a
              2017-18 senior design team project at UNL under the guidance of
              Myra Cohen. We thank all of the original developers for their
              ideas and initial work that led to this project.
            </p>

            <p>
              In 2023 the project was taken over by an Iowa State Senior design 
              team to update the application and add new features. Working with
              what the original developrs had created, they were able to improve 
              the Sound of Code and help more people gain access to it locally.
            </p>
          </div>
        </div>
      </div>

      <div className='row'>
        <h2 className='col-sm-12 col-md-offset-1 col-md-10'>Original Team</h2>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>

      <div className='row'>
        <h3 className='col-sm-12 col-md-offset-1 col-md-10'>Lead</h3>
      </div>

      <div className='row'>
        <div className='col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/myra.jpg')} alt='Myra Cohen' />

            <div className='section'>
              <h4>Myra B. Cohen</h4>
              <p>Professor</p>
              <p>University of Nebraska-Lincoln</p>
              <p>
                <a href='https://www.cse.unl.edu/~myra'>
                  https://www.cse.unl.edu/~myra
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <h3 className='col-sm-12 col-md-offset-1 col-md-10'>Developers</h3>
      </div>

      <div className='row'>
        <div className='col-sm-offset-2 col-sm-8 col-md-offset-1 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/collin.jpg')} alt='Collin Victor' />

            <div className='section'>
              <h4>Collin Victor</h4>
              <p>Product Manager</p>
              <p>Math & Computer Science</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/mark.jpg')} alt='Mark Hernandez' />

            <div className='section'>
              <h4>Mark Hernandez</h4>
              <p>Development Manager</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/justin.jpg')} alt='Justin Sleep' />

            <div className='section'>
              <h4>Justin Sleep</h4>
              <p>Developer</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-offset-2 col-sm-8 col-md-offset-1 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/phuc.jpg')} alt='Phuc Trinh' />

            <div className='section'>
              <h4>Phuc Trinh</h4>
              <p>Developer</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/derek.jpg')} alt='Derek Waskel' />

            <div className='section'>
              <h4>Derek Waskel</h4>
              <p>Developer</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/kenny.jpg')} alt='Kenny Waskel' />

            <div className='section'>
              <h4>Kenny Waskel</h4>
              <p>Developer</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <h3 className='col-sm-12 col-md-offset-1 col-md-10'>Management</h3>
      </div>

      <div className='row'>
        <div className='col-sm-offset-2 col-sm-8 col-md-offset-1 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/christy.jpg')} alt='Christy Thomas' />

            <div className='section'>
              <h4>Christy Thomas</h4>
              <p>Project Manager</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/pierobon.jpg')} alt='Max Pierobon' />

            <div className='section'>
              <h4>Max Pierobon</h4>
              <p>Tribe Lead</p>
            </div>
          </div>
        </div>

        <div className='col-sm-offset-2 col-sm-8 col-md-offset-0 col-md-3'>
          <div className='card fluid'>
            <img src={getUrl('./img/about/nathan.jpg')} alt='Nathan Blazek' />

            <div className='section'>
              <h4>Nathan Blazek</h4>
              <p>Coach</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default About
