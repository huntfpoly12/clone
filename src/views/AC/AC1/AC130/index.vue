<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-130">
    <div class="ac-130__top">
      <div class="ac-130__top-grid">
        <div v-for="(month, index) in 12" :key="index" class="ac-130__top-grid-items"
          :class="{ 'ac-130__top-grid-items-active': monthSelected === month }" @click="selectedMonth(month)">
          <colorful-badge :value="listAccountingProcesses.find((item: any) => item.month === month)?.status || null"
            :year="acYear" :month="month" />
        </div>
      </div>
      <div class="ac-130__top-status">
        <ProcessAccountingStatus v-if="accountingProcessesSelected?.status || 0"
          :preventChange="isPreventChangeProcessStatus" :status="accountingProcessesSelected?.status || 0"
          @submitChangeStatus="submitChangeStatus" />
        <button-basic v-else mode="contained" style="width: 90px" :disabled="true">
        </button-basic>
        <DxButton icon="plus" class="ac-130__top-status-btnHistory" @click="isModalHistoryAccountingProcessLogs = true">
          <a-tooltip placement="top" color="black">
            <template #title>마감상태 변경이력</template>
            <HistoryOutlined style="font-size: 18px" />
          </a-tooltip>
        </DxButton>
        <div class="ml-10">
          <span style="color: rgb(202, 131, 0);">(주의) 마감변경시 [통장내역] 및 [전표]메뉴에 동일하게 반영됩니다.</span>
        </div>
      </div>
    </div>
    <a-row class="ac-130__main">
      <a-col span="14" class="ac-130__main-content">
        <a-spin :spinning="loadinggetAccountingClosingCheckItems" size="large">
          <div class="ac-130__main-content-check">
            <div class="ac-130__main-content-check-title">
              <b>체크사항</b>
            </div>
            <div ref="refAc130Checklist" class="ac-130__main-content-check-checklist">
              <a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
                <template #expandIcon="{ isActive }">
                  <DoubleRightOutlined :rotate="isActive ? -90 : 90" />
                </template>
                <a-collapse-panel key="1">
                  <template #header>
                    <div class="ac-130__main-content-check-checklist-header">
                      <DxButton v-if="getStatusCashRegisterSummary()" text="정상"
                        style="background-color: #337614; color: white" :height="$config_styles.HeightInput" width="90" />
                      <DxButton v-else text="확인필요" style="background-color: #BB3835; color: white"
                        :height="$config_styles.HeightInput" width="90" />
                      <span class="ac-130__main-content-check-checklist-header-title">현금출납부 잔액</span>
                    </div>
                  </template>
                  <TableCashRegisterSummary ref="refTableCashRegisterSummary" :data="dataSource?.cashRegisterSummary"
                    :year="acYear" :month="monthSelected" />
                </a-collapse-panel>
                <a-collapse-panel key="2">
                  <template #header>
                    <div class="ac-130__main-content-check-checklist-header">
                      <DxButton v-if="getStatusExpenditureBudgetSummary()" text="정상"
                        style="background-color: #337614; color: white" :height="$config_styles.HeightInput" width="90" />
                      <DxButton v-else text="확인필요" style="background-color: #BB3835; color: white"
                        :height="$config_styles.HeightInput" width="90" />
                      <span class="ac-130__main-content-check-checklist-header-title">예산서</span>
                    </div>
                  </template>
                  <TableExpenditureBudgetSummary ref="refTableExpenditureBudgetSummary" :data="{
                    expenditureBudgetSummary: dataSource.expenditureBudgetSummary,
                    revenueBudgetSummary: dataSource.revenueBudgetSummary,
                  }" />
                </a-collapse-panel>
                <a-collapse-panel key="3">
                  <template #header>
                    <div class="ac-130__main-content-check-checklist-header">
                      <DxButton v-if="getStatusRevenueBudgetSummary()" text="정상"
                        style="background-color: #337614; color: white" :height="$config_styles.HeightInput" width="90" />
                      <DxButton v-else text="확인필요" style="background-color: #BB3835; color: white"
                        :height="$config_styles.HeightInput" width="90" />
                      <span class="ac-130__main-content-check-checklist-header-title">인건비</span>
                    </div>
                  </template>
                  <TableRevenueBudgetSummary ref="refTableRevenueBudgetSummary"
                    :data="dataSource.laborCostSubjectSummaries" />
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div>
        </a-spin>
      </a-col>
      <a-col span="10" class="ac-130__main-content">
        <div class="ac-130__main-content-manager">
          <div class="ac-130__main-content-manager-title">
            <b>회계마감 관리사항</b>
            <ReloadOutlined class="ac-130__main-content-manager-title-btnReload" @click="refreshFormChat" />
          </div>
          <div class="ac-130__main-content-manager-chat">
            <FormChat ref="formChat" :payload="payload" :disabled="accountingProcessesSelected?.status === 20" />
          </div>
        </div>
      </a-col>
    </a-row>
    <HistoryPopup :modalStatus="isModalHistoryAccountingProcessLogs"
      @closePopup="isModalHistoryAccountingProcessLogs = false" title="마감상태 변경이력" typeHistory="ac-110-accounting"
      :data="payload" />
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import ProcessAccountingStatus from "./components/ProcessAccountingStatus.vue"
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC130";
import mutations from "@/graphql/mutations/AC/AC1/AC130";
import { companyId } from "@/helpers/commonFunction"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined, DoubleRightOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, contentPopupRetrieveStatements } from "./utils/index"
import TableCashRegisterSummary from "./components/TableCashRegisterSummary.vue"
import TableRevenueBudgetSummary from "./components/TableRevenueBudgetSummary.vue"
import TableExpenditureBudgetSummary from "./components/TableExpenditureBudgetSummary.vue"
import FormChat from "./components/FormChat.vue"
import { Message } from "@/configs/enum"
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs";
import notification from "@/utils/notification";

export default defineComponent({
  components: {
    ProcessAccountingStatus,
    DxItem,
    HistoryOutlined,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    PlusOutlined,
    DoubleRightOutlined,
    DxButton,
    DxToolbar,
    DxExport,
    TableCashRegisterSummary,
    TableRevenueBudgetSummary,
    TableExpenditureBudgetSummary,
    FormChat,
    ReloadOutlined
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const acYear = computed(() => parseInt(sessionStorage.getItem("acYear") ?? "0"))
    const globalFacilityBizId = ref(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"))
    let dataSource = ref<any>({})
    let monthSelected = ref(dayjs().month() + 1)
    let listAccountingProcesses = ref<any[]>([])
    const activeKey = ref<string[]>([])
    const formChat = ref()
    //trigger
    let triggerAccountingProcesses = ref<boolean>(true)
    let triggerAccountingClosingCheckItems = ref<boolean>(true)

    const accountingProcessesSelected: any = computed(() => {
      return listAccountingProcesses.value.find((item: any) => item.month === monthSelected.value) || null
    })

    const isPreventChangeProcessStatus = computed(() => {
      const statusTable1 = getStatusCashRegisterSummary()
      const statusTable2 = getStatusExpenditureBudgetSummary()
      const statusTable3 = getStatusRevenueBudgetSummary()
      return !statusTable1 || !statusTable2 || !statusTable3
    })

    const isModalHistoryAccountingProcessLogs = ref(false)

    const refAc130Checklist = ref()
    const refTableCashRegisterSummary = ref()
    const refTableExpenditureBudgetSummary = ref()
    const refTableRevenueBudgetSummary = ref()

    // onMounted(() => {
    //   setTimeout(() => {
    //     if (refAc130Checklist.value.offsetHeight < refAc130Checklist.value.scrollHeight) {
    //       refTableCashRegisterSummary.value.resetTable()
    //       refTableExpenditureBudgetSummary.value.resetTable()
    //       refTableRevenueBudgetSummary.value.resetTable()
    //     }
    //   }, 1000);
    // })
    // COMPUTED
    /// Graphql 
    /// queries
    //// getAccountingProcesses
    const {
      onResult: onResAccountingProcesses,
      loading: loadingGetAccountingProcesses,
    } = useQuery(queries.getAccountingProcesses, {
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value
    },
      () => ({
        enabled: triggerAccountingProcesses.value,
        fetchPolicy: "no-cache",
      }))
    onResAccountingProcesses((data) => {
      if (!!data.data.getAccountingProcesses && data.data.getAccountingProcesses.length) {
        listAccountingProcesses.value = data.data.getAccountingProcesses
      }
      triggerAccountingProcesses.value = false
    })

    const payload = reactive({
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: acYear.value,
      month: monthSelected.value,
    })
    /// getAccountingClosingCheckItems
    const {
      onResult: onResAccountingClosingCheckItems,
      onError: onErrorAccountingClosingCheckItems,
      loading: loadinggetAccountingClosingCheckItems,
    } = useQuery(queries.getAccountingClosingCheckItems, payload,
      () => ({
        enabled: triggerAccountingClosingCheckItems.value,
        fetchPolicy: "no-cache",
      }))
    onResAccountingClosingCheckItems((data) => {
      dataSource.value = data.data.getAccountingClosingCheckItems
      activeKey.value = ['1', '2', '3']
      triggerAccountingClosingCheckItems.value = false
    })
    onErrorAccountingClosingCheckItems(() => {
      dataSource.value = {}
      activeKey.value = ['1', '2', '3']
      triggerAccountingClosingCheckItems.value = false
    })
    ///// mutations
    const {
      mutate: changeAccountingProcessStatus,
      onDone: doneChangeAccountingProcessStatus,
      onError: errorChangeAccountingProcessStatus,
      loading: loadingChangeAccountingProcessStatus,
    } = useMutation(mutations.changeAccountingProcessStatus);
    doneChangeAccountingProcessStatus((data) => {
      notification("success", Message.getMessage("COMMON", "106").message);
      triggerAccountingProcesses.value = true
    })
    errorChangeAccountingProcessStatus(e => {
      notification("error", e.message);
    })

    // METHODS
    const selectedMonth = (month: number) => {
      if (monthSelected.value === month) return
      monthSelected.value = month
      payload.month = month
      triggerAccountingClosingCheckItems.value = true
    }

    const submitChangeStatus = (value: number) => {
      if (value === 40) {
        if (isPreventChangeProcessStatus.value) {
          notification("error", Message.getMessage("AC130", "001").message);
        } else {
          changeAccountingProcessStatus({
            ...payload,
            status: value
          })
        }
      } else {
        if (accountingProcessesSelected.value?.status === 10 && value === 10) {
          changeAccountingProcessStatus({
            ...payload,
            status: 20
          })
        } else {
          changeAccountingProcessStatus({
            ...payload,
            status: value
          })
        }
      }
    }

    const totalDeposits = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill6;
      });
      return `입금액 합계: ${total}`
    };

    const getStatusCashRegisterSummary = () => {
      if (dataSource.value?.cashRegisterSummary) {
        const cashRegisterSummary = dataSource.value.cashRegisterSummary
        return (cashRegisterSummary.bankbookBalance - (cashRegisterSummary.totalIncome - cashRegisterSummary.totalSpending)) === 0
      } else {
        return false
      }
    }

    const getStatusExpenditureBudgetSummary = () => {
      if (dataSource.value?.expenditureBudgetSummary && dataSource.value?.revenueBudgetSummary) {
        const revenueBudgetSummary = dataSource.value.revenueBudgetSummary
        const expenditureBudgetSummary = dataSource.value.expenditureBudgetSummary
        const revenue = (revenueBudgetSummary.cumulativeTotal / revenueBudgetSummary.amount) * 100
        const annualExpenditure = (expenditureBudgetSummary.cumulativeTotal / expenditureBudgetSummary.amount) * 100
        return revenue === 100 && annualExpenditure === 100
      } else {
        return false
      }
    }

    const getStatusRevenueBudgetSummary = () => {
      if (dataSource.value?.laborCostSubjectSummaries) {
        const laborCostSubjectSummaries = dataSource.value.laborCostSubjectSummaries
        let totalCumulativeTotal = 0
        let totalAmount = 0
        laborCostSubjectSummaries.forEach((items: any) => {
          totalCumulativeTotal += checkNumber(items.cumulativeTotal)
          totalAmount += checkNumber(items.amount)
        })
        const executionRate = (totalCumulativeTotal / totalAmount) * 100
        return executionRate === 100
      } else {
        return false
      }
    }

    const checkNumber = (value: any) => {
      if (Number.isNaN(Number.parseFloat(value)) || value === Infinity) {
        return 0;
      }
      return value
    }

    const refreshFormChat = () => {
      if (formChat.value) {
        formChat.value.refreshForm()
      }
    }

    return {
      activeKey,
      dataSource,
      move_column,
      colomn_resize,
      acYear,
      totalDeposits,
      Message,
      contentPopupRetrieveStatements,
      monthSelected,
      selectedMonth,
      listAccountingProcesses,
      getStatusCashRegisterSummary,
      getStatusExpenditureBudgetSummary,
      getStatusRevenueBudgetSummary,
      loadinggetAccountingClosingCheckItems,
      payload,
      accountingProcessesSelected,
      submitChangeStatus,
      formChat,
      refreshFormChat,
      isPreventChangeProcessStatus,
      isModalHistoryAccountingProcessLogs,
      refAc130Checklist,
      refTableCashRegisterSummary,
      refTableExpenditureBudgetSummary,
      refTableRevenueBudgetSummary,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
