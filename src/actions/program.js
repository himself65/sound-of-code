/**
 * Sets a start location. Also starts the program in "skip" mode.
 * @param {number} lineNumber
 */
export const setStartpoint = (lineNumber) => ({
  type: "PROGRAM_SET_START_POINT",
  lineNumber,
});

/**
 * Resets the program start position
 */
export const resetStartpoint = () => ({ type: "PROGRAM_RESET_START_POINT" });

/**
 * Make the program run normally
 */
export const normalMode = () => ({ type: "PROGRAM_NORMAL_MODE" });

/**
 * Indicates that parsing began
 */
export const parse = () => ({ type: "PROGRAM_PARSE_PENDING" });

/**
 * Indicates that parsing succeeded
 */
export const parseSuccess = () => ({ type: "PROGRAM_PARSE_SUCCESS" });

/**
 * Indicates that parsing failed
 */
export const parseRejected = () => ({ type: "PROGRAM_PARSE_REJECTED" });

/**
 * Indicates that the user program has begun running
 */
export const start = () => ({ type: "PROGRAM_START" });

/**
 * Pauses the user program
 */
export const pause = () => ({ type: "PROGRAM_PAUSE" });

/**
 * Resumes the user program
 */
export const resume = () => ({ type: "PROGRAM_RESUME" });

/**
 * Tracks a variable and its datatype
 * @param {{ dataType: import("../type").DataType, identifier: string }} info
 */
export const trackType = (info) => ({
  type: "PROGRAM_TRACK",
  dataType: info.dataType,
  identifier: info.identifier,
});

/**
 * Indicates that the progrm finished successfully
 */
export const finish = () => ({ type: "PROGRAM_FINISH" });

/**
 * Ends the user program early
 */
export const abort = () => ({ type: "PROGRAM_ABORT" });

/**
 * Indicates that the user program threw an uncaught error
 */
export const error = () => ({ type: "PROGRAM_ERROR" });
