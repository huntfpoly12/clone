<template>
  <div class="tab-group">
    <div class="search-group tab-3">
      <div>
        <a-row justify="start" :gutter="[16, 8]">
          <a-col>
            <a-form-item label="신고구분 :">
              <electronic-filing-type v-model:valueInput="ElecFilingFileFilter.type" width="200px"></electronic-filing-type>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="제작요청일(기간)">
              <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"></range-date-time-box>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="제작상태">
              <DxRadioGroup :data-source="typeCheckbox" item-template="radio" v-model="productionStatuses" layout="horizontal" :icon-size="12">
                <template #radio="{ data }">
                  <production-statuses :typeTag="0" v-if="data == 0" padding="0px 10px" />
                  <production-statuses :typeTag="4" v-if="data == 2" padding="1px 10px" />
                  <production-statuses :typeTag="5" v-if="data == -1" padding="1px 10px" />
                </template>
              </DxRadioGroup>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="매니저리스트">
              <list-manager-dropdown width="150px" v-model:valueInput="ElecFilingFileFilter.manageUserId" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="content-grid mt-10">
      <a-spin :spinning="searchElectronicFilingLoading" size="large">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="companyId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="코드명" data-field="fileStorageId" />
          <DxColumn caption="신고구분" cell-template="reportType" />
          <DxColumn caption="제작요청일시" cell-template="productionRequestedAt" />
          <DxColumn caption="아이디" cell-template="productionRequestUserId" />
          <DxColumn caption="제작현황" cell-template="productionStatus" />
          <DxColumn caption="상세보기" cell-template="afterDeadline" />
          <template #afterDeadline="{ data }">
            <div @click="onShow">Kính lúp</div>
          </template>
        </DxDataGrid>
        <div @click="onShow">Kính lúp</div>
      </a-spin>
    </div>
    {{ modalStatus }}z
    <a-modal :visible="modalStatus" @cancel="modalStatus = false" :mask-closable="false" class="confirm-md" footer="" :width="700">
      <a-spin :spinning="companiesInElectronicLoading">
        <br />
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="companiesInElectronicDataSource"
          :show-borders="true"
          key-expr="code"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="사업자코드" data-field="code" />
          <DxColumn caption="사업자번호" cell-template="bizNumber" />
          <DxColumn caption="상호" cell-template="name" />
          <DxColumn caption="대표자명" cell-template="presidentName" />
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
import SearchArea from './SearchArea.vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { DxButton } from 'devextreme-vue/select-box';
import DxDataGrid, { DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import DxRadioGroup from 'devextreme-vue/radio-group';
import filters from '@/helpers/filters';
export default defineComponent({
  components: {
    SearchArea,
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxRadioGroup,
    DxSummary,
    DxTotalItem,
  },
  props: {
    search: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const rangeDate = ref([filters.formatDateToInterger(dayjs()), filters.formatDateToInterger(dayjs())]);
    const ElecFilingFileFilter = reactive({
      type: 1,
      requesteStartDate: rangeDate.value[0],
      requesteFinishDate: rangeDate.value[1],
      productionStatuses: [2, -1],
      manageUserId: 1,
    });
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const productionStatuses = ref(0);
    const app: any = getCurrentInstance();
    const styleCheckBox = app.appContext.config.globalProperties.$config_styles;
    //Report file
    const modalConfirmMail = ref(false);

    //Search with holding and data source

    const dataSource = ref([]);
    const searchElectronicFilingTrigger = ref(false);
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
      searchElectronicFilingTrigger.value = false;
      dataSource.value = data;
      companiesInElectronic.electronicFilingId = data.electronicFilingId;
    });

    // Get Companies detail and data source

    const companiesInElectronicDataSource = ref([]);
    const companiesInElectronicTrigger = ref(false);
    const modalStatus = ref<boolean>(false);
    const companiesInElectronic = reactive({
      type: 1,
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
      companiesInElectronicTrigger.value = false;
      companiesInElectronicDataSource.value = data;
    });
    const onShow = () => {
      modalStatus.value = true;
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
      console.log(`output->newVal[0]`, newVal);
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
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/style.scss';
::v-deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
  background: v-bind('styleCheckBox.ColorCheckBox');
  margin-top: -13px;
  margin-left: 3px;
}

::v-deep .dx-radiobutton-icon::before {
  border: 1px solid v-bind('styleCheckBox.ColorCheckBox');
  width: 14px;
  height: 14px;
}

::v-deep .dx-radio-value-container {
  padding-right: 0px;
}

::v-deep .dx-radiobutton {
  line-height: 18px;
}

::v-deep .dx-radiogroup-horizontal .dx-radiobutton {
  margin-top: 6px;
}
</style>