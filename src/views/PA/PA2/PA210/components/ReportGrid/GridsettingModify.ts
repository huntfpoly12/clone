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
const CellRenderer = (instance?: any, td?: any, row?: any, col?: any, prop?: any, value?: any, cellProperties?: any) => {
  if (value) { 
    td.className  = cellProperties.className
    td.innerHTML = `<p style="color:red;margin: unset;float: right;font-style: italic;">${filters.formatCurrency(parseInt(value))}</p>`    
  } else {
    td.className  = cellProperties.className
  }   
  return td;
}

class CustomNumberEditor extends Handsontable.editors.TextEditor {
  prepare(row: number, col: number, prop: string | number, td: HTMLTableCellElement, originalValue: any, cellProperties: Handsontable.CellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties);
    this.TEXTAREA.style.textAlign = "right"; // thiết lập văn bản từ phải sang trái
  }
}

// setting for modified data table
export const mergeCellsModified = [
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

  { row: 4, col: 0, rowspan: 52, colspan: 1 },
  { row: 4, col: 1, rowspan: 14, colspan: 1 },
  { row: 4, col: 2, rowspan: 2, colspan: 2 },
  { row: 4, col: 4, rowspan: 2, colspan: 1 },

  { row: 6, col: 2, rowspan: 2, colspan: 2 },
  { row: 6, col: 4, rowspan: 2, colspan: 1 },

  { row: 8, col: 2, rowspan: 2, colspan: 2 },
  { row: 8, col: 4, rowspan: 2, colspan: 1 },

  { row: 10, col: 2, rowspan: 6, colspan: 1 },
  { row: 10, col: 3, rowspan: 2, colspan: 1 },
  { row: 10, col: 4, rowspan: 2, colspan: 1 },

  { row: 12, col: 3, rowspan: 2, colspan: 1 },
  { row: 12, col: 4, rowspan: 2, colspan: 1 },

  { row: 14, col: 3, rowspan: 2, colspan: 1 },
  { row: 14, col: 4, rowspan: 2, colspan: 1 },


  { row: 16, col: 2, rowspan: 2, colspan:  2},
  { row: 16, col: 4, rowspan: 2, colspan: 1 },
  
  { row: 18, col: 1, rowspan: 6, colspan: 1},
  { row: 18, col: 2, rowspan: 2, colspan: 2 },
  { row: 18, col: 4, rowspan: 2, colspan: 1 },

  { row: 20, col: 2, rowspan: 2, colspan: 2},
  { row: 20, col: 4, rowspan: 2, colspan: 1},
  
  { row: 22, col: 2, rowspan: 2, colspan: 2 },
  { row: 22, col: 4, rowspan: 2, colspan: 1 },
  
  { row: 24, col: 1, rowspan: 6, colspan: 1 },
  { row: 24, col: 2, rowspan: 2, colspan: 2 },
  { row: 24, col: 4, rowspan: 2, colspan: 1 },

  { row: 26, col: 2, rowspan: 2, colspan: 2},
  { row: 26, col: 4, rowspan: 2, colspan: 1 },
  
  { row: 28, col: 2, rowspan: 2, colspan: 2},
  { row: 28, col: 4, rowspan: 2, colspan: 1 },
  
  { row: 30, col: 1, rowspan: 10, colspan: 1 },
  { row: 30, col: 2, rowspan: 2, colspan: 2 },
  { row: 30, col: 4, rowspan: 2, colspan: 1 },

  { row: 32, col: 2, rowspan: 4, colspan: 1 },
  { row: 32, col: 3, rowspan: 2, colspan: 1 },
  { row: 32, col: 4, rowspan: 2, colspan: 1 },

  { row: 34, col: 3, rowspan: 2, colspan: 1 },
  { row: 34, col: 4, rowspan: 2, colspan: 1 },

  { row: 36, col: 2, rowspan: 2, colspan: 2 },
  { row: 36, col: 4, rowspan: 2, colspan: 1 },

  { row: 38, col: 2, rowspan: 2, colspan: 2 },
  { row: 38, col: 4, rowspan: 2, colspan: 1 },

  { row: 40, col: 1, rowspan: 8, colspan: 1 },
  { row: 40, col: 2, rowspan: 2, colspan: 2 },
  { row: 40, col: 4, rowspan: 2, colspan: 1 },

  { row: 42, col: 2, rowspan: 2, colspan: 2 },
  { row: 42, col: 4, rowspan: 2, colspan: 1 },

  { row: 44, col: 2, rowspan: 2, colspan: 2 },
  { row: 44, col: 4, rowspan: 2, colspan: 1 },

  { row: 46, col: 2, rowspan: 2, colspan: 2 },
  { row: 46, col: 4, rowspan: 2, colspan: 1 },

  { row: 48, col: 1, rowspan: 2, colspan: 3 },
  { row: 48, col: 4, rowspan: 2, colspan: 1 },

  { row: 50, col: 1, rowspan: 2, colspan: 3 },
  { row: 50, col: 4, rowspan: 2, colspan: 1 },

  { row: 52, col: 1, rowspan: 2, colspan: 3 },
  { row: 52, col: 4, rowspan: 2, colspan: 1 },

  { row: 54, col: 1, rowspan: 2, colspan: 3 },
  { row: 54, col: 4, rowspan: 2, colspan: 1 },

  { row: 56, col: 0, rowspan: 2, colspan: 1 },
  { row: 56, col: 1, rowspan: 2, colspan: 3 },
  { row: 56, col: 4, rowspan: 2, colspan: 1 },

  { row: 58, col: 0, rowspan: 2, colspan: 4 },
  { row: 58, col: 4, rowspan: 2, colspan: 1 },

  { row: 60, col: 0, rowspan: 2, colspan: 4 },
  { row: 60, col: 4, rowspan: 2, colspan: 1 },

  { row: 62, col: 0, rowspan: 1, colspan: 13 },

  { row: 63, col: 0, rowspan: 1, colspan: 5 },
  { row: 63, col: 5, rowspan: 1, colspan: 4 },
  { row: 63, col: 9, rowspan: 3, colspan: 1 },
  { row: 63, col: 10, rowspan: 3, colspan: 1 },
  { row: 63, col: 11, rowspan: 3, colspan: 1 },
  { row: 63, col: 12, rowspan: 3, colspan: 1 },

  { row: 64, col: 0, rowspan: 2, colspan: 2 },
  { row: 64, col: 2, rowspan: 2, colspan: 2 },
  { row: 64, col: 4, rowspan: 2, colspan: 1 },
  { row: 64, col: 5, rowspan: 2, colspan: 1 },
  { row: 64, col: 6, rowspan: 2, colspan: 1 },
  { row: 64, col: 7, rowspan: 1, colspan: 2 },

  { row: 66, col: 0, rowspan: 1, colspan: 2 },
  { row: 66, col: 2, rowspan: 1, colspan: 2 },
  

  { row: 67, col: 0, rowspan: 1, colspan: 2 },
  { row: 67, col: 2, rowspan: 1, colspan: 2 },
]
export const cellsSettingModified = [
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
  { row: 4, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 6, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 6, col: 4, readOnly: true  , className: 'htCenter htMiddle'},

  { row: 8, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 8, col: 3, readOnly: true, className: 'htCenter htMiddle' },
  { row: 8, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 10, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 10, col: 3, readOnly: true, className: 'htCenter htMiddle' },
  { row: 10, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 12, col: 3, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 12, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 14, col: 3, readOnly: true, className: 'htCenter htMiddle' },
  { row: 14, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 16, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 16, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 18, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 18, col: 2, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 18, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 20, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 20, col: 4, readOnly: true  , className: 'htCenter htMiddle'},

  { row: 22, col: 2, readOnly: true, className: 'htCenter htMiddle' },
  { row: 22, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 24, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 24, col: 2, readOnly: true, className: 'htCenter htMiddle' },
  { row: 24, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 26, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 26, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 28, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 28, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 30, col: 1, readOnly: true  , className: 'htCenter htMiddle',renderer: 'html'},
  { row: 30, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 30, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 32, col: 2, readOnly: true, className: 'htCenter htMiddle', renderer: 'html'},
  { row: 32, col: 3, readOnly: true  , className: 'htCenter htMiddle' },
  { row: 32, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 34, col: 3, readOnly: true, className: 'htCenter htMiddle' },
  { row: 34, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 36, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 36, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 38, col: 2, readOnly: true  , className: 'htCenter htMiddle'},
  { row: 38, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 40, col: 1, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 40, col: 2, readOnly: true, className: 'htCenter htMiddle'},
  { row: 40, col: 4, readOnly: true, className: 'htCenter htMiddle' },
  
  { row: 42, col: 2, readOnly: true, className: 'htCenter htMiddle' },
  { row: 42, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 44, col: 2, readOnly: true, className: 'htCenter htMiddle' },
  { row: 44, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 46, col: 2, readOnly: true, className: 'htCenter htMiddle' },
  { row: 46, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 48, col: 1, readOnly: true, className: 'htCenter htMiddle' },
  { row: 48, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 50, col: 1, readOnly: true, className: 'htCenter htMiddle' },
  { row: 50, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 52, col: 1, readOnly: true, className: 'htCenter htMiddle' },
  { row: 52, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 54, col: 1, readOnly: true, className: 'htCenter htMiddle' },
  { row: 54, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 56, col: 0, readOnly: true, className: 'htCenter htMiddle' },
  { row: 56, col: 1, readOnly: true, className: 'htCenter htMiddle' },
  { row: 56, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 58, col: 0, readOnly: true, className: 'htCenter htMiddle' },
  { row: 58, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 60, col: 0, readOnly: true, className: 'htCenter htMiddle' },
  { row: 60, col: 4, readOnly: true, className: 'htCenter htMiddle' },

  { row: 62, col: 0, readOnly: true },

  { row: 63, col: 0, readOnly: true, className: 'htCenter htMiddle' },
  { row: 63, col: 5, readOnly: true, className: 'htCenter htMiddle' },
  { row: 63, col: 9, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 63, col: 10, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 63, col: 11, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 63, col: 12, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },

  { row: 64, col: 0, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 64, col: 2, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 64, col: 4, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 64, col: 5, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 64, col: 6, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 64, col: 7, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },

  { row: 65, col: 7, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },
  { row: 65, col: 8, readOnly: true, className: 'htCenter htMiddle', renderer: 'html' },

    // setting cells to enter data
  { row: 4, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 4, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 4, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 4, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 4, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 4, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 4, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 4, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},

  { row: 5, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 5, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 5, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 5, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 5, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 5, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 5, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 5, col: 12, className: 'htMiddle htRight disable-cell', readOnly: true },
  //----------------------------------------
  { row: 6, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 6, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 6, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,readOnly: true},
  { row: 6, col: 8  , className: 'htMiddle mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 6, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 6, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 6, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 6, col: 12, className: 'htMiddle htRight disable-cell', readOnly: true ,renderer: CellRenderer},
  
  { row: 7, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 7, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 7, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 7, col: 8  , className: 'htMiddle mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 7, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 7, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 7, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 7, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },
  //----------------------------------------
  { row: 8, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 8, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 8, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 8, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 8, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 8, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 8, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 8, col: 12, className: 'htMiddle htRight disable-cell', readOnly: true ,renderer: CellRenderer},
  
  { row: 9, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 9, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 9, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 9, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 9, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
  { row: 9, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 9, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 9, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },
  //----------------------------------------
  { row: 10, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 10, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 10, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 10, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 10, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 10, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 10, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 10, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},  

  { row: 11, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 11, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 11, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 11, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 11, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 11, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 11, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 11, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },
  //----------------------------------------
  { row: 12, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 12, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 12, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 12, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 12, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 12, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 12, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 12, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},

  { row: 13, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 13, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 13, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 13, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 13, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 13, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 13, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 13, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },
 //----------------------------------------
  { row: 14, col: 5   , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 14, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 14, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,readOnly: true},
  { row: 14, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 14, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 14, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 14, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 14, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},

  { row: 15, col: 5   , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 15, col: 6   , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 15, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 15, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 15, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 15, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 15, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 15, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true },
 //----------------------------------------
  { row: 16, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 16, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 16, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,readOnly: true},

  { row: 17, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 17, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 17, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
 //----------------------------------------
  { row: 18, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 18, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 18, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 18, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 18, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 18, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 18, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 18, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 19, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 19, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 19, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 19, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 19, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 19, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 19, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 19, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 20, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 20, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 20, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 20, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 20, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 20, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 20, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 20, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 21, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 21, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 21, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 21, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 21, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
  { row: 21, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 21, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 21, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 22, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 22, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 22, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 23, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 23, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 23, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 23, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 23, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 23, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 23, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 23, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 24, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 24, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 24, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 24, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 24, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 24, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 24, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 24, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 25, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 25, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 25, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 25, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 25, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
  { row: 25, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 25, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 25, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 26, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 26, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 26, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 26, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 26, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 26, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 26, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 26, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 27, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 27, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 27, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 27, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 27, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 27, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 27, col: 11 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 27, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 28, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 28, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 28, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},

  { row: 29, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 29, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 29, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
 //----------------------------------------
  { row: 30, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 30, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 30, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 30, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 30, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 30, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 30, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 30, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 31, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 31, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 31, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 31, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 31, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 31, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 31, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 31, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 32, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 32, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 32, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 32, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 32, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 32, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 32, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 32, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 33, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 33, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 33, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 33, col: 8 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 33, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 33, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 33, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true},
  { row: 33, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 34, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 34, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 34, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 34, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 34, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 34, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 34, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 34, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 35, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 35, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 35, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 35, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 35, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 35, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 35, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 35, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 36, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 36, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 36, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 36, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 36, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,renderer: CellRenderer,readOnly: true},
  { row: 36, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 36, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 36, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 37, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 37, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 37, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,editor:CustomNumberEditor},
  { row: 37, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 37, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0},
  { row: 37, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 37, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 37, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
   //----------------------------------------
  { row: 38, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 38, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 38, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 39, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 39, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 39, col: 12 , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 40, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 40, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 40, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 40, col: 8   , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 40, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 40, col: 10   , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 40, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true ,renderer: CellRenderer},
  { row: 40, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 41, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 41, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 41, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 41, col: 8   , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 41, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 41, col: 10   , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 41, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true },
  { row: 41, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 42, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 42, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 42, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 42, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 42, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 42, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 42, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 42, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 43, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 43, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 43, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 43, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 43, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 43, col: 10 , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 43, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 43, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 44, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 44, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 44, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 44, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 44, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 44, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 44, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 44, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 45, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 45, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 45, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 45, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 45, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 45, col: 10  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 45, col: 11  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 45, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 46, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 46, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 46, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 47, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 47, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 47, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 48, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 48, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},

  { row: 49, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 49, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
 //----------------------------------------
  { row: 50, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 50, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},

  { row: 51, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 51, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
 //----------------------------------------
  { row: 52, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 52, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 52, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 52, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 52, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 52, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 52, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 52, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 53, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 53, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 53, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 53, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 53, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 53, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 53, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 53, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 54, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 54, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 54, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 55, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 55, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 55, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 56, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 56, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},
  { row: 56, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},

  { row: 57, col: 5  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 6  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 7  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 8  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 57, col: 9  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 10  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 11  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' }},
  { row: 57, col: 12  , className: 'htMiddle htRight disable-cell',readOnly: true},
 //----------------------------------------
  { row: 58, col: 5  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 58, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true,renderer: CellRenderer},
  { row: 58, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,readOnly: true},
  { row: 58, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 58, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer,readOnly: true},
  { row: 58, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true,renderer: CellRenderer},
  { row: 58, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 58, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},

  { row: 59, col: 5  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 59, col: 6  , className: 'htMiddle htRight disable-cell',readOnly: true},
  { row: 59, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 59, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 59, col: 9  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 59, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 59, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 59, col: 12  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
 //----------------------------------------
  { row: 60, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 60, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 60, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 60, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },renderer: CellRenderer},
  { row: 60, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 60, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 60, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true  ,renderer: CellRenderer},
  { row: 60, col: 12, className: 'htMiddle htRight mid-gray-cell',readOnly: true , type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },renderer: CellRenderer,editor:CustomNumberEditor},

  { row: 61, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 61, col: 6  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 61, col: 7  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 61, col: 8  , className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },editor:CustomNumberEditor},
  { row: 61, col: 9  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 61, col: 10  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 61, col: 11  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true  },
  { row: 61, col: 12, className: 'htMiddle htRight mid-gray-cell',readOnly: true ,type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }},
 //----------------------------------------
  { row: 66, col: 0  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 2  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 3  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 6  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 7  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 8  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 9, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 10, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 11, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true ,renderer: CellRenderer},
  { row: 66, col: 12, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true ,renderer: CellRenderer},
  
  { row: 67, col: 0  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,readOnly: true,editor:CustomNumberEditor },
  { row: 67, col: 2  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },validator:cellValueGreaterThan0,readOnly: true,editor:CustomNumberEditor },
  { row: 67, col: 3  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 5  , className: 'htMiddle htRight gray-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 6  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 7  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 8  , className: 'htMiddle htRight disable-cell' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 9, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 10, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true },
  { row: 67, col: 11, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' },readOnly: true },
  { row: 67, col: 12, className: 'htMiddle htRight gray-cell', type: 'numeric', numericFormat: { pattern: '0,0', culture: 'ko-KR' }, readOnly: true },
]
export  const dataModified = [
  ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨<br> 당월 조정<br>환급세액", "납부 세액", ""],
  ["", "", "", "", "", "소 득 지 급 <br>(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩<br>소득세 등<br>(가산세 포함)", "⑪ <br>농어촌<br> 특별세"],
  ["", "", "", "", "", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌<br>특별세", "⑧가산세", "", "", ""],
  ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "중도퇴사", "", "A02", null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "일용근로", "", "A03",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "연말<br>정산", "합계", "A04",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "", "분납신청", "A05",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "", "납부금액", "A06",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "가감계", "", "A10",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "퇴직<br>소득", "연금계좌", "", "A21",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "그 외	", "", "A22",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "가감계", "", "A20",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "사업<br>소득", "매월징수", "", "A25",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "연말정산", "", "A26",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "가감계", "", "A30",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "기타<br>소득", "연금계좌", "", "A41",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "종교인<br>소득", "매월징수", "A43",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "", "연말정산", "A44",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "그 외", "", "A42",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "가감계", "", "A40",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "연금<br>소득", "연금계좌", "", "A48",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "공적연금 매월 (매월)", "", "A45",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "연말정산", "", "A46",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "", "가감계", "", "A47",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "이자소득", "", "", "A50",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "배당소득", "", "", "A60",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "저축 등 해지 추징세액 등", "", "", "A69",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["", "비거주자 양도소득", "", "", "A70",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["법인", "내ㆍ외국법인원천", "", "", "A80",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["수정신고 세액 (세액)", "", "", "", "A90",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["총 합 계", "", "", "", "A99",null, null, null, null, null, null, null, null],
  ["", "", "", "", null, null, null, null, null, null, null, null],
  ["2. 환급세액 조정", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["전월 미환급 세액의 계산", "", "", "", "", "당월 발생 환급세액", "", "", "", "⑱<br>조정대상<br>환급세액<br>(⑭+⑮+⑯+<br>⑰)", "⑲<br>당월조정 환<br>급세액계", "⑳<br>차월이월환급세액<br>(⑱-⑲)", "(21) 환급<br>신청액 "],
  ["⑫ 전월<br>미환급세액", "", "⑬기환급<br>신청세액","", "⑭ 차감잔액<br>(⑫ - ⑬) ", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
  ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
]
export const inputPositionModified = [
  {
    "className": "A01",
    "value": {
      "inputPosition": [[4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12]],
      "modifiedPosition": [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12]],
    }
  },
  {
    "className": "A02",
    "value": {
      "inputPosition":[[6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12]],
      "modifiedPosition":[[7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12]],
    } 
  },
  {
    "className": "A03",
    "value": {
      "inputPosition":[[8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12]],
      "modifiedPosition":[[9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12]],
    }  
  },
  {
    "className": "A04",
    "value": {
      "inputPosition":[[10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12]],
      "modifiedPosition":[[11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12]],
    } 
  },
  {
    "className": "A05",
    "value": {
      "inputPosition":[[12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12]],
      "modifiedPosition":[[13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12]],
    }
  },
  {
    "className": "A06",
    "value": {
      "inputPosition":[[14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12]],
      "modifiedPosition":[[15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12]],
    }
  },
  {
    "className": "A10",
    "value": {
      "inputPosition":[[16, 5], [16, 6], [16, 7], [16, 8], [16, 9], [16, 10], [16, 11], [16, 12]],
      "modifiedPosition":[[17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [17, 10], [17, 11], [17, 12]],
    }
  },
  {
    "className": "A21",
    "value": {
      "inputPosition":[[18, 5], [18, 6], [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [18, 12]],
      "modifiedPosition":[[19, 5], [19, 6], [19, 7], [19, 8], [19, 9], [19, 10], [19, 11], [19, 12]],
    }
  },
  {
    "className": "A22",
    "value": {
      "inputPosition":[[20, 5], [20, 6], [20, 7], [20, 8], [20, 9], [20, 10], [20, 11], [20, 12]],
      "modifiedPosition":[[21, 5], [21, 6], [21, 7], [21, 8], [21, 9], [21, 10], [21, 11], [21, 12]],
    }
  },
  {
    "className": "A20",
    "value": {
      "inputPosition":[[22, 5], [22, 6], [22, 7], [22, 8], [22, 9], [22, 10], [22, 11], [22, 12]],
      "modifiedPosition":[[23, 5], [23, 6], [23, 7], [23, 8], [23, 9], [23, 10], [23, 11], [23, 12]],
    }
  },
  {
    "className": "A25",
    "value": {
      "inputPosition":[[24, 5], [24, 6], [24, 7], [24, 8], [24, 9], [24, 10], [24, 11], [24, 12]],
      "modifiedPosition":[[25, 5], [25, 6], [25, 7], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12]],
    }
  },
  {
    "className": "A26",
    "value": {
      "inputPosition":[[26, 5], [26, 6], [26, 7], [26, 8], [26, 9], [26, 10], [26, 11], [26, 12]],
      "modifiedPosition":[[27, 5], [27, 6], [27, 7], [27, 8], [27, 9], [27, 10], [27, 11], [27, 12]],
    }
  },
  {
    "className": "A30",
    "value": {
      "inputPosition":[[28, 5], [28, 6], [28, 7], [28, 8], [28, 9], [28, 10], [28, 11], [28, 12]],
      "modifiedPosition":[[29, 5], [29, 6], [29, 7], [29, 8], [29, 9], [29, 10], [29, 11], [29, 12]],
    }
  },
  {
    "className": "A41",
    "value": {
      "inputPosition":[[30, 5], [30, 6], [30, 7], [30, 8], [30, 9], [30, 10], [30, 11], [30, 12]],
      "modifiedPosition":[[31, 5], [31, 6], [31, 7], [31, 8], [31, 9], [31, 10], [31, 11], [31, 12]],
    }
  },
  {
    "className": "A43",
    "value": {
      "inputPosition":[[32, 5], [32, 6], [32, 7], [32, 8], [32, 9], [32, 10], [32, 11], [32, 12]],
      "modifiedPosition":[[33, 5], [33, 6], [33, 7], [33, 8], [33, 9], [33, 10], [33, 11], [33, 12]],
    }
  },
  {
    "className": "A44",
    "value": {
      "inputPosition":[[34, 5], [34, 6], [34, 7], [34, 8], [34, 9], [34, 10], [34, 11], [34, 12]],
      "modifiedPosition":[[35, 5], [35, 6], [35, 7], [35, 8], [35, 9], [35, 10], [35, 11], [35, 12]],
    }
  },
  {
    "className": "A42",
    "value": {
      "inputPosition":[[36, 5], [36, 6], [36, 7], [36, 8], [36, 9], [36, 10], [36, 11], [36, 12]],
      "modifiedPosition":[[37, 5], [37, 6], [37, 7], [37, 8], [37, 9], [37, 10], [37, 11], [37, 12]],
    }
  },
  {
    "className": "A40",
    "value": {
      "inputPosition":[[38, 5], [38, 6], [38, 7], [38, 8], [38, 9], [38, 10], [38, 11], [38, 12]],
      "modifiedPosition":[[39, 5], [39, 6], [39, 7], [39, 8], [39, 9], [39, 10], [39, 11], [39, 12]],
    }
  },
  {
    "className": "A48",
    "value": {
      "inputPosition":[[40, 5], [40, 6], [40, 7], [40, 8], [40, 9], [40, 10], [40, 11], [40, 12]],
      "modifiedPosition":[[41, 5], [41, 6], [41, 7], [41, 8], [41, 9], [41, 10], [41, 11], [41, 12]],
    }
  },
  {
    "className": "A45",
    "value": {
      "inputPosition":[[42, 5], [42, 6], [42, 7], [42, 8], [42, 9], [42, 10], [42, 11], [42, 12]],
      "modifiedPosition":[[43, 5], [43, 6], [43, 7], [43, 8], [43, 9], [43, 10], [43, 11], [43, 12]],
    }
  },
  {
    "className": "A46",
    "value": {
      "inputPosition":[[44, 5], [44, 6], [44, 7], [44, 8], [44, 9], [44, 10], [44, 11], [44, 12]],
      "modifiedPosition":[[45, 5], [45, 6], [45, 7], [45, 8], [45, 9], [45, 10], [45, 11], [45, 12]],
    }
  },
  {
    "className": "A47",
    "value": {
      "inputPosition":[[46, 5], [46, 6], [46, 7], [46, 8], [46, 9], [46, 10], [46, 11], [46, 12]],
      "modifiedPosition":[[47, 5], [47, 6], [47, 7], [47, 8], [47, 9], [47, 10], [47, 11], [47, 12]],
    }
  },
  {
    "className": "A50",
    "value": {
      "inputPosition":[[48, 5], [48, 6], [48, 7], [48, 8], [48, 9], [48, 10], [48, 11], [48, 12]],
      "modifiedPosition":[[49, 5], [49, 6], [49, 7], [49, 8], [49, 9], [49, 10], [49, 11], [49, 12]],
    }
  },
  {
    "className": "A60",
    "value": {
      "inputPosition":[[50, 5], [50, 6], [50, 7], [50, 8], [50, 9], [50, 10], [50, 11], [50, 12]],
      "modifiedPosition":[[51, 5], [51, 6], [51, 7], [51, 8], [51, 9], [51, 10], [51, 11], [51, 12]],
    }
  },
  {
    "className": "A69",
    "value": {
      "inputPosition":[[52, 5], [52, 6], [52, 7], [52, 8], [52, 9], [52, 10], [52, 11], [52, 12]],
      "modifiedPosition":[[53, 5], [53, 6], [53, 7], [53, 8], [53, 9], [53, 10], [53, 11], [53, 12]],
    }
  },
  {
    "className": "A70",
    "value": {
      "inputPosition":[[54, 5], [54, 6], [54, 7], [54, 8], [54, 9], [54, 10], [54, 11], [54, 12]],
      "modifiedPosition":[[55, 5], [55, 6], [55, 7], [55, 8], [55, 9], [55, 10], [55, 11], [55, 12]],
    }
  },
  {
    "className": "A80",
    "value": {
      "inputPosition":[[56, 5], [56, 6], [56, 7], [56, 8], [56, 9], [56, 10], [56, 11], [56, 12]],
      "modifiedPosition":[[57, 5], [57, 6], [57, 7], [57, 8], [57, 9], [57, 10], [57, 11], [57, 12]],
    }
  },
  {
    "className": "A90",
    "value": {
      "inputPosition":[[58, 5], [58, 6], [58, 7], [58, 8], [58, 9], [58, 10], [58, 11], [58, 12]],
      "modifiedPosition":[[59, 5], [59, 6], [59, 7], [59, 8], [59, 9], [59, 10], [59, 11], [59, 12]],
    }
  },
  {
    "className": "A99",
    "value": {
      "inputPosition":[[60, 5], [60, 6], [60, 7], [60, 8], [60, 9], [60, 10], [60, 11], [60, 12]],
      "modifiedPosition":[[61, 5], [61, 6], [61, 7], [61, 8], [61, 9], [61, 10], [61, 11], [61, 12]],
    }
  },
  {
    "className": "adjustmentOfRefundTaxAmount",
    "value": {
      "inputPosition":[[66, 0], [66, 3], [66, 4], [66, 6], [66, 7], [66, 8], [66, 9], [66, 10], [66, 11], [66, 12]],
      "modifiedPosition":[[67, 0], [67, 3], [67, 4], [67, 6], [67, 7], [67, 8], [67, 9], [67, 10], [67, 11], [67, 12]],
    }
  },
]
export const clearAllCellValue = (wrapper: any) => {
  let hot = wrapper.value?.hotInstance;
  hot?.updateData([
    ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨<br> 당월 조정<br>환급세액", "납부 세액", ""],
    ["", "", "", "", "", "소 득 지 급 <br>(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩<br>소득세 등<br>(가산세 포함)", "⑪ <br>농어촌<br> 특별세"],
    ["", "", "", "", "", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌<br>특별세", "⑧가산세", "", "", ""],
    ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "중도퇴사", "", "A02", null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "일용근로", "", "A03",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "연말<br>정산", "합계", "A04",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "", "분납신청", "A05",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "", "납부금액", "A06",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "가감계", "", "A10",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "퇴직<br>소득", "연금계좌", "", "A21",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "그 외	", "", "A22",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "가감계", "", "A20",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "사업<br>소득", "매월징수", "", "A25",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "연말정산", "", "A26",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "가감계", "", "A30",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "기타<br>소득", "연금계좌", "", "A41",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "종교인<br>소득", "매월징수", "A43",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "", "연말정산", "A44",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "그 외", "", "A42",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "가감계", "", "A40",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "연금<br>소득", "연금계좌", "", "A48",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "공적연금 매월 (매월)", "", "A45",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "연말정산", "", "A46",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "", "가감계", "", "A47",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "이자소득", "", "", "A50",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "배당소득", "", "", "A60",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "저축 등 해지 추징세액 등", "", "", "A69",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["", "비거주자 양도소득", "", "", "A70",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["법인", "내ㆍ외국법인원천", "", "", "A80",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["수정신고 세액 (세액)", "", "", "", "A90",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["총 합 계", "", "", "", "A99",null, null, null, null, null, null, null, null],
    ["", "", "", "", null, null, null, null, null, null, null, null],
    ["2. 환급세액 조정", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["전월 미환급 세액의 계산", "", "", "", "", "당월 발생 환급세액", "", "", "", "⑱<br>조정대상<br>환급세액<br>(⑭+⑮+⑯+<br>⑰)", "⑲<br>당월조정 환<br>급세액계", "⑳<br>차월이월환급세액<br>(⑱-⑲)", "(21) 환급<br>신청액 "],
    ["⑫ 전월<br>미환급세액", "", "⑬기환급<br>신청세액","", "⑭ 차감잔액<br>(⑫ - ⑬) ", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
    ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
  ])
  // inputPosition.forEach((item: any) => {
  //   item.value.forEach((val: any) => {
  //     hot?.setDataAtCell(val[0],val[1],null);
  //   });
  // })
} 

export const calculateWithholdingStatusReportModified = async (wrapper: any, data: any = []) => {
  let hot = wrapper.value.hotInstance;
  let cellData = Array()
  const arrRowPass = ['A10','A99']
  // to distinguish the case of data transmission or no data transmission
  if (data.length > 0) {
    cellData = data
  } else {
    const arrData = hot.getData()
    // format data to perform calculations
    for (let index = 0; index < arrData.length; index++) {
      if (index >= 4 && index <= 61 && !arrData[index][4]) {
        // check để lọc hết những row không có dữ liệu ra 
        // nếu là cột A10 và A99 cũng loại vì tất cả các cell đều disable
        if (
          (!arrRowPass.includes(arrData[index-1][4])) && 
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
          let itemObject = {
            /** 코드 (code) */
            code: arrData[index - 1][4],
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
          };
          cellData.push(itemObject);
        }
      }
    }
  }
  // do the calculation
  let output = WithholdingStatusReport.getWithholdingStatusReport(cellData);
  await convertZeroData(output).then((res) => {
    output = res
  })
  let dataTable = await convertArrData(output)
  hot.setDataAtCell(dataTable, 'setdata');

  let checkYETaxAdj = checkYETaxAdjustment(output)
  let cell12 =  hot.getDataAtCell(67,12);
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
  inputPositionModified.forEach((position : any) => {
    const rowData = rawArr.find(item => item.code == position.className);
    if (rowData) {
      // kiểm tra giá trị của cell truyền vào có là number không hoặc null cũng cho pass để clear cell thành rỗng
      if (typeof rowData.numberOfPeople === "number" || rowData.numberOfPeople === null)
        result.push([position?.value.modifiedPosition[0][0], position?.value.modifiedPosition[0][1], rowData.numberOfPeople]);
      if (typeof rowData.totalPayment === "number" || rowData.totalPayment === null)
        result.push([position?.value.modifiedPosition[1][0], position?.value.modifiedPosition[1][1], rowData.totalPayment]);
      if (typeof rowData.collectedIncomeTax === "number" || rowData.collectedIncomeTax === null)
        result.push([position?.value.modifiedPosition[2][0], position?.value.modifiedPosition[2][1], rowData.collectedIncomeTax]);
      if (typeof rowData.collectedRuralSpecialTax === "number" || rowData.collectedRuralSpecialTax === null)
        result.push([position?.value.modifiedPosition[3][0], position?.value.modifiedPosition[3][1], rowData.collectedRuralSpecialTax]);
      if (typeof rowData.collectedExtraTax === "number" || rowData.collectedExtraTax === null)
        result.push([position?.value.modifiedPosition[4][0], position?.value.modifiedPosition[4][1], rowData.collectedExtraTax]);
      if (typeof rowData.thisMonthAdjustedRefundTaxAmount === "number" || rowData.thisMonthAdjustedRefundTaxAmount === null)
        result.push([position?.value.modifiedPosition[5][0], position?.value.modifiedPosition[5][1], rowData.thisMonthAdjustedRefundTaxAmount]);
      if (typeof rowData.incomeTaxPaid === "number" || rowData.incomeTaxPaid === null)
        result.push([position?.value.modifiedPosition[6][0], position?.value.modifiedPosition[6][1], rowData.incomeTaxPaid]);
      if (typeof rowData.ruralSpecialTaxPaid === "number" || rowData.ruralSpecialTaxPaid === null)
        result.push([position?.value.modifiedPosition[7][0], position?.value.modifiedPosition[7][1], rowData.ruralSpecialTaxPaid]);

      if (typeof rowData.prevMonthNonRefundableTaxAmount === "number" || rowData.prevMonthNonRefundableTaxAmount === null)
        result.push([position?.value.modifiedPosition[0][0], position?.value.modifiedPosition[0][1], rowData.prevMonthNonRefundableTaxAmount]);
      if (typeof rowData.preRefundApplicationTaxAmount === "number" || rowData.preRefundApplicationTaxAmount === null)
        result.push([position?.value.modifiedPosition[1][0], position?.value.modifiedPosition[1][1], rowData.preRefundApplicationTaxAmount]);
      if (typeof rowData.deductibleBalance === "number" || rowData.deductibleBalance === null)
        result.push([position?.value.modifiedPosition[2][0], position?.value.modifiedPosition[2][1], rowData.deductibleBalance]);
      if (typeof rowData.thisMonthRefundTaxGeneral === "number" || rowData.thisMonthRefundTaxGeneral === null)
        result.push([position?.value.modifiedPosition[3][0], position?.value.modifiedPosition[3][1], rowData.thisMonthRefundTaxGeneral]);
      if (typeof rowData.thisMonthRefundTaxOtherFinancialCompany === "number" || rowData.thisMonthRefundTaxOtherFinancialCompany === null)
        result.push([position?.value.modifiedPosition[4][0], position?.value.modifiedPosition[4][1], rowData.thisMonthRefundTaxOtherFinancialCompany]);
      if (typeof rowData.thisMonthRefundTaxOtherMerge === "number" || rowData.thisMonthRefundTaxOtherMerge === null)
        result.push([position?.value.modifiedPosition[5][0], position?.value.modifiedPosition[5][1], rowData.thisMonthRefundTaxOtherMerge]);
      if (typeof rowData.refundTaxSubjectToAdjustment === "number" || rowData.refundTaxSubjectToAdjustment === null)
        result.push([position?.value.modifiedPosition[6][0], position?.value.modifiedPosition[6][1], rowData.refundTaxSubjectToAdjustment]);
      if (typeof rowData.thisMonthTotalAdjustedRefundTaxAmount === "number" || rowData.thisMonthTotalAdjustedRefundTaxAmount === null)
        result.push([position?.value.modifiedPosition[7][0], position?.value.modifiedPosition[7][1], rowData.thisMonthTotalAdjustedRefundTaxAmount]);
      if (typeof rowData.nextMonthRefundTaxAmount === "number" || rowData.nextMonthRefundTaxAmount === null)
        result.push([position?.value.modifiedPosition[8][0], position?.value.modifiedPosition[8][1], rowData.nextMonthRefundTaxAmount]);
      if (typeof rowData.refundApplicationAmount === "number" || rowData.refundApplicationAmount === null)
        result.push([position?.value.modifiedPosition[9][0], position?.value.modifiedPosition[9][1], rowData.refundApplicationAmount]);
    } else {
      result.push([position?.value.modifiedPosition[0][0], position?.value.modifiedPosition[0][1], null]);
      result.push([position?.value.modifiedPosition[1][0], position?.value.modifiedPosition[1][1], null]);
      result.push([position?.value.modifiedPosition[2][0], position?.value.modifiedPosition[2][1], null]);
      result.push([position?.value.modifiedPosition[3][0], position?.value.modifiedPosition[3][1], null]);
      result.push([position?.value.modifiedPosition[4][0], position?.value.modifiedPosition[4][1], null]);
      result.push([position?.value.modifiedPosition[5][0], position?.value.modifiedPosition[5][1], null]);
      result.push([position?.value.modifiedPosition[6][0], position?.value.modifiedPosition[6][1], null]);
      result.push([position?.value.modifiedPosition[7][0], position?.value.modifiedPosition[7][1], null]);
    }
  })
  return result;
}
