import React, { useCallback } from 'react'

/**
 * @param {object} props
 * @param {(value: string) => void} props.onChange
 * @param {{ label: string, value: string }[]} props.themes
 * @param {string} props.value
 */
export function Theme (props) {
  const { onChange, themes, value } = props

  const handleChange = useCallback(
    event => {
      onChange(event.target.value)
    },
    [onChange]
  )

  const options = themes.map(theme => (
    <option key={theme.value} value={theme.value} label={theme.label}>
      {theme.label}
    </option>
  ))

  return (
    <React.Fragment>
      <span>Theme: </span>

      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select onChange={handleChange} value={value}>
        {options}
      </select>
    </React.Fragment>
  )
}
export default Theme
