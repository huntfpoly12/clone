<template>
  <action-header title="신청내역 리스트" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-880" class="px-10 py-10">
    <a-spin :spinning="false" size="large">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="incomeId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" ref="taxPayDataRef">
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']" />
        <DxExport :enabled="true" />
        <DxScrolling mode="standard" show-scrollbar="always" />
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
              <DxButton icon="plus" @click="openAddNewModal" />
            </div>
          </a-tooltip>
        </template>
        <DxColumn caption="일련번호" data-field="id" cell-template="tag" />
        <DxColumn caption="상태" data-field="name" alignment="left" />
        <DxColumn caption="등록일" data-field="workId" width="100" alignment="right" />
        <DxColumn caption="접수일" data-field="residentId" width="100" alignment="right" />
        <DxColumn caption="완료일" data-field="workingStatus" width="100" alignment="right" />
        <DxColumn caption="접수번호" data-field="registeredAt" width="100" alignment="left" />
        <DxColumn caption="메모" data-field="acceptedAt" width="120px" alignment="right" />
        <DxColumn caption="사업장탈퇴신고서다운로드" cell-template="downA" alignment="right" />
        <template #downA="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.workId)">
              <DownloadOutlined :size="12" />
            </DxButton>
          </div>
        </template>
      </DxDataGrid>
    </a-spin>
    <!-- <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="변경이력"
      typeHistory="pa-810" /> -->
    <FormReport :isOpenModalCreate="isOpenModalCreate" @closeModal="isOpenModalCreate = false"
      @handleCreate="handleCreate" />
    <PopupMessage :modalStatus="isDelete" @closePopup="isDelete = false" typeModal="confirm" :content="contentDelete"
      okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="handleDelete" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
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
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import filters from '@/helpers/filters';
import DxButton from 'devextreme-vue/button';
// import { formatMonth } from '../utils/index';
import { Message } from "@/configs/enum";
import FormReport from './components/FormReport.vue';

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
    FormReport
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([]);
    const focusedRowKey = ref();
    //---------------------------add new data------------------
    const isOpenModalCreate = ref(false);
    const openAddNewModal = () => {
      isOpenModalCreate.value = true;
    }
    const handleCreate = () => {
      // refetch();
      isOpenModalCreate.value = false;
    };
    // -----------------------------history-------------------

    const modalHistory = ref(false);
    const onOpenLogs = (e: any) => {
      modalHistory.value = true;
      // actionParam.workId = e;
    };

    //-------------------------mutation cancel acquistion -----------

    const contentDelete = Message.getCommonMessage('401').message as string
    const isDelete = ref(false);
    // const {
    //   mutate: mutateCancelAcquistion,
    //   onDone: onDoneAcquisitionDone,
    //   onError: onDoneAcquisitionError,
    // } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
    // onDoneAcquisitionDone(() => {
    //   notification('success', Message.getMessage('COMMON', '402').message);
    //   refetch();
    // });
    const actionDelete = (workId: number) => {
      // isDelete.value = true;
      // actionParam.workId = workId;
    }
    // onDoneAcquisitionError((res) => {
    //   notification('error', res.message);
    // })
    const handleDelete = (e: boolean) => {
      if (e) {
        isDelete.value = false;
        // mutateCancelAcquistion(actionParam);
      }
    }

    //------get ReportViewUrl ----

    // const fillRpTrigger = ref<boolean>(false);
    // const {refetch: fillRpRefetch, result: fillRpResult, onError} = useQuery(
    //   queries.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
    //   actionParam,
    //   () => ({
    //     enabled: fillRpTrigger.value,
    //     fetchPolicy: 'no-cache',
    //   })
    // );
    // watch(fillRpResult, (newVal) => {
    //   if (newVal) {
    //     window.open(newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl);
    //     fillRpTrigger.value = false;
    //   }
    // });
    const onGetAcquistionRp = (workId: any) => {
      // actionParam.workId = workId;
      // fillRpTrigger.value = true;
      // fillRpRefetch();
    };
    const onGetFileStorageId = (url: string) => {
      window.open(url);
    };
    // onError((e) => {
    //   notification('error', e.message);
    // });
    return {
      per_page, move_column, colomn_resize,
      focusedRowKey, dataSource, modalHistory,
      openAddNewModal, onOpenLogs, actionDelete, onGetFileStorageId, onGetAcquistionRp,
      handleCreate, isOpenModalCreate, isDelete, handleDelete, contentDelete
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>