import { console as consoleActions, program } from "../actions";
import { store } from "../store";
import Hooks from "./Hooks";
import { altConsole, altWindow } from "./altObjects";
import { alterProgram } from "./weaver";

/**
 * Interface for interacting/debugging user programs
 */
export class Debugger {
  /**
   * @param {import('../editor').default} editor
   * @param {import('../sound/SoundManager').default} sound
   */
  constructor(editor, sound) {
    this.editor = editor;
    this.sound = sound;
  }

  /**
   * @param {import('../editor').default} editor
   */
  setEditor(editor) {
    this.editor = editor;
  }

  /**
   * @param {import('../sound/SoundManager').default} sound
   */
  setSound(sound) {
    this.sound = sound;
  }

  /**
   * Runs user JavaScript program
   */
  async codecover() {
    // Disable changes from the editor
    this.editor.setReadOnly(true);

    store.dispatch(consoleActions.clear());
    store.dispatch(program.parse());

    await this.sound.init();

    const code = this.editor.getValue();
    let transformedCode = "";

    try {
      transformedCode = await alterProgram(code);
      store.dispatch(program.parseSuccess());
    } catch (error) {
      this.editor.setReadOnly(false);
      this.sound.play("BadStatement");

      store.dispatch(program.parseRejected());
      store.dispatch(consoleActions.addLog(error.message));
      return;
    }

    store.dispatch(program.start());
    store.dispatch(consoleActions.addLog("Started"));

    const hooks = new Hooks(this.editor, this.sound);

    try {
      /* eslint-disable no-new-func */
      const userProgram = Function(
        "console",
        "window",
        "__debugger",
        transformedCode,
      );
      /* eslint-enable no-new-func */

      /** @type {Promise<void>} */
      const programInstance = userProgram(altConsole, altWindow, hooks);

      return programInstance
        .then(() => {
          hooks.onFinish();
        })
        .catch((err) => {
          hooks.onError(err);
        });
    } catch (e) {
      this.sound.play("RuntimeError");
      store.dispatch(program.error());
      store.dispatch(
        consoleActions.addLog(
          "[Error] syntax not supported here. Please report this issue.",
        ),
      );
      store.dispatch(consoleActions.addLog(e.message));
      console.error(e);

      // Re-enable the editor
      this.editor.setReadOnly(false);
    }
  }

  /**
   * Pauses user program
   */
  pause() {
    store.dispatch(program.pause());
    this.sound.pause();
  }

  /**
   * Resumes user program
   */
  resume() {
    store.dispatch(program.resume());
  }

  /**
   * Stops the user program
   */
  stop() {
    store.dispatch(program.abort());
    this.editor && this.editor.setReadOnly(false);
    this.sound && this.sound.stop();
  }
}

export default Debugger;
