import React from 'react'
import { Helmet } from 'react-helmet'

import PlaybackControls from '../components/PlaybackControls'
import SoundTable from '../components/SoundTable'

export function Preferences () {
  return (
    <React.Fragment>
      <Helmet title='Preferences | Sound of Code' />

      <div className='row'>
        <h1 className='col-md-offset-1 col-md-10'>Preferences</h1>
      </div>

      <div className='row'>
        <div className='col-lg-offset-3' />

        <PlaybackControls />
      </div>

      <SoundTable />
    </React.Fragment>
  )
}

export default Preferences
