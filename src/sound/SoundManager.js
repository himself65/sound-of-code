import { sound as soundActions } from "../actions";
import { soundMap } from "./soundmap";
import { store } from "../store";
import { getUrl } from "../utils";

/** Manages Howler sound instances */
export class SoundManager {
  constructor() {
    this.forDepth = 0;
    this.whileDepth = 0;

    /** @type {DataType | StructureType | DebugType} */
    this.currentTrack = "default";

    this.ready = false;
  }

  /** Initializes the sound tracks */
  async init() {
    if (this.ready) {
      return;
    }

    const { forTrack, whileTrack, statementTrack } = await createTracks();

    this.forTrack = forTrack;
    this.whileTrack = whileTrack;
    this.statementTrack = statementTrack;

    this.ready = true;
  }

  /**
   * Changes the sound theme
   * @param {Theme} theme
   */
  async setTheme(theme) {
    store.dispatch(soundActions.setTheme(theme));
    this.stop();

    const { forTrack, whileTrack } = await createTracks();

    this.forTrack = forTrack;
    this.whileTrack = whileTrack;

    this.resumeLoops();
  }

  /**
   * @param {Howl} track
   * @param {DataType | StructureType | DebugType} type
   * @param {boolean?} checkCurrent
   */
  adjustTrackVolume(track, type, checkCurrent = false) {
    if (!track) {
      return;
    } else if (checkCurrent) {
      if (this.currentTrack !== type) {
        return;
      }
    }

    const {
      sound: { volume, types },
    } = store.getState();

    const { volume: typeVolume } = types[type];

    const calculatedVolume = (volume / 100) * (typeVolume / 100);

    track.volume(calculatedVolume);
  }

  /**
   * @param {DataType | StructureType | DebugType} type
   * @param {number} volume
   */
  setTypeVolume(type, volume) {
    store.dispatch(soundActions.setTypeVolume(type, volume));

    this.adjustTrackVolume(this.forTrack, "ForStatement");
    this.adjustTrackVolume(this.statementTrack, type, true);
    this.adjustTrackVolume(this.whileTrack, "WhileStatement");
  }

  /**
   * Changes the playback volume
   * @param {number} volume
   */
  setVolume(volume) {
    store.dispatch(soundActions.setVolume(volume));

    this.adjustTrackVolume(this.forTrack, "ForStatement");
    this.adjustTrackVolume(this.statementTrack, this.currentTrack);
    this.adjustTrackVolume(this.whileTrack, "WhileStatement");
  }

  /**
   * Changes the playback speed
   * @param {number} speed
   */
  setSpeed(speed) {
    store.dispatch(soundActions.setSpeed(speed));

    setMultipleSpeed([this.forTrack, this.whileTrack, this.statementTrack]);
  }

  /**
   * @param {number} currentDepth any non-negative integer
   */
  setForDepth(currentDepth) {
    if (!this.ready || currentDepth < 0 || this.forDepth === currentDepth) {
      return;
    }

    if (this.forDepth > 0) {
      if (currentDepth > 0) {
        return;
      } else {
        // Deactivate the for track
        this.forTrack.stop();
      }
    } else {
      if (currentDepth > 0) {
        // Activate the for track
        this.forTrack.play();
      }
    }

    this.forDepth = currentDepth;
  }

  /**
   * @param {number} currentDepth any non-negative integer
   */
  setWhileDepth(currentDepth) {
    if (!this.ready || currentDepth < 0 || this.whileDepth === currentDepth) {
      return;
    }

    if (this.whileDepth > 0) {
      if (currentDepth > 0) {
        return;
      } else {
        // Deactivate the while track
        this.whileTrack.stop();
      }
    } else {
      if (currentDepth > 0) {
        // Activate the while track
        this.whileTrack.play();
      }
    }

    this.whileDepth = currentDepth;
  }

  /**
   * Set the statement track to a new type
   * @param {DataType | StructureType | DebugType} type
   */
  async setValueType(type) {
    const calledType = soundMap[type] ? type : "default";

    this.currentTrack = calledType;

    this.statementTrack = await createTrack(calledType);
    this.adjustTrackVolume(this.statementTrack, calledType);
  }

  /** Pauses all sound tracks */
  pause() {
    this.forTrack && this.forTrack.pause();
    this.whileTrack && this.whileTrack.pause();
    this.statementTrack && this.statementTrack.pause();
  }

  /** Stops all sound tracks */
  stop() {
    this.forTrack && this.forTrack.stop();
    this.whileTrack && this.whileTrack.stop();
    this.statementTrack && this.statementTrack.stop();
  }

  /** Resumes all loops */
  resumeLoops() {
    if (this.whileDepth > 0 && !this.whileTrack.playing()) {
      this.whileTrack.play();
    }

    if (this.forDepth > 0 && !this.forTrack.playing()) {
      this.forTrack.play();
    }
  }

  /**
   * Play a sound for a statement
   * @param {DataType | StructureType | DebugType} type
   */
  play(type) {
    this.resumeLoops();

    if (this.statementTrack) {
      this.statementTrack.stop();
    }

    return this.setValueType(type).then(
      () =>
        new Promise((resolve, reject) => {
          this.statementTrack.once("end", resolve);
          this.statementTrack.once("pause", resolve);
          this.statementTrack.once("stop", resolve);

          this.statementTrack.once("loaderror", () =>
            reject(Error("Could not load sound file")),
          );
          this.statementTrack.once("playerror", () =>
            reject(Error("Could not play sound file")),
          );

          // play the sound type here
          this.statementTrack.play();
        }),
    );
  }
}

export const createTracks = async () => {
  const [forTrack, whileTrack, statementTrack] = await Promise.all([
    createTrack("ForStatement", true),
    createTrack("WhileStatement", true),
    createTrack("default", false),
  ]);

  return {
    forTrack,
    whileTrack,
    statementTrack,
  };
};

/**
 * @param {DataType | StructureType | DebugType} sound
 * @param {boolean} [loop]
 */
export const createTrack = async (sound, loop = false) => {
  const { Howl } = await import(
    /* webpackChunkName: "howler", webpackPrefetch: true */ "howler"
  );

  const {
    sound: { speed: rate, theme, volume },
  } = store.getState();

  const file = soundMap[sound].themes[theme];

  console.log(file);

  const track = new Howl({
    src: [getUrl(`./sounds/${file}`)],
    loop,
    rate,
    volume: volume / 100,
  });

  return track;
};

/**
 * Set the speed on multiple tracks
 * @param {Array<Howl>} tracklist
 */
export const setMultipleSpeed = (tracklist = []) => {
  const {
    sound: { speed },
  } = store.getState();

  tracklist.forEach((track) => {
    if (!track) {
      return;
    }

    track.rate(speed);
  });
};

export default SoundManager;
