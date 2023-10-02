import * as Redux from "redux";

import * as ConsoleReducer from "./console";
import * as ProgramReducer from "./program";
import * as SoundReducer from "./sound";
import type { ConsoleState } from './console'
import type { ProgramState } from './program'
import type { SoundState } from './sound'

export { console } from "./console";
export { program } from "./program";
export { sound } from "./sound";

export type AppState = {
  console: ConsoleState
  program: ProgramState
  sound: SoundState
}

type AppReducer = Redux.Reducer<AppState>

export const app: AppReducer = Redux.combineReducers({
  console: ConsoleReducer.console,
  program: ProgramReducer.program,
  sound: SoundReducer.sound
});
