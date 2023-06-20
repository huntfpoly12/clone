<template>
  <action-header title="4대보험업무관리" :buttonSearch="true" />
  <a-row class="px-10 py-5" style="background: #f1f3f4;">
    <a-col>
      <a-form-item label="회계연월" label-align="left">
        <year-picker-box-custom v-model:valueDate="dataSearch.year" width="65px" class="mr-5" />
      </a-form-item>
      <a-form-item style="padding-left: 70px">
        <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal" v-model:valueRadioCheck="dataSearch.month"
          style="" />
      </a-form-item>
    </a-col>
    <a-col>
      <a-form-item label="마감상태" label-align="left">
        <checkbox-basic label="전체" class="mr-10" v-model:valueCheckbox="statuses.checkbox1" />
      </a-form-item>
      <a-form-item style="padding-left: 70px">
        <div class="checkbox">
          <checkbox-basic label="입력중" class="mr-10 custom-checkbox1" v-model:valueCheckbox="statuses.checkbox1" />
          <checkbox-basic label="입력마감" class="mr-10 custom-checkbox2" v-model:valueCheckbox="statuses.checkbox2" />
          <checkbox-basic label="조정중" class="mr-10 custom-checkbox3" v-model:valueCheckbox="statuses.checkbox3" />
          <checkbox-basic label="조정마감" class="mr-10 custom-checkbox4" v-model:valueCheckbox="statuses.checkbox4" />
        </div>
      </a-form-item>
    </a-col>
    <a-col class="search-company">
      <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
        <list-manager-dropdown v-model:valueInput="dataSearch.manageUserId" width="160px" />
      </a-form-item>
      <a-form-item label="영업자리스트" label-align="left" class="fix-width-label">
        <list-sales-dropdown v-model:valueInput="dataSearch.salesRepresentativeId" width="160px" />
      </a-form-item>
    </a-col>
    <a-col class="search-4">
      <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel" />
    </a-col>
  </a-row>
  <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
    :allow-column-resizing="true" :show-borders="true" keyExpr="id" class="px-10" style="height: calc(100vh - 250px);">
    <DxColumn data-field="code" caption="사업자코드" />
    <DxColumn data-field="name" caption="상호" width="215px"/>
    <DxColumn data-field="address" caption="주소" width="215px"/>
    <DxColumn caption="사업별 마감현황" cell-template="closingStatusByBusiness" width="250px"/>
    <DxColumn data-field="presidentName" caption="대표자" />
    <DxColumn data-field="phone" caption="연락처" />
    <DxColumn data-field="presidentMobilePhone" caption="휴태폰" />
    <DxColumn caption="담당매니저" />
    <DxColumn data-field="manageStartDate" caption="관리시작일" cell-template="productionRequestedAt" alignment="center" width="100px"/>
    <template #closingStatusByBusiness="{data}">
      <div class="d-flex flex-col gap-5">
        <div v-for="(company, index) in data.data.compactAccountingProcesses" class="d-flex-center justify-content-between">
          <div class="truncate" style="width: 100px">{{ company.facilityBusinessName }}</div>
          <AccountingProcessStatusEdit :data="{
            status: company.status,
            index,
            companyId: company.companyId,
            facilityBusinessId: company.facilityBusinessId,
            year: dataSearch.year,
            month: dataSearch.month
          }"/>
        </div>
      </div>
    </template>
    <template #productionRequestedAt="{data}">{{data.data.manageStartDate && $filters.formatDate(data.data.manageStartDate)}}</template>
  </DxDataGrid>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { reactive } from 'vue';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { ref } from 'vue';
import { searchCompanyAccountingDeadlines } from '@/graphql/queries/BF/BF5/BF510';
import { useQuery } from '@vue/apollo-composable';
import DataSource from 'devextreme/data/data_source';
import AccountingProcessStatusEdit from "./components/AccountingProcessStatusEdit.vue";
const checkBoxSearch = [
  { id: 1, text: '1 월' },
  { id: 2, text: '2 월' },
  { id: 3, text: '3 월' },
  { id: 4, text: '4 월' },
  { id: 5, text: '5 월' },
  { id: 6, text: '6 월' },
  { id: 7, text: '7 월' },
  { id: 8, text: '8 월' },
  { id: 9, text: '9 월' },
  { id: 10, text: '10 월' },
  { id: 11, text: '11 월' },
  { id: 12, text: '12 월' },
]
const statuses = reactive({
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  checkbox4: true,
});

const dataSource = ref<DataSource>()

export interface ISearchCompanyAccountingDeadlines {
  fiscalYear: number;
  year: number;
  month: number;
  statuses?: [number];
  manageUserId?: number | null;
  salesRepresentativeId?: number | null;
  excludeCancel: boolean;
}
const dataSearch = reactive<ISearchCompanyAccountingDeadlines>({
  fiscalYear: parseInt(dayjs().format('YYYY')),
  year: parseInt(dayjs().format('YYYY')),
  month: parseInt(dayjs().format('MM')),
  excludeCancel: true,
  salesRepresentativeId: null,
  manageUserId: null
})
const { onResult, onError } = useQuery(searchCompanyAccountingDeadlines, {
  filter: dataSearch
}, () => ({
  fetchPolicy: "no-cache",
}))

onResult((result) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      key: "companyId",
      data: result.data.searchCompanyAccountingDeadlines || [],
    },
  })
})
</script>

<style lang="scss" scoped>
:deep(.dx-widget .dx-collection) {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.checkbox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
