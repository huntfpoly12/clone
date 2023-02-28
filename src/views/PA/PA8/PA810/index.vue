<template>
  <action-header title="취득신고등록" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false"/>
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
      >
        <DxScrolling mode="standard" show-scrollbar="always"/>
        <DxToolbar>
          <DxItem location="after" template="button-template" css-class="cell-button-add"/>
        </DxToolbar>
        <template #button-template>
          <DxButton icon="plus" @click="openAddNewModal"/>
        </template>
        <DxColumn caption="일련번호" data-field="workId" width="100"/>
        <DxColumn caption="성명" data-field="name"/>
        <!-- TODO api not field convertBirthday -->
        <DxColumn caption="생년월일" data-field="convertBirthday" width="100"/>
        <DxColumn caption="주민등록증" data-field="residentId" width="150"/>
        <DxColumn caption="상태" data-field="workingStatus" width="100"/>
        <DxColumn caption="등록일" data-field="registeredAt" width="100" :format="dateFormat"/>
        <DxColumn caption="접수일" data-field="acceptedAt" width="100" :format="dateFormat"/>
        <DxColumn caption="접수일" data-field="completedAt" width="100" :format="dateFormat"/>
        <DxColumn caption="접수번호" data-field="accedpedNumber"/>
        <!-- TODO api not field paymentYear -->
        <DxColumn caption="FAX상태" data-field="paymentYear"/>
        <DxColumn caption="메모" data-field="memo"/>
        <DxColumn caption="신고서다운로드" cell-template="report" width="100"/>
        <template #report="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.employeeId)">
              <DownloadOutlined :size="12"/>
            </DxButton>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual"/>
        <DxColumn caption="첨부파일다운로드" data-field="dependentsEvidenceFileStorageId" width="40"/>
        <DxScrolling column-rendering-mode="virtual"/>
        <DxColumn cell-template="action" width="150"/>
        <template #action="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space>
              <DxButton type="ghost" style="cursor: pointer" @click="onOpenLogs(data.data.workId)">
                <HistoryOutlined style="font-size: 16px"/>
              </DxButton>
              <DxButton type="ghost" style="cursor: pointer" @click="onCancelAcquistion(data.data.workId)">
                <DeleteOutlined/>
              </DxButton>
            </a-space>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual"/>
      </DxDataGrid>
    </a-spin>
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="취득신고등록"
                  typeHistory="pa-810"/>
    <CreatePA810Popup v-if="isOpenModalCreate" @closeModal="isOpenModalCreate = false" @handleCreate="handleCreate" />
    <!-- <ViewPA810Popup v-if="isEditModalStatus && dataRow" @closeModal="isEditModalStatus = false" :data="dataRow" /> -->
  </div>
</template>

<script lang="ts">
import HistoryPopup from "@/components/HistoryPopup.vue";
import imgUpload from "@/components/UploadImage.vue";
import mutations from '@/graphql/mutations/PA/PA8/PA810/index';
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import { companyId } from '@/helpers/commonFunction';
import notification from '@/utils/notification';
// import ViewPA810Popup from "@/views/PA/PA8/PA810/components/ViewPA810Popup.vue";
import { DeleteOutlined, DownloadOutlined, HistoryOutlined, ZoomInOutlined } from '@ant-design/icons-vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import dayjs from "dayjs";
import DxButton from 'devextreme-vue/button';
import { DxColumn, DxDataGrid, DxScrolling, DxToolbar } from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/select-box';
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import CreatePA810Popup from './components/CreatePA810Popup.vue';

export default defineComponent({
  components: {
    // ViewPA810Popup,
    HistoryPopup,
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    CreatePA810Popup,
    DxToolbar,
    DxItem,
    DownloadOutlined,
    ZoomInOutlined,
    imgUpload
  },
  setup() {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const {per_page, move_column, colomn_resize} = store.state.settings;
    const actionParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      workId: null,
    })

    // Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
    const dataSource = ref([]);
    const employeeAcquisitionsParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });

    const {
      refetch, onResult, loading
    } = useQuery(queries.getMajorInsuranceCompanyEmployeeAcquisitions, employeeAcquisitionsParam, () => ({
      fetchPolicy: 'no-cache',
    }));

    onResult((res) => {
      dataSource.value = res.data.getMajorInsuranceCompanyEmployeeAcquisitions
    })

    // -------history------

    const modalHistory = ref(false);
    const onOpenLogs = (e: any) => {
      modalHistory.value = true;
      actionParam.workId = e;
    };

    //------get ReportViewUrl ----

    const fillRpTrigger = ref<boolean>(false);
    const {refetch: fillRpRefetch, result: fillRpResult} = useQuery(
      queries.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
      actionParam,
      () => ({
        enabled: fillRpTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(fillRpResult, (newVal) => {
      if (newVal) {
        window.open(newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl);
        fillRpTrigger.value = false;
      }
    });
    const onGetAcquistionRp = (workId: any) => {
      actionParam.workId = workId;
      fillRpTrigger.value = true;
      fillRpRefetch();
    };

    //---------Modal create edit----------
    const isOpenModalCreate = ref(false);
    const openAddNewModal = () => {
      isOpenModalCreate.value = true;
    };
    const handleCreate = () => {
      refetch();
      isOpenModalCreate.value = false;
    };

    // ---------update log------------
    // const isEditModalStatus = ref(false);
    // const dataRow = ref<MajorInsuranceCompanyEmployeeAcquisition>();
    // const handleUpdate = (e: any) => {
    //   refetch();
    //   isEditModalStatus.value = false;
    // };
    // const onOpenModalUpdate = (data: MajorInsuranceCompanyEmployeeAcquisition) => {
    //   if(data) {
    //     isEditModalStatus.value = true;
    //     dataRow.value = data;
    //   }
    // };

    //------mutation cancel acquistion ----
    const {
      mutate: mutateCancelAcquistion,
      onDone: onDoneCancelAcquistionDone
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
    const onCancelAcquistion = (e: any) => {
      actionParam.workId = e;
      mutateCancelAcquistion(actionParam);
    };
    onDoneCancelAcquistionDone(() => {
      notification('success', 'delete success');
      refetch();
    });

    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      onGetAcquistionRp,
      modalHistory,
      actionParam,
      onOpenLogs,
      onCancelAcquistion,
      // onGetEmployeeAcquisition,
      openAddNewModal,
      isOpenModalCreate,
      refetch,
      onResult,
      loading,
      dateFormat: function (value: any) {
        if (value) {
          return dayjs(value).format('YYYY-MM-DD');
        }
      },
      // onOpenModalUpdate,
      // isEditModalStatus,
      // handleUpdate,
      // dataRow,
      handleCreate,
    };
  },
});
</script>
<style lang="scss" scoped>
@import './styles/index.scss';
</style>
