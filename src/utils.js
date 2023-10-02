/**
 * @param {string} filename
 * @param {string} text
 */
export const download = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/JavaScript," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

/**
 * Get the absolute URL that stays consistent in any page
 * @param {string} url URL relative to domain
 * @returns {string} absolute URL
 */
export const getUrl = url => {
  return "/" + url;
};

/**
 * @param {string} id
 * @param {any} backupValue
 */
export const load = async (id, backupValue = null) => {
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

/**
 * @param {string} id
 * @param {any} item
 */
export const save = async (id, item) => {
  if (typeof Storage === "undefined") {
    throw Error("Storage API not supported");
  }

  window.localStorage.setItem(id, JSON.stringify(item));
};

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) =>
  new Promise(resolve => setTimeout(resolve, ms));
