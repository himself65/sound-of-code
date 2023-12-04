import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import Console from '../components/Console'
import DebugControls from '../components/DebugControls'
import Examples from '../components/Examples'
import File from '../components/File'
import Input from '../components/Input'
import PlaybackControls from '../components/PlaybackControls'
import ScopeMap from '../components/ScopeMap'

export function Sonify (): ReactElement {
  return (
    <React.Fragment>
      <Helmet title='Sonify | Sound of Code' />

      <div className='row'>
        <DebugControls />
        <PlaybackControls />
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <Input />
        </div>

        <div className='row col-sm-12 col-md-6 col-lg-offset-1 col-lg-5'>
          <Console />
          <ScopeMap />
        </div>
      </div>

      <div className='row'>
        <File emailContact='soc@quarterfull.com' />
        <Examples />
      </div>
    </React.Fragment>
  )
}

export default Sonify
