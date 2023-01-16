<template>
    <action-header title="사업소득자등록" @actionSave="saving($event)" :buttonDelete="false" />
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
                        <img src="@/assets/images/user.svg" style="width: 70px" />
                    </div>
                </a-col>
                <a-col :span="21"></a-col>
                <a-col :span="16" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            v-model:focused-row-key="focusedRowKey" :column-auto-width="true" :onRowClick="actionEdit"
                            :focused-row-enabled="true">
                            <DxScrolling column-rendering-mode="virtual" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" :allow-export-selected-data="true" />
                            <DxToolbar>
                                <DxItem location="after" template="pagination-table" />
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" />
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                                <DxItem name="addRowButton" show-text="always" />
                            </DxToolbar>
                            <template #button-template>
                                <DxButton icon="plus" @click="addRow" />
                            </template>
                            <template #button-history style="border-color: #ddd;">
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #pagination-table>
                                <div v-if="rowTable > originData.rows">
                                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                        :total="rowTable" show-less-items />
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
                            <DxColumn caption="주민등록번호" cell-template="resident-id" width="200px" />
                            <template #resident-id="{ data }" class="custom-action">
                                <a-tooltip placement="top"
                                    v-if="data.data.residentId?.length == 14
                                    && parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13 && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32"
                                    key="black">
                                    {{ data.data.residentId }}
                                </a-tooltip>
                                <a-tooltip placement="top" v-else title="ERROR">
                                    {{ data.data.residentId }}
                                </a-tooltip>
                            </template>
                            <DxColumn caption="소득부분" cell-template="grade-cell" width="200px" />
                            <template #grade-cell="{ data }" class="custom-action">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="data.data.incomeTypeName" />
                            </template>
                            <DxColumn :width="70" cell-template="pupop" />
                            <template #pupop="{ data }" class="custom-action">
                                <div class="custom-action" style="text-align: center;">
                                    <a-tooltip placement="top" v-if="data.data.deletable == true"
                                        @click="actionDelete(data.data.employeeId, data.data.incomeTypeCode)">
                                        <template #title>변경이력</template>
                                        <DeleteOutlined />
                                    </a-tooltip>
                                </div>
                            </template>
                        </DxDataGrid>
                        <div class="pagination-table" v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items style="margin-top: 10px" />
                        </div>
                    </a-spin>
                </a-col>
                <a-col :span="8" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinessesDetail || loadingUpdate || loadingCreated"
                        size="large" :key="resetFormNum">
                        <a-form-item label="코드" label-align="right" class="red">
                            <div class="custom-note ">
                                <text-number-box width="200px" v-model:valueInput="dataAction.employeeId"
                                    placeholder="숫자만 입력 가능" :disabled="disabledInput" :required="true" />
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 최초 저장된 이후
                                    수정 불가
                                </span>
                            </div>
                        </a-form-item>
                        <a-form-item label="성명(상호)" label-align="right" class="red">
                            <default-text-box v-model:valueInput="dataAction.name" width="200px"
                                placeholder="한글,영문(대문자) 입력 가능" :required="true" />
                        </a-form-item>
                        <a-form-item label="내/외국인" label-align="right" class="red">
                            <radio-group :arrayValue="arrForeigner" width="200px"
                                v-model:valueRadioCheck="dataAction.foreigner" layoutCustom="horizontal" />
                        </a-form-item>
                        <a-form-item label="외국인 국적" label-align="right" :class="disabledInput2 ? '' : 'red'">
                            <country-code-select-box v-if="dataAction.foreigner"
                                v-model:valueCountry="dataAction.nationalityCode" @textCountry="changeTextCountry"
                                width="200px" :hiddenOptionKR="true" :required="true" />
                            <country-code-select-box v-else v-model:valueCountry="dataAction.nationalityCode"
                                @textCountry="changeTextCountry" width="200px" :disabled="true" :required="true" />
                        </a-form-item>
                        <a-form-item label="외국인 체류자격" label-align="right" :class="disabledInput2 ? '' : 'red'">
                            <stay-qualification-select-box :disabled="disabledInput2" :required="dataAction.foreigner"
                                v-model:valueStayQualifiction="dataAction.stayQualification" width="200px" />
                        </a-form-item>
                        <a-form-item :label="textResidentId" label-align="right" class="red">
                            <id-number-text-box v-model:valueInput="dataAction.residentId" width="200px"
                                placeholder="숫자 13자리" :required="true" :disabled="!dataAction.deletable" />
                        </a-form-item>
                        <a-form-item label="소득구분" label-align="right" class="red">
                            <type-code-select-box width="200px" v-model:valueInput="dataAction.incomeTypeCode"
                                @textTypeCode="changeTextTypeCode" :disabled="disabledInput" />
                        </a-form-item>
                        <a-form-item label="이메일" label-align="right" class="red">
                            <div class="custom-note">
                                <mail-text-box width="300px" v-model:valueInput="dataAction.email"
                                    placeholder="abc@example.com" :required="true" />
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등
                                    주요 서류를 메일로 전달 가능합니다.
                                </span>
                            </div>
                        </a-form-item>
                    </a-spin>
                </a-col>
            </a-row>
        </div>
    </div>
    <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
        :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
        title="변경이력" typeHistory="pa-610" />
    <PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
        title="변경 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmChange" />
    <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
        title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA610/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { onExportingCommon } from "@/helpers/commonFunction"
import { origindata, ArrForeigner, valueDefaultAction } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import mutations from "@/graphql/mutations/PA/PA6/PA610/index";
import HistoryPopup from '@/components/HistoryPopup.vue';
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, EditOutlined, HistoryOutlined, DxToolbar, DxEditing, DxGrouping, DxItem, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, ArrForeigner, DxButton, HistoryPopup
    },
    setup() {
        const contentDelete = Message.getMessage('PA120', '002').message
        let popupData = ref([])
        const focusedRowKey = ref()
        const modalStatusAdd = ref(false)
        let modalHistoryStatus = ref<boolean>(false)
        const dataSource = ref([]);
        const resetFormNum = ref(1);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const arrForeigner = ArrForeigner
        const trigger = ref<boolean>(true);
        const triggerDetail = ref<boolean>(false);
        const globalYear = computed(() => store.state.settings.globalYear)
        const valueCallApiGetEmployeeBusinesses = reactive({
            companyId: companyId,
            imputedYear: globalYear,
        })
        let valueCallApiGetEmployeeBusiness: any = reactive({
            companyId: companyId,
            imputedYear: globalYear,
            incomeTypeCode: '',
            employeeId: null
        })
        const modalChangeRow = ref(false)
        let dataAction: any = reactive({
            // imputedYear: globalYear,
            ...valueDefaultAction
        })
        let dataRowOld = reactive({
            // imputedYear: globalYear,
            ...valueDefaultAction
        })
        let disabledInput = ref(false)
        let disabledInput2 = ref(true)
        const modalStatus = ref(false)
        const textResidentId = ref('주민등록번호')
        // let changeValueEit = ref(false)
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
            if (res.data) {
                console.log(res.data);

                dataAction.employeeId = res.data.getEmployeeBusiness.employeeId
                dataAction.name = res.data.getEmployeeBusiness.name
                dataAction.foreigner = res.data.getEmployeeBusiness.foreigner
                dataAction.nationality = res.data.getEmployeeBusiness.nationality
                dataAction.nationalityCode = res.data.getEmployeeBusiness.nationalityCode
                dataAction.stayQualification = res.data.getEmployeeBusiness.stayQualification
                dataAction.residentId = res.data.getEmployeeBusiness.residentId
                dataAction.incomeTypeCode = res.data.getEmployeeBusiness.incomeTypeCode
                dataAction.incomeTypeName = res.data.getEmployeeBusiness.incomeTypeName
                dataAction.email = res.data.getEmployeeBusiness.email
                dataAction.deletable = res.data.getEmployeeBusiness.deletable

                dataRowOld.employeeId = res.data.getEmployeeBusiness.employeeId
                dataRowOld.incomeTypeCode = res.data.getEmployeeBusiness.incomeTypeCode
                dataRowOld = { ...dataAction }
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
        updateDone(() => {
            valueCallApiGetEmployeeBusiness.incomeTypeCode = rowEdit.value.incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = rowEdit.value.employeeId
            refetchData()
            refetchDataDetail()
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
        createdDone(() => {
            refetchData()
            focusedRowKey.value = parseInt(dataAction.employeeId)
            disabledInput.value = true
            triggerDetail.value = true
            valueCallApiGetEmployeeBusiness.incomeTypeCode = dataAction.incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = parseInt(dataAction.employeeId)
            refetchDataDetail()
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
        deleteDone(() => {
            refetchData()
            resetFormNum.value++;
            focusedRowKey.value = null;
            disabledInput.value = false
            Object.assign(dataAction, valueDefaultAction);
            notification('success', `업데이트 완료!`)
        })
        // ================WATCHING============================================
        watch(() => dataAction.foreigner, (newValue) => {
            if (newValue == false) {
                dataAction.nationalityCode = 'KR'
                dataAction.stayQualification = null
                disabledInput2.value = true
                textResidentId.value = '주민등록번호'
            } else {
                dataAction.nationalityCode = dataAction.nationalityCode == 'KR' ? null : dataAction.nationalityCode
                disabledInput2.value = false
                textResidentId.value = '외국인번호 유효성'
            }
        });
        // ================FUNCTION============================================
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };
        let rowEdit = ref()
        const actionEdit = (data: any) => {
            rowEdit.value = data.data
            if (JSON.stringify(dataRowOld) !== JSON.stringify(dataAction))
                modalChangeRow.value = true
            else {
                triggerDetail.value = true
                valueCallApiGetEmployeeBusiness.incomeTypeCode = rowEdit.value.incomeTypeCode
                valueCallApiGetEmployeeBusiness.employeeId = rowEdit.value.employeeId
                refetchDataDetail()
            }
            disabledInput.value = true
        }
        const changeTextCountry = (text: any) => {
            dataAction.nationality = text
        }
        const changeTextTypeCode = (text: any) => {
            dataAction.incomeTypeName = text
        }
        const saving = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                focusedRowKey.value = dataAction.employeeId
                res.brokenRules[0].validator.focus();
            } else {
                // if form disabled => action edit 
                if (disabledInput.value == true) {
                    let residentId = dataAction.residentId.replace('-', '')
                    let dataActionedit = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: parseInt(dataAction.employeeId ? dataAction.employeeId : ''),
                        incomeTypeCode: dataAction.incomeTypeCode,
                        input: {
                            name: dataAction.name,
                            foreigner: dataAction.foreigner,
                            nationality: dataAction.nationality,
                            nationalityCode: dataAction.nationalityCode,
                            stayQualification: dataAction.stayQualification,
                            residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                            email: dataAction.email,
                            incomeTypeName: dataAction.incomeTypeName,
                        }
                    }
                    actionUpdate(dataActionedit)
                } else { // if form disabled => action add 
                    let dataCreat = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        input: {
                            name: dataAction.name,
                            foreigner: dataAction.foreigner,
                            nationality: dataAction.nationality,
                            nationalityCode: dataAction.nationalityCode,
                            stayQualification: dataAction.stayQualification,
                            residentId: dataAction.residentId.slice(0, 6) + '-' + dataAction.residentId.slice(6, 13),
                            email: dataAction.email,
                            employeeId: parseInt(dataAction.employeeId ? dataAction.employeeId : ''),
                            incomeTypeCode: dataAction.incomeTypeCode,
                            incomeTypeName: dataAction.incomeTypeName,
                        }
                    }
                    actionCreated(dataCreat)
                }
            }
        }
        const addRow = () => {
            if (JSON.stringify({ ...valueDefaultAction }) !== JSON.stringify(dataAction) && disabledInput.value == false) {
                modalStatusAdd.value = true
            } else {
                resetFormNum.value++;
                focusedRowKey.value = null;
                disabledInput.value = false
                Object.assign(dataAction, valueDefaultAction);
            }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                resetFormNum.value++;
                Object.assign(dataAction, valueDefaultAction);
            }
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
        const statusComfirmChange = (res: any) => {
            if (res) {
                let dataCreat = {
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    input: {
                        name: dataAction.name,
                        foreigner: dataAction.foreigner,
                        nationality: dataAction.nationality,
                        nationalityCode: dataAction.nationalityCode,
                        stayQualification: dataAction.stayQualification,
                        residentId: dataAction.residentId.slice(0, 6) + '-' + dataAction.residentId.slice(6, 13),
                        email: dataAction.email,
                        employeeId: parseInt(dataAction.employeeId ? dataAction.employeeId : ''),
                        incomeTypeCode: dataAction.incomeTypeCode,
                        incomeTypeName: dataAction.incomeTypeName,
                    }
                }
                actionCreated(dataCreat)
                // (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
            } else {
                console.log('2');
                valueCallApiGetEmployeeBusiness.incomeTypeCode = rowEdit.value.incomeTypeCode
                valueCallApiGetEmployeeBusiness.employeeId = rowEdit.value.employeeId
                triggerDetail.value = true
                refetchDataDetail()
            }
        }
        const modalHistory = () => {
            modalHistoryStatus.value = true;
        }
        return {
            resetFormNum,
            dataRowOld,
            focusedRowKey,
            modalStatusAdd,
            statusComfirmAdd,
            textResidentId, disabledInput2, popupData, modalHistoryStatus, loadingCreated, disabledInput, loadingGetEmployeeBusinessesDetail, loadingGetEmployeeBusinesses, arrForeigner, rowTable, dataSource, per_page, move_column, colomn_resize, originData, dataAction, loadingUpdate, loadingDelete, modalStatus, contentDelete, modalChangeRow,
            statusComfirm, actionDelete, addRow, changeTextTypeCode, actionEdit, onExporting, changeTextCountry, modalHistory, saving, statusComfirmChange
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
