<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-130">
    <div class="ac-130__top">
      <div class="ac-130__top-grid">
        <div 
          v-for="(month, index) in 12" :key="index" 
          class="ac-130__top-grid-items" 
          :class="{ 'ac-130__top-grid-items-active': monthSelected === month }"
          @click="selectedMonth(month)">
            <colorful-badge 
              :value="listAccountingProcesses.find((item: any) => item.month === month)?.status || null" 
              :year="globalYear" 
              :month="month"/>
        </div>
      </div>
      <div class="ac-130__top-status">
        <ProcessStatus :valueStatus="statusAdjusting" />
        <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
        <span class="style-note style-note-cm121">마감변경시 [통장내역] 및 [전표]메뉴에 동일하게 반영됩니다</span>
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
                    <button-basic v-if="true" class="mr-5" text="확인필요" type="danger" :mode="'contained'" width="90" />
                    <button-basic v-else text="정상" type="success" :mode="'contained'" width="90" />
                  </div>
                </template>
                <TableBalanceOfCashRegister />
              </a-collapse-panel>
              <a-collapse-panel key="2">
                <template #header>
                  <div class="ac-130__main-content-check-checklist-header">
                    <span>예산서 -></span>
                    <button-basic v-if="false" class="mr-5" text="확인필요" type="danger" :mode="'contained'" width="90" />
                    <button-basic v-else text="정상" type="success" :mode="'contained'" width="90" />
                  </div>
                </template>
                <TableBudget />
              </a-collapse-panel>
              <a-collapse-panel key="3">
                <template #header>
                  <div class="ac-130__main-content-check-checklist-header">
                    <span>인건비 -></span>
                    <button-basic v-if="false" class="mr-5" text="확인필요" type="danger" :mode="'contained'" width="90" />
                    <button-basic v-else text="정상" type="success" :mode="'contained'" width="90" />
                  </div>
                </template>
                <TablePersonnelExpenses />
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
            <FormChat />
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
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, contentPopupRetrieveStatements } from "./utils/index"
import TableBalanceOfCashRegister from "./components/TableBalanceOfCashRegister.vue"
import TablePersonnelExpenses from "./components/TablePersonnelExpenses.vue"
import TableBudget from "./components/TableBudget.vue"
import FormChat from "./components/FormChat.vue"
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
    TableBalanceOfCashRegister,
    TablePersonnelExpenses,
    TableBudget,
    FormChat
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let focusedRowKey = ref()
    let dataSource = ref<any[]>([])
    let fileList = ref<any[]>([])
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
    let isModalNoteItemDetail = ref(false);
    let valueAccountSubjectClassification = ref(null)
    let valueFundingSource = ref(null)
    let monthSelected = ref(dayjs().month() + 1)
    let listAccountingProcesses = ref<any[]>([])
    // COMPUTED

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

    const openPopupRegistration = (value: any) => {
      if (value) {
        isModalSlipCancellation.value = true
      } else {
        isModalSlipRegistrantion.value = true
      }
    }
    const handleConfirmChange = () => {
      isModalRetrieveStatements.value = false
    }

    const openPopupRetrieveStatements = (value: any) => {
      isModalRetrieveStatements.value = true
    }

    const openPopupSlipRegistrationSelected = () => {
      isModalSlipRegistrationSelected.value = true
    }


    const openPopupItemDetail = () => {
      isModalItemDetail.value = true
    }

    const openPopupNoteItemDetail = () => {
      isModalNoteItemDetail.value = true
    }

    return {
      statusEntering,
      statusInput,
      statusAdjusting,
      statusAdjusted,
      move_column,
      colomn_resize,
      globalYear,
      focusedRowKey,
      selectionChanged,
      totalDeposits,
      isModalRetrieveStatements,
      Message,
      handleConfirmChange,
      openPopupRegistration,
      openPopupRetrieveStatements,
      contentPopupRetrieveStatements,
      isModalSlipCancellation,
      isModalSlipRegistrantion,
      isModalSlipRegistrationSelected,
      isModalItemDetail,
      openPopupSlipRegistrationSelected,
      openPopupItemDetail,
      openPopupNoteItemDetail,
      isModalNoteItemDetail,
      valueAccountSubjectClassification,
      valueFundingSource,
      fileList,
      monthSelected,
      selectedMonth,
      listAccountingProcesses
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
