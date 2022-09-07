<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="bf-310">
    <a-typography-title :level="2">계약정보관리&심사 </a-typography-title>
    <div class="search-form">
      <div class="col">
        <div class="item">
          <label class="lable-item"> 서비스종류 : </label>
          <a-checkbox v-model:checked="checbox1">회계</a-checkbox>
          <a-checkbox v-model:checked="checbox2">원천</a-checkbox>
        </div>
        <div class="item">
          <label class="lable-item">심사상태/결과 :</label>
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 120px"
            @focus="focus"
            placeholder="전체"
            @change="handleChange"
          >
            <a-select-option value="신청">신청</a-select-option>
            <a-select-option value="심사중">심사중</a-select-option>
            <a-select-option value="승인">승인</a-select-option>
            <a-select-option value="반려 ">반려</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col">
        <div class="item">
          <label class="lable-item">심사상태/결과 :</label>
          <a-select
            ref="select"
            v-model:value="value2"
            style="width: 120px"
            @focus="focus"
            placeholder="전체"
            @change="handleChange"
          >
            <a-select-option value="A 대리점">A 대리점</a-select-option>
            <a-select-option value="C 영업사원">C 영업사원</a-select-option>
            <a-select-option value="D 영업사원">D 영업사원</a-select-option>
            <a-select-option value="E 본사영업사원"
              >E 본사영업사원</a-select-option
            >
          </a-select>
        </div>
        <div class="item">
          <label class="lable-item" style="margin-right: 7px">신청기간 :</label>
          <a-range-picker v-model:value="value4" :format="dateFormat" />
        </div>
      </div>
      <a-button class="search" type="primary">검색</a-button>
    </div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      key-expr="ID"
      @exporting="onExporting"
      :columns="gridColumns"
    >
      <DxSelection mode="multiple" />
      <DxPaging :page-size="5" />

      <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxColumn data-field="신청일자" />
      <DxColumn data-field="신청코드" />
      <DxColumn
        data-field="심사상태"
        data-type="date"
        cell-template="grid-cell"
      />
      <template #grid-cell="{ data }">
        <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
      </template>
      <DxColumn :width="170" data-field="사업자코드" />
      <DxColumn data-field="상호" data-type="date" />
      <DxColumn data-field="주소" data-type="date" />
      <DxColumn data-field="대표자" />
      <DxColumn data-field="영업자" />
      <DxColumn data-field="신청서비스" />
      <DxColumn data-field="부가서비스" />
      <DxColumn :width="110" cell-template="pupop" />
      <template #pupop="{ data }">
        <DxButton @click="setModalVisible(data)" text="편집" />
      </template>
    </DxDataGrid>
    <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false " :data="popupData"/>

    <a-date-picker
      v-model:value="valueDate"
      format="YYYY-MM-DD"
      :locale="locale"
      :autofocus="true"
      :showNow="true"
      @openChange="test"
    />

    <DxDateBox
            :show-clear-button="true"
            :use-mask-behavior="true"
         
            placeholder="10/16/2018"
            :display-format="formatter"
            type="date"
            @focusIn="dateOnFocus"
          />
  </div>
  <!-- dddd -->
</template>
  <script lang="ts">
    import DxDateBox from 'devextreme-vue/date-box';
    import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
    import { ref } from 'vue';
import BF310Popup from "./components/BF310Popup.vue";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import { employees, states } from "../BF310/data.js";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";

import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    BF310Popup,
    locale,
    DxDateBox
  },
  data() {
    return {
      dataSource: employees,
      states,
      value1: "신청",
      value2: "A 대리점",
      dateFormat: "YYYY/MM/DD",
      checbox1: true,
      checbox2: true,
      value4: [dayjs(), dayjs().add(1, "year")],
      gridColumns: ["심사상태", "사업자코드", "상호"],
      gridBoxValue: [3],
      gridDataSource: employees,
      modalStatus: false,
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      formState: {
        name: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      popupData:[],
      valueDate: ref<Dayjs>(),
      formatter:  (date)=>{
       
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
      
          return `${day}/${month}/${year}`;
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
    customClass(cellInfo) {
      return cellInfo.value;
    },
    getColorTag(data) {
      if (data === "신청") {
        return "red";
      } else if (data === "심사중") {
        return "blue";
      } else if (data === "승인") {
        return "green";
      } else if (data === "반려") {
        return "grey";
      }
    },
    setModalVisible(data) {
      this.popupData = data;
      this.modalStatus = true;
    },
    test(){
     
    },
    dateOnFocus(e){
      e.element.querySelector('.dx-texteditor-input').select();
    }
  },
};
</script>
  <style>
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

.search {
  margin-top: 20px;
}
</style>