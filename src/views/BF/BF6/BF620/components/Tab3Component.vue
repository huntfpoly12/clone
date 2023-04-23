<template>
  <div class="tab-group">
    <div class="search-group tab-3">
      <div>
        <!-- {{ ElecFilingFileFilter }} ElecFilingFileFilter <br />
        {{ companiesInElectronic }} companiesInElectronic <br /> -->
        <a-row justify="start" :gutter="[16, 8]">
          <a-col>
            <a-form-item label="신고구분 :">
              <electronic-filing-type v-model:valueInput="ElecFilingFileFilter.type" width="200px"
                :disabledList="[3, 4, 5, 6, 7, 8, 9]"></electronic-filing-type>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="제작요청일(기간)">
              <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="제작상태">
              <DxRadioGroup :data-source="typeCheckbox" item-template="radio" v-model="productionStatuses"
                layout="horizontal" :icon-size="12">
                <template #radio="{ data }: any">
                  <production-status :typeTag=" 0 " v-if=" data == 0 " padding="0px 10px" />
                  <production-status :typeTag=" 4 " v-if=" data == 2 " padding="1px 10px" />
                  <production-status :typeTag=" 5 " v-if=" data == -1 " padding="1px 10px" />
                </template>
              </DxRadioGroup>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="제작요청자">
              <list-manager-dropdown width="150px" v-model:valueInput=" ElecFilingFileFilter.manageUserId " />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="content-grid mt-10">
      <DxDataGrid id="tab3-bf620" :show-row-lines=" true " :hoverStateEnabled=" true " :data-source=" dataSource "
        :show-borders=" true " key-expr="productionRequestUserId" class="mt-10" :allow-column-reordering=" move_column "
        :allow-column-resizing=" colomn_resize " :column-auto-width=" true ">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxLoadPanel :enabled=" true " />
        <DxColumn caption="일련번호" data-field="electronicFilingId" alignment="left" />
        <DxColumn caption="참고사항" data-field="referenceInformation" />
        <DxColumn caption="제작요청일시" data-field="productionRequestedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="아이디" data-field="productionRequestUserId" alignment="left" />
        <DxColumn caption="제작현황" data-field="productionStatus" cell-template="productionStatus" alignment="left" />
        <template #productionStatus=" { data }: any ">
          <production-status :typeTag=" 2 " v-if=" data.value == 0 " padding="1px 10px" />
          <production-status :typeTag=" 3 " v-if=" data.value == 1 " padding="1px 10px" />
          <production-status :typeTag=" 4 " v-if=" data.value == 2 " padding="1px 10px" />
          <production-status :typeTag=" 5 " v-if=" data.value == -1 " :message=" data.data.causeOfProductionFailure "
            padding="1px 10px" />
        </template>
        <DxColumn caption="상세보기" cell-template="afterDeadline" />
        <template #afterDeadline=" { data }: any ">
          <DxButton class="custom-action" @click=" onShow(data.data.electronicFilingId) "
            style="border: none; margin-top: -2px; width: 35px; height: 35px;">
            <zoom-in-outlined :style=" { fontSize: '20px', color: 'black' } " />
          </DxButton>
        </template>
        <DxSummary>
          <DxTotalItem column="일련번호" summary-type="count" display-format="전체: {0}" />
        </DxSummary>
      </DxDataGrid>
      <!-- <div @click="onShow">Kính lúp</div> -->
    </div>
    <a-modal :visible=" modalStatus " @cancel=" modalStatus = false " :mask-closable=" false " class="confirm-md"
      footer="" :width=" 700 ">
      <a-spin :spinning=" companiesInElectronicLoading ">
        <br />
        <DxDataGrid :show-row-lines=" true " :hoverStateEnabled=" true " :data-source=" companiesInElectronicDataSource "
          :show-borders=" true " key-expr="code" class="mt-10" :allow-column-reordering=" move_column "
          :allow-column-resizing=" colomn_resize " :column-auto-width=" true ">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="사업자코드" data-field="code" />
          <DxColumn caption="사업자번호" cell-template="bizNumber" data-field="bizNumber" />
          <template #bizNumber=" { data }: any ">
            <div> {{ data.data.bizNumber.toString().slice(0, 3) }}-{{
              data.data.bizNumber.toString().slice(3, 5)
              }}-{{
              data.data.bizNumber.toString().slice(5, 10)
              }}</div>
          </template>
          <DxColumn caption="상호" data-field="name" />
          <DxColumn caption="대표자명" data-field="presidentName" />
          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </a-modal>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import DxRadioGroup from 'devextreme-vue/radio-group';
import notification from '@/utils/notification';
import DxButton from "devextreme-vue/button";
import { ZoomInOutlined } from "@ant-design/icons-vue"
import GetStatusTable from './GetStatusTable.vue';
export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxRadioGroup,
    DxSummary,
    DxTotalItem,
    ZoomInOutlined,
    GetStatusTable,
    DxLoadPanel
  },
  props: {
    search: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const rangeDate: any = ref([parseInt(dayjs().subtract(1, 'week').format('YYYYMMDD')), parseInt(dayjs().format('YYYYMMDD'))]);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const productionStatuses = ref(0);
    const app: any = getCurrentInstance();
    const styleCheckBox = app.appContext.config.globalProperties.$config_styles;
    //Report file
    const modalConfirmMail = ref(false);

    //Search with holding and data source

    const dataSource = ref([]);
    const searchElectronicFilingTrigger = ref(true);
    const ElecFilingFileFilter = reactive({
      type: 1,
      requesteStartDate: rangeDate.value[0],
      requesteFinishDate: rangeDate.value[1],
      productionStatuses: [2, -1],
      manageUserId: null,
    });
    const {
      result: searchElectronicFilingResult,
      loading: searchElectronicFilingLoading,
      //   refetch: searchElectronicFilingRefetch,
      onError: searchElectronicFilingError,
      variables,
    } = useQuery(queries.searchElectronicFilingFileProductions, { filter: ElecFilingFileFilter }, () => ({
      enabled: searchElectronicFilingTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(searchElectronicFilingResult, (newVal) => {
      let data = newVal.searchElectronicFilingFileProductions;
      dataSource.value = data;
      // companiesInElectronic.electronicFilingId = data.electronicFilingId;
      searchElectronicFilingTrigger.value = false;
    });
    searchElectronicFilingError((res) => {
      notification('error', res.message)
    })

    // Get Companies detail and data source

    const companiesInElectronicDataSource = ref([]);
    const companiesInElectronicTrigger = ref(false);
    const modalStatus = ref<boolean>(false);
    const companiesInElectronic = ref({
      type: ElecFilingFileFilter.type,
      electronicFilingId: 1,
    });
    const {
      result: companiesInElectronicResult,
      loading: companiesInElectronicLoading,
      refetch: companiesInElectronicRefetch,
      //   variables: companiesVariable,
    } = useQuery(queries.getCompaniesInElectronicFilingFile, companiesInElectronic, () => ({
      enabled: companiesInElectronicTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(companiesInElectronicResult, (newVal) => {
      let data = newVal.getCompaniesInElectronicFilingFile;
      companiesInElectronicDataSource.value = data;
      companiesInElectronicTrigger.value = false;
    });
    const onShow = (e: any) => {
      modalStatus.value = true;
      companiesInElectronic.value.type = ElecFilingFileFilter.type;
      companiesInElectronic.value.electronicFilingId = e;
      companiesInElectronicTrigger.value = true;
      companiesInElectronicRefetch();
    };

    //on Search
    watch(
      () => props.search,
      () => {
        variables.value = { filter: ElecFilingFileFilter };
        searchElectronicFilingTrigger.value = true;
        // searchElectronicFilingRefetch();
      },
      { deep: true }
    );

    // watch productionStatuses

    watch(productionStatuses, (newVal) => {
      if (newVal == 0) {
        ElecFilingFileFilter.productionStatuses = [2, -1];
      } else {
        ElecFilingFileFilter.productionStatuses = [newVal];
      }
    });

    // watch range date

    watch(rangeDate, (newVal) => {
      ElecFilingFileFilter.requesteStartDate = newVal[0];
      ElecFilingFileFilter.requesteFinishDate = newVal[1];
    });
    return {
      ElecFilingFileFilter,
      variables,
      searchElectronicFilingLoading,
      move_column,
      colomn_resize,
      dataSource,
      modalConfirmMail,
      rangeDate,
      typeCheckbox: [0, 2, -1],
      productionStatuses,
      onShow,
      modalStatus,
      companiesInElectronicLoading,
      companiesInElectronicDataSource,
      styleCheckBox,
      companiesInElectronic
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/style.scss';

:deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
  background: v-bind("styleCheckBox.ColorCheckBox");
  margin-top: -13px;
  margin-left: 3px;
}

:deep .dx-radiobutton-icon::before {
  border: 1px solid v-bind("styleCheckBox.ColorCheckBox");
  width: 14px;
  height: 14px;
}

:deep #tab3-bf620 {
  height: calc(70vh);

  :deep .dx-datagrid-total-footer {
    height: 77px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
  }

  :deep .dx-datagrid-headers {
    height: 27px;
  }

  :deep .dx-datagrid-rowsview {
    max-height: calc(calc(62vh) - 77px - 27px); // chiều cao bảng - chiều cao header - chiều cao footer
  }

  .dx-freespace-row {
    display: none !important; // cục lúc hiện lúc không
  }
}
</style>
