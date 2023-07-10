<template>
  <a-modal
      :visible="modalStatus"
      footer=""
      :mask-closable="false"
      title=""
      centered
      @cancel="setModalVisible" width="1200px">
    <div class="title">알림 대상 선택</div>
    <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :allow-column-resizing="true"
        :show-borders="true"
        keyExpr="code"
        class="px-10"
        :loadPanel="false"
        noDataText="내역이 없습니다"
        style="height: calc(100vh - 240px)">
      <DxPaging :page-size="0"/>
      <DxSelection select-all-mode="allPages" mode="multiple" />
      <DxExport :enabled="true"/>
      <DxSearchPanel :visible="true" placeholder="검색" :search-visible-columns="['facilityBusinessName']"/>
      <DxToolbar>
        <DxItem location="after" template="search"/>
        <DxItem name="searchPanel"/>
        <DxItem name="exportButton" css-class="cell-button-export"/>
      </DxToolbar>
      <template #search>
        <a-space :size="16">
          <div class="d-flex-center gap-10">
            <a-form-item label="매니저리스트">
              <list-manager-dropdown v-model:valueInput="dataSearch.manageUserId" width="160px"/>
            </a-form-item>
            <a-form-item label="영업자리스트">
              <list-sales-dropdown v-model:valueInput="dataSearch.salesRepresentativeId" width="160px"/>
            </a-form-item>
            <div>
              <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel"
                            width="100px"/>
            </div>
          </div>
        </a-space>
      </template>
      <DxColumn data-field="code" caption="사업자코드"/>
      <DxColumn data-field="name" caption="상호"/>
      <DxColumn data-field="address" caption="주소"/>
      <DxColumn data-field="presidentName" caption="대표자"/>
      <DxColumn data-field="phone" caption="연락처"/>
      <DxColumn data-field="presidentMobilePhone" caption="대표자"/>
      <DxColumn caption="담당매니저" data-field="manageCompactUser.name"/>
      <DxColumn data-field="manageStartDate" caption="관리시작일" alignment/>
      <DxColumn data-field="compactSalesRepresentativeName" caption="영업자"/>
      <DxColumn data-field="canceledAt" caption="해지일자"/>
      <DxColumn data-field="overdue" caption="연체 (개월)"/>
    </DxDataGrid>
    <div class="text-center mt-20">
      <DxButton type="default" @click="handleSubmit">알림글 작성</DxButton>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxItem,
  DxPaging,
  DxSearchPanel,
  DxSelection,
  DxToolbar
} from "devextreme-vue/data-grid";
import { reactive, ref } from "vue";
import DxButton from 'devextreme-vue/button';
import dayjs from "dayjs";

const props = defineProps({
  modalStatus: {
    type: Boolean,
    default: false
  },
  setModalVisible: {
    type: Function,
    default: () => {
    }
  }
})
const emit = defineEmits(['closeModal'])
const dataSearch = reactive({
  excludeCancel: true,
  salesRepresentativeId: null,
  manageUserId: null,
})
const dataSource = ref(Array.from({ length: 30 }, (v, k) => ({
  code: '12345' + k,
  active: true,
  name: `name ${k}`,
  address: `address ${k}`,
  presidentName: `president name ${k}`,
  phone: '012345678',
  presidentMobilePhone: '012345678',
  manageCompactUser: {
    name: `manageCompactUser name ${k}`
  },
  manageStartDate: 'manageStartDate',
  compactSalesRepresentativeName: 'compactSalesRepresentativeName',
  canceledAt: dayjs().format('YYYY-MM-DD'),
  overdue: 'overdue'
})))
const handleSubmit = () => {
  emit('closeModal', true)
}
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
</style>
