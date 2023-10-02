import * as Redux from "redux";

import * as ConsoleReducer from "./console";
import * as ProgramReducer from "./program";
import * as SoundReducer from "./sound";

export { console } from "./console";
export { program } from "./program";
export { sound } from "./sound";

/**
 * @typedef {object} AppState
 * @prop {ConsoleReducer.ConsoleState} console
 * @prop {ProgramReducer.ProgramState} program
 * @prop {SoundReducer.SoundState} sound
 */

/**
 * @typedef {Redux.Reducer<AppState>} AppReducer
 */

/**
 * @type {AppReducer}
 */
export const app = Redux.combineReducers({
  console: ConsoleReducer.console,
  program: ProgramReducer.program,
  sound: SoundReducer.sound
});
