<template>
  <action-header title="급여변경신고" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false"/>
  <div id="pa-830" class="px-10 py-10">
    <a-spin :spinning="false" size="large">
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        :allow-column-reordering="move_column"
        key-expr="workId"
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
        <template #button-template>
          <a-tooltip placement="top">
            <template #title>신규</template>
            <div>
              <DxButton icon="plus" @click="openAddNewModal"/>
            </div>
          </a-tooltip>
        </template>
        <DxColumn caption="일련번호" data-field="workId" width="100" alignment="center"/>
        <DxColumn caption="성명" data-field="name" alignment="center"/>
        <DxColumn caption="생년월일" data-field="birthday" cell-template="convertBirthday" width="100" alignment="center"/>
        <template #convertBirthday="{ data }" class="">
          <div class="d-flex justify-content-center">{{ convertBirthDayKorea(data.data.residentId) }}</div>
        </template>
        <DxColumn caption="상태" data-field="workingStatus" width="100" alignment="center" cell-template="workingStatus"/>
        <template #workingStatus="{ data }">
          <div>
            {{ MajorInsuranceWorkingStatus[data.data.workingStatus] }}
          </div>
        </template>
<!--        <DxColumn caption="주민등록증" data-field="residentId" width="150" alignment="center"/>-->
        <DxColumn caption="등록일" data-field="registeredAt" width="100" :format="dateFormat" alignment="center"/>
        <DxColumn caption="접수일" data-field="acceptedAt" width="100" :format="dateFormat" alignment="center"/>
        <DxColumn caption="완료일" data-field="completedAt" width="100" :format="dateFormat" alignment="center"/>
        <DxColumn caption="접수번호" data-field="accedpedNumber" width="70" alignment="center"/>
<!--         <DxColumn caption="FAX상태" data-field="paymentYear" width="70" alignment="center"/>-->
        <DxColumn caption="메모" data-field="memo" alignment="center"/>
        <DxScrolling column-rendering-mode="virtual"/>
        <DxColumn caption="급여변경신고다운로드" data-field="fileStorageId" cell-template="dependentsEvidenceFileStorageId" width="80" alignment="center"/>
        <template #dependentsEvidenceFileStorageId="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton v-if="data.data.fileStorageId" type="ghost" class="" style="cursor: pointer" @click="onGetFileStorageId(data.data.fileStorageId.url)">
              <DownloadOutlined :size="12"/>
            </DxButton>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
        <DxColumn cell-template="action" width="150" alignment="center"/>
        <template #action="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space>
              <DxButton type="ghost" style="cursor: pointer" @click="onOpenLogs(data.data.workId)" >
                <HistoryOutlined style="font-size: 16px"/>
              </DxButton>
              <DxButton type="ghost" @click="handleDelete(data.data.workId)">
                <DeleteOutlined/>
              </DxButton>
            </a-space>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual"/>
      </DxDataGrid>
    </a-spin>
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="변경이력"
                  typeHistory="pa-810"/>
    <CreatePA830Popup  :isOpenModalCreate="isOpenModalCreate" @closeModal="isOpenModalCreate = false" />
  </div>
</template>

<script setup lang="ts">
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxToolbar
} from 'devextreme-vue/data-grid';
import {DeleteOutlined, DownloadOutlined, HistoryOutlined} from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';
import {DxItem} from 'devextreme-vue/select-box';
import CreatePA830Popup from "./components/CreatePA830Popup.vue";
import dayjs from "dayjs";
import {companyId, convertBirthDayKorea} from "@/helpers/commonFunction";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import deletePopup from "@/utils/deletePopup";

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0
}
const data = [
  {"companyId": 2, "type": 1, "imputedYear": 2023, "workId": 58, "employeeType": 10, "employeeId": 99831231, "name": "ABESHINZO", "nationalPensionReport": true, "healthInsuranceReport": true, "employeementInsuranceReport": true, "industrialAccidentInsuranceReport": true, "workingStatus": 1, "registeredAt": 1679043291582, "acceptedAt": null, "completedAt": null, "accedpedNumber": null, "memo": null, "createdAt": 1679043291589, "createdBy": "C23010402", "updatedAt": 1679043291589, "updatedBy": "C23010402", "ip": "1.54.101.150", "active": true, "includeDependents": true, "fileStorageId": 256, "residentId": "123123-2132131", "dependentsEvidenceFile": {"url": "https://jangbuda-frs.bankda.com/B93xLAjFmhN9lq3JxaA3hyrOjXAoBP.png", "__typename": "FileStorage"}, "__typename": "MajorInsuranceCompanyEmployeeAcquisition"}
]
const store = useStore();
const {per_page, move_column, colomn_resize} = store.state.settings;
const paYear = computed(() => Number(sessionStorage.getItem("paYear")) || dayjs().year())
const dataSource = ref(data)
const isOpenModalCreate = ref(false);
const modalHistory = ref(false);
const actionParam = reactive({
  companyId: companyId,
  imputedYear: paYear.value,
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
const handleDelete = (id: number) => {
  deletePopup({
    callback: () => {
      dataSource.value = dataSource.value.filter((item: any) => item.workId !== id)
    }
  })
}
const dateFormat = (value: any) => {
  if (value) {
    return dayjs(value).format('YYYY-MM-DD');
  }
}
</script>

<style scoped>

</style>
