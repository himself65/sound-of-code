import React, { useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clear } from '../actions/console'
import type { AppState } from '../reducers'
import type { ConsoleState } from '../reducers/console'

export function Console () {
  const logRef = useRef(null)
  const dispatch = useDispatch()
  const log = useSelector<AppState, ConsoleState>(state => state.console)

  const clearConsole = useCallback(() => dispatch(clear()), [dispatch])

  useEffect(() => {
    const logDisplay = logRef.current
    logDisplay.scrollTop = logDisplay.scrollHeight
  })

  const logMessages = log.join('\n')

  return (
    <div className='virtual-console col-sm-12'>
      <div className='log' ref={logRef}>
        {logMessages}
      </div>

      <button onClick={clearConsole} className='small'>
        Clear Console
      </button>
    </div>
  )
}

export default Console
