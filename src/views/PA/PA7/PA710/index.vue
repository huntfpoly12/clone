<template>
    <action-header title="기타소득자등록" @actionSave="actionSave($event)" :buttonDelete="false" />
    <div id="pa-710">
        <div class="page-content">
            <a-row gutter="12">
                <a-col span="3" class="total-user">
                    <div>
                        <span>{{ listEmployeeExtra.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <i class="dx-icon-user"></i>
                    </div>
                </a-col>
                <a-col span="21">
                </a-col>
                <a-col span="16" class="custom-layout">
                    <a-spin :spinning="loading" size="large">
                        <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="listEmployeeExtra" :show-borders="true" key-expr="employeeId"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="editData" v-model:focused-row-key="focusedRowKey"
                            :focused-row-enabled="true">
                            <DxScrolling mode="infinite" />
                            <DxSorting mode="none" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" :allow-export-selected-data="true" />
                            <DxToolbar>
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" />
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            </DxToolbar>
                            <template #button-history style="border-color: #ddd;">
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #button-template>
                                <DxButton icon="plus" @click="formCreate" />
                            </template>
                            <DxColumn caption="성명 (상호)" cell-template="company-name" />
                            <template #company-name="{ data }">
                                <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                    :idCardNumber="data.data.residentId" :status="data.data.status"
                                    :foreigner="data.data.foreigner" :checkStatus="false" />
                            </template>
                            <DxColumn caption="주민등록번호" data-field="residentId" />
                            <DxColumn caption="소득부분" cell-template="grade-cell" />
                            <template #grade-cell="{ data }" class="custom-action">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="data.data.incomeTypeName"></income-type>
                            </template>
                            <DxColumn :width="50" cell-template="pupop" />
                            <template #pupop="{ data }" class="custom-action">
                                <div class="custom-action">
                                    <a-space :size="10">
                                        <DeleteOutlined v-if="data.data.deletable" @click="deleteData(data)" />
                                    </a-space>
                                </div>
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <a-col span="8" class="custom-layout">
                    <a-spin :spinning="loadingForm" size="large">
                        <a-form-item label="코드" :label-col="labelCol" class="red">
                            <div class="custom-note d-flex-center">
                                <text-number-box :required="true" :width="200" v-model:valueInput="formState.employeeId"
                                    placeholder="숫자만 입력 가능" :disabled="checkForm">
                                </text-number-box>
                                <div class="pl-5">
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                    <span class="style-note">최초 저장된 이후 수정 불가</span>
                                </div>
                            </div>
                        </a-form-item>
                        <a-form-item label="성명(상호) " :label-col="labelCol" class="red">
                            <default-text-box :width="200" v-model:valueInput="formState.name" :required="true"
                                placeholder="한글,영문(대문자) 입력 가능">
                            </default-text-box>
                        </a-form-item>
                        <a-form-item label="내/외국인" :label-col="labelCol" class="red">
                            <radio-group :arrayValue="optionsRadio" :required="true"
                                v-model:valueRadioCheck="formState.foreigner" :layoutCustom="'horizontal'" />
                        </a-form-item>
                        <a-form-item label="외국인 국적" :label-col="labelCol" :class="!formState.foreigner ? '' : 'red'">
                            <country-code-select-box v-if="formState.foreigner" style="width: 200px"
                                v-model:valueCountry="formState.nationalityCode" @textCountry="textCountry"
                                :required="formState.foreigner" :disabled="!formState.foreigner"
                                :hiddenOptionKR="true" />
                            <country-code-select-box v-else style="width: 200px"
                                v-model:valueCountry="formState.nationalityCode" @textCountry="textCountry"
                                :required="formState.foreigner" :disabled="!formState.foreigner" />
                        </a-form-item>
                        <a-form-item label="외국인 체류자격" :label-col="labelCol" :class="!formState.foreigner ? '' : 'red'">
                            <stay-qualification-select-box style="width: 200px" :required="formState.foreigner"
                                :disabled="!formState.foreigner"
                                v-model:valueStayQualifiction="formState.stayQualification" />
                        </a-form-item>
                        <a-form-item :label="!formState.foreigner ? '주민등록번호' : '외국인번호 유효성'" :label-col="labelCol"
                            class="red">
                            <id-number-text-box :width="200" v-model:valueInput="formState.residentId"
                                :required="true"></id-number-text-box>
                        </a-form-item>
                        <a-form-item label="소득구분" :label-col="labelCol" class="red">
                            <type-code-select-box style="width: 200px" v-model:valueInput="formState.incomeTypeCode"
                                @textTypeCode="textTypeCode" :required="true" :disabled="formState.deletable">
                            </type-code-select-box>
                        </a-form-item>
                        <a-form-item label="이메일" class="red" :label-col="labelCol">
                            <div class="custom-note">
                                <mail-text-box placeholder="abc@example.com" v-model:valueInput="formState.email"
                                    :required="true" id="email">
                                </mail-text-box>
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등 주요
                                    서류를
                                    메일로 전달 가능합니다.
                                </span>
                            </div>
                        </a-form-item>
                    </a-spin>
                </a-col>
            </a-row>
        </div>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
            title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-710" />
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="'confirm'"
            title="변경 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
        <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
            title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, createVNode, computed } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxSorting, } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import { Modal } from 'ant-design-vue';
import { initialState, initialOptionsRadio } from "./utils/index"
import mutations from "@/graphql/mutations/PA/PA7/PA710/index";
import queries from "@/graphql/queries/PA/PA7/PA710/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        DxExport,
        DxSearchPanel,
        DeleteOutlined,
        DxButton,
        HistoryPopup,
        SaveOutlined,
        DxScrolling, DxSorting,
    },
    setup() {
        // config grid
        const contentDelete = Message.getMessage('PA120', '002').message
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        const loadingForm = ref(false)
        let checkForm = ref(false)
        const modalHistoryStatus = ref<boolean>(false);
        var idRowEdit = ref<number>(0);
        let popupData = ref();
        const focusedRowKey = ref()
        const modalStatus = ref(false)
        const modalStatusAdd = ref(false)
        let dataRowOld = reactive({ ...initialState })
        let trigger = ref(true);
        const listEmployeeExtra = ref([])
        let formState: any = reactive({ ...initialState });
        let dataRow = reactive({ ...initialState });
        const resetFormNum = ref(1);
        const originData = {
            companyId: companyId,
            imputedYear: globalYear,
        }
        const optionsRadio = ref([...initialOptionsRadio]);
        const { mutate: createEmployeeExtra, onDone: onDoneAdd, onError: onErrorAdd } = useMutation(
            mutations.createEmployeeExtra
        );
        const { mutate: updateEmployeeExtra, onDone: onDoneUpdate, onError: onErrorUpdate } = useMutation(
            mutations.updateEmployeeExtra
        );
        const { refetch: refetchData, loading, result } = useQuery(queries.getEmployeeExtras, originData, () => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        }));
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteEmployeeExtra
        );
        onDoneAdd(() => {
            trigger.value = true;
            refetchData();
            focusedRowKey.value = formState.employeeId
            dataRowOld = { ...formState }
            checkForm.value = true;
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorAdd((e) => {
            notification('error', e.message)
        });
        onDoneDelete(() => {
            trigger.value = true;
            resetFormNum.value++;
            checkForm.value = false;
            refetchData();
            changeFormData({ ...initialState })
        });
        const actionSave = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                focusedRowKey.value = formState.employeeId
            } else {
                let residentId = formState.residentId.replace('-', '')
                if (checkForm.value) {
                    let dataUpdate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: parseInt(formState.employeeId),
                        incomeTypeCode: formState.incomeTypeCode,
                        input: {
                            name: formState.name,
                            foreigner: formState.foreigner,
                            nationality: formState.nationality,
                            nationalityCode: formState.nationalityCode,
                            stayQualification: formState.stayQualification,
                            residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                            email: formState.email,
                            incomeTypeName: formState.incomeTypeName,
                        }
                    };
                    updateEmployeeExtra(dataUpdate);
                } else {
                    let dataCreate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        input: {
                            employeeId: parseInt(formState.employeeId),
                            incomeTypeCode: formState.incomeTypeCode,
                            name: formState.name,
                            foreigner: formState.foreigner,
                            nationality: formState.nationality,
                            nationalityCode: formState.nationalityCode,
                            stayQualification: formState.stayQualification,
                            residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                            email: formState.email,
                            incomeTypeName: formState.incomeTypeName,
                        },
                    };
                    createEmployeeExtra(dataCreate);
                }
            }
        };
        onDoneUpdate(() => {
            trigger.value = true;
            refetchData();
            if (formState.employeeId != dataRow.employeeId) {
                changeFormData(dataRow)
            } else {
                dataRowOld = { ...formState }
            }
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorUpdate((e) => {
            notification('error', e.message)
        });
        const modalHistory = (data: any) => {
            modalHistoryStatus.value = companyId
        }
        const textCountry = (val: any) => {
            formState.nationality = val ? val : null;
        }
        const textTypeCode = (e: any) => {
            formState.incomeTypeName = e
        }
        const editData = (data: any) => {
            if (checkForm.value == false && JSON.stringify(initialState) !== JSON.stringify(formState)) { 
                // 입력한 내용을 저장하시겠습니까?
            }

            dataRow = data.data
            if (JSON.stringify(dataRowOld) !== JSON.stringify(formState) && checkForm.value == true) {
                modalStatus.value = true;
            } else {
                loadingForm.value = true;
                changeFormData(dataRow)
                setTimeout(() => {
                    loadingForm.value = false;
                }, 500);
            }
            checkForm.value = true;
        }
        const changeFormData = (data: any) => {
            formState.name = data.name
            formState.foreigner = data.foreigner
            formState.nationality = data.nationality
            formState.nationalityCode = data.nationalityCode
            formState.stayQualification = data.stayQualification
            formState.residentId = data.residentId
            formState.email = data.email
            formState.employeeId = data.employeeId
            formState.incomeTypeCode = data.incomeTypeCode
            formState.incomeTypeName = data.incomeTypeName
            formState.deletable = data.deletable
            dataRowOld = { ...formState }
        }
        const formCreate = (e: any) => {
            if (JSON.stringify({ ...initialState }) !== JSON.stringify(formState) && checkForm.value == false) {
                modalStatusAdd.value = true
            } else {
                resetFormNum.value++;
                focusedRowKey.value = null;
                checkForm.value = false;
                changeFormData({ ...initialState })
            }
        }
        const deleteData = (data: any) => {
            Modal.confirm({
                title: contentDelete,
                icon: createVNode(DeleteOutlined),
                okText: '네. 삭제합니다',
                cancelText: '아니요',
                onOk() {
                    let variables = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: data.data.employeeId,
                        incomeTypeCode: data.data.incomeTypeCode
                    };
                    actionDelete(variables);
                },
                class: 'confirmDelete',
            });
        }
        const statusComfirm = (val: any) => {
            if (val) {
                (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
            }
            else {
                changeFormData(dataRow)
            }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                resetFormNum.value++;
                changeFormData({ ...initialState })
            }
        }
        watch(result, (value) => {
            if (value) {
                listEmployeeExtra.value = value.getEmployeeExtras
                trigger.value = false;
            }
        });
        watch(() => formState.foreigner, (newValue) => {
            if (!newValue) {
                formState.nationalityCode = 'KR'
                formState.stayQualification = null
            } else {
                resetFormNum.value++;
                formState.nationalityCode = formState.nationalityCode == 'KR' ? null : formState.nationalityCode
            }
        });
        watch(globalYear, (value) => {
            trigger.value = true;
        });

        return {
            move_column, colomn_resize, idRowEdit, loading, loadingForm, modalHistoryStatus, labelCol: { style: { width: "150px" } }, formState, optionsRadio, checkForm, popupData, listEmployeeExtra, DeleteOutlined, modalStatus, focusedRowKey, resetFormNum, modalStatusAdd,
            textCountry, formCreate, textTypeCode, editData, actionSave, modalHistory, deleteData, statusComfirm, statusComfirmAdd,
        };
    },
});
</script> 
<style scoped lang="scss" src="./style/style.scss" >

</style>

<style>
.confirmDelete .anticon {
    color: black !important;
}
</style>