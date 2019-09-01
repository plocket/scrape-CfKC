// log.js

const fs = require('fs');
const mkdirp = require('mkdirp');
const stringify = require ('./stringify.js');


/** Returns an async function. Allows that function to use a
 *    'logs.txt' file in the given directory. If the directory
 *    doesn't exist it will be made. 'logs.txt' file will be
 *    created when this function is called.
 *
 * The name doesn't match everything this is doing. Might be
 *    trying to do too much in here.
 *
 * @param {string} logsDir A string starting with no '/' and ending in '/'
 */
const getLog = function (logsDir) {
  // @todo: Handle strings without '/' at the end?

  errIfNotString(logsDir);

  // Make directory if needed
  mkdirp.sync(logsDir, async function (err) {
      if (err) { log('Error::', err); }
  });

  const logsPath = logsDir + 'logs.txt';
  makeFileIfNeeded(logsPath);


  /** Async function. Joins arguments into a string
   *    sparated by a space between each argument. Writes
   *    that to a file, appending a new line character at
   *    the end.
   *
   * Note: Using this in puppeteer funcs like `.evaluate()`
   *    doesn't work, even using the tricks mentioned at
   *    https://stackoverflow.com/a/52176714.
   *
   * @param {...*} toJoin Values to be joined into a string.
   *    Each value is separated by one space.
   */
  async function result (...toJoin) {
    console.log(...toJoin);

    let oneEntry = toJoin.join(' ') + '\n';
    try {
      fs.appendFileSync(logsPath, oneEntry);
    } catch (err) {
      // If error at this point, something's wrong
      throw err;
    }
  };  // Ends async result()

  return result;
};  // Ends getLog()


const errIfNotString = function (toBeTested) {
  if (typeof toBeTested !== 'string') {
    let errArr = [
      '`getLog()` expects one string as an argument. It got:',
      stringify(toBeTested),
      'of type',
      typeof(toBeTested),
    ]
    let err = errArr.join(' ');
    throw TypeError(err);
  }
};  // Ends errIfNotString()


/** If file exists, does nothing.
 *    If file doesn't exists, makes a blank file.
 *
 * @param {string} filepath
 */
const makeFileIfNeeded = function (filepath) {
  // Make file if needed in this directory
  try {
    // Check if file exists
    fs.readFileSync(filepath);
  } catch (err) {
    // If error, file doesn't exist yet
    try {
      // Make a new file with nothing in it
      fs.writeFileSync(filepath, '');
    } catch (err) {
      // If there are still errors something's really wrong
      throw err;
    }  // second try
  }  // first try
};  // Ends makeFileIfNeeded()


module.exports = getLog;
module.exports.errIfNotString = errIfNotString;
module.exports.makeFileIfNeeded = makeFileIfNeeded;
