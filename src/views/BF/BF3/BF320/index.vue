<template>
    <a-spin :spinning="spinning" size="large">
        <div class="top-content">
            <a-typography-title :level="3"> 계약정보관리&심사
            </a-typography-title>
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

        <div id="bf-320">
            <div class="search-form">
                <div id="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16,8]">
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">
                                    사업자코드 :
                                </label>
                                <a-input v-model:value="dataSearchDef.code" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">상호:</label>
                                <a-input v-model:value="dataSearchDef.name" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">대표자:</label>
                                <a-input v-model:value="dataSearchDef.presidentName" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <label class="lable-item">해지:</label>
                            <a-switch v-model:checked="dataSearchDef.excludeCancel" checked-children="포함"
                                un-checked-children="제외" />
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">주소 :</label>
                                <a-input v-model:value="dataSearchDef.address" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <ListManagerDropdown />
                        </a-col>
                        <a-col>
                            <!-- Doanh nghiệp -->
                            <ListSalesDropdownVue :textLabel="'영업자명'" />
                        </a-col>
                    </a-row>
                </div>
            </div>

            <div class="page-content">
                <DxDataGrid :data-source="responApiSearchCompanies" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="true" :allow-column-resizing="true"
                    :column-auto-width="true">
                    <DxSelection mode="multiple" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxColumn data-field="code" caption="사업자코드" :fixed="true" />
                    <DxColumn data-field="name" caption="상호" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="address" caption="주소" data-type="date" />
                    <DxColumn data-field="phone" caption="연락처" :width="230" />
                    <DxColumn data-field="manageCompactUser.name" caption="매니저" />
                    <DxColumn data-field="manageStartDate" caption="관리시작일" data-type="date" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn data-field="canceledAt" caption="해지일자" />
                    <DxColumn data-field="unpaidMonths" caption="이용료" :format="amountFormat" data-type="number" />
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
                <div class="pagination-table" v-if="rowTable > originData.rows">
                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" :total="rowTable"
                        show-less-items @change="changePage" />
                </div>

                <BF320Popup :modalStatus="modalStatus" @closePopup="modalStatus=false" :idRowEdit="idRowEdit"
                    :data="popupData" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력[cm-000-pop]" :idRowEdit="idRowEdit" typeHistory="bf-320"/>
            </div>
        </div>
    </a-spin>
</template> 

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
} from 'devextreme-vue/data-grid';
import HistoryPopup from '../../../../components/HistoryPopup.vue';
import BF320Popup from "./components/BF320Popup.vue";
import DxButton from "devextreme-vue/button";
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
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
} from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import ListManagerDropdown from '../../../../components/ListManagerDropdown.vue';
import ListSalesDropdownVue from '../../../../components/ListSalesDropdown.vue';
import ListPartner from '../../../../components/ListPartner.vue';
dayjs.extend(weekday)
dayjs.extend(localeData)
import { DxSelectBox } from 'devextreme-vue/select-box';
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF3/BF320/index"

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
        HistoryPopup,
        EditOutlined,
        HistoryOutlined,
        ListManagerDropdown,
        DxSelectBox,
        ListPartner,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        ListSalesDropdownVue
    },
    data() {
        return {
            amountFormat: { currency: 'VND', useGrouping: true },
            popupData: [],
            modalStatus: false,
            modalHistoryStatus: false,
        };
    },

    setup() {
        const rowTable = ref(10)
        const spinning = ref<boolean>(true);
        var idRowEdit = ref<number>(0)

        var dataSearchDef = ref({
            page: 1,
            rows: 10,
            code: "",
            name: "",
            presidentName: "",
            address: "",
            manageUserId: null,
            salesRepresentativeId: null,
            excludeCancel: true
        })

        var responApiSearchCompanies = ref([])

        const originData = ref({
            page: 1,
            rows: 10,
            code: "",
            name: "",
            presidentName: "",
            address: "",
            manageUserId: null,
            salesRepresentativeId: null,
            excludeCancel: true
        })

        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.searchCompanies, originData)

        onResult((res) => {
            rowTable.value = res.data.searchCompanies.totalCount
            responApiSearchCompanies.value = res.data.searchCompanies.datas
        })

        setTimeout(() => { 
            spinning.value = !spinning.value;
        }, 1000);

        const searching = () => {
            spinning.value = !spinning.value;

            originData.value = {
                page: 1,
                rows: 10,
                code: "",
                name: "",
                presidentName: "",
                address: "",
                manageUserId: null,
                salesRepresentativeId: null,
                excludeCancel: true
            }

            let dataNew = {
                page: dataSearchDef.value.page,
                rows: dataSearchDef.value.rows,
                code: dataSearchDef.value.code,
                name: dataSearchDef.value.name,
                presidentName: dataSearchDef.value.presidentName,
                address: dataSearchDef.value.address,
                manageUserId: dataSearchDef.value.manageUserId,
                salesRepresentativeId: dataSearchDef.value.salesRepresentativeId,
                excludeCancel: dataSearchDef.value.excludeCancel
            }

            refetchData(dataNew)

            setTimeout(() => {
                spinning.value = !spinning.value;
            }, 1000);
        }


        const pageSize = ref(5)

        return {
            idRowEdit,
            spinning,
            responApiSearchCompanies,
            dataSearchDef,
            searching,
            originData,
            refetchData,
            rowTable,
            pageSize
        }
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
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '사업자관리.xlsx');
                });
            });
            e.cancel = true;
        },
        setModalVisible(data: any) { 
            this.idRowEdit = data.data.id;
            this.modalStatus = true;
            this.popupData = data;

        },
        modalHistory(data: any) {
            this.idRowEdit = data.data.id;
            this.modalHistoryStatus = true;
            this.popupData = data;
        },

        changePage() {
            let dataNew = {
                page: this.dataSearchDef.page,
                rows: this.dataSearchDef.rows,
                code: this.dataSearchDef.code,
                name: this.dataSearchDef.name,
                presidentName: this.dataSearchDef.presidentName,
                address: this.dataSearchDef.address,
                manageUserId: this.dataSearchDef.manageUserId,
                salesRepresentativeId: this.dataSearchDef.salesRepresentativeId,
                excludeCancel: this.dataSearchDef.excludeCancel
            }

            this.refetchData(dataNew)

            this.spinning = !this.spinning;
            setTimeout(() => {
                this.spinning = !this.spinning;
            }, 1000);
        },

    },

});
</script>

<style lang="scss" scoped>
.ant-pagination {
    margin-top: 10px;
}

.page-content {
    padding: 10px 10px;
}

#data-grid-demo {
    min-height: 700px;
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

::v-deep .dx-select-checkbox {
    display: inline-block !important;
}

::v-deep .dx-texteditor-input {
    min-height: 30px !important;
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

#bf-320 {
    .dx-texteditor-input {
        height: 33px;
        min-height: auto !important;
    }

    .search-form {
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
                margin-left: 33px;
            }
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
    align-items: center;
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

.dx-texteditor-input {
    padding: 0px 5px 6px 5px;
}

.dx-checkbox-icon {
    border: 1px solid #d9d9d9
}
</style>