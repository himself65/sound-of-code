import type { DataTypes, DebugTypes, StructureTypes } from "../type";
import { AnyAction } from "redux";

export type DistinctSound = {
  volume: number;
};

export type SoundTypeState =
  | DataTypes<DistinctSound>
  | StructureTypes<DistinctSound>
  | DebugTypes<DistinctSound>;

export type SoundState = {
  speed: number;
  theme: "default" | "second";
  volume: number;
  types: SoundTypeState;
};

const defaultSoundTypeState: SoundTypeState = {
  array: { volume: 100 },
  boolean: { volume: 100 },
  function: { volume: 100 },
  null: { volume: 100 },
  number: { volume: 100 },
  object: { volume: 100 },
  string: { volume: 100 },
  symbol: { volume: 100 },
  undefined: { volume: 100 },
  BinaryExpression: { volume: 100 },
  BreakStatement: { volume: 100 },
  ContinueStatement: { volume: 100 },
  DoWhileStatement: { volume: 100 },
  ForStatement: { volume: 100 },
  ForInStatement: { volume: 100 },
  IfStatement: { volume: 100 },
  SwitchCase: { volume: 100 },
  SwitchStatement: { volume: 100 },
  TernaryStatement: { volume: 100 },
  WhileStatement: { volume: 100 },
  BadStatement: { volume: 100 },
  default: { volume: 100 },
  Ending: { volume: 100 },
  RuntimeError: { volume: 100 },
  TypeChange: { volume: 100 },
};

export const defaultSoundState: SoundState = {
  speed: 1,
  theme: "default",
  volume: 100,
  types: defaultSoundTypeState,
};

export const sound = (
  state: SoundState = defaultSoundState,
  action: AnyAction,
): SoundState => {
  switch (action.type) {
    case "SOUND_SET_SPEED":
      return {
        ...state,
        speed: action.speed,
      };

    case "SOUND_SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };

    case "SOUND_SET_VOLUME":
      return {
        ...state,
        volume: action.volume,
      };

    default:
      return { ...state, types: soundTypes(state.types, action) };
  }
};

/**
 *
 * @param {SoundTypeState} state
 * @param {any} action
 * @return {SoundTypeState}
 */
const soundTypes = (state = defaultSoundTypeState, action) => {
  switch (action.type) {
    case "SOUND_SET_DISTINCT_VOLUME":
      return {
        ...state,
        [action.datatype]: { volume: action.volume },
      };

    default:
      return state;
  }
};
