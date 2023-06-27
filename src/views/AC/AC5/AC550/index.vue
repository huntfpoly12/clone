<template>
  <action-header title="통장 관리" :buttonDelete="false"/>
  <div class="ac-550">
    <div class="ac-550-month">
      <span class="ac-550-month-period">기간</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="startMonth.month" :min="minMonth" :max="maxStartMonth"/>
      <ProcessStatus :valueStatus="startMonth.status" disabled/>
      <span class="mr-5 ml-5">~</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="endMonth.month" :max="maxMonth"/>
      <ProcessStatus :valueStatus="endMonth.status" disabled/>
      <a-tooltip color="black" placement="top">
        <template #title>조정마감된 월만 해당 (조정마감이 아닌 월은 제외).</template>
        <img src="@/assets/images/iconInfo.png" class="img-info"/>
      </a-tooltip>
    </div>
    <div class="ac-550-formatting">
      <p class="ac-550-formatting-title">서식설정</p>
      <div class="ac-550-formatting-option">
        <span class="ac-550-formatting-option-label">산출명세:</span>
        <checkbox-basic v-model:valueCheckbox="displayMonthlySummary" class="mr-10" label="월별 합계 금액 및 건수" :size="'20'"/>
        <a-tooltip color="black" placement="top">
          <template #title>산출명세 컬럼에 월별 합계 금액 및 건수가 기재됩니다. 모두 해제시 공란으로 표시됩니다.</template>
          <img src="@/assets/images/iconInfo.png" class="img-info"/>
        </a-tooltip>
      </div>
    </div>
    <div class="ac-550-table">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true" :data-source="dataSource">
        <DxScrolling mode="standard" show-scrollbar="always"/>
        <DxColumn caption="서식" cell-template="accountingReportType"/>
        <template #accountingReportType="{ data }">
          <AccountingReportType v-model:valueSelect="data.data.accountingReportType" :isSelect="false"/>
        </template>
        <DxColumn caption="메일/출력" width="100px" cell-template="action"/>
        <template #action="{}">
          <div class="custom-action" style="text-align: center;">
            <img src="@/assets/images/email.svg" alt="" style="width: 25px; margin-right: 3px; cursor: pointer;"
                 @click="openPopupSendMail"/>
            <a-tooltip>
              <template #title>출력 / 저장</template>
              <img src="@/assets/images/print.svg" alt="" style="width: 25px;cursor: pointer" @click="getUrl"/>
            </a-tooltip>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <PopupSendMail :isModalSendMail="isModalSendMail" :dataPopup="payload" @closePopup="isModalSendMail = false"
                   type="AC550"/>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, watchEffect} from "vue";
import {DxColumn, DxDataGrid, DxScrolling} from "devextreme-vue/data-grid";
import PopupSendMail from '../components/PopupSendMail.vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC550";
import {companyId} from "@/helpers/commonFunction";

const acYear = ref(parseInt(sessionStorage.getItem("acYear") ?? "0"));
const globalFacilityBizId = ref(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));

const triggerAccountingProcesses = ref(true)
const triggerGetCostStatementReportViewUrl = ref(false)
const displayMonthlySummary = ref(false)
const accountingReportType = ref(10)
const startMonth = reactive({
  month: 0,
  status: 1,
  yearMonth: 0
})
const endMonth = reactive({
  month: 0,
  status: 1,
  yearMonth: 0
})


const minMonth = ref(1)
const maxMonth = ref(12)
const maxStartMonth = ref(12)
const listAccountingProcesses: any = ref([])
const dataSource: any = ref([
  {
    accountingReportType: accountingReportType.value
  }
])

let payload: any = ref({
  companyId: companyId,
  fiscalYear: acYear.value,
  facilityBusinessId: globalFacilityBizId.value,
  startYearMonth: null,
  finishYearMonth: null,
  type: accountingReportType.value,
  displayMonthlySummary: displayMonthlySummary.value,
})
const isModalSendMail = ref(false)

// -------------- GRAPHQL --------------
// queries
const {
  onResult: onResAccountingProcesses,
  loading: loadingGetAccountingProcesses,
  // refetch,
  // onError
} = useQuery(
  queries.getAccountingProcesses,
  {
    companyId: companyId,
    fiscalYear: acYear.value,
    facilityBusinessId: globalFacilityBizId.value,
  },
  () => ({
    enabled: triggerAccountingProcesses.value,
    fetchPolicy: "no-cache",
  })
);

onResAccountingProcesses((data: any) => {
  listAccountingProcesses.value = data.data.getAccountingProcesses
  minMonth.value = data.data.getAccountingProcesses[0].month
  maxMonth.value = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1].month
  maxStartMonth.value = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1].month
  startMonth.month = data.data.getAccountingProcesses[0].month
  startMonth.status = data.data.getAccountingProcesses[0].status
  endMonth.month = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1].month
  endMonth.status = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1].status
  triggerAccountingProcesses.value = false
})

const {
  onResult: onResGetCostStatementReportViewUrl,
  loading: loadinggetCostStatementReportViewUrl,
  // refetch,
  onError: onErrorGetCostStatementReportViewUrl,
} = useQuery(
  queries.getCostStatementReportViewUrl, payload.value,
  () => ({
    enabled: triggerGetCostStatementReportViewUrl.value,
    fetchPolicy: "no-cache",
  })
);
onResGetCostStatementReportViewUrl((data: any) => {
  triggerGetCostStatementReportViewUrl.value = false
  window.open(data.data.getCostStatementReportViewUrl, '_blank')
})
onErrorGetCostStatementReportViewUrl((data: any) => {
  triggerGetCostStatementReportViewUrl.value = false
})

////// WATCH
watchEffect(() => {
  if (startMonth.month && endMonth.month) {
    if (startMonth.month > endMonth.month) {
      startMonth.month = endMonth.month
    }
    maxStartMonth.value = endMonth.month
    startMonth.status = listAccountingProcesses.value.find((item: any) => item.month === startMonth.month)?.status || 1
    endMonth.status = listAccountingProcesses.value.find((item: any) => item.month === endMonth.month)?.status || 1
    startMonth.yearMonth = fomatYearMonth(acYear.value, startMonth.month as number)
    endMonth.yearMonth = fomatYearMonth(acYear.value, endMonth.month as number)
  }
})


////// METHOD
const openPopupSendMail = () => {
  updatePayload()
  isModalSendMail.value = true;
}

const getUrl = () => {
  updatePayload()
  triggerGetCostStatementReportViewUrl.value = true
}

const updatePayload = () => {
  payload.value.startYearMonth = startMonth.yearMonth
  payload.value.finishYearMonth = endMonth.yearMonth
  payload.value.type = accountingReportType.value
  payload.value.displayMonthlySummary = displayMonthlySummary.value
}

const fomatYearMonth = (year: number, month: number) => {
  const monthFomat = month < 10 ? '0' + month.toString() : month.toString()
  const yearMonth = year.toString() + monthFomat
  return parseInt(yearMonth)
}

</script>
<style lang="scss" scoped src="./style/style.scss"></style>
