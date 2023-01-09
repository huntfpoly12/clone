<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        style="top: 20px" width="1368px" :bodyStyle="{ height: '890px' }">
    <div class="report-grid">
      <div class="action-right">
        <button-basic  :width="150" text="새로불러오기" class="open-tab" ></button-basic>
      </div>
      <div class="table-detail">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
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
      data: ,
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

    const changeStatus = (data: any) => {
            let dataChangeStatus = {
                "companyId": data.companyId,
                "imputedYear": data.imputedYear,
                "reportId": data.reportId,
                "status": data.status
            }
            // actionChangeStatus(dataChangeStatus)
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
