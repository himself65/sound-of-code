type Theme = 'default' | 'second'

type DataType =
  | 'array'
  | 'boolean'
  | 'bigint'
  | 'function'
  | 'null'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined'

type StructureType =
  | 'BinaryExpression'
  | 'BreakStatement'
  | 'ContinueStatement'
  | 'DoWhileStatement'
  | 'ForInStatement'
  | 'ForStatement'
  | 'IfStatement'
  | 'SwitchCase'
  | 'SwitchStatement'
  | 'TernaryStatement'
  | 'WhileStatement'

type DebugType =
  | 'BadStatement'
  | 'default'
  | 'Ending'
  | 'RuntimeError'
  | 'TypeChange'

type DataTypes<T> = {
  array: T
  boolean: T
  function: T
  null: T
  number: T
  object: T
  string: T
  symbol: T
  undefined: T
}

type StructureTypes<T> = {
  BinaryExpression: T
  BreakStatement: T
  ContinueStatement: T
  DoWhileStatement: T
  ForInStatement: T
  ForStatement: T
  IfStatement: T
  SwitchCase: T
  SwitchStatement: T
  TernaryStatement: T
  WhileStatement: T
}

type DebugTypes<T> = {
  BadStatement: T
  default: T
  Ending: T
  RuntimeError: T
  TypeChange: T
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any
}
