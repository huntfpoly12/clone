<template>
  <hot-table :settings="hotSettings"></hot-table>
</template>

<script>
import { defineComponent } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules
registerAllModules();

export default defineComponent({
  data() {
    return {
      hotSettings: {
        data: [
          ["1. 원천징수 내역 및 납부세액", "", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "소득자 소득구분", "", "", "코드", "원 천 징 수 명 세", "", "", "", "", "⑨ 당월 조정환급세액", "납부 세액", ""],
          ["", "", "", "", "", "소 득 지 급(과세 미달, 비과세 포함)	", "", "징수세액", "", "", "", "⑩소득세 등(가산세 포함)", "⑪ 농어촌 특별세"],
          ["", "B4", "", "", "E4", "④인원", "⑤총지급액", "⑥소득세 등", "⑦농어촌특별세", "⑧가산세", "", "", ""],
          ["개인⁀거주자ㆍ비거주자⌣", "근로소득", "간이세액", "", "A01", "", "", "", "", "", "", "", ""],
          ["", "", "중도퇴사", "", "A02", "", "", "", "", "", "", "", ""],
          ["", "", "일용근로", "", "A03", "", "", "", "", "", "", "", ""],
          ["", "", "연말정산", "합계", "A04", "", "", "", "", "", "", "", ""],
          ["", "", "", "분납신청", "A05", "", "", "", "", "", "", "", ""],
          ["", "B4", "", "납부금액", "A06", "", "", "", "", "", "", "", ""],
          ["", "B5", "가감계", "", "A10", "", "", "", "", "", "", "", ""],
          ["", "퇴직소득", "연금계좌", "", "A21", "", "", "", "", "", "", "", ""],
          ["", "", "그 외	", "", "A22", "", "", "", "", "", "", "", ""],
          ["", "", "가감계", "", "A20", "", "", "", "", "", "", "", ""],
          ["", "사업소득", "매월징수", "", "A25", "", "", "", "", "", "", "", ""],
          ["", "B4", "연말정산", "", "A26", "", "", "", "", "", "", "", ""],
          ["", "B5", "가감계", "", "A30", "", "", "", "", "", "", "", ""],
          ["", "기타소득", "연금계좌", "", "A41", "", "", "", "", "", "", "", ""],
          ["", "", "종교인소득", "매월징수", "A43", "", "", "", "", "", "", "", ""],
          ["", "", "", "연말정산", "A44", "", "", "", "", "", "", "", ""],
          ["", "", "그 외", "", "A42", "", "", "", "", "", "", "", ""],
          ["", "B4", "가감계", "", "A40", "", "", "", "", "", "", "", ""],
          ["", "연금소득", "연금계좌", "", "A48", "", "", "", "", "", "", "", ""],
          ["", "", "공적연금 매월 (매월)", "", "A45", "", "", "", "", "", "", "", ""],
          ["", "", "연말정산", "", "A46", "", "", "", "", "", "", "", ""],
          ["", "", "가감계", "", "A47", "", "", "", "", "", "", "", ""],
          ["", "이자소득", "", "", "A50", "", "", "", "", "", "", "", ""],
          ["", "배당소득", "", "", "A60", "", "", "", "", "", "", "", ""],
          ["", "저축 등 해지 추징세액 등", "", "", "A69", "", "", "", "", "", "", "", ""],
          ["", "비거주자 양도소득", "", "", "A70", "", "", "", "", "", "", "", ""],
          ["법인", "내ㆍ외국법인원천", "", "", "A80", "", "", "", "", "", "", "", ""],
          ["수정신고 세액 (세액)", "B5", "", "", "A90", "", "", "", "", "", "", "", ""],
          ["총 합 계", "", "", "", "A99", "", "", "", "", "", "", "", ""],
        ],
        mergeCells: [
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
