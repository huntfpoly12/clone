<template>
  <a-modal :visible="modalStatus" title="임직원보수일람표" centered @cancel="setModalVisible" :mask-closable="false"
    :footer="false" width="1400px">
    <standard-form ref="formRef">
      <a-spin :spinning="loadingGetEmployeeTable">
        <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true"
          :data-source="dataSource" key-expr="key" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다"
          @cell-prepared="onCellPrepared" @row-prepared="onRowPrepared" @saving="handleSaving" style="height: 70vh">
          <DxRowDragging :allow-reordering="true" :show-drag-icons="true" name="drag" :on-reorder="onReorder" />
          <DxEditing mode="batch" :allow-adding="true" :allow-deleting="dataBudget?.status !== 20" :allow-updating="dataBudget?.status !== 20" :use-icons="true"
            new-row-position="last">
            <DxTexts add-row="임직원보수등록" />
            <DxTexts save-all-changes="저장" />
            <DxTexts delete-row="삭제" />
            <DxTexts undelete-row="삭제 취소" />
          </DxEditing>
          <DxPaging :page-size="0" />
          <DxToolbar>
            <DxItem location="after">
              <DxButton :disabled="dataBudget?.status !== 10" @click="handleFillValuePreIndex" text="전임직원수일람표 불러오기"
                class="d-flex-center" style="background: #337ab7; color: white; height: 100%;" />
            </DxItem>
            <DxItem location="after" name="addRowButton" css-class="cell-button-add" cell-template="addRow">
              <a-tooltip title="임직원보수등록">
                <div>
                  <DxButton size="large" @click="addRow" style="background: #337ab7; color: white"
                    :disabled="dataBudget.status !== 10">
                    <PlusOutlined :style="{ fontSize: '17px', color: 'white' }" />
                    신규
                  </DxButton>
                </div>
              </a-tooltip>
            </DxItem>
            <DxItem name="saveButton">
              <a-tooltip title="저장">
                <div>
                  <DxButton style="background: #337ab7; color: white" :disabled="dataAllRow.length === 0 || dataBudget.status !== 10" @click="actionSave">
                    <SaveOutlined :style="{ fontSize: '17px', color: 'white' }" />
                    저장
                  </DxButton>
                </div>
              </a-tooltip>
            </DxItem>
          </DxToolbar>
          <DxColumn caption="성명" data-field="name" alignment="center" css-class="text-red">
            <DxRequiredRule :message="Message.getCommonMessage('102').message" />
          </DxColumn>
          <DxColumn caption="직종" data-field="occupation" css-class="text-red p-0" width="165" alignment="center"
            edit-cell-template="selectOccupation">
            <DxRequiredRule :message="Message.getCommonMessage('102').message" />
          </DxColumn>
          <template #selectOccupation="{ data }">
            <DxSelectBox ref="selectOccupationRef" :noDataText="Message.getMessage('COMMON', '901').message"
              :data-source="arrSelectOccupation" placeholder="선택 또는 직접입력" v-model:value="data.value" display-expr="name"
              value-expr="value" :searchEnabled="true" :searchTimeout="0" @value-changed="setEditedValue($event, data)"
              @enter-key="onEnterKey($event, data)" :onFocusIn="onFocusInOccupation" />
          </template>
          <DxColumn caption="인건비구분" data-field="classification" css-class="text-red" alignment="center"
            header-cell-template="classification" edit-cell-template="laborCostClassificationArray">
            <DxLookup :data-source="LaborCostClassificationArray" display-expr="name" value-expr="value" />
            <DxRequiredRule :message="Message.getCommonMessage('102').message" />
          </DxColumn>
          <template #laborCostClassificationArray="{ data }">
            <DxSelectBox ref="laborCostClassificationArrayRef" :noDataText="Message.getMessage('COMMON', '901').message"
              :data-source="LaborCostClassificationArray" placeholder="선택" v-model:value="data.value" display-expr="name"
              value-expr="value" @value-changed="setEditedValue($event, data)" :onFocusIn="onFocusInLabor" />
          </template>
          <template #classification>
            <a-tooltip overlayClassName="custom-tooltip-header">
              <template #title>
                <div class="d-flex justify-content-around">
                  <div>직접비 대상 장기요양요원:</div>
                  <div v-if="facilityBizType === 1">
                    <div>간호(조무)사</div>
                    <div>물리(작업)치료사</div>
                    <div>사회복지사</div>
                    <div>요양보호사</div>
                  </div>
                  <div v-else-if="facilityBizType === 2">
                    <div>사회복지사</div>
                    <div>요양보호사</div>
                  </div>
                  <div v-else-if="facilityBizType === 3">
                    <div>사회복지사</div>
                    <div>요양보호사</div>
                  </div>
                  <div v-else-if="facilityBizType === 4">
                    <div>간호(조무)사간호(조무)사</div>
                    <div>치과위생사</div>
                  </div>
                  <div v-else-if="facilityBizType === 5">
                    <div>요양보호사</div>
                  </div>
                  <div v-else>
                    <div>간호(조무)사</div>
                    <div>물리(작업)</div>
                    <div>사회복지사</div>
                    <div>요양보호사</div>
                  </div>
                </div>
              </template>
              <div style="color: red">인건비구분</div>
            </a-tooltip>
          </template>
          <DxColumn caption="급여" data-field="salary" data-type="number" alignment="right" format="#0,###" width="100px"/>
          <DxColumn caption="재수당" data-field="allowance" data-type="number" alignment="right" format="#0,###" width="100px"/>
          <DxColumn caption="일용잡금" data-field="dailyAllowance" data-type="number" alignment="right" format="#0,###" />
          <DxColumn caption="퇴직금 및 퇴직적립금" data-field="retirementReserve" data-type="number" alignment="right"
            format="#0,###" width="130px" />
          <DxColumn caption="사회보험 부담금" data-field="socialInsuranceLevy" data-type="number" alignment="right"
            format="#0,###" width="120px" />
          <DxColumn caption="계" data-field="total" alignment="right" cell-template="total" :allowEditing="false"
            width="160px" />
          <template #total="{ data }">
            <span class="px-7">{{ calculateSalary(data) }}</span>
          </template>
          <DxColumn type="buttons">
            <DxButtonGrid name="delete" @click="deleteRow">
              <DeleteOutlined style="font-size: 16px; cursor: pointer" title="삭제" />
            </DxButtonGrid>
          </DxColumn>
          <DxSummary :recalculate-while-editing="true">
            <DxTotalItem cssClass="custom" show-in-column="drag" display-format="소계" />

            <DxTotalItem cssClass="center" column="name" alignment="center" display-format="직접인건비 계" />
            <DxTotalItem cssClass="center" column="name" alignment="center" display-format="간접인건비 계" />
            <DxTotalItem cssClass="custom center" column="name" alignment="center" display-format="총 인건비 계" />

            <DxTotalItem column="salary" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.salary1)" />/>
            <DxTotalItem column="salary" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.salary2)" />
            <DxTotalItem column="salary" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.salary1 + formatSummaryCustom.salary2)"
              cssClass="custom" />

            <DxTotalItem column="allowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.allowance1)" />
            <DxTotalItem column="allowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.allowance2)" />
            <DxTotalItem column="allowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.allowance1 + formatSummaryCustom.allowance2)"
              cssClass="custom" />

            <DxTotalItem column="dailyAllowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.dailyAllowance1)" />
            <DxTotalItem column="dailyAllowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.dailyAllowance2)" />
            <DxTotalItem column="dailyAllowance" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.dailyAllowance1 + formatSummaryCustom.dailyAllowance2)"
              cssClass="custom" />

            <DxTotalItem column="retirementReserve" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.retirementReserve1)" />
            <DxTotalItem column="retirementReserve" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.retirementReserve2)" />
            <DxTotalItem column="retirementReserve" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.retirementReserve1 + formatSummaryCustom.retirementReserve2)"
              cssClass="custom" />

            <DxTotalItem column="socialInsuranceLevy" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.socialInsuranceLevy1)" />
            <DxTotalItem column="socialInsuranceLevy" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.socialInsuranceLevy2)" />
            <DxTotalItem column="socialInsuranceLevy" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.socialInsuranceLevy1 + formatSummaryCustom.socialInsuranceLevy2)"
              cssClass="custom" />

            <DxTotalItem column="total" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.total1)" />
            <DxTotalItem column="total" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.total2)" />
            <DxTotalItem column="total" alignment="right"
              :customizeText="() => filters.formatNumber(formatSummaryCustom.total)" cssClass="custom" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </standard-form>
    <a-modal :visible="state.modalFillDataPreIndex" :mask-closable="false" :footer="false" :closable="false" :width="500">
      <div>
        <div>최종차수(본예산인 경우 전년도 최종차수) 예산액을 불러옵니다. 이미</div>
        <div>입력된 전예산액이 있더라도 새로 불러온 전예산액이 입력됩니다.</div>
        <div>그래도 불러오겠습니까?</div>
      </div>
      <div class="footer">
        <button-basic class="button-form-modal" text="아니요" :type="'default'" :mode="'outlined'" @onClick="closeModal" />
        <button-basic class="button-form-modal" text="네. 불러옵니다" :width="140" :type="'default'" :mode="'contained'"
          @onClick="filled" />
      </div>
    </a-modal>
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

import { Message } from "@/configs/enum";
import mutations from '@/graphql/mutations/AC/AC5/AC520';
import getEmployeePayTable from "@/graphql/queries/AC/AC5/AC520/getEmployeePayTable";
import searchEmployeeOccupations from "@/graphql/queries/AC/AC5/AC520/searchEmployeeOccupations";
import { companyId } from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import notification from "@/utils/notification";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import DxSelectBox from "devextreme-vue/select-box";
import Guid from "devextreme/core/guid";
import DataSource from 'devextreme/data/data_source';
import { RowDraggingReorderEvent, SavingEvent } from "devextreme/ui/data_grid";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from "vuex";
import { calculateEmployeeResult } from "./../utils";

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
const gridRef = ref()
const arrSelectOccupation: any = ref([])
const formRef = ref()
const LaborCostClassificationArray = [{ name: '직접', value: 1 }, { name: '간접', value: 2 }]
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const state = reactive({
  triggerQueryPreIndexBudget: false,
  modalFillDataPreIndex: false
})
const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
const dataBudget = computed(() => store.getters['common/getDataBudget']);
const facilityBizType = computed<number>(() => parseInt(sessionStorage.getItem("facilityBizType") ?? '0'));
const dataOld: any = ref([])
const dataSource = ref(new DataSource({
  store: {
    type: "array",
    key: "key",
    data: [],
  },
}))

// query
const { onResult: onResultEmployeePayTable, onError: onErrorEmployeePayTable, loading: loadingGetEmployeeTable } = useQuery(getEmployeePayTable, {
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
    dataOld.value = cloneDeep(transformData)
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
    arrSelectOccupation.value = data?.searchEmployeeOccupations.map((i: any) => ({ name: i, value: i })) ?? []
  }
})

// get data pre index
const { onResult: onResultEmployeePayTablePreIndex, onError: onErrorEmployeePayTablePreIndex } = useQuery(getEmployeePayTable, {
  companyId,
  facilityBusinessId: globalFacilityBizId.value,
  fiscalYear: dataBudget.value?.index ? acYear.value : acYear.value - 1,
  index: dataBudget.value?.index ? dataBudget.value?.index - 1 : dataBudget.value?.index
}, () => ({
  fetchPolicy: "no-cache",
  enabled: state.triggerQueryPreIndexBudget
}))
onResultEmployeePayTablePreIndex(({ data }) => {
  if (data) {
    const transformData = data?.getEmployeePayTable?.items.map((item: any) => ({ ...item, key: new Guid().toString() }))
    dataSource.value = new DataSource({
      store: {
        type: "array",
        key: "key",
        data: transformData ?? [],
      },
    })
    state.triggerQueryPreIndexBudget = false
    dataAllRow.value = []
  }
})
onErrorEmployeePayTablePreIndex((error) => {
  console.error('getEmployeePayTable', error)
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
  e.cancel = true
  const dataChanges = e.changes.filter((item: any) => item.type !== 'remove')
  // remove all key "key" in dataAllRow
  const inputs = dataAllRow.value.map((item: any) => {
    const {key, ...rest} = item
    if(dataChanges) {
      const dataChange = dataChanges.find((i: any) => i.key === item.key)
      if(dataChange) {
        return {
          ...rest,
          ...dataChange.data
        }
      }
    }
    return rest
  })
  const resultCal = calculateEmployeeResult(inputs)
  const result = {
    companyId,
    facilityBusinessId: globalFacilityBizId.value,
    fiscalYear: acYear.value,
    index: props.index ?? 0,
    totalLaborCost: resultCal.total,
    totalDirectLaborCost: resultCal.total1,
    totalIndirectLaborCost: resultCal.total2,
    accounSubjectOrder: JSON.parse(sessionStorage.getItem("accountSubject") || '')?.[0].theOrder,
    inputs
  }
  console.log('%c retusl', 'color: red;', result);
  mutate(result)
}
const dataAllRow: any = ref([])
const formatSummaryCustom = reactive({
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

watch(() => dataAllRow.value, (val, oldValue) => {
  const result = calculateEmployeeResult(val)
  Object.assign(formatSummaryCustom, result)
  const listCellFooter = document.querySelectorAll('.dx-datagrid-summary-item.dx-datagrid-text-content')
  if (listCellFooter.length > 19) {
    listCellFooter[3].innerHTML = filters.formatNumber(result.salary1) || '0'
    listCellFooter[4].innerHTML = filters.formatNumber(result.salary2) || '0'
    listCellFooter[5].innerHTML = filters.formatNumber(result.salary1 + result.salary2) || '0'
    listCellFooter[6].innerHTML = filters.formatNumber(result.allowance1) || '0'
    listCellFooter[7].innerHTML = filters.formatNumber(result.allowance2) || '0'
    listCellFooter[8].innerHTML = filters.formatNumber(result.allowance1 + result.allowance2) || '0'
    listCellFooter[9].innerHTML = filters.formatNumber(result.dailyAllowance1) || '0'
    listCellFooter[10].innerHTML = filters.formatNumber(result.dailyAllowance2) || '0'
    listCellFooter[11].innerHTML = filters.formatNumber(result.dailyAllowance1 + result.dailyAllowance2) || '0'
    listCellFooter[12].innerHTML = filters.formatNumber(result.retirementReserve1) || '0'
    listCellFooter[13].innerHTML = filters.formatNumber(result.retirementReserve2) || '0'
    listCellFooter[14].innerHTML = filters.formatNumber(result.retirementReserve1 + result.retirementReserve2) || '0'
    listCellFooter[15].innerHTML = filters.formatNumber(result.socialInsuranceLevy1) || '0'
    listCellFooter[16].innerHTML = filters.formatNumber(result.socialInsuranceLevy2) || '0'
    listCellFooter[17].innerHTML = filters.formatNumber(result.socialInsuranceLevy1 + result.socialInsuranceLevy2) || '0'
    listCellFooter[18].innerHTML = filters.formatNumber(result.total1) || '0'
    listCellFooter[19].innerHTML = filters.formatNumber(result.total2) || '0'
    listCellFooter[20].innerHTML = filters.formatNumber(result.total) || '0'
  }
}, { deep: true })

const deleteRow = (e: any) => {
  const key_row = e?.row.key as string
  const rowIndex = e?.row.rowIndex as string
  // if(dataOld.value.length) {
  //   const rowOld = dataOld.value.find((item: any) => item.key === key_row)
  // if(!rowOld) {
  //   dataSource.value.store().remove(key_row).then(() => {
  //     dataSource.value.reload()
  //   })
  // } else {
  e.component.deleteRow(rowIndex)
  // }
  // }
  dataAllRow.value = dataAllRow.value.filter((item: any) => item.key !== key_row)
}

const setModalVisible = () => {
  if (!isEqual(dataAllRow.value, dataOld.value)) {
    comfirmClosePopup(() => {
      emit('closePopup', false)
    }, {
      cancelText: '아니요',
    })
    return
  } else {
    emit('closePopup', false)
  }
}

const onCellPrepared = (e: any) => {
  if (e.rowType === 'data' && e.column.dataField === 'classification' && !e.row?.removed) {
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
  if (e.rowType === 'totalFooter') {
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
}
const onRowPrepared = (e: any) => {
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
function calculateSalary(data: any) {
  const salary = +data.data?.salary || 0;
  const allowance = +data.data?.allowance || 0;
  const dailyAllowance = +data.data?.dailyAllowance || 0;
  const retirementReserve = +data.data?.retirementReserve || 0;
  const socialInsuranceLevy = +data.data?.socialInsuranceLevy || 0;
  return filters.formatNumber(salary + allowance + dailyAllowance + retirementReserve + socialInsuranceLevy);
}
const addRow = () => {
  gridRef.value?.instance.addRow({ name: '1' })
  // dataSource.value?.store().insert({}).then(() => {
  //   dataSource.value?.reload()
  // })
}
const actionSave = () => {
  console.log('%c dataAllRow.length', 'color: red;', dataAllRow.value.length);
  gridRef.value?.instance.saveEditData()
}
const setEditedValue = (valueChangedEventArg: ValueChangedEvent, cellInfo: any) => {
  cellInfo.setValue(valueChangedEventArg.value);
}
const onEnterKey = (valueChangedEventArg: ValueChangedEvent, cellInfo: any) => {
  valueChangedEventArg.element.onkeyup = function (keyEvent: any) {
    if (keyEvent.keyCode === 13) {
      if (keyEvent.target.value && !arrSelectOccupation.value.some((item: any) => item.value === keyEvent.target.value)) {
        arrSelectOccupation.value.push({
          name: keyEvent.target.value,
          value: keyEvent.target.value
        })
        cellInfo.setValue(keyEvent.target.value);
        valueChangedEventArg.component.instance().close()
      }
    }
  }
}

const onReorder = (e: RowDraggingReorderEvent) => {
  // const data = dataSource.value?.items()
  // const dataAll = [...dataAllRow.value]
  // const newTasks = [...data];
  // newTasks.splice(e.fromIndex, 1);
  // newTasks.splice(e.toIndex, 0, e.itemData);
  // dataAll.splice(e.fromIndex, 1);
  // dataAll.splice(e.toIndex, 0, e.itemData);

  // dataAllRow.value = dataAll
  // dataSource.value = new DataSource({
  //   store: {
  //     type: "array",
  //     key: "key",
  //     data: newTasks,
  //   },
  // })
}
const handleFillValuePreIndex = () => {
  state.modalFillDataPreIndex = true
}
const closeModal = () => {
  state.modalFillDataPreIndex = false
}
const filled = () => {
  state.triggerQueryPreIndexBudget = true
  state.modalFillDataPreIndex = false
}
const selectOccupationRef = ref()
const laborCostClassificationArrayRef = ref()
const onFocusInOccupation = () => {
  selectOccupationRef.value.instance.open()
}
const onFocusInLabor = () => {
  laborCostClassificationArrayRef.value.instance.open()
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
}

:deep(.dx-button-content) {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.dx-state-disabled) {
  .dx-button-text {
    opacity: 1 !important;
  }
}
</style>
<style>
.custom-tooltip-header {
  max-width: 320px !important;
  width: 320px !important;
}
</style>
