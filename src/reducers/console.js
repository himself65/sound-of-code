/** @typedef {ReadonlyArray<string>} ConsoleState */

/** @type {ConsoleState} */
const defaultConsoleState = [];

/**
 * ConsoleState reducer
 * @param {ConsoleState} state
 * @param {any} action
 * @return {ConsoleState}
 */
export const console = (state = defaultConsoleState, action) => {
  switch (action.type) {
    case "CONSOLE_LOG":
      return state.concat(action.log);
    case "CONSOLE_CLEAR":
      return [];
    default:
      return state;
  }
};
