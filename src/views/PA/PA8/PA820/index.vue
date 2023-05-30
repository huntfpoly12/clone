<template>
  <action-header title="신청내역 리스트" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />

  <div id="pa-820" class="px-10 py-10">
    <a-spin :spinning="loading" size="large">
      <DxDataGrid :show-row-lines="true" :data-source="dataSource" :show-borders="true"
        key-expr="workId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" v-model:focused-row-key="focusedRowKey" ref="taxPayDataRef" noDataText="내역이 없습니다">
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']"
          placeholder="검색" />
        <DxExport :enabled="true" />
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxColumn caption="일련번호" data-field="workId" width="80" alignment="center" />
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" css-class="cell-button-export" />
          <DxItem location="after" template="button-template" css-class="cell-button-add" />
        </DxToolbar>
        <template #button-template>
          <a-tooltip placement="top" class="custom-tooltip">
            <template #title>
              신규
            </template>
            <div style="text-align: center;">
              <DxButton icon="plus" @click="modalCreate = true" />
            </div>
          </a-tooltip>
        </template>
        <DxColumn caption="성명" data-field="name" width="130" alignment="center" />
        <DxColumn caption="생년월일" alignment="center" cell-template="residentId" />
        <template #residentId="{data}: any">
          <div>
            {{ convertBirthDayKorea(data.data.residentId || '')}}
          </div>
        </template>
        <DxColumn caption="상태" data-field="workingStatus" width="80" alignment="center" cell-template="workingStatus" />
        <template #workingStatus=" { data: dataValue }: any ">
          <div>
            {{ MajorInsuranceWorkingStatus[dataValue.value] }}
          </div>
        </template>
        <DxColumn caption="등록일" data-field="registeredAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="접수일" data-field="acceptedAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="완료일" data-field="completedAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="접수번호" data-field="acceptedNumber" width="120px" alignment="center" />
        <DxColumn caption="메모" data-field="memo" width="120px" alignment="center" />
        <DxColumn caption="상실신고서다운로드" cell-template="downA" width="140px" alignment="center" />
        <template #downA=" { data }: any ">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton>
          </div>
        </template>
        <DxColumn caption="" cell-template="action" width="120px" />
        <template #action=" { data }: any ">
          <div class="custom-action" style="margin-left: 20px;">
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
    <CreatePA820Popup v-if=" modalCreate " @closeModal=" onCreateModal " />
    <PopupMessage :modalStatus=" modalDelete " @closePopup=" modalDelete = false " typeModal="confirm"
      :content=" contentDelete.message " :okText="contentDelete.yes" :cancelText="contentDelete.no" @checkConfirm=" handleDelete " />
    <HistoryPopup :modalStatus=" modalHistory " @closePopup=" modalHistory = false " :data=" workIdHistory " title="변경이력"
      typeHistory="pa-820" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem,
  DxMasterDetail,
  DxSummary,
  DxTotalItem,
} from 'devextreme-vue/data-grid';
import { companyId, convertBirthDayKorea } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA8/PA820/index';
import mutations from '@/graphql/mutations/PA/PA8/PA820/index';
import filters from '@/helpers/filters';
import DxButton from 'devextreme-vue/button';
// import { formatMonth } from '../utils/index';
import { Message } from "@/configs/enum";
import CreatePA820Popup from './components/CreatePA820Popup.vue';
import { DeleteOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
enum MajorInsuranceWorkingStatus {
  등록 = 1,
  접수 = 2,
  완료 = 10,
  오류 = -1,
  취소 = 0
}
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxMasterDetail,
    DxSummary,
    DxTotalItem,
    DxButton,
    CreatePA820Popup,
    DeleteOutlined,
    HistoryOutlined,
    DownloadOutlined
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const focusedRowKey = ref();
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));

    //--------------------------DATASOURCE cetMajorInsuranceCompanyEmployeeLosses--------------------------

    const dataSource = ref([]);
    const companyEmployeeLossesTrigger = ref<boolean>(false);
    const companyEmployeeLossesParam = reactive({
      companyId: companyId,
      imputedYear: globalYear
    })
    const { refetch: companyEmployeeLossesRefetch, result: companyEmployeeLossesResult, onError: companyEmployeeLossesError, loading } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLosses,
      companyEmployeeLossesParam,
      () => ({
        // enabled: companyEmployeeLossesTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(companyEmployeeLossesResult, (newVal) => {
      if (newVal) {
        dataSource.value = newVal.getMajorInsuranceCompanyEmployeeLosses;
        // companyEmployeeLossesTrigger.value = false;
      }
    });
    companyEmployeeLossesError((res: any) => {
      notification('error', res.message)
    })

    // -----------------------------MAIL-------------------

    const modalMail = ref(false);
    const openMailModal = (e: any) => {
      modalHistory.value = true;
      // actionParam.workId = e;
    };

    // -----------------------------PRINT-------------------

    const modalPrint = ref(false);
    const openPrintModal = (e: any) => {
      modalHistory.value = true;
      // actionParam.workId = e;
    };

    //---------------------------ADD FORM------------------

    const modalCreate = ref(false);
    const onCreateModal = (emitVal: Boolean) => {
      modalCreate.value = false;
      if (emitVal) {
        modalCreate.value = false;
        companyEmployeeLossesRefetch();
      }
    }

    // -----------------------------HISTORY-------------------

    const modalHistory = ref(false);
    const workIdHistory = ref();
    const onOpenLogs = (e: any) => {
      modalHistory.value = true;
      workIdHistory.value = e;
      // actionParam.workId = e;
    };

    //-------------------------MUTATION DELETE cancelMajorInsuranceCompanyOut -----------

    const contentDelete = Message.getCommonMessage('303');
    const deleteMesDone = Message.getCommonMessage('302').message;
    const modalDelete = ref(false);
    const cancelCompanyOutParam = reactive({
      companyId: companyId,
      imputedYear: globalYear,
      workId: NaN,
    })
    const {
      mutate: cancelCompanyOutMutate,
      onDone: cancelCompanyOutOnDone,
      onError: cancelCompanyOutError,
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeLoss);
    cancelCompanyOutOnDone(() => {
      notification('success', deleteMesDone);
      companyEmployeeLossesRefetch();
    });
    cancelCompanyOutError((res) => {
      notification('error', res.message);
    })
    const actionDelete = (workId: number) => {
      modalDelete.value = true;
      cancelCompanyOutParam.workId = workId;
    }
    const handleDelete = (e: boolean) => {
      if (e) {
        modalDelete.value = false;
        cancelCompanyOutMutate(cancelCompanyOutParam);
      }
    }

    //--------------------------get ReportViewUrl ---------------------

    const companyEmployeeLossUrlParam = reactive({
      companyId: companyId,
      imputedYear: globalYear,
      workId: '',
    })
    const companyEmployeeLossUrlTrigger = ref<boolean>(false);
    const { result: companyEmployeeLossUrlResult, onError: companyEmployeeLossUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl,
      companyEmployeeLossUrlParam,
      () => ({
        enabled: companyEmployeeLossUrlTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    companyEmployeeLossUrlError((res: any) => {
      notification('error', res.message);
    })
    watch(companyEmployeeLossUrlResult, (newVal) => {
      if (newVal) {
        window.open(newVal.getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl);
        companyEmployeeLossUrlTrigger.value = false;
      }
    });
    const onGetAcquistionRp = (workId: any) => {
      companyEmployeeLossUrlParam.workId = workId;
      companyEmployeeLossUrlTrigger.value = true;
      // companyEmployeeLossUrlRefetch();
    };
    const onGetFileStorageId = (url: string) => {
      window.open(url);
    };

    return {
      per_page, move_column, colomn_resize,loading,
      focusedRowKey, dataSource, modalHistory,
      onOpenLogs, actionDelete, onGetFileStorageId, onGetAcquistionRp,
      onCreateModal, modalCreate, modalDelete, handleDelete, contentDelete,
      workIdHistory,
      MajorInsuranceWorkingStatus, convertBirthDayKorea,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>