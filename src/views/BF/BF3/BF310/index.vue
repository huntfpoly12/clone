<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="bf-310">
        <div class="search-form">
            <a-row :gutter="[8,8]">
                <a-col>
                    <label class="lable-item">서비스종류 :</label>
                    <a-checkbox v-model:checked="dataSearch.typeSevice1">회계</a-checkbox>
                    <a-checkbox v-model:checked="dataSearch.typeSevice2">원천</a-checkbox>
                </a-col>
                <a-col>
                    <label class="lable-item">심사상태/결과 :</label>
                    <a-select ref="select" v-model:value="dataSearch.status">
                        <a-select-option value="신청">신청</a-select-option>
                        <a-select-option value="심사중">심사중</a-select-option>
                        <a-select-option value="승인">승인</a-select-option>
                        <a-select-option value="반려 ">반려</a-select-option>
                    </a-select>
                </a-col>
                <a-col>
                    <label class="lable-item">영업자 :</label>
                    <a-select ref="select" v-model:value="dataSearch.select1" placeholder="전체">
                        <a-select-option value="A 대리점">A 대리점</a-select-option>
                        <a-select-option value="C 영업사원">C 영업사원</a-select-option>
                        <a-select-option value="D 영업사원">D 영업사원</a-select-option>
                        <a-select-option value="E 본사영업사원">E 본사영업사원</a-select-option>
                    </a-select>
                </a-col>
                <a-col>
                    <label class="lable-item">신청기간 :</label>
                    <a-range-picker v-model:value="value4" width="50%" />
                </a-col>
            </a-row>

        </div>
        <div class="page-content">
            <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting"
                :columns="gridColumns">
                <DxSelection mode="multiple" />
                <DxPaging :page-size="5" /> 
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                <DxExport :enabled="true" :allow-export-selected-data="true" />
                <DxColumn data-field="신청일자" />
                <DxColumn data-field="신청코드" />
                <DxColumn data-field="심사상태" data-type="date" cell-template="grid-cell" />
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
                <DxColumn :width="110" cell-template="pupop" type="buttons" />
                <template #pupop="{ data }">
                    <DxButton @click="setModalVisible(data)" text="편집" type="default" styling-mode="outlined"
                        height="20px" />
                </template>
            </DxDataGrid>

            <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false " :data="popupData" />
        </div>
    </div>

</template>
<script lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
import DxDateBox from 'devextreme-vue/date-box';
import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
import { ref, defineComponent } from 'vue';
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
export default defineComponent({
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
        DxDateBox,
        SearchOutlined
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
            value4: [dayjs().subtract(1, 'year'), dayjs()],
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
            popupData: [],
            valueDate: ref<Dayjs>(),
            dataSearch: {
                typeSevice1: true,
                typeSevice2: true,
                status: '신청',
                staff: '',
                select1: 'A 대리점'
            },
            sizeButton: 'small'
        };
    },
    methods: {
        onExporting(e: { component: any; cancel: boolean; }) {
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
                        "계약정보관리&심사.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        customClass(cellInfo: { value: any; }) {
            return cellInfo.value;
        },
        getColorTag(data: string) {
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
        setModalVisible(data: never[]) {
            this.popupData = data;
            this.modalStatus = true;
        }
    },
});
</script>
<style lang="scss" scoped>
.dx-button-has-text .dx-button-content {
    padding: 0px 15px !important;
}
::v-deep .dx-toolbar-after {
    display: flex;

    .dx-toolbar-item {
        &:first-child {
            order: 2;
            margin-left: 15px;
        }
    }
}
.search-form {
    background: #f1f3f4;
    padding: 10px 24px;

    >div {
        justify-content: flex-start !important;
        align-items: center;
        margin-right: 15px;
    }

    label {
        margin-right: 10px;
    }
}

.ant-select {
    width: 145px;
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

.noteText p {
    margin-bottom: 1px;
}

.noteImage {
    font-size: 11px;
    width: 100%;
    padding-top: 2px;
}

.ant-card-head-title {
    padding: 0px;
}

.ant-form-item {
    margin-bottom: 4px;
}

.title-number-modal {
    margin-top: 7px;
}

.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}

.ant-form-item-label {
    text-align: left;
}

.ant-card-extra {
    padding: 0px;
}

.ant-card-head {
    min-height: 30px;
}

.ant-table-thead {
    tr {
        th {
            padding: 7px;
        }
    }
}

.ant-table-tbody {
    tr {
        td {
            padding: 7px;
        }
    }
}
</style>