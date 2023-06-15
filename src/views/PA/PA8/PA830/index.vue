<template>
  <action-header
    title="급여변경신고"
    :buttonDelete="false"
    :buttonSearch="false"
    :buttonPrint="false"
    :buttonSave="false"
  />
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
        noDataText="내역이 없습니다"
      >
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" placeholder="검색" />
        <DxExport :enabled="true" />
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" css-class="cell-button-export" />
          <DxItem
            location="after"
            template="button-template"
            css-class="cell-button-add"
          />
        </DxToolbar>
        <template #button-template>
          <a-tooltip placement="top">
            <template #title>신규</template>
            <div>
              <DxButton icon="plus" @click="openAddNewModal" />
            </div>
          </a-tooltip>
        </template>
        <DxColumn
          caption="일련번호"
          data-field="workId"
          width="100"
          alignment="center"
        />
        <DxColumn caption="성명" data-field="name" alignment="center" />
        <DxColumn
          caption="생년월일"
          data-field="residentId"
          cell-template="convertBirthday"
          width="100"
          alignment="center"
        />
        <template #convertBirthday="{ data }" class="">
          <div class="d-flex justify-content-center">
            {{ convertBirthDayKorea(data.data.residentId) }}
          </div>
        </template>
        <DxColumn
          caption="상태"
          data-field="workingStatus"
          width="100"
          alignment="center"
          cell-template="workingStatus"
        />
        <template #workingStatus="{ data }">
          <div>
            {{ MajorInsuranceWorkingStatus[data.data.workingStatus] }}
          </div>
        </template>
        <!--        <DxColumn caption="주민등록증" data-field="residentId" width="150" alignment="center"/>-->
        <DxColumn
          caption="등록일"
          data-field="registeredAt"
          width="100"
          :format="dateFormat"
          alignment="center"
        />
        <DxColumn
          caption="접수일"
          data-field="acceptedAt"
          width="100"
          :format="dateFormat"
          alignment="center"
        />
        <DxColumn
          caption="완료일"
          data-field="completedAt"
          width="100"
          :format="dateFormat"
          alignment="center"
        />
        <DxColumn
          caption="접수번호"
          data-field="acceptedNumber"
          width="70"
          alignment="center"
        />
        <DxColumn caption="메모" data-field="memo" alignment="center" />
        <DxColumn
          caption="급여변경신고다운로드"
          data-field="fileStorageId"
          cell-template="viewUrl"
          width="200"
          alignment="center"
        />
        <template #viewUrl="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton
              type="ghost"
              class=""
              style="cursor: pointer"
              @click="handleOpenViewReportUrl(data.data.workId)"
            >
              <DownloadOutlined :style="{fontSize: 12}" />
            </DxButton>
          </div>
        </template>

        <DxColumn cell-template="action" width="150" alignment="center" />
        <template #action="{ data }" class="custom-action">
          <a-space :size="4" align="center" style="width: 70px">
            <a-tooltip placement="top" title="변경이력">
              <div>
                <DxButton
                  type="ghost"
                  style="cursor: pointer"
                  @click="onOpenLogs(data.data.workId)"
                >
                  <HistoryOutlined style="font-size: 16px" />
                </DxButton>
              </div>
            </a-tooltip>
            <a-tooltip placement="top" title="취소">
              <div v-if="data.data.workingStatus !== 0">
                <DxButton type="ghost" @click="handleDelete(data.data.workId)">
                  <DeleteOutlined style="font-size: 16px" />
                </DxButton>
              </div>
            </a-tooltip>
          </a-space>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
      </DxDataGrid>
    </a-spin>
    <HistoryPopup
      :modalStatus="modalHistory"
      @closePopup="modalHistory = false"
      :data="actionParam.workId"
      title="변경이력"
      typeHistory="pa-830"
    />
    <CreatePA830Popup
      v-if="isOpenModalCreate"
      :isOpenModalCreate="isOpenModalCreate"
      @closeModal="isOpenModalCreate = false"
      @createDone="createDone"
    />
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
  DxToolbar,
} from "devextreme-vue/data-grid";
import {
  DeleteOutlined,
  DownloadOutlined,
  HistoryOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/select-box";
import CreatePA830Popup from "./components/CreatePA830Popup.vue";
import dayjs from "dayjs";
import { companyId, convertBirthDayKorea } from "@/helpers/commonFunction";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import deletePopup from "@/utils/deletePopup";
import queries from "@/graphql/queries/PA/PA8/PA830";
import { useMutation, useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import mutations from "@/graphql/mutations/PA/PA8/PA830";
import { Message } from "@/configs/enum";

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0,
}
const data = [
  {
    companyId: 2,
    type: 1,
    imputedYear: 2023,
    workId: 58,
    employeeType: 10,
    employeeId: 99831231,
    name: "ABESHINZO",
    nationalPensionReport: true,
    healthInsuranceReport: true,
    employeementInsuranceReport: true,
    industrialAccidentInsuranceReport: true,
    workingStatus: 1,
    registeredAt: 1679043291582,
    acceptedAt: null,
    completedAt: null,
    acceptedNumber: null,
    memo: null,
    createdAt: 1679043291589,
    createdBy: "C23010402",
    updatedAt: 1679043291589,
    updatedBy: "C23010402",
    ip: "1.54.101.150",
    active: true,
    includeDependents: true,
    fileStorageId: 256,
    residentId: "123123-2132131",
    dependentsEvidenceFile: {
      url: "https://jangbuda-frs.bankda.com/B93xLAjFmhN9lq3JxaA3hyrOjXAoBP.png",
      __typename: "FileStorage",
    },
    __typename: "MajorInsuranceCompanyEmployeeAcquisition",
  },
];
const store = useStore();
const { per_page, move_column, colomn_resize } = store.state.settings;
const paYear = computed(
  () => Number(sessionStorage.getItem("paYear")) || dayjs().year()
);
const dataSource = ref(data);
const isOpenModalCreate = ref(false);
const modalHistory = ref(false);
const triggerReportViewUrl = ref(false);
const actionParam = reactive({
  companyId: companyId,
  imputedYear: paYear.value,
  workId: null as number | null,
});

// Graphql
const paramsQueries = reactive({
  companyId: companyId,
  imputedYear: paYear.value,
});

const { refetch, onResult, loading } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeSalaryChanges,
  paramsQueries,
  () => ({
    fetchPolicy: "no-cache",
  })
);

onResult(({ data }) => {
  dataSource.value = data.getMajorInsuranceCompanyEmployeeSalaryChanges;
});

const { onResult: OnResultReportViewUrl, onError: OnErrorReportViewUrl } =
  useQuery(
    queries.getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl,
    actionParam,
    () => ({
      fetchPolicy: "no-cache",
      enabled: triggerReportViewUrl.value,
    })
  );
OnResultReportViewUrl(({ data }) => {
  window.open(
    data.getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl,
    "_blank"
  );
  triggerReportViewUrl.value = false;
});
OnErrorReportViewUrl((error) => {
  //notification('error', error.message)
  triggerReportViewUrl.value = false;
});

//------mutation cancel acquistion ----
const {
  mutate: mutateCancel,
  onDone: onDoneCancel,
  onError: onErrorCancel,
} = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeSalaryChange);
onDoneCancel(() => {
  notification("success", Message.getCommonMessage("302").message);
  refetch();
});
onErrorCancel((res) => {
  notification("error", res.message);
});
const onOpenLogs = (e: any) => {
  modalHistory.value = true;
  actionParam.workId = e;
};
const handleOpenViewReportUrl = (workId: number) => {
  triggerReportViewUrl.value = true;
  actionParam.workId = workId + 13213;
};
const openAddNewModal = () => {
  isOpenModalCreate.value = true;
};
const handleDelete = (id: number) => {
  deletePopup({
    callback: () => {
      mutateCancel({
        ...actionParam,
        workId: id,
      });
    },
    message: Message.getCommonMessage("303").message,
    cancelText: Message.getCommonMessage("303").no,
    okText: Message.getCommonMessage("303").yes,
  });
};
const dateFormat = (value: any) => {
  if (value) {
    return dayjs(value).format("YYYY-MM-DD");
  }
};
const createDone = () => {
  refetch();
  isOpenModalCreate.value = false;
};
</script>

<style scoped></style>
