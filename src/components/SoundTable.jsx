import React, { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { soundMap } from '../sound'
import SoundContext from './SoundContext'
import Volume from './Volume'

export function SoundTable ({ uploadedSounds = [] }) {
  const types = useSelector(state => state.sound.types)
  const sound = useContext(SoundContext)

  const playUploadedSound = (uploadedSound) => {
    const audio = new Audio(uploadedSound.data);
    audio.play();
  };

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
      <div className='row'>
        <h3 className='col-md-offset-1 col-md-10'>Sound Table</h3>
      </div>

      {Object.keys(soundMap).map(
        /**
         * @param {DataType | StructureType | DebugType} type
         */
        (type, index) => (
          <SoundEntry key={index} type={type} volume={types[type].volume} />
        )
      )}
      {Object.keys(soundMap).map((type, index) => (
      <SoundEntry key={index} type={type} volume={types[type].volume} />
    ))}

    <div className='row'>
      <h4 className='col-md-offset-1 col-md-10'>Uploaded Sounds</h4>
    </div>
    
    {uploadedSounds.map((sound, index) => (
      <UploadedSoundEntry key={index} uploadsound={sound} />
    ))}

    </React.Fragment>
  )
}

/**
 * @param {object} props
 * @param {DataType | StructureType | DebugType} props.type
 * @param {number} props.volume
 */
export function SoundEntry (props) {
  const { type, volume } = props
  const sound = useContext(SoundContext)

  const setVolume = useCallback(
    volume => {
      sound.setTypeVolume(type, volume)
    },
    [sound, type]
  )

  const playSound = useCallback(() => {
    if (sound) {
      sound.play(type)
    }
  }, [sound, type])

  /** @type {import('../sound/soundmap').SoundInfo} */
  const { info } = soundMap[type]

  return (
    <div className='row'>
      <div className='col-sm-4 col-md-offset-1 col-md-2'>
        {info.displayName}
      </div>

      <div className='col-sm-8 col-md-2'>
        <button
          onClick={playSound}
          className={`${info.class}`}
          style={{
            paddingTop: '0.5em',
            paddingBottom: '0.5em',
            width: '100%'
          }}
        >
          Play
        </button>
      </div>

      <div className='col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-5'>
        <Volume onChange={setVolume} value={volume} />
      </div>
    </div>
  )
}

const UploadedSoundEntry = ({ uploadsound }) => {

  const setUploadedSoundVolume = (newVolume) => {
    if (uploadsound.audio) {
      uploadsound.audio.volume = newVolume;
    }
  };

  const playUploadedSound = () => {
    const audio = new Audio(uploadsound.data);
    audio.play().catch(e => {
      console.error("Failed to play audio:", e);
    });
  };

  return (
    <div className='row'>
      <div className='col-sm-4 col-md-offset-1 col-md-2'>
        {uploadsound.name}
      </div>

      <div className='col-sm-8 col-md-2'>
        <button
         onClick={playUploadedSound}
         className="play-button"
         style={{
            paddingTop: '0.5em',
            paddingBottom: '0.5em',
            width: '100%'
          }}
        >
          Play
        </button>
      </div>

      <div className='col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-5'>
        <Volume onChange={setUploadedSoundVolume} value={uploadsound.volume} />
        </div>
    </div>
  )
}
export default SoundTable
