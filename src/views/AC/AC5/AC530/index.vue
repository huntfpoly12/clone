<template>
  <action-header title="통장 관리" :buttonDelete="false" />
  <div class="ac-530">
    <div class="ac-530-month">
      <span class="ac-530-month-period">기간</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="startMonth.month" :min="minMonth" :max="endMonth.month <= maxMonth ? endMonth.month : maxMonth" />
      <ProcessStatus :valueStatus="startMonth.status" disabled/>
      <span class="mr-5 ml-5">~</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="endMonth.month" :min="startMonth.month >= minMonth ? startMonth.month : minMonth" :max="maxMonth"/>
      <ProcessStatus :valueStatus="endMonth.status" disabled/>
      <a-tooltip color="black" placement="top">
        <template #title>조정마감된 월만 해당 (조정마감이 아닌 월은 제외).</template>
        <img src="@/assets/images/iconInfo.png" class="img-info" />
      </a-tooltip>
    </div>
    <div class="ac-530-formatting">
      <p class="ac-530-formatting-title">서식설정</p>
      <div class="ac-530-formatting-option">
        <span class="ac-530-formatting-option-label">보조기관:</span>
        <checkbox-basic v-model:valueCheckbox="displayClient" class="mr-10" label="거래처" :size="'20'" />
        <checkbox-basic v-model:valueCheckbox="displayBankbookSummary" class="mr-20" label="통장적요" :size="'20'" />
        <a-tooltip color="black" placement="top">
          <template #title>보조기간 컬럼에 해당 항목이 있는 경우 기재됩니다. 모두 해제시 공란으로 표시됩니다.</template>
          <img src="@/assets/images/iconInfo.png" class="img-info" />
        </a-tooltip>
      </div>
    </div>
    <div class="ac-530-table">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true" :data-source="dataSource"
        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxColumn caption="서식" cell-template="accountingReportType" />
        <template #accountingReportType="{ data }">
          <AccountingReportType v-model:valueSelect="data.data.accountingReportType" :isSelect="false" />
        </template>
        <DxColumn caption="메일/출력" width="100px" cell-template="action" />
        <template #action="{}">
          <div class="custom-action" style="text-align: center;">
            <img src="@/assets/images/email.svg" alt="" style="width: 25px; margin-right: 3px; cursor: pointer;"
              @click="openPopupSendMail" />
            <a-tooltip>
              <template #title>출력 / 저장</template>
              <img src="@/assets/images/print.svg" alt="" style="width: 25px;cursor: pointer" @click="getUrl" />
            </a-tooltip>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <PopupSendMail :isModalSendMail="isModalSendMail" :dataPopup="payload" @closePopup="isModalSendMail = false" type="AC530"/>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { DxDataGrid, DxColumn, DxScrolling } from "devextreme-vue/data-grid";
import PopupSendMail from '../components/PopupSendMail.vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC530";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
export default defineComponent({
  components: {
    DxDataGrid, DxColumn, DxScrolling, PopupSendMail
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const acYear = ref(parseInt(sessionStorage.getItem("acYear") ?? "0"));
    const globalFacilityBizId = ref(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));

    const triggerAccountingProcesses = ref(true)
    const triggerGetStatementOfGoverbmentSubsidiesReportViewUrl = ref(false)

    const startMonth: any = ref({
      month: null,
      status: null
    })
    const endMonth:any = ref({
      month: null,
      status: null
    })

    const displayClient = ref(false)
    const displayBankbookSummary = ref(true)
    const accountingReportType = ref(8)

    const minMonth = ref(1)
    const maxMonth = ref(12)
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
      displayClient: displayClient.value,
      displayBankbookSummary: displayBankbookSummary.value
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
      console.log('data.data.getAccountingProcesses', data.data.getAccountingProcesses);
      listAccountingProcesses.value = data.data.getAccountingProcesses
      minMonth.value = data.data.getAccountingProcesses[0].month
      maxMonth.value = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1].month
      startMonth.value = data.data.getAccountingProcesses[0],
      endMonth.value = data.data.getAccountingProcesses[data.data.getAccountingProcesses.length - 1]
      triggerAccountingProcesses.value = false
    })

    const {
      onResult: onResgetStatementOfGoverbmentSubsidiesReportViewUrl,
      loading: loadingGetStatementOfGoverbmentSubsidiesReportViewUrl,
      // refetch,
      onError: onErrorgetStatementOfGoverbmentSubsidiesReportViewUrl,
    } = useQuery(
      queries.getStatementOfGoverbmentSubsidiesReportViewUrl, payload.value,
      () => ({
        enabled: triggerGetStatementOfGoverbmentSubsidiesReportViewUrl.value,
        fetchPolicy: "no-cache",
      })
    );
    onResgetStatementOfGoverbmentSubsidiesReportViewUrl((data: any) => {
      console.log('data', data);
      triggerGetStatementOfGoverbmentSubsidiesReportViewUrl.value = false
    })
    onErrorgetStatementOfGoverbmentSubsidiesReportViewUrl((data: any) => {
      triggerGetStatementOfGoverbmentSubsidiesReportViewUrl.value = false
    })
    
    ////// WATCH
    watch(() => [startMonth.value.month, endMonth.value.month], (value) => {
      if(value[0]){
        startMonth.value = listAccountingProcesses.value.find((item: any) => item.month === value[0])
      }
      if(value[1]){ 
        endMonth.value = listAccountingProcesses.value.find((item: any) => item.month === value[1]) 
      }
    })


    ////// METHOD
    const openPopupSendMail = () => {
      updatePayload()
      isModalSendMail.value = true;
    }

    const getUrl = () => {
      updatePayload()
      triggerGetStatementOfGoverbmentSubsidiesReportViewUrl.value = true
    }

    const updatePayload = () => {
      payload.value.startYearMonth = fomatYearMonth(startMonth.value.year, startMonth.value.month),
      payload.value.finishYearMonth = fomatYearMonth(endMonth.value.year, endMonth.value.month),
      payload.value.type = accountingReportType.value,
      payload.value.displayClient = displayClient.value,
      payload.value.displayBankbookSummary = displayBankbookSummary.value
    }
    
    const fomatYearMonth = (year: number, month: number)  => {
      if(!year || !month) return
      const monthFomat = month < 10 ? '0'+month.toString() : month.toString()
      const yearMonth = year.toString() + monthFomat
      return parseInt(yearMonth)
    }

    return {
      move_column,
      colomn_resize,
      dataSource,
      startMonth,
      endMonth,
      displayClient,
      displayBankbookSummary,
      isModalSendMail,
      openPopupSendMail,
      minMonth,
      maxMonth,
      getUrl,
      payload
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
