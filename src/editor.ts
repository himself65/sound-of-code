import {
  setStartpoint as start,
  resetStartpoint as resetStart,
} from "./actions/program";
import { store } from "./store";
import { load, save } from "./utils";
import * as ace from "brace";
import { Editor as AceEditor } from "brace";

/**
 * Abstracted Editor Instance
 */
export class Editor {
  private ace: AceEditor | null = null;
  private saveTimer: number | null = null;
  private ready: boolean = false;

  constructor() {}

  /**
   * Lazyloads the editor
   * @param {HTMLElement} id
   */
  async init(id: HTMLElement): Promise<void> {
    if (this.ready || !id) {
      return;
    }

    const { edit } = await import(
      /* webpackChunkName: "brace", webpackPrefetch: true */ "brace"
    );
    await Promise.all([
      import("brace/theme/eclipse"),
      import("brace/mode/javascript"),
    ]);

    this.ace = edit(id);
    this.ace.setTheme("ace/theme/eclipse");

    const session = this.ace.getSession();
    session.setMode("ace/mode/javascript");

    this.ace.gotoLine(2, 0);
    this.ace.$blockScrolling = Infinity;

    const lastProgram = await load<string>("lastProgram", null);

    // Restore previous program
    // or load Basic example
    if (lastProgram) {
      this.setValue(lastProgram);
    } else {
      this.loadExampleFile("Basic.js");
    }

    session.on("change", () => this.validateBreakpoint());

    this.saveTimer = window.setInterval(() => {
      this.saveToStorage();
    }, 5000);

    this.ready = true;
  }

  /**
   * Destroys the editor instance
   */
  async destroy(): Promise<void> {
    if (this.ace) {
      await this.saveToStorage();
      this.resetStartpoint();

      this.ace.destroy();
      if (this.saveTimer) {
        window.clearInterval(this.saveTimer);
      }

      this.saveTimer = null;
      this.ready = false;
    }
  }

  async saveToStorage(): Promise<void> {
    if (this.ace) {
      const currentProgram = this.getValue();
      save("lastProgram", currentProgram);
    }
  }

  async loadFromStorage(): Promise<void> {
    const value = await load<string>("lastProgram", "");
    this.setValue(value);
  }

  /**
   * Checks if the breakpoint is in a valid position.
   * If not, then it is removed.
   */
  validateBreakpoint(): void {
    if (!this.ready || !this.ace) {
      return;
    }

    const lines = this.getValue().split("\n").length;
    const {
      program: { startLocation },
    } = store.getState();

    if (startLocation > lines) {
      this.resetStartpoint();
    }
  }

  /**
   * loads and example into the editor.
   * @param {string} exampleProgram
   */
  async loadExampleFile(exampleProgram: string): Promise<void> {
    if (!this.ready) {
      return;
    }

    const {
      default: { get },
    } = await import("axios");

    const { data } = await get<string>(`/examples/${exampleProgram}`);

    this.setValue(data);
  }

  /**
   * Selects a line
   * @param {number} line
   */
  select(line: number): void {
    if (!this.ready || !this.ace) {
      return;
    }

    this.ace.clearSelection();
    this.ace.gotoLine(line);
  }

  /**
   * Get the current text in the editor.
   * @returns {string}
   */
  getValue(): string {
    return this.ace ? this.ace.getValue() : "";
  }

  /**
   * Set the text value in the editor
   * @param {string} value
   */
  setValue(value: string): void {
    if (this.ace && !this.ace.getReadOnly()) {
      this.ace.setValue(value);
      this.ace.clearSelection();
      this.resetStartpoint();
    }
  }

  /**
   * Retrieve the cursor position
   * @returns {any}
   */
  getPosition(): ace.Position {
    return this.ace ? this.ace.getCursorPosition() : { row: 0, column: 0 };
  }

  /**
   * Sets the program's entry point at the cursor's current line position
   */
  setStartpoint(): void {
    if (!this.ready || !this.ace) {
      return;
    }

    this.resetStartpoint();

    const { row } = this.getPosition();
    const session = this.ace.getSession();

    session.setBreakpoint(row, "soc-bp");

    store.dispatch(start(row + 1));
  }

  /**
   * Resets the entry location of the program
   */
  resetStartpoint(): void {
    if (!this.ready || !this.ace) {
      return;
    }

    const session = this.ace.getSession();
    session.clearBreakpoints();

    store.dispatch(resetStart());
  }

  /**
   * Sets read only mode for the editor
   * @param {boolean} value
   */
  setReadOnly(value: boolean): void {
    if (!this.ready || !this.ace) {
      return;
    }

    this.ace.setReadOnly(value);
  }
}

export default Editor;
