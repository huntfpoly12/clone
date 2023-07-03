<template>
  <action-header title="신청내역 리스트" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-880" class="px-10 py-10">
    <a-spin :spinning="loading">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="workId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" v-model:focused-row-key="focusedRowKey" ref="taxPayDataRef"
        noDataText="내역이 없습니다">
        <DxPaging :page-size="0" />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']"
          placeholder="검색" />
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
              <DxButton icon="plus" @click="modalCreate = true" />
            </div>
          </a-tooltip>
        </template>
        <DxColumn caption="일련번호" data-field="companyId" alignment="center" width="130" />
        <DxColumn caption="상태" data-field="workingStatus" alignment="center" width="130" cell-template="workingStatus" />
        <template #workingStatus=" {data: dataValue}: any">
          <div>
            {{ MajorInsuranceWorkingStatus[dataValue.value] }}
          </div>
        </template>
        <DxColumn caption="등록일" data-field="registeredAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="접수일" data-field="acceptedAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="완료일" data-field="completedAt" alignment="center" data-type="date" format="yyyy-MM-dd" />
        <DxColumn caption="접수번호" data-field="acceptedNumber" alignment="center" />
        <DxColumn caption="메모" data-field="memo" alignment="center" />
        <DxColumn caption="사업장탈퇴신고서다운로드" cell-template="downA" alignment="center" width="180" />
        <template #downA=" { data }: any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton>
          </div>
        </template>
        <DxColumn caption="" cell-template="action" width="100" />
        <template #action="{ data }" class="custom-action">
          <div class="custom-action ml-8">
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
                v-if="data.data.workingStatus === 1 || data.data.workingStatus === 2">
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
    <FormReport v-if=" modalCreate " @onCreateModal=" onCreateModal " />
    <HistoryPopup :modalStatus=" modalHistory " @closePopup=" modalHistory = false " :data=" workIdHistory " title="변경이력"
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
  DxSearchPanel,
  DxToolbar,
  DxScrolling,
  DxItem,
} from 'devextreme-vue/data-grid';
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA8/PA880/index';
import mutations from '@/graphql/mutations/PA/PA8/PA880/index';
import DxButton from 'devextreme-vue/button';
// import { formatMonth } from '../utils/index';
import { Message } from "@/configs/enum";
import FormReport from './components/FormReport.vue';
import { DeleteOutlined, DownloadOutlined, EditOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import deletePopup from "@/utils/deletePopup";
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
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxItem,
    DxButton,
    FormReport,
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    DownloadOutlined,
    HistoryOutlined
  },
  setup() {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const focusedRowKey = ref();
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));

    //--------------------------DATASOURCE getMajorInsuranceCompanyOuts--------------------------

    const dataSource = ref([]);
    const companyOutsTrigger = ref<boolean>(false);
    const companyOutsParam = reactive({
      companyId: companyId,
      imputedYear: globalYear
    })
    const { refetch: companyOutsRefetch, result: companyOutsResult, onError: companyOutsError, loading } = useQuery(
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

    //-------------------------MUTATION DELETE cancelMajorInsuranceCompanyOut -----------

    const {
      mutate: cancelCompanyOutMutate,
      onDone: cancelCompanyOutOnDone,
      onError: cancelCompanyOutError,
    } = useMutation(mutations.cancelMajorInsuranceCompanyOut);
    cancelCompanyOutOnDone(() => {
      notification("success", Message.getMessage("COMMON", "302").message);
      companyOutsRefetch();
    });
    cancelCompanyOutError((res) => {
      notification('error', res.message);
    })
    const actionDelete = (workId: number) => {
      deletePopup({
        callback: () => {
          cancelCompanyOutMutate({
            companyId: companyId,
            imputedYear: globalYear.value,
            workId,
          });
        },
        message: Message.getCommonMessage("303").message,
        cancelText: Message.getCommonMessage("303").no,
        okText: Message.getCommonMessage("303").yes,
      });
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
      companyOutViewUrlParam.workId = workId;
      companyOutViewUrlTrigger.value = true;
      // companyOutViewUrlRefetch();
    };
    const onGetFileStorageId = (url: string) => {
      window.open(url);
    };
    return {
      per_page, move_column, colomn_resize,
      focusedRowKey, dataSource, loading,
      modalHistory, workIdHistory, onOpenLogs,
      onCreateModal, actionDelete, onGetFileStorageId, onGetAcquistionRp,
      modalCreate, MajorInsuranceWorkingStatus,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
