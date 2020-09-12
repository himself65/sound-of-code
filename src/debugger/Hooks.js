import { console as consoleActions, program } from '../actions'
import { store } from '../store'
import { sleep } from '../utils'

/**
 * Program hook interface for the Debugger
 */
export class Hooks {
  /**
   * @param {import('../editor').default} editor
   * @param {import('../sound/SoundManager').default} sound
   */
  constructor (editor, sound) {
    this.editor = editor
    this.sound = sound
    this.terminated = false
  }

  getStatus () {
    if (this.terminated) {
      return 'stopped'
    }

    const {
      program: { status }
    } = store.getState()

    if (status === 'stopped') {
      this.terminated = true
    }

    return status
  }

  setDepths ({ forDepth = 0, whileDepth = 0 }) {
    this.sound.setForDepth(forDepth)
    this.sound.setWhileDepth(whileDepth)
  }

  async noopCall (type, info) {
    const {
      loc: {
        start: { line: index }
      },
      settings: { forDepth, whileDepth, silence }
    } = info

    while (this.getStatus() === 'paused') {
      await sleep(250)
    }

    if (silence || this.getStatus() === 'stopped') {
      return
    }

    const {
      program: { startLocation, skipMode }
    } = store.getState()

    if (!skipMode || index >= startLocation) {
      // Only dispatch if deactivating skipMode
      skipMode && store.dispatch(program.normalMode())

      this.editor.select(index)
      this.setDepths({ forDepth, whileDepth })
      await this.sound.play(type)
    }
  }

  /**
   * Modify control statements
   * @template T
   * @param  {T} item
   * @param  {any} info
   * @return {Promise<T>}
   */
  async coverControl (item, info) {
    const {
      loc: {
        start: { line: index }
      },
      settings: { forDepth, whileDepth, silence },
      type
    } = info

    while (this.getStatus() === 'paused') {
      await sleep(250)
    }

    if (silence || this.getStatus() === 'stopped') {
      return item
    }

    const {
      program: { startLocation, skipMode }
    } = store.getState()

    if (!skipMode || index >= startLocation) {
      // Only dispatch if deactivating skipMode
      skipMode && store.dispatch(program.normalMode())

      this.editor.select(index)
      this.setDepths({ forDepth, whileDepth })
      await this.sound.play(type)
    }

    return item
  }

  /**
   * Checks datatype for variable assignment statements
   * @template T
   * @param {T} item
   * @param {any} info
   * @return {Promise<T>}
   */
  async dynamicTypeCheck (item, info) {
    const {
      loc: {
        start: { line: index }
      },
      settings: { forDepth, whileDepth, silence },
      identity = null,
      isBinary = false
    } = info

    while (this.getStatus() === 'paused') {
      await sleep(250)
    }
    if (silence || this.getStatus() === 'stopped') {
      return item
    }

    /** @type {DataType} */
    let type

    if (Array.isArray(item)) {
      type = 'array'
    } else if (item === null) {
      // This is a separate case because
      // typeof null === 'object'

      type = 'null'
    } else {
      type = typeof item
    }

    const {
      program: { startLocation, skipMode, varMap }
    } = store.getState()

    const isAudible = !skipMode || index >= startLocation

    if (isAudible) {
      // Only dispatch if deactivating skipMode
      skipMode && store.dispatch(program.normalMode())
    }

    if (identity) {
      store.dispatch(
        program.trackType({ dataType: type, identifier: identity })
      )

      const prevType = varMap.get(identity) || type

      // Check if the type has changed
      if (type !== prevType) {
        store.dispatch(
          consoleActions.addLog(
            `(${identity} @ ${index}): ${prevType} -> ${type}`
          )
        )

        if (isAudible) {
          this.editor.select(index)
          await this.sound.play('TypeChange')
        }
      }
    }

    // Check if stopped between the 2 separate sounds
    while (this.getStatus() === 'paused') {
      await sleep(250)
    }
    if (silence || this.getStatus() === 'stopped') {
      return item
    }

    if (isAudible) {
      this.editor.select(index)
      this.setDepths({ forDepth, whileDepth })

      // Allows the binaryexpression and datatype to play in parallel.
      // Plays datatype sound alone, if not modifying variable
      await Promise.all([
        isBinary && this.sound.play('BinaryExpression'),
        this.sound.play(type)
      ])
    }

    return item
  }

  onFinish () {
    this.setDepths({ forDepth: 0, whileDepth: 0 })
    this.editor.setReadOnly(false)

    if (this.getStatus() === 'playing') {
      this.sound.play('Ending')
      store.dispatch(program.finish())
      store.dispatch(consoleActions.addLog('Finished'))
    }
  }

  onError (e) {
    this.setDepths({ forDepth: 0, whileDepth: 0 })
    this.editor.setReadOnly(false)

    this.sound.play('RuntimeError')
    store.dispatch(program.error())
    store.dispatch(consoleActions.addLog(e.toString()))
    console.error(e)
  }
}

export default Hooks
