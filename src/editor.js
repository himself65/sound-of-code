import {
  setStartpoint as start,
  resetStartpoint as resetStart
} from './actions/program'
import { store } from './store'
import { load, save, getUrl } from './utils'

/**
 * Abstracted Editor Instance
 */
export class Editor {
  constructor () {
    this.saveTimer = null
  }

  /**
   * Lazyloads the editor
   * @param {HTMLElement} id
   */
  async init (id) {
    if (this.ready || !id) {
      return
    }

    const { edit } = await import(
      /* webpackChunkName: "brace", webpackPrefetch: true */ 'brace'
    )
    await Promise.all([
      import(
        /* webpackChunkName: "brace-theme-eclipse", webpackPrefetch: true */ 'brace/theme/eclipse'
      ),
      import(
        /* webpackChunkName: "brace-mode-javascript", webpackPrefetch: true */ 'brace/mode/javascript'
      )
    ])

    this.ace = edit(id)
    this.ace.setTheme('ace/theme/eclipse')

    const session = this.ace.getSession()
    session.setMode('ace/mode/javascript')

    this.ace.gotoLine(2, 0)
    this.ace.$blockScrolling = Infinity

    const lastProgram = await load('lastProgram', null)

    // Restore previous program
    // or load Basic example
    if (lastProgram) {
      this.setValue(lastProgram)
    } else {
      this.loadExampleFile('Basic.js')
    }

    session.on('change', () => this.validateBreakpoint())

    this.saveTimer = setInterval(() => {
      this.saveToStorage()
    }, 5000)

    this.ready = true
  }

  /**
   * Destroys the editor instance
   */
  async destroy () {
    await this.saveToStorage()
    this.resetStartpoint()

    this.ace.destroy()

    clearInterval(this.saveTimer)

    this.saveTimer = null
    this.ready = false
  }

  async saveToStorage () {
    const currentProgram = this.getValue()

    await save('lastProgram', currentProgram).catch(console.error)
  }

  async loadFromStorage () {
    await load('lastProgram', '')
      .then(value => {
        this.setValue(value)
      })
      .catch(console.error)
  }

  /**
   * Checks if the breakpoint is in a valid position.
   * If not, then it is removed.
   */
  validateBreakpoint () {
    if (!this.ready) {
      return
    }

    const { length: lines } = this.getValue().split('\n')
    const {
      program: { startLocation }
    } = store.getState()

    if (startLocation > lines) {
      this.resetStartpoint()
    }
  }

  /**
   * loads and example into the editor.
   * @param {string} exampleProgram
   */
  async loadExampleFile (exampleProgram) {
    if (!this.ready) {
      return
    }

    const {
      default: { get }
    } = await import(/* webpackChunkName: "axios" */ 'axios')

    const { data } = await get(getUrl(`./examples/${exampleProgram}`))

    this.setValue(data)
  }

  /**
   * Selects a line
   * @param {number} line
   */
  select (line) {
    if (!this.ready) {
      return
    }

    this.ace.clearSelection()
    this.ace.gotoLine(line)
  }

  /**
   * Get the current text in the editor.
   * @returns {string}
   */
  getValue () {
    if (!this.ready) {
      return ''
    }

    return this.ace.getValue()
  }

  /**
   * Set the text value in the editor
   * @param {string} value
   */
  setValue (value) {
    if (this.ace.getReadOnly()) {
      return
    }

    this.ace.setValue(value)
    this.ace.clearSelection()
    this.resetStartpoint()
  }

  /**
   * Retrieve the cursor position
   * @returns {any}
   */
  getPosition () {
    return this.ace.getCursorPosition()
  }

  /**
   * Sets the program's entry point at the cursor's current line position
   */
  setStartpoint () {
    if (!this.ready) {
      return
    }

    this.resetStartpoint()

    const { row } = this.getPosition()
    const session = this.ace.getSession()

    session.setBreakpoint(row, 'soc-bp')

    store.dispatch(start(row + 1))
  }

  /**
   * Resets the entry location of the program
   */
  resetStartpoint () {
    if (!this.ready) {
      return
    }

    const session = this.ace.getSession()
    session.clearBreakpoints()

    store.dispatch(resetStart())
  }

  /**
   * Sets read only mode for the editor
   * @param {boolean} value
   */
  setReadOnly (value) {
    if (!this.ready) {
      return
    }

    this.ace.setReadOnly(value)
  }
}

export default Editor
