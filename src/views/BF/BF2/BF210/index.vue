<template>
  <div id="bf-210">
    <div class="search-form">
      <div id="components-grid-demo-flex">
        <a-row justify="start" :gutter="[16, 8]">
          <a-col>
            <label class="lable-item"> 회원종류 : </label>
            <a-select
              ref="select"
              v-model:value="dataSearch.status"
              style="width: 150px"
            >
              <a-select-option value=" 전체">전체</a-select-option>
              <a-select-option value="본사">본사</a-select-option>
              <a-select-option value="지사">지사</a-select-option>
              <a-select-option value="대리점">대리점</a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <label class="lable-item">소속코드:</label>
            <a-input
              style="width: 150px"
              v-model:value="dataSearch.nameCompany"
            />
          </a-col>
          <a-col>
            <label class="lable-item">소속명:</label>
            <a-input
              style="width: 150px"
              v-model:value="dataSearch.surrogate"
            />
          </a-col>
          <a-col>
            <label class="lable-item">회원ID :</label>
            <a-input
              style="width: 150px"
              v-model:value="dataSearch.surrogate"
            />
          </a-col>
          <a-col>
            <label class="lable-item">회원명 :</label>
            <a-input
              style="width: 150px"
              v-model:value="dataSearch.surrogate"
            />
          </a-col>
          <a-col style="display: flex; align-items: center">
            <a-checkbox v-model:checked="dataSearch.typeSevice1"
              >이용중</a-checkbox
            >
            <a-checkbox v-model:checked="dataSearch.typeSevice2"
              >이용중지</a-checkbox
            >
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="page-content">
      <DxDataGrid
        :data-source="dataSource"
        :show-borders="true"
        key-expr="ID"
        @exporting="onExporting"
      >
        <DxPaging :page-size="5" />
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

        <DxColumn
          data-field="상태"
          cell-template="grid-cell"
          css-class="cell-center"
        />
        <DxColumn data-field="코드" css-class="cell-center" />
        <template #grid-cell="{ data }">
          <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="회원명" css-class="cell-center" />
        <DxColumn data-field="회원종류" css-class="cell-center" />
        <DxColumn data-field="휴대폰" />
        <DxColumn data-field="소속코드" />
        <DxColumn data-field="소속명" />
        <DxColumn cell-template="pupop" :width="100" />
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
              <a-tooltip placement="top">
                <template #title>로그인이력</template>
                <login-outlined />
              </a-tooltip>
            </a-space>
          </div>
        </template>
      </DxDataGrid>

      <AddNew210Poup
        :modalStatus="modalAddNewStatus"
        @closePopup="modalAddNewStatus = false"
      />
      <EditBF210Popup
        :modalStatus="modalEditStatus"
        @closePopup="modalEditStatus = false"
        :data="popupData"
      />
      <HistoryPopup
        :modalStatus="modalHistoryStatus"
        @closePopup="modalHistoryStatus = false"
        :data="popupData"
        title="변경이력[cm-000-pop]"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
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
  DxItem,
} from "devextreme-vue/data-grid";

import EditBF210Popup from "./components/EditBF210Popup.vue";
import AddNew210Poup from "./components/AddNew210Poup.vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import Style from "./style/style.scss";
import DxButton from "devextreme-vue/button";
import { employees } from "./data.js";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  EditOutlined,
  HistoryOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
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
    EditOutlined,
    HistoryOutlined,
    LoginOutlined,
    Style,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    AddNew210Poup,
    EditBF210Popup,
    HistoryPopup,
  },
  data() {
    return {
      dataSource: employees,
      options: [
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "tom",
          label: "Tom Halin Sin Han Bank",
        },
      ],
      popupData: [],
      modalAddNewStatus: false,
      modalEditStatus: false,
      modalHistoryStatus: false,
      dataSearch: {
        typeSevice: "전체",
        nameCompany: "",
        surrogate: "",
        status: "전체",
        address: "",
        manager: "",
        nameSale: "정상",
      },
    };
  },
  methods: {
    onExporting(e) {
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
            "DataGrid.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    openAddNewModal() {
      this.modalAddNewStatus = true;
    },
    setModalEditVisible(data) {
      this.modalEditStatus = true;
      this.popupData = data;
    },
    modalHistory(data) {
      this.modalHistoryStatus = true;
      this.popupData = data;
    },

    getColorTag(data) {
      if (data === "정상") {
        return "#108ee9";
      } else if (data === "해지") {
        return "#cd201f";
      } else if (data === "전체") {
        return "grey";
      }
    },
  },
});
</script>
