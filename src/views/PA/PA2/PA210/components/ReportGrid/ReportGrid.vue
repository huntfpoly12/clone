<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        style="top: 20px" width="1368px" :bodyStyle="{ height: '890px' }">
    <div class="report-grid">
      {{  dataReport }}
      <div class="header-1">원천세신고서</div>
      <div class="action-right">
        <button-basic  :width="150" text="새로불러오기" class="btn-get-income" ></button-basic>
      </div>
      <div class="table-detail">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataReport"
          :show-borders="true" key-expr="index" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" 
          :focused-row-enabled="true">
          <DxColumn caption="마감 현황" cell-template="status"/>
          <template #status="{ data }">
            <process-status-tooltip v-model:valueStatus="data.data.status" :height="32"
                        :dataRow="data.data" @dataRow="changeStatus" />
          </template>
          <DxColumn caption="귀속연월" />
          <DxColumn caption="지급연월" />
          <DxColumn caption="신고 종류" />
          <DxColumn caption="연말" />
          <DxColumn caption="환급" cell-template="refund" :width="80" css-class="cell-center"/>
          <template #refund="{ data }">
            <switch-basic :valueSwitch="data.data.refund" :textCheck="'X'" :textUnCheck="'O'" />
          </template>
          <DxColumn caption="제출일" cell-template="submission-date" :width="160"/>
          <template #submission-date="{ data }">
            <date-time-box :valueDate="data.data.submissionDate"></date-time-box>
          </template>
          <DxScrolling column-rendering-mode="virtual"/>
        </DxDataGrid>
      </div>
      <div class="table-grid">
        <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
      </div> 
      <div class="header-2">원천징수세액환급신청서 / 기납부세액명세서 검증 결과</div>
      <div class="verification-result">
        <div class="form-item">
          <label for="">저장가능여부</label>
          
        </div>
      </div>
      <div class="header-text-3">
        환급신청액 일치 여부
        <span>
          <img src="@/assets/images/iconInfo.png" style="width: 14px" />
          <p>아래 내역들의 값이 일치해야 정상입니다.</p>
        </span>
      </div>
      <a-row :gutter="[0, 10]">
            <a-col span="10"> 원천세신고서 > (21)환급신청액</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
            <a-col span="10">원천징수세액환급신청서 > 기납부원천징수세액 (2)계 (합계)</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
      </a-row>
      <div class="header-text-3">
        징수세액과 기납부세액 일치 여부 (A04(연말정산) 포함된 경우 해당)
        <span>
          <img src="@/assets/images/iconInfo.png" style="width: 14px" />
          <p>A04(연말정산) 포함된 경우 아래 내역들의 값이 일치해야 정상입니다.</p>
        </span>
      </div>
      <a-row :gutter="[0, 10]">
            <a-col span="10">원천징수세액환급신청서 > 기납부원천징수세액 (2)계 (A04)</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
            <a-col span="10">기납부세액명세서 > 지급명세서기납부세액현황 (3)소득세등 (합계)</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
      </a-row>
      <div class="header-text-3">
        기납부세액 차이조정현황
        <span>
          <img src="@/assets/images/iconInfo.png" style="width: 14px" />
          <p>차이금액 > 0 이면, 사유가 있어야 합니다.</p>
        </span>
      </div>
      <a-row :gutter="[0, 10]">
            <a-col span="10">(1)소득세 등 합계 (징수세액)</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
            <a-col span="10">(3)소득세 등 합계 (기납부세액)</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
            <a-col span="10">(차이금액 ((3)-(1))</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
            <a-col span="10">사유</a-col>
            <a-col span="12">
              <text-number-box :disabled="true" width="150px"></text-number-box>
            </a-col>
      </a-row>
      <a-row style="margin-top: 20px;">
        <a-col :span="16" :offset="9">
            <button-basic text="저장 취소" :type="'default'" mode="outlined" 
                :width="120" style="margin-right: 10px;" />
            <button-basic text="저장" :type="'default'" mode="'contained'"
                :width="120" />
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

import { mergeCells, cellsSetting ,dataInit } from "./Gridsetting"
import { useStore } from "vuex";
import TextNumberBox from "@/components/common/TextNumberBox.vue";
// register Handsontable's modules
registerAllModules();

export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    dataReport: {
      type: Array,
      default: [],
    }
  },
  components: {
    HotTable,
    DxDataGrid,
    DxColumn,
    DxToolbar, DxPaging,
    DxItem, DxScrolling
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
      data: dataInit,
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
        submissionDate: 20221212,
        status: 10
      }
    ]);
    const setModalVisible = () => {
      emit('closePopup', false)
    }

    const changeStatus = (data: any) => {
      
    }
    return {
      setModalVisible,
      hotSettings,
      dataSource,
      per_page,
      wrapper,
      move_column,
      colomn_resize,
      changeStatus
    }
  }
});
</script>
<style lang="scss" scoped>
:deep .ant-modal-body{
  padding-top: 30px;
}
:deep .cell-center {
    text-align: center !important
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
  .btn-get-income{
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
  .header-1{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-2{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-text-3 {
    background-color: #C6D9F1;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 10px;
    span {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #b3b4b3;
      float: right;

      p {
        margin: 5px 0px 3px 10px;
      }
    }
  }
}

</style>
