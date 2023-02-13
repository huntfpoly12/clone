<template>
  <action-header title="취득신고등록" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-810" class="px-10 py-10">
    <div>
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        :allow-column-reordering="move_column"
        key-expr="globalYear"
        :key="globalYear"
        :allow-column-resizing="colomn_resize"
        :column-auto-width="true"
        :focused-row-enabled="true"
      >
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxToolbar>
          <DxItem location="after" template="button-template" css-class="cell-button-add" />
        </DxToolbar>
        <template #button-template>
          <DxButton icon="plus" @click="openAddNewModal" />
        </template>
        <DxColumn caption="일련번호" data-field="workId" width="100" />
        <DxColumn caption="성명" data-field="name" width="100" />
        <DxColumn caption="생년월일" data-field="convertBirthday" width="100" />
        <DxColumn caption="주민등록증" data-field="residentId" width="100" />
        <DxColumn caption="상태" data-field="workingStatus" width="100" />
        <DxColumn caption="등록일" data-field="registeredAt" width="100" />
        <DxColumn caption="접수일" data-field="acceptedAt" width="100" />
        <DxColumn caption="완료일" data-field="completedAt" width="100" />
        <DxColumn caption="접수번호" data-field="accedpedNumber" width="100" />
        <DxColumn caption="FAX상태" data-field="paymentYear" width="100" />
        <DxColumn caption="메모" data-field="memo" width="100" />
        <DxColumn caption="신고서다운로드" cell-template="report" />
        <template #report="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space :size="10">
              <DeleteOutlined @click="onGetAcquistionRp(data.data.employeeId)" />
            </a-space>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
        <DxColumn caption="첨부파일다운로드" cell-template="pupop" />
        <template #pupop="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space :size="10">
              <DeleteOutlined @click="onGetAcquistionRp(data.data.employeeId)" />
            </a-space>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
        <DxColumn cell-template="action" width="100" />
        <template #action="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center">
            <a-space :size="10">
              <DeleteOutlined @click="onGetAcquistionRp(data.data.workId)" />
              <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="onOpenLogs(data.data.workId)">
                <a-tooltip placement="top">
                  <template #title>근로소득자료 변경이력</template>
                  <div class="text-center">
                    <HistoryOutlined style="font-size: 16px" />
                  </div>
                </a-tooltip>
              </DxButton>
              <DeleteOutlined @click="onCancelAcquistion(data.data.workId)" />
            </a-space>
          </div>
        </template>
        <DxScrolling column-rendering-mode="virtual" />
      </DxDataGrid>
    </div>
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="actionParam" title="취득신고등록" typeHistory="pa-810" />
    <DeleteOutlined @click="onGetEmployeeAcquisition(1)" />
    <FormModal v-if="isNewModal" @closeModal="isNewModal = false"></FormModal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import mutations from '@/graphql/mutations/PA/PA8/PA810/index';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { companyId, openTab } from '@/helpers/commonFunction';
import { DeleteOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { DxDataGrid, DxColumn, DxScrolling, DxMasterDetail, DxToolbar } from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import notification from '@/utils/notification';
import FormModal from './components/FormModal.vue';
import { DxItem } from 'devextreme-vue/select-box';

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    FormModal,
    DxToolbar,
    DxItem,
  },
  setup() {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const actionParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      workId: null,
    });

    // Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions

    const dataSource = ref([]);
    const employeeAcquisitionsParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const {} = useQuery(queries.getMajorInsuranceCompanyEmployeeAcquisitions, employeeAcquisitionsParam, () => ({
      fetchPolicy: 'no-cache',
    }));

    // -------history------

    const modalHistory = ref(false);
    const onOpenLogs = (e: any) => {
      modalHistory.value = true;
      actionParam.workId = e;
    };

    //------get ReportViewUrl ----

    const fillRpTrigger = ref<boolean>(false);
    const { refetch: fillRpRefetch, result: fillRpResult } = useQuery(
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
    const onGetAcquistionRp = (e: any) => {
      actionParam.workId = e;
      fillRpTrigger.value = true;
      fillRpRefetch();
    };

    //------get EmployeeAcquisition ----

    const employeeAcquisitionTrigger = ref<boolean>(false);
    const dataDetail = ref();
    const { refetch: employeeAcquisitionRefetch, result: employeeAcquisitionResult } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeAcquisition,
      actionParam,
      () => ({
        enabled: employeeAcquisitionTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(employeeAcquisitionResult, (newVal) => {
      if (newVal) {
        let data = newVal.getMajorInsuranceCompanyEmployeeAcquisition;
        dataDetail.value = data;
        employeeAcquisitionTrigger.value = false;
      }
    });
    const onGetEmployeeAcquisition = (e: any) => {
      actionParam.workId = e;
      employeeAcquisitionTrigger.value = true;
      employeeAcquisitionRefetch();
    };

    //------mutation cancel acquistion ----

    const { mutate: mutateCancelAcquistion, onDone: onDoneCancelAcquistionDone } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
    const onCancelAcquistion = (e: any) => {
      actionParam.workId = e;
      mutateCancelAcquistion(actionParam);
    };
    onDoneCancelAcquistionDone(() => {
      notification('success', 'success');
    });

    //---------open Modal create edit----------

    const isNewModal = ref(false);
    const openAddNewModal = () => {
      isNewModal.value = true;
    };
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
      onGetEmployeeAcquisition,
      openAddNewModal,
      isNewModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import './styles/index.scss';
</style>