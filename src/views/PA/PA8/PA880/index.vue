<template>
  <action-header title="신청내역 리스트" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-880" class="px-10 py-10">
    <a-spin :spinning="false" size="large">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="workId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" ref="taxPayDataRef">
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']" />
        <DxExport :enabled="true" />
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxLoadPanel :enabled="true" :showPane="true" />
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
        <DxColumn caption="일련번호" data-field="companyId" alignment="left" width="130" />
        <DxColumn caption="상태" data-field="workingStatus" alignment="left" width="130" />
        <DxColumn caption="등록일" data-field="registeredAt" alignment="left" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="접수일" data-field="acceptedAt" alignment="left" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="완료일" data-field="completedAt" alignment="left" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="접수번호" data-field="accedpedNumber" alignment="left" />
        <DxColumn caption="메모" data-field="memo" alignment="left" />
        <DxColumn caption="사업장탈퇴신고서다운로드" cell-template="downA" alignment="left" width="180" />
        <template #downA="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.workId)">
              <DownloadOutlined :size="12" />
            </DxButton>
          </div>
        </template>
        <DxColumn caption="" cell-template="action" width="180" />
        <template #action="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space>
              <DxButton type="ghost" style="cursor: pointer" @click="onDetailData(data.data.workId)">
                <SearchOutlined style="font-size: 16px" />
              </DxButton>
              <DxButton type="ghost" style="cursor: pointer" @click="onOpenLogs(data.data.workId)">
                <HistoryOutlined style="font-size: 16px" />
              </DxButton>
              <DxButton type="ghost" style="cursor: pointer" @click="actionDelete(data.data.workId)">
                <DeleteOutlined />
              </DxButton>
            </a-space>
          </div>
        </template>
      </DxDataGrid>
    </a-spin>
    <!-- <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="변경이력"
      typeHistory="pa-810" /> -->
    <FormReport v-if="modalCreate" @onCreateModal="onCreateModal" :workId="workId" />
    <PopupMessage :modalStatus="modalDelete" @closePopup="modalDelete = false" typeModal="confirm"
      :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="handleDelete" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="workIdHistory" title="변경이력"
      typeHistory="pa-880" />
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
  DxLoadPanel,
} from 'devextreme-vue/data-grid';
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA8/PA880/index';
import mutations from '@/graphql/mutations/PA/PA8/PA880/index';
import filters from '@/helpers/filters';
import DxButton from 'devextreme-vue/button';
// import { formatMonth } from '../utils/index';
import { Message } from "@/configs/enum";
import FormReport from './components/FormReport.vue';
import { DeleteOutlined, DownloadOutlined, EditOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import { react } from '@babel/types';

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
    FormReport,
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    DxLoadPanel,
    DownloadOutlined,
    HistoryOutlined
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const focusedRowKey = ref();
    const globalYear = computed(() => store.state.settings.globalYear);
    //--------------------------DATASOURCE getMajorInsuranceCompanyOuts--------------------------

    const dataSource = ref([]);
    const companyOutsTrigger = ref<boolean>(false);
    const companyOutsParam = reactive({
      companyId: companyId,
      imputedYear: globalYear
    })
    const { refetch: companyOutsRefetch, result: companyOutsResult, onError: companyOutsError } = useQuery(
      queries.getMajorInsuranceCompanyOuts,
      companyOutsParam,
      () => ({
        // enabled: companyOutsTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(companyOutsResult, (newVal) => {
      if (newVal) {
        dataSource.value = newVal.getMajorInsuranceCompanyOuts;
        // companyOutsTrigger.value = false;
      }
    });
    companyOutsError((res: any) => {
      notification('error', res.message)
    })
    //---------------------------CREATE------------------

    const modalCreate = ref(false);
    const onCreateModal = (emitVal: Boolean) => {
      modalCreate.value = false;
      if (emitVal) {
        modalCreate.value = false;
        companyOutsRefetch();
      }
    }

    //----------------------------ON DETAIL DATA---------------

    const workId = ref();
    const onDetailData = (val: Number) => {
      workId.value = val;
      modalCreate.value = true;
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

    const contentDelete = Message.getCommonMessage('401').message as string
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
    } = useMutation(mutations.cancelMajorInsuranceCompanyOut);
    cancelCompanyOutOnDone(() => {
      notification('success', Message.getMessage('COMMON', '402').message);
      companyOutsRefetch();
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

    //------get ReportViewUrl ----

    const companyOutViewUrlParam = reactive({
      companyId: companyId,
      imputedYear: globalYear,
      workId: '',
    })
    const companyOutViewUrlTrigger = ref<boolean>(false);
    const { refetch: companyOutViewUrlRefetch, result: companyOutViewUrlResult, onError: companyOutViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyOutFaxFilingReportViewUrl,
      companyOutViewUrlParam,
      () => ({
        enabled: companyOutViewUrlTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    companyOutViewUrlError((res: any) => {
      notification('error', res.message);
    })
    watch(companyOutViewUrlResult, (newVal) => {
      if (newVal) {
        window.open(newVal.getMajorInsuranceCompanyOutFaxFilingReportViewUrl);
        companyOutViewUrlTrigger.value = false;
      }
    });
    const onGetAcquistionRp = (workId: any) => {
      console.log(`output->workId`, workId)
      companyOutViewUrlParam.workId = workId;
      companyOutViewUrlTrigger.value = true;
      // companyOutViewUrlRefetch();
    };
    const onGetFileStorageId = (url: string) => {
      window.open(url);
    };
    // onError((e) => {
    //   notification('error', e.message);
    // });
    return {
      per_page, move_column, colomn_resize,
      focusedRowKey, dataSource,
      modalHistory, workIdHistory, onOpenLogs,
      onCreateModal, actionDelete, onGetFileStorageId, onGetAcquistionRp,
      modalCreate, modalDelete, handleDelete, contentDelete,
      onDetailData, workId,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>