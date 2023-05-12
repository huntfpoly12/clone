<template>
  <div>
    <div class="title">임직원보수일람표</div>
    <standard-form ref="formRef">
      <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true"
        :data-source="dataSource" key-expr="key" :allow-column-reordering="move_column"
        :allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다"
        @cell-prepared="onCellPrepared" @row-prepared="onRowPrepared" @row-removing="onRowRemoving"
        @row-removed="logEvent('RowRemoved')" @saving="handleSaving" @saved="logEvent('Saved')"
        @editor-preparing="onEditorPreparing" style="height: 70vh">
        <DxRowDragging :allow-reordering="true" :on-reorder="onReorder" :show-drag-icons="true" name="drag" />
        <DxEditing mode="batch" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
        <!--        v-model:changes="changes"-->
        <!--      <DxColumn caption="" width="30px"/>-->
        <DxColumn caption="성명" data-field="name" alignment="center" css-class="text-red">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn ref="occupationRef" caption="직종" data-field="occupation" :editor-options="{ placeholder: '선택 또는 직접입력' }"
          css-class="text-red p-0" width="165" alignment="center" :allowEditing="false" cell-template="occupation">
        </DxColumn>
        <template #occupation="{ data }">
          <SelectSearchEdit v-model:valueInput="data.data.occupation" :data="arrSelectOccupation"
            @updateArrSelect="(value: any) => arrSelectOccupation = [...value]" :required="true" />
        </template>
        <DxColumn caption="인건비구분" data-field="classification" css-class="text-red" alignment="center"
          :editor-options="{ placeholder: '선택' }">
          <DxLookup :data-source="arrSelectClassification" display-expr="name" value-expr="id" />
          <DxRequiredRule />
        </DxColumn>
        <DxColumn caption="급여" data-field="salary" />
        <DxColumn caption="재수당" data-field="bonus" cell-template="employeeSalaryTable" />
        <DxColumn caption="일용잡금" data-field="dailyWage" />
        <DxColumn caption="퇴직금 및 퇴직적립금" data-field="severancePay" />
        <DxColumn caption="사회보험 부담금" data-field="socialInsurancePremiums" />
        <DxColumn caption="계" cell-template="total" alignment="center" />
        <template #total="{ data }">
          <span class="px-7">{{ (data.data.salary || 0) }}</span>
        </template>

        <DxSummary :calculate-custom-summary="calculate" :recalculate-while-editing="true">
          <DxTotalItem cssClass="custom" column="drag" display-format="소계" />
          <DxTotalItem show-in-column="name" alignment="center" display-format="직접인건비 계" />
          <DxTotalItem show-in-column="name" alignment="center" display-format="간접인건비 계" />
          <DxTotalItem cssClass="custom" show-in-column="name" alignment="center" display-format="총 인건비 계" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="position" alignment="right" />
          <DxTotalItem show-in-column="position" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="position" alignment="right" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="payrollType" alignment="right" />
          <DxTotalItem show-in-column="payrollType" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="payrollType" alignment="right" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="salary" alignment="right" />
          <DxTotalItem show-in-column="salary" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="salary" alignment="right" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="bonus" alignment="right" />
          <DxTotalItem show-in-column="bonus" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="bonus" alignment="right" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="dailyWage" alignment="right" />
          <DxTotalItem show-in-column="dailyWage" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="dailyWage" alignment="right" />

          <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="severancePay" alignment="right" />
          <DxTotalItem show-in-column="severancePay" alignment="right" />
          <DxTotalItem cssClass="custom" show-in-column="severancePay" alignment="right" />
        </DxSummary>
      </DxDataGrid>
    </standard-form>

  </div>
</template>

<script lang="ts" setup>
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxGroupItem,
  DxLookup,
  DxRequiredRule,
  DxRowDragging,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';

import { computed, defineComponent, ref } from 'vue'
import { useStore } from "vuex";
import deletePopup from "@/utils/deletePopup";
import { RowDraggingReorderEvent, RowRemovingEvent, SavingEvent } from "devextreme/ui/data_grid";

const arrSelectOccupation: any = []
const occupationRef = ref()
const formRef = ref()

const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget = computed(() => store.getters['common/getDataBudget']);
const data: any = []
const dataSource = ref(data)
const arrSelectClassification = ref([{ id: 'test', name: 'test' }])
console.log('dataBudget', dataBudget.value)
const handleSaving = (e: SavingEvent) => {
  const res = formRef.value.validate();
  console.log('formRef', res)
  e.cancel = true
}
const handleDelete = (id: number) => {
  deletePopup({
    callback: () => {
      dataSource.value = dataSource.value.filter((item: any) => item.id !== id)
    }
  })
}
const calculate = (options: any) => {
  if (options.name === 'SelectedRowsSummary') {
    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
      // if (options.component.isRowSelected(options.value.ID)) {
      options.totalValue += options.value.position || 0;
      // }
    }
  }
}
const onReorder = (e: RowDraggingReorderEvent) => {
  const visibleRows = e.component.getVisibleRows();
  console.log('visibleRows', visibleRows)
  const toIndex = dataSource.value.findIndex((item: any) => item.id === visibleRows[e.toIndex].data.id);
  const fromIndex = dataSource.value.findIndex((item: any) => item.id === e.itemData.id);
  const newTasks = [...dataSource.value];

  newTasks.splice(fromIndex, 1);
  newTasks.splice(toIndex, 0, e.itemData);

  dataSource.value = newTasks;
}
const onEditorPreparing = (e: any) => {
  if (e.dataField == "classification" && e.parentType === "dataRow") {

    // const defaultValueChangeHandler = e.editorOptions.onValueChanged;
    // // console.log(e.lookup)
    // e.editorElement.onkeyup = function (keyEvent: KeyboardEvent) {
    //   e.editorOptions.searchEnabled = false
    //   if (keyEvent.key === 'Enter') {
    //     if (keyEvent.target.value && !arrSelectClassification.value.some((item: any) => item.id === keyEvent.target.value)) {
    //       arrSelectClassification.value.push({
    //         id: keyEvent.target.value,
    //         name: keyEvent.target.value
    //       })
    //       e.editorOptions.searchEnabled = true
    //     }
    //     console.log('keyEvent', keyEvent.target)
    //     // e.setCellValue(keyEvent.target.value, keyEvent.target.value)
    //   }
    // }

  }
}
const onRowRemoving = async (e: RowRemovingEvent) => {
  deletePopup({
    callback: () => {
      dataSource.value = dataSource.value.filter((item: any) => item.id !== e.data.id)
    }
  })
  e.cancel = true
}
const logEvent = (e: any) => {
  console.log(e)
}

const onCellPrepared = (e: any) => {
  if (!e.cellElement.getAttributeNames().includes('aria-describedby') && e.cellElement.getAttribute('role') === 'gridcell' && e.cellElement.getAttribute('aria-colindex') === '2') {
    e.cellElement.colSpan = 3
  }
  // if(e.rowType === "data" && e.column.cellTemplate === "total" && isEmpty(e.data)) {
  //   console.log(e.data)
  // }
}
const onRowPrepared = (e: any) => {
  const isRowSummary = e.rowElement.classList.contains('dx-footer-row')
  if (isRowSummary) {
    const rowDrag = e.rowElement.querySelector('.dx-command-drag')
    e.rowElement.removeChild(e.rowElement.lastChild)
    e.rowElement.removeChild(e.rowElement.lastChild)
    // add text first child of e.rowElement
    const text = document.createElement('div')
    text.classList.add('custom')
    text.innerText = '소계'
    rowDrag && rowDrag.appendChild(text)
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0px 10px;
  background-color: #97c0e1;
}

:deep(.dx-datagrid-total-footer) {
  .dx-datagrid-content {
    padding: 0px;

    .dx-footer-row {
      td {
        border-right: 1px solid #ddd;
        padding: 0px;

        .custom {
          border-bottom: none;

          &:first-child {
            padding: 0 10px;
          }
        }

        div {
          border-bottom: 1px solid #ddd;
          padding: 0 10px 0 0;
        }
      }

      .dx-datagrid-text-content {
        text-overflow: inherit;
      }

      td:last-child {
        border-right: none;
      }
    }
  }

  td {
    white-space: normal !important;
  }
}

:deep(.dx-header-row .text-red) {
  color: red;
}

:deep(.dx-freespace-row) {
  display: none !important;
}
</style>
