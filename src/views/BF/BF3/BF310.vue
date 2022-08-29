<template>
    <div id="bf-310">
      <a-typography-title :level="2">계약정보관리&심사 </a-typography-title>
      <div class="search-form">
        <div class="col">
          <div class="item">
            <label class="lable-item">
            서비스종류 :
            </label>
            <a-checkbox v-model:checked="checked">회계</a-checkbox>
            <a-checkbox v-model:checked="checked">원천</a-checkbox>
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
              <a-select-option value="E 본사영업사원">E 본사영업사원</a-select-option>
            </a-select>
          </div>
          <div class="item">
            <label class="lable-item">신청기간 :</label>
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
      >
      <DxSelection mode="multiple"/>
      <DxPaging :page-size="5"/>
        <DxEditing
          :allow-updating="true"
          :allow-adding="true"
          :allow-deleting="false"
          mode="popup"
        >
          <DxPopup
            :show-title="true"
            :width="700"
            :height="525"
            title="Employee Info"
          />
          <DxForm>
            <DxItem
              :col-count="2"
              :col-span="2"
              item-type="group"
            >
              <DxItem data-field="FirstName"/>
              <DxItem data-field="LastName"/>
              <DxItem data-field="Prefix"/>
              <DxItem data-field="BirthDate"/>
              <DxItem data-field="Position"/>
              <DxItem data-field="HireDate"/>
              <DxItem
                :col-span="2"
                :editor-options="{ height: 100 }"
                data-field="Notes"
                editor-type="dxTextArea"
              />
            </DxItem>
  
            <DxItem
              :col-count="2"
              :col-span="2"
              item-type="group"
              caption="Home Address"
            >
              <DxItem data-field="StateID"/>
              <DxItem data-field="Address"/>
            </DxItem>
          </DxForm>
        </DxEditing>
        <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            />
        <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
      />
        <DxColumn data-field="신청일자"/>
        <DxColumn data-field="신청코드"/>
        <DxColumn
          data-field="심사상태"
          data-type="date"
          cell-template="grid-cell"
        />
         <template #grid-cell="{ data }">
            <a-tag :color="getColorTag(data.value)">{{data.value}}</a-tag>
        </template>
        <DxColumn
          :width="170"
          data-field="사업자코드"
        />
        <DxColumn
          data-field="상호"
          data-type="date"
        />
        <DxColumn
          data-field="주소"
          data-type="date"
        />
        <DxColumn
          data-field="대표자"
        />
        <DxColumn
          data-field="영업자"
        />
        <DxColumn
          data-field="신청서비스"
        />
        <DxColumn
          data-field="부가서비스"
        />
      </DxDataGrid>
    </div>
  </template>
  <script>
  import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxPopup,
    DxForm,
    DxExport,
    DxSelection,
    DxSearchPanel
  } from 'devextreme-vue/data-grid';
  import { DxItem } from 'devextreme-vue/form';
  import { employees, states } from './data.js';
  import { Workbook } from 'exceljs';
  import { saveAs } from 'file-saver-es';
  import { exportDataGrid } from 'devextreme/excel_exporter';
  export default {
    components: {
      DxDataGrid,
      DxColumn,
      DxPaging,
      DxEditing,
      DxPopup,
      DxForm,
      DxItem,
      DxSelection,
      DxExport,
      DxSearchPanel
    },
    data() {
      return {
        dataSource: employees,
        states,
        value1: '신청',
        value2: 'A 대리점',
        dateFormat: 'YYYY/MM/DD'
      };
    },
    computed: {

    },
    methods: {
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('employees');

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
      });
      e.cancel = true;
    },
    customClass(cellInfo) {
        return cellInfo.value
    },
    getColorTag(data) {
      if(data === '신청') {
        return 'red'
      } else if (data === '심사중') {
        return 'blue'
      } else if (data === '승인') {
        return 'green'
      } else if (data === '반려') {
        return 'grey'
      }
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
  .search-form .col  {
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