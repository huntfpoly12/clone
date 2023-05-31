import filters from "@/helpers/filters";
import { WithholdingStatusReport } from "@bankda/jangbuda-common";
import Handsontable from "handsontable";
import { getObjectWithPositiveValues } from "../../utils";
const cellValueGreaterThan0 = (query: any, callback: any) => {
  if ((typeof query == 'number' && query > 0) || query === null) {
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
class CustomNumberEditor extends Handsontable.editors.TextEditor {
  prepare(row: number, col: number, prop: string | number, td: HTMLTableCellElement, originalValue: any, cellProperties: Handsontable.CellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    this.TEXTAREA.style.textAlign = "right"; // thiết lập văn bản từ phải sang trái
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
    { row: 4, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 4, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 4, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 4, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 4, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 4, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 4, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 4, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 5, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 5, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 5, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 5, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 5, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 5, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 5, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 5, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 6, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 6, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 6, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 6, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 6, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 6, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 6, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 6, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 7, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 7, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 7, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 7, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 7, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 7, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 7, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 7, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 8, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 8, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 8, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 8, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 8, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 8, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 9, col: 5   , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 9, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 9, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 9, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 9, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 9, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 9, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 9, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },

    { row: 10, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 10, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 10, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 11, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
    { row: 11, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 11, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
    { row: 11, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 11, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 11, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 12, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 12, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 12, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 12, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 12, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 12, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 12, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 12, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 13, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 13, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 13, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 13, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 14, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 14, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 14, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 14, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 14, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 14, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 14, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 14, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 15, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 15, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 15, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 15, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 15, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 15, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 15, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 15, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 16, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 16, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 16, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},

    { row: 17, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 17, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 17, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 17, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 17, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 17, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 17, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 17, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 18, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 18, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 18, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 18, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 18, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 18, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 18, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
    { row: 18, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 19, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 19, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 19, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 19, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 19, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 19, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 19, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 19, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 20, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 20, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 20, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 20, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 20, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
    { row: 20, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 20, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 20, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
    
    { row: 21, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 21, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 21, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 22, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 22, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 22, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 22, col: 8   , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 22, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 22, col: 10   , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 22, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
    { row: 22, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 23, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 23, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 23, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 23, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 23, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 23, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 23, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 23, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 24, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 24, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 24, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 24, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 24, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 24, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 24, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 24, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 25, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 25, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 25, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 26, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 26, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},

    { row: 27, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 27, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},

    { row: 28, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 28, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 28, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 28, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 28, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 28, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 28, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 28, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 29, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 29, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 29, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 30, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 30, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 30, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},

    { row: 31, col: 5  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 31, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true},
    { row: 31, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 31, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 31, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 31, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 31, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 31, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},

    { row: 32, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
    { row: 32, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 32, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true  },
    { row: 32, col: 12, className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },editor:CustomNumberEditor},
  
    { row: 37, col: 0  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,readOnly: true,editor:CustomNumberEditor},
    { row: 37, col: 2  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,readOnly: true,editor:CustomNumberEditor},
    { row: 37, col: 3  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 6  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 7  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 8  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 10, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
    { row: 37, col: 11, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true },
    { row: 37, col: 12, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
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

export const calculateWithholdingStatusReport =  async (wrapper: any, data: any = []) => {
  let hot = wrapper.value.hotInstance;
  let cellData = Array()
  const arrRowPass = ['A10','A99']
  if (data.length > 0) {
    cellData = data
  } else {
    const arrData = hot.getData()
    for (let index = 0; index < arrData.length; index++) {
      if (index >= 4 && index <= 32) {
        // check để lọc hết những row không có dữ liệu ra 
        // nếu là cột A10 và A99 cũng loại vì tất cả các cell đều disable
        if (
          (!arrRowPass.includes(arrData[index][4])) && 
          (
            typeof arrData[index][5] == 'number' ||
            typeof arrData[index][6] == 'number' ||
            typeof arrData[index][7] == 'number' ||
            typeof arrData[index][8] == 'number' ||
            typeof arrData[index][9] == 'number' ||
            typeof arrData[index][10] == 'number' ||
            typeof arrData[index][11] == 'number' ||
            typeof arrData[index][12] == 'number'
          )
        ) {
          // tất cả các trường đều phải lớn hơn 0 hoặc một số ô  như (A02-collectedIncomeTax),(A06-collectedIncomeTax),(A90-collectedIncomeTax)
          let itemObject = {    
            /** 코드 (code) */
            code: arrData[index][4],
            /** 소득지급 인원 (numberOfPeople) */
            numberOfPeople: arrData[index][5] && arrData[index][5] !=='' ? arrData[index][5] : null,
            /** 소득지급 총지급액 (totalPayment) */
            totalPayment: arrData[index][6] && arrData[index][6] !=='' ? arrData[index][6] : null,
            /** 징수 소득세 (collectedIncomeTax) */
            collectedIncomeTax: arrData[index][7] && arrData[index][7] !=='' ? arrData[index][7] : null,
            /** 징수 농어촌특별세 (collectedRuralSpecialTax) */
            collectedRuralSpecialTax: arrData[index][8] && arrData[index][8] !=='' ? arrData[index][8] : null,
            /** 징수 가산세 (collectedExtraTax) */
            collectedExtraTax: arrData[index][9] && arrData[index][9] !=='' ? arrData[index][9] : null,
            /** 당월조정환급세액 (thisMonthAdjustedRefundTaxAmount) */
            thisMonthAdjustedRefundTaxAmount: arrData[index][10] && arrData[index][10] !=='' ? arrData[index][10] : null,
            /** 납부 소득세 (incomeTaxPaid) */
            incomeTaxPaid: arrData[index][11] && arrData[index][11] !=='' ? arrData[index][11] : null,
            /** 납부 농어촌특별세 (ruralSpecialTaxPaid) */
            ruralSpecialTaxPaid: arrData[index][12] && arrData[index][12] !=='' ? arrData[index][12] : null,
          }
          // check xem object đã đạt tiêu chuẩn chưa có ít nhất 1 trường có giá trị
          // if (
          //   getObjectWithPositiveValues(itemObject)
          // ) {
            cellData.push(itemObject);
          // }
        }

      }
    }
  }
  console.log(cellData,'cellData input');
  
  let output = WithholdingStatusReport.getWithholdingStatusReport(cellData);
  await convertZeroData(output).then((res) => {
    output = res
  })
  console.log(output,'output output');
  let dataTable = await convertArrData(output)
  console.log(dataTable,'dataTable output');
  hot.setDataAtCell(dataTable, 'setdata');
  // phần xử lý vấn đề liên quan đến việc switch refund và YearTaxAdjustment
  let checkYETaxAdj = checkYETaxAdjustment(output)
  let cell12 =  hot.getDataAtCell(37,12);
  return { checkYETaxAdj, cell12 }
  //r.push(output.summary); // 총합계(A99)
}

function addMissingFields(arr : any) {
  const fields = [
    'collectedExtraTax',
    'collectedIncomeTax',
    'collectedRuralSpecialTax',
    'incomeTaxPaid',
    'numberOfPeople',
    'ruralSpecialTaxPaid',
    'thisMonthAdjustedRefundTaxAmount',
    'totalPayment'
  ];
  if (Array.isArray(arr)) {
    let newArr: any[] = []
    arr.forEach((obj : any) => {
      fields.forEach(field => {
        if (obj[field] == 0) {
          obj[field] = null
        }
        if (!obj.hasOwnProperty(field)) {
          obj[field] = null;
        }
      });
      newArr.push(obj)
    });
    return newArr;
  } else if(typeof arr == 'object') {
    fields.forEach(field => {
      if (arr[field] == 0) {
        arr[field] = null
      }
      if (!arr.hasOwnProperty(field)) {
        arr[field] = null;
      }
    });
    return arr;
  }
}

// đổi hết data nếu bằng 0 thành null 
const convertZeroData = async (output: any) => {
  const clonedOutput = JSON.parse(JSON.stringify(output));
  for (let key in clonedOutput) {
    if (key === 'adjustmentOfRefundTaxAmount' || typeof clonedOutput[key] == 'undefined') {
      continue;
    }
    clonedOutput[key] = await addMissingFields(clonedOutput[key])
  };
  return clonedOutput
}

// hàm kiểm tra nhằm thay đổi trạng thái check hoặc không check của yearEndTaxAdjustment
export const checkYETaxAdjustment = (output: any) => {
  let checkStatus = false
  const A04 = output.incomeWages.find((el: { code: string; }) =>{
    if (el.code == 'A04' && getObjectWithPositiveValues(el)) {
      return el
    }else null
  });
  const A05 = output.incomeWages.find((el: { code: string; }) => {
    if (el.code == 'A05' && getObjectWithPositiveValues(el)) {
      return el
    }else null
  });
  const A06 = output.incomeWages.find((el: { code: string; }) => {
    if (el.code == 'A06' && getObjectWithPositiveValues(el)) {
      return el
    }else null
  });
  const A26 = output.incomeBusinesses.find((el: { code: string; }) => {
    if (el.code == 'A26' && getObjectWithPositiveValues(el)) {
      return el
    }else null
  });
  const A46 = output.incomePensions.find((el: { code: string; }) => {
    if (el.code == 'A46' && getObjectWithPositiveValues(el)) {
      return el
    }else null
  });
  if (A04 || A05 || A06 || A26 || A46) {
    checkStatus = true
  }
  return checkStatus
}

const convertArrData = async (data : any)=>{
  const rawArr: any[] = [];
  for (var key in data) {
    if(key == 'summary'){
      rawArr.push(data[key]);
    }else if(key == 'adjustmentOfRefundTaxAmount'){
      data[key].code = 'adjustmentOfRefundTaxAmount';
      rawArr.push(data[key]);
    }else{
      if(data[key].length > 0){
        data[key].forEach((item : any )=>{
          rawArr.push(item);
        })
      }
    }
  };
  const result: any[] = [];
  rawArr.forEach((itemRaw : any)=>{
      const rowPosition = inputPosition.find(item => item.className == itemRaw.code);
      if (typeof itemRaw.numberOfPeople === "number" || itemRaw.numberOfPeople === null)
        result.push([rowPosition?.value[0][0], rowPosition?.value[0][1], itemRaw.numberOfPeople]);
      if (typeof itemRaw.totalPayment === "number" || itemRaw.totalPayment === null)
        result.push([rowPosition?.value[1][0], rowPosition?.value[1][1], itemRaw.totalPayment]);
      if (typeof itemRaw.collectedIncomeTax === "number" || itemRaw.collectedIncomeTax === null)
        result.push([rowPosition?.value[2][0], rowPosition?.value[2][1], itemRaw.collectedIncomeTax]);
      if (typeof itemRaw.collectedRuralSpecialTax === "number" || itemRaw.collectedRuralSpecialTax === null)
        result.push([rowPosition?.value[3][0], rowPosition?.value[3][1], itemRaw.collectedRuralSpecialTax]);
      if (typeof itemRaw.collectedExtraTax === "number" || itemRaw.collectedExtraTax === null)  
        result.push([rowPosition?.value[4][0], rowPosition?.value[4][1], itemRaw.collectedExtraTax]);
      if (typeof itemRaw.thisMonthAdjustedRefundTaxAmount === "number" || itemRaw.thisMonthAdjustedRefundTaxAmount === null)
        result.push([rowPosition?.value[5][0], rowPosition?.value[5][1], itemRaw.thisMonthAdjustedRefundTaxAmount]);
      if (typeof itemRaw.incomeTaxPaid === "number" || itemRaw.incomeTaxPaid === null)
        result.push([rowPosition?.value[6][0], rowPosition?.value[6][1], itemRaw.incomeTaxPaid]);
      if (typeof itemRaw.ruralSpecialTaxPaid === "number" || itemRaw.ruralSpecialTaxPaid === null)
        result.push([rowPosition?.value[7][0], rowPosition?.value[7][1], itemRaw.ruralSpecialTaxPaid]);
   
      if (typeof itemRaw.prevMonthNonRefundableTaxAmount === "number" || itemRaw.prevMonthNonRefundableTaxAmount === null)
      result.push([rowPosition?.value[0][0], rowPosition?.value[0][1], itemRaw.prevMonthNonRefundableTaxAmount]);
      if (typeof itemRaw.preRefundApplicationTaxAmount === "number" || itemRaw.preRefundApplicationTaxAmount === null)
      result.push([rowPosition?.value[1][0], rowPosition?.value[1][1], itemRaw.preRefundApplicationTaxAmount]);
      if (typeof itemRaw.deductibleBalance === "number" || itemRaw.deductibleBalance === null)
      result.push([rowPosition?.value[2][0], rowPosition?.value[2][1], itemRaw.deductibleBalance]);
      if (typeof itemRaw.thisMonthRefundTaxGeneral === "number" || itemRaw.thisMonthRefundTaxGeneral === null)
      result.push([rowPosition?.value[3][0], rowPosition?.value[3][1], itemRaw.thisMonthRefundTaxGeneral]);
      if (typeof itemRaw.thisMonthRefundTaxOtherFinancialCompany === "number" || itemRaw.thisMonthRefundTaxOtherFinancialCompany === null)
      result.push([rowPosition?.value[4][0], rowPosition?.value[4][1], itemRaw.thisMonthRefundTaxOtherFinancialCompany]);
      if (typeof itemRaw.thisMonthRefundTaxOtherMerge === "number" || itemRaw.thisMonthRefundTaxOtherMerge === null)
      result.push([rowPosition?.value[5][0], rowPosition?.value[5][1], itemRaw.thisMonthRefundTaxOtherMerge]);
      if (typeof itemRaw.refundTaxSubjectToAdjustment === "number" || itemRaw.refundTaxSubjectToAdjustment === null)
      result.push([rowPosition?.value[6][0], rowPosition?.value[6][1], itemRaw.refundTaxSubjectToAdjustment]);
      if (typeof itemRaw.thisMonthTotalAdjustedRefundTaxAmount === "number" || itemRaw.thisMonthTotalAdjustedRefundTaxAmount === null)
      result.push([rowPosition?.value[7][0], rowPosition?.value[7][1], itemRaw.thisMonthTotalAdjustedRefundTaxAmount]);
      if (typeof itemRaw.nextMonthRefundTaxAmount === "number" || itemRaw.nextMonthRefundTaxAmount === null)
      result.push([rowPosition?.value[8][0], rowPosition?.value[8][1], itemRaw.nextMonthRefundTaxAmount]);
      if (typeof itemRaw.refundApplicationAmount === "number" || itemRaw.refundApplicationAmount === null)
      result.push([rowPosition?.value[9][0], rowPosition?.value[9][1], itemRaw.refundApplicationAmount]);
  })
  return result;
}
