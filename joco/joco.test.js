// joco.test.js

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const puppeteer = require('puppeteer');

const doWithBrowser = require ('../doWithBrowser.js');
const joco_on_start = require ('./joco.js');
const scrape_joco_with = joco_on_start.scrape_joco_with;
const get_table_rows_as_obectjs = joco_on_start.get_table_rows_as_obectjs;


// const cleanUp = function () {
// }

// -- `joco_on_start()` tests --
describe.skip("`joco_on_start()`", function () {
// describe("`joco_on_start()`", function () {

  // to test
  // Given an existing case number returns object
  // Assert specific properties? Purpose of this? Maybe once stable?
  // Given a non-existing case number returns...?

  // Maybe name search tests.

});  // Ends `joco_on_start()` tests



// Needs `page` with a table...
// -- `get_table_rows_as_obectjs()` tests --
describe.skip("`get_table_rows_as_obectjs()`", function () {
// describe("`get_table_rows_as_obectjs()`", function () {

  // to test
  // returns array of objects
  // returned objects have headgs matching the headings given
  // returned object property values are strings

  // Assert specific values? Needs very stable page to always test with.


});  // Ends `get_table_rows_as_obectjs()` tests





