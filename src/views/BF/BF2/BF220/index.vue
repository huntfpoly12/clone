<template>
    <div id="bf-220">
        <div class="search-form">
            <div id="components-grid-demo-flex">
                <a-row justify="start" :gutter="[16,8]">
                    <a-col>
                        <label class="lable-item">대상회원</label>
                        <a-checkbox v-model:checked="dataSearch.typeSevice1">
                            <a-tag color="black">매니저</a-tag>
                        </a-checkbox>
                        <a-checkbox v-model:checked="dataSearch.typeSevice2">
                            <a-tag color="gray" style="color: black;border: 1px solid black;">영업자</a-tag>
                        </a-checkbox>
                        <a-checkbox v-model:checked="dataSearch.typeSevice3">
                            <a-tag color="#FFFF00" style="color: black;border: 1px solid black">파트너</a-tag>
                        </a-checkbox>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="page-content">
            <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" @exporting="onExporting">
                <DxPaging :page-size="5" />
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                <DxExport :enabled="true" :allow-export-selected-data="true" />
                <DxToolbar>
                    <DxItem name="searchPanel" />
                    <DxItem name="exportButton" />
                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                    <DxItem name="groupPanel" />
                    <DxItem name="addRowButton" show-text="always" />
                    <DxItem name="columnChooserButton" />
                </DxToolbar>
                <template #button-template>
                    <DxButton icon="plus" @click="openAddNewModal" />
                </template>
                <DxColumn data-field="그룹코드" :fixed="true" />
                <DxColumn data-field="그룹명" />

                <DxColumn data-field="대상회원" cell-template="button" />
                <template #button="{ data }" class="custom-action">
                    <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
                </template>

                <DxColumn data-field="메모" />

                <DxColumn :width="80" cell-template="pupop" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action">
                        <a-space :size="10">
                            <a-tooltip placement="top">
                                <template #title>편집</template>
                                <EditOutlined @click="openEditModal(data)" />
                            </a-tooltip>
                            <a-tooltip placement="top">
                                <template #title>변경이력</template>
                                <HistoryOutlined @click="modalHistory(data)" />
                            </a-tooltip>
                        </a-space>
                    </div>
                </template>
            </DxDataGrid>

            <BF220Popup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus=false"
                :modalEdit="modalEditStatus" @closePopupEdit="modalEditStatus = false" />
            <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
                title="변경이력[cm-000-pop]" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxItem
} from 'devextreme-vue/data-grid';
import HistoryPopup from '../../../../components/HistoryPopup.vue';
import BF220Popup from "./components/BF220Popup.vue";
import DxButton from "devextreme-vue/button";
import { employees, states } from './data';
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
        BF220Popup,
        HistoryPopup,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem
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
            modalHistoryStatus: false,
            dataSearch: {
                typeSevice: '',
                nameCompany: '',
                surrogate: '',
                status: false,
                address: '',
                manager: 'Jack',
                nameSale: 'Jack',
                typeSevice1: false,
                typeSevice2: false,
                typeSevice3: false,
            },
            modalAddNewStatus: false,
            modalEditStatus: false
        };
    },
    methods: {
        onExporting(e: any) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('employees');
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '권한그룹관리.xlsx');
                });
            });
            e.cancel = true;
        },
        setModalVisible(data: any) {
            this.modalStatus = true;
            this.popupData = data;
        },
        modalHistory(data: any) {
            this.modalHistoryStatus = true;
            this.popupData = data;
        },

        openAddNewModal() {
            this.modalAddNewStatus = true;
        },

        openEditModal(data: any) {
            this.modalEditStatus = true;
        },

        getColorTag(data: String) {
            if (data === "매니저") {
                return "black";
            } else if (data === "파트너") {
                return "yellow";
            }
        }
    },
});
</script>

<style lang="scss" scoped>
#data-grid-demo {
    min-height: 700px;
}

.dx-select-checkbox {
    display: inline-block !important;
}

.modal-note {
    max-height: 500px;
    overflow: auto;

    .title-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    th {
        display: none;
    }

    .ant-collapse-content-box {
        padding: 0px;
    }
}

.anticon {
    cursor: pointer;
}

.custom-action {
    text-align: center;
}

.search-form {
    margin-bottom: 10px;
    background: #f1f3f4;
    padding: 10px 24px;

    >div {
        width: 100%;
        justify-content: flex-start !important;
        align-items: center;
        margin-right: 15px;
    }

    label {
        margin-right: 10px;
    }

    .lable-item {
        white-space: nowrap;
        margin-right: 10px;
        width: auto !important;
    }

    .col {
        align-items: center;
        display: flex;
        align-items: center;
        margin-top: 20px;

        .lable-item {
            width: 110px;
            display: inline-block;
        }

        .item:nth-child(2) {
            margin-left: 30px;
        }
    }
}

.ant-row {
    align-items: center;
}

.ant-form-item {
    margin-bottom: 4px;
}

.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}

.warring-modal {
    font-size: 12px;
    line-height: 0px;
}

.ant-form-item-label {
    text-align: left;
}

.clr {
    label {
        color: red;
    }
}

.clr-text {
    color: red;
}

.clb,
.clb-label label {
    color: black !important;
}


::v-deep.components-modal-demo-position {
    ::v-deep.test-local {
        background-color: pink !important;
        width: 1000px !important;
        height: 200px !important;
    }

    .imgPreview img {
        width: 1000px !important;
    }

    .ant-form-item-label {
        text-align: left;
    }

}




.dflex {
    display: flex;
}

.custom-flex {
    align-items: flex-start;
}

.warring-bank {
    display: flex;
    align-items: center;
}

.pl-5 {
    padding-left: 5px;
}

.custom-lineHeight {
    line-height: 3px;
}
</style>