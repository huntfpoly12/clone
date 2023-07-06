<template>
  <action-header buttonSearch buttonDelete buttonPrint @actionSearch="searching"/>
  <div id="bf-252" class="page-content">
    <div class="d-flex-center">
      <DxField label="청구연월" class="field-custom-auto">
        <range-month-time-box v-model:valueDate="search.billingYearAndMonth" width="180px"
                              :multi-calendars="true"/>
      </DxField>
      <DxField label="청구연월" class="field-custom-auto">
        <range-date-time-box v-model:valueDate="search.scheduledPaymentDate" width="220px" :multi-calendars="true"/>
      </DxField>
      <DxField label="청구연월" class="field-custom-auto">
        <range-date-time-box v-model:valueDate="search.paymentDate" width="220px" :multi-calendars="true"/>
      </DxField>
      <checkbox-basic v-model:valueCheckbox="search.includingBillAmount" label="청구금액 0원 포함"/>
      <a-tooltip title="일괄청구 신규 등록">
        <div>
          <DxButton class="ml-4 custom-button" type="default" @click="onOpenPopupEI13">
            <div class="d-flex-center gap-5">
              <PlusOutlined/>
              <span>일괄청구등록</span>
            </div>
          </DxButton>
        </div>
      </a-tooltip>
      <a-tooltip title="개별청구 신규 등록">
        <div>
          <DxButton class="ml-4 custom-button" type="default" @click="onOpenPopupEB13">
            <div class="d-flex-center gap-5">
              <PlusOutlined/>
              <span>개별청구 신규 등록</span>
            </div>
          </DxButton>
        </div>
      </a-tooltip>
      <a-tooltip title="출금자료 미리보기 및 신규 등록">
        <div>
          <DxButton class="ml-4 custom-button" type="default" @click="onOpenModalEB13EB14">
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
                    noDataText="내역이 없습니다" style="height: calc(100vh - 180px)">
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
          <DxColumn caption="사업자코드" data-field="businessCode" width="70"/>
          <DxColumn caption="상호" data-field="mutual"/>
          <DxColumn caption="주소" data-field="address" width="95px"/>
          <DxColumn caption="청구연월" data-field="billingYearAndMonth" width="110"/>
          <DxColumn caption="청구 등록 구분" data-field="claimRegistration" width="110"/>
          <DxColumn caption="서비스명" data-field="serviceName" width="135"/>
          <DxColumn caption="CMS 출금상태" data-field="cmsWithdrawalStatus" width="118"/>
          <DxColumn caption="청구유형" data-field="claimType" width="118"/>
          <DxColumn caption="청구금액" data-field="billingAmount"/>
          <DxColumn caption="결제예정일자" data-field="scheduledPaymentDate"/>
          <DxColumn caption="결제일자" data-field="paymentDate"/>
          <DxColumn caption="환급결제금액" data-field="refundPaymentAmount"/>
          <DxColumn caption="환급결제구분" data-field="classificationOfRefundPayment"/>
          <DxColumn caption="영업자" data-field="salesperson" cell-template="action"/>
          <DxColumn caption="" data-field="" cell-template="action"/>
          <template #action="{ data }">
            <EditOutlined class="mr-10" style="font-size: 18px"/>
            <HistoryOutlined style="font-size: 18px"/>
          </template>
        </DxDataGrid>
      </a-spin>
    </div>
  </div>
  <DetailComponent :modalStatus="statusModalDetail" @closePopup="statusModalDetail = false"/>
  <HistoryPopup :modalStatus="statusModalHistory" @closePopup="statusModalHistory = false" title="변경이력"
                :idRowEdit="null"
                typeHistory="bf-251-detail" :data="null"/>
  <PopupMessage :modalStatus="statusPopupEI13" @closePopup="statusPopupEI13 = false" :typeModal="'confirm'"
                content="CMS 승인상태가 “접수”인 내역들 대상으로 전자파일 제작 및 다운로드되며, 해당 내역 모두 “승인신청”으로 변경됩니다.그래도 다운로드하시겠습니까?"
                okText="네. 다운로드합니다"
                cancelText="아니오" @checkConfirm="handleConfirmEI13"/>
  <PopupMessage :modalStatus="statusPopupEB13" @closePopup="statusPopupEB13 = false" :typeModal="'confirm'"
                content="CMS 승인상태가 “승인신청”인 내역들 대상으로 전자파일 제작 및 다운로드됩니다. 그래도 다운로드하시겠습니까?" okText="네. 다운로드합니다"
                cancelText="아니오"
                @checkConfirm="handleConfirmEB13"/>
  <ModalEB13EB14 :modalStatus="statusModalEB13EB14" @closePopup="statusModalEB13EB14 = false"/>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import DetailComponent from "./components/DetailComponent.vue"
import ModalEB13EB14 from "./components/ModalEB13EB14.vue"
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
const data = {
  id: 1,
  businessCode: 'businessCode',
  mutual: 'mutual',
  address: 'address',
  billingYearAndMonth: 'billingYearAndMonth',
  claimRegistration: 'claimRegistration',
  serviceName: 'serviceName',
  cmsWithdrawalStatus: 'cmsWithdrawalStatus',
  claimType: 'claimType',
  billingAmount: 'billingAmount',
  scheduledPaymentDate: 'scheduledPaymentDate',
  paymentDate: 'paymentDate',
  refundPaymentAmount: 'refundPaymentAmount',
  classificationOfRefundPayment: 'classificationOfRefundPayment',
  salesperson: 'salesperson',
}
const dataSource = ref([data]);
const statusModalDetail = ref<boolean>(false)
const statusModalHistory = ref<boolean>(false)
const statusPopupEI13 = ref<boolean>(false)
const statusPopupEB13 = ref<boolean>(false)
const statusModalEB13EB14 = ref<boolean>(false)

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
  statusPopupEI13.value = true
}
const onOpenPopupEB13 = () => {
  statusPopupEB13.value = true
}
const onOpenModalEB13EB14 = () => {
  statusModalEB13EB14.value = true
}
const handleConfirmEI13 = () => {

}
const handleConfirmEB13 = () => {

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

.ant-form-item {
  margin-bottom: 0px;
}
</style>
