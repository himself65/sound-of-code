import type { AnyAction } from "redux";

export type ConsoleState = ReadonlyArray<string>;

const defaultConsoleState: ConsoleState = [];

export const console = (
  state: ConsoleState = defaultConsoleState,
  action: AnyAction,
): ConsoleState => {
  switch (action.type) {
    case "CONSOLE_LOG":
      return state.concat(action.log);
    case "CONSOLE_CLEAR":
      return [];
    default:
      return state;
  }
};
