<template>
    <div id="bf-310">
        <a-typography-title :level="2">계약정보관리&심사 </a-typography-title>
        <div class="search-form">
            <div class="col">
                <div class="item">
                    <label class="lable-item">
                        서비스종류 :
                    </label>
                    <a-input v-model:value="value" />
                </div>
                <div class="item">
                    <label class="lable-item">상호:</label>
                    <a-input v-model:value="value" />
                </div>
                <div class="item">
                    <label class="lable-item">대표자:</label>
                    <a-input v-model:value="value" />
                </div>
                <div class="item">
                    <label class="lable-item">해지:</label>
                    <a-switch v-model:checked="checked1" checked-children="포함" un-checked-children="제외" />
                </div>
            </div>
            <div class="col">
                <div class="item">
                    <label class="lable-item">주소 :</label>
                    <a-input v-model:value="value" />
                </div>
                <div class="item">
                    <label class="lable-item">매니저명 :</label>
                    <a-select v-model:value="value" show-search placeholder="Select a person" :options="options">
                    </a-select>
                </div>
                <div class="item">
                    <label class="lable-item">영업자명 :</label>
                    <a-select v-model:value="value" show-search placeholder="Select a person" :options="options">
                    </a-select>
                </div>
            </div>
            <a-button class="search" type="primary">검색</a-button>
        </div>
        <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting">
            <DxSelection mode="multiple" />
            <DxPaging :page-size="5" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxColumn data-field="신청일자" />
            <DxColumn data-field="신청코드" />
            <DxColumn data-field="심사상태" data-type="date" />
            <DxColumn :width="170" data-field="사업자코드" />
            <DxColumn data-field="상호" data-type="date" />
            <DxColumn data-field="주소" data-type="date" />
            <DxColumn data-field="대표자" />
            <DxColumn data-field="영업자" />
            <DxColumn data-field="신청서비스" />
            <DxColumn data-field="부가서비스" />
            <DxColumn :width="110" cell-template="pupop" data-field="시장 조작" />
            <template #pupop="{ data }">
                <DxButton @click="setModalVisible(data)" text="편집" />
            </template>
        </DxDataGrid>
        <BF320Popup :modalStatus="modalStatus" @closePopup="modalStatus = false " :data="popupData" />
    </div>
</template>
<script>
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel
} from 'devextreme-vue/data-grid';
import BF320Popup from "./components/BF320Popup.vue";
import DxButton from "devextreme-vue/button";
import { employees, states } from '../data2.js';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
dayjs.extend(weekday)
dayjs.extend(localeData)

export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        BF320Popup
    },
    data() {
        return {
            dataSource: employees,
            states,
            value1: '신청',
            value2: 'A 대리점',
            dateFormat: 'YYYY/MM/DD',
            checbox1: true,
            checbox2: true,
            value4: [dayjs(), dayjs().add(1, 'year')],
            activeKey: [],
            text: 'text',
            gridColumns: ['심사상태', '사업자코드', '상호'],
            gridBoxValue: [3],
            gridDataSource: employees,
            checked1: false,
            options: [{
                value: 'jack',
                label: 'Jack',
            }, {
                value: 'lucy',
                label: 'Lucy',
            }, {
                value: 'tom',
                label: 'Tom',
            }],
            popupData: [],
            modalStatus: false,
        };
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
            if (data === '신청') {
                return 'red'
            } else if (data === '심사중') {
                return 'blue'
            } else if (data === '승인') {
                return 'green'
            } else if (data === '반려') {
                return 'grey'
            }
        },
        setModalVisible(data) {
            this.popupData = data;
            this.modalStatus = true;
        },
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
    margin-top: 20px;

}

.item {
    display: flex;
    align-items: center;
}

.search-form .col .lable-item {
    white-space: nowrap;
    margin-right: 10px;
}

.search-form .col .item:not(:first-child) {
    margin-left: 30px;
}

.search {
    margin-top: 20px;
}
</style>