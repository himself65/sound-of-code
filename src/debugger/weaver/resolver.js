/**
 * Extract identifier for labels
 * @param {any} node
 * @returns {string}
 */
export const resolveIdentity = node => {
  if (!node) {
    return "";
  }

  const { type } = node;

  switch (type) {
    case "BinaryExpression":
      return resBinaryExpression(node);

    case "Identifier":
      return resIdentifier(node);

    case "Literal":
      return resLiteral(node);

    case "LogicalExpression":
      return resLogicalExpression(node);

    case "MemberExpression":
      return resMemberExpression(node);

    case "UpdateExpression":
      return resUpdateExpression(node);

    default:
      return "";
  }
};

/**
 * @param {any} node
 * @returns {string}
 */
export const resBinaryExpression = node => {
  const { left, operator, right } = node;

  const leftId = resolveIdentity(left);
  const rightId = resolveIdentity(right);

  const expression = `${leftId} ${operator} ${rightId}`;

  switch (operator) {
    case "+":
    case "-":
    case "||":
    case "|":
      return expression;

    default:
      return `(${expression})`;
  }
};

/**
 * @param {any} node
 * @returns {string}
 */
export const resIdentifier = node => node.name;

/**
 * @param {any} node
 * @returns {string}
 */
export const resLiteral = node => node.raw;

/**
 * An alias for `resBinaryExpression` since it functions the same way
 * @param {any} node
 * @returns {string}
 */
export const resLogicalExpression = node => resBinaryExpression(node);

/**
 * @param {any} node
 * @returns {string}
 */
export const resMemberExpression = node => {
  const { object, property, computed } = node;

  const objectId = resolveIdentity(object);
  const keyId = resolveIdentity(property);

  return computed ? `${objectId}[${keyId}]` : `${objectId}.${keyId}`;
};

/**
 * @param {any} node
 * @returns {string}
 */
export const resUpdateExpression = node => {
  const { operator, prefix, argument } = node;

  const id = resolveIdentity(argument);

  return prefix ? `${operator} ${id}` : `${id} ${operator}`;
};
