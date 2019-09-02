// joco.js
// run with
// node joco/joco.js

// Yeah, the var names are all over the place
// Still trying to figure out how this will be used
// and by who.


// const fs = require('fs');

const doWithBrowser = require ('../doWithBrowser.js');
// const getLog = require ('./getLog.js');
// const stringify = require ('./stringify.js');

/* Q&A
* - Q: Want name 'suffix'?
*/

/* Notes
* - First page shown is charges page
*/

let test_case = {
  "case_number": '99TC08868',
  "last_name":    'Rodriguez',
  "first_name":   'Jose',
}

// To run some tests with
let selectors = {
  inputs: {
    // http://jococourts.org/crdispo.aspx?which=99TC08868
    // doesn't work in Chrome
    "case_number":          '#txtCaseNo',
    "case_number_search":   '#BtnsrchExact',
  },
  charges: {
    "count_table": '#Form1 > table:nth-child(5)',
    "count_row": '#Form1 > table:nth-child(5) tr',
  }
};  // end selectors;

let headings = {
  "count": [
    "Count",
    "Section",
    "Date",
    "Title",
    "ACS",
    "Drug",
    "PL",
    "Finding",
    "TP",
    "LVL",
    "PN",
    "Sentence Date",
  ]
};


// Will use arguments from some input
let joco_on_start = async function ({ page, searchValues }) {

  let url = 'http://jococourts.org/index.aspx';
  let goto = await page.goto(url);
  console.log('Status:', goto.status());

  let results = await scrape_joco_with({
    page: page,
    selectors: selectors,
  });

  console.log(results);
}


let scrape_joco_with = async function ({ page, selectors }) {

  let case_number_selector = selectors.inputs["case_number"]
  await page.waitForSelector(case_number_selector);
  await page.$eval(
    case_number_selector,
    function (el, str) { el.value = str },
    test_case.case_number
  );

  // TODO: Deal with no results found

  let search_button_selector = selectors.inputs["case_number_search"];
  await page.waitForSelector(search_button_selector);
  await page.click(search_button_selector);

  await page.waitForSelector(selectors.charges["count_table"])
  let result = await get_table_rows_as_obectjs({
    page: page,
    row_selector: selectors.charges["count_row"],
    headings: headings.count,
    number_of_table_heading_rows: 1,
  })

  // There's one table heading row
  result.unshift();

  return { "counts": result };
};


/** Returns array of objects with key/value pairs
 *    where keys match the headings given and values
 *    are strings.
 *
 * Note: Does not check for wrong number of headings or
 *    handle selector issues. Does not remove any rows
 *    or columns.
 *
 * @returns {[object]}
 */
let get_table_rows_as_obectjs = async function ({
  page,
  row_selector,
  headings
}) {

  // Get an array of every count row's values
  let rows = await page.$$eval( row_selector,
    function (row_handles) {
      let result = Array.from( row_handles,
        function (row_handle) {
          return row_handle.innerText.split('\t');
        }
      )
      
      return result; 
    }
  );

  // Pair up the headings with the values for each row's data.
  let result = [];
  for (let count of rows) {

    let row = {};
    for (let columni = 0; columni < headings.length; columni++) {
      let heading = headings[ columni ];
      let value = count[ columni ];
      row[ heading ] = value;
    }

    result.push(row);
  }

  return result;
};  // Ends async get_table_rows_as_obectjs()


let dev = async function () {
  await doWithBrowser({ onStart: joco_on_start });
  process.exit();
};

dev();


module.exports = joco_on_start;
module.exports.scrape_joco_with = scrape_joco_with;
module.exports.get_table_rows_as_obectjs = get_table_rows_as_obectjs;
