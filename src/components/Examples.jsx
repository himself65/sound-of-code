import React, { useContext, useCallback } from 'react'

import EditorContext from './EditorContext'

const programs = [
  { title: 'Basic', filename: 'Basic.js' },
  { title: 'Bubblesort', filename: 'Bubblesort.js' },
  { title: 'Mergesort', filename: 'Mergesort.js' },
  { title: 'Type Change', filename: 'Change.js' },
  { title: 'Hello World!', filename: 'Hello_World.js' },
  { title: 'Conditionals', filename: 'ElseCondition.js' },
  { title: 'Switch Statements', filename: 'SwitchNoCascade.js' },
  { title: 'While Addition', filename: 'WhileAddition.js' },
  { title: 'For Multiplication', filename: 'ForMultiplication.js' },
  { title: 'For Subtraction', filename: 'ForSubtraction.js' },
  { title: 'No Structure', filename: 'NoStructure.js' },
  { title: 'String Test', filename: 'StringTest.js' },
  { title: 'Functions', filename: 'Functions.js' },
  {
    title: 'Duplicate Declartion',
    filename: 'DuplicateDeclaration.js',
    className: 'secondary'
  },
  { title: 'Error', filename: 'Bad.js', className: 'secondary' }
]

export function Examples () {
  const editor = useContext(EditorContext)

  const loadFile = useCallback(
    file => {
      if (editor) {
        editor.loadExampleFile(file)
      }
    },
    [editor]
  )

  return (
    <div>
      <h4>Examples</h4>
      <div className='example-programs'>
        {programs.map((program, index) => (
          <button
            className={'small ' + program.className}
            key={index}
            onClick={() => loadFile(program.filename)}
          >
            {program.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Examples
