import React, { useCallback } from 'react'

import { MdVolumeOff, MdVolumeMute, MdVolumeDown, MdVolumeUp } from './Icons'

/**
 * @param {object} props
 * @param {(value: number) => void} props.onChange
 * @param {number} [props.value]
 */
export function Volume (props) {
  const { onChange, value = 100 } = props

  const handleChange = useCallback(
    event => {
      const { value } = event.target
      onChange(Number.parseInt(value))
    },
    [onChange]
  )

  return (
    <React.Fragment>
      <input
        aria-label='volume'
        type='range'
        min='0'
        max='100'
        step='1'
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
        {value}% <VolumeIcon volume={value} />
      </span>
    </React.Fragment>
  )
}

/**
 * @param {object} props
 * @param {number} props.volume
 */
export function VolumeIcon (props) {
  const { volume } = props

  if (Math.floor(volume) === 0) {
    return <MdVolumeOff />
  } else if (volume < 35) {
    return <MdVolumeMute />
  } else if (volume < 75) {
    return <MdVolumeDown />
  } else {
    return <MdVolumeUp />
  }
}

export default Volume
