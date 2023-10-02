/**
 * @param {number} speed should be within [0-4]
 */
export const setSpeed = speed => ({ type: "SOUND_SET_SPEED", speed });

/**
 * @param {'default' | 'second'} theme
 */
export const setTheme = theme => ({ type: "SOUND_SET_THEME", theme });

/**
 * @param {number} volume should be within [0-100]
 */
export const setVolume = volume => ({ type: "SOUND_SET_VOLUME", volume });

/**
 * Set the volume for a specific datatype
 * @param {DataType | StructureType | DebugType} datatype
 * @param {number} volume
 */
export const setTypeVolume = (datatype, volume) => ({
  type: "SOUND_SET_DISTINCT_VOLUME",
  datatype,
  volume
});
