<template>
    <a-spin :spinning="spinning || loading" size="large">
        <action-header title="사업자관리" @actionSearch="searching" />
        <div id="bf-320">
            <div class="search-form">
                <div id="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16, 8]">
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">
                                    사업자코드 :
                                </label>
                                <default-text-box v-model:valueInput="originData.code" width="130px" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">상호:</label>
                                <default-text-box v-model:valueInput="originData.name" width="130px" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">대표자:</label>
                                <default-text-box v-model:valueInput="originData.presidentName" width="130px" />
                            </div>
                        </a-col>
                        <a-col>
                            <label class="lable-item">해지:</label>
                            <switch-basic v-model:valueSwitch="originData.excludeCancel" :textCheck="'포함'"
                                :textUnCheck="'제외'" />
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label class="lable-item">주소 :</label>
                                <default-text-box v-model:valueInput="originData.address" width="130px" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label>메니저명 :</label>
                                <list-manager-dropdown width="150px" />
                            </div>
                        </a-col>
                        <a-col>
                            <div class="dflex custom-flex">
                                <label>영업자명 :</label>
                                <list-sales-dropdown width="150px" />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :show-row-lines="true" :data-source="responApiSearchCompanies" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxToolbar>
                        
                        <DxItem name="searchPanel" />
                        <DxItem  template="pagination-table"/>
                        <DxItem name="exportButton" />
                        
                        <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" />
                    </DxToolbar>
                    <template #pagination-table>
                        <div v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" style="margin-top: 2px;"
                                :total="rowTable" show-less-items @change="searching" />
                        </div>
                    </template>
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
                        :total="rowTable" show-less-items @change="searching" />
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
import { defineComponent, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel,DxToolbar,DxItem } from 'devextreme-vue/data-grid';
import HistoryPopup from '../../../../components/HistoryPopup.vue';
import BF320Popup from "./components/BF320Popup.vue";
import DxButton from "devextreme-vue/button";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF3/BF320/index"
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon } from "../../../../helpers/commonFunction"
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxButton, DxPaging, DxSelection, DxExport, DxSearchPanel, DxSelectBox,DxToolbar,DxItem,
        BF320Popup, HistoryPopup,
        EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined
    },
    setup() {
        // config grid
        const amountFormat = { currency: 'VND', useGrouping: true }
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref()
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        const spinning = ref<boolean>(true);
        var idRowEdit = ref<number>(0)
        let modalStatus = ref<boolean>(false)
        const trigger = ref<boolean>(true)
        var responApiSearchCompanies = ref([])
        const originData = ref({
            ...dataSearchIndex,
            rows: per_page,
        })
        const { refetch: refetchData, result, loading } = useQuery(queries.searchCompanies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        const searching = () => {
            trigger.value = true;
            spinning.value = true;
            refetchData()
        }
        const handleClosePopup = () => {
            modalStatus.value = false
            refetchData()
        }
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '사업자관리')
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
        watch(result, (value) => {
            if (value) {
                rowTable.value = value.searchCompanies.totalCount
                responApiSearchCompanies.value = value.searchCompanies.datas
                trigger.value = false
                spinning.value = false;
            }
        });
        return {
            amountFormat,
            trigger,
            move_column,
            colomn_resize,
            idRowEdit,
            spinning,
            loading,
            modalHistoryStatus,
            responApiSearchCompanies,
            originData,
            searching,
            refetchData,
            onExporting,
            handleClosePopup,
            modalStatus,
            rowTable,
            popupData,
            setModalVisible,
            modalHistory,
        }
    },
});
</script>
<style lang="scss" scoped src="./style/index.scss"/>