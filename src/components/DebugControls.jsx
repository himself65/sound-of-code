import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Debugger from '../debugger/Debugger'
import EditorContext from './EditorContext'
import { MdLoop, MdPlayArrow, MdPause, MdStop } from './Icons'
import SoundContext from './SoundContext'
import { driver } from 'driver.js'

export function DebugControls () {
  /** @type {[Debugger, React.Dispatch<Debugger>]} */
  const [debug, setDebug] = useState(null)
  const editor = useContext(EditorContext)
  const sound = useContext(SoundContext)
  // @ts-expect-error
  const { isExecuting, status } = useSelector(state => state.program)

  const playTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous'],
      steps: [
        {
          element: '#main-button',
          popover: {
            title: 'Play',
            description: 'Click this button to start playing your program.',
            side: "left",
            align: 'start'
          }
        },
        {
          element: '#stop-button',
          popover: {
            title: 'Stop',
            description: 'Click this button to stop playing your program.',
            side: "left",
            align: 'start'
          }
        },
        {
          element: '#start-button',
          popover: {
            title: 'Set Start Point',
            description: 'Click this button to set the start point of your program.',
            side: "left",
            align: 'start'
          }
        },
        {
          element: '#reset-button',
          popover: {
            title: 'Reset Start Point',
            description: 'Click this button to reset the start point of your program.',
            side: "left",
            align: 'start'
          }
        }
      ]
    });
    driverObj.drive();
  }, [])

  const handleStop = useCallback(() => {
    if (debug) {
      debug.stop()
    }
  }, [debug])

  const handleStartPoint = useCallback(() => {
    if (editor) {
      editor.setStartpoint()
    }
  }, [editor])

  const handleResestPoint = useCallback(() => {
    if (editor) {
      editor.resetStartpoint()
    }
  }, [editor])

  useEffect(() => {
    if (!debug) {
      setDebug(new Debugger(editor, sound))
    } else {
      debug.setEditor(editor)
      debug.setSound(sound)
    }

    return () => {
      if (debug) {
        debug.stop()
      }
    }
  }, [debug, editor, sound])

  return (
    <div className='col-sm-offset-2 col-sm-8 col-md-offset-1 col-md-10 col-lg-offset-0 col-lg-6'>
      <span
        style={{
          display: 'inline-block',
          minWidth: '10em',
          textAlign: 'center',
          letterSpacing: 1.5
        }}
      >
        Player is {status}
      </span>

      <section className='button-group'>
        <MainButton id="main-button" debug={debug} />

        <button onClick={handleStop} id="stop-button" disabled={!isExecuting}>
          Stop <MdStop />
        </button>

        <button onClick={handleStartPoint} disabled={isExecuting} id="start-button">
          Set Start Point
        </button>

        <button onClick={handleResestPoint} id="reset-button">Reset Start Point</button>
        <button onClick={playTour} id="tour-button">Tour</button>
      </section>
    </div>
  )
}

/**
 * @param {object} props
 * @param {Debugger} props.debug
 * @param {string | undefined} props.id
 */
export function MainButton (props) {
  const { debug } = props
  const { isExecuting, status, weaverStatus } = useSelector(
    // @ts-expect-error
    state => state.program
  )

  const handleStart = useCallback(async () => {
    if (debug) {
      await debug.codecover().catch(console.error)
    }
  }, [debug])

  const handlePause = useCallback(() => {
    if (debug) {
      debug.pause()
    }
  }, [debug])

  const handleResume = useCallback(() => {
    if (debug) {
      debug.resume()
    }
  }, [debug])

  if (!isExecuting) {
    switch (weaverStatus) {
      case 'parsing':
        return (
          <button className='primary' id={props.id} disabled>
            Parsing <MdLoop />
          </button>
        )

      default:
        return (
          <button className='primary' id={props.id} onClick={handleStart}>
            Play <MdPlayArrow />
          </button>
        )
    }
  } else {
    switch (status) {
      case 'playing':
        return (
          <button className='primary' id={props.id} onClick={handlePause}>
            Pause <MdPause />
          </button>
        )

      case 'paused':
        return (
          <button className='primary' id={props.id} onClick={handleResume}>
            Resume <MdPlayArrow />
          </button>
        )
    }
  }
}

export default DebugControls
