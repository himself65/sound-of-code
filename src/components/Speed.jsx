import React, { useCallback } from 'react'

import { MdFastForward } from './Icons'

/**
 * @param {object} props
 * @param {(value: number) => void} props.onChange
 * @param {number} props.value
 */
export function Speed (props) {
  const { value, onChange } = props

  const handleChange = useCallback(
    event => {
      onChange(Number.parseFloat(event.target.value))
    },
    [onChange]
  )

  return (
    <React.Fragment>
      <input
        aria-label='speed'
        type='range'
        min='0.5'
        max='4.0'
        step='0.25'
        value={value}
        onChange={handleChange}
        style={{ margin: '14px 0 5px 0' }}
      />

      <span
        style={{
          display: 'inline-block',
          minWidth: '5em',
          position: 'relative',
          textAlign: 'center',
          top: '-10px'
        }}
      >
        {value.toFixed(2)}x <MdFastForward />
      </span>
    </React.Fragment>
  )
}

export default Speed
