<template>
  <action-header title="급여변경신고" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-870" class="px-10 py-10">
    <a-spin :spinning="false" size="large">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        :allow-column-reordering="move_column" key-expr="workId" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" style="max-height: 770px" noDataText="내역이 없습니다">
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" placeholder="검색" />
        <DxExport :enabled="true" />
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" css-class="cell-button-export" />
          <DxItem location="after" template="button-template" css-class="cell-button-add" />
        </DxToolbar>

        <DxColumn caption="일련번호" data-field="workId" width="100" alignment="center" />
        <DxColumn caption="상태" data-field="workingStatus" width="100" alignment="center" cell-template="workingStatus" />
        <DxColumn caption="등록일" data-field="registeredAt" :format="dateFormat" alignment="center" />
        <DxColumn caption="접수일" data-field="acceptedAt" :format="dateFormat" alignment="center" />
        <DxColumn caption="완료일" data-field="completedAt" :format="dateFormat" alignment="center" />
        <DxColumn caption="접수번호" data-field="accedpedNumber" alignment="center" />
        <DxColumn caption="메모" data-field="memo" alignment="center" />
        <DxColumn caption="사업장가입신고서다운로드" cell-template="fileStorageId" alignment="center" css-class="label-custom"
          width="180px" />
        <DxColumn caption="" cell-template="action" width="100" />
        <template #button-template>
          <a-tooltip placement="top">
            <template #title>신규</template>
            <div>
              <DxButton icon="plus" @click="modalCreate = true" />
            </div>
          </a-tooltip>
        </template>
        <template #workingStatus="{ data }: any">
          <div>
            {{ MajorInsuranceWorkingStatus[data.data.workingStatus] }}
          </div>
        </template>
        <template #fileStorageId=" { data }: any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton>
          </div>
        </template>
        <template #action=" { data }: any ">
          <div class="custom-action" style="margin-left: 10px;">
            <a-space>
              <DxButton type="ghost" style="cursor: pointer" @click=" onOpenLogs(data.data.workId) ">
                <a-tooltip zIndex="9999999" placement="top" color="black">
                  <template #title>
                    <div>
                      변경이력
                    </div>
                  </template>
                  <HistoryOutlined style="font-size: 16px" />
                </a-tooltip>
              </DxButton>
              <DxButton type="ghost" style="cursor: pointer" @click=" actionDelete(data.data.workId) "
                v-if=" data.data.workingStatus != 0 ">
                <a-tooltip zIndex="9999999" placement="top" color="black">
                  <template #title>
                    <div>
                      취소
                    </div>
                  </template>
                  <DeleteOutlined style="font-size: 16px" />
                </a-tooltip>
              </DxButton>
            </a-space>
          </div>
        </template>
      </DxDataGrid>
    </a-spin>
    <HistoryPopup :modalStatus=" modalHistory " @closePopup=" modalHistory = false " :data=" workIdHistory " title="변경이력"
      typeHistory="pa-810" />
    <CreatePA870Popup v-if=" modalCreate " @closeModal=" onCloseModal " />
    <PopupMessage :modalStatus=" modalDelete " @closePopup=" modalDelete = false " typeModal="confirm"
      :content=" contentDelete.message " :okText=" contentDelete.yes " :cancelText=" contentDelete.no "
      @checkConfirm=" handleDelete " />
  </div>
</template>

<script setup lang="ts">
import { DxColumn, DxDataGrid, DxExport, DxPaging, DxSearchPanel, DxToolbar } from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { DxItem } from 'devextreme-vue/select-box';
import CreatePA870Popup from "./components/CreatePA870Popup.vue";
import dayjs from "dayjs";
import { ref, watch, reactive } from 'vue';
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import queries from '@/graphql/queries/PA/PA8/PA870/index';
import mutations from '@/graphql/mutations/PA/PA8/PA870/index';
import {
  DeleteOutlined, HistoryOutlined, DownloadOutlined,
} from "@ant-design/icons-vue";
import notification from '@/utils/notification';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { Message } from '@/configs/enum';

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0
}
const store = useStore();
const { per_page, move_column, colomn_resize } = store.state.settings;
const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));

//------------------------FUNCTION COMMON --------------------------------

const dateFormat = (value: any) => {
  if (value) {
    return dayjs(value).format('YYYY-MM-DD');
  }
}

//--------------------------DATASOURCE getMajorInsuranceCompanyJoins--------------------------

const dataSource = ref([]);
const companyJoinsParam = reactive({
  companyId: companyId,
  imputedYear: globalYear
})
const { refetch: companyJoinsRefetch, result: companyJoinsResult, onError: companyJoinsError } = useQuery(
  queries.getMajorInsuranceCompanyJoins,
  companyJoinsParam,
  () => ({
    // enabled: companyJoinsTrigger.value,
    fetchPolicy: 'no-cache',
  })
);
watch(companyJoinsResult, (newVal) => {
  if (newVal) {
    dataSource.value = newVal.getMajorInsuranceCompanyJoins;
    // companyJoinsTrigger.value = false;
  }
});
companyJoinsError((res: any) => {
  notification('error', res.message)
})

//---------------------------CREATE------------------

const modalCreate = ref(false);
const onCloseModal = (emitVal: Boolean) => {
  modalCreate.value = false;
  if (emitVal) {
    modalCreate.value = false;
    companyJoinsRefetch();
  }
}

//----------------------------ON DETAIL DATA---------------

// const workId = ref();
// const onDetailData = (val: Number) => {
//   workId.value = val;
//   modalCreate.value = true;
// }

// -----------------------------HISTORY-------------------

const modalHistory = ref(false);
const workIdHistory = ref();
const onOpenLogs = (e: any) => {
  modalHistory.value = true;
  workIdHistory.value = e;
  // actionParam.workId = e;
};

//-------------------------MUTATION DELETE cancelMajorInsuranceCompanyJoin -----------

const contentDelete = Message.getCommonMessage('303');
const deleteMesDone = Message.getCommonMessage('302').message;
const modalDelete = ref(false);
const cancelCompanyJoinParam = reactive({
  companyId: companyId,
  imputedYear: globalYear,
  workId: NaN,
})
const {
  mutate: cancelCompanyJoinMutate,
  onDone: cancelCompanyJoinOnDone,
  onError: cancelCompanyJoinError,
} = useMutation(mutations.cancelMajorInsuranceCompanyJoin);
cancelCompanyJoinOnDone(() => {
  notification('success', deleteMesDone);
  companyJoinsRefetch();
});
cancelCompanyJoinError((res) => {
  notification('error', res.message);
})
const actionDelete = (workId: number) => {
  modalDelete.value = true;
  cancelCompanyJoinParam.workId = workId;
}
const handleDelete = (e: boolean) => {
  if (e) {
    modalDelete.value = false;
    cancelCompanyJoinMutate(cancelCompanyJoinParam);
  }
}

//------get ReportViewUrl ----

const companyJoinViewUrlParam = reactive({
  companyId: companyId,
  imputedYear: globalYear,
  workId: '',
})
const companyJoinViewUrlTrigger = ref<boolean>(false);
const { refetch: companyJoinViewUrlRefetch, result: companyJoinViewUrlResult, onError: companyJoinViewUrlError } = useQuery(
  queries.getMajorInsuranceCompanyJoinFaxFilingReportViewUrl,
  companyJoinViewUrlParam,
  () => ({
    enabled: companyJoinViewUrlTrigger.value,
    fetchPolicy: 'no-cache',
  })
);
companyJoinViewUrlError((res: any) => {
  notification('error', res.message);
})
watch(companyJoinViewUrlResult, (newVal) => {
  if (newVal) {
    window.open(newVal.getMajorInsuranceCompanyJoinFaxFilingReportViewUrl);
    companyJoinViewUrlTrigger.value = false;
  }
});
const onGetAcquistionRp = (workId: any) => {
  companyJoinViewUrlParam.workId = workId;
  companyJoinViewUrlTrigger.value = true;
};
</script>

<style scoped lang="scss">
:deep(.label-custom) {
  .dx-datagrid-text-content {
    white-space: normal !important;
  }
}
</style>
