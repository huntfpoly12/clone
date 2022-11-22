<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="계약정보관리&심사" @actionSearch="searching" />
    <div id="pa-430">
      <div class="search-form">
        <a-row :gutter="[24, 8]">
          <div class="dflex custom-flex">
            <a-col>
              <label class="lable-item">귀속/지급 :</label>
              <switch-basic
                v-model:valueSwitch="originData.excludeCancel"
                :textCheck="'포함'"
                :textUnCheck="'제외'"
              />
            </a-col>
            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item">영수일:</label>
                <a-range-picker
                  :placeholder="['Start month', 'End month']"
                  format="YYYY-MM"
                  :value="value"
                  :mode="mode2"
                  @panelChange="handlePanelChange2"
                  @change="handleChange"
                />
              </div>
            </a-col>

            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item">귀속/지급 :</label>
                <radio-group
                  :arrayValue="arrayRadioCheck"
                  v-model:valueRadioCheck="valueRadioBox"
                  :layoutCustom="'horizontal'"
                />
              </div>
            </a-col>
          </div>

          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">서식 설정 :</label>
              <span>
                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
              </span>
            </div>
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">영수일:</label>
              <date-time-box
                width="300px"
                dateFormat="YYYY-MM-DD"
              ></date-time-box>
            </div>
          </a-col>
          <a-col>
            <label class="lable-item">소득자보관용 :</label>
            <switch-basic
              v-model:valueSwitch="originData.excludeCancel2"
              :textCheck="'발행자보관용'"
              :textUnCheck="'발행자보관용'"
            />
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="id"
          @exporting="onExporting"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxPaging :page-size="rowTable" />
          <DxExport :enabled="true" :allow-export-selected-data="true" />
          <DxToolbar>
            <DxItem name="exportButton" />
            <DxItem name="page" template="pagination-table" location="after" />
            <DxItem name="searchPanel" />
          </DxToolbar>
          <template #pagination-table>
            <div v-if="rowTable > originData.rows">
              <a-pagination
                v-model:current="originData.page"
                v-model:page-size="originData.rows"
                :total="rowTable"
                show-less-items
                @change="searching"
              />
            </div>
          </template>
          <DxColumn data-field="checkbox" caption="Select Box" />
          <DxColumn data-field="employInfo" caption="사원" />
          <DxColumn data-field="phancong" caption="구분 " />
          <DxColumn
            data-field="createdAt"
            caption="입사일 (정산시작일)"
            cell-template="createdat-cell"
            data-type="date"
          />
          <DxColumn
            data-field="createdAt"
            caption="퇴사일 (정산종료일)"
            cell-template="createdat-cell"
            data-type="date"
          />
          <DxColumn
            data-field="createdAt"
            caption="귀속연월"
            cell-template="createdat-cell"
            data-type="date"
          />
          <DxColumn
            data-field="createdAt"
            caption="지급연월"
            cell-template="createdat-cell"
            data-type="date"
          />
          <DxColumn data-field="companyName" caption="상호" />
          <DxColumn data-field="companyAddress" caption="주소" />
          <DxColumn data-field="presidentName" caption="대표자" />
          <DxColumn caption="신청서비스" cell-template="acc-service" />
          <template #acc-service="{ data }">
            <span
              >회계
              <a-popover>
                <template #content>
                  <a-table
                    :columns="[
                      {
                        title: 'Name',
                        dataIndex: 'name',
                      },
                      {
                        title: 'Year Month',
                        dataIndex: 'startYearMonth',
                      },
                    ]"
                    :data-source="data.data.simpleAccountingInfos"
                    bordered
                    :pagination="false"
                  >
                  </a-table>
                </template>
                <a-tag v-if="data.data.simpleAccountingInfos"
                  >{{ data.data.simpleAccountingInfos.length }}
                </a-tag>
              </a-popover>
            </span>
            <span
              >원천
              <a-popover>
                <template #content>
                  <a-table
                    :columns="[
                      {
                        title: 'Name',
                        dataIndex: 'name',
                      },
                      {
                        title: 'Year Month',
                        dataIndex: 'startYearMonth',
                      },
                    ]"
                    :data-source="[data.data.simpleWithholdingInfo]"
                    bordered
                    :pagination="false"
                  >
                  </a-table>
                </template>
                <a-tag>1</a-tag>
              </a-popover>
            </span>
          </template>
          <DxColumn :width="80" cell-template="pupop" type="buttons" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action">
              <div
                style="color: blue; cursor: pointer"
                @click="setModalVisible(data)"
              >
                편집
              </div>
            </div>
          </template>
        </DxDataGrid>
        <div class="pagination-table" v-if="rowTable > originData.rows">
          <a-pagination
            v-model:current="originData.page"
            v-model:page-size="originData.rows"
            :total="rowTable"
            show-less-items
            @change="searching"
          />
        </div>
        <BF310Popup
          :modalStatus="modalStatus"
          @closePopup="modalStatus = false"
          :data="idSubRequest"
        />
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import {
  SearchOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxPager,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";
import BF310Popup from "./components/BF310Popup.vue";
import queries from "../../../../graphql/queries/BF/BF3/BF310/index";
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon } from "../../../../helpers/commonFunction";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    BF310Popup,
    SearchOutlined,
    EditOutlined,
    DxPager,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    DxToolbar,
    DxItem,
  },
  setup() {
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const rangeDate = ref([dayjs().subtract(1, "year"), dayjs()]);
    const dataSource = ref([]);
    const modalStatus = ref(false);
    const idSubRequest = ref();
    const statuses: any = ref([]);
    const trigger = ref<boolean>(true);
    const rowTable = ref();
    const originData = reactive({
      ...dataSearchIndex,
      rows: per_page,
    });
    const arrayRadioCheck = ref([
      { id: 0, text: "전체" },
      { id: 1, text: "퇴직소득" },
      { id: 2, text: "중간정산" },
    ]);
    const valueRadioBox = ref(arrayRadioCheck.value[2]);
    const mode2 = ref(["month", "month"]);
    const value = ref([]);
    const handleChange = (val: any) => {
      value.value = val;
    };
    const handlePanelChange2 = (val: any, mode: any) => {
      value.value = val;
      mode2.value = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1],
      ];
    };
    const setModalVisible = (data: any) => {
      idSubRequest.value = data.data.id;
      modalStatus.value = true;
    };
    const {
      refetch: refetchData,
      loading,
      error,
      result,
    } = useQuery(
      queries.searchSubscriptionRequests,
      { filter: originData },
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };
    const getColorTag = (data: any) => {
      if (data == 10) {
        return { name: "red", tag_name: "신청" };
      } else if (data == 20) {
        return { name: "blue", tag_name: "심사중" };
      } else if (data == 30) {
        return { name: "green", tag_name: "승인" };
      } else if (data == 99) {
        return { name: "grey", tag_name: "반려" };
      }
    };
    const formarDate = (date: any) => {
      return dayjs(date).format("YYYY-MM-DD");
    };
    const searching = () => {
      originData.startDate = formarDate(rangeDate.value[0]);
      originData.finishDate = formarDate(rangeDate.value[1]);
      originData.statuses =
        statuses.value == 0 ? [10, 20, 30, 99] : statuses.value;
      trigger.value = true;
      refetchData();
    };
    watch(result, (value) => {
      if (value) {
        rowTable.value = value.searchSubscriptionRequests.totalCount;
        dataSource.value = value.searchSubscriptionRequests.datas;
        trigger.value = false;
      }
    });
    return {
      loading,
      valueRadioBox,
      arrayRadioCheck,
      mode2,
      value,
      handleChange,
      handlePanelChange2,
      move_column,
      colomn_resize,
      rangeDate,
      idSubRequest,
      dataSource,
      modalStatus,
      rowTable,
      setModalVisible,
      originData,
      statuses,
      searching,
      getColorTag,
      onExporting,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss" />
