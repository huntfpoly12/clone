<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="계약정보관리&심사"/> 
        <div class="top-content">
            <a-typography-title :level="3">
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
                <a-row :gutter="[24, 8]">
                    <a-col>
                        <label class="lable-item">서비스종류 :</label>
                        <checkbox-basic v-model:valueCheckbox="originData.accounting" :disabled="false" :size="'14'"
                            label="회계" style="margin-right: 10px;" />
                        <checkbox-basic v-model:valueCheckbox="originData.withholding" :disabled="false" :size="'14'"
                            label="원천" />
                    </a-col>
                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">심사상태/결과 :</label>
                            <subs-req-status-select-box v-model:valueInput="statuses" placeholder="전체" />
                        </div>
                    </a-col>
                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">영업자 :</label>
                            <list-sales-dropdown v-model:selected="originData.salesRepresentativeId" />
                        </div>
                    </a-col>

                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">상호 :</label>
                            <default-text-box width="150px" v-model:valueInput="originData.companyName" />
                        </div>
                    </a-col>

                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">대표자 :</label>
                            <default-text-box width="150px" v-model:valueInput="originData.presidentName" />
                        </div>
                    </a-col>

                    <a-col>
                        <label class="lable-item">신청기간 :</label>
                        <a-range-picker v-model:value="rangeDate" width="50%" :placeholder="['Start', 'End']" />
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">                    
                    <DxPaging :page-size="rowTable" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxColumn data-field="createdAt" caption="신청일자" cell-template="createdat-cell" data-type="date" />
                    <template #createdat-cell="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn data-field="code" caption="신청코드" />
                    <DxColumn data-field="status" caption="심사상태" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)?.name">{{ getColorTag(data.value)?.tag_name }}</a-tag>
                    </template>
                    <DxColumn data-field="compactSalesRepresentative.code" caption="사업자코드" css-class="cell-center" />
                    <DxColumn data-field="companyName" caption="상호" />
                    <DxColumn data-field="companyAddress" caption="주소" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn caption="신청서비스" cell-template="acc-service" />
                    <template #acc-service="{ data }">
                        <span>회계
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[{
                                        title: 'Name',
                                        dataIndex: 'name',
                                    },
                                    {
                                        title: 'Year Month',
                                        dataIndex: 'startYearMonth',
                                    }]" :data-source="data.data.simpleAccountingInfos" bordered :pagination="false">
                                    </a-table>
                                </template>
                                <a-tag v-if="data.data.simpleAccountingInfos">{{ data.data.simpleAccountingInfos.length
                                }}
                                </a-tag>
                            </a-popover>
                        </span>
                        <span>원천
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[{
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
                    <DxColumn :width="80" cell-template="pupop" type="buttons" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <div style="color: blue;cursor: pointer;" @click="setModalVisible(data)">편집</div>
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
import { ref, defineComponent ,reactive,watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
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
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxPager,
} from "devextreme-vue/data-grid";
import BF310Popup from "./components/BF310Popup.vue";
import queries from "../../../../graphql/queries/BF/BF3/BF310/index"


dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        BF310Popup,
        SearchOutlined,
        EditOutlined,
        DxPager,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined
    },
    setup() {
        // config grid
        const store = useStore();
        
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rangeDate =  ref([dayjs().subtract(1, 'year'), dayjs()]);
        const dataSource = ref([]);
        const modalStatus = ref(false);
        const idSubRequest = ref();
        const statuses: any = ref([]);
        const trigger = ref<boolean>(true);
        const rowTable = ref(10)
        const originData = reactive({
            page: 1,
            rows: per_page,
            salesRepresentativeId: 0,
            startDate: '',
            finishDate: '',
            accounting: true,
            withholding: true,
            companyName: "",
            presidentName: "",
            statuses: [10, 20, 30, 99]
        })

        const setModalVisible = (data: any,) => {
            idSubRequest.value = data.data.id;
            modalStatus.value = true;
        }
        const pageSize = ref(20)

        const { refetch: refetchData, loading, error, result } = useQuery(queries.searchSubscriptionRequests, { filter: originData }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        watch(result, (value) => {
            if (value) {
                rowTable.value = value.searchSubscriptionRequests.totalCount
                dataSource.value = value.searchSubscriptionRequests.datas
                trigger.value = false;
            }
        });

        const onExporting = (e: { component: any; cancel: boolean; }) => {
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
        }

        const getColorTag = (data: any) => {
            if (data == 10) {
                return { "name": "red", "tag_name": "신청" };
            } else if (data == 20) {
                return { "name": "blue", "tag_name": "심사중" };
            } else if (data == 30) {
                return { "name": "green", "tag_name": "승인" };
            } else if (data == 99) {
                return { "name": "grey", "tag_name": "반려" };
            }
        }
        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        }
        const searching = () => {
            originData.startDate = formarDate(rangeDate.value[0]);
            originData.finishDate = formarDate(rangeDate.value[1]);
            originData.statuses = statuses.value == 0 ? [10, 20, 30, 99] : statuses.value
            trigger.value = true;
            refetchData()
        }
        const changePage = () => {
            searching()
        }

        return {
            loading,
            move_column,
            colomn_resize,
            rangeDate,
            idSubRequest,
            dataSource,
            modalStatus,
            rowTable,
            setModalVisible,
            originData,
            refetchData,
            pageSize,
            statuses,
            searching,
            getColorTag,
            onExporting,
            changePage
        }
    },

});
</script>
<style lang="scss" scoped  src="./style/style.scss">

</style>