import React, { useContext, useEffect, useRef } from 'react'

import EditorContext from './EditorContext'

export function Input () {
  const editor = useContext(EditorContext)
  const editorRef = useRef(null)

  useEffect(() => {
    if (editor) {
      editor.init(editorRef.current)
    }

    return () => {
      if (editor) {
        editor.destroy()
      }
    }
  }, [editor])

  return <div id='codeEditor' ref={editorRef} />
}

export default Input
