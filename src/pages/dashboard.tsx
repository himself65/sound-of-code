import { Link, Outlet } from 'react-router-dom'
import React from 'react'

export const Dashboard = () => {
  return (
    <>
      <header>
        <div className="col-sm col-md-10 col-md-offset-1">
          <Link role="button" to={'/'}>
            Home
          </Link>
          <Link role="button" to={'/sonify'}>
            Sonify Console
          </Link>
          <Link role="button" to={'/preferences'}>
            Preferences
          </Link>
          <Link role="button" to={'/about'}>
            About
          </Link>
          <Link role="button" to={'/tutorial'}>
            Tutorial
          </Link>
          <Link role="button" to={'/resources'}>
            Resources
          </Link>
          <Link role="button" to={'/question'}>
            Question
          </Link>
          <Link role="button" to={'/feedback'}>
            Feedback
          </Link>
        </div>
      </header>
      <Outlet/>
    </>
  )
}
