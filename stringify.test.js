// stringify.test.js

let assert = require('assert');
let expect = require('chai').expect;
let should = require('chai').should();

const stringify = require ('./stringify.js');


describe("`stringify()`", function () {
  it("given an object with properties should return a multi-line string", function(){
      let str = stringify({name: "Arthur", swallow: "European"});
      let numLines = str.split(/\n/);
      expect(numLines).to.have.lengthOf.above(1);
  });

  it("given a string should return it", function(){
      let str = stringify("I don't know! AHHHhhhh...");
      expect(str).to.have.string("I don't know! AHHHhhhh...");
  });

  it("given a number should return a string of that number", function(){
      let str = stringify(5);
      expect(str).to.have.string("5");
  });

  it("given an array should return a multi-line string?", function(){
      let str = stringify([5, 6]);
      let numLines = str.split(/\n/);
      expect(numLines).to.have.lengthOf.above(1);
  });

  // given a function throws an error (worth testing?)
});
