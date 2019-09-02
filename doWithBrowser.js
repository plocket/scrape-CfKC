// doWithBrowser.js

// const fs = require('fs');
const puppeteer = require('puppeteer');
// const colors = require('colors');
// const mkdirp = require('mkdirp');

const getLog = require ('./getLog.js');
const stringify = require ('./stringify.js');

// `previousBrowser` could allow repeatedly coming back
// to the same browser, though both an infinite loop and
// deep nesting might be a concern.
// Add onDone? After cleanUp?
async function doWithBrowser ({
  onStart,
  onError,
  previousBrowser,
  logPath
}) {

  // Clean up if needed
  // Leaves potential for _reusing_ previousBrowser instead
  if (previousBrowser) {
    await cleanUpBrowser({ previousBrowser });
  }

  // Ensure values
  if ( !onStart ) { onStart = defaults.onStart; }
  if ( !onError ) { onError = defaults.onError; }
  // // For debugging
  // if ( !logPath ) { logPath = defaults.logPath; }
  // const log = getLog(logPath);

  // Puppeteer stuff
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console',
    async function pageLog (console_obj) {
      await console.log(console_obj.text());
    }
  );

  try {
    // Do everything you want in this function
    await onStart({ browser, page });
  } catch (error) {
    await onError({ error, browser, page });
  }

  // Clean up if not done elsewhere
  await cleanUpBrowser({ browser });

};  // Ends async doWithBrowser()


defaults = {
  onStart: async function ({ browser, page }) {
    console.log('default onStart');
    let debug = true;
    cleanUpBrowser({ browser, debug });
  },
  onError: async function({ error, browser, page }) {
    console.log('default onError:', error);
    let debug = true;
    cleanUpBrowser({ browser, debug });
  },
  previousBrowser: null,
  logPath: 'tempLogsFile/',
};


let cleanUpBrowser = async function ({ browser, debug }) {

  // if ( typeof browser !== 'object' ) {
  //   throw ReferenceError("Expected `browser` to be object. Instead it was", typeof browser);
  // }

  if (typeof browser !== 'object' || browser === null || !browser.isConnected) {
    throw Error("Expected a `browser` property that was a puppeteer `Browser`, but didn't get it.")
  } else {
    if (browser.isConnected()) {
      if (debug) { console.log('closing'); }
      await browser.close();
    }
  }

};  // Ends async cleanUpBrowser()


module.exports = doWithBrowser;
module.exports.cleanUpBrowser = cleanUpBrowser;  // Needs testing? How?
