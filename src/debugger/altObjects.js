import { console as consoleActions } from "../actions";
import { store } from "../store";

export const altConsole = {
  ...console,
  debug: (...items) => {
    store.dispatch(consoleActions.addLog(...items));
    console.debug(...items);
  },
  error: (...items) => {
    store.dispatch(consoleActions.addLog(...items));
    console.error(...items);
  },
  info: (...items) => {
    store.dispatch(consoleActions.addLog(...items));
    console.info(...items);
  },
  log: (...items) => {
    store.dispatch(consoleActions.addLog(...items));
    console.log(...items);
  },
  warn: (...items) => {
    store.dispatch(consoleActions.addLog(...items));
    console.warn(...items);
  },
};

export const altLocation = { ...window.location };

Object.defineProperty(altLocation, "href", {
  get: () => window.location.href,
  set: (_) => {
    altConsole.error("Setting href is disabled!");
  },
});

export const altWindow = {
  ...window,
  console: altConsole,
  location: altLocation,
};
