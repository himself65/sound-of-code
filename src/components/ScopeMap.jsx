import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function ScopeMap () {
  const displayRef = useRef(null)
  /** @type {ReadonlyMap<string, string>} */
  const map = useSelector(state => state.program.varMap)

  useEffect(() => {
    const ref = displayRef.current

    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
  })

  const varList = !map
    ? null
    : Array.from(map.entries()).map(([key, value], index) => (
      <span key={index}>
        {key}: {value}
      </span>
    ))

  return (
    <div className='scope-map col-sm-12'>
      <div className='variables' ref={displayRef}>
        {varList}
      </div>
    </div>
  )
}

export default ScopeMap
