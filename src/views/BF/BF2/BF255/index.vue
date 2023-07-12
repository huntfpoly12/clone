<template>
  <action-header buttonSearch />
  <div class="bf-225">
    <div class="bf-225-date">
      <a-form-item label="환급신청일자" class="mr-10">
        <range-date-time-box v-model:valueDate="rangeDate1" width="220px" :multi-calendars="true" :max-select="36" />
      </a-form-item>
      <span class="mr-10">~</span>
      <a-form-item label="환급결제일자">
        <range-date-time-box v-model:valueDate="rangeDate1" width="220px" :multi-calendars="true" :max-select="36" />
      </a-form-item>
    </div>
    <div class="bf-225-table">
      <div class="bf-225-table-WL1">
        <a-spin :spinning="false">
          <DxDataGrid id="bf-225-data-grid-WL1" :show-row-lines="true" :hoverStateEnabled="true"
            :data-source="dataSourceWL1" :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="tab1Bf520Ref" noDataText="내역이 없습니다">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxPaging :page-size="1000" />
            <DxSelection :select-all-mode="'allPages'" :show-check-boxes-mode="'always'" mode="multiple" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
              <DxItem template="button-action" location="after" />
            </DxToolbar>
            <template #button-action>
              <a-tooltip title="환급신청등록">
                <DxButton class="custom-button" type="default" @click="openPopupRegistrationOfRefund">
                  <div class="d-flex-center gap-5">
                    <PlusOutlined />
                    <span>환급신청등록</span>
                  </div>
                </DxButton>
              </a-tooltip>
              <a-tooltip title="선택된 내역 세금계산서 연계 파일 다운로드">
                <DxButton class="ml-4 custom-button" type="default" @click="openPopupTaxInvoiceLinkage">
                  <div class="d-flex-center gap-5">
                    <CheckOutlined />
                    <span>세금계산서연계</span>
                  </div>
                </DxButton>
              </a-tooltip>
            </template>
            <DxColumn caption="사업자코드" data-field="" />
            <DxColumn caption="상호" data-field="" />
            <DxColumn caption="대표자" data-field="" />
            <DxColumn caption="연락처" data-field="" />
            <DxColumn caption="휴대폰" data-field="" />
            <DxColumn caption="담당매니저" data-field="" />
            <DxColumn caption="관리시작일" data-field="" />
            <DxColumn caption="영업자" data-field="" />
          </DxDataGrid>
          <div class="bf-225-table-WL1-sumary">
            <div v-html="`<span style='font-size: 13px !important'>통장내역수:</span> <span style='font-size: 15px !important'>[${dataSourceWL1.length}]</span>`
              "></div>
            <div v-html="sumOfBillsWL1()"></div>
            <div v-html="totalRefundPaymentAmountWL1()"></div>
          </div>
        </a-spin>
      </div>

      <div class="bf-225-table-WL2">
        <a-spin :spinning="false">
          <DxDataGrid id="bf-225-data-grid-WL2" :show-row-lines="true" :hoverStateEnabled="true"
            :data-source="dataSourceWL2" :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="tab1Bf520Ref" noDataText="내역이 없습니다">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxPaging :page-size="1000" />
            <!-- <DxSelection :select-all-mode="'allPages'" :show-check-boxes-mode="'always'" mode="multiple" /> -->
            <!-- <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" /> -->
            <!-- <DxExport :enabled="true" /> -->
            <DxColumn caption="환급상태" data-field="" />
            <DxColumn caption="환급유형" data-field="" />
            <DxColumn caption="환급신청 일자" data-field="" />
            <DxColumn caption="환급신청 금액" data-field="" />
            <DxColumn caption="환급결제금액" data-field="" />
            <DxColumn caption="최종저장일시" data-field="" />
            <DxColumn caption="환급결제정보" cell-template="refund-payment" />
            <template #refund-payment="{ data }">
              <PlusOutlined />
              <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px" />
            </template>
            <DxColumn caption="세금계산서 연계" data-field="" />
            <DxColumn caption="" cell-template="action" />
            <template #action="{ data }">
              <EditOutlined class="mr-10" style="font-size: 18px" />
              <HistoryOutlined style="font-size: 18px" />
            </template>
          </DxDataGrid>
          <div class="bf-225-table-WL2-sumary">
            <div v-html="`<span style='font-size: 13px !important'>통장내역수:</span> <span style='font-size: 15px !important'>[${dataSourceWL1.length}]</span>`
              "></div>
            <div v-html="sumOfBillsWL1()"></div>
            <div v-html="totalRefundPaymentAmountWL1()"></div>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
  <PopupRegistrationOfRefund :isModalRegistrationOfRefund="isModalRegistrationOfRefund" @closePopup="isModalRegistrationOfRefund=false"/>
  <PopupTaxInvoiceLinkage :isModalTaxInvoiceLinkage="isModalTaxInvoiceLinkage" @closePopup="isModalTaxInvoiceLinkage=false"/>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSelection,
  DxPaging,
  DxItem,
  DxSearchPanel,
  DxExport,
  DxToolbar,
} from "devextreme-vue/data-grid";
import {
  CheckOutlined,
  HistoryOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs"
import PopupRegistrationOfRefund from './components/PopupRegistrationOfRefund.vue'
import PopupTaxInvoiceLinkage from './components/PopupTaxInvoiceLinkage.vue'
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxPaging,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxToolbar,
    CheckOutlined,
    HistoryOutlined,
    EditOutlined,
    PlusOutlined,
    DxButton,
    PopupRegistrationOfRefund,
    PopupTaxInvoiceLinkage
  },
  setup(props, { emit }) {
    const store = useStore()
    const { move_column, colomn_resize } = store.state.settings;
    const dataSourceWL1 = ref([])
    const dataSourceWL2 = ref([])
    const rangeDate1 = ref([parseInt(dayjs().startOf('month').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
    const rangeDate2 = ref([parseInt(dayjs().startOf('month').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
    const isModalRegistrationOfRefund = ref(false)
    const isModalTaxInvoiceLinkage = ref(false)

    const openPopupRegistrationOfRefund = () => {
      isModalRegistrationOfRefund.value = true
    }
    const openPopupTaxInvoiceLinkage = () => {
      isModalTaxInvoiceLinkage.value = true
    }
    const sumOfBillsWL1 = () => {
      return `<span style='font-size: 13px !important'>청구금액 합계:</span> <span style='font-size: 15px !important'>[0]</span>`
    }
    const totalRefundPaymentAmountWL1 = () => {
      return `<span style='font-size: 13px !important'>환급결제금액 합계:</span> <span style='font-size: 15px !important'>[0]</span>`
    }
    const sumOfBillsWL2 = () => {
      return `<span style='font-size: 13px !important'>청구금액 합계:</span> <span style='font-size: 15px !important'>[0]</span>`
    }
    const totalRefundPaymentAmountWL2 = () => {
      return `<span style='font-size: 13px !important'>환급결제금액 합계:</span> <span style='font-size: 15px !important'>[0]</span>`
    }
    return {
      dataSourceWL1,
      dataSourceWL2,
      move_column,
      colomn_resize,
      rangeDate1,
      rangeDate2,
      sumOfBillsWL1,
      totalRefundPaymentAmountWL1,
      sumOfBillsWL2,
      totalRefundPaymentAmountWL2,
      isModalRegistrationOfRefund,
      openPopupRegistrationOfRefund,
      isModalTaxInvoiceLinkage,
      openPopupTaxInvoiceLinkage
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
  