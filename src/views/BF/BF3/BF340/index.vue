<template>
    <a-spin :spinning="spinning" size="large">
        <div class="top-content">
            <a-typography-title :level="3"> 영업자관리
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

        <div id="bf-340">
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
                            <a-select style="width: 100px" v-model:value="dataSearch.nameSale"
                                option-label-prop="children">
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
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
                    :allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true">
                    <DxScrolling column-rendering-mode="virtual" />
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
                    <DxColumn caption="영업자코드" data-field="code" />
                    <DxColumn caption="상태" data-field="status" data-type="text" cell-template="grid-cell" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
                    </template>
                    <DxColumn caption="영업자명" data-field="name" />
                    <DxColumn caption="등급" data-field="grade" data-type="text" />
                    <DxColumn caption="주소" data-field="address" />
                    <DxColumn caption="연락처" data-field="phone" />
                    <DxColumn caption="휴대폰" data-field="mobilePhone" />
                    <DxColumn caption="가입일자" data-field="registerDate" data-type="date" />
                    <DxColumn caption="해지일자" data-field="cancelDate" data-type="date" />
                    <DxColumn caption="사업자수" data-field="companyCount" data-type="number" cell-template="grid-number" />
                    <template #grid-number="{ data }">
                        {{ $filters.formatCurrency(data.value) }}
                    </template>

                    <DxColumn :width="80" cell-template="pupop" />
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
                            </a-space>
                        </div>
                    </template>

                </DxDataGrid>

                <AddNew340Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
                <EditBF340Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData"
                    :idSaleEdit="idRowEdit" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력[cm-000-pop]" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
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
    DxScrolling,
    DxItem
} from "devextreme-vue/data-grid";

import EditBF340Popup from "./components/EditBF340Popup.vue";
import AddNew340Poup from "./components/AddNew340Poup.vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import DxButton from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
    EditOutlined, HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,SaveOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF3/BF340/index"
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
        DxScrolling,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxEditing,
        DxGrouping,
        DxItem,
        AddNew340Poup,
        EditBF340Popup,
        HistoryPopup,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
    },
    data() {
        return {
            // dataSource: employees,
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

    setup() {
        const spinning = ref<boolean>(true);
        var idRowEdit = ref<number>(0)
        const originData = {
            page: 1,
            rows: 2,
            statuses: [1, 2, 3],
            grade: 1,
            name: "",
            code: "",
        }

        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1000);
        const dataSource = ref([])
        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.getDataSale, originData, () => ({ fetchPolicy: "no-cache", }))

        onResult((res) => {
            dataSource.value = res.data.searchSalesRepresentatives.datas
        })

        return {
            spinning,
            dataSource,
            idRowEdit,
            refetchData
        }
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
                        "영업자관리.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        openAddNewModal() {
            this.modalAddNewStatus = true;
        },
        setModalEditVisible(data: any) {
            this.idRowEdit = data.data.id
            this.modalEditStatus = true;
            this.popupData = data;
        },
        modalHistory(data: never[]) {
            this.modalHistoryStatus = true;
            this.popupData = data;
        },
        getColorTag(data: string) {
            if (data === "정상") {
                return "#108ee9";
            } else if (data === "해지") {
                return "#cd201f";
            } else if (data === "전체") {
                return "grey";
            }
        },
        searching() {

        }
    },
});
</script>
<style scoped>
.page-content {
    padding: 10px 10px;
}

.cell-button-add {
    padding-left: 100px !important;
}

.cell-center {
    text-align: center !important
}

.dx-button-has-text .dx-button-content {
    padding: 0px 15px !important;
}

.search-form {
    background: #f1f3f4;
    padding: 10px 24px;
}

.dx-select-checkbox {
    display: inline-block !important;
}

#data-grid-demo {
    min-height: 700px;
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
