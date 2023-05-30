<template>
  <a-modal :visible="modalStatus" title="임직원보수일람표" centered @cancel="setModalVisible" :mask-closable="false"
           :footer="false" width="1300px">
    <standard-form ref="formRef">
      <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true"
                  :data-source="dataSource" key-expr="key" :allow-column-reordering="move_column"
                  :allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다"
                  @cell-prepared="onCellPrepared" @row-prepared="onRowPrepared" @saving="handleSaving"
                  @editor-preparing="onEditorPreparing" style="height: 70vh" :remote-operations="true">
        <DxRowDragging :allow-reordering="true" :show-drag-icons="true" name="drag" />
        <DxEditing mode="batch" :allow-adding="true" :allow-deleting="true" :allow-updating="true" :use-icons="true"
                   new-row-position="last">
          <DxTexts add-row="임직원보수등록"/>
          <DxTexts save-all-changes="저장"/>
          <DxTexts delete-row="삭제"/>
        </DxEditing>
        <DxPaging :page-size="0" />
        <DxToolbar>
          <DxItem location="after" name="addRowButton" css-class="cell-button-add" />
          <DxItem name="saveButton" title="Add" />
        </DxToolbar>
        <DxColumn caption="성명" data-field="name" alignment="center" css-class="text-red">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn caption="직종" data-field="occupation" :editor-options="{ placeholder: '선택 또는 직접입력' }"
                  css-class="text-red p-0" width="165" alignment="center">
          <DxLookup :data-source="arrSelectOccupation" display-expr="name" value-expr="value" />
          <DxRequiredRule />
        </DxColumn>
        <DxColumn caption="인건비구분" data-field="classification" css-class="text-red" alignment="center"
                  :editor-options="{ placeholder: '선택' }">
          <DxLookup :data-source="LaborCostClassificationArray" display-expr="name" value-expr="value" />
          <DxRequiredRule />
        </DxColumn>
        <DxColumn caption="급여" data-field="salary" data-type="number" alignment="right" format="#0,###" />
        <DxColumn caption="재수당" data-field="allowance" data-type="number" alignment="right" format="#0,###" />
        <DxColumn caption="일용잡금" data-field="dailyAllowance" data-type="number" alignment="right" format="#0,###" />
        <DxColumn caption="퇴직금 및 퇴직적립금" data-field="retirementReserve" data-type="number" alignment="right"
                  format="#0,###" />
        <DxColumn caption="사회보험 부담금" data-field="socialInsuranceLevy" data-type="number" alignment="right"
                  format="#0,###" />
        <DxColumn caption="계" data-field="total" alignment="right" cell-template="total" :allowEditing="false" />
        <template #total="{ data }">
          <span class="px-7">{{ calculateSalary(data) }}</span>
        </template>
        <DxColumn type="buttons">
          <DxButtonGrid name="delete" @click="deleteRow" />
        </DxColumn>
        <DxSummary>
          <DxTotalItem cssClass="custom" show-in-column="drag" display-format="소계" />

          <DxTotalItem cssClass="center" show-in-column="name" alignment="center" display-format="직접인건비 계" />
          <DxTotalItem cssClass="center" show-in-column="name" alignment="center" display-format="간접인건비 계" />
          <DxTotalItem cssClass="custom center" show-in-column="name" alignment="center" display-format="총 인건비 계" />

          <DxTotalItem show-in-column="salary" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.salary1)" />
          <DxTotalItem show-in-column="salary" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.salary2)" />
          <DxTotalItem show-in-column="salary" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.salary1 + formatSummary.salary2)"
                       cssClass="custom" />

          <DxTotalItem show-in-column="allowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.allowance1)" />
          <DxTotalItem show-in-column="allowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.allowance2)" />
          <DxTotalItem show-in-column="allowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.allowance1 + formatSummary.allowance2)"
                       cssClass="custom" />

          <DxTotalItem show-in-column="dailyAllowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance1)" />
          <DxTotalItem show-in-column="dailyAllowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance2)" />
          <DxTotalItem show-in-column="dailyAllowance" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.dailyAllowance1 + formatSummary.dailyAllowance2)"
                       cssClass="custom" />

          <DxTotalItem show-in-column="retirementReserve" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.retirementReserve1)" />
          <DxTotalItem show-in-column="retirementReserve" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.retirementReserve2)" />
          <DxTotalItem show-in-column="retirementReserve" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.retirementReserve1 + formatSummary.retirementReserve2)"
                       cssClass="custom" />

          <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy1)" />
          <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy2)" />
          <DxTotalItem show-in-column="socialInsuranceLevy" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.socialInsuranceLevy1 + formatSummary.socialInsuranceLevy2)"
                       cssClass="custom" />

          <DxTotalItem show-in-column="total" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.total1)" />
          <DxTotalItem show-in-column="total" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.total2)" />
          <DxTotalItem show-in-column="total" alignment="right"
                       :customizeText="() => filters.formatNumber(formatSummary.total)" cssClass="custom" />
        </DxSummary>
      </DxDataGrid>
      <div style="display: none"> {{ formatSummary }} {{ arrSelectOccupation }}</div>
    </standard-form>
  </a-modal>
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
  DxTexts,
  DxToolbar,
  DxTotalItem
} from 'devextreme-vue/data-grid';

import {computed, reactive, ref, watch} from 'vue'
import {useStore} from "vuex";
import deletePopup from "@/utils/deletePopup";
import {SavingEvent} from "devextreme/ui/data_grid";
import DataSource from 'devextreme/data/data_source';
import mutations from '@/graphql/mutations/AC/AC5/AC520'
import {useMutation, useQuery} from "@vue/apollo-composable";
import {accountSubject, companyId} from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import {Message} from "@/configs/enum";
import getEmployeePayTable from "@/graphql/queries/AC/AC5/AC520/getEmployeePayTable";
import searchEmployeeOccupations from "@/graphql/queries/AC/AC5/AC520/searchEmployeeOccupations";
import Guid from "devextreme/core/guid";
import filters from "@/helpers/filters";
import isEqual from 'lodash/isEqual';

const emit = defineEmits(['closePopup'])
const props = defineProps({
  modalStatus: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})
const arrSelectOccupation: any = ref([])
const formRef = ref()
const LaborCostClassificationArray = [{ name: '직접', value: 1 }, { name: '간접', value: 2 }]
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget = computed(() => store.getters['common/getDataBudget']);

const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

const dataOld: any = ref([])
const dataSource = ref(new DataSource({
  store: {
    type: "array",
    key: "key",
    data: [],
  },
}))

// query
const { onResult: onResultEmployeePayTable, onError: onErrorEmployeePayTable } = useQuery(getEmployeePayTable, {
  companyId,
  fiscalYear: acYear.value,// acYear.value
  facilityBusinessId: globalFacilityBizId.value,
  index: props.index
}, () => ({
  fetchPolicy: "no-cache"
}))
onResultEmployeePayTable(({ data }) => {
  if (data) {
    const transformData = data?.getEmployeePayTable?.items.map((item: any) => ({ ...item, key: new Guid().toString() }))
    dataOld.value = transformData
    dataSource.value = new DataSource({
      store: {
        type: "array",
        key: "key",
        data: transformData ?? [],
      },
    })
  }
})

const querySearchEmployeeOccupations = reactive({
  companyId
})
// query
const { onResult: onResultSearch, onError: onErrorSearch } = useQuery(searchEmployeeOccupations, querySearchEmployeeOccupations, () => ({
  fetchPolicy: "no-cache"
}))
onResultSearch(({ data }) => {
  if (data) {
    arrSelectOccupation.value = data?.searchEmployeeOccupations.map((i:any) => ({name: i, value: i})) ?? []
  }
})


// create mutation useQuery
const { mutate, onDone, loading, onError } = useMutation(mutations.saveEmployeePayTable)
onDone(({ data }) => {
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
      const { key, ...rest } = item;
      return rest;
    });
    const result = {
      companyId,
      facilityBusinessId: globalFacilityBizId.value,
      fiscalYear: acYear.value,
      index: props.index ?? 0,
      totalLaborCost: formatSummary.total,
      totalDirectLaborCost: formatSummary.total1,
      totalIndirectLaborCost: formatSummary.total2,
      accounSubjectOrder: accountSubject[0].theOrder,
      inputs
    }
    mutate(result)
  }
  e.cancel = true
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
  const result = val?.reduce((acc: any, item: any) => {
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
}, { deep: true })
const onEditorPreparing = (e: any) => {
  if (e.dataField == "occupation" && e.parentType === "dataRow") {
    e.editorElement.onkeyup = function (keyEvent: any) {
      if (keyEvent.key === 'Enter') {
        if (keyEvent.target.value && !arrSelectOccupation.value.some((item: any) => item.value === keyEvent.target.value)) {
          arrSelectOccupation.value.push({
            name: keyEvent.target.value,
            value: keyEvent.target.value
          })
          e.setValue(keyEvent.target.value, 'occupation')
        }
      }
    }
  }
}
const deleteRow = (e: any) => {
  const key_row = e?.row.key as string
  const rowIndex = e?.row.rowIndex as string
  e.component.deleteRow(rowIndex)
  dataAllRow.value = dataAllRow.value.filter((item: any) => item.key !== key_row)
}

const setModalVisible = () => {
  if (!isEqual(dataAllRow.value, dataOld.value)) {
    deletePopup({
      callback: () => {
        emit('closePopup', false)
      },
      message: Message.getCommonMessage('301').message,
      okText: '네',
      cancelText: '아니요'
    })
    return
  } else {
    emit('closePopup', false)
  }
}

const onCellPrepared = (e: any) => {
  if (e.rowType === 'data' && e.column.dataField === 'classification') {
    if (!dataAllRow.value.length) {
      dataAllRow.value.push({ ...e.data, key: e.key })
    } else {
      const isRowExits = dataAllRow.value.find((item: any) => item.key === e.key)
      if (!isRowExits) dataAllRow.value.push({ ...e.data, key: e.key })
      else {
        dataAllRow.value = dataAllRow.value.map((item: any) => item.key === e.key ? { ...item, ...e.data } : { ...item })
      }
    }
  }
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
}
const onRowPrepared = (e: any) => {
  if (!e.isEditing && e.rowType === 'data' && !e?.removed) {
    if (!dataAllRow.value.length) {
      dataAllRow.value.push({ ...e.data, key: e.key })
    } else {
      const isRowExits = dataAllRow.value.find((item: any) => item.key === e.key)
      if (!isRowExits) dataAllRow.value.push({ ...e.data, key: e.key })
      else {
        dataAllRow.value = dataAllRow.value.map((item: any) => item.key === e.key ? { ...item, ...e.data } : { ...item })
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
// create function random string have length = 4
const randomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  const length = 4;
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function calculateSalary(data: any) {
  const salary = +data.data?.salary || 0;
  const allowance = +data.data?.allowance || 0;
  const dailyAllowance = +data.data?.dailyAllowance || 0;
  const retirementReserve = +data.data?.retirementReserve || 0;
  const socialInsuranceLevy = +data.data?.socialInsuranceLevy || 0;
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
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &.center {
          justify-content: center;
        }
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

:deep(.dx-datagrid .dx-row > td) {
  padding: 7px;
}

:deep(.dx-freespace-row) {
  display: none !important;
}</style>
