<template>
  <action-header buttonSearch buttonDelete buttonPrint @actionSearch="searching"/>
  <div id="bf-252" class="page-content">
    <div class="d-flex-center gap-10">
      <a-form-item label="청구연월">
        <range-month-time-box v-model:valueDate="search.billingYearAndMonth" width="180px"
                              :multi-calendars="true"/>
      </a-form-item>
      <a-form-item label="청구연월">
        <range-date-time-box v-model:valueDate="search.scheduledPaymentDate" width="220px" :multi-calendars="true"/>
      </a-form-item>
      <a-form-item label="청구연월">
        <range-date-time-box v-model:valueDate="search.paymentDate" width="220px" :multi-calendars="true"/>
      </a-form-item>
      <checkbox-basic v-model:valueCheckbox="search.includingBillAmount" label="청구금액 0원 포함"/>
      <a-tooltip title="일괄청구 신규 등록">
        <div>
          <DxButton class=" custom-button" type="default" @click="onOpenPopupEI13">
            <div class="d-flex-center gap-5">
              <PlusOutlined/>
              <span>일괄청구등록</span>
            </div>
          </DxButton>
        </div>
      </a-tooltip>
      <a-tooltip title="개별청구 신규 등록">
        <div>
          <DxButton class="custom-button" type="default" @click="onOpenPopupEB13">
            <div class="d-flex-center gap-5">
              <PlusOutlined/>
              <span>개별청구 신규 등록</span>
            </div>
          </DxButton>
        </div>
      </a-tooltip>
      <a-tooltip title="출금자료 미리보기 및 신규 등록">
        <div>
          <DxButton class="custom-button" type="default" @click="onOpenModalEB13EB14">
            <div class="d-flex-center gap-5">
              <PlusOutlined/>
              <span>출금자료등록</span>
            </div>
          </DxButton>
        </div>
      </a-tooltip>
    </div>
    <div class="content-grid">
      <a-spin :spinning="false">
        <DxDataGrid id="data-source" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="id" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="tab1Bf520Ref"
                    noDataText="내역이 없습니다" style="height: calc(100vh - 220px)">
          <DxScrolling mode="standard" show-scrollbar="always"/>
          <DxPaging :page-size="1000"/>
          <DxSelection :select-all-mode="'allPages'" :show-check-boxes-mode="'always'" mode="multiple"/>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
          <DxExport :enabled="true"/>
          <DxToolbar>
            <DxItem location="after" template="search-action"/>
            <DxItem name="searchPanel" location="after"/>
            <DxItem name="exportButton" css-class="cell-button-export" location="after"/>
          </DxToolbar>
          <template #search-action>

          </template>
          <DxColumn caption="사업자코드" data-field="businessCode" width="70" alignment="center"/>
          <DxColumn caption="상호" data-field="mutual" alignment="center"/>
          <DxColumn caption="주소" data-field="address" width="95px" alignment="center"/>
          <DxColumn caption="청구연월" data-field="billingYearAndMonth" width="110" alignment="center"/>
          <DxColumn caption="청구 등록 구분" data-field="claimRegistration" width="110" alignment="center"/>
          <DxColumn caption="서비스명" data-field="serviceName" width="135" alignment="center"/>
          <DxColumn caption="CMS 출금상태" data-field="cmsWithdrawalStatus" width="118" alignment="center"/>
          <DxColumn caption="청구유형" data-field="claimType" width="118" alignment="center"/>
          <DxColumn caption="청구금액" data-field="billingAmount" format="#0,###" alignment="center"/>
          <DxColumn caption="결제예정일자" data-field="scheduledPaymentDate" alignment="center"/>
          <DxColumn caption="결제일자" data-field="paymentDate" alignment="center"/>
          <DxColumn caption="환급결제금액" data-field="refundPaymentAmount" cell-template="refundPaymentAmount"
                    alignment="center"/>
          <DxColumn caption="환급결제구분" data-field="classificationOfRefundPayment"
                    cell-template="classificationOfRefundPayment" alignment="center"/>
          <DxColumn caption="영업자" data-field="salesperson" alignment="center"/>
          <DxColumn caption="" data-field="" cell-template="action" alignment="center"/>
          <template #action="{ data }">
            <EditOutlined class="mr-10" style="font-size: 18px"/>
            <HistoryOutlined style="font-size: 18px"/>
          </template>
          <template #refundPaymentAmount="{data}">
            <div :class="data.data.refundPaymentAmount > 0 ? 'text-red': ''">{{ data.data.refundPaymentAmount }}</div>
          </template>
          <template #classificationOfRefundPayment="{data}">
            <div class="d-flex-center justify-content-center">
              <div class="tag-1" v-if="data.data.classificationOfRefundPayment === 1">전액</div>
              <div class="tag-2" v-else>일부</div>
            </div>
          </template>
        </DxDataGrid>
        <div class="footer-summary">
          <div>총갯수 <span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
          <div>청구금액 합계 <span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
          <div>환급결제금액 합계 <span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
        </div>
      </a-spin>
    </div>
  </div>
  <DetailComponent :modalStatus="statusModalDetail" @closePopup="statusModalDetail = false"/>
  <HistoryPopup :modalStatus="statusModalHistory" @closePopup="statusModalHistory = false" title="변경이력"
                :idRowEdit="null"
                typeHistory="bf-251-detail" :data="null"/>
  <PopupBatchBillingRegistration
      v-if="isPopup.batchBillingRegistration"
      :visible="isPopup.batchBillingRegistration"
      @close-popup="closePopup"
      @submit="submit"
  />
  <PopupIndividualClaimNewRegistration
      v-if="isPopup.individualClaimNewRegistration"
      :visible="isPopup.individualClaimNewRegistration"
      @close-popup="closePopup"
      @submit="submit"
  />
  <PopupWithdrawalDataRegistration
      v-if="isPopup.withdrawalDataRegistration"
      :visible="isPopup.withdrawalDataRegistration"
      @close-popup="closePopup"
      @submit="submit"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import DetailComponent from "./components/DetailComponent.vue"
import PopupBatchBillingRegistration from "./components/PopupBatchBillingRegistration.vue"
import PopupIndividualClaimNewRegistration from "./components/PopupIndividualClaimNewRegistration.vue"
import PopupWithdrawalDataRegistration from "./components/PopupWithdrawalDataRegistration.vue"
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxItem,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxSelection,
  DxToolbar,
} from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, PlusOutlined, } from "@ant-design/icons-vue";
import dayjs from "dayjs";

const store = useStore();
const { move_column, colomn_resize } = store.state.settings;
const data = [
  {
    id: 1,
    businessCode: 'C22030210',
    mutual: 'mutual',
    address: 'address',
    billingYearAndMonth: '2023-01',
    claimRegistration: 400,
    serviceName: 'serviceName',
    cmsWithdrawalStatus: 'cmsWithdrawalStatus',
    claimType: 'claimType',
    billingAmount: 12312312,
    scheduledPaymentDate: dayjs().format('YYYY-MM-DD'),
    paymentDate: 'paymentDate',
    refundPaymentAmount: 400,
    classificationOfRefundPayment: 1,
    salesperson: 'salesperson',
  },
  {
    id: 2,
    businessCode: 'C22030211',
    mutual: 'mutual',
    address: 'address',
    billingYearAndMonth: '2023-01',
    claimRegistration: 0,
    serviceName: 'serviceName',
    cmsWithdrawalStatus: 'cmsWithdrawalStatus',
    claimType: 'claimType',
    billingAmount: 45234,
    scheduledPaymentDate: dayjs().format('YYYY-MM-DD'),
    paymentDate: 'paymentDate',
    refundPaymentAmount: 0,
    classificationOfRefundPayment: 2,
    salesperson: 'salesperson',
  }]
const dataSource = ref(data);
const statusModalDetail = ref<boolean>(false)
const statusModalHistory = ref<boolean>(false)
const isPopup = reactive({
  batchBillingRegistration: false,
  individualClaimNewRegistration: false,
  withdrawalDataRegistration: false
})
const search = reactive({
  billingYearAndMonth: [
    {
      year: dayjs().year(),
      month: dayjs().subtract(3, "month").month() + 1,
    },
    {
      year: dayjs().year(),
      month: dayjs().month() + 1,
    }
  ],
  scheduledPaymentDate: [
    // get first day of month
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
  paymentDate: [
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
  includingBillAmount: true
})
const onOpenDetail = () => {
  statusModalDetail.value = true
}
const onOpenHistory = () => {
  statusModalHistory.value = true
}
const onOpenPopupEI13 = () => {
  isPopup.batchBillingRegistration = true
}
const onOpenPopupEB13 = () => {
  isPopup.individualClaimNewRegistration = true
}
const onOpenModalEB13EB14 = () => {
  isPopup.withdrawalDataRegistration = true
}
const closePopup = () => {
  isPopup.batchBillingRegistration = false
  isPopup.individualClaimNewRegistration = false
  isPopup.withdrawalDataRegistration = false
}
const submit = () => {
  console.log('submit')
  isPopup.batchBillingRegistration = false
  isPopup.individualClaimNewRegistration = false
  isPopup.withdrawalDataRegistration = false
}
const searching = () => {
  console.log('%c state', 'color: red', search)
}
</script>
<style lang="scss">
@import "./style/style.scss";

.btn-close {
  font-size: 14px;
  border: 1px solid #3333;
  display: block;
  padding: 3px;
  line-height: 4px;
  height: 14px;
  margin-left: 92%;
  margin-bottom: 7px;
  cursor: pointer;
}

</style>
