<template>
  <div class="d-flex-center justify-content-end mb-10">
    <a-form-item label="결제예정일자">
      <date-time-box v-model:valueDate="date"/>
    </a-form-item>
  </div>
  <DxDataGrid
      ref="gridRef"
      :show-row-lines="true"
      :hoverStateEnabled="true"
      :allow-column-resizing="true"
      :show-borders="true"
      :data-source="dataSource"
      key-expr="id"
      :focused-row-enabled="true"
      :focused-row-index="0"
      :focused-row-key="focusedRowKey"
      @focused-row-changing="onFocusedRowChanging"
      @focused-row-changed="onFocusedRowChanged"
      noDataText="내역이 없습니다"
      style="height: 300px">
    <DxPaging :page-size="0"/>
    <!--    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>-->
    <!--    <DxExport :enabled="true"/>-->
    <!--    <DxToolbar>-->
    <!--      <DxItem location="after" template="search-action"/>-->
    <!--      <DxItem name="searchPanel" location="after"/>-->
    <!--      <DxItem name="exportButton" css-class="cell-button-export" location="after"/>-->
    <!--    </DxToolbar>-->
    <template #search-action>

    </template>
    <DxColumn caption="사업자코드" data-field="businessCode" alignment="center"/>
    <DxColumn caption="상호" data-field="mutual" alignment="center"/>
    <DxColumn caption="청구금액 (합계)" data-field="chargesTotal" format="#0,###" alignment="center"/>
    <DxColumn caption="청구금액 (당월)" data-field="billedAmountCurrentMonth" format="#0,###" alignment="center"/>
    <DxColumn caption="연체 (개월)" data-field="overdue" alignment="center"/>
    <DxColumn caption="청구금액 (연체)" data-field="charges" format="#0,###" alignment="center"/>
    <DxColumn caption="선납 (개월)" data-field="advancePayment" alignment="center"/>
    <DxColumn caption="청구금액 (선납)" data-field="billedAmountAdvancePayment" alignment="center"/>
  </DxDataGrid>
  <div class="footer-summary">
    <div>사업자 수
      <span class="footer-summary-total">[{{ dataSource.length }}]</span>
      (당월 <span class="footer-summary-total">[{{ dataSource.length }}]</span>,
      연체 <span class="footer-summary-total">[{{ dataSource.length }}]</span>,
      선납 <span class="footer-summary-total">[{{ dataSource.length }}]</span>)
    </div>
    <div>청구금액 합계<span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
    <div>연체 사업자 수 <span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
    <div>선납 사업자 수<span class="footer-summary-total">[{{ dataSource.length }}]</span></div>
  </div>
  <a-spin :spinning="false">
    <DxDataGrid
        ref="gridRef"
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :allow-column-resizing="true"
        :show-borders="true"
        :data-source="dataSourceDetail"
        key-expr="id"
        noDataText="내역이 없습니다"
        style="height: 200px">
      <DxPaging :page-size="0"/>
      <DxColumn caption="청구연월" data-field="billingYearAndMonth" alignment="center"/>
      <DxColumn caption="청구 등록 구분" data-field="classificationOfClaimRegistration" alignment="center"/>
      <DxColumn caption="서비스명" data-field="serviceName" format="#0,###" alignment="center"/>
      <DxColumn caption="CMS 출금상태" data-field="cmsWithdrawalStatus" alignment="center"/>
      <DxColumn caption="청구금액" data-field="billingAmount" format="#0,###" alignment="center"/>
    </DxDataGrid>
  </a-spin>
</template>

<script setup lang="ts">

import dayjs from "dayjs";
import { ref } from "vue";
import { DxColumn, DxDataGrid, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { FocusedRowChangedEvent } from "devextreme/ui/data_grid";

const data = () => Array.from({ length: 3 }, (v, k) => ({
  id: k + 1,
  businessCode: 'businessCode',
  mutual: 'mutual',
  chargesTotal: 5432543,
  billedAmountCurrentMonth: 5432543,
  overdue: 1,
  charges: 5432543,
  advancePayment: 'advancePayment',
  billedAmountAdvancePayment: 'billedAmountAdvancePayment',
  detail: Array.from({ length: 3 }, (v, kd) => ({
    id: kd + 1,
    billingYearAndMonth: '2023-06',
    classificationOfClaimRegistration: '일괄' + k + 1,
    serviceName: '원천 - 기본 이용료' + k + 1,
    cmsWithdrawalStatus: '미처리',
    billingAmount: Math.random() * 1000000,
  }))
}))
const date = ref<string>(dayjs().format("YYYYMMDD"));
const dataSource = ref(data())
const focusedRowKey = ref<string>('')

const onFocusedRowChanging = (e: any) => {
  // e.cancel = true
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  console.log('%c e.row?.data?.row', 'color: red',e.row?.data)
  focusedRowKey.value = e.row?.key
  dataSourceDetail.value = e.row?.data?.detail
}

// DETAIL
const dataSourceDetail = ref(data())
</script>

<style scoped>
@import "./../../style/style.scss"

</style>
