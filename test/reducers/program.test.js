import { program as programActions } from "../../src/actions";
import { createStore } from "../../src/store";
import { describe, test, beforeEach, expect } from "vitest";

describe("Program Status", () => {
  describe("states", () => {
    let store = createStore();

    beforeEach(() => {
      store = createStore();
    });

    test("remains unchanged if stopping before starting", () => {
      const { program } = store.getState();

      store.dispatch(programActions.abort());

      expect(program).toBe(store.getState().program);
    });

    test("sets a breakpoint at line 2", () => {
      store.dispatch(programActions.setStartpoint(2));

      const { program } = store.getState();

      expect(program).toMatchObject({
        skipMode: true,
        startLocation: 2,
      });
    });

    test("clears the breakpoint", () => {
      store.dispatch(programActions.setStartpoint(2));
      store.dispatch(programActions.resetStartpoint());

      const { program } = store.getState();

      expect(program).toMatchObject({
        skipMode: false,
        startLocation: -1,
      });
    });

    test("begins parsing", () => {
      store.dispatch(programActions.parse());

      const { program } = store.getState();

      expect(program).toMatchObject({
        weaverStatus: "parsing",
      });
    });

    test("fails invalid syntax", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseRejected());

      const { program } = store.getState();

      expect(program).toMatchObject({
        weaverStatus: "error",
      });
    });

    test("passes syntax", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());

      const { program } = store.getState();

      expect(program).toMatchObject({
        weaverStatus: "success",
      });
    });

    test("starts running", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());

      const { program } = store.getState();

      expect(program).toMatchObject({
        isExecuting: true,
        status: "playing",
      });
    });

    test('starts running, tracks a variable "foo" with type "number"', () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(
        programActions.trackType({
          identifier: "foo",
          dataType: "number",
        }),
      );

      const {
        program: { varMap },
      } = store.getState();

      expect(varMap.get("foo")).toBe("number");
    });

    test("runs, then pauses", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.pause());

      const { program } = store.getState();

      expect(program).toMatchObject({
        isExecuting: true,
        status: "paused",
      });
    });

    test("runs, pauses, then resumes", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.pause());
      store.dispatch(programActions.resume());

      const { program } = store.getState();

      expect(program).toMatchObject({
        isExecuting: true,
        status: "playing",
      });
    });

    test("has a breakpoint at line 5 and starts playing", () => {
      store.dispatch(programActions.setStartpoint(5));
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());

      const { program } = store.getState();

      expect(program).toMatchObject({
        startLocation: 5,
        isExecuting: true,
        skipMode: true,
        status: "playing",
      });
    });

    test("has a breakpoint at line 5, starts playing, and reaches the breakpoint", () => {
      store.dispatch(programActions.setStartpoint(5));
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.normalMode());

      const { program } = store.getState();

      expect(program).toMatchObject({
        startLocation: 5,
        isExecuting: true,
        skipMode: false,
        status: "playing",
      });
    });

    test("runs and successfully finishes", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.finish());

      const { program } = store.getState();

      expect(program).toMatchObject({
        exitStatus: "success",
        isExecuting: false,
        status: "stopped",
      });
    });

    test("runs and is disrupted before finishing", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.abort());

      const { program } = store.getState();

      expect(program).toMatchObject({
        exitStatus: "abort",
        isExecuting: false,
        status: "stopped",
      });
    });

    test("runs and is stopped by an uncaught error", () => {
      store.dispatch(programActions.parse());
      store.dispatch(programActions.parseSuccess());
      store.dispatch(programActions.start());
      store.dispatch(programActions.error());

      const { program } = store.getState();

      expect(program).toMatchObject({
        exitStatus: "error",
        isExecuting: false,
        status: "stopped",
      });
    });
  });
});
