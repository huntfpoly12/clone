<template>
    <div id="bf-310">
        <a-typography-title :level="2">사업자관리 </a-typography-title>
        <div class="search-form">
            <div class="col">
                <div class="item">
                    <label class="lable-item">
                        사업자코드 :
                    </label>
                    <a-input v-model:value="dataSearch.typeSevice" />
                </div>
                <div class="item">
                    <label class="lable-item">상호:</label>
                    <a-input v-model:value="dataSearch.nameCompany" />
                </div>
                <div class="item">
                    <label class="lable-item">대표자:</label>
                    <a-input v-model:value="dataSearch.surrogate" />
                </div>
                <div class="item">
                    <label class="lable-item">해지:</label>
                    <a-switch v-model:checked="dataSearch.status" checked-children="포함" un-checked-children="제외" />
                </div>
            </div>
            <div class="col">
                <div class="item">
                    <label class="lable-item">주소 :</label>
                    <a-input v-model:value="dataSearch.address" />
                </div>
                <div class="item">
                    <label class="lable-item">매니저명 :</label>
                    <a-select style="width: 150px" v-model:value="dataSearch.manager" show-search placeholder="매니저명"
                        :options="options">
                    </a-select>
                </div>
                <div class="item">
                    <label class="lable-item">영업자명 :</label>
                    <a-select style="width: 150px" v-model:value="dataSearch.nameSale" show-search placeholder="영업자명"
                        :options="options">
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
            <DxColumn :width="110" cell-template="pupop" />
            <template #pupop="{ data }">
                <a-space :size="8">
                    <EditOutlined @click="setModalVisible(data)" />
                    <HistoryOutlined @click="modalHistory(data)" />
                </a-space>
            </template>
        </DxDataGrid>
        <BF320Popup :modalStatus="modalStatus" @closePopup="modalStatus=false" :data="popupData" />
        <BF320Popup :modalStatusHistory="modalStatusHistory" @closePopupHis="modalStatusHistory=false"
            :data="popupData" />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel
} from 'devextreme-vue/data-grid';
import BF320Popup from "./components/BF320Popup.vue";
import Style from "./style/style.scss";
import DxButton from "devextreme-vue/button";
import { employees, states } from '../data2.js';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
dayjs.extend(weekday)
dayjs.extend(localeData)

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        BF320Popup,
        EditOutlined,
        HistoryOutlined,
        Style
    },
    data() {
        return {
            dataSource: employees,
            states,
            options: [{
                value: 'jack',
                label: 'Jack',
            }, {
                value: 'lucy',
                label: 'Lucy',
            }, {
                value: 'tom',
                label: 'Tom Halin Sin Han Bank',
            }],
            popupData: [],
            modalStatus: false,
            modalStatusHistory: false,
            dataSearch: {
                typeSevice:'',
                nameCompany:'',
                surrogate: '',
                status: false,
                address: '',
                manager: '',
                nameSale: ''
            },
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
        setModalVisible(data) {
            this.modalStatus = true;
            this.popupData = data;
        },
        modalHistory(data) {
            this.modalStatusHistory = true;
            this.popupData = data;
        },
    },
});
</script>