import React, { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Speed from './Speed'
import Theme from './Theme'
import Volume from './Volume'
import SoundContext from './SoundContext'

export function PlaybackControls () {
  // @ts-expect-error
  const { speed, theme, volume } = useSelector(state => state.sound)

  const sound = useContext(SoundContext)

  const handleVolume = useCallback(
    value => {
      if (sound) {
        sound.setVolume(value)
      }
    },
    [sound]
  )
  const handleSpeed = useCallback(
    value => {
      if (sound) {
        sound.setSpeed(value)
      }
    },
    [sound]
  )
  const handleTheme = useCallback(
    value => {
      if (sound) {
        sound.setTheme(value)
      }
    },
    [sound]
  )

  useEffect(
    () => () => {
      if (sound) {
        sound.stop()
      }
    },
    [sound]
  )

  return (
    <React.Fragment>
      <div className='col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-4 col-lg-offset-0 col-lg-2'>
        <Volume onChange={handleVolume} value={volume} />
      </div>

      <div className='col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-4 col-lg-2'>
        <Speed onChange={handleSpeed} value={speed} />
      </div>

      <div className='col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-2 col-lg-2'>
        <Theme
          onChange={handleTheme}
          themes={[
            { label: 'Default', value: 'default' },
            { label: 'Easy Listening', value: 'second' }
          ]}
          value={theme}
        />
      </div>
    </React.Fragment>
  )
}

export default PlaybackControls
