<template>
    <action-header title="사업소득자등록" @actionSave="saving($event)" />
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
                <a-col :span="16" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete" size="large">
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
                                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
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
                                    <income-type :typeCode="data.data.incomeTypeCode" :typeName="data.data.incomeTypeName" ></income-type>
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
                                            <a-tooltip placement="top" @click="modalHistory(data.data.employeeId)">
                                                <template #title>변경이력</template>
                                                <HistoryOutlined />
                                            </a-tooltip>
                                            <a-tooltip placement="top"
                                                @click="actionDelete(data.data.employeeId, data.data.incomeTypeCode)">
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
                <a-col :span="8" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinessesDetail || loadingUpdate" size="large">
                        <div>
                            <a-form-item label="영업자코드" label-align="right">
                                <div class="custom-note">
                                    <text-number-box width="200px" v-model:valueInput="dataAction.employeeId"
                                        placeholder="숫자만 입력 가능" :disabled="disabledInput" :required="true" />
                                    <span>
                                        <InfoCircleFilled /> 최초 저장된 이후 수정 불가
                                    </span>
                                </div>
                            </a-form-item>
                            <a-form-item label="성명(상호)" label-align="right">
                                <default-text-box v-model:valueInput="dataAction.input.name" width="200px"
                                    placeholder="한글,영문(대문자) 입력 가능" :required="true" />
                            </a-form-item>
                            <a-form-item label="내/외국인" label-align="right">
                                <radio-group :arrayValue="arrForeigner" width="200px"
                                    v-model:valueRadioCheck="dataAction.input.foreigner" layoutCustom="horizontal" />
                            </a-form-item>
                            <a-form-item label="외국인 국적" label-align="right">
                                <country-code-select-box v-model:valueCountry="dataAction.input.nationalityCode"
                                    @textCountry="changeTextCountry" width="200px" :disabled="disabledInput2" />
                            </a-form-item>
                            <a-form-item label="외국인 체류자격" label-align="right">
                                <stay-qualification-select-box :disabled="disabledInput2"
                                    v-model:valueStayQualifiction="dataAction.input.stayQualification" width="200px" />
                            </a-form-item>
                            <a-form-item :label="textResidentId" label-align="right">
                                <id-number-text-box v-model:valueInput="dataAction.input.residentId" width="200px"
                                    placeholder="숫자 13자리" :required="true" />
                            </a-form-item>
                            <a-form-item label="소득구분" label-align="right">
                                <type-code-select-box width="200px" v-model:valueInput="dataAction.incomeTypeCode"
                                    @textTypeCode="changeTextTypeCode" :disabled="disabledInput" />
                            </a-form-item>
                            <a-form-item label="이메일" label-align="right">
                                <div class="custom-note">
                                    <mail-text-box width="300px" v-model:valueInput="dataAction.input.email"
                                        placeholder="abc@example.com" :required="true" />
                                    <span>
                                        <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                    </span>
                                </div>
                            </a-form-item>
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
        let disabledInput = ref(false)
        let disabledInput2 = ref(true)
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

        const { refetch: refetchDataDetail, loading: loadingGetEmployeeBusinessesDetail, onError: errorGetEmployeeBusinessesDetail, onResult: resEmployeeBusinessesDetail } = useQuery(queries.getEmployeeBusiness, valueCallApiGetEmployeeBusiness, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinessesDetail(res => {
            if (res) {
                dataAction.employeeId = res.data.getEmployeeBusiness.employeeId
                dataAction.input.name = res.data.getEmployeeBusiness.name
                dataAction.input.foreigner = res.data.getEmployeeBusiness.foreigner
                dataAction.input.nationality = res.data.getEmployeeBusiness.nationality
                dataAction.input.nationalityCode = res.data.getEmployeeBusiness.nationalityCode
                dataAction.input.stayQualification = res.data.getEmployeeBusiness.stayQualification
                dataAction.input.residentId = res.data.getEmployeeBusiness.residentId
                dataAction.incomeTypeCode = res.data.getEmployeeBusiness.incomeTypeCode
                dataAction.input.incomeTypeName = res.data.getEmployeeBusiness.incomeTypeName
                dataAction.input.email = res.data.getEmployeeBusiness.email
            }
        })
        errorGetEmployeeBusinessesDetail(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionUpdate,
            onError: upadateErr,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateEmployeeBusiness);
        updateDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })
        upadateErr(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionCreated,
            onError: createdErr,
            loading: loadingCreated,
            onDone: createdDone,
        } = useMutation(mutations.createEmployeeBusiness);
        createdDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })
        createdErr(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionDeleteApi,
            onError: deleteError,
            loading: loadingDelete,
            onDone: deleteDone,
        } = useMutation(mutations.deleteEmployeeBusiness);
        deleteError(res => {
            notification('error', res.message)
        })
        deleteDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })

        // ================WATCHING============================================
        watch(() => dataAction, (newValue, old) => {
            if (disabledInput.value == true) {
                dataSource.value.map((e: any) => {
                    if (e.employeeId == newValue.employeeId) {
                        e.foreigner = newValue.input.foreigner
                        e.incomeTypeCode = newValue.incomeTypeCode
                        e.incomeTypeName = newValue.input.incomeTypeName
                        e.name = newValue.input.name
                        e.residentId = newValue.input.residentId.slice(0, 6) + '-' + newValue.input.residentId.slice(7, 13)

                    }
                })
            }
        }, { deep: true });

        watch(() => dataAction.input.foreigner, (newValue, old) => {
            console.log(newValue);
            if (newValue == false){
                disabledInput2.value = true
                textResidentId.value = '주민등록번호'
            }else{
                disabledInput2.value = false
                textResidentId.value = '외국인번호 유효성'
            }
        },);

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
            disabledInput2.value = true
            valueCallApiGetEmployeeBusiness.incomeTypeCode = incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = employeeId
            refetchDataDetail()
        }

        const changeTextCountry = (text: any) => {
            dataAction.input.nationality = text
        }
        const changeTextTypeCode = (text: any) => {
            dataAction.input.incomeTypeName = text
        }
        const saving = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                // if form disabled => action edit 
                if (disabledInput.value == true) {
                    let dataActionedit = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format('YYYY')),
                        employeeId: parseInt(dataAction.employeeId ? dataAction.employeeId : ''),
                        incomeTypeCode: dataAction.incomeTypeCode,
                        input: {
                            name: dataAction.input.name,
                            foreigner: dataAction.input.foreigner,
                            nationality: dataAction.input.nationality,
                            nationalityCode: dataAction.input.nationalityCode,
                            stayQualification: dataAction.input.stayQualification,
                            residentId: dataAction.input.residentId.slice(0, 6) + '-' + dataAction.input.residentId.slice(6, 13),
                            email: dataAction.input.email,
                            incomeTypeName: dataAction.input.incomeTypeName,
                        }
                    }
                    actionUpdate(dataActionedit)
                } else { // if form disabled => action add 
                    let dataCreat = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format('YYYY')),
                        input: {
                            name: dataAction.input.name,
                            foreigner: dataAction.input.foreigner,
                            nationality: dataAction.input.nationality,
                            nationalityCode: dataAction.input.nationalityCode,
                            stayQualification: dataAction.input.stayQualification,
                            residentId: dataAction.input.residentId.slice(0, 6) + '-' + dataAction.input.residentId.slice(7, 13),
                            email: dataAction.input.email,
                            employeeId: parseInt(dataAction.employeeId ? dataAction.employeeId : ''),
                            incomeTypeCode: dataAction.incomeTypeCode,
                            incomeTypeName: dataAction.input.incomeTypeName,
                        }
                    }
                    actionCreated(dataCreat)
                }
            }
        }

        const addRow = () => {
            disabledInput.value = false
            dataAction.employeeId = valueDefaultAction.employeeId
            dataAction.input.name = valueDefaultAction.name
            dataAction.input.foreigner = valueDefaultAction.foreigner
            dataAction.input.nationality = valueDefaultAction.nationality
            dataAction.input.nationalityCode = valueDefaultAction.nationalityCode
            dataAction.input.stayQualification = valueDefaultAction.stayQualification
            dataAction.input.residentId = valueDefaultAction.residentId
            dataAction.incomeTypeCode = valueDefaultAction.incomeTypeCode
            dataAction.input.incomeTypeName = valueDefaultAction.incomeTypeName
            dataAction.input.email = valueDefaultAction.email
        }

        const actionDelete = (employeeId: any, incomeTypeCode: any) => {
            valueCallApiGetEmployeeBusiness.incomeTypeCode = incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = employeeId
            modalStatus.value = true
        }

        const statusComfirm = (res: any) => {
            if (res == true)
                actionDeleteApi(valueCallApiGetEmployeeBusiness)

        }

        const modalHistory = (data: any) => {
            modalHistoryStatus.value = true;
        }

        return {
            textResidentId,
            disabledInput2,
            popupData,
            modalHistory,
            modalHistoryStatus,
            loadingCreated,
            disabledInput,
            loadingGetEmployeeBusinessesDetail,
            loadingGetEmployeeBusinesses,
            arrForeigner,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            dataAction,
            loadingUpdate,
            loadingDelete,
            modalStatus,
            statusComfirm,
            actionDelete,
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
