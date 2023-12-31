<template>
  <action-header
    title="취득신고등록"
    :buttonDelete="false"
    :buttonSearch="false"
    :buttonPrint="false"
    :buttonSave="false"
  />
  <div id="pa-810" class="px-10 py-10">
    <a-spin :spinning="loading" size="large">
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        :allow-column-reordering="move_column"
        key-expr="companyId"
        :allow-column-resizing="colomn_resize"
        :column-auto-width="true"
        noDataText="내역이 없습니다"
        style="max-height: 770px"
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
          <a-tooltip placement="top" title="신규">
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
          data-field="convertBirthday"
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
          caption="주민등록증"
          data-field="residentId"
          cell-template="residentId"
          width="150"
          alignment="center"
        />
        <template #residentId="{ data }">
          <div>{{ convertResidentId(data.data.residentId) }}</div>
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
        <!-- api not field paymentYear -->
        <!-- <DxColumn caption="FAX상태" data-field="paymentYear" width="70" alignment="center"/> -->
        <DxColumn caption="메모" data-field="memo" alignment="center" />
        <DxColumn
          caption="신고서다운로드"
          cell-template="report"
          width="100"
          alignment="center"
        />
        <template #report="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton
              type="ghost"
              class=""
              style="cursor: pointer"
              @click="onGetAcquistionRp(data.data.workId)"
            >
              <DownloadOutlined :style="{fontSize: 12}" />
            </DxButton>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
        <DxColumn
          caption="첨부파일다운로드"
          data-field="dependentsEvidenceFileStorageId"
          cell-template="dependentsEvidenceFileStorageId"
          width="80"
          alignment="center"
        />
        <template
          #dependentsEvidenceFileStorageId="{ data }"
          class="custom-action"
        >
          <div class="d-flex justify-content-center">
            <DxButton
              v-if="data.data.dependentsEvidenceFileStorageId"
              type="ghost"
              class=""
              style="cursor: pointer"
              @click="onGetFileStorageId(data.data.dependentsEvidenceFile.url)"
            >
              <DownloadOutlined :style="{fontSize: 12}" />
            </DxButton>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
        <DxColumn cell-template="action" width="100" alignment="center" />
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
              <div v-if="data.data.workingStatus === 1 || data.data.workingStatus === 2">
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
      :data="actionParam"
      title="변경이력"
      typeHistory="pa-810"
    />
    <div v-if="isOpenModalCreate">
      <CreatePA810Popup
        :isOpenModalCreate="isOpenModalCreate"
        @closeModal="isOpenModalCreate = false"
        @handleCreate="handleCreate"
        :manageId="manageId"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import mutations from "@/graphql/mutations/PA/PA8/PA810/index";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import {
  companyId,
  convertBirthDayKorea,
  convertResidentId,
} from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import {
  DeleteOutlined,
  DownloadOutlined,
  HistoryOutlined,
} from "@ant-design/icons-vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxToolbar,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/select-box";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import CreatePA810Popup from "./components/CreatePA810Popup.vue";
import { Message } from "@/configs/enum";
import deletePopup from "@/utils/deletePopup";

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0,
}
const store = useStore();
const paYear = computed(
  () => Number(sessionStorage.getItem("paYear")) || dayjs().year()
);
const { move_column, colomn_resize } = store.state.settings;
const actionParam = reactive({
  companyId: companyId,
  imputedYear: paYear.value,
  workId: null as number | null,
});
const manageId = ref();
const param = reactive({ companyId });
const { onResult: getMajorInsuranceResult, onError: getMajorInsuranceError } =
  useQuery(queries.getMajorInsuranceConsignStatus, param, () => ({
    fetchPolicy: "no-cache",
  }));

getMajorInsuranceResult(({ data }) => {
  manageId.value = data.getMajorInsuranceConsignStatus.manageId;
});
getMajorInsuranceError((err) => {
  manageId.value = "";
});

// Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
const dataSource = ref([]);
const employeeAcquisitionsParam = reactive({
  companyId: companyId,
  imputedYear: paYear.value,
});

const { refetch, onResult, loading } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeAcquisitions,
  employeeAcquisitionsParam,
  () => ({
    fetchPolicy: "no-cache",
  })
);

onResult((res) => {
  dataSource.value = res.data.getMajorInsuranceCompanyEmployeeAcquisitions;
});

// watch change year
watchEffect(() => {
  employeeAcquisitionsParam.imputedYear = paYear.value;
});
// -------history------

const modalHistory = ref(false);
const onOpenLogs = (e: any) => {
  modalHistory.value = true;
  actionParam.workId = e;
};

//------get ReportViewUrl ----

const fillRpTrigger = ref<boolean>(false);
const {
  refetch: fillRpRefetch,
  result: fillRpResult,
  onError,
} = useQuery(
  queries.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
  actionParam,
  () => ({
    enabled: fillRpTrigger.value,
    fetchPolicy: "no-cache",
  })
);
watch(fillRpResult, (newVal) => {
  if (newVal) {
    window.open(
      newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl
    );
    fillRpTrigger.value = false;
  }
});
const onGetAcquistionRp = (workId: any) => {
  actionParam.workId = workId;
  fillRpTrigger.value = true;
  fillRpRefetch();
};
const onGetFileStorageId = (url: string) => {
  window.open(url);
};
onError((e) => {
  //notification('error', e.message);
});

//---------Modal create edit----------
const isOpenModalCreate = ref(false);
const openAddNewModal = () => {
  isOpenModalCreate.value = true;
};
const handleCreate = () => {
  refetch();
  isOpenModalCreate.value = false;
};
//------mutation cancel acquistion ----
const {
  mutate: mutateCancelAcquistion,
  onDone: onDoneAcquisitionDone,
  onError: onDoneAcquisitionError,
} = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
onDoneAcquisitionDone(() => {
  notification("success", Message.getMessage("COMMON", "302").message);
  refetch();
});
onDoneAcquisitionError((res) => {
  notification("error", res.message);
});
const handleDelete = (workId: number) => {
  deletePopup({
    callback: () => {
      mutateCancelAcquistion({
        companyId: companyId,
        imputedYear: paYear.value,
        workId: workId,
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
</script>
<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
