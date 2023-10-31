import { parse } from "acorn";

import { resolveIdentity } from "./resolver";

/**
 * @typedef {object} AlterSettings
 * @property {boolean} [debug]
 * @property {boolean} [transpile]
 */

/**
 * Inject Debugger hooks into user program
 * @param {string} code
 * @param {AlterSettings} [settings]
 * @returns {Promise<string>}
 */
export const alterProgram = async (code, settings) => {
  /* istanbul ignore next */
  const { debug = true, transpile = false } = settings || {};

  /* istanbul ignore next */
  let babelStandalone;

  if (transpile) {
    babelStandalone = await import("@babel/standalone");
  }

  let output = "";

  // @ts-ignore
  const { body } = parse(code, { locations: true, sourceType: "script" });

  const modifiedCode = body
    .map((node) => modifyStatement(node))
    .join(exitPoint);

  output = `'use strict'\nasync function run () {\n${modifiedCode}\n}`;

  if (debug) {
    console.log(output);
  }

  /* istanbul ignore next */
  try {
    return `${
      transpile
        ? babelStandalone.transform(output, { presets: ["latest"] }).code
        : output
    }\n\nreturn run()`;
  } catch (error) {
    throw Error(
      `[Error] syntax not supported here. Please report this issue.\n${error.message}`,
    );
  }
};

/**
 * @typedef {object} WeaverSettings
 * @property {number} forDepth
 * @property {number} whileDepth
 * @property {boolean} silence
 */

/** @type {WeaverSettings} */
export const defaultSettings = {
  forDepth: 0,
  whileDepth: 0,
  silence: false,
};

export const exitPoint = `\n\nif (__debugger.getStatus() === 'stopped') {
  return
}\n\n`;

/**
 * Modifies any valid JavaScript node
 * @param {any} node
 * @param {WeaverSettings?} settings
 * @returns {string}
 */
export const modifyStatement = (node, settings = defaultSettings) => {
  if (!node) {
    return "";
  }

  const { type } = node;

  switch (type) {
    case "ArrayExpression":
      return modArrayExpression(node, settings);

    case "ArrowFunctionExpression":
      return modArrowFunctionExpression(node, settings);

    case "AssignmentExpression":
      return modAssignmentExpression(node, settings);

    case "BinaryExpression":
      return modBinaryExpression(node, settings);

    case "BlockStatement":
      return modBlockStatement(node, settings);

    case "BreakStatement":
      return modBreakStatement(node, settings);

    case "CallExpression":
      return modCallExpression(node, settings);

    case "ConditionalExpression":
      return modConditionalExpression(node, settings);

    case "ContinueStatement":
      return modContinueStatement(node, settings);

    case "DoWhileStatement":
      return modDoWhileStatement(node, settings);

    case "ExpressionStatement":
      return modExpressionStatement(node, settings);

    case "ForStatement":
      return modForStatement(node, settings);

    case "FunctionDeclaration":
      return modFunctionDeclaration(node, settings);

    case "FunctionExpression":
      return modFunctionExpression(node, settings);

    case "Identifier":
      return modIdentifier(node, settings);

    case "IfStatement":
      return modIfStatement(node, settings);

    case "Literal":
      return modLiteral(node, settings);

    case "LogicalExpression":
      return modLogicalExpression(node, settings);

    case "MemberExpression":
      return modMemberExpression(node, settings);

    case "ObjectExpression":
      return modObjectExpression(node, settings);

    case "Property":
      return modProperty(node, settings);

    case "ReturnStatement":
      return modReturnStatement(node, settings);

    case "SwitchCase":
      return modSwitchCase(node, settings);

    case "SwitchStatement":
      return modSwitchStatement(node, settings);

    case "ThrowStatement":
      return modThrowStatement(node, settings);

    case "UpdateExpression":
      return modUpdateExpression(node, settings);

    case "VariableDeclaration":
      return modVariableDeclaration(node, settings);

    case "VariableDeclarator":
      return modVariableDeclarator(node, settings);

    case "WhileStatement":
      return modWhileStatement(node, settings);

    case "ClassDeclaration":
      return modClassDeclaration(node, settings);

    case "ClassBody":
      return modClassBody(node, settings);

    case "MethodDefinition":
      return modMethodDefinition(node, settings);

    case "ThisExpression":
      return modThisExpression(node, settings);

    case "NewExpression":
      return modNewExpression(node, settings);

    /* istanbul ignore next */
    default:
      return `undefined /* Type not supported: ${type}\n ${JSON.stringify(
        node,
        null,
        2,
      )}*/`;
  }
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modClassDeclaration = (node, settings) => {
  const { id, superClass, body } = node;
  const modifiedBody = modifyStatement(body, settings);
  return `class ${id.name} ${
    superClass ? `extends ${superClass.name} ` : ""
  }{${modifiedBody}}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modClassBody = (node, settings) => {
  const { body } = node;
  return body.map((member) => modifyStatement(member, settings)).join("\n");
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modMethodDefinition = (node, settings) => {
  const { key, kind, value } = node;
  const modifiedFunction = modMethodFunctionExpression(
    value,
    settings,
    key.name,
  );
  return `${kind === "constructor" ? "constructor" : ""} ${modifiedFunction}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modThisExpression = (node, settings) => {
  return "this";
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modNewExpression = (node, settings) => {
  const { callee, arguments: args } = node;
  const modifiedArguments = args
    .map((arg) => modifyStatement(arg, settings))
    .join(", ");
  return `new ${callee.name}(${modifiedArguments})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modArrayExpression = (node, settings) => {
  const { elements } = node;
  const members = elements
    .map((member) => `await (${modifyStatement(member, settings)})`)
    .join(", ");

  return `[${members}]`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modArrowFunctionExpression = (node, settings) => {
  const { params, body } = node;

  const paramList = params
    .map((param) => modifyStatement(param, settings))
    .join(", ");
  const functionBody = modifyStatement(body, settings);

  if (body.type === "BlockStatement") {
    return `async (${paramList}) => ${functionBody}`;
  } else {
    const pseudoReturn = modReturnStatement(
      { loc: body.loc, argument: body },
      settings,
    );
    return `async (${paramList}) => {\n${pseudoReturn}\n}`;
  }
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modAssignmentExpression = (node, settings) => {
  const { loc, left, operator, right } = node;

  const leftId = modifyStatement(left, settings);

  const { type } = right;
  const isFunction =
    type === "FunctionExpression" || type === "ArrowFunctionExpression";
  const isBinary = operator !== "=" || type === "BinaryExpression";

  const assign = modifyStatement(right, {
    ...settings,
    silence: settings.silence || !isFunction,
  });

  return `${leftId} ${operator} await __debugger.dynamicTypeCheck(await (${assign}), ${JSON.stringify(
    {
      loc,
      settings,
      identity: resolveIdentity(left),
      isBinary,
    },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modBinaryExpression = (node, settings) => {
  const { loc, left, operator, right } = node;

  const opSettings = { ...settings, silence: true };

  const leftOp = `await __debugger.dynamicTypeCheck(await (${modifyStatement(
    left,
    opSettings,
  )}), ${JSON.stringify({ loc, settings: opSettings })})`;
  const rightOp = `await __debugger.dynamicTypeCheck(await (${modifyStatement(
    right,
    opSettings,
  )}), ${JSON.stringify({ loc, settings: opSettings })})`;

  const result = `((${leftOp}) ${operator} (${rightOp}))`;

  return `await __debugger.dynamicTypeCheck(await (${result}), ${JSON.stringify(
    {
      loc,
      settings,
    },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modBlockStatement = (node, settings) => {
  const { body } = node;
  const statements = body
    .map((statement) => modifyStatement(statement, settings))
    .join(exitPoint);

  return `{\n${exitPoint}${statements}${exitPoint}\n}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modBreakStatement = (node, settings) => {
  const { loc, type } = node;

  return `await __debugger.noopCall('${type}', ${JSON.stringify({
    loc,
    settings,
  })})\nbreak`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modCallExpression = (node, settings) => {
  const { loc, callee, arguments: args } = node;

  const callSettings = { ...settings, silence: true };
  const calledFunction = modifyStatement(callee, callSettings);
  const argsList = args
    .map((arg) => modifyStatement(arg, callSettings))
    .join(", ");

  const preCall = `await __debugger.noopCall('default', ${JSON.stringify({
    loc,
    settings,
  })})`;

  return `(${preCall}.then(async () => { return __debugger.dynamicTypeCheck(await (${calledFunction}(${argsList})), ${JSON.stringify(
    { loc, settings },
  )}) }))`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modConditionalExpression = (node, settings) => {
  const { loc, type, test, consequent, alternate } = node;

  const check = modifyStatement(test, settings);
  const ifBody = modifyStatement(consequent, settings);
  const elseBody = modifyStatement(alternate, settings);

  return `(await __debugger.coverControl(await (${check}), ${JSON.stringify({
    loc,
    settings,
    type,
  })})) ? ${ifBody} : ${elseBody}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modContinueStatement = (node, settings) => {
  const { loc, type } = node;

  return `await __debugger.noopCall('${type}', ${JSON.stringify({
    loc,
    settings,
  })})\ncontinue`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modDoWhileStatement = (node, settings) => {
  const { loc, type, body, test } = node;

  const doWhileBody = modifyStatement(body, {
    ...settings,
    whileDepth: settings.whileDepth + 1,
  });
  const check = modifyStatement(test, { ...settings, silence: true });

  return `do\n${doWhileBody}\nwhile (await __debugger.coverControl(await (${check}), ${JSON.stringify(
    { loc, settings, type },
  )}))`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modExpressionStatement = (node, settings) => {
  const { expression } = node;

  const express = modifyStatement(expression, settings);

  return `${express}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modForStatement = (node, settings) => {
  const { loc, type, init, test, update, body } = node;

  const paramSettings = { ...settings, silence: true };
  const initial = modifyStatement(init, paramSettings);
  const check = modifyStatement(test, paramSettings);
  const change = modifyStatement(update, paramSettings);

  // Increment forDepth
  const forBody = modifyStatement(body, {
    ...settings,
    forDepth: settings.forDepth + 1,
  });

  return `for (${initial}; await __debugger.coverControl(await (${check}), ${JSON.stringify(
    { loc, settings, type },
  )}); await (${change}))\n${forBody}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modFunctionDeclaration = (node, settings) => {
  const { loc } = node;

  const modifiedFunction = modFunctionExpression(node, settings);

  return `await __debugger.noopCall('function', ${JSON.stringify({
    loc,
    settings,
  })})\n${modifiedFunction}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modFunctionExpression = (node, settings) => {
  const { id, params, body } = node;

  const identifier = modifyStatement(id, settings);
  const parameters = params
    .map((param) => modifyStatement(param, settings))
    .join(", ");
  const funcBody = modifyStatement(body, settings);

  return `async function ${identifier} (${parameters}) ${funcBody}`;
};

export const modMethodFunctionExpression = (node, settings, methodName) => {
  const { id, params, body } = node;

  // If it's a method, we don't prefix it with an identifier
  const identifier = methodName ? methodName : modifyStatement(id, settings);
  const parameters = params
    .map((param) => modifyStatement(param, settings))
    .join(", ");
  const funcBody = modifyStatement(body, settings);
  const isAsync = node.async;

  return `${isAsync ? "async" : ""} ${identifier} (${parameters}) ${funcBody}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modIdentifier = (node, settings) => {
  const { name } = node;

  return `${name}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modIfStatement = (node, settings) => {
  const { loc, type, test, consequent, alternate } = node;

  const check = modifyStatement(test, { ...settings, silence: true });
  const ifBody = modifyStatement(consequent, settings);

  const optionalElse = modifyStatement(alternate, settings);
  const elseBody = optionalElse.length === 0 ? "{}" : optionalElse;

  return `if (await __debugger.coverControl(await (${check}), ${JSON.stringify({
    loc,
    settings,
    type,
  })}))\n${ifBody}\nelse ${elseBody}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modLiteral = (node, settings) => {
  const { raw } = node;
  return `${raw}`;
};

/**
 * An alias for `modBinaryExpression` since it functions the same way
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modLogicalExpression = (node, settings) =>
  modBinaryExpression(node, settings);

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modMemberExpression = (node, settings) => {
  const { object, property, computed } = node;

  const identifier = modifyStatement(object, settings);

  const key = modifyStatement(property, settings);
  const member = computed ? `[await (${key})]` : `.${key}`;

  return `${identifier}${member}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modObjectExpression = (node, settings) => {
  const { properties } = node;

  const values = properties
    .map((property) =>
      modifyStatement(property, { ...settings, silence: true }),
    )
    .join(", ");

  return `{\n${values}\n}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modProperty = (node, settings) => {
  const { method, computed, key, value } = node;

  const keyId = modifyStatement(key, { ...settings, silence: true });
  const initValue = modifyStatement(value, { ...settings, silence: !method });

  const property = computed ? `[await (${keyId})]` : `${keyId}`;

  return `${property}: await (${initValue})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modReturnStatement = (node, settings) => {
  const { loc, argument } = node;

  const resultValue = modifyStatement(argument, { ...settings, silence: true });

  return `return await __debugger.dynamicTypeCheck(await (${resultValue}), ${JSON.stringify(
    { loc, settings },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modSwitchCase = (node, settings) => {
  const { loc, type, consequent, test } = node;

  const check = modifyStatement(test, { ...settings, silence: true });
  const caseBody = consequent
    .map((statement) => modifyStatement(statement, settings))
    .join(exitPoint);

  return test !== null
    ? `case (await (__debugger.coverControl(await (${check}), ${JSON.stringify({
        loc,
        settings,
        type,
      })}))):\n${caseBody}`
    : `default:\n${caseBody}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modSwitchStatement = (node, settings) => {
  const { loc, type, discriminant, cases } = node;

  const check = modifyStatement(discriminant, { ...settings, silence: true });
  const caseBodies = cases
    .map((situation) => modifyStatement(situation, settings))
    .join("\n");

  return `switch (await __debugger.coverControl(await (${check}), ${JSON.stringify(
    {
      loc,
      settings,
      type,
    },
  )})) {\n${caseBodies}\n}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modThrowStatement = (node, settings) => {
  const { loc, argument } = node;

  const arg = modifyStatement(argument, { ...settings, silence: true });

  return `throw await __debugger.dynamicTypeCheck(await (${arg}), ${JSON.stringify(
    {
      loc,
      settings,
    },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modUpdateExpression = (node, settings) => {
  const { loc, operator, prefix, argument } = node;

  // Using `modIdentifier` directly since no other type is allowed to use the syntax
  const identity = modIdentifier(argument, { ...settings, silence: true });
  const statement = prefix
    ? `${operator} ${identity}`
    : `${identity} ${operator}`;

  return `await __debugger.dynamicTypeCheck(await (${statement}), ${JSON.stringify(
    { loc, settings, isBinary: true },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modVariableDeclaration = (node, settings) => {
  const { kind, declarations } = node;

  const variableList = declarations
    .map((declared) => modifyStatement(declared, settings))
    .join(", ");

  return `${kind} ${variableList}`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modVariableDeclarator = (node, settings) => {
  const { loc, id, init } = node;

  const identifier = modifyStatement(id, settings);

  let value = "undefined";
  let isBinary = false;

  if (init !== null) {
    const { type } = init;
    const isFunction =
      type === "FunctionExpression" || type === "ArrowFunctionExpression";
    isBinary = type === "BinaryExpression";

    value = modifyStatement(init, {
      ...settings,
      silence: settings.silence || !isFunction,
    });
  }

  return `${identifier} = await __debugger.dynamicTypeCheck(await (${value}), ${JSON.stringify(
    { loc, settings, identity: resolveIdentity(id), isBinary },
  )})`;
};

/**
 * @param {any} node
 * @param {WeaverSettings} settings
 * @returns {string}
 */
export const modWhileStatement = (node, settings) => {
  const { loc, type, test, body } = node;

  const check = modifyStatement(test, { ...settings, silence: true });
  const whileBody = modifyStatement(body, {
    ...settings,
    whileDepth: settings.whileDepth + 1,
  });

  return `while (await __debugger.coverControl(await (${check}), ${JSON.stringify(
    {
      loc,
      settings,
      type,
    },
  )}))\n${whileBody}`;
};
