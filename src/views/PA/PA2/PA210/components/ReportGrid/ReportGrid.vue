<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        style="top: 20px" width="1354px" :bodyStyle="{ height: '890px' }">
    <div class="report-grid">
      <div class="action-right">
        <button-basic  :width="150" text="새로불러오기" class="open-tab" ></button-basic>
      </div>
      <div class="table-detail">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
          :show-borders="true" key-expr="index" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" 
          :focused-row-enabled="true">
          <DxColumn caption="마감 현황"/>
          <DxColumn caption="귀속연월" />
          <DxColumn caption="지급연월" />
          <DxColumn caption="신고 종류" />
          <DxColumn caption="연말" />
          <DxColumn caption="환급" cell-template="refund"/>
          <template #refund="{ data }">
            <switch-basic :valueSwitch="data.data.refund" :textCheck="'포함'" :textUnCheck="'제외'" />
          </template>
          <DxColumn caption="제출일" cell-template="submission-date" />
          <template #submission-date="{ data }">
            <date-time-box :valueDate="data.data.submissionDate"></date-time-box>
          </template>
          <DxScrolling column-rendering-mode="virtual"/>
        </DxDataGrid>
      </div>
      <div class="table-grid">
        <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
      </div>  
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

import { mergeCells, cellsSetting } from "./Gridsetting"
import { useStore } from "vuex";
// register Handsontable's modules
registerAllModules();

export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    HotTable,
    DxDataGrid,
    DxColumn,
    DxToolbar, DxPaging,
    DxItem, DxScrolling
  },
  data() {
    return {

    };
  },
  setup(props, { emit }) {
    const wrapper = ref()
    const hotSettings =  {
          comments: true,
          fillHandle: true,
          colWidths: 100,
          beforeKeyDown: (e: any) => {
              var reg = /[^\D\p{Hangul}!@#\$%\^\&*\)\(+=._]/g;
        if (!reg.test(e.key) && e.key != 'Backspace' && e.key != '-') {
          e.preventDefault()
        }
      },
      afterValidate: (isValid: boolean, value: any, row: any, prop: any, source: any) => {
        let hot = wrapper.value.hotInstance;
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
        ["개<br>인<br>⁀<br>거주<br>자ㆍ<br>비거<br>주자<br>⌣", "근로<br>소득", "간이세액", "", "A01", "300000", "12000", "12000", "", "", "", "", ""],
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
        ["⑫ 전월<br>미환급세액", "", "⑬기환급<br>신청세액", "⑭ 차감잔액<br>(⑫ - ⑬) ", "", "⑮일반<br>환급", "⑯ 신탁재산<br>(금융<br>회사 등)", "⑰ 그 밖의 환급<br>세액", "", "", "", ""],
        ["", "", "", "", "", "", "", "금융회사등", "합병 등", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      mergeCells: mergeCells,
      cell: [
        ...cellsSetting,
      ],
      height: "auto",
      width: 'auto',
      licenseKey: "non-commercial-and-evaluation",
    };
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    let dataSource = ref([
      {
        index: 0,
        inputedYear: 2022,
        inputedMonth: 12,
        paymentYear: 2022,
        paymentMonth: 12,
        afterDeadline: false,
        yearEndTaxAdjustment: 1200,
        refund: true,
        submissionDate: 20221212
      }
    ]);
    const setModalVisible = () => {
      emit('closePopup', false)
    }
    return {
      setModalVisible,
      hotSettings,
      dataSource,
      per_page,
      wrapper,
      move_column,
      colomn_resize
    }
  }
});
</script>
<style lang="scss" scoped>
:deep .ant-modal-body{
  padding-top: 30px;
}
.report-grid{
  padding: 20px 0px 0px 5px;
  overflow-y: scroll;
  height: 860px;
  :deep td.disable-cell {
    color: #fff;
    background-color: #b3b4b3;
  }
  .action-right{
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .table-detail{
    margin-bottom: 5px;
  }
  .open-tab{
      color: white;
      background-color: #558ED5;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      height: 35px;
  }
  .table-grid{
   
    padding-bottom: 20px;
  }
  :deep .wtHolder {
    width: 100% !important;
   }

   :deep .ht_clone_left .wtHolder {
      overflow:hidden;
    }
}

</style>
