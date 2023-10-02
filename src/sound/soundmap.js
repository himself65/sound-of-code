/**
 * @typedef {object} Themes
 * @property {string} default
 * @property {string} second
 */

/**
 * @typedef {object} Info
 * @property {string} displayName
 * @property {string} class
 */

/**
 * @typedef {object} SoundInfo
 * @property {Themes} themes
 * @property {Info} info
 */

/** @type {DataTypes<SoundInfo>} */
export const types = {
  array: {
    themes: {
      default: "default/Array.mp3",
      second: "second/Array.mp3",
    },
    info: {
      displayName: "Array",
      class: "primary",
    },
  },
  boolean: {
    themes: {
      default: "default/Boolean.mp3",
      second: "second/Boolean.mp3",
    },
    info: {
      displayName: "Boolean",
      class: "primary",
    },
  },
  function: {
    themes: {
      default: "default/Function.mp3",
      second: "second/Function.mp3",
    },
    info: {
      displayName: "Function",
      class: "primary",
    },
  },
  null: {
    themes: {
      default: "default/Null.mp3",
      second: "second/Null.mp3",
    },
    info: {
      displayName: "Null",
      class: "primary",
    },
  },
  number: {
    themes: {
      default: "default/Number.mp3",
      second: "second/Number.mp3",
    },
    info: {
      displayName: "Number",
      class: "primary",
    },
  },
  object: {
    themes: {
      default: "default/Object.mp3",
      second: "second/Object.mp3",
    },
    info: {
      displayName: "Object",
      class: "primary",
    },
  },
  string: {
    themes: {
      default: "default/String.mp3",
      second: "second/String.mp3",
    },
    info: {
      displayName: "String",
      class: "primary",
    },
  },
  symbol: {
    themes: {
      default: "default/Default.mp3",
      second: "second/Default.mp3",
    },
    info: {
      displayName: "Symbol",
      class: "primary",
    },
  },
  undefined: {
    themes: {
      default: "default/Undefined.mp3",
      second: "second/Undefined.mp3",
    },
    info: {
      displayName: "Undefined",
      class: "primary",
    },
  },
};

/** @type {StructureTypes<SoundInfo>} */
export const structures = {
  BinaryExpression: {
    themes: {
      default: "default/Default.mp3",
      second: "second/Default.mp3",
    },
    info: {
      displayName: "Binary Expression",
      class: "tertiary",
    },
  },
  BreakStatement: {
    themes: {
      default: "default/Default.mp3",
      second: "second/Default.mp3",
    },
    info: {
      displayName: "Break",
      class: "tertiary",
    },
  },
  ContinueStatement: {
    themes: {
      default: "default/Default.mp3",
      second: "second/Default.mp3",
    },
    info: {
      displayName: "Continue",
      class: "tertiary",
    },
  },
  DoWhileStatement: {
    themes: {
      default: "default/While.mp3",
      second: "second/While.mp3",
    },
    info: {
      displayName: "Do While Statement",
      class: "tertiary",
    },
  },
  ForInStatement: {
    themes: {
      default: "default/For.mp3",
      second: "second/For.mp3",
    },
    info: {
      displayName: "For-In Statement",
      class: "tertiary",
    },
  },
  ForStatement: {
    themes: {
      default: "default/For.mp3",
      second: "second/For.mp3",
    },
    info: {
      displayName: "For Statement",
      class: "tertiary",
    },
  },
  IfStatement: {
    themes: {
      default: "default/If.mp3",
      second: "second/If.mp3",
    },
    info: {
      displayName: "If Statement",
      class: "tertiary",
    },
  },
  SwitchCase: {
    themes: {
      default: "default/Case.mp3",
      second: "second/Case.mp3",
    },
    info: {
      displayName: "Switch Case",
      class: "tertiary",
    },
  },
  SwitchStatement: {
    themes: {
      default: "default/Switch.mp3",
      second: "second/Switch.mp3",
    },
    info: {
      displayName: "Switch Statement",
      class: "tertiary",
    },
  },
  TernaryStatement: {
    themes: {
      default: "default/If.mp3",
      second: "second/If.mp3",
    },
    info: {
      displayName: "Ternary Statement",
      class: "tertiary",
    },
  },
  WhileStatement: {
    themes: {
      default: "default/While.mp3",
      second: "second/While.mp3",
    },
    info: {
      displayName: "While Statement",
      class: "tertiary",
    },
  },
};

/** @type {DebugTypes<SoundInfo>} */
export const others = {
  BadStatement: {
    themes: {
      default: "shared/Bad.mp3",
      second: "shared/Bad.mp3",
    },
    info: {
      displayName: "Bad Statement",
      class: "secondary",
    },
  },
  default: {
    themes: {
      default: "default/Default.mp3",
      second: "second/Default.mp3",
    },
    info: {
      displayName: "Default",
      class: "",
    },
  },
  Ending: {
    themes: {
      default: "shared/End.mp3",
      second: "shared/End.mp3",
    },
    info: {
      displayName: "Ending",
      class: "",
    },
  },
  RuntimeError: {
    themes: {
      default: "shared/RuntimeError.mp3",
      second: "shared/RuntimeError.mp3",
    },
    info: {
      displayName: "Runtime Error",
      class: "secondary",
    },
  },
  TypeChange: {
    themes: {
      default: "shared/TypeChange.mp3",
      second: "shared/TypeChange.mp3",
    },
    info: {
      displayName: "Type Change",
      class: "",
    },
  },
};

export const soundMap = {
  ...types,
  ...structures,
  ...others,
};
