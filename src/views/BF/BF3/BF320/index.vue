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
                    <a-row justify="start" :gutter="[16, 8]">
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">
                                    사업자코드 :
                                </label>
                                <a-input v-model:value="originData.code" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">상호:</label>
                                <a-input v-model:value="originData.name" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">대표자:</label>
                                <a-input v-model:value="originData.presidentName" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <label class="lable-item">해지:</label>
                            <a-switch v-model:checked="originData.excludeCancel" checked-children="포함"
                                un-checked-children="제외" />
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">주소 :</label>
                                <a-input v-model:value="originData.address" style="width: 130px;" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label>메니저명 :</label>
                                <list-manager-dropdown />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label>영업자명 :</label>
                                <list-sales-dropdown />

                                {{ trigger }}
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div> 
            
            <div class="page-content">
                <DxDataGrid :data-source="responApiSearchCompanies" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="true" :allow-column-resizing="true"
                    :column-auto-width="true">
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
                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                        :total="rowTable" show-less-items @change="changePage" />
                </div>

                <BF320Popup :modalStatus="modalStatus" @closePopup="handleClosePopup" :idRowEdit="idRowEdit"
                    :data="popupData" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" :idRowEdit="idRowEdit" typeHistory="bf-320" />
            </div>
        </div>
    </a-spin>
</template> 

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
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
        DxSelectBox,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined
    },
    data() {
        return {
            amountFormat: { currency: 'VND', useGrouping: true },
        };
    },

    setup() {
        const rowTable = ref(10)
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        const spinning = ref<boolean>(true);
        var idRowEdit = ref<number>(0)
        let modalStatus = ref<boolean>(false)
        const trigger = ref(true)
        var responApiSearchCompanies = ref([])

        const originData = ref({
            page: 1,
            rows: 20,
            code: "",
            name: "",
            presidentName: "",
            address: "",
            manageUserId: null,
            salesRepresentativeId: null,
            excludeCancel: true
        })

        const { refetch: refetchData, onResult, result } = useQuery(queries.searchCompanies, originData, ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))

        watch(
            result,
            (newValue, old) => {
                console.log(newValue, 'hhhhhhh');
                trigger.value = false

            }
        );

        onResult((res) => {
            rowTable.value = res.data.searchCompanies.totalCount
            responApiSearchCompanies.value = res.data.searchCompanies.datas



            spinning.value = false;
        })

        const searching = () => {
            spinning.value = true;
            refetchData()
        }

        const pageSize = ref(5)
        const handleClosePopup = () => {
            modalStatus.value = false
            refetchData()
        }
        const onExporting = (e: any) => {
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
        }
        const setModalVisible = (data: any) => {
            idRowEdit.value = data.data.id;
            modalStatus.value = true;
            popupData.value = data;
        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const changePage = () => {
            refetchData()
            spinning.value = true;
        }

        return {
            trigger,
            idRowEdit,
            spinning,
            modalHistoryStatus,
            responApiSearchCompanies,
            originData,
            searching,
            refetchData,
            onExporting,
            handleClosePopup,
            modalStatus,
            rowTable,
            pageSize,
            popupData,
            setModalVisible,
            modalHistory,
            changePage,
        }
    },
});
</script>

<style lang="scss" scoped src="./style/index.scss">

</style>