// stringify.js

/** `JSON.stringify()`s one argument with nice formatting.
 *    Errors when `JSON.stringify()` would error.
 *
 * @param {(string\|number\|object\|array)} toStringify
 * 
 * @returns {string}
 */
const stringify = function (toStringify) {
  let result = JSON.stringify(toStringify, null, 2);
  return result;
};

module.exports = stringify;
