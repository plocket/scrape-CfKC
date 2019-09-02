// getLog.test.js

const fs = require('fs');
const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const getLog = require ('./getLog.js');
const errIfNotString = getLog.errIfNotString;
const makeFileIfNeeded = getLog.makeFileIfNeeded;

const directoryPath = 'testGetLogDir/';
const logsFilePath = directoryPath + 'logs.txt';


const cleanUp = function () {
  try {
    fs.unlinkSync(logsFilePath);
  } catch (err) {
    // file wasn't there. Do nothing.
  }

  try {
    fs.rmdirSync(directoryPath)
  } catch (err) {
    // folder wasn't there. Do nothing.
  }
}

// -- `getLog()` tests --
// describe.skip("`getLog()`", function () {
describe("`getLog()`", function () {

  beforeEach(function() {
    // runs after each test in this block
    cleanUp();
  });

  afterEach(function() {
    // runs after each test in this block
    cleanUp();
  });

  // it.skip("given a string returns an async function.", function () {
  it("given a string returns an async function.", function () {
    let asyncFn = getLog(directoryPath);
    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    let isAsync = asyncFn instanceof AsyncFunction === true;
    expect(isAsync).to.be.true;
  });

  // @todo: Does this just test `mkdir`?
  // it.xskip("given a path to a directory that doesn't exist creates that directory.", function () {
  // itx("given a path to a directory that doesn't exist creates that directory.", function () {
  //   getLog(directoryPath);
  //   expect(fs.existsSync(directoryPath)).to.be.true;
  // });

  // @todo: Need these in here too? Does specify 'logs.txt' here.
  // it.skip("given a path to an existing directory that doesn't have a 'logs.txt' file creates that file in that directory.", function () {
  it("given a path to an existing directory that doesn't have a 'logs.txt' file creates that file in that directory.", function () {
    fs.mkdirSync(directoryPath);
    getLog(directoryPath);
    expect(fs.existsSync(logsFilePath)).to.be.true;
  });

  // it.skip("given a path to an existing directory that already has a 'logs.txt', it doesn't overwrite that file.", function () {
  it("given a path to an existing directory that already has a 'logs.txt', it doesn't overwrite that file.", function () {
    let text = 'I am one line\n';
    fs.mkdirSync(directoryPath);
    fs.writeFileSync(logsFilePath, text);

    getLog(directoryPath);
    let contents = fs.readFileSync(logsFilePath).toString();

    expect(contents).to.equal('I am one line\n');
  });

});  // Ends `getLog()` tests


// -- `makeFileIfNeeded()` tests --
// describe.skip("`makeFileIfNeeded()`", function () {
describe("`makeFileIfNeeded()`", function () {

  let filePathForMakerTest = 'testFile.txt';

  beforeEach(function () {
    // runs before each test in this block
    try {
      fs.unlinkSync(filePathForMakerTest);
    } catch (err) {
      // file wasn't there. Do nothing.
    }
  });

  afterEach(function() {
    // runs after each test in this block
    try {
      fs.unlinkSync(filePathForMakerTest);
    } catch (err) {
      // file wasn't there. Do nothing.
    }
  });

  // it.skip("given a path to an existing directory that doesn't have a 'logs.txt' file creates that file in that directory.", function () {
  it("given a path to an existing file, creates that file in that directory.", function () {
    makeFileIfNeeded(filePathForMakerTest);
    expect(fs.existsSync(filePathForMakerTest)).to.be.true;
  });

  // it.skip("given a path to an existing directory that already has a 'logs.txt', it doesn't overwrite that file.", function () {
  it("given a path to an existing file, it doesn't overwrite that file.", function () {

    let text = 'I am one line\n';
    fs.writeFileSync(filePathForMakerTest, text);
    makeFileIfNeeded(filePathForMakerTest);
    let contents = fs.readFileSync(filePathForMakerTest).toString();

    expect(contents).to.equal('I am one line\n');
  });

});  // Ends `makeFileIfNeeded()` tests

 
// -- `errIfNotString()` tests --
// describe.skip("`errIfNotString()`", function () {
describe("`errIfNotString()`", function () {

  afterEach(function() {
    // runs after each test in this block
    cleanUp();
  });
 
  // it.skip("given a string does not throw a TypeError.", function () {
  it("given a string does not throw a TypeError.", function () {
    let errFunc = function () {errIfNotString("string")};
    expect(errFunc).not.to.throw(TypeError);
  });

  // Non-string returns TypeError
  // it.skip("given no arguments (undefined) throws a TypeError.", function () {
  it("given no arguments (undefined) throws a TypeError.", function () {
    let errFunc = function () {errIfNotString()};
    expect(errFunc).to.throw(TypeError);
  });
 
  // it.skip("given null throws a TypeError.", function () {
  it("given null throws a TypeError.", function () {
    let errFunc = function () {errIfNotString(null)};
    expect(errFunc).to.throw(TypeError);
  });
 
  // it.skip("given an object throws a TypeError.", function () {
  it("given an object throws a TypeError.", function () {
    let errFunc = function () {errIfNotString({truth: "false"})};
    expect(errFunc).to.throw(TypeError);
  });
 
  // it.skip("given a number throws a TypeError.", function () {
  it("given a number throws a TypeError.", function () {
    let errFunc = function () {errIfNotString(5)};
    expect(errFunc).to.throw(TypeError);
  });
 
  // it.skip("given a function throws a TypeError.", function () {
  it("given a function throws a TypeError.", function () {
    let errFunc = function () {errIfNotString(function () {})};
    expect(errFunc).to.throw(TypeError);
  });
 
  // it.skip("given an array throws a TypeError.", function () {
  it("given an array throws a TypeError.", function () {
    let errFunc = function () {errIfNotString(["string"])};
    expect(errFunc).to.throw(TypeError);
  });

});  // Ends `errIfNotString()` tests


// -- `log()` tests --
// describe.skip("`log()`", function () {
describe("`log()`", function () {

  let log = null;

  beforeEach(function () {
    // runs before each test in this block
    cleanUp();
    log = getLog(directoryPath);
  });

  afterEach(function() {
    // runs after each test in this block
    cleanUp();
  });

  // it.skip("returns a promise.", function () {
  it("returns a promise.", function () {
    let possiblePromise = log();
    let isPromise = possiblePromise instanceof Promise;
    expect(isPromise).to.be.true;
  });

  // it.skip("doesn't overwrite previously existing text.", function () {
  it(`doesn't overwrite previously existing text.` , function () {  
    let previousText = 'I am one line\n';
    fs.writeFileSync(logsFilePath, previousText);

    log("And I'm another one!");
    let contents = fs.readFileSync(logsFilePath).toString();

    expect(contents).to.include(previousText);
  });

  let strToString = "into a string in the way native `join()` does"
  let strAppend = "and appends it to a 'logs.txt' file then adds a newline."
  let strToLogs = `${strToString} ${strAppend}`;

  // it.skip(`given one argument ${string}`, function () {
  it(`given one argument turns it ${strToLogs}` , function () {
    let val = "weeee";
    log(val);
    let contents = fs.readFileSync(logsFilePath).toString();
    expect(contents).to.equal(`${val}\n`);
  });

  // it.skip(`given two arguments turns them ${strToString}, puts spaces between them, ${strAppend}`, function () {
  it(`given two arguments turns them ${strToString}, puts spaces between them, ${strAppend}` , function () {
    let val1 = "weeee";
    let val2 = 5;
    let expectedResult = val1 + ' ' + val2 + '\n';
    log(val1, val2);
    let contents = fs.readFileSync(logsFilePath).toString();
    expect(contents).to.equal(expectedResult);
  });

  // it.skip("given a multi-line line string, preserves those lines and adds a plus a newline at the end.", function () {
  it("given a multi-line line string, preserves those lines and adds a plus a newline at the end" , function () {
    let val1 = "weeee\neeee\n";
    let val2 = 5;
    let expectedResult = val1 + ' ' + val2 + '\n';
    log(val1, val2);
    let contents = fs.readFileSync(logsFilePath).toString();
    expect(contents).to.equal(expectedResult);
  });

});  // Ends `log()` tests
