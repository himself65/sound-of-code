import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Debugger from '../debugger/Debugger'
import EditorContext from './EditorContext'
import { MdLoop, MdPlayArrow, MdPause, MdStop } from './Icons'
import SoundContext from './SoundContext'

export function DebugControls () {
  /** @type {[Debugger, React.Dispatch<Debugger>]} */
  const [debug, setDebug] = useState(null)
  const editor = useContext(EditorContext)
  const sound = useContext(SoundContext)
  const { isExecuting, status } = useSelector(state => state.program)

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
        <MainButton debug={debug} />

        <button onClick={handleStop}>
          Stop <MdStop />
        </button>

        <button onClick={handleStartPoint} disabled={isExecuting}>
          Set Start Point
        </button>

        <button onClick={handleResestPoint}>Reset Start Point</button>
      </section>
    </div>
  )
}

/**
 * @param {object} props
 * @param {Debugger} props.debug
 */
export function MainButton (props) {
  const { debug } = props
  const { isExecuting, status, weaverStatus } = useSelector(
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
          <button className='primary' disabled>
            Parsing <MdLoop />
          </button>
        )

      default:
        return (
          <button className='primary' onClick={handleStart}>
            Play <MdPlayArrow />
          </button>
        )
    }
  } else {
    switch (status) {
      case 'playing':
        return (
          <button className='primary' onClick={handlePause}>
            Pause <MdPause />
          </button>
        )

      case 'paused':
        return (
          <button className='primary' onClick={handleResume}>
            Resume <MdPlayArrow />
          </button>
        )
    }
  }
}

export default DebugControls
