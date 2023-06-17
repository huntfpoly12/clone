<template>
  <action-header title="4대보험업무관리" :buttonSearch="true" />
  <a-row gutter="24" class="px-10 py-5" style="background: #f1f3f4;">
    <a-col>
      <a-form-item label="회계연월" label-align="left">
        <year-picker-box-custom v-model:valueDate="dataSearch.paymentYear" width="65px" class="mr-5" />
      </a-form-item>
      <a-form-item style="padding-left: 70px">
        <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal"
          v-model:valueRadioCheck="dataSearch.paymentMonth" style=""/>
      </a-form-item>
    </a-col>
    <a-col>
      <a-form-item label="마감상태" label-align="left">
        <checkbox-basic
          label="전체"
          class="mr-10"
          v-model:valueCheckbox="statuses.checkbox1"
        />
      </a-form-item>
      <a-form-item style="padding-left: 70px">
        <div class="checkbox">
          <checkbox-basic
            label="입력중"
            class="mr-10 custom-checkbox1"
            v-model:valueCheckbox="statuses.checkbox1"
          />
          <checkbox-basic
            label="입력마감"
            class="mr-10 custom-checkbox2"
            v-model:valueCheckbox="statuses.checkbox2"
          />
          <checkbox-basic
            label="조정중"
            class="mr-10 custom-checkbox3"
            v-model:valueCheckbox="statuses.checkbox3"
          />
          <checkbox-basic
            label="조정마감"
            class="mr-10 custom-checkbox4"
            v-model:valueCheckbox="statuses.checkbox4"
          />
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
      <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.active" />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { reactive } from 'vue';

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
const dataSearch = reactive({
  paymentYear: parseInt(dayjs().format('YYYY')),
  paymentMonth: parseInt(dayjs().format('MM')),
  manageUserId: 0,
  salesRepresentativeId: 0,
  active: true
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
