<template>
  <standard-form ref="formRef">
    <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true"
                :data-source="dataSource" key-expr="key" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다"
                @cell-prepared="onCellPrepared" @row-prepared="onRowPrepared" @row-removed="logEvent('RowRemoved')"
                @row-removing="logEvent('RowRemoving')"
                @saving="handleSaving" @saved="logEvent('Saved')" @editor-preparing="onEditorPreparing"
                style="height: 70vh"
                @init-new-row="initNewRow"
                :remote-operations="true"
    >
      <DxRowDragging :allow-reordering="true" :show-drag-icons="true" name="drag"/>
      <DxEditing mode="batch" :allow-adding="true" :allow-deleting="true" :allow-updating="true"
                 :use-icons="true" new-row-position="pageBottom"
      />
      <DxPaging :page-size="0"/>
      <DxToolbar>
        <DxItem location="after" name="addRowButton" css-class="cell-button-add"/>
        <DxItem name="saveButton"/>
        <DxItem name="revertButton"/>
      </DxToolbar>
      <DxColumn caption="성명" data-field="name" alignment="center" css-class="text-red">
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn ref="occupationRef" caption="직종" data-field="occupation" :editor-options="{ placeholder: '선택 또는 직접입력' }"
                css-class="text-red p-0" width="165" alignment="center">
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn caption="인건비구분" data-field="classification" css-class="text-red" alignment="center"
                :editor-options="{ placeholder: '선택' }">
        <DxLookup :data-source="LaborCostClassificationArray" display-expr="name" value-expr="value"/>
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn caption="급여" data-field="salary" data-type="number" alignment="right" format="#0,###"/>
      <DxColumn caption="재수당" data-field="allowance" data-type="number" alignment="right" format="#0,###"/>
      <DxColumn caption="일용잡금" data-field="dailyAllowance" data-type="number" alignment="right" format="#0,###"/>
      <DxColumn caption="퇴직금 및 퇴직적립금" data-field="retirementReserve" data-type="number" alignment="right" format="#0,###"/>
      <DxColumn caption="사회보험 부담금" data-field="socialInsuranceLevy" data-type="number" alignment="right" format="#0,###"/>
      <DxColumn caption="계" data-field="total" alignment="center" cell-template="total" :allowEditing="false"/>
      <template #total="{ data }">
        <span class="px-7">{{ calculateSalary(data) }}</span>
      </template>
      <DxColumn type="buttons">
        <DxButtonGrid name="delete" @click="deleteRow"/>
      </DxColumn>
      <DxSummary>
        <DxTotalItem cssClass="custom" show-in-column="drag" display-format="소계"/>

        <DxTotalItem show-in-column="name" alignment="center" display-format="직접인건비 계"/>
        <DxTotalItem show-in-column="name" alignment="center" display-format="간접인건비 계"/>
        <DxTotalItem cssClass="custom" show-in-column="name" alignment="center" display-format="총 인건비 계"/>

        <DxTotalItem show-in-column="salary" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.salary1)"/>
        <DxTotalItem show-in-column="salary" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.salary2)"/>
        <DxTotalItem show-in-column="salary" alignment="right"
                     :customizeText="() => filters.formatNumber(formatSummary.salary1 + formatSummary.salary2)" cssClass="custom"/>

        <DxTotalItem show-in-column="allowance" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.allowance1)"/>
        <DxTotalItem show-in-column="allowance" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.allowance2)"/>
        <DxTotalItem show-in-column="allowance" alignment="right"
                     :customizeText="() => filters.formatNumber(formatSummary.allowance1 + formatSummary.allowance2)" cssClass="custom"/>

        <DxTotalItem show-in-column="dailyAllowance" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance1)"/>
        <DxTotalItem show-in-column="dailyAllowance" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance2)"/>
        <DxTotalItem show-in-column="dailyAllowance" alignment="right"
                     :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance1 + formatSummary.dailyAllowance2)"
                     cssClass="custom"/>

        <DxTotalItem show-in-column="retirementReserve" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.retirementReserve1)"/>
        <DxTotalItem show-in-column="retirementReserve" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.retirementReserve2)"/>
        <DxTotalItem show-in-column="retirementReserve" alignment="right"
                     :customizeText="() => filters.formatNumber(formatSummary.retirementReserve1 + formatSummary.retirementReserve2)"
                     cssClass="custom"/>

        <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy1)"/>
        <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy2)"/>
        <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right"
                     :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy1 + formatSummary.socialInsuranceLevy2)"
                     cssClass="custom"/>

        <DxTotalItem show-in-column="total" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.total1)"/>
        <DxTotalItem show-in-column="total" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.total2)"/>
        <DxTotalItem show-in-column="total" alignment="right" :customizeText="() => filters.formatNumber(formatSummary.total)"
                     cssClass="custom"/>
      </DxSummary>
    </DxDataGrid>
    <div style="display: none"> {{ formatSummary }}</div>
  </standard-form>
</template>

<script lang="ts" setup>
import {
  DxButton as DxButtonGrid,
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxItem,
  DxLookup,
  DxPaging,
  DxRequiredRule,
  DxRowDragging,
  DxSummary,
  DxToolbar,
  DxTotalItem
} from 'devextreme-vue/data-grid';

import {computed, reactive, ref, watch} from 'vue'
import {useStore} from "vuex";
import {InitNewRowEvent, SavingEvent} from "devextreme/ui/data_grid";
import DataSource from 'devextreme/data/data_source';
import mutations from '@/graphql/mutations/AC/AC5/AC520'
import {useMutation} from "@vue/apollo-composable";
import {accountSubject, companyId} from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import {Message} from "@/configs/enum";
import filters from "@/helpers/filters";

const emit = defineEmits(['closePopup'])
const arrSelectOccupation: any = []
const occupationRef = ref()
const formRef = ref()
const LaborCostClassificationArray = [{name: '직접', value: 1}, {name: '간접', value: 2}]
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget = computed(() => store.getters['common/getDataBudget']);

const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

const data: any = []
const dataSource = ref(new DataSource({
  store: {
    type: "array",
    key: "key",
    data: [],
  },
  // requireTotalCount: true,
}))
const arrSelectClassification = ref([{id: 'test', name: 'test'}])
// create mutation useQuery
const {mutate, onDone, loading, onError} = useMutation(mutations.saveEmployeePayTable)
onDone(({data}) => {
  if (data) {
    emit('closePopup', true)
    notification('success', Message.getCommonMessage('101').message)
  }
})
onError((error) => {
  console.log('onError', error)
  notification('error', error.message)

})
const handleSaving = (e: SavingEvent) => {
  const res = formRef.value.validate();
  if (res.isValid) {
    // remove all key "key" in dataAllRow
    const inputs = dataAllRow.value.map((item: any) => {
      const {key, ...rest} = item;
      return rest;
    });
    const result = {
      companyId,
      facilityBusinessId: globalFacilityBizId.value,
      fiscalYear: acYear.value,
      index: dataBudget.value?.index ?? 0,
      totalLaborCost: formatSummary.total,
      totalDirectLaborCost: formatSummary.total1,
      totalIndirectLaborCost: formatSummary.total2,
      accounSubjectOrder: accountSubject[0].theOrder,
      inputs
    }
    // console.log('result', result)
    mutate(result)
  }
  e.cancel = true
}

function calculateOptions(options: any, name: string) {
  if (options.name === name) {
    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
      options.totalValue += options.value.salary ?? 0;
    }
  }
}

const calculate = (options: any) => {
  calculateOptions(options, 'summarySalary1')
  calculateOptions(options, 'summarySalary2')
  // console.log('dataSource --- ', options)
}
const dataAllRow: any = ref([])
const formatSummary = reactive({
  salary1: 0,
  salary2: 0,
  allowance1: 0,
  allowance2: 0,
  dailyAllowance1: 0,
  dailyAllowance2: 0,
  retirementReserve1: 0,
  retirementReserve2: 0,
  socialInsuranceLevy1: 0,
  socialInsuranceLevy2: 0,
  total1: 0,
  total2: 0,
  total: 0,
})
watch(() => dataAllRow.value, (val) => {
  if (val) {
    const initialValue = {
      salary1: 0,
      salary2: 0,
      allowance1: 0,
      allowance2: 0,
      dailyAllowance1: 0,
      dailyAllowance2: 0,
      retirementReserve1: 0,
      retirementReserve2: 0,
      socialInsuranceLevy1: 0,
      socialInsuranceLevy2: 0,
      total1: 0,
      total2: 0,
      total: 0,
    };

    const result = val.reduce((acc: any, item: any) => {
      const {
        classification,
        salary = 0,
        allowance = 0,
        dailyAllowance = 0,
        retirementReserve = 0,
        socialInsuranceLevy = 0,
      } = item;

      if (classification === 1) {
        acc.salary1 += salary;
        acc.allowance1 += allowance;
        acc.dailyAllowance1 += dailyAllowance;
        acc.retirementReserve1 += retirementReserve;
        acc.socialInsuranceLevy1 += socialInsuranceLevy;
      } else if (classification === 2) {
        acc.salary2 += salary;
        acc.allowance2 += allowance;
        acc.dailyAllowance2 += dailyAllowance;
        acc.retirementReserve2 += retirementReserve;
        acc.socialInsuranceLevy2 += socialInsuranceLevy;
      }
      acc.total1 = acc.salary1 + acc.allowance1 + acc.dailyAllowance1 + acc.retirementReserve1 + acc.socialInsuranceLevy1;
      acc.total2 = acc.salary2 + acc.allowance2 + acc.dailyAllowance2 + acc.retirementReserve2 + acc.socialInsuranceLevy2;
      acc.total = acc.total1 + acc.total2;
      return acc;
    }, initialValue)
    Object.assign(formatSummary, result)
  }
}, {deep: true})
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
const deleteRow = (e: any) => {
  const key_row = e?.row.key as string
  const rowIndex = e?.row.rowIndex as string
  e.component.deleteRow(rowIndex)
  dataAllRow.value = dataAllRow.value.filter((item: any) => item.key !== key_row)
}
const logEvent = (e: any) => {
  console.log('log event', e)
}

const customize = (data: any) => {
  // console.log('data row', dataAllRow.value)
  // console.log('data customize', data)
  // return data?.classification === 1 ? data?. : '간접'
}

const onCellPrepared = (e: any) => {
  const getElementCustom = (index: string) => !e.cellElement.getAttributeNames().includes('aria-describedby') && e.cellElement.getAttribute('role') === 'gridcell' && e.cellElement.getAttribute('aria-colindex') === index
  if (getElementCustom('2')) {
    e.cellElement.colSpan = 3
  }
  if (getElementCustom('3')) {
    e.cellElement.style.display = 'none'
  }
  if (getElementCustom('4')) {
    e.cellElement.style.display = 'none'
  }
  // if(e.rowType === "data" && e.column.cellTemplate === "total" && isEmpty(e.data)) {
  //   console.log(e.data)
  // }
}
const onRowPrepared = (e: any) => {
  if (!e.isEditing && e.rowType === 'data') {
    if (!dataAllRow.value.length) {
      dataAllRow.value.push({...e.data, key: e.key})
    } else {
      const isRowExits = dataAllRow.value.find((item: any) => item.key === e.key)
      if (!isRowExits) dataAllRow.value.push({...e.data, key: e.key})
      else {
        // console.log(e?.removed)
        if (e?.removed) dataAllRow.value = dataAllRow.value.filter((item: any) => item.key !== e.key)
        else dataAllRow.value = dataAllRow.value.map((item: any) => item.key === e.key ? {...item, ...e.data} : {...item})
      }
    }
  }
  // custom text column drag of footer row
  const isFooterRow = e.rowElement.classList.contains('dx-footer-row')
  if (isFooterRow) {
    const rowDrag = e.rowElement.querySelector('.dx-command-drag')
    // add text first child of e.rowElement
    const text = document.createElement('div')
    text.classList.add('custom')
    text.innerText = '소계'
    rowDrag && rowDrag.appendChild(text)
  }
}
const initNewRow = (e: InitNewRowEvent) => {
  // dataSource.value.store().insert({name: 'hieu'}).then((result) => {
  //   console.log('result', result)
  //   // dataAllRow.value.push(result)
  //   console.log('result', dataSource.value)
  //   dataSource.value.reload()

  // })
  // console.log('init new row', e)
}

function calculateSalary(data: any) {
  const salary = +data.data.salary || 0;
  const allowance = +data.data.allowance || 0;
  const dailyAllowance = +data.data.dailyAllowance || 0;
  const retirementReserve = +data.data.retirementReserve || 0;
  const socialInsuranceLevy = +data.data.socialInsuranceLevy || 0;
  return filters.formatNumber(salary + allowance + dailyAllowance + retirementReserve + socialInsuranceLevy);
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
:deep(.dx-datagrid .dx-row > td){
  padding: 7px;
}
:deep(.dx-freespace-row) {
  display: none !important;
}
</style>
