<template>
  <action-header title="급여변경신고" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-840" class="px-10 py-10">
    <a-spin :spinning="loading1 || loading2" size="large">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        :allow-column-reordering="move_column" key-expr="companyId" :allow-column-resizing="colomn_resize"
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
        <DxColumn caption="성명" data-field="name" alignment="center" />
        <DxColumn caption="생년월일" cell-template="convertBirthday" width="100" alignment="center" />
        <DxColumn caption="신고구분" data-field="type" width="100" alignment="center" cell-template="type" />
        <DxColumn caption="상태" data-field="workingStatus" width="100" alignment="center" cell-template="workingStatus" />
        <!--        <DxColumn caption="주민등록증" data-field="residentId" width="150" alignment="center"/>-->
        <DxColumn caption="등록일" data-field="registeredAt" width="100" :format="dateFormat" alignment="center" />
        <DxColumn caption="접수일" data-field="acceptedAt" width="100" :format="dateFormat" alignment="center" />
        <DxColumn caption="완료일" data-field="completedAt" width="100" :format="dateFormat" alignment="center" />
        <DxColumn caption="접수번호" data-field="acceptedNumber" width="70" alignment="center" />
        <!--        <DxColumn caption="FAX상태" data-field="paymentYear" width="70" alignment="center"/>-->
        <DxColumn caption="메모" data-field="memo" alignment="center" />
        <!--        <DxScrolling column-rendering-mode="virtual"/>-->
        <DxColumn caption="휴복직신고서다운로드" cell-template="fileStorageId" alignment="center" />
        <DxColumn caption="" cell-template="action" width="100px"/>

        <template #button-template>
          <a-tooltip placement="top">
            <template #title>신규</template>
            <div>
              <DxButton icon="plus" @click="modalCreate = true" />
            </div>
          </a-tooltip>
        </template>
        <template #convertBirthday="{ data }: any" class="">
          <div class="d-flex justify-content-center">{{ convertBirthDayKorea(data.data.residentId) }}</div>
        </template>
        <template #type=" { data }: any ">
          <div>
            {{ dataSourceType[data.data?.type] }}
            <!-- {{ data.data.type }} -->
          </div>
        </template>
        <template #workingStatus=" { data }: any ">
          <div>
            {{ MajorInsuranceWorkingStatus[data.data.workingStatus] }}
          </div>
        </template>
        <template #fileStorageId=" { data }: any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer"
              @click=" onGetFileStorageId(data.data.type, data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton>
          </div>
        </template>
        <template #action=" { data }: any " class="custom-action">
          <div class="custom-action" style="margin-left: 5px;">
            <a-space>
              <DxButton type="ghost" style="cursor: pointer" @click=" onOpenLogs(data.data.type, data.data.workId) ">
                <a-tooltip zIndex="9999999" placement="top" color="black">
                  <template #title>
                    <div>
                      변경이력
                    </div>
                  </template>
                  <HistoryOutlined style="font-size: 16px" />
                </a-tooltip>
              </DxButton>
              <DxButton type="ghost" style="cursor: pointer" @click=" actionDelete(data.data.type, data.data.workId) "
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
        <DxScrolling column-rendering-mode="virtual" />
        <!--        <DxScrolling column-rendering-mode="virtual"/>-->
      </DxDataGrid>
    </a-spin>

    <PopupMessage :modalStatus=" modalDelete " @closePopup=" modalDelete = false " typeModal="confirm"
      :content=" contentDelete.message " :okText=" contentDelete.yes " :cancelText=" contentDelete.no "
      @checkConfirm=" handleDelete " />
    <HistoryPopup :modalStatus=" modalHistory " @closePopup=" modalHistory = false " :data=" workIdHistory " title="변경이력"
      :typeHistory=" typeHistory " />
    <CreatePA840Popup v-if=" modalCreate " @closeModal=" onCloseModal " />
    <!--    <PopupMessage :modalStatus="isDelete"  @closePopup="isDelete = false" typeModal="confirm" :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="handleDelete" />-->
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
import { DeleteOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';
import { DxItem } from 'devextreme-vue/select-box';
import CreatePA840Popup from "./components/CreatePA840Popup.vue";

import dayjs from "dayjs";
import { companyId, convertBirthDayKorea } from "../../../../helpers/commonFunction";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Message } from '@/configs/enum';
import { useMutation, useQuery } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA8/PA840/index';
import queries from '@/graphql/queries/PA/PA8/PA840/index';
import notification from '@/utils/notification';
import { watch } from 'vue';

enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0
}
enum dataSourceType {
  휴직 = 4,
  복직 = 5,
}
const store = useStore();
const { per_page, move_column, colomn_resize } = store.state.settings;
const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
const dataType = ref(4);
const dataSourceCount = ref(0);
const dataSource = ref([]);

//------------------------FUNCTION COMMON --------------------------------

const dateFormat = (value: any) => {
  if (value) {
    return dayjs(value).format('YYYY-MM-DD');
  }
}

//--------------------------DATASOURCE--------------------------

//--dataType == 4--
const dataSourceType1 = ref([]);
const companyEmployeeLeaveOfAbsencesParam = reactive({
  companyId: companyId,
  imputedYear: globalYear
})
const { refetch: companyEmployeeLeaveOfAbsencesRefetch, result: companyEmployeeLeaveOfAbsencesResult, onError: companyEmployeeLeaveOfAbsencesError, loading: loading1 } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeLeaveOfAbsences,
  companyEmployeeLeaveOfAbsencesParam,
  () => ({
    fetchPolicy: 'no-cache',
  })
);
watch(companyEmployeeLeaveOfAbsencesResult, (newVal) => {
  dataSourceType1.value = newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsences;
  if (dataSourceCount.value == 0) {
    dataSource.value = newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsences;
  }
  dataSourceCount.value++;
});
companyEmployeeLeaveOfAbsencesError((res: any) => {
  notification('error', res.message)
})
//--dataType == 5--
const dataSourceType2 = ref([]);
const companyEmployeeReturnToWorksParam = reactive({
  companyId: companyId,
  imputedYear: globalYear
})
const { refetch: companyEmployeeReturnToWorksRefetch, result: companyEmployeeReturnToWorksResult, onError: companyEmployeeReturnToWorksError, loading: loading2 } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeReturnToWorks,
  companyEmployeeReturnToWorksParam,
  () => ({
    // enabled: companyEmployeeReturnToWorksTrigger.value,
    fetchPolicy: 'no-cache',
  })
);
watch(companyEmployeeReturnToWorksResult, (newVal) => {
  dataSourceType2.value = newVal.getMajorInsuranceCompanyEmployeeReturnToWorks;
  // companyEmployeeReturnToWorksTrigger.value = false;
});
companyEmployeeReturnToWorksError((res: any) => {
  notification('error', res.message)
})

watch([dataSourceType1, dataSourceType2], ([newVal1, newVal2]: any) => {
  dataSource.value = dataSourceType2.value.concat(dataSourceType1.value);
})

//---------------------------ADD FORM------------------

const modalCreate = ref(false);
const onCloseModal = (emitVal: Boolean) => {
  modalCreate.value = false;
  if (emitVal) {
    companyEmployeeLeaveOfAbsencesRefetch();
  }
  if (emitVal) {
    companyEmployeeReturnToWorksRefetch();
  }
}

// -----------------------------HISTORY-------------------

const modalHistory = ref(false);
const workIdHistory = ref();
const typeHistory = ref('pa-840-1');
const onOpenLogs = (type: number, e: any) => {
  workIdHistory.value = e;
  if (type === 4) {
    modalHistory.value = true;
    typeHistory.value = 'pa-840-1';
  }
  if (type === 5) {
    modalHistory.value = true;
    typeHistory.value = 'pa-840-2';
  }
};

//-------------------------MUTATION DELETE cancelMajorInsuranceCompanyOut -----------

const contentDelete = Message.getCommonMessage('303');
const deleteMesDone = Message.getCommonMessage('302').message;
const modalDelete = ref(false);
const cancelCompanyParam = reactive({
  companyId: companyId,
  imputedYear: globalYear,
  workId: NaN,
})
//--dataType == 4--
const {
  mutate: cancelLeaveOfAbsenceMutate,
  onDone: cancelLeaveOfAbsenceOnDone,
  onError: cancelLeaveOfAbsenceError,
} = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence);
cancelLeaveOfAbsenceOnDone(() => {
  notification('success', deleteMesDone);
  companyEmployeeLeaveOfAbsencesRefetch();
});
cancelLeaveOfAbsenceError((res) => {
  notification('error', res.message);
})
//--dataType == 5--
const {
  mutate: cancelReturnToWorkMutate,
  onDone: cancelReturnToWorkOnDone,
  onError: cancelReturnToWorkError,
} = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeReturnToWork);
cancelReturnToWorkOnDone(() => {
  notification('success', Message.getMessage('COMMON', '402').message);
  companyEmployeeLeaveOfAbsencesRefetch();
});
cancelReturnToWorkError((res) => {
  notification('error', res.message);
})
const actionDelete = (type: number, workId: number) => {
  modalDelete.value = true;
  cancelCompanyParam.workId = workId;
  if (type === 4) {
    dataType.value == type;
  }
  if (type === 5) {
    dataType.value == type;
  }
}
const handleDelete = (e: boolean) => {
  modalDelete.value = false;
  if (e && dataType.value == 4) {
    cancelLeaveOfAbsenceMutate(cancelCompanyParam);
  }
  if (e && dataType.value == 5) {
    cancelReturnToWorkMutate(cancelCompanyParam);
  }
}

//--------------------------get ReportViewUrl ---------------------

const viewUrlParam = reactive({
  companyId: companyId,
  imputedYear: globalYear,
  workId: '',
})
//--dataType == 4--
const leaveOfAbsenceViewUrlTrigger = ref<boolean>(false);
const { result: leaveOfAbsenceViewUrlResult, onError: leaveOfAbsenceViewUrlError, refetch: leaveOfAbsenceViewUrlRefetch } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl,
  viewUrlParam,
  () => ({
    enabled: leaveOfAbsenceViewUrlTrigger.value,
    fetchPolicy: 'no-cache',
  })
);
leaveOfAbsenceViewUrlError((res: any) => {
  notification('error', res.message);
})
watch(leaveOfAbsenceViewUrlResult, (newVal: any) => {
  if (newVal) {
    window.open(newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl);
    leaveOfAbsenceViewUrlTrigger.value = false;
  }
});
//--dataType == 5--
const returnToWorkViewUrlTrigger = ref<boolean>(false);
const { result: returnToWorkViewUrl, onError: returnToWorkViewUrlError, refetch: returnToWorkViewUrlRefetch } = useQuery(
  queries.getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl,
  viewUrlParam,
  () => ({
    enabled: returnToWorkViewUrlTrigger.value,
    fetchPolicy: 'no-cache',
  })
);
returnToWorkViewUrlError((res: any) => {
  notification('error', res.message);
})
watch(returnToWorkViewUrl, (newVal: any) => {
  if (newVal) {
    window.open(newVal.getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl);
    returnToWorkViewUrlTrigger.value = false;
  }
});
const onGetFileStorageId = (type: number, workId: any) => {
  viewUrlParam.workId = workId;
  if (type === 4) {
    leaveOfAbsenceViewUrlTrigger.value = true;
    leaveOfAbsenceViewUrlRefetch();
  }
  if (type === 5) {
    returnToWorkViewUrlTrigger.value = true;
    returnToWorkViewUrlRefetch();
  }
};
</script>

<style scoped></style>
