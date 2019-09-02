// selectorator.js

let selectors = {
  // Way for humans to see if these change?
  // File to test for change in format of site?
  inputs: {
    "Case Number":      '#txtCaseNo',
    "Last Name":        '#txtLName',
    "Business Name":    '#txtLName',
    "First Name":       '#txtFName',
    "Criminal":         '#rdoCriminalCivil_0',
    "Juvenile":         '#rdoCriminalCivil_0',
    "Traffic":          '#rdoCriminalCivil_0',
    "Civil":            '#rdoCriminalCivil_1',
    "Marriage":         '#rdoCriminalCivil_2',
    "Probate":          '#rdoCriminalCivil_3',
  },
  searches: {
    "Case Number Search":   '#BtnsrchExact',  // http://jococourts.org/crdispo.aspx?which=99TC08868
    "Exact Name Search":    '#BtnsrchExact',
    "Partial Name Search":  '#btnSrchPartial',
    // "Reports":              '#btnReports',  // type of search?
  },
  parsing: {
    "Personal Detals": {
      "iterate": false,
      "selector": '',
      // Need .value
      "Case Number": '#txtCaseNo',
      "Judge": '#txtJudgeName',
      "Division": '#txtDiv',
      "Status": '#txtStatus',
      "Last Name": '#txtLName',
      "First Name": '#txtFName',
      "Middle Name": '#txtMName',
      "Suffix": '#txtSufix',
      "Race/Sex/DOB": '#txtSexRaceDob',
      "Probation Officer": '#txtProbOfficer',
      "Defense Attourney": '#txtDefendent',
      "Prosecutor": '#txtProsecutor',
    },
    "Charges": {
      // Need .value
      "Current Status": {
        "iterate": false,
        "selector": '',
        "Jail Time": {
          "iterate": false,
          "selector": '',
          "Original": '#txtOriJail',
          "Suspended": '#txtSuspJail',
          "Final": '#txtFinJail',
        },
        "Probation": {
          "iterate": false,
          "selector": '',
          "Original": '#txtOriProb',
        },
      },  // ends current status
      "Counts": 'form table:nth-child(2) ',
      "Counts Row Start": 'tr:nth-child(',  // 1 indexed
      "Counts Row End": ') ',
      // Does not need .value
      "Count": {
        "Count": 'td:nth-child(1)',
        "Section": 'td:nth-child(2)',
        "Date": 'td:nth-child(3)',
        "Title": 'td:nth-child(4)',
        "ACS": 'td:nth-child(5)',
        "Drug": 'td:nth-child(6)',
        "PL": 'td:nth-child(7)',
        "Finding": 'td:nth-child(8)',
        "TP": 'td:nth-child(9)',
        "LVL": 'td:nth-child(10)',
        "PN": 'td:nth-child(11)',
        "Sentence Date": 'td:nth-child(12)',
      },  // Ends count
    },  // ends charges
    "Case History (ROA)": {
      "Date": 'form table:nth-child(2) ',  // child 3?
      "Row Start": 'tr:nth-child(',  // 1 indexed
      "Row End": ') ',
      "Date": 'td:nth-child(1)',
      "Details": 'td:nth-child(2)',
    },
  }
};  // ends selectors

