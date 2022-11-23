<template>
    <action-header title="사업소득자등록" />
    <div id="pa-610">
        <div class="page-content">
            <a-row>
                <a-col :span="3" class="total-user">
                    <div>
                        <span>{{ dataSource.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <i class="dx-icon-user"></i>
                    </div>
                </a-col>
                <a-col :span="21"></a-col>
                <a-col :span="24">
                    <a-spin :spinning="loadingGetEmployeeBusinesses" size="large">
                        <div>
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                                :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                                :column-auto-width="true">
                                <DxScrolling column-rendering-mode="virtual" />
                                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                                <DxExport :enabled="true" :allow-export-selected-data="true" />
                                <DxToolbar>
                                    <DxItem location="after" template="pagination-table" />
                                    <DxItem name="searchPanel" />
                                    <DxItem name="exportButton" />
                                    <DxItem name="groupPanel" />
                                    <DxItem name="columnChooserButton" />
                                </DxToolbar>
                                <template #pagination-table>
                                    <div v-if="rowTable > originData.rows">
                                        <a-pagination v-model:current="originData.page"
                                            v-model:page-size="originData.rows" :total="rowTable" show-less-items />
                                    </div>
                                </template>
                                <DxColumn caption="성명 (상호)" cell-template="tag" />
                                <template #tag="{ data }" class="custom-action">
                                    <div class="custom-action">
                                        <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                            :idCardNumber="data.data.residentId" :status="data.data.status"
                                            :foreigner="data.data.foreigner" :checkStatus="false" />
                                    </div>
                                </template>

                                <DxColumn caption="주민등록번호" data-field="residentId" />
                                <DxColumn caption="소득부분" cell-template="grade-cell" />
                                <template #grade-cell="{ data }" class="custom-action">
                                    <div class="custom-grade-cell">
                                        <div class="custom-grade-cell-tag">{{ data.data.incomeTypeCode }}</div>
                                        <span>{{ data.data.incomeTypeName }}</span>
                                    </div>
                                </template>

                                <DxColumn :width="80" cell-template="pupop" />
                                <template #pupop="{ data }" class="custom-action">
                                    <div class="custom-action">
                                        <a-space :size="10">
                                            <a-tooltip placement="top">
                                                <template #title>편집</template>
                                                <EditOutlined />
                                            </a-tooltip>
                                            <a-tooltip placement="top" @click="modalHistory(data.data.employeeId)">
                                                <template #title>변경이력</template>
                                                <HistoryOutlined />
                                            </a-tooltip>
                                            <a-tooltip placement="top">
                                                <template #title>변경이력</template>
                                                <DeleteOutlined />
                                            </a-tooltip>
                                        </a-space>
                                    </div>
                                </template>
                            </DxDataGrid>
                            <div class="pagination-table" v-if="rowTable > originData.rows">
                                <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                    :total="rowTable" show-less-items style="margin-top: 10px" @change="searching" />
                            </div>
                            <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false"
                                typeModal="confirm" title="Title Notification" content="Content notification" okText="네"
                                cancelText="아니요" @checkConfirm="statusComfirm" />
                            <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                                :data="popupData" title="변경이력" typeHistory="pa-610" />
                        </div>
                    </a-spin>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/PA/PA6/PA610/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue";
import { onExportingCommon } from "../../../../helpers/commonFunction"
import { origindata, ArrForeigner, valueDefaultAction } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "../../../../../src/helpers/commonFunction";
import dayjs from 'dayjs';
import mutations from "../../../../graphql/mutations/PA/PA6/PA610/index";
import HistoryPopup from '../../../../components/HistoryPopup.vue';
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
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
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        ArrForeigner,
        DxButton,
        InfoCircleFilled,
        HistoryPopup
    },
    setup() {
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });

        const trigger = ref<boolean>(true);
        const valueCallApiGetEmployeeBusinesses = reactive({
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
        })
        let dataAction = reactive({
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
            employeeId: null,
            incomeTypeCode: '940100',
            input: {
                name: '',
                foreigner: false,
                nationality: '대한민국',
                nationalityCode: 'KR',
                stayQualification: 'C-4',
                residentId: '',
                incomeTypeName: '저술가',
                email: '',
            }
        })
        const modalStatus = ref(false)
        const textResidentId = ref('주민등록번호')
        // ================GRAPQL==============================================
        const { refetch: refetchData, loading: loadingGetEmployeeBusinesses, onError: errorGetEmployeeBusinesses, onResult: resEmployeeBusinesses } = useQuery(queries.getEmployeeBusinesses, valueCallApiGetEmployeeBusinesses, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinesses(res => {
            dataSource.value = res.data.getEmployeeBusinesses
        })
        errorGetEmployeeBusinesses(res => {
            notification('error', res.message)
        })



        // ================WATCHING============================================


        // ================FUNCTION============================================
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };
        const searching = () => {
            // originData.grade = saleGrade.value == 0 ? null : saleGrade.value;
            // originData.statuses = [saleStatus.value];
            // trigger.value = true;
            // refetchData();
        };

        const modalHistory = (data: any) => {
            modalHistoryStatus.value = true;
        }

        const statusComfirm = (res:any)=>{
            
        }

        return {
            textResidentId,
            popupData,
            modalHistoryStatus,
            loadingGetEmployeeBusinesses,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            dataAction,
            modalStatus,
            statusComfirm,
            modalHistory,
            onExporting,
            searching,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
