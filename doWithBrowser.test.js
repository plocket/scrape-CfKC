// doWithBrowser.test.js

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const puppeteer = require('puppeteer');

const doWithBrowser = require ('./doWithBrowser.js');
const cleanUpBrowser = doWithBrowser.cleanUpBrowser;


const cleanUp = async function (browser) {
  // Try closing the browser just in case.
  try {
    await browser.close()
  } catch (err) {
    // Browser was already closed. Or something.
  }
}


// -- `doWithBrowser()` tests --
describe("`doWithBrowser()`", function () {

  let currentBrowser = null;

  afterEach(async function () {
    // runs after each test in this block
    await cleanUp(currentBrowser);
  });

  // -- onStart --
  // it.skip("calls onStart with connected `browser`", async function () {
  it("calls onStart with connected `browser`", async function () {
    let onStart = async function ({ browser, page }) {
      expect(browser.isConnected()).to.be.true;
    };
    await doWithBrowser({ onStart });
  });

  // it.skip("calls onStart with a `page` object", async function () {
  it("calls onStart with a `page` object", async function () {
    let onStart = async function ({ browser, page }) {
      expect(page).to.be.an('object');
    };
    await doWithBrowser({ onStart });
  });

  // -- onError --
  // it.skip("calls onError with connected `browser`", async function () {
  it("calls onError with connected `browser`", async function () {
    let onStart = async function ({ browser, page }) {
      throw new Error;
    };
    let onError = async function ({ error, browser, page }) {
      expect(browser.isConnected()).to.be.true;
    };
    await doWithBrowser({ onStart, onError })
  });

  // it.skip("calls onError with a `page` object", async function () {
  it("calls onError with a `page` object", async function () {
    let onStart = async function ({ browser, page }) {
      throw new Error;
    };
    let onError = async function ({ error, browser, page }) {
      expect(page).to.be.an('object');
    };
    await doWithBrowser({ onStart, onError })
  });

  // it.skip("calls onError with an `error` error object", async function () {
  it("calls onError with an `error` error object", async function () {
    let onStart = async function ({ browser, page }) {
      throw new Error;
    };
    let onError = async function ({ error, browser, page }) {
      expect(error).to.be.an('error');
    };
    await doWithBrowser({ onStart, onError })
  });

  // -- When finished --
  // it.skip("closes browser at end when successful", async function () {
  it("closes browser at end when successful", async function () {
    let onStart = async function ({ browser, page }) {
      currentBrowser = browser;
      expect(browser.isConnected()).to.be.true;
    };
    await doWithBrowser({ onStart });
    expect(currentBrowser.isConnected()).to.be.false;
  });

  // closes browser itself when errors. should it?
  // it.skip("closes browser when errors", async function () {
  it("closes browser when errors", async function () {
    let onStart = async function ({ browser, page }) {
      currentBrowser = browser;
      expect(browser.isConnected()).to.be.true;
      throw new Error;
    };
    let onError = async function () {};
    await doWithBrowser({ onStart, onError })
    expect(currentBrowser.isConnected()).to.be.false;
  });


  // closes previousBrowser...? Spy needed? Test in cleanUpBrowser()?
  // logs at the right path? Test for getLog.js?
  
});  // Ends `doWithBrowser()` tests


// -- `cleanUpBrowser()` tests --
describe("`cleanUpBrowser()`", function () {

  let currentBrowser = null;

  afterEach(async function () {
    // runs after each test in this block
    await cleanUp(currentBrowser);
  });

  // it.skip("closes given browser", async function () {
  it("closes given browser", async function () {
    currentBrowser = await puppeteer.launch({ headless: true });
    await cleanUpBrowser({ browser: currentBrowser });
    expect(currentBrowser.isConnected()).to.be.false;
  });

  // it.skip("throws Error when given an object without a `browser` property", async function () {
  it("throws Error when given an object without a `browser` property", async function () {
    cleanUpBrowser({}).catch(function (error) {
      expect(error).to.be.an('error');
    });
  });

  // it.skip("throws Error when given an object `browser` that is `null`", async function () {
  it("throws Error when given an object `browser` that is `null`", async function () {
    cleanUpBrowser({ browser: null }).catch(function (error) {
      expect(error).to.be.an('error');
    });
  });

  // it.skip("throws Error when given an object `browser` that is not a `Browser`", async function () {
  it("throws Error when given an object `browser` that is not a `Browser`", async function () {
    cleanUpBrowser({ browser: { isFalse: "Rock fact" }}).catch(function (error) {
      expect(error).to.be.an('error');
    });
  });

});  // Ends `cleanUpBrowser()` tests
