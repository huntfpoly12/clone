<!-- eslint-disable vue/multi-word-component-names -->
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

        <div id="bf-310">
            <div class="search-form">
                <a-row :gutter="[8,8]">
                    <a-col>
                        <label class="lable-item">서비스종류 :</label>
                        <a-checkbox v-model:checked="originData.accounting">회계</a-checkbox>
                        <a-checkbox v-model:checked="originData.withholding">원천</a-checkbox>
                    </a-col>
                    <a-col>
                        <label class="lable-item">심사상태/결과 :</label>
                        <a-select mode="tags" ref="select" style="width: auto; min-width: 135px;"
                            v-model:value="statuses" placeholder="전체">
                            <a-select-option @click="chooseAll" value="전체">전체</a-select-option>
                            <a-select-option :value="10">신청</a-select-option>
                            <a-select-option :value="20">심사중</a-select-option>
                            <a-select-option :value="30">승인</a-select-option>
                            <a-select-option :value="99 ">반려</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col>
                        <ListSalesDropdownVue :textLabel="'영업자'" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">신청기간 :</label>
                        <a-range-picker v-model:value="dateSearch" width="50%" :placeholder="['Start', 'End']" />
                    </a-col>
                </a-row>
            </div>

            <div class="page-content">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
                    :column-auto-width="true">
                    <DxSelection mode="multiple" />
                    <DxPaging :page-size="rowTable" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxColumn data-field="createdAt" caption="신청일자" cell-template="createdat-cell" data-type="date" />
                    <template #createdat-cell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn data-field="code" caption="신청코드" />
                    <DxColumn data-field="status" caption="심사상태" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)?.name">{{ getColorTag(data.value)?.tag_name }}</a-tag>
                    </template>
                    <DxColumn :width="170" data-field="compactSalesRepresentative.code" caption="사업자코드"
                        css-class="cell-center" />
                    <DxColumn data-field="companyName" caption="상호" />
                    <DxColumn data-field="companyAddress" caption="주소" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn caption="신청서비스" cell-template="acc-service" />
                    <template #acc-service="{ data }">
                        <span>회계
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[ {
                                      title: 'Name',
                                      dataIndex: 'name',
                                    },
                                    {
                                      title: 'Year Month',
                                      dataIndex: 'startYearMonth',
                                    }]" :data-source="data.data.simpleAccountingInfos" bordered :pagination="false">
                                    </a-table>
                                </template>
                                <a-tag v-if="data.data.simpleAccountingInfos">{{data.data.simpleAccountingInfos.length}}
                                </a-tag>
                            </a-popover>
                        </span>
                        <span>원천
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[ {
                                      title: 'Name',
                                      dataIndex: 'name',
                                    },
                                    {
                                      title: 'Year Month',
                                      dataIndex: 'startYearMonth',
                                    }]" :data-source="[data.data.simpleWithholdingInfo]" bordered :pagination="false">
                                    </a-table>
                                </template>
                                <a-tag>1</a-tag>
                            </a-popover>
                        </span>
                    </template>
                    <DxColumn :width="50" cell-template="pupop" type="buttons" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <a-tooltip placement="top">
                                <template #title>편집 {{data.data.id}}</template>
                                <EditOutlined @click="setModalVisible(data)" />
                            </a-tooltip>
                        </div>
                    </template>
                </DxDataGrid>

                <div class="pagination-table" v-if="rowTable > 20">
                    <a-pagination v-model:current="originData.page" v-model:page-size="pageSize" :total="rowTable"
                        show-less-items @change="changePage" />
                </div>

                <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false " :data="idSubRequest" />
            </div>

        </div>
    </a-spin>

</template>
<script lang="ts">
import {
    SearchOutlined,
    EditOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
} from '@ant-design/icons-vue';
import DxDateBox from 'devextreme-vue/date-box';
import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
import { ref, defineComponent } from 'vue';
import BF310Popup from "./components/BF310Popup.vue";
import ListSalesDropdownVue from '../../../../components/ListSalesDropdown.vue';
import queries from "../../../../graphql/queries/BF/BF3/BF310/index"
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxPager,
} from "devextreme-vue/data-grid";
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
        SearchOutlined,
        EditOutlined,
        DxPager,
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
            dateSearch: [dayjs().subtract(1, 'year'), dayjs()],
            status: ref([]),
            startDate: '',
            finishDate: '',
            pageSizes: [5, 10, 15],
            displayMode: 'full',
            showPageSizeSelector: true,
            showNavButtons: true,

        };
    },
    setup() {
        const dataSource = ref([]);
        const modalStatus = ref(false);
        const idSubRequest = ref();
        const spinning = ref<boolean>(true);
        const arraySale = ref([])
        const statuses: any = ref([])
        const requestDataSale = ref({
            page: 1,
            rows: 1000,
            statuses: [1, 2, 3],
            grade: 1,
            name: "",
            code: ""
        })
        const rowTable = ref(10)
        const originData = ref({
            page: 1,
            rows: 20,
            salesRepresentativeId: null,
            startDate: '',
            finishDate: '',
            accounting: true,
            withholding: true,
            statuses: [10, 20, 30, 99]
        })
        const originDataCall = ref({
            page: 1,
            rows: 20,
            salesRepresentativeId: null,
            startDate: '',
            finishDate: '',
            accounting: true,
            withholding: true,
            statuses: [10, 20, 30, 99]
        })
        const setModalVisible = (data: any,) => {
            idSubRequest.value = data.data.id;
            modalStatus.value = true;
        }
        const pageSize = ref(20)
        const { onResult: resultSale } = useQuery(queries.getSale, requestDataSale)
        resultSale((res) => {
            var dataRes = res.data.searchSalesRepresentatives.datas
            let arrayAdd: any = []
            if (dataRes && dataRes.length > 0) {
                dataRes.map((x: any, index: any) => {
                    arrayAdd.push({
                        value: x.id,
                        label: x.name,
                    })
                })
            }
            arraySale.value = arrayAdd
        })

        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.searchSubscriptionRequests, originDataCall.value)

        onResult((res) => {
            if (res.loading) {
            } else {
                rowTable.value = res.data.searchSubscriptionRequests.totalCount
                dataSource.value = res.data.searchSubscriptionRequests.datas
            }
        })

        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1000);

        return {
            idSubRequest,
            dataSource,
            modalStatus,
            rowTable,
            setModalVisible,
            spinning,
            arraySale,
            originData,
            requestDataSale,
            refetchData,
            pageSize,
            statuses
        }
    },

    watch: {
        'dateSearch'(newVal) {
            if (newVal != null) {
                this.originData.startDate = this.formarDate(newVal[0].$d)
                this.originData.finishDate = this.formarDate(newVal[1].$d)
            }
        },
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
        getColorTag(data: any) {
            if (data == 10) {
                return { "name": "red", "tag_name": "신청" };
            } else if (data == 20) {
                return { "name": "blue", "tag_name": "심사중" };
            } else if (data == 30) {
                return { "name": "green", "tag_name": "승인" };
            } else if (data == 99) {
                return { "name": "grey", "tag_name": "반려" };
            }
        },
        formarDate(date: any) {
            return dayjs(date).format('YYYY/MM/DD')
        },

        searching() {
            if (!this.originData.startDate && !this.originData.finishDate) {
                this.originData.finishDate = this.formarDate(new Date())
                var date = this.formarDate(dayjs().subtract(1, 'year'))
                this.originData.startDate = date
            }
            this.spinning = true
            let arrayNew = {
                ...this.originData,
                statuses: this.statuses
            }

            this.refetchData(arrayNew)

            setTimeout(() => {
                this.spinning = false
            }, 1000);
        },

        changePage() {
            this.spinning = !this.spinning;
            setTimeout(() => {
                this.spinning = !this.spinning;
            }, 1000);
        },

        chooseAll() {
            this.statuses = [10, 20, 30, 99]
        }
    },

});
</script>

<style lang="scss" scoped>
.page-content {
    padding-top: 10px;
}

.pagination-table {
    margin-top: 10px;
}

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

::v-deep .dx-button-text {
    line-height: 0.5;
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

::v-deep .cell-center {
    text-align: center !important
}


::v-deep .ant-pagination-options {
    display: none;
}
</style>