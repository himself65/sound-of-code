import type { AnyAction } from "redux";

export type DataType = "number" | "string" | "boolean" | "array" | "object" | "null" | "undefined";

export type ProgramState = {
  startLocation: number;
  exitStatus: "error" | "success" | "abort" | null;
  isExecuting: boolean;
  skipMode: boolean;
  status: "idle" | "stopped" | "playing" | "paused";
  varMap: ReadonlyMap<string, DataType> | null;
  weaverStatus: "parsing" | "success" | "error" | null;
}

const defaultProgramState: ProgramState = {
  startLocation: -1,
  exitStatus: null,
  isExecuting: false,
  skipMode: false,
  status: "idle",
  varMap: null,
  weaverStatus: null
};

export const program = (state: ProgramState = defaultProgramState, action: AnyAction): ProgramState => {
  switch (action.type) {
    case "PROGRAM_SET_START_POINT":
      return {
        ...state,
        startLocation: action.lineNumber,
        skipMode: true
      };

    case "PROGRAM_RESET_START_POINT":
      return {
        ...state,
        startLocation: -1,
        skipMode: false
      };

    case "PROGRAM_PARSE_PENDING":
      return {
        ...state,
        exitStatus: null,
        isExecuting: false,
        status: "idle",
        varMap: null,
        weaverStatus: "parsing"
      };

    case "PROGRAM_PARSE_SUCCESS":
      return {
        ...state,
        status: "idle",
        weaverStatus: "success"
      };

    case "PROGRAM_PARSE_REJECTED":
      return {
        ...state,
        status: "idle",
        weaverStatus: "error"
      };

    case "PROGRAM_START":
      return {
        ...state,
        isExecuting: true,
        status: "playing",
        varMap: new Map(),
        weaverStatus: null
      };

    case "PROGRAM_PAUSE":
      return {
        ...state,
        status: "paused"
      };

    case "PROGRAM_RESUME":
      return {
        ...state,
        status: "playing"
      };

    case "PROGRAM_NORMAL_MODE":
      return {
        ...state,
        skipMode: false
      };

    case "PROGRAM_TRACK":
      return {
        ...state,
        varMap: new Map(state.varMap).set(action.identifier, action.dataType)
      };

    case "PROGRAM_ABORT":
      if (!state.isExecuting) {
        return state;
      }

      return {
        ...state,
        exitStatus: "abort",
        isExecuting: false,
        status: "stopped",
        skipMode: state.startLocation !== -1
      };

    case "PROGRAM_FINISH":
      return {
        ...state,
        exitStatus: "success",
        isExecuting: false,
        status: "stopped",
        skipMode: state.startLocation !== -1
      };

    case "PROGRAM_ERROR":
      return {
        ...state,
        exitStatus: "error",
        isExecuting: false,
        status: "stopped",
        skipMode: state.startLocation !== -1
      };

    default:
      return state;
  }
};
