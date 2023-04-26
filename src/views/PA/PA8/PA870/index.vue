<template>
  <action-header title="급여변경신고" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false"/>
  <div id="pa-870" class="px-10 py-10">
    <a-spin :spinning="false" size="large">
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        :allow-column-reordering="move_column"
        key-expr="id"
        :allow-column-resizing="colomn_resize"
        :column-auto-width="true"
        style="max-height: 770px"
      >
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" placeholder="검색" />
        <DxExport :enabled="true" />
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" css-class="cell-button-export" />
          <DxItem location="after" template="button-template" css-class="cell-button-add"/>
        </DxToolbar>

        <DxColumn caption="일련번호" data-field="id" width="100" alignment="center"/>
        <DxColumn caption="상태" data-field="status" alignment="center"/>
        <DxColumn caption="등록일" data-field="registeredAt" :format="dateFormat" alignment="center"/>
        <DxColumn caption="접수일" data-field="acceptedAt" :format="dateFormat" alignment="center"/>
        <DxColumn caption="완료일" data-field="completedAt" :format="dateFormat" alignment="center"/>
        <DxColumn caption="접수번호" data-field="accedpedNumber" alignment="center"/>
        <DxColumn caption="메모" data-field="memo" alignment="center"/>
        <DxColumn caption="사업장가입신고서다운로드" data-field="fileStorageId" cell-template="fileStorageId" width="80" alignment="center" css-class="label-custom"/>
        <DxColumn caption="" cell-template="action" alignment="center" width="100"/>
        <template #button-template>
          <a-tooltip placement="top">
            <template #title>신규</template>
            <div>
              <DxButton icon="plus" @click="openAddNewModal"/>
            </div>
          </a-tooltip>
        </template>
        <template #workingStatus="{ data }">
          <div>
            {{ MajorInsuranceWorkingStatus[data.data.workingStatus] }}
          </div>
        </template>
        <template #fileStorageId="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton v-if="data.data.fileStorageId" type="ghost" class="" style="cursor: pointer" @click="onGetFileStorageId(data.data.fileStorageId.url)">
              <DownloadOutlined :size="12"/>
            </DxButton>
          </div>
        </template>
       <template #action="{ data }" class="custom-action">
         <div class="custom-action" style="text-align: center">
           <a-space>
             <DxButton type="ghost" style="cursor: pointer" @click="onOpenLogs(data.data.workId)" >
               <EditOutlined style="font-size: 16px"/>
             </DxButton>
             <DxButton type="ghost" style="cursor: pointer" @click="onOpenLogs(data.data.workId)" >
               <DeleteOutlined style="font-size: 16px"/>
             </DxButton>
           </a-space>
         </div>
       </template>
      </DxDataGrid>
    </a-spin>
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="변경이력"
                  typeHistory="pa-810"/>
    <CreatePA840Popup  :isOpenModalCreate="isOpenModalCreate" @closeModal="isOpenModalCreate = false" />
    <!--    <PopupMessage :modalStatus="isDelete"  @closePopup="isDelete = false" typeModal="confirm" :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="handleDelete" />-->
  </div>
</template>

<script setup lang="ts">
import {DxColumn, DxDataGrid, DxExport, DxPaging, DxSearchPanel, DxToolbar} from 'devextreme-vue/data-grid';
import {DownloadOutlined} from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';
import {DxItem} from 'devextreme-vue/select-box';
import CreatePA840Popup from "./components/CreatePA870Popup.vue";
import dayjs from "dayjs";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {companyId} from "@/helpers/commonFunction";
import {
DeleteOutlined,
EditOutlined,
PlusSquareOutlined,
SaveOutlined,
UploadOutlined,
WarningFilled,
ZoomInOutlined,
} from "@ant-design/icons-vue";

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0
}
const dataSource = [
  {"id": 2, "status": 1, "imputedYear": 2023, "workId": 58, "employeeType": 10, "employeeId": 99831231, "name": "ABESHINZO", "nationalPensionReport": true, "healthInsuranceReport": true, "employeementInsuranceReport": true, "industrialAccidentInsuranceReport": true, "workingStatus": 1, "registeredAt": 1679043291582, "acceptedAt": null, "completedAt": null, "accedpedNumber": null, "memo": null, "createdAt": 1679043291589, "createdBy": "C23010402", "updatedAt": 1679043291589, "updatedBy": "C23010402", "ip": "1.54.101.150", "active": true, "includeDependents": true, "fileStorageId": 256, "fileStorageId1": 256, "fileStorageId2": 256,"residentId": "123123-2132131", "dependentsEvidenceFile": {"url": "https://jangbuda-frs.bankda.com/B93xLAjFmhN9lq3JxaA3hyrOjXAoBP.png", "__typename": "FileStorage"}, "__typename": "MajorInsuranceCompanyEmployeeAcquisition"}
]
const store = useStore();
const {per_page, move_column, colomn_resize} = store.state.settings;
const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'))
const isOpenModalCreate = ref(false);
const modalHistory = ref(false);
const actionParam = reactive({
  companyId: companyId,
  imputedYear: globalYear.value,
  workId: null as (number | null),
})
const onOpenLogs = (e: any) => {
  modalHistory.value = true;
  actionParam.workId = e;
};
const onGetFileStorageId = (url: string) => {
  window.open(url);
};
const openAddNewModal = () => {
  isOpenModalCreate.value = true;
};
const dateFormat = (value: any) => {
  if (value) {
    return dayjs(value).format('YYYY-MM-DD');
  }
}
</script>

<style scoped lang="scss">
:deep(.label-custom) {
  .dx-datagrid-text-content {
    white-space: normal !important;
  }
}
</style>
