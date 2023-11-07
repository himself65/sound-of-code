import { Link, Outlet } from 'react-router-dom'
import { getUrl } from '../utils'
import React from 'react'

export const Dashboard = () => {
  return (
    <>
      <header>
        <div className="col-sm col-md-10 col-md-offset-1">
          <Link role="button" to={getUrl('./')}>
            Home
          </Link>
          <Link role="button" to={getUrl('./sonify')}>
            Sonify Console
          </Link>
          <Link role="button" to={getUrl('./preferences')}>
            Preferences
          </Link>
          <Link role="button" to={getUrl('./about')}>
            About
          </Link>
          <Link role="button" to={getUrl('./tutorial')}>
            Tutorial
          </Link>
          <Link role="button" to={getUrl('./resources')}>
            Resources
          </Link>
          <Link role="button" to={getUrl('./question')}>
            Question
          </Link>
        </div>
      </header>
      <Outlet/>
    </>
  )
}
