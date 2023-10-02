import { console as consoleAction } from "../../src/actions";
import { createStore } from "../../src/store";
import { describe, test, beforeEach, expect } from "vitest";

describe("Console", () => {
  describe("actions", () => {
    test("creates a log entry", () => {
      const actual = consoleAction.addLog("hello");
      const expected = {
        type: "CONSOLE_LOG",
        log: "hello",
      };

      expect(actual).toEqual(expected);
    });

    test("logs an object", () => {
      const actual = consoleAction.addLog({ hello: "world" });
      const expected = {
        type: "CONSOLE_LOG",
        log: '{"hello":"world"}',
      };

      expect(actual).toEqual(expected);
    });

    test("logs an array", () => {
      const actual = consoleAction.addLog([1, 2, "three", false]);
      const expected = {
        type: "CONSOLE_LOG",
        log: '[1,2,"three",false]',
      };

      expect(actual).toEqual(expected);
    });

    test("joins mutliple inputs with a space in between", () => {
      const actual = consoleAction.addLog("hello", "world");
      const expected = {
        type: "CONSOLE_LOG",
        log: "hello world",
      };

      expect(actual).toEqual(expected);
    });

    test("joins multiple objects in a single log", () => {
      const actual = consoleAction.addLog(
        { hello: "world" },
        { somebody: "once told me" },
      );
      const expected = {
        type: "CONSOLE_LOG",
        log: '{"hello":"world"} {"somebody":"once told me"}',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("states", () => {
    let store = createStore();

    beforeEach(() => {
      store = createStore();
    });

    test("adds a log entry", () => {
      store.dispatch(consoleAction.addLog("hello"));

      const state = store.getState();
      const expected = ["hello"];

      expect(state.console).toEqual(expected);
    });

    test("adds multiple log entries", () => {
      store.dispatch(consoleAction.addLog("hello"));
      store.dispatch(consoleAction.addLog("world"));
      store.dispatch(consoleAction.addLog("lorem ipsum"));

      const state = store.getState();
      const expected = ["hello", "world", "lorem ipsum"];

      expect(state.console).toEqual(expected);
    });

    test("clears all log entries", () => {
      store.dispatch(consoleAction.addLog("hello"));
      store.dispatch(consoleAction.clear());

      const state = store.getState();
      const expected = [];

      expect(state.console).toEqual(expected);
    });
  });
});
