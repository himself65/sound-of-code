import { sound as soundAction } from "../../src/actions";
import { createStore } from "../../src/store";
import { describe, test, beforeEach, expect } from 'vitest'

describe("Sound", () => {
  describe("states", () => {
    let store = createStore();

    beforeEach(() => {
      store = createStore();
    });

    test("sets the speed to 1.0", () => {
      store.dispatch(soundAction.setSpeed(1));
      const { sound } = store.getState();

      expect(sound.speed).toBe(1);
    });

    test('sets the sound theme to "second"', () => {
      store.dispatch(soundAction.setTheme("second"));

      const { sound } = store.getState();

      expect(sound.theme).toBe("second");
    });

    test("sets the volume to 100", () => {
      store.dispatch(soundAction.setVolume(100));
      const { sound } = store.getState();

      expect(sound.volume).toBe(100);
    });
  });
});
