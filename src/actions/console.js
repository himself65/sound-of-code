/**
 * Writes to virtual console
 * @param {Array<any>} items
 */
export const addLog = (...items) => {
  const log = items
    .map((item) => {
      // istanbul ignore next since babel modifies "typeof"
      const type = typeof item;

      if (type === "undefined") {
        return type;
      } else if (type === "object") {
        return JSON.stringify(item);
      } else {
        return item.toString();
      }
    })
    .join(" ");

  return {
    type: "CONSOLE_LOG",
    log,
  };
};

/**
 * Clears virtual console
 */
export const clear = () => ({ type: "CONSOLE_CLEAR" });
