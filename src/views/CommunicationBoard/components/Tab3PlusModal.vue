<template>
  <a-modal
    :visible="modalStatus"
    footer=""
    :mask-closable="false"
    title=""
    centered
    @cancel="setModalVisible" width="1200px">
    <div class="title">알림 대상 선택</div>
    <a-spin :spinning="loading">
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :focused-row-enabled="true"
        :data-source="dataSource"
        :loadPanel="false"
        :allow-column-resizing="true"
        :show-borders="true"
        @focused-row-changed="onFocusedRowChanged"
        keyExpr="code"
        class="px-10"
        noDataText="내역이 없습니다"
        style="height: calc(100vh - 240px)"
      >
        <DxPaging :page-size="0"/>
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
        <DxColumn data-field="code" caption="사업자코드" cell-template="code" width="140px" alignment="center"/>
        <DxColumn data-field="name" caption="상호" alignment="center"/>
        <DxColumn data-field="address" caption="주소" alignment="center"/>
        <DxColumn data-field="presidentName" caption="대표자" alignment="center"/>
        <DxColumn data-field="phone" caption="연락처" alignment="center"/>
        <DxColumn data-field="presidentMobilePhone" caption="휴대폰" alignment="center"/>
        <DxColumn caption="담당매니저" data-field="manageCompactUser.name" alignment="center"/>
        <DxColumn data-field="manageStartDate" caption="관리시작일" data-type="date" format="yyyy-MM-dd" alignment="center"/>
        <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" alignment="center"/>
        <DxColumn data-field="canceledAt" caption="해지일자" data-type="date" format="yyyy-MM-dd" alignment="center"/>
        <DxColumn data-field="unpaidMonths" caption="연체 (개월)" alignment="center"/>

        <template #code="{data}">
          {{ data.data.code }}
          <a-tag v-if="!data.data.active" color="#DC5939">해지</a-tag>
        </template>
      </DxDataGrid>
    </a-spin>
    <div class="text-center mt-20">
      <DxButton type="default" @click="handleSubmit" :disabled="!dataCompanyTab3">알림글 작성</DxButton>
    </div>

  </a-modal>
</template>

<script setup lang="ts">
import {DxColumn, DxDataGrid, DxExport, DxItem, DxPaging, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";
import {inject, reactive, ref} from "vue";
import DxButton from 'devextreme-vue/button';
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF3/BF320";
import {FocusedRowChangedEvent} from "devextreme/ui/data_grid";
import {DataCompanyTab3, OpenRowCompanyTab3, OpenRowKey} from "@/views/CommunicationBoard/type";

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
const dataCompanyTab3 = inject(DataCompanyTab3)
const dataSearch = reactive({
  excludeCancel: true,
  salesRepresentativeId: null,
  manageUserId: null,
  rows: 10000,
  page: 1
})
const dataSource = ref([])
const {refetch: refetchData, onResult, loading, onError} = useQuery(queries.searchCompanies, dataSearch, () => ({
  fetchPolicy: "no-cache",
  enabled: props.modalStatus
}))
onResult((result) => {
  dataSource.value = result.data?.searchCompanies?.datas
})
const handleSubmit = () => {
  emit('closeModal', true)
}
const openRowCompanyTab3 = inject(OpenRowCompanyTab3)

const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  if (e?.row?.data && openRowCompanyTab3) openRowCompanyTab3({
    name: e.row.data.name,
    id: e.row.data.id,
    address: e.row.data.address,
    code: e.row.data.code,
    active: e.row.data.active
  })
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
