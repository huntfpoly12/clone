<template>
  <div id="bf-210">
    <div class="search-form">
      <div id="components-grid-demo-flex">
        <a-row justify="start" :gutter="[16, 8]">
          <a-col>
            <label class="lable-item"> 영업자등급 : </label>
            <a-select ref="select" v-model:value="dataSearch.status" style="width: 100px">
              <a-select-option value="전체">전체</a-select-option>
              <a-select-option value="본사">본사</a-select-option>
              <a-select-option value="지사">지사</a-select-option>
              <a-select-option value="대리점">대리점</a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <label class="lable-item">영업자명:</label>
            <a-input style="width: 120px" v-model:value="dataSearch.nameCompany" />
          </a-col>
          <a-col>
            <label class="lable-item">영업자코드:</label>
            <a-input style="width: 120px" v-model:value="dataSearch.surrogate" />
          </a-col>
          <a-col>
            <label class="lable-item">상태 :</label>
            <a-select style="width: 100px" v-model:value="dataSearch.nameSale" option-label-prop="children">
              <a-select-option value="정상" label="정상">
                <a-tag :color="getColorTag('정상')">정상</a-tag>
              </a-select-option>
              <a-select-option value="전체" label="전체">
                <a-tag :color="getColorTag('전체')">전체</a-tag>
              </a-select-option>
              <a-select-option value="해지" label="해지">
                <a-tag :color="getColorTag('해지')">해지</a-tag>
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="page-content">
      <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting" >
        <DxPaging :page-size="5" />

        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
        <DxExport :enabled="true" :allow-export-selected-data="true" />
        
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" />
          <DxItem location="after" template="button-template"  css-class="cell-button-add"/>
          <DxItem name="groupPanel" />
         
          <DxItem name="addRowButton" show-text="always"/>
          <DxItem name="columnChooserButton" />
        </DxToolbar>
        <template #button-template>
          <DxButton icon="plus" @click="openAddNewModal" />
        </template>
        <DxColumn data-field="영업자코드" :width="100" css-class="cell-center"/>
        <DxColumn data-field="상태" cell-template="grid-cell" css-class="cell-center" :width="100"/>
        <template #grid-cell="{ data }">
            <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="영업자명" css-class="cell-center" :width="100"/>
        <DxColumn data-field="등급" css-class="cell-center" :width="100"/>
        <DxColumn data-field="주소"/>
        <DxColumn data-field="연락처" :width="100"/>
        <DxColumn data-field="휴대폰" :width="100"/>
        <DxColumn data-field="가입일자" data-type="date" :width="100"/>
        <DxColumn data-field="해지일자" data-type="date" :width="100"/>
        <DxColumn data-field="사업자소" data-type="number" :width="100"/>
        <DxColumn :width="100" cell-template="pupop" />
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
      <AddNew210Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
      <EditBF210Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData" /> 
      <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData" title="변경이력[cm-000-pop]"/> 
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
  DxItem
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
import { EditOutlined, HistoryOutlined, LoginOutlined} from "@ant-design/icons-vue";
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
    HistoryPopup
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
    openAddNewModal(){
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
<style>
.cell-button-add{
  padding-left: 100px !important;
}
.cell-center{
  text-align: center!important  
}
.dx-button-has-text .dx-button-content {
  padding: 0px 15px !important;
}

.search-form {
  background: #f1f3f4;
  padding: 10px 24px;
}

#data-grid-demo {
  min-height: 700px;
}

.dx-select-checkbox {
  display: inline-block !important;
}

.search-form .col {
  display: flex;
  align-items: center;
}

.search-form .col {
  margin-top: 20px;
}

.search-form .col .lable-item {
  width: 110px;
  display: inline-block;
}

.search-form .col .item:nth-child(2) {
  margin-left: 30px;
}
</style>
