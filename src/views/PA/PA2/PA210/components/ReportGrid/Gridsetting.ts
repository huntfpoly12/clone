import filters from "@/helpers/filters";
import { WithholdingStatusReport } from "@bankda/jangbuda-common";
const cellValueGreaterThan0 = (query: any, callback: any) => {
  if (typeof query == 'number' && query >= 0) {
    callback(true)
  } else {
    callback(false)
  }
  
}

/**
 * generate output data
 * @param {*} instance 
 * @param {*} td 
 * @param {*} row 
 * @param {*} col 
 * @param {*} prop 
 * @param {*} value 
 * @param {*} cellProperties 
 */
const CellRenderer = (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any)=>{
  if (row === 4) {
      td.style.fontWeight = 'bold';
      td.innerHTML = `<p style="color:red;margin: unset;float: right;font-style: italic;">${filters.formatCurrency(parseInt(cellProperties.oldValue))}</p><br><p style="margin: unset;float: right;">${filters.formatCurrency(parseInt(value))}</p>`
      return td;
    }
}

export const mergeCells = [
    { row: 0, col: 0, rowspan: 1, colspan: 13 },

    { row: 1, col: 0, rowspan: 3, colspan: 1 },
    { row: 1, col: 1, rowspan: 3, colspan: 3 },
    { row: 1, col: 4, rowspan: 3, colspan: 1 },
    { row: 1, col: 5, rowspan: 1, colspan: 5 },
    { row: 1, col: 10, rowspan: 3, colspan: 1 },
    { row: 1, col: 11, rowspan: 1, colspan: 2 },

    { row: 2, col:5, rowspan: 1, colspan: 2 },
    { row: 2, col: 7, rowspan: 1, colspan: 3 },

    { row: 2, col:11, rowspan: 2, colspan: 1 },
    { row: 2, col: 12, rowspan: 2, colspan: 1 },

    { row: 4, col: 0, rowspan: 26, colspan: 1 },
    { row: 4, col: 1, rowspan: 7, colspan: 1 },
    { row: 4, col: 2, rowspan: 1, colspan: 2 },

    { row: 5, col: 2, rowspan: 1, colspan: 2 },

    { row: 6, col: 2, rowspan: 1, colspan: 2 },

    { row: 7, col: 2, rowspan: 3, colspan: 1 },

    { row: 10, col: 2, rowspan: 1, colspan: 2 },

    { row: 11, col: 1, rowspan: 3, colspan: 1 },
    { row: 11, col: 2, rowspan: 1, colspan: 2 },

    { row: 12, col: 2, rowspan: 1, colspan: 2 },
    { row: 13, col: 2, rowspan: 1, colspan: 2 },

    { row: 14, col: 1, rowspan: 3, colspan: 1 },
    { row: 14, col: 2, rowspan: 1, colspan: 2 },

    { row: 15, col: 2, rowspan: 1, colspan: 2 },
    { row: 16, col: 2, rowspan: 1, colspan: 2 },

    { row: 17, col: 1, rowspan: 5, colspan: 1 },
    { row: 17, col: 2, rowspan: 1, colspan: 2 },

    { row: 18, col: 2, rowspan: 2, colspan: 1 },
    { row: 20, col: 2, rowspan: 1, colspan: 2 },
    { row: 21, col: 2, rowspan: 1, colspan: 2 },
    { row: 22, col: 1, rowspan: 4, colspan: 1 },
    { row: 22, col: 2, rowspan: 1, colspan: 2 },
    { row: 23, col: 2, rowspan: 1, colspan: 2 },
    { row: 24, col: 2, rowspan: 1, colspan: 2 },
    { row: 25, col: 2, rowspan: 1, colspan: 2 },
    { row: 26, col: 1, rowspan: 1, colspan: 3 },
    { row: 27, col: 1, rowspan: 1, colspan: 3 },
    { row: 28, col: 1, rowspan: 1, colspan: 3 },
    { row: 29, col: 1, rowspan: 1, colspan: 3 },

    { row: 30, col: 1, rowspan: 1, colspan: 3 },
    { row: 31, col: 0, rowspan: 1, colspan: 4 },
    { row: 32, col: 0, rowspan: 1, colspan: 4 },

    { row: 33, col: 0, rowspan: 1, colspan: 13 },
    { row: 34, col: 0, rowspan: 1, colspan: 5 },
    { row: 34, col: 5, rowspan: 1, colspan: 4 },
    { row: 34, col: 9, rowspan: 3, colspan: 1 },
    { row: 34, col: 10, rowspan: 3, colspan: 1 },
    { row: 34, col: 11, rowspan: 3, colspan: 1 },
    { row: 34, col: 12, rowspan: 3, colspan: 1 },
    { row: 35, col: 0, rowspan: 2, colspan: 2 },
    { row: 35, col: 2, rowspan: 2, colspan: 1 },
    { row: 35, col: 3, rowspan: 2, colspan: 2 },
    { row: 35, col: 5, rowspan: 2, colspan: 1 },
    { row: 35, col: 6, rowspan: 2, colspan: 1 },
    { row: 35, col: 7, rowspan: 1, colspan: 2 },
    { row: 36, col: 7, rowspan: 1, colspan: 1 },
    { row: 36, col: 8, rowspan: 1, colspan: 1 },
    { row: 37, col: 0, rowspan: 1, colspan: 2 },
    { row: 37, col: 3, rowspan: 1, colspan: 2 },
  ]

export const cellsSetting = [
    { row: 0, col: 0, readOnly: true },

    { row: 1, col: 0, readOnly: true , className: 'htMiddle',},
    { row: 1, col: 1, readOnly: true , className: 'htCenter htMiddle' },
    { row: 1, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 1, col: 5, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 1, col: 10, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 1, col: 11, readOnly: true  , className: 'htCenter htMiddle'},

    { row: 2, col:5, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 2, col: 7, readOnly: true  , className: 'htCenter htMiddle'},

    { row: 2, col:11, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 2, col: 12, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},

    { row: 3, col: 5, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 3, col: 6, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 3, col: 7, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 3, col: 8, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 3, col: 9, readOnly: true  , className: 'htCenter htMiddle'},

    { row: 4, col: 0, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 4, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 4, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 4, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 5, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 5, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 6, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 6, col: 4, readOnly: true  , className: 'htCenter htMiddle'},

    { row: 7, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 7, col: 3, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 7, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 8, col: 3, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 8, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 9, col: 3, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 9, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 10, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 10, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 11, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 11, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 11, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 12, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 12, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 13, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 13, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 14, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 14, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 14, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 15, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 15, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 16, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 16, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 17, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 17, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 17, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 18, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 18, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 18, col: 3, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 19, col: 3, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 19, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 20, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 20, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 21, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 21, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 22, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 22, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 22, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 23, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 23, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 24, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 24, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 25, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 25, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 26, col: 1, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 26, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 27, col: 1, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 27, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 28, col: 1, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 28, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 29, col: 1, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 29, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 30, col: 0, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 30, col: 1, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 30, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 31, col: 0, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 31, col: 4, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 32, col: 0, readOnly: true  , className: 'htCenter htMiddle'},
    { row: 32, col: 4, readOnly: true  , className: 'htCenter htMiddle' },
    { row: 33, col: 0, readOnly: true  , renderer: 'html'},
    { row: 34, col: 0, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 0, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 5, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 9, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 10, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 11, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 34, col: 12, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 0, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 3, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 5, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 6, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 35, col: 7, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 36, col: 7, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
    { row: 36, col: 8, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
      // cells to enter data
    { row: 4, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 4, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 4, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 4, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 4, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 4, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 4, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 4, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 5, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 5, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 5, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 5, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 5, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 5, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 5, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 5, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 6, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 6, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 6, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 6, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 6, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 6, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 6, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 6, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 7, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 7, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 7, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 7, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 7, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 7, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 7, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 7, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 8, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 8, col: 6   , className: 'disable-cell',readOnly: true},
    { row: 8, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 8, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 8, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 9, col: 5   , className: 'disable-cell',readOnly: true},
    { row: 9, col: 6   , className: 'disable-cell',readOnly: true},
    { row: 9, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 9, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 9, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 9, col: 10  , className: 'disable-cell',readOnly: true },
    { row: 9, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 9, col: 12  , className: 'disable-cell',readOnly: true },

    { row: 10, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 10, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 11, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 11, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 11, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 11, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 11, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 12, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 12, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 12, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 12, col: 8 , className: 'disable-cell',readOnly: true},
    { row: 12, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 12, col: 10 , className: 'disable-cell',readOnly: true},
    { row: 12, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 12, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 13, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 13, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 13, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 14, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 14, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 14, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 14, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 14, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 14, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 14, col: 11 , className: 'disable-cell',readOnly: true },
    { row: 14, col: 12 , className: 'disable-cell',readOnly: true},

    { row: 15, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 15, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 15, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 15, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 15, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 15, col: 10 , className: 'disable-cell',readOnly: true},
    { row: 15, col: 11 , className: 'disable-cell',readOnly: true},
    { row: 15, col: 12 , className: 'disable-cell',readOnly: true},

    { row: 16, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 16, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 17, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 17, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 17, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 17, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 17, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 17, col: 10 , className: 'disable-cell',readOnly: true},
    { row: 17, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 17, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 18, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 18, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 18, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 18, col: 8 , className: 'disable-cell',readOnly: true},
    { row: 18, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 18, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 18, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 18, col: 12 , className: 'disable-cell',readOnly: true},

    { row: 19, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 19, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 19, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 19, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 19, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 19, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 19, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 19, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 20, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 20, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 20, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 20, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 20, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
    { row: 20, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 20, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 20, col: 12  , className: 'disable-cell',readOnly: true},
    
    { row: 21, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 21, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 12 , className: 'disable-cell',readOnly: true},

    { row: 22, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 22, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 22, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 22, col: 8   , className: 'disable-cell',readOnly: true},
    { row: 22, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 22, col: 10   , className: 'disable-cell',readOnly: true},
    { row: 22, col: 11  , className: 'disable-cell',readOnly: true },
    { row: 22, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 23, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 23, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 23, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 23, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 23, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 23, col: 10 , className: 'disable-cell',readOnly: true},
    { row: 23, col: 11  , className: 'disable-cell',readOnly: true},
    { row: 23, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 24, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 24, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 24, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 24, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 24, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 24, col: 10  , className: 'disable-cell',readOnly: true},
    { row: 24, col: 11  , className: 'disable-cell',readOnly: true},
    { row: 24, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 25, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 25, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 25, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 25, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 25, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 25, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 25, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 25, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 26, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 26, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 26, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 26, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 26, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 26, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 26, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 26, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 27, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 27, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 27, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 27, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 27, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 27, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 27, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 27, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 28, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 28, col: 6  , className: 'disable-cell',readOnly: true},
    { row: 28, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 28, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 28, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 28, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 28, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 28, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 29, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 29, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 29, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 29, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 29, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 29, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 29, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 29, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 30, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 30, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 30, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 30, col: 8  , className: 'disable-cell',readOnly: true},
    { row: 30, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 30, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 30, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }, },
    { row: 30, col: 12  , className: 'disable-cell',readOnly: true},

    { row: 31, col: 5  , className: 'disable-cell',readOnly: true},
    { row: 31, col: 6  , className: 'disable-cell',readOnly: true},
    { row: 31, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 31, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 31, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 31, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 31, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 31, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 32, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 32, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 10  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 11  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true  },
    { row: 32, col: 12, className: 'htMiddle htRight', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, },
  
    { row: 37, col: 0  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 3  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 4  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 10, className: 'htMiddle htRight', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 11, className: 'htMiddle htRight', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true },
    { row: 37, col: 12, className: 'htMiddle htRight', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
]

export  const dataInit = [
  ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨<br> 당월 조정<br>환급세액", "납부 세액", ""],
  ["", "", "", "", "", "소 득 지 급 <br>(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩<br>소득세 등<br>(가산세 포함)", "⑪ <br>농어촌<br> 특별세"],
  ["", "", "", "", "", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌<br>특별세", "⑧가산세", "", "", ""],
  ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01", "", "", "", "", "", "", "", ""],
  ["", "", "중도퇴사", "", "A02", "", "", "", "", "", "", "", ""],
  ["", "", "일용근로", "", "A03", "", "", "", "", "", "", "", ""],
  ["", "", "연말<br>정산", "합계", "A04", "", "", "", "", "", "", "", ""],
  ["", "", "", "분납신청", "A05", "", "", "", "", "", "", "", ""],
  ["", "", "", "납부금액", "A06", "", "", "", "", "", "", "", ""],
  ["", "", "가감계", "", "A10", "", "", "", "", "", "", "", ""],
  ["", "퇴직<br>소득", "연금계좌", "", "A21", "", "", "", "", "", "", "", ""],
  ["", "", "그 외	", "", "A22", "", "", "", "", "", "", "", ""],
  ["", "", "가감계", "", "A20", "", "", "", "", "", "", "", ""],
  ["", "사업<br>소득", "매월징수", "", "A25", "", "", "", "", "", "", "", ""],
  ["", "", "연말정산", "", "A26", "", "", "", "", "", "", "", ""],
  ["", "", "가감계", "", "A30", "", "", "", "", "", "", "", ""],
  ["", "기타<br>소득", "연금계좌", "", "A41", "", "", "", "", "", "", "", ""],
  ["", "", "종교인<br>소득", "매월징수", "A43", "", "", "", "", "", "", "", ""],
  ["", "", "", "연말정산", "A44", "", "", "", "", "", "", "", ""],
  ["", "", "그 외", "", "A42", "", "", "", "", "", "", "", ""],
  ["", "", "가감계", "", "A40", "", "", "", "", "", "", "", ""],
  ["", "연<br>금<br>소<br>득", "연금계좌", "", "A48", "", "", "", "", "", "", "", ""],
  ["", "", "공적연금 매월 (매월)", "", "A45", "", "", "", "", "", "", "", ""],
  ["", "", "연말정산", "", "A46", "", "", "", "", "", "", "", ""],
  ["", "", "가감계", "", "A47", "", "", "", "", "", "", "", ""],
  ["", "이자소득", "", "", "A50", "", "", "", "", "", "", "", ""],
  ["", "배당소득", "", "", "A60", "", "", "", "", "", "", "", ""],
  ["", "저축 등 해지 추징세액 등", "", "", "A69", "", "", "", "", "", "", "", ""],
  ["", "비거주자 양도소득", "", "", "A70", "", "", "", "", "", "", "", ""],
  ["법인", "내ㆍ외국법인원천", "", "", "A80", "", "", "", "", "", "", "", ""],
  ["수정신고 세액 (세액)", "", "", "", "A90", "", "", "", "", "", "", "", ""],
  ["총 합 계", "", "", "", "A99", "", "", "", "", "", "", "", ""],
  ["2. 환급세액 조정", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["전월 미환급 세액의 계산", "", "", "", "", "당월 발생 환급세액", "", "", "", "⑱<br>조정대상<br>환급세액<br>(⑭+⑮+⑯+<br>⑰)", "⑲<br>당월조정 환<br>급세액계", "⑳<br>차월이월환급세액<br>(⑱-⑲)", "(21) 환급<br>신청액 "],
  ["⑫ 전월<br>미환급세액", "", "⑬기환급<br>신청세액", "⑭ 차감잔액<br>(⑫ - ⑬) ", "", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
  ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", ""],
]

export const inputPosition = [
  { "className":"A01","value": [[4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12]] },
  { "className":"A02","value": [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12]] },
  { "className":"A03","value": [[6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12]] },
  { "className":"A04","value": [[7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12]] },
  { "className":"A05","value": [[8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12]] },
  { "className":"A06","value": [[9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12]] },
  { "className":"A10","value": [[10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12]] },
  { "className":"A21","value": [[11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12]] },
  { "className":"A22","value": [[12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12]] },
  { "className":"A20","value": [[13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12]] },
  { "className":"A25","value": [[14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12]] },
  { "className":"A26","value": [[15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12]] },
  { "className":"A30","value": [[16, 5], [16, 6], [16, 7], [16, 8], [16, 9], [16, 10], [16, 11], [16, 12]] },
  { "className":"A41","value": [[17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [17, 10], [17, 11], [17, 12]] },
  { "className":"A43","value": [[18, 5], [18, 6], [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [18, 12]] },
  { "className":"A44","value": [[19, 5], [19, 6], [19, 7], [19, 8], [19, 9], [19, 10], [19, 11], [19, 12]] },
  { "className":"A42","value": [[20, 5], [20, 6], [20, 7], [20, 8], [20, 9], [20, 10], [20, 11], [20, 12]] },
  { "className":"A40","value": [[21, 5], [21, 6], [21, 7], [21, 8], [21, 9], [21, 10], [21, 11], [21, 12]] },
  { "className":"A48","value": [[22, 5], [22, 6], [22, 7], [22, 8], [22, 9], [22, 10], [22, 11], [22, 12]] },
  { "className":"A45","value": [[23, 5], [23, 6], [23, 7], [23, 8], [23, 9], [23, 10], [23, 11], [23, 12]] },
  { "className":"A46","value": [[24, 5], [24, 6], [24, 7], [24, 8], [24, 9], [24, 10], [24, 11], [24, 12]] },
  { "className":"A47","value": [[25, 5], [25, 6], [25, 7], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12]] },
  { "className":"A50","value": [[26, 5], [26, 6], [26, 7], [26, 8], [26, 9], [26, 10], [26, 11], [26, 12]] },
  { "className":"A60","value": [[27, 5], [27, 6], [27, 7], [27, 8], [27, 9], [27, 10], [27, 11], [27, 12]] },
  { "className":"A69","value": [[28, 5], [28, 6], [28, 7], [28, 8], [28, 9], [28, 10], [28, 11], [28, 12]] },
  { "className":"A70","value": [[29, 5], [29, 6], [29, 7], [29, 8], [29, 9], [29, 10], [29, 11], [29, 12]] },
  { "className":"A80","value": [[30, 5], [30, 6], [30, 7], [30, 8], [30, 9], [30, 10], [30, 11], [30, 12]] },
  { "className":"A90","value": [[31, 5], [31, 6], [31, 7], [31, 8], [31, 9], [31, 10], [31, 11], [31, 12]] },
  { "className": "A99", "value": [[32, 5], [32, 6], [32, 7], [32, 8], [32, 9], [32, 10], [32, 11], [32, 12]] },
  { "className":"adjustmentOfRefundTaxAmount","value": [[37, 0], [37, 3], [37, 4], [37, 6], [37, 7], [37, 8], [37, 9], [37, 10], [37, 11], [37, 12]] },
]

export const clearAllCellValue = (wrapper: any) => {
  let hot = wrapper.value?.hotInstance;
  hot?.updateData([
    ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨<br> 당월 조정<br>환급세액", "납부 세액", ""],
    ["", "", "", "", "", "소 득 지 급 <br>(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩<br>소득세 등<br>(가산세 포함)", "⑪ <br>농어촌<br> 특별세"],
    ["", "", "", "", "", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌<br>특별세", "⑧가산세", "", "", ""],
    ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01", "", "", "", "", "", "", "", ""],
    ["", "", "중도퇴사", "", "A02", "", "", "", "", "", "", "", ""],
    ["", "", "일용근로", "", "A03", "", "", "", "", "", "", "", ""],
    ["", "", "연말<br>정산", "합계", "A04", "", "", "", "", "", "", "", ""],
    ["", "", "", "분납신청", "A05", "", "", "", "", "", "", "", ""],
    ["", "", "", "납부금액", "A06", "", "", "", "", "", "", "", ""],
    ["", "", "가감계", "", "A10", "", "", "", "", "", "", "", ""],
    ["", "퇴직<br>소득", "연금계좌", "", "A21", "", "", "", "", "", "", "", ""],
    ["", "", "그 외	", "", "A22", "", "", "", "", "", "", "", ""],
    ["", "", "가감계", "", "A20", "", "", "", "", "", "", "", ""],
    ["", "사업<br>소득", "매월징수", "", "A25", "", "", "", "", "", "", "", ""],
    ["", "", "연말정산", "", "A26", "", "", "", "", "", "", "", ""],
    ["", "", "가감계", "", "A30", "", "", "", "", "", "", "", ""],
    ["", "기타<br>소득", "연금계좌", "", "A41", "", "", "", "", "", "", "", ""],
    ["", "", "종교인<br>소득", "매월징수", "A43", "", "", "", "", "", "", "", ""],
    ["", "", "", "연말정산", "A44", "", "", "", "", "", "", "", ""],
    ["", "", "그 외", "", "A42", "", "", "", "", "", "", "", ""],
    ["", "", "가감계", "", "A40", "", "", "", "", "", "", "", ""],
    ["", "연<br>금<br>소<br>득", "연금계좌", "", "A48", "", "", "", "", "", "", "", ""],
    ["", "", "공적연금 매월 (매월)", "", "A45", "", "", "", "", "", "", "", ""],
    ["", "", "연말정산", "", "A46", "", "", "", "", "", "", "", ""],
    ["", "", "가감계", "", "A47", "", "", "", "", "", "", "", ""],
    ["", "이자소득", "", "", "A50", "", "", "", "", "", "", "", ""],
    ["", "배당소득", "", "", "A60", "", "", "", "", "", "", "", ""],
    ["", "저축 등 해지 추징세액 등", "", "", "A69", "", "", "", "", "", "", "", ""],
    ["", "비거주자 양도소득", "", "", "A70", "", "", "", "", "", "", "", ""],
    ["법인", "내ㆍ외국법인원천", "", "", "A80", "", "", "", "", "", "", "", ""],
    ["수정신고 세액 (세액)", "", "", "", "A90", "", "", "", "", "", "", "", ""],
    ["총 합 계", "", "", "", "A99", "", "", "", "", "", "", "", ""],
    ["2. 환급세액 조정", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["전월 미환급 세액의 계산", "", "", "", "", "당월 발생 환급세액", "", "", "", "⑱<br>조정대상<br>환급세액<br>(⑭+⑮+⑯+<br>⑰)", "⑲<br>당월조정 환<br>급세액계", "⑳<br>차월이월환급세액<br>(⑱-⑲)", "(21) 환급<br>신청액 "],
    ["⑫ 전월<br>미환급세액", "", "⑬기환급<br>신청세액", "⑭ 차감잔액<br>(⑫ - ⑬) ", "", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
    ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
  ])
  // inputPosition.forEach((item: any) => {
  //   item.value.forEach((val: any) => {
  //     hot?.setDataAtCell(val[0],val[1],null);
  //   });
  // })
} 

export const setValueDataTable = (wrapper: any,code: string, data: any) => {
  let hot = wrapper?.value.hotInstance;
  const rowPosition = inputPosition.find(item => item.className == code);
  if (data.numberOfPeople)
    hot.setDataAtCell(rowPosition?.value[0][0], rowPosition?.value[0][1], data.numberOfPeople);
  if (data.totalPayment)
    hot.setDataAtCell(rowPosition?.value[1][0], rowPosition?.value[1][1], data.totalPayment);
  if (data.collectedIncomeTax)
    hot.setDataAtCell(rowPosition?.value[2][0], rowPosition?.value[2][1], data.collectedIncomeTax);
  if (data.collectedRuralSpecialTax)
    hot.setDataAtCell(rowPosition?.value[3][0], rowPosition?.value[3][1], data.collectedRuralSpecialTax);
  if (data.collectedExtraTax)
    hot.setDataAtCell(rowPosition?.value[4][0], rowPosition?.value[4][1], data.collectedExtraTax);
  if (data.thisMonthAdjustedRefundTaxAmount)
    hot.setDataAtCell(rowPosition?.value[5][0], rowPosition?.value[5][1], data.thisMonthAdjustedRefundTaxAmount);
  if (data.incomeTaxPaid)
    hot.setDataAtCell(rowPosition?.value[6][0], rowPosition?.value[6][1], data.incomeTaxPaid);
  if (data.ruralSpecialTaxPaid)
    hot.setDataAtCell(rowPosition?.value[7][0], rowPosition?.value[7][1], data.ruralSpecialTaxPaid);

  if (data.prevMonthNonRefundableTaxAmount)
    hot.setDataAtCell(rowPosition?.value[0][0], rowPosition?.value[0][1], data.prevMonthNonRefundableTaxAmount);
  if (data.preRefundApplicationTaxAmount)
    hot.setDataAtCell(rowPosition?.value[1][0], rowPosition?.value[1][1], data.preRefundApplicationTaxAmount);
  if (data.deductibleBalance)
    hot.setDataAtCell(rowPosition?.value[2][0], rowPosition?.value[2][1], data.deductibleBalance);
  if (data.thisMonthRefundTaxGeneral)
    hot.setDataAtCell(rowPosition?.value[3][0], rowPosition?.value[3][1], data.thisMonthRefundTaxGeneral);
  if (data.thisMonthRefundTaxOtherFinancialCompany)
    hot.setDataAtCell(rowPosition?.value[4][0], rowPosition?.value[4][1], data.thisMonthRefundTaxOtherFinancialCompany);
  if (data.thisMonthRefundTaxOtherMerge)
    hot.setDataAtCell(rowPosition?.value[5][0], rowPosition?.value[5][1], data.thisMonthRefundTaxOtherMerge);
  if (data.refundTaxSubjectToAdjustment)
    hot.setDataAtCell(rowPosition?.value[6][0], rowPosition?.value[6][1], data.refundTaxSubjectToAdjustment);
  if (data.thisMonthTotalAdjustedRefundTaxAmount)
    hot.setDataAtCell(rowPosition?.value[7][0], rowPosition?.value[7][1], data.thisMonthTotalAdjustedRefundTaxAmount);
  if (data.nextMonthRefundTaxAmount)
    hot.setDataAtCell(rowPosition?.value[8][0], rowPosition?.value[8][1], data.nextMonthRefundTaxAmount);
  if (data.refundApplicationAmount)
    hot.setDataAtCell(rowPosition?.value[9][0], rowPosition?.value[9][1], data.refundApplicationAmount);
}

export const calculateWithholdingStatusReport = (wrapper: any,data: any = []) => {
  let cellData = Array()
  if (data.length > 0) {
    cellData = data
  } else {
    let hot = wrapper.value.hotInstance;
    const arrData = hot.getData()
    for (let index = 0; index < arrData.length; index++) {
      if (index >= 4 && index <= 32) {
        cellData.push({
          code: arrData[index][4],
          numberOfPeople: arrData[index][5],
          totalPayment: arrData[index][6],
          collectedIncomeTax: arrData[index][7],
        });
      }
    }
  }
  const output = WithholdingStatusReport.getWithholdingStatusReport(cellData);
    
    if (output.incomeWages.length > 0) { // 근로소득 [간이세액(A01), 중도퇴사(A02), 일용근로(A03), 연말정산-합계(A04), 연말정산-분납신청(A05), 연말정산-납부금액(A06), 가감계(A10)]
      output.incomeWages.forEach((item) => {
        setValueDataTable(wrapper,item.code,item)
      })
    }
    if (output.incomeRetirements.length > 0) { // 퇴직소득 [연금계좌(A12), 그외(A22), 가감계(A20)]
      output.incomeRetirements.forEach((item) => {
        setValueDataTable(wrapper,item.code,item)
      })
    }
    if (output.incomeBusinesses.length > 0) { // 사업소득 [매월징수(A25), 연말정산(A26), 가감계(A30)]
      output.incomeBusinesses.forEach((item) => {
        setValueDataTable(wrapper,item.code,item)
      })
    }
    if (output.incomeExtras.length > 0) { // 기타소득 [연금계좌(A41), 종교인소득-매월징수(A43), 종교인소득-연말정산(A44), 그외(A42), 가감계(A40)]
      output.incomeExtras.forEach((item) => {
        setValueDataTable(wrapper,item.code,item)
      })
    }
    if (output.incomePensions.length > 0) { // 연금소득 [연금계좌(A48), 공적연금(A45), 연말정산(A46), 가감계(A47)]
      output.incomePensions.forEach((item) => {
        setValueDataTable(wrapper,item.code,item)
      })
    }
    if (output.incomeInterest) { // 이자소득(A50)
        
    }
    if (output.incomeDividend) { // 배당소득(A60)
        
    }
    if (output.incomeSaving) { // 저축등해지추징세액등(A69)
        
    }
    if (output.modifyReport) { // 수정신고세액(A90)
        
    }
    setValueDataTable(wrapper,output.summary.code, output.summary)
    setValueDataTable(wrapper,"adjustmentOfRefundTaxAmount",output.adjustmentOfRefundTaxAmount)
    //r.push(output.summary); // 총합계(A99)
}
