<template>
  <a-modal v-bind="$props" @cancel="$emit('closePopup', false)" width="90%" footer="">
    <div class="content-grid mt-20">
      <a-spin :spinning="false">
        <DxDataGrid id="data-source" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="id"
                    :allow-column-resizing="true" :column-auto-width="true" ref="tab1Bf520Ref"
                    noDataText="내역이 없습니다" style="height: calc(100vh - 220px)">
          <DxPaging :page-size="1000"/>
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
          <DxExport :enabled="true"/>
          <DxToolbar>
<!--            <DxItem location="after" template="search"/>-->
            <DxItem name="searchPanel" location="after"/>
            <DxItem name="exportButton" css-class="cell-button-export" location="after"/>
          </DxToolbar>
<!--          <template #search>-->
<!--            <div class="d-flex-center gap-10">-->
<!--              <a-form-item label="청구연월 (최대3년)">-->
<!--                <range-month-time-box v-model:valueDate="search.billingYearAndMonth" width="180px"-->
<!--                                      :multi-calendars="true"/>-->
<!--              </a-form-item>-->
<!--              <a-form-item label="서비스명">-->
<!--                <select-box-common v-model:valueInput="search.serviceName" :arrSelect="options"/>-->
<!--              </a-form-item>-->
<!--            </div>-->
<!--          </template>-->
          <DxColumn caption="구연월" data-field="guYeonwol" alignment="center"/>
          <DxColumn caption="구건수" data-field="guGeon" alignment="center"/>
          <DxColumn caption="구금액" data-field="detentionAmount" :format="$filters.formatCurrency" alignment="center"/>
          <DxColumn caption="상입금 건수" data-field="numberOfDeposits" alignment="center"/>
          <DxColumn caption="상입금 금액" data-field="depositAmount" alignment="center"/>
          <DxColumn caption="납입금 건수" data-field="numberOfPayments" alignment="center"/>
          <DxColumn caption="납입금 금액" data-field="amountOfPayment" alignment="center"/>
          <DxColumn caption="체입금 건수" data-field="numberOfDeposit" alignment="center"/>
          <DxColumn caption="연체입금 금액" data-field="overdueDepositAmount" alignment="center"/>
          <DxColumn caption="출금실패 건수" data-field="numberOfFailedWithdrawals" alignment="center"/>
          <DxColumn caption="출금실패 금액" data-field="withdrawalFailedAmount" alignment="center"/>
          <DxColumn caption="미처리 건수" data-field="numberOfUnprocessedCases" alignment="center"/>
          <DxColumn caption="미처리 금액" data-field="outstandingAmount" alignment="center"/>
          <DxColumn caption="출금신청 건수" data-field="numberOfWithdrawalRequests" alignment="center"/>
          <DxColumn caption="출금신청 금액" data-field="withdrawalRequestAmount" alignment="center"/>
          <DxColumn caption="출금보류 건수" data-field="numberOfWithdrawalHolds" alignment="center"/>
          <DxColumn caption="출금보류 금액" data-field="withdrawalPendingAmount" alignment="center"/>
          <DxColumn caption="출금제외 건수" data-field="numberOfWithdrawalExceptions" alignment="center"/>
          <DxColumn caption="출금제외 금액" data-field="amountExcludedFromWithdrawal" alignment="center"/>
        </DxDataGrid>
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
defineProps({
  visible: Boolean,
})
defineEmits(['closePopup'])
import {DxColumn, DxDataGrid, DxExport, DxItem, DxPaging, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";
import {reactive, ref} from "vue";
import {fakeData} from "@/views/BF/BF2/BF254/utils";
import dayjs from "dayjs";

const dataSource = ref(fakeData)
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
  serviceName: 1
})
const options = [
  {value: 1, label: '전체'}
]
</script>

<style scoped>

</style>
