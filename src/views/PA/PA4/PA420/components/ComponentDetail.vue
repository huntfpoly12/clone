<template>
  <a-col :span="24">
    <div class="header-detail-main">
      <div class="table-detail-left d-flex-center">
        <div class="text-box-1">귀
          {{
            hasDataIncRetirements ? `${dataTableDetail.processKey.imputedYear}-${$filters.formatMonth(dataTableDetail.processKey.imputedMonth)}` : ''
          }}
        </div>
        <div class="text-box-2">지
          {{
            hasDataIncRetirements ? `${dataTableDetail.processKey.paymentYear}-${$filters.formatMonth(dataTableDetail.processKey.paymentMonth)}` : ''
          }}
        </div>
        <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm"
                        :disabled="statusButton !== 10 && statusButton !== 20"/>
      </div>
      <div class="table-detail-right">
        <DxButton @click="deleteItem" :disabled="checkActionValue || !hasDataIncRetirements">
          <DeleteOutlined style="font-size: 18px;"/>
        </DxButton>
        <DxButton icon="plus" @click="addRow" :disabled="checkActionValue || !hasDataIncRetirements"/>
        <DxButton @click="onItemClick('history')" :disabled="statusButton !== 10 && statusButton !== 20 || !hasDataIncRetirements">
          <a-tooltip placement="top">
            <template #title>근로소득자료 변경이력</template>
            <div class="text-center">
              <HistoryOutlined style="font-size: 16px"/>
            </div>
          </a-tooltip>
        </DxButton>
        <DxButton @click="onItemClick('historyEdit')" :disabled="statusButton !== 10 && statusButton !== 20 || !hasDataIncRetirements">
          <a-tooltip placement="left">
            <template #title>근로소득 마감상태 변경이력</template>
            <div class="text-center">
              <img src="@/assets/images/icon_status_history.png" alt=""
                   style="width: 16px; height: 16px;"/>
            </div>
          </a-tooltip>
        </DxButton>
        <DxButton @click="editPaymentDate" class="custom-button-checkbox" :disabled="checkActionValue || !hasDataIncRetirements">
          <div class="d-flex-center">
            <checkbox-basic :valueCheckbox="true" disabled="true"/>
            <span class="fz-12 pl-5">지급일변경</span>
          </div>
        </DxButton>
      </div>
    </div>
  </a-col>
  <a-col :span="24">
    <a-spin :spinning="loadingTableDetail" size="large">
      <DxDataGrid ref="dataGrid" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                  :show-borders="true" key-expr="incomeId" class="mt-10"
                  :allow-column-resizing="colomn_resize" @selection-changed="selectionChanged"
                  noDataText="내역이 없습니다" style="height: calc(100vh - 300px)"
      >
        <DxScrolling mode="standard" show-scrollbar="always"/>
        <DxSelection mode="multiple" :fixed="true"/>
        <DxColumn caption="사원" cell-template="tag" width="200" header-cell-template="title-header-사원"/>
        <template #tag="{ data }">
          <employee-info :idEmployee="data.data.employeeId" :name="data.data.employee.name"
                         :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                         :foreigner="data.data.employee.foreigner" :checkStatus="false"
                         :forDailyUse="data.data.employeeType == 10 ? false : true"/>
        </template>
        <template #title-header-사원="{}">
          <a-tooltip placement="top" class="custom-tooltip">
            <template #title>
              사원과 일용직사원 중 퇴직금 대상자
            </template>
            사원
          </a-tooltip>
        </template>
        <DxColumn caption="구분" cell-template="retirementType" data-type="string"/>
        <template #retirementType="{ data }">
          <div v-if="data.data.retirementType == 1" class="retirementType-1">퇴직</div>
          <div v-if="data.data.retirementType == 2" class="retirementType-2">중간</div>
        </template>
        <DxColumn caption="입사일 (정산시작일)" cell-template="joinedAt"/>
        <template #joinedAt="{ data }">
          <div>{{
              data.data.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate ?
                $filters.formatDate(data.data.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate) : ''
            }}
          </div>
        </template>
        <DxColumn caption="퇴사일 (정산종료일)" cell-template="leavedAt"/>
        <template #leavedAt="{ data }">
          <div>{{
              data.data.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate ?
                $filters.formatDate(data.data.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate) : ''
            }}
          </div>
        </template>
        <DxColumn caption="퇴직급여" data-field="retirementBenefits" data-type="string" format="#,###"
                  width="120px" alignment="right"/>
        <DxColumn width="150px" caption="비과세 퇴직급여" data-field="nonTaxableRetirementBenefits" data-type="string"
                  format="#,###" alignment="right"/>
        <DxColumn caption="과세대상 퇴직급여" width="160px" data-field="taxableRetirementBenefits" data-type="string"
                  format="#,###" alignment="right"/>
        <DxColumn caption="공제" width="100px" cell-template="total-deduction" data-field="totalDeduction"
                  data-type="string" format="#,###" alignment="right"/>
        <template #total-deduction="{ data }">
          <a-tooltip placement="top">
            <template #title>소득세 {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} / 지방 소득세
              {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
            </template>
            <div>{{ $filters.formatCurrency(data.data.totalDeduction) }}</div>
          </a-tooltip>
        </template>
        <DxColumn caption="차인지급액" width="130px" data-field="actualPayment" data-type="string"
                  format="#,###" alignment="right"/>
        <DxColumn caption="비고" cell-template="note" data-type="string" width="250px"/>
        <template #note="{ data }">
          <div>
            <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                                  :typeValue="1"/>
            <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                                  :typeValue="1"/>
            <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                                  :typeValue="1"/>
            <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                                  :ratio="data.data.employee.nationalPensionSupportPercent"/>
            <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent" :typeTag="7"
                                  :ratio="data.data.employee.employeementInsuranceSupportPercent"/>
            <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent" :typeTag="8"
                                  :ratio="data.data.employee.employeementReductionRatePercent"/>
            <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                                  :ratio="data.data.employee.incomeTaxMagnification"/>
          </div>
        </template>
        <DxColumn caption="지급일" data-field="paymentDay" cell-template="payment-day"/>
        <template #payment-day="{ data }">
          {{ data.data.paymentDay < 10 ? "0" + data.data.paymentDay : data.data.paymentDay }}
        </template>
        <DxColumn caption="" cell-template="action" width="50px" fixedPosition="right"/>
        <template #action="{ data }">
          <div class=" text-center">
            <EditOutlined class=""
                          @click="statusButton !=  20 ? actionEditRow(data.data.incomeId) : handleView(data.data.incomeId)"/>
          </div>
        </template>
      </DxDataGrid>
      <div style="border: 1px solid #ddd; border-top: none; width: 100%; display: flex; align-items: center; padding: 5px 20px;">
        <div style="width: 400px; ">
          <span class="dx-datagrid-summary-item " v-html="customTextSummaryInfo()"/>
        </div>
        <div style="width: calc(100% - 400px);">
          <div class="dx-datagrid-summary-item dx-datagrid-text-content d-flex-center" v-html="calculatorSummary()" />
        </div>
      </div>
    </a-spin>
  </a-col>
  <!--============================================= Components ============================================-->
  <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
               :processKey="dataTableDetail.processKey"/>
  <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
                title="변경이력" typeHistory="pa-420"/>
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                :data="dataTableDetail.processKey" title="변경이력" typeHistory="pa-status-420"/>
  <EditPopup :modalStatus="modalEdit" @closePopup="closeChangePaymentDay" :data="dataSelected"
             :processKey="dataTableDetail.processKey"/>
  <AddPopup v-if="modalAdd" :modalStatus="modalAdd" @closePopup="handleClose" :data="popupDataDelete"
            :key="resetFormNum" @createdDone="emit('createdDone')"
            :processKey="dataTableDetail.processKey" :listEmployeeexist="listEmployeeId"/>
  <UpdatePopup v-if="modalUpdate" :modalStatus="modalUpdate" @closePopup="actionClosePopup" :keyRowIndex="keyDetailRow"
               @updateSuccess="actionDeleteSuccess"/>
  <ViewDetail v-if="modalView" :modalStatus="modalView" @closePopup="modalView = false" :keyRowIndex="keyDetailRow"/>
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import {useStore} from 'vuex';
import {useMutation, useQuery} from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import {DxColumn, DxDataGrid, DxScrolling, DxSelection, DxSummary, DxTotalItem} from "devextreme-vue/data-grid";
import {DeleteOutlined, EditOutlined, HistoryOutlined} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import {dataActionUtils} from "../utils/index";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPaymentDayPopup.vue"
import AddPopup from "./AddPopup.vue"
import UpdatePopup from "./UpdatePopup.vue"
import filters from "@/helpers/filters";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import {companyId} from '@/helpers/commonFunction';
import {Message} from '@/configs/enum';
import ViewDetail from "./ViewDetail.vue";
import isEqual from "lodash/isEqual";


const props = defineProps<{ statusButton: number, actionSave: number }>()
const emit = defineEmits(['createdDone'])

const dataGrid = ref();
let statusButton = ref(0)
const dataSourceDetail = ref([]);
const listEmployeeId = ref<any>([]);
const keyDetailRow = ref()
const modalEdit = ref<boolean>(false)
const popupDataDelete: any = ref([])
const dataSelected: any = ref([])
const modalDelete = ref<boolean>(false)
const triggerDetail = ref<boolean>(false);
const store = useStore();
const per_page = computed(() => store.state.settings.per_page);
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const hasDataIncRetirements = computed(() => store.getters['common/hasIncomeProcessRetirements']);
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const rowTable = ref(0);
const modalHistory = ref<boolean>(false)
const modalAdd = ref(false)
const modalUpdate = ref(false)
const modalView = ref(false)
const modalHistoryStatus = ref<boolean>(false)
const resetFormNum = ref(1);
let checkActionValue = ref(props.statusButton != 10) // disabeld button
let dataAction: any = reactive({
  ...dataActionUtils
})
let dataTableDetail = ref({
  companyId: companyId,
  processKey: {...selectMonthColumn.value}
})
const clearSelection = () => {
  const dataGridRef = dataGrid.value?.instance;
  dataGridRef?.clearSelection();
}

// ================GRAPQL==============================================
const {
  refetch: refetchTableDetail,
  loading: loadingTableDetail,
  onError: errorTableDetail,
  onResult: resTableDetail
} = useQuery(queries.getIncomeRetirements, dataTableDetail, () => ({
  enabled: triggerDetail.value,
  fetchPolicy: "no-cache",
}));
resTableDetail(res => {
  dataSourceDetail.value = res.data.getIncomeRetirements
  const listEmployee: any = []
  // create array id already exist
  res.data.getIncomeRetirements.map((item: any) => {
    // The above code is checking if the employeeId is already in the listEmployeeId array. If it is
    // not, then it will push the employeeId into the array.
    if (!listEmployeeId.value.includes(item.employeeId)) {
      listEmployee.push(item.employeeId)
    }
  })
  listEmployeeId.value = listEmployee
  triggerDetail.value = false
})
errorTableDetail(res => {
  dataSourceDetail.value = []
  notification('error', res.message)
})
const {
  mutate,
  onError,
  onDone,
} = useMutation(mutations.changeIncomeProcessRetirementStatus)
onError(e => {
  notification('error', e.message)
})
onDone(e => {
  actionDeleteSuccess()
  notification('success', Message.getCommonMessage('106').message)
})
// ================WATCHING============================================
watch(selectMonthColumn, (newValue, oldValue) => {
  if (!isEqual(newValue, oldValue)) {
    dataTableDetail.value.processKey = newValue
    triggerDetail.value = true
    refetchTableDetail()
  }
}, {deep: true})

watch(() => props.statusButton, (newValue) => {
  statusButton.value = newValue
  checkActionValue.value = !(newValue === 10);
})
// ================FUNCTION============================================
const addRow = () => {
  modalAdd.value = true
}
const changeIncomeTypeCode = (res: string) => {
  dataAction.input.incomeTypeCode = res
}
const selectionChanged = (event: any) => {
  popupDataDelete.value = event.selectedRowKeys
  dataSelected.value = event.selectedRowsData
}
const deleteItem = () => {
  if (popupDataDelete.value.length > 0) {
    modalDelete.value = true;
  } else {
    notification('warning', Message.getMessage('COMMON', '404').message)
  }
};
const actionDeleteSuccess = () => {
  resetFormNum.value++
  modalDelete.value = false
  modalEdit.value = false
  triggerDetail.value = true
  refetchTableDetail()
  emit('createdDone', true)
  modalUpdate.value = false
}

// action modal create
const handleClose = (e: boolean) => {
  if (e) triggerDetail.value = true
  modalAdd.value = false
}
const actionClosePopup = () => {
  modalUpdate.value = false
  store.commit('common/resetForm');

}

const closeChangePaymentDay = (e: boolean) => {
  if (e) {
    refetchTableDetail()
    triggerDetail.value = true
    clearSelection()
  }
  modalEdit.value = false
}

const onItemClick = (key: String) => {
  if (key == 'history') {
    modalHistory.value = true
  } else {
    modalHistoryStatus.value = true
  }
}
const editPaymentDate = () => {
  if (popupDataDelete.value.length > 0) {
    modalEdit.value = true
  } else {
    notification('warning', Message.getMessage('COMMON', '404').message)
  }
}
const calculatorSummary = () => {
  let retirementBenefits = 0;
  let nonTaxableRetirementBenefits = 0;
  let taxableRetirementBenefits = 0;
  let totalDeduction = 0;
  let actualPayment = 0;
  dataSourceDetail.value.forEach((val: any) => {
    retirementBenefits += val.retirementBenefits
    nonTaxableRetirementBenefits += val.nonTaxableRetirementBenefits
    taxableRetirementBenefits += val.taxableRetirementBenefits
    totalDeduction += val.totalDeduction
    actualPayment += val.actualPayment
    return val
  })
  return `
    <div class="ml-20 ">퇴직급여합계: <span style="font-size: 16px">[${filters.formatCurrency(retirementBenefits)}]</span></div>
    <div class="ml-20">비과세퇴직급여합계: <span style="font-size: 16px">[${filters.formatCurrency(nonTaxableRetirementBenefits)}]</span></div>
    <div class="ml-20">과세대상퇴직급여합계: <span style="font-size: 16px">[${filters.formatCurrency(taxableRetirementBenefits)}]</span></div>
    <div class="ml-20">공제합계: <span style="font-size: 16px">[${filters.formatCurrency(totalDeduction)}]</span></div>
    <div class="ml-20">차인지급액합계: <span style="font-size: 16px">[${filters.formatCurrency(actualPayment)}]</span></div>
  `
}
const customTextSummaryInfo = () => {
  let total1 = 0
  let total2 = 0
  dataSourceDetail.value.map((val: any) => {
    if (val.retirementType == 1)
      total1++
    else
      total2++
  })
  return `
    <div>사원수: <span style="font-size: 16px">[${dataSourceDetail.value.length}]</span> (퇴직: <span style="font-size: 16px">[${total1}]</span>, 중간 <span style="font-size: 16px">[${total2}]</span>)</div>
  `
}
const actionEditRow = (data: any) => {
  modalUpdate.value = true
  keyDetailRow.value = data
}
const handleView = (data: any) => {
  modalView.value = true
  keyDetailRow.value = data
}
const statusComfirm = () => {
  mutate({
    companyId: companyId,
    processKey: dataTableDetail.value.processKey,
    status: statusButton.value
  })
}
</script>
<style scoped src="../style/style.scss">

</style>
