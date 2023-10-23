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
        <h2 className='col-sm-12 col-md-offset-1 col-md-10'>Project Leads</h2>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>

      <br></br>

      <div className="image-row">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/myra.jpg" alt="Myra Cohen" />
        </div>
        <p className="caption">Myra Cohen</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/james.jpg" alt="James Lanthrop" />
        </div>
        <p className="caption">James Lanthrop</p>
      </div>
      </div>

      <br></br>

<div className='row'>
        <h2 className='col-sm-12 col-md-offset-1 col-md-10'>ISU 2023 Developers</h2>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>

      <br></br>

      <div className="image-row">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/alex.png" alt="Alex Yang" />
        </div>
        <p className="caption">Alex Yang</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/shuwei.jpg" alt="Shuwei Chang" />
        </div>
        <p className="caption">Shuwei Chang</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/gavin.jpg" alt="Gavin Hyde" />
        </div>
        <p className="caption">Gavin Hyde</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/chichang.jpg" alt="Chichang Lin" />
        </div>
        <p className="caption">Chichang Lin</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/yunjie.jpg" alt="Yunjie Li" />
        </div>
        <p className="caption">Yunjie Li</p>
      </div>
    </div>


    <br></br>
    <br></br>

    <div className='row'>
        <h2 className='col-sm-12 col-md-offset-1 col-md-10'>UNL 2017-2018 Developers</h2>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>

      <br></br>

      <div className="image-row">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/mark.jpg" alt="Mark Hernandez" />
        </div>
        <p className="caption">Mark Hernandez</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/justin.jpg" alt="Justin Sleep" />
        </div>
        <p className="caption">Justin Sleep</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/phuc.jpg" alt="Phuc Trinh" />
        </div>
        <p className="caption">Phuc Trinh</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/derek.jpg" alt="Derek Waskel" />
        </div>
        <p className="caption">Derek Waskel</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/kenny.jpg" alt="Kenny Waskel" />
        </div>
        <p className="caption">Kenny Waskel</p>
      </div>
    </div>

    <br></br>
    <br></br>

    <div className='row'>
        <h2 className='col-sm-12 col-md-offset-1 col-md-10'>UNL 2017-2018 Managers</h2>
      </div>

      <div className='row'>
        <hr className='col-sm-12 col-md-offset-1 col-md-10' />
      </div>
      <br></br>

      <div className="image-row">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/collin.jpg" alt="Collin Victor" />
        </div>
        <p className="caption">Collin Victor</p>
        <p className="caption2">Product Manager</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/christy.jpg" alt="Christy Thomas" />
        </div>
        <p className="caption">Christy Thomas</p>
        <p className="caption2">Project Manager</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/pierobon.jpg" alt="Max Pierobon" />
        </div>
        <p className="caption">Max Pierobon</p>
        <p className="caption2">Lead</p>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src="/img/about/nathan.jpg" alt="Nathan Blazak" />
        </div>
        <p className="caption">Nathan Blazak</p>
        <p className="caption2">Coach</p>
      </div>
    </div>

    </React.Fragment>
  )
}

export default About
