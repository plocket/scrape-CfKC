// joco.js
// run with
// node joco/joco.js

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
    "Case Number":          '#txtCaseNo',
    "Case Number Search":   '#BtnsrchExact',
  },
  charges: {
    "count_table": '#Form1 > table:nth-child(5)',
    "count_row": '#Form1 > table:nth-child(5) tr',
  }
};  // end selectors;

let headings = {
  "Count": [
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
let onStart = async function ({ page }) {

  page.on('console',
    async function pageLog (consoleObj) {
      await console.log(consoleObj.text());
    }
  );

  let url = 'http://jococourts.org/index.aspx';
  let goto = await page.goto(url);
  console.log('Status:', goto.status());

  let results = await scrapeJocoWith({
    page: page,
    selectors: selectors,
  });

  console.log(results);
}


let scrapeJocoWith = async function ({ page, selectors }) {

  let caseNumberSelector = selectors.inputs["Case Number"]
  await page.waitForSelector(caseNumberSelector);
  await page.$eval(
    caseNumberSelector,
    function (el, str) { el.value = str },
    test_case.case_number
  );

  let searchButtonSelector = selectors.inputs["Case Number Search"];
  await page.waitForSelector(searchButtonSelector);
  await page.click(searchButtonSelector);

  await page.waitForSelector(selectors.charges["count_table"])
  let countRowSelector = selectors.charges["count_row"];
  let result = await getTableAsObjs({
    page: page,
    rowSelector: countRowSelector,
    headings: headings.Count,
  })

  return { "Counts": result };
};


/**
* @returns {[object]}
*/
let getTableAsObjs = async function ({ rowSelector, page, headings }) {

  // Get an array of every count row's values
  let rows = await page.$$eval( rowSelector,
    function (rowHandles) {
      let result = Array.from( rowHandles,
        function (rowHandle) {
          return rowHandle.innerText.split('\t');
        }
      )
      // Assumes there's a headings row
      result.shift();  // Take out headings row
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
};  // Ends async getTableAsObjs()



let dev = async function () {
  await doWithBrowser({ onStart });
  process.exit();
};

dev();
