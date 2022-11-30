<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-710" class="page-content">
        <a-row>
            <a-col :span="3" class="total-user">
                <div>
                    <span>{{ listEmployeeExtra.length }}</span>
                    <br>
                    <span>전체</span>
                </div>
                <div>
                    <i class="dx-icon-user"></i>
                </div>
            </a-col>
            <a-col :span="21"></a-col>
            <a-col :span="16" class="custom-layout">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="listEmployeeExtra"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" style="width: 100%;"
                        :onRowClick="editData" :focused-row-enabled="true">
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

                        <DxColumn caption="성명 (상호)" cell-template="company-name" :width="500" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" :width="200" />
                        <DxColumn caption="소득부분" cell-template="grade-cell" />
                        <template #grade-cell="{ data }" class="custom-action">
                            <income-type :typeCode="data.data.incomeTypeCode"
                                :typeName="data.data.incomeTypeName"></income-type>
                        </template>
                        <DxColumn :width="30" cell-template="pupop" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <DeleteOutlined v-if="data.data.deletable" @click="deleteData(data)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        :data="popupData" title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-710" />
                </a-spin>
            </a-col>
            <a-col :span="8" class="custom-layout">
                <a-spin :spinning="loadingForm" size="large">
                    <a-row :gutter="24" class="pa-710-popup-add">
                        <a-col :span="24">
                            <a-form-item label="코드" :label-col="labelCol">
                                <div class="custom-note">
                                    <number-box :required="true" :width="150" v-model:valueInput="formState.employeeId"
                                        placeholder="숫자만 입력 가능" :disabled="checkForm">
                                    </number-box>
                                    <span>
                                        <InfoCircleFilled /> 최초 저장된 이후 수정 불가
                                    </span>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="성명(상호) " :label-col="labelCol">
                                <default-text-box :width="150" v-model:valueInput="formState.name" :required="true"
                                    placeholder="한글,영문(대문자) 입력 가능">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="내/외국인 " :label-col="labelCol" class="red">
                                <radio-group :arrayValue="optionsRadio" :required="true"
                                    v-model:valueRadioCheck="formState.foreigner" :layoutCustom="'horizontal'" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="외국인 국적 " :label-col="labelCol">
                                <country-code-select-box v-model:valueCountry="formState.nationalityCode"
                                    @textCountry="textCountry" :required="true" :disabled="disabledSelect" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="외국인 체류자격 " :label-col="labelCol">
                                <stay-qualification-select-box :required="true" :disabled="disabledSelect"
                                    v-model:valueStayQualifiction="formState.stayQualification" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item :label="disabledSelect ? '외국인번호 유효성' : '주민등록번호'" :label-col="labelCol">
                                <id-number-text-box :width="150" v-model:valueInput="formState.residentId"
                                    :required="true"></id-number-text-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="외국인 체류자격 " :label-col="labelCol">
                                <type-code-select-box v-model:valueInput="formState.incomeTypeCode"
                                    @textTypeCode="textTypeCode" :required="true">
                                </type-code-select-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="이메일" class="red" :label-col="labelCol">
                                <div class="custom-note">
                                    <mail-text-box placeholder="abc@example.com" v-model:valueInput="formState.email"
                                        :required="true" id="email">
                                    </mail-text-box>
                                    <span>
                                        <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                    </span>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div v-if="checkForm" class="text-align-center mt-20">
                        <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                            :mode="'contained'" @onClick="onUpdate($event)" />
                    </div>
                </a-spin>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, createVNode, computed } from "vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, InfoCircleFilled, ExclamationCircleOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "../../../../utils/notification";
import { Modal } from 'ant-design-vue';
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { initialState, initialOptionsRadio } from "./utils/index"
dayjs.extend(weekday);
dayjs.extend(localeData);
import mutations from "../../../../graphql/mutations/PA/PA7/PA710/index";
import queries from "../../../../graphql/queries/PA/PA7/PA710/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "../../../../../src/helpers/commonFunction";
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
        InfoCircleFilled,
        SaveOutlined,
    },
    setup() {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const loadingForm = ref(false)
        let checkForm = ref(false)
        let disabledSelect = ref(false)
        const modalHistoryStatus = ref<boolean>(false);
        var idRowEdit = ref<number>(0);
        let popupData = ref();

        let trigger = ref(true);
        const listEmployeeExtra = ref([])

        let formState = reactive({ ...initialState });

        const originData = {
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
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
            console.log(initialState);

            Object.assign(formState, initialState);
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorAdd((e) => {
            notification('error', e.message)
        });

        onDoneDelete(() => {
            trigger.value = true;
            refetchData();
        });


        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let dataCreate = {
                    companyId: companyId,
                    imputedYear: parseInt(dayjs().format("YYYY")),
                    input: {
                        employeeId: formState.employeeId,
                        incomeTypeCode: formState.incomeTypeCode,
                        name: formState.name,
                        foreigner: formState.foreigner,
                        nationality: formState.nationality,
                        nationalityCode: formState.nationalityCode,
                        stayQualification: formState.stayQualification,
                        residentId: formState.residentId.slice(0, 6) + '-' + formState.residentId.slice(6, 13),
                        email: formState.email,
                        incomeTypeName: formState.incomeTypeName,
                    },
                };
                createEmployeeExtra(dataCreate);
            }
        };
        const onUpdate = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let dataUpdate = {
                    companyId: companyId,
                    imputedYear: parseInt(dayjs().format("YYYY")),
                    employeeId: formState.employeeId,
                    incomeTypeCode: formState.incomeTypeCode,
                    input: {
                        name: formState.name,
                        foreigner: formState.foreigner,
                        nationality: formState.nationality,
                        nationalityCode: formState.nationalityCode,
                        stayQualification: formState.stayQualification,
                        residentId: formState.residentId.slice(0, 6) + '-' + formState.residentId.slice(6, 13),
                        email: formState.email,
                        incomeTypeName: formState.incomeTypeName,
                    }
                };
                updateEmployeeExtra(dataUpdate);
            }
        };
        onDoneUpdate(() => {
            trigger.value = true;
            refetchData();
            checkForm.value = false;
            Object.assign(formState, initialState);
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorUpdate((e) => {
            notification('error', e.message)
        });

        const modalHistory = (data: any) => {
            modalHistoryStatus.value = companyId
        }
        const textCountry = (e: any) => {
            formState.nationality = e
        }
        const textTypeCode = (e: any) => {
            formState.incomeTypeName = e
        }
        const editData = (e: any) => {
            checkForm.value = true;
            formState.name = e.data.name
            formState.foreigner = e.data.foreigner
            formState.nationality = e.data.nationality
            formState.nationalityCode = e.data.nationalityCode
            formState.stayQualification = e.data.stayQualification
            formState.residentId = e.data.residentId
            formState.email = e.data.email
            formState.employeeId = e.data.employeeId
            formState.incomeTypeCode = e.data.incomeTypeCode
            formState.incomeTypeName = e.data.incomeTypeName
        }
        const formCreate = (e: any) => {
            checkForm.value = false;
            Object.assign(formState, initialState);
        }
        const deleteData = (data: any) => {
            Modal.confirm({
                title: '삭제하겠습니까?',
                icon: createVNode(ExclamationCircleOutlined),
                okText: '네',
                cancelText: '아니요',
                onOk() {
                    let variables = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format('YYYY')),
                        employeeId: data.data.employeeId,
                        incomeTypeCode: data.data.incomeTypeCode
                    };
                    actionDelete(variables);
                },
                class: 'confirm',
            });
        }

        watch(result, (value) => {
            if (value) {
                listEmployeeExtra.value = value.getEmployeeExtras
                trigger.value = false;
            }
        });
        watch(() => formState.foreigner, (newValue) => {
            if (newValue) {
                disabledSelect.value = true;
            } else {
                disabledSelect.value = false;
            }
        });
        return {
            move_column,
            colomn_resize,
            textCountry,
            formCreate,
            idRowEdit,
            textTypeCode,
            editData,
            loading,
            loadingForm,
            modalHistoryStatus,
            labelCol: { style: { width: "150px" } },
            formState,
            optionsRadio,
            onSubmit,
            onUpdate,
            disabledSelect,
            checkForm,
            modalHistory,
            popupData,
            listEmployeeExtra,
            DeleteOutlined,
            deleteData
        };
    },
});
</script> 
<style scoped lang="scss" src="./style/style.scss" >

</style>
