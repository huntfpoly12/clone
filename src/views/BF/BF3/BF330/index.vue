<template>
    <div id="bf-310">
        <div class="search-form">
            <div id="components-grid-demo-flex">
                <a-row justify="start" :gutter="[16,8]">
                    <a-col>
                        <label class="lable-item">
                            사업자코드 :
                        </label>
                        <a-input style="width: 120px" v-model:value="dataSearch.typeSevice" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">상호:</label>
                        <a-input style="width: 120px" v-model:value="dataSearch.nameCompany" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">대표자:</label>
                        <a-input style="width: 120px" v-model:value="dataSearch.surrogate" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">해지:</label>
                        <a-switch v-model:checked="dataSearch.status" checked-children="포함" un-checked-children="제외" />
                    </a-col>

                    <a-col>
                        <label class="lable-item">주소 :</label>
                        <a-input style="width: 120px" v-model:value="dataSearch.address" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">매니저명 :</label>
                        <a-select style="width: 120px" v-model:value="dataSearch.manager" show-search placeholder="매니저명"
                            :options="options">
                        </a-select>
                    </a-col>
                    <a-col>
                        <label class="lable-item">영업자명 :</label>
                        <a-select style="width: 120px" v-model:value="dataSearch.nameSale" show-search
                            placeholder="영업자명" :options="options">
                        </a-select>
                    </a-col>
                </a-row>
            </div>
        </div>
<<<<<<< HEAD
        <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting">
            <DxSelection mode="multiple" />
            <DxPaging :page-size="5" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxColumn data-field="사업자코드" />
            <DxColumn data-field="상호" data-type="date" />
            <DxColumn data-field="대표자" />
            <DxColumn data-field="주소" data-type="date" />
            <DxColumn data-field="연락처" />
            <DxColumn data-field="매니저" />
            <DxColumn data-field="관리시작일" data-type="date" />
            <DxColumn data-field="영업자" />
            <DxColumn data-field="서비스" />
            <DxColumn data-field="이용료" />
            <DxColumn data-field="해지일자" data-type="date"/>
            
            <DxColumn :width="80" cell-template="pupop" />
            <template #pupop="{ data }" class="custom-action">
                <div class="custom-action">
                    <a-space :size="10">
                        <a-tooltip placement="top">
                            <template #title>편집</template>
                            <EditOutlined @click="setModalVisible(data)" />
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template #title>변경이력</template>
                            <HistoryOutlined @click="modalHistory(data)" />
                        </a-tooltip>
                    </a-space>
                </div>
            </template>
        </DxDataGrid>
        <BF330Popup :modalStatus="modalStatus" @closePopup="modalStatus=false" :data="popupData" />
        <BF330Popup :modalStatusHistory="modalStatusHistory" @closePopupHis="modalStatusHistory=false"
            :data="popupData" />
=======
        <div class="page-content">
            <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting">
                <DxSelection mode="multiple" />
                <DxPaging :page-size="5" />
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                <DxExport :enabled="true" :allow-export-selected-data="true" />
                <DxColumn data-field="사업자코드" />
                <DxColumn data-field="상호" data-type="date" />
                <DxColumn data-field="대표자" />
                <DxColumn data-field="주소" data-type="date" />
                <DxColumn data-field="연락처" />
                <DxColumn data-field="매니저" />
                <DxColumn data-field="관리시작일" data-type="date" />
                <DxColumn data-field="영업자" />
                <DxColumn data-field="해지일자" />
                <DxColumn data-field="연체(개월)" />
                <DxColumn :width="80" cell-template="pupop" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action">
                        <a-space :size="10">
                            <a-tooltip placement="top">
                                <template #title>편집</template>
                                <EditOutlined @click="setModalVisible(data)" />
                            </a-tooltip>
                            <a-tooltip placement="top">
                                <template #title>변경이력</template>
                                <HistoryOutlined @click="modalHistory(data)" />
                            </a-tooltip>
                        </a-space>
                    </div>
                </template>
            </DxDataGrid>
            <BF330Popup :modalStatus="modalStatus" @closePopup="modalStatus=false" :data="popupData" />
            <BF330Popup :modalStatusHistory="modalStatusHistory" @closePopupHis="modalStatusHistory=false"
                :data="popupData" />
        </div>
>>>>>>> fa50c0c26b659225c6dc44b753764f29929dc7ea
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
import BF330Popup from "./components/BF330Popup.vue";
import Style from "./style/style.scss";
import DxButton from "devextreme-vue/button";
import { employees, states } from '../data.js';
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
        BF330Popup,
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
                typeSevice: '',
                nameCompany: '',
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