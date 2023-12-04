export const download = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/JavaScript," + encodeURIComponent(text),
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const load = <T>(id: string, backupValue: T | null = null) => {
  if (typeof Storage === "undefined") {
    throw Error("Storage API not supported");
  }

  const itemString = window.localStorage.getItem(id);

  if (itemString === null) {
    return backupValue;
  } else {
    return JSON.parse(itemString);
  }
};

export const save = (id: string, item: string) => {
  if (typeof Storage === "undefined") {
    throw Error("Storage API not supported");
  }

  window.localStorage.setItem(id, item);
};

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));
