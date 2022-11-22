<template>
    <standard-form name="page-610">
        <action-header title="사업소득자등록" @actionSave="saving($event)" />
        <div id="pa-610">
            <div class="page-content">
                <a-row>
                    <a-col :span="3" class="total-user">
                        <div>
                            <span>300</span>
                            <br>
                            <span>전체</span>
                        </div>
                        <div>
                            <i class="dx-icon-user"></i>
                        </div>
                    </a-col>
                    <a-col :span="21"></a-col>
                    <a-col :span="16" class="custom-layout">
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
                                        <DxItem location="after" template="button-template"
                                            css-class="cell-button-add" />
                                        <DxItem name="groupPanel" />
                                        <DxItem name="addRowButton" show-text="always" />
                                        <DxItem name="columnChooserButton" />
                                    </DxToolbar>
                                    <template #button-template>
                                        <DxButton icon="plus" @click="addRow" />
                                    </template>
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
                                                <a-tooltip placement="top"
                                                    @click="actionEdit(data.data.employeeId, data.data.incomeTypeCode)">
                                                    <template #title>편집</template>
                                                    <EditOutlined />
                                                </a-tooltip>
                                                <a-tooltip placement="top">
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
                                        :total="rowTable" show-less-items style="margin-top: 10px"
                                        @change="searching" />
                                </div>
                            </div>
                        </a-spin>
                    </a-col>
                    <a-col :span="8" class="custom-layout">
                        <a-spin :spinning="loadingGetEmployeeBusinessesDetail" size="large">
                            <div>
                                <a-form-item label="영업자코드" label-align="right">
                                    <div class="custom-note">
                                        <default-text-box width="200px" v-model:valueInput="dataAction.employeeId"
                                            placeholder="숫자만 입력 가능" :disabled="disabledInput" :required="true" />
                                        <span>
                                            <InfoCircleFilled /> 최초 저장된 이후 수정 불가
                                        </span>
                                    </div>
                                </a-form-item>
                                <a-form-item label="성명(상호)" label-align="right">
                                    <default-text-box v-model:valueInput="dataAction.name" width="200px"
                                        placeholder="한글,영문(대문자) 입력 가능" :required="true" />
                                </a-form-item>
                                <a-form-item label="내/외국인" label-align="right">
                                    <radio-group :arrayValue="arrForeigner" width="200px"
                                        v-model:valueRadioCheck="dataAction.foreigner" layoutCustom="horizontal" />
                                </a-form-item>
                                <a-form-item label="외국인 국적" label-align="right">
                                    <country-code-select-box v-model:valueCountry="dataAction.nationalityCode"
                                        @textCountry="changeTextCountry" width="200px" :disabled="disabledInput" />
                                </a-form-item>
                                <a-form-item label="외국인 체류자격" label-align="right">
                                    <stay-qualification-select-box :disabled="disabledInput"
                                        v-model:valueStayQualifiction="dataAction.stayQualification" width="200px" />
                                </a-form-item>
                                <a-form-item label="주민(외국인)번호" label-align="right">
                                    <default-text-box v-model:valueInput="dataAction.residentId" width="200px"
                                        placeholder="숫자 13자리" :required="true" />
                                </a-form-item>
                                <a-form-item label="소득구분" label-align="right">
                                    <type-code-select-box width="200px" v-model:valueInput="dataAction.incomeTypeCode"
                                        @textTypeCode="changeTextTypeCode" :disabled="disabledInput" />
                                </a-form-item>
                                <a-form-item label="이메일" label-align="right">
                                    <div class="custom-note">
                                        <mail-text-box width="300px" v-model:valueInput="dataAction.email"
                                            placeholder="abc@example.com" :required="true" />
                                        <span>
                                            <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                        </span>
                                    </div>
                                </a-form-item>

                                <button-basic :text="'단추'" :type="'success'" :mode="'contained'"
                                    @onClick="saving($event)" />
                            </div>
                        </a-spin>
                    </a-col>
                </a-row>
            </div>
        </div>
    </standard-form>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/PA/PA6/PA610/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue";
import { onExportingCommon } from "../../../../helpers/commonFunction"
import { origindata, ArrForeigner, valueDefaultAction } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "../../../../../src/helpers/commonFunction";
import dayjs from 'dayjs';

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
        InfoCircleFilled
    },
    setup() {
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const arrForeigner = ArrForeigner
        const trigger = ref<boolean>(true);
        const triggerDetail = ref<boolean>(false);
        const valueCallApiGetEmployeeBusinesses = reactive({
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
        })
        let valueCallApiGetEmployeeBusiness = reactive({
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
            incomeTypeCode: '',
            employeeId: null
        })
        let dataAction = reactive({
            ...valueDefaultAction
        })
        let disabledInput = ref(false)

        // ================GRAPQL==============================================
        const { refetch: refetchData, loading: loadingGetEmployeeBusinesses, onError: errorGetEmployeeBusinesses, onResult: resEmployeeBusinesses } = useQuery(queries.getEmployeeBusinesses, valueCallApiGetEmployeeBusinesses, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinesses(res => {
            // console.log(res);
            dataSource.value = res.data.getEmployeeBusinesses
        })
        errorGetEmployeeBusinesses(res => {
            notification('error', res.message)
        })

        const { refetch: refetchDataDetail, loading: loadingGetEmployeeBusinessesDetail, onError: errorGetEmployeeBusinessesDetail, onResult: resEmployeeBusinessesDetail } = useQuery(queries.getEmployeeBusiness, valueCallApiGetEmployeeBusiness, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinessesDetail(res => {
            if (res) {
                dataAction.employeeId = res.data.getEmployeeBusiness.employeeId
                dataAction.name = res.data.getEmployeeBusiness.name
                dataAction.foreigner = res.data.getEmployeeBusiness.foreigner
                dataAction.natinationalityonality = res.data.getEmployeeBusiness.natinationalityonality
                dataAction.nationalityCode = res.data.getEmployeeBusiness.nationalityCode
                dataAction.stayQualification = res.data.getEmployeeBusiness.stayQualification
                dataAction.residentId = res.data.getEmployeeBusiness.residentId
                dataAction.incomeTypeCode = res.data.getEmployeeBusiness.incomeTypeCode
                dataAction.incomeTypeName = res.data.getEmployeeBusiness.incomeTypeName
                dataAction.email = res.data.getEmployeeBusiness.email
            }
        })
        errorGetEmployeeBusinessesDetail(res => {
            notification('error', res.message)
        })



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
        const actionEdit = (employeeId: any, incomeTypeCode: any) => {
            disabledInput.value = true
            triggerDetail.value = true
            valueCallApiGetEmployeeBusiness.incomeTypeCode = incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = employeeId
            refetchDataDetail()

        }

        const changeTextCountry = (text: any) => {
            dataAction.natinationalityonality = text
        }
        const changeTextTypeCode = (text: any) => {
            dataAction.incomeTypeName = text
        }
        const saving = (e: any) => {
            console.log(e);

            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            }
            // if form disabled => action edit 
            if (disabledInput.value == true) {

            } else { // if form disabled => action add 

            }
        }

        const addRow = () => {
            disabledInput.value = false
            dataAction.employeeId = valueDefaultAction.employeeId
            dataAction.name = valueDefaultAction.name
            dataAction.foreigner = valueDefaultAction.foreigner
            dataAction.natinationalityonality = valueDefaultAction.natinationalityonality
            dataAction.nationalityCode = valueDefaultAction.nationalityCode
            dataAction.stayQualification = valueDefaultAction.stayQualification
            dataAction.residentId = valueDefaultAction.residentId
            dataAction.incomeTypeCode = valueDefaultAction.incomeTypeCode
            dataAction.incomeTypeName = valueDefaultAction.incomeTypeName
            dataAction.email = valueDefaultAction.email
        }
        return {
            disabledInput,
            loadingGetEmployeeBusinessesDetail,
            loadingGetEmployeeBusinesses,
            arrForeigner,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            dataAction,
            addRow,
            changeTextTypeCode,
            actionEdit,
            onExporting,
            searching,
            changeTextCountry,
            saving
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
