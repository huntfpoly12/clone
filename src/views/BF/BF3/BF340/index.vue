<template>
  <a-spin :spinning="loading" size="large">
    <div class="top-content">
      <a-typography-title :level="3"> 영업자관리 </a-typography-title>
      <div class="list-action">
        <a-tooltip>
          <template #title>조회</template>
          <a-button @click="searching">
            <SearchOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip>
          <template #title>저장</template>
          <a-button>
            <SaveOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip>
          <template #title>삭제</template>
          <a-button>
            <DeleteOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip>
          <template #title>출력</template>
          <a-button>
            <PrinterOutlined />
          </a-button>
        </a-tooltip>
      </div>
    </div>

    <div id="bf-340">
      <div class="search-form">
        <div id="components-grid-demo-flex">
          <a-row justify="start" :gutter="[16, 8]">
            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item"> 영업자등급 :</label>
                <sale-grade-select-box
                  v-model:valueInput="saleGrade"
                  width="120px"
                  placeholder="전체"
                  :selectAll="true"
                />
              </div>
            </a-col>
            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item">영업자명:</label>
                <default-text-box
                  v-model:valueInput="originData.name"
                  width="120px"
                ></default-text-box>
              </div>
            </a-col>
            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item">영업자코드:</label>
                <default-text-box
                  v-model:valueInput="originData.code"
                  width="120px"
                ></default-text-box>
              </div>
            </a-col>
            <a-col>
              <div class="dflex custom-flex">
                <label class="lable-item">상태 :</label>
                <sale-status-select-box
                  v-model:valueInput="saleStatus"
                  placeholder="전체"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="page-content">
        <DxDataGrid
          :data-source="dataSource"
          :show-borders="true"
          key-expr="id"
          @exporting="onExporting"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxScrolling column-rendering-mode="virtual" />

          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxExport :enabled="true" :allow-export-selected-data="true" />
          <DxToolbar>
            <DxItem name="searchPanel" />
            <DxItem name="exportButton" />
            <DxItem
              location="after"
              template="button-template"
              css-class="cell-button-add"
            />
            <DxItem name="groupPanel" />
            <DxItem name="addRowButton" show-text="always" />
            <DxItem name="columnChooserButton" />
          </DxToolbar>

          <template #button-template>
            <DxButton icon="plus" @click="openAddNewModal" />
          </template>
          <DxColumn caption="영업자코드" data-field="code" />
          <DxColumn
            caption="상태"
            data-field="status"
            data-type="text"
            cell-template="grid-cell"
          />
          <template #grid-cell="{ data }">
            <a-tag :color="getColorTag(data.value)">
              {{ data.value == 1 ? "정상" : data.value == 2 ? "해지" : "전체" }}
            </a-tag>
          </template>
          <DxColumn caption="영업자명" data-field="name" />
          <DxColumn caption="등급" data-field="grade" data-type="text" cell-template="grade-cell"/>
          <template #grade-cell="{ data }">
              {{ getEnumValue(SalesRepresentativeGrade,data.value) }}
          </template>
          <DxColumn caption="주소" data-field="address" />
          <DxColumn caption="연락처" data-field="phone" />
          <DxColumn caption="휴대폰" data-field="mobilePhone" />
          <DxColumn
            caption="가입일자"
            data-field="registerDate"
            data-type="date"
          />
          <DxColumn
            caption="해지일자"
            data-field="cancelDate"
            data-type="date"
          />
          <DxColumn
            caption="사업자수"
            data-field="companyCount"
            data-type="number"
            cell-template="grid-number"
          />
          <template #grid-number="{ data }">
            {{ $filters.formatCurrency(data.value) }}
          </template>
          <DxColumn :width="80" cell-template="pupop" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action">
              <a-space :size="10">
                <a-tooltip placement="top">
                  <template #title>편집</template>
                  <EditOutlined @click="setModalEditVisible(data)" />
                </a-tooltip>
                <a-tooltip placement="top">
                  <template #title>변경이력</template>
                  <HistoryOutlined @click="modalHistory(data)" />
                </a-tooltip>
              </a-space>
            </div>
          </template>
        </DxDataGrid>

        <div class="pagination-table" v-if="rowTable > originData.rows">
          <a-pagination
            v-model:current="originData.page"
            v-model:page-size="originData.rows"
            :total="rowTable"
            show-less-items
            style="margin-top: 10px"
            @change="changePage"
          />
        </div>

        <AddNew340Poup
          :modalStatus="modalAddNewStatus"
          @closePopup="modalAddNewStatus = false"
        />
        <EditBF340Popup
          :modalStatus="modalEditStatus"
          @closePopup="modalEditStatus = false"
          :data="popupData"
          :idSaleEdit="idRowEdit"
        />
        <HistoryPopup
          :modalStatus="modalHistoryStatus"
          @closePopup="modalHistoryStatus = false"
          :data="popupData"
          title="변경이력[cm-000-pop]"
          :idRowEdit="idRowEdit"
          typeHistory="bf-340"
        />
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive,computed } from "vue";
import { useStore } from 'vuex';
import {
  SalesRepresentativeGrade,
  getEnumValue,
} from "@bankda/jangbuda-common";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import notification from "../../../../utils/notification";
import { exportDataGrid } from "devextreme/excel_exporter";
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
} from "devextreme-vue/data-grid";
import {
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";

import EditBF340Popup from "./components/EditBF340Popup.vue";
import AddNew340Poup from "./components/AddNew340Poup.vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import queries from "../../../../graphql/queries/BF/BF3/BF340/index";
import { origindata } from "./utils";
dayjs.extend(weekday);
dayjs.extend(localeData);

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    EditOutlined,
    HistoryOutlined,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    AddNew340Poup,
    EditBF340Popup,
    HistoryPopup,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
  },
  setup() {
    const store = useStore();
    
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const popupData = ref([]);
    const modalAddNewStatus = ref<boolean>(false);
    const modalEditStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);

    const saleGrade = ref<number>(0);
    const saleStatus = ref<number>(1);
    var idRowEdit = ref<number>(0);

    const originData = reactive({ ...origindata,rows:per_page.value });
    const rowTable = ref(0);
    const dataSource = ref([]);
    const trigger = ref<boolean>(true);

    const {
      refetch: refetchData,
      loading,
      onError,
      result,
    } = useQuery(queries.getDataSale, originData, () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            }));

    onError((error) => {
      notification('error',error.message);
    });

    watch(result, (value) => {
      if (value) {
        rowTable.value = value.searchSalesRepresentatives.totalCount;
        dataSource.value = value.searchSalesRepresentatives.datas;
        trigger.value = false;
      }
    });

    const onExporting = (e: { component: any; cancel: boolean }) => {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("employees");
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "영업자관리.xlsx"
          );
        });
      });
      e.cancel = true;
    };

    const openAddNewModal = () => {
      modalAddNewStatus.value = true;
    };

    watch(modalAddNewStatus, (newValue, old) => {
      if (!newValue) {
        refetchData();
      }
    });
    const setModalEditVisible = (data: any) => {
      idRowEdit.value = data.data.id;
      modalEditStatus.value = true;
      popupData.value = data;
    };

    watch(modalEditStatus, (newValue, old) => {
      if (!newValue) {
        refetchData();
      }
    });

    const modalHistory = (data: any) => {
      modalHistoryStatus.value = true;
      popupData.value = data;
    };

    const getColorTag = (data: any) => {
      if (data === 1) {
        return "#108ee9";
      } else if (data === 2) {
        return "#cd201f";
      } else if (data === 3) {
        return "grey";
      }
    };

    const searching = () => {
      originData.grade = saleGrade.value == 0 ? null : saleGrade.value;
      originData.statuses = [saleStatus.value];
      trigger.value = true;
      refetchData();
    };

    const changePage = () => {
      searching();
    };

    return {
      loading,
      move_column,
      colomn_resize,
      onExporting,
      searching,
      dataSource,
      idRowEdit,
      refetchData,
      saleStatus,
      saleGrade,
      originData,
      rowTable,
      changePage,
      getColorTag,
      modalHistory,
      setModalEditVisible,
      openAddNewModal,
      popupData,
      modalAddNewStatus,
      modalEditStatus,
      modalHistoryStatus,
      getEnumValue,
      SalesRepresentativeGrade
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>
