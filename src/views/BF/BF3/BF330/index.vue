<template>
    <a-spin :spinning="loading" size="large">
        <div id="bf-330">
            <action-header title="서비스관리"  @actionSearch="searching"/>
            <div class="search-form">
                <div class="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16, 8]">
                        <a-col>
                            <label class="lable-item"> 사업자코드 : </label>
                            <default-text-box width="120px" v-model:valueInput="originData.filter.code" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">상호:</label>
                            <default-text-box width="120px" v-model:valueInput="originData.filter.name" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">대표자:</label>
                            <default-text-box width="120px" v-model:valueInput="originData.filter.presidentName" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">해지:</label>
                            <switch-basic v-model:valueSwitch="originData.filter.excludeCancel" :textCheck="'포함'"
                                :textUnCheck="'제외'" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">주소 :</label>
                            <default-text-box width="120px" v-model:valueInput="originData.filter.address" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">매니저명 :</label>
                            <list-manager-dropdown v-model:valueInput="originData.filter.manageUserId" width="150px"/>
                        </a-col>
                        <a-col>
                            <label class="lable-item">영업자명 :</label>
                            <list-sales-dropdown v-model:valueInput="originData.filter.salesRepresentativeId" width="150px"/>
                        </a-col>
                        <a-col>
                            <checkbox-basic label="회계" v-model:valueCheckbox="originData.filter.usedAccounting" :size="'18'" />
                        </a-col>
                        <a-col>
                            <checkbox-basic label="원천" v-model:valueCheckbox="originData.filter.usedWithholding" :size="'18'" />
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="listServiceContract" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :show-row-lines="true"  :hoverStateEnabled="true">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxToolbar>
                        <DxItem name="exportButton" />
                        <DxItem name="searchPanel" />
                        <!-- <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" /> -->
                    </DxToolbar>
                    <template #pagination-table>
                        <div  v-if="rowTable > originData.filter.rows">
                            <a-pagination v-model:current="originData.filter.page" v-model:page-size="originData.filter.rows"
                                :total="rowTable" show-less-items @change="changePage" />
                        </div>
                    </template>
                    <DxColumn data-field="code" caption="사업자코드" />
                    <DxColumn data-field="active" caption="상태" cell-template="active-cell" />
                    <template #active-cell="{ data }" class="custom-action">
                        {{ data.value === true ? '정상' : '해지' }}
                    </template>
                    <DxColumn data-field="name" caption="상호" data-type="date" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="address" caption="주소" data-type="date" />
                    <DxColumn data-field="phone" caption="연락처" />
                    <DxColumn data-field="presidentMobilePhone" caption="휴대폰" />
                    <DxColumn data-field="manageCompactUser.name" caption="매니저" />
                    <DxColumn data-field="manageStartDate" cell-template="manageStartDate" caption="관리시작일" data-type="date" />
                    <template #manageStartDate="{ data }">
                        {{ data.data.manageStartDate ? $filters.formatDate(data.data.manageStartDate) : '' }}
                    </template>
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn caption="서비스" cell-template="used-withholding"/>
                    <template #used-withholding="{ data }" class="custom-action" >
                        회계 {{ data.data.usedAccountingCount }}{{  data.data.usedWithholding === true ? ', 원천' : '' }}
                    </template>
                    <DxColumn data-field="servicePrice" caption="이용료" :format="amountFormat" data-type="number" />
                    <DxColumn data-field="canceledAt" caption="해지일자" />
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip  color="black" placement="top">
                                    <template #title>편집</template>
                                    <EditOutlined @click="setModalVisible(data)" />
                                </a-tooltip>
                                <a-tooltip  color="black" placement="top">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="pagination-table" v-if="rowTable > originData.filter.rows">
                    <a-pagination v-model:current="originData.filter.page" v-model:page-size="originData.filter.rows"
                        :total="rowTable" show-less-items @change="changePage" />
                </div>
                <BF330Popup :modalStatus="modalStatus" @closePopup="closePopup" :idRowEdit="idSubRequest" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" :idRowEdit="idSubRequest" typeHistory="bf-330" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import { DxDataGrid,DxColumn,DxPaging,DxExport,DxSelection,DxSearchPanel,DxToolbar,DxItem, DxScrolling} from "devextreme-vue/data-grid";
import BF330Popup from "./components/BF330Popup.vue";
import HistoryPopup from '@/components/HistoryPopup.vue';
import DxButton from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import { EditOutlined, HistoryOutlined, SearchOutlined, SaveOutlined, DeleteOutlined, PrinterOutlined } from "@ant-design/icons-vue"; 
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF3/BF330/index"
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
        DxExport,
        DxToolbar,
        DxItem,
        DxSearchPanel,
        BF330Popup,
        HistoryPopup,
        EditOutlined,
        HistoryOutlined,
        SearchOutlined,
        SaveOutlined,
        DeleteOutlined,
        PrinterOutlined,
        DxScrolling,
    },
    setup() {
        // config grid
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const idRowEdit = ref(0)
        const idSubRequest = ref();
        let trigger = ref(true);
        const modalHistoryStatus = ref<boolean>(false)
        const popupData = ref([]);
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const modalStatus = ref(false)
        const listServiceContract = ref([])
        const rowTable = ref(10)
        const originData = ref({
            filter: {
                page: 1,
                rows: per_page,
                code: "",
                name: "",
                presidentName: "",
                address: "",
                manageUserId: undefined,
                salesRepresentativeId: undefined,
                excludeCancel: true,
                usedAccounting: true,
                usedWithholding: true,
            }
        })
        const { refetch: refetchData, loading, result } = useQuery(queries.searchServiceContracts, originData, () => ({ fetchPolicy: "no-cache", enabled: trigger.value, }));
        // process data after call getServiceContracts api
        watch(result, (value: any) => {
            rowTable.value = value.searchServiceContracts.totalCount
            listServiceContract.value = value.searchServiceContracts.datas
            trigger.value = false;
        });
        const changePage = () => {
            trigger.value = true;
            refetchData();
        }
        const searching = () => {
            trigger.value = true;
            refetchData()
        }
        const closePopup = () => {
            modalStatus.value = false
            trigger.value = true;
            refetchData()
        }
        const onExporting = (e: any) => {
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
        }
        const setModalVisible = (data: any) => {
            idSubRequest.value = data.data.id;
            modalStatus.value = true;
            popupData.value = data;
        }
        const modalHistory = (data: any) => {
            idSubRequest.value = data.data.id;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        return {
            closePopup,
            amountFormat,
            modalHistory,
            modalHistoryStatus,
            modalStatus,
            popupData,
            move_column,
            colomn_resize,
            idRowEdit,
            listServiceContract,
            loading,
            searching,
            originData,
            refetchData,
            rowTable,
            idSubRequest,
            setModalVisible,
            changePage,
            trigger,
            onExporting,
        }
    },
});
</script>
<style lang="scss" scoped>
#data-grid-demo {
    min-height: 700px;
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
            margin-left: 5px;
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
</style>