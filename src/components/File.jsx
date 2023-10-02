import React, { useContext, useCallback } from 'react'

import EditorContext from './EditorContext'
import { download } from '../utils'

/**
 * @param {object} props
 * @param {string} props.emailContact
 */
export function File (props) {
  const { emailContact } = props
  const editor = useContext(EditorContext)

  const onSave = useCallback(() => {
    if (editor) {
      editor.saveToStorage()
    }
  }, [editor])

  const onLoad = useCallback(() => {
    if (editor) {
      editor.loadFromStorage()
    }
  }, [editor])

  const onImport = useCallback(
    event => {
      if (!editor) {
        return
      }

      const file = event.target.files[0]
      const reader = new window.FileReader()

      reader.addEventListener('load', () => {
        const output = reader.result
        editor.setValue(output.toString())
      })

      reader.readAsText(file)
    },
    [editor]
  )

  const onExport = useCallback(() => {
    if (editor) {
      download(`soundOfCode-${Date.now()}.js`, editor.getValue())
    }
  }, [editor])

  const onReport = useCallback(() => {
    if (!editor) {
      return
    }

    const ebody = encodeURIComponent(
      `Please describe the problem:\r\n\r\n\r\nCode:\r\n${editor.getValue()}`
    )
    window.open(`mailto:${emailContact}?subject=SOC%20Bug&body=${ebody}`)
  }, [editor, emailContact])

  return (
    <div className='col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10'>
      <div className='button-group'>
        <button onClick={onSave} className='primary'>
          Save
        </button>
        <button onClick={onLoad}>Load</button>

        <label className='button' htmlFor='files'>
          Import JS File
          <input type='file' id='files' name='files[]' onChange={onImport} />
        </label>

        <button onClick={onExport}>Export JS file</button>
        <button onClick={onReport}>Report a bug</button>
      </div>
    </div>
  )
}

export default File
