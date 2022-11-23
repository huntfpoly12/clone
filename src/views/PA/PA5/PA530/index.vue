<template>
    <action-header title="일용직근로소득원천징수영수증" />
    <div id="pa-530">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col :span="4">
                    <label class="lable-item">귀속연도 :</label>
                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </a-col>
                <a-col :span="20">
                    <div class="custom-flex">
                        <label class="lable-item">지급월 :</label>
                        <a-row :gutter="[24, 8]">
                            <!-- ================== Row 1 =========================== -->
                            <a-col :span="6">
                                <checkbox-basic size="14" label="전체" v-model:valueCheckbox="checkAllValue" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="year1"
                                    :label="globalYear + 1 + '년 01월'" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="year2"
                                    :label="globalYear + 1 + '년 02월'" />
                            </a-col>
                            <a-col :span="6" />

                            <!-- ================== Row 2 =========================== -->
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter1.value"
                                    :label="arrCheckBoxSearch.quarter1.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter2.value"
                                    :label="arrCheckBoxSearch.quarter2.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter3.value"
                                    :label="arrCheckBoxSearch.quarter3.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter4.value"
                                    :label="arrCheckBoxSearch.quarter4.label" />
                            </a-col>

                            <!-- ================== Row 3 =========================== -->
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month1.value"
                                    :label="arrCheckBoxSearch.month1.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month2.value"
                                    :label="arrCheckBoxSearch.month2.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month3.value"
                                    :label="arrCheckBoxSearch.month3.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month4.value"
                                    :label="arrCheckBoxSearch.month4.label" />
                            </a-col>

                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month5.value"
                                    :label="arrCheckBoxSearch.month5.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month6.value"
                                    :label="arrCheckBoxSearch.month6.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month7.value"
                                    :label="arrCheckBoxSearch.month7.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month8.value"
                                    :label="arrCheckBoxSearch.month8.label" />
                            </a-col>

                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month9.value"
                                    :label="arrCheckBoxSearch.month9.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month10.value"
                                    :label="arrCheckBoxSearch.month10.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month11.value"
                                    :label="arrCheckBoxSearch.month11.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month12.value"
                                    :label="arrCheckBoxSearch.month12.label" />
                            </a-col>
                        </a-row>
                    </div>

                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <a-spin :spinning="loadingGetEmployeeBusinesses" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxToolbar>
                        <DxItem location="after" template="pagination-table" />
                        <DxItem template="pagination-send-group-mail" />
                    </DxToolbar>
                    <template #pagination-table>
                        <div v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items />
                        </div>
                    </template>
                    <template #pagination-send-group-mail>
                        <div class="custom-mail-group">
                            <DxButton><img src="../../../../assets/images/emailGroup.png" alt="" style="width: 33px;" />
                            </DxButton>
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
                    <template #pupop="{ data }">
                        <div class="custom-action">
                            <img src="../../../../assets/images/email.svg" alt="" style="width: 25px;" />

                        </div>
                    </template>
                </DxDataGrid>
                <div class="pagination-table" v-if="rowTable > originData.rows">
                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                        :total="rowTable" show-less-items style="margin-top: 10px" @change="searching" />
                </div>
                <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
                    title="Title Notification" content="Content notification" okText="네" cancelText="아니요"
                    @checkConfirm="statusComfirm" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" typeHistory="pa-530" />
            </a-spin>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/PA/PA5/PA530/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue";
import { onExportingCommon } from "../../../../helpers/commonFunction"
import { origindata, arrCheckBox } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "../../../../../src/helpers/commonFunction";
import dayjs from 'dayjs';
import mutations from "../../../../graphql/mutations/PA/PA5/PA530/index";
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
        DxButton,
        InfoCircleFilled,
        HistoryPopup
    },
    setup() {
        const globalYear: any = computed(() => store.state.settings.globalYear);
        const arrCheckBoxSearch = reactive({
            ...arrCheckBox
        })
        let checkAllValue = ref(true)
        let year1 = reactive({ 
            value: true,
        })
        let year2 = reactive({ 
            value: true,
        })

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

        const statusComfirm = (res: any) => {

        }

        return {
            year1,
            year2,
            checkAllValue,
            arrCheckBoxSearch,
            textResidentId,
            popupData,
            modalHistoryStatus,
            loadingGetEmployeeBusinesses,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            modalStatus,
            globalYear,
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
