<template>
  <p style="font-size: 18px;font-weight: 500;margin: 20px;"> This is the table created by the library <a href="https://handsontable.com/demo" target="_blank">handsontable</a> </p>
  <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
</template>

<script>
import { defineComponent } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import filters from "@/helpers/filters";
import { mergeCells, cellsSetting } from "./Gridsetting"
// register Handsontable's modules
registerAllModules();

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
const CellRenderer = (instance, td, row, col, prop, value, cellProperties)=>{
  if (row === 4) {
      td.style.fontWeight = 'bold';
      td.innerHTML = `<p style="color:red;margin: unset;float: right;font-style: italic;">${filters.formatCurrency(parseInt(cellProperties.oldValue))}</p><br><p style="margin: unset;float: right;">${filters.formatCurrency(parseInt(value))}</p>`
      return td;
    }
}

const cellValueGreaterThan0 = (query, callback) => {
  if (typeof query == 'number' && query >= 0) {
    callback(true)
  } else {
    callback(false)
  }
  
}
export default defineComponent({
  data() {
    return {
      hotSettings: {
        comments: true,
        fillHandle: true,
         colWidths: 100,
        height: 120,
        beforeKeyDown:  (e)=>{
          var reg = /[^\D\p{Hangul}!@#\$%\^\&*\)\(+=._]/g;
          if (!reg.test(e.key) && e.key != 'Backspace' &&  e.key != '-') {
              e.preventDefault()
          }
        },
        afterValidate: (isValid, value, row, prop, source) => {
          let hot = this.$refs.wrapper.hotInstance;
          if (isValid == false) {
            hot.setDataAtCell(row, hot.propToCol(prop), 0);
          }
        },
        hotRef: null,
        data: [
          ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨<br> 당월 조정<br>환급세액", "납부 세액", ""],
          ["", "", "", "", "", "소 득 지 급 <br>(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩<br>소득세 등<br>(가산세 포함)", "⑪ <br>농어촌<br> 특별세"],
          ["", "", "", "", "", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌<br>특별세", "⑧가산세", "", "", ""],
          ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01","300000", "12000", "12000", "", "", "", "", ""],
          ["", "", "중도퇴사", "", "A02", "12000", "12000", "12000", "", "", "", "", ""],
          ["", "", "일용근로", "", "A03", "12000", "12000", "12000", "", "", "", "", ""],
          ["", "", "연말<br>정산", "합계", "A04", "20000", "20000", "", "", "", "", "", ""],
          ["", "", "", "분납신청", "A05", "", "", "", "", "", "", "", ""],
          ["", "", "", "납부금액", "A06", "", "", "20000", "", "", "", "", ""],
          ["", "", "가감계", "", "A10", "", "", "", "", "", "", "", ""],
          ["", "퇴직<br>소득", "연금계좌", "", "A21", "", "", "", "", "", "", "", ""],
          ["", "", "그 외	", "", "A22", "20000", "20000", "20000", "", "", "", "", ""],
          ["", "", "가감계", "", "A20", "", "", "", "", "", "", "", ""],
          ["", "사업<br>소득", "매월징수", "", "A25", "20000", "20000", "20000", "", "", "", "", ""],
          ["", "", "연말정산", "", "A26", "", "", "", "", "", "", "", ""],
          ["", "", "가감계", "", "A30", "", "", "", "", "", "", "", ""],
          ["", "기타<br>소득", "연금계좌", "", "A41", "", "", "", "", "", "", "", ""],
          ["", "", "종교인<br>소득", "매월징수", "A43", "", "", "", "", "", "", "", ""],
          ["", "", "", "연말정산", "A44", "", "", "", "", "", "", "", ""],
          ["", "", "그 외", "", "A42", "20000", "20000", "20000", "", "", "", "", ""],
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
          ["수정신고 세액 (세액)", "", "", "", "A90", "", "", "20000", "", "20000", "", "", ""],
          ["총 합 계", "", "", "", "A99", "", "", "", "", "", "", "", ""],
          ["2. 환급세액 조정", "", "", "", "", "", "", "", "", "", "", "", ""],
          ["전월 미환급 세액의 계산", "", "", "", "", "당월 발생 환급세액", "", "", "", "⑱<br>조정대상<br>환급세액<br>(⑭+⑮+⑯+<br>⑰)", "⑲<br>당월조정 환<br>급세액계", "⑳<br>차월이월환급세액<br>(⑱-⑲)", "(21) 환급<br>신청액 "],
          ["⑫ 전월<br>미환급세액","", "⑬기환급<br>신청세액", "⑭ 차감잔액<br>(⑫ - ⑬) ","", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
          ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ],
        mergeCells: mergeCells,
        cell: [
          ...cellsSetting,
          // cells to enter data
          { row: 4, col: 5  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },oldValue:'220000',renderer: CellRenderer,validator:cellValueGreaterThan0},
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
          { row: 32, col: 12  , className: 'htMiddle htRight' ,type: 'numeric',  numericFormat: {pattern: '0,0',culture: 'ko-KR' },},
        ],
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      },
    };
  },
  components: {
    HotTable,
  },
});
</script>
<style lang="scss" scoped>
  :deep td.disable-cell {
    color: #fff;
    background-color: #808080;
  }
  :deep td.gray-cell {
    color: black;
    background-color: #D9D9D9;
  }
  :deep td.mid-gray-cell {
    color: black;
    background-color: #AEAAAA;
  }
</style>
