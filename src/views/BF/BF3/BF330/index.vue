<template>
    <a-spin :spinning="spinning" size="large">
        <div id="bf-330">
            <div class="top-content">
                <a-typography-title :level="3"> 서비스관리
                </a-typography-title>
                <div class="list-action">
                    <a-tooltip>
                        <template #title>조회</template>
                        <a-button @click="searching">
                            <SearchOutlined />
                            <!-- <SearchOutlined @click="searching" /> -->
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
            <div class="search-form">
                <div class="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16, 8]">
                        <a-col>
                            <label class="lable-item"> 사업자코드 : </label>
                            <a-input style="width: 120px" v-model:value="dataSearchDef.code" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">상호:</label>
                            <a-input style="width: 120px" v-model:value="dataSearchDef.name" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">대표자:</label>
                            <a-input style="width: 120px" v-model:value="dataSearchDef.presidentName" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">해지:</label>
                            <a-switch v-model:checked="dataSearchDef.excludeCancel" checked-children="포함" un-checked-children="제외" />
                        </a-col>

                        <a-col>
                            <label class="lable-item">주소 :</label>
                            <a-input style="width: 120px" v-model:value="dataSearchDef.address" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">매니저명 :</label>
                            <ListManagerDropdown v-model:selected="dataSearchDef.manageUserId"/>
                        </a-col>
                        <a-col>
                            <ListSalesDropdownVue v-model:selected="dataSearchDef.salesRepresentativeId"/>
                        </a-col>
                        <!-- <a-col>
                            <label class="lable-item"></label>
                            <a-checkbox v-model:checked="dataSearch.typeSevice1">회계</a-checkbox>
                            <a-checkbox v-model:checked="dataSearch.typeSevice2">원천</a-checkbox>
                        </a-col> -->
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="listServiceContract" :show-borders="true" key-expr="id" @exporting="onExporting">
                    <DxSelection mode="multiple" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxColumn data-field="code" caption="사업자코드"/>
                    <DxColumn data-field="status" caption="상태"/>
                    <DxColumn data-field="name" caption="상호" data-type="date" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="address"  caption="주소" data-type="date" />
                    <DxColumn data-field="phone" caption="연락처" />
                    <DxColumn data-field="매니저" caption="매니저"/>
                    <DxColumn data-field="manageStartDate"  caption="관리시작일" data-type="date" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn data-field="서비스" caption="서비스" />
                    <DxColumn data-field="servicePrice" caption="이용료" :format="amountFormat" data-type="number"/>
                    <DxColumn data-field="canceledAt" caption="해지일자" />
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
                <BF330Popup :modalStatus="modalStatus" @closePopup="modalStatus = false" :idRowEdit="idSubRequest" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
                    title="변경이력[cm-000-pop]" :idRowEdit="idSubRequest" typeHistory="bf-330"/>
            </div>
        </div>
    </a-spin>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
} from "devextreme-vue/data-grid";
import BF330Popup from "./components/BF330Popup.vue";
import HistoryPopup from '../../../../components/HistoryPopup.vue';
import DxButton from "devextreme-vue/button";
import { employees, states } from "../data.ts";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import { EditOutlined, HistoryOutlined,SearchOutlined, SaveOutlined, DeleteOutlined, PrinterOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF3/BF330/index"
dayjs.extend(weekday);
dayjs.extend(localeData);
import ListManagerDropdown from '../../../../components/ListManagerDropdown.vue';
import ListSalesDropdownVue from '../../../../components/ListSalesDropdown.vue';
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
        HistoryPopup,
        EditOutlined,
        HistoryOutlined,
        SearchOutlined, 
        SaveOutlined, 
        DeleteOutlined, 
        PrinterOutlined,
        ListManagerDropdown,
        ListSalesDropdownVue
    },
    data() {
        return {
            amountFormat: { currency: 'VND', useGrouping: true },
            dataSource: employees,
            states,

            popupData: [],
            modalStatus: false,
            modalHistoryStatus: false,
        };
    },
    setup() {
        const spinning = ref(true);
        const idRowEdit = ref(0)
        const idSubRequest = ref();
        const dataSearchDef = ref({
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

        const listServiceContract = ref([])
        const rowTable = ref(10)
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

        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.searchServiceContract, originData)
        onResult((res) => {
            rowTable.value = res.data.searchServiceContracts.totalCount
            listServiceContract.value = res.data.searchServiceContracts.datas
        })

        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1);

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

        return {
            idRowEdit,
            spinning,
            listServiceContract,
            dataSearchDef,
            searching,
            originData,
            refetchData,
            rowTable,
            idSubRequest 
        }
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
                        "서비스관리.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        setModalVisible(data) {
            this.idSubRequest = data.data.id;
            this.modalStatus = true;
            this.popupData = data;
        },
        modalHistory(data) {
            this.idSubRequest = data.data.id;
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
#data-grid-demo {
    min-height: 700px;
}

.search-form {
    background: #f1f3f4;
    padding: 10px 24px;
}

.components-grid-demo-flex .ant-col {
    display: flex;
    align-items: center;
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

.modal-note {
    max-height: 500px;
    overflow-y: auto;

    .title-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    th {
        display: none;
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

    >div {
        width: 100%;
        justify-content: space-between;
    }

    .lable-item {
        white-space: nowrap;
        margin-right: 10px;
        width: auto !important;
    }

    .col {
        align-items: center;
    }
}
</style>