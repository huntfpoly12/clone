<template>
  <div id="step3">
    <a-row gutter="24" class="search-form-step-1 mt-10">
      <a-col>
        <a-form-item label="신고구분" label-align="left">
          <electronic-filing-type
            v-model:valueInput="dataSearch.type"
            :disabledList="[1, 2, 3, 4, 5, 6, 9]"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="제작요청일(기간)" label-align="left">
          <range-date-time-box
            v-model:valueDate="rangeDate"
            width="250px"
            :multi-calendars="true"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="제작상태" label-align="left">
          <div class="mt-2">
            <DxRadioGroup
              :data-source="typeCheckbox"
              item-template="radio"
              v-model:value="typeStatus"
              layout="horizontal"
              :icon-size="12"
            >
              <template #radio="{ data }: any">
                <production-status
                  :typeTag="0"
                  v-if="data == 0"
                  padding="0px 10px"
                />
                <production-status
                  :typeTag="4"
                  v-if="data == 2"
                  padding="1px 10px"
                />
                <production-status
                  :typeTag="5"
                  v-if="data == -1"
                  padding="1px 10px"
                />
              </template>
            </DxRadioGroup>
          </div>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="제작요청자"
          label-align="left"
          class="fix-width-label"
        >
          <list-manager-dropdown
            v-model:valueInput="dataSearch.productionRequestUserId"
            width="200px"
            filterData
          />
        </a-form-item>
      </a-col>
    </a-row>
    <div class="content-grid">
      <a-spin :spinning="loadingTable">
        <DxDataGrid
          id="tab3-bf640"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="electronicFilingId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          noDataText="내역이 없습니다"
        >
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem name="searchPanel" location="after" />
            <DxItem name="exportButton" location="after" />
          </DxToolbar>
          <DxPaging :enabled="false" />
          <DxLoadPanel :enabled="true" :showPane="true" />
          <DxColumn
            caption="일련번호"
            data-field="electronicFilingId"
            alignment="left"
            width="150"
          />
          <DxColumn caption="참고사항" data-field="referenceInformation" />
          <DxColumn
            caption="제작요청일시"
            data-field="productionRequestedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn caption="아이디" data-field="productionRequestUserId" />
          <DxColumn caption="제작현황" cell-template="제작현황" />
          <template #제작현황="{ data }: any" noDataText="내역이 없습니다">
            <production-status
              :typeTag="2"
              v-if="data.data.productionStatus == 0"
              padding="1px 10px"
            />
            <production-status
              :typeTag="3"
              v-if="data.data.productionStatus == 1"
              padding="1px 10px"
            />
            <production-status
              :typeTag="4"
              v-if="data.data.productionStatus == 2"
              padding="1px 10px"
            />
            <production-status
              :typeTag="5"
              v-if="data.data.productionStatus == -1"
              padding="1px 10px"
              :message="data.data.causeOfProductionFailure"
            />
          </template>
          <DxColumn caption="상세보기" width="80px" cell-template="action" />
          <template #action="{ data }: any">
            <div style="text-align: center">
              <img
                src="@/assets/images/searchPlus.png"
                style="width: 20px; height: 20px; margin-top: 0px"
                @click="openPopupDetail(data.data)"
              />
            </div>
          </template>
          <DxSummary>
            <!-- <DxTotalItem column="일련번호" summary-type="count" display-format="전체: {0}" />       -->
          </DxSummary>
        </DxDataGrid>
        <div
          style="
            border: 1px solid #ddd;
            border-top: none;
            width: 100%;
            display: flex;
            padding: 5px 0;
          "
          class="fs-14"
        >
          <div style="width: 250px; margin-left: 70px">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              전체
              <span style="font-size: 16px">[{{ dataSource.length }}]</span>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
  <ElectronicFilingFileProductions
    v-if="modalDetail"
    :modalStatus="modalDetail"
    @closePopup="modalDetail = false"
    :data="dataModalDetail"
  />
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, getCurrentInstance, watch } from "vue";
import { dataSearchStep3Utils } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxSelection,
  DxColumn,
  DxScrolling,
  DxSummary,
  DxTotalItem,
  DxPaging,
  DxToolbar,
  DxItem,
  DxSearchPanel,
  DxExport,
} from "devextreme-vue/data-grid";
import { DxRadioGroup } from "devextreme-vue/radio-group";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery } from "@vue/apollo-composable";
import ElectronicFilingFileProductions from "./ElectronicFilingFileProductions.vue";
import GetStatusTable from "./GetStatusTable.vue";
import { DxLoadPanel } from "devextreme-vue";
export default defineComponent({
  components: {
    SaveOutlined,
    DxDataGrid,
    DxSelection,
    DxColumn,
    DxSummary,
    DxTotalItem,
    DxScrolling,
    DxRadioGroup,
    ElectronicFilingFileProductions,
    GetStatusTable,
    DxLoadPanel,
    DxPaging,
    DxToolbar,
    DxItem,
    DxSearchPanel,
    DxExport,
  },
  props: {
    search: {
      type: Number,
    },
  },
  setup(props) {
    let modalDetail = ref(false);
    let typeStatus = ref(0);
    const app: any = getCurrentInstance();
    const styleCheckBox = app.appContext.config.globalProperties.$config_styles;
    let dataSearch = ref({ ...dataSearchStep3Utils });
    let typeCheckbox = ref([0, 2, -1]);
    let dataSource: any = ref([]);
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const rangeDate: any = ref([
      parseInt(dayjs().subtract(1, "week").format("YYYYMMDD")),
      parseInt(dayjs().format("YYYYMMDD")),
    ]);
    let trigger = ref(true);
    let dataModalDetail = ref();
    // ================== GRAPHQL=================
    //  QUERY : searchElectronicFilingFileProductions
    let {
      refetch: refetchTable,
      loading: loadingTable,
      onError: errorTable,
      onResult: resTable,
    } = useQuery(
      queries.searchElectronicFilingFileProductions,
      { filter: dataSearch.value },
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );

    resTable((val: any) => {
      dataSource.value = val.data.searchElectronicFilingFileProductions;
      trigger.value = false;
    });
    errorTable((error: any) => {
      //notification('error', error.message)
    });
    // ================= WATHCH ===================
    watch(typeStatus, (newVal) => {
      if (newVal == 0) dataSearch.value.productionStatuses = [2, -1];
      else dataSearch.value.productionStatuses = [newVal];
    });
    watch(
      () => props.search,
      (val: any) => {
        dataSearch.value.requesteStartDate = rangeDate.value[0];
        dataSearch.value.requesteFinishDate = rangeDate.value[1];
        trigger.value = true;
      },
      { deep: true }
    );
    // ============== FUNCTION =====================
    const openPopupDetail = (data: any) => {
      modalDetail.value = true;
      dataModalDetail.value = {
        electronicFilingId: data.electronicFilingId,
        type: dataSearch.value.type,
      };
    };
    return {
      dataModalDetail,
      typeStatus,
      activeKey: ref("1"),
      rangeDate,
      styleCheckBox,
      typeCheckbox,
      dataSearch,
      dataSource,
      colomn_resize,
      move_column,
      modalDetail,
      openPopupDetail,
      loadingTable,
    };
  },
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
<style lang="scss" scoped>
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
:deep .dx-radio-value-container {
  padding-right: 0px;
}
:deep .dx-radiobutton {
  line-height: 18px;
}
:deep .dx-radiogroup-horizontal .dx-radiobutton {
  margin-right: 0px;
}
</style>
