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
        <ProcessStatus v-if="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
          :valueStatus="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
          :disabled="true" />
        <button-basic v-else mode="contained" height="30" style="width: 90px" :disabled="true">
        </button-basic>
        <a-tooltip color="black" placement="top">
          <template #title>마감변경시 [통장내역] 및 [전표]메뉴에 동일하게 반영됩니다.</template>
          <img src="@/assets/images/iconInfo.png" class="img-info" />
        </a-tooltip>
      </div>
    </div>
    <a-row class="ac-130__main">
      <a-col span="12" class="ac-130__main-content">
        <div class="ac-130__main-content-check">
          <div class="ac-130__main-content-check-title">
            <b>체크사항</b>
          </div>
          <div class="ac-130__main-content-check-checklist">
            <a-collapse>
              <a-collapse-panel key="1">
                <template #header>
                  <div class="ac-130__main-content-check-checklist-header">
                    <span>현금출납부 잔액 -></span>
                    <DxButton v-if="getStatusCashRegisterSummary()" text="정상" style="background-color: #337614; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                    <DxButton v-else class="mr-5" text="확인필요" style="background-color: #BB3835; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                  </div>
                </template>
                <TableCashRegisterSummary :data="dataSource.cashRegisterSummary" :year="acYear" :month="monthSelected"/>
              </a-collapse-panel>
              <a-collapse-panel key="2">
                <template #header>
                  <div class="ac-130__main-content-check-checklist-header">
                    <span>예산서 -></span>
                    <DxButton v-if="getStatusExpenditureBudgetSummary()" text="정상" style="background-color: #337614; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                    <DxButton v-else class="mr-5" text="확인필요" style="background-color: #BB3835; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                  </div>
                </template>
                <TableExpenditureBudgetSummary :data="dataSource.expenditureBudgetSummary" />
              </a-collapse-panel>
              <a-collapse-panel key="3">
                <template #header>
                  <div class="ac-130__main-content-check-checklist-header">
                    <span>인건비 -></span>
                    <DxButton v-if="false" class="mr-5" text="확인필요" style="background-color: #BB3835; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                    <DxButton v-else text="정상" style="background-color: #337614; color: white"
                      :height="$config_styles.HeightInput" width="90" />
                  </div>
                </template>
                <TableRevenueBudgetSummary :data="dataSource.revenueBudgetSummary" />
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </a-col>
      <a-col span="12" class="ac-130__main-content">
        <div class="ac-130__main-content-manager">
          <div class="ac-130__main-content-manager-title">
            <b>관리사항</b>
          </div>
          <div class="ac-130__main-content-manager-chat">
            <FormNotification keyChatChannel="keyChatChannelCommon">
              <FormChat keyChatChannel="keyChatChannelCommon" />
            </FormNotification>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch } from "vue";
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC130";
import mutations from "@/graphql/mutations/AC/AC1/AC130";
import { companyId } from "@/helpers/commonFunction"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, contentPopupRetrieveStatements } from "./utils/index"
import TableCashRegisterSummary from "./components/TableCashRegisterSummary.vue"
import TableRevenueBudgetSummary from "./components/TableRevenueBudgetSummary.vue"
import TableExpenditureBudgetSummary from "./components/TableExpenditureBudgetSummary.vue"
import FormChat from "./components/FormChat.vue"
import FormNotification from "./components/FormNotification.vue"
import { Message } from "@/configs/enum"
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs";

export default defineComponent({
  components: {
    ProcessStatus,
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
    DxButton,
    DxToolbar,
    DxExport,
    TableCashRegisterSummary,
    TableRevenueBudgetSummary,
    TableExpenditureBudgetSummary,
    FormChat,
    FormNotification
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
      
    //trigger
    let triggerAccountingProcesses = ref<boolean>(true)
    let triggerAccountingClosingCheckItems = ref<boolean>(true)


    // COMPUTED
    /// Graphql 
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

    /// getAccountingClosingCheckItems
    const {
      onResult: onResAccountingClosingCheckItems,
      loading: loadinggetAccountingClosingCheckItems,
    } = useQuery(queries.getAccountingClosingCheckItems, {
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: acYear.value,
      month: monthSelected.value,
    },
      () => ({
        enabled: triggerAccountingClosingCheckItems.value,
        fetchPolicy: "no-cache",
      }))
    onResAccountingClosingCheckItems((data) => {
      dataSource.value = data.data.getAccountingClosingCheckItems
      triggerAccountingClosingCheckItems.value = false
    })

    // METHODS
    const selectedMonth = (month: number) => {
      monthSelected.value = month
    }
    const selectionChanged = () => { }

    const totalDeposits = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill6;
      });
      return `입금액 합계: ${total}`
    };

    const getStatusCashRegisterSummary = () => {
      if(dataSource.value?.cashRegisterSummary){
        const cashRegisterSummary = dataSource.value.cashRegisterSummary
        return (cashRegisterSummary.bankbookBalance - cashRegisterSummary.totalIncome - cashRegisterSummary.totalSpending) === 0
      }else{
        return false
      }
    }

    const getStatusExpenditureBudgetSummary = () => {
      if(dataSource.value?.expenditureBudgetSummary){
        // const expenditureBudgetSummary = dataSource.value.expenditureBudgetSummary
        // return (expenditureBudgetSummary.bankbookBalance - expenditureBudgetSummary.totalIncome - expenditureBudgetSummary.totalSpending) === 0
        return true
      }else{
        return false
      }
    }

    return {
      dataSource,
      move_column,
      colomn_resize,
      acYear,
      selectionChanged,
      totalDeposits,
      Message,
      contentPopupRetrieveStatements,
      monthSelected,
      selectedMonth,
      listAccountingProcesses,
      getStatusCashRegisterSummary,
      getStatusExpenditureBudgetSummary,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
