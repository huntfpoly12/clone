<template>
    <a-spin :spinning="loading" size="large">
        <div id="bf-330">
            <action-header title="서비스관리"  @actionSearch="searching" :buttonSearch="true"/>
            
            <div class="page-content mt-7">
                <DxDataGrid id="table-main-bf330" noDataText="내역이 없습니다" :data-source="listServiceContract" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :show-row-lines="true"  :hoverStateEnabled="true">
                    <DxPaging :enabled="false" />
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem name="exportButton" css-class="cell-button-export"/>
                        <DxItem template="pagination-table"/>
                        <DxItem name="tool-search" template="tool-search" />
                        <DxItem name="searchPanel" />
                    </DxToolbar>
                    <template #pagination-table>
                        <div  v-if="rowTable > originData.filter.rows">
                            <a-pagination v-model:current="originData.filter.page" v-model:page-size="originData.filter.rows"
                                :total="rowTable" show-less-items @change="changePage" />
                        </div>
                    </template>
                    <template #tool-search>
                      <div class="search-form">
                          <div class="components-grid-demo-flex">
                              <a-row justify="end">
                                  <a-col class="ml-10">
                                      <label class="lable-item">해지:</label>
                                      <switch-basic v-model:valueSwitch="originData.filter.excludeCancel" :textCheck="'제외'"
                                          :textUnCheck="'포함'" />
                                  </a-col>
                                  <a-col class="ml-10">
                                      <label class="lable-item">매니저명 :</label>
                                      <list-manager-dropdown v-model:valueInput="originData.filter.manageUserId" width="165px"/>
                                  </a-col>
                                  <a-col class="ml-10">
                                      <label class="lable-item">영업자명 :</label>
                                      <list-sales-dropdown v-model:valueInput="originData.filter.salesRepresentativeId" width="165px"/>
                                  </a-col>
                                  <a-col>
                                      <CheckboxGroup :options="serviceTypeCheckbox" v-model:valueCheckbox="originData.filter.useServiceTypes" :size="'18'"/>
                                  </a-col>
                              </a-row>
                          </div>
                      </div>
                    </template>
                    <DxColumn data-field="code" caption="사업자코드" />
                    <DxColumn data-field="active" caption="상태" cell-template="active-cell" />
                    <template #active-cell="{ data }">
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
                    <DxColumn :width="150" caption="서비스" cell-template="used-withholding"/>
                    <template #used-withholding="{ data }">
                        <a-tag :style="{visibility: data.data.usedAccountingCount ? 'inherit' : 'hidden'}">회계</a-tag>
                        <a-tag :style="{visibility: data.data.usedAccountingCount ? 'inherit' : 'hidden',borderRadius: '50%'}" >{{ data.data.usedAccountingCount }}</a-tag>
                        <a-tag color="black" v-if="data.data.usedWithholding === true">원천</a-tag>
                    </template>
                    <DxColumn data-field="servicePrice" caption="이용료" :format="amountFormat" data-type="number" />
                    <DxColumn data-field="canceledAt" caption="해지일자" alignment="left"
                      data-type="date"
                      format="yyyy-MM-dd"
                    />
                    <DxColumn :width="120" cell-template="pupop" />
                    <template #pupop="{ data }">
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
import notification from '@/utils/notification';
import { makeDataClean } from '@/helpers/commonFunction';
import { serviceTypeCheckbox } from "./utils";
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
                rows: 1000,
                code: null,
                name: null,
                presidentName: null,
                address: null,
                manageUserId: null,
                salesRepresentativeId: null,
                excludeCancel: true,
                useServiceTypes: [1, 2],
            }
        })
        const { refetch: refetchData, loading, result, onError } = useQuery(queries.searchServiceContracts, originData, () => ({ fetchPolicy: "no-cache", enabled: trigger.value, }));
        onError((e) => {
            notification("error", e.message);
        });
        // process data after call getServiceContracts api
        watch(result, (value: any) => {
            rowTable.value = value.searchServiceContracts.totalCount
            listServiceContract.value = value.searchServiceContracts.datas.map((item: any) => ({...item}));
            trigger.value = false;
        });
        const changePage = () => {
            makeDataClean(originData.value, undefined, ["arr"])
            trigger.value = true;
        }
        const searching = () => {
            makeDataClean(originData.value, undefined, ["arr"])
            trigger.value = true;
        }
        const closePopup = () => {
            modalStatus.value = false
            makeDataClean(originData.value, undefined, ["arr"])
            trigger.value = true;
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
            rowTable,
            idSubRequest,
            setModalVisible,
            changePage,
            trigger,
            onExporting,
            serviceTypeCheckbox,
        }
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss">

</style>
