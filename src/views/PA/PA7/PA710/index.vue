<template>
    <action-header title="기타소득자등록" />
    <div id="pa-710" class="page-content">
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
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="listEmployeeExtra"
                        :show-borders="true" key-expr="employeeId" :column-auto-width="true" style="width: 100%;">
                        <DxToolbar>
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <DxColumn caption="성명 (상호)" :width="200" cell-template="company-name" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :status="data.data.status" :foreigner="data.data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" :width="200" />
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
                                        <!-- <EditOutlined @click="editData(data)" /> -->
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <!-- <deleteOutlined @click="deleteConfig(data)" /> -->
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <AddCM710Popup :modalStatus="modalAddNewStatus" @closePopup="onCloseAddNewModal" title="원천설정">
                    </AddCM710Popup>
                </a-spin>
            </a-col>
            <a-col :span="8" class="custom-layout">
                <a-spin :spinning="loadingForm" size="large">
                    <standard-form formName="add-pa710">
                        <a-row :gutter="24" class="pa-710-popup-add">
                            <a-col :span="24">
                                <a-form-item label="코드" :label-col="labelCol">
                                    <number-box :width="150" v-model:valueInput="formState.input.employeeId"
                                        :spinButtons="true">
                                    </number-box>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="성명(상호) " :label-col="labelCol">
                                    <default-text-box :width="150" v-model:valueInput="formState.input.name"
                                        :required="true">
                                    </default-text-box>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="내/외국인 " :label-col="labelCol" class="red">
                                    <radio-group :arrayValue="optionsRadio" v-model:valueRadioCheck="formState.input.foreigner"
                                        :layoutCustom="'horizontal'" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="외국인 국적 " :label-col="labelCol">
                                    <country-code-select-box v-model:valueCountry="formState.input.nationalityCode" :required="true" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="외국인 체류자격 " :label-col="labelCol">
                                    <stay-qualification-select-box
                                        v-model:valueStayQualifiction="formState.input.stayQualification" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="주민(외국인)번호 " :label-col="labelCol">
                                    <text-number-box
                                        :width="150" v-model:valueInput="formState.input.residentId"
                                        :required="true"
                                    ></text-number-box>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="외국인 체류자격 " :label-col="labelCol">
                                    <type-code-select-box v-model:valueInput="formState.input.incomeTypeCode" :required="true">
                                    </type-code-select-box>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="이메일" class="red" :label-col="labelCol">
                                    <div class="custom-note">
                                        <mail-text-box placeholder="abc@example.com"
                                            v-model:valueInput="formState.input.email" :required="true" id="email">
                                        </mail-text-box>
                                        <span>
                                            <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                        </span>
                                    </div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <div class="text-align-center mt-20">
                            <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                                :mode="'contained'" @onClick="onSubmit($event)" />
                        </div>
                    </standard-form>
                </a-spin>
            </a-col>
        </a-row>
        
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, createVNode } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, } from "@ant-design/icons-vue";
import notification from "../../../../utils/notification";
import { Modal } from 'ant-design-vue'
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { initialState } from "./utils/index"
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
        DeleteOutlined,
        DxButton
    },
    setup() {
        const loadingForm = ref(false)
        let modalEditStatus = ref(false);
        let modalHistoryStatus = ref(false);
        var idRowEdit = ref<number>(0);
        const modalAddNewStatus = ref<boolean>(false);
        let popupData = ref();
        const valueForeigner = ref(1)

        let returnRadio = ref();

        const formState = reactive({ ...initialState });

        const optionsRadio = [
            { id: false, text: "내국인" },
            { id: true, text: "내국인" },
        ];
        const {
            mutate: createEmployeeExtraOne,
            onDone: onDoneAdd,
            onError: onErrorAdd,
        } = useMutation(mutations.createEmployeeExtra);

        onDoneAdd((e) => {
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorAdd((e) => {
            notification('error', e.message)
        }); 
        watch(() => formState.input.nationalityCode, (newValue) => {
           console.log(formState.input);
        })
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let dataCreate = {
                    companyId: companyId,
                    imputedYear: parseInt(dayjs().format("YYYY")),
                    input: formState.input,
                };
                createEmployeeExtraOne(dataCreate);
            }
        };



        const originData = {
            companyId: companyId,
            imputedYear: parseInt(dayjs().format('YYYY')),
        }
        let trigger = ref(true);
        const listEmployeeExtra = ref([])
        const { refetch: refetchData, loading, result } = useQuery(queries.getEmployeeExtras, originData, () => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        }));
        // const openEditModal = (data: any) => {
        //     modalEditStatus.value = true;
        //     popupData.value = {
        //         userId: data.data.id,
        //         // companyId: companyId
        //     };
        // }
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id
            // companyIdPopup.value = companyId
            modalHistoryStatus.value = true;
        }
        // const deleteConfig = (data: any) => {
        //     Modal.confirm({
        //         title: '삭제하겠습니까?',
        //         icon: createVNode(ExclamationCircleOutlined),
        //         okText: '네',
        //         cancelText: '아니요',
        //         //content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
        //         onOk() {
        //             let variables = {
        //                 // companyId: companyId,
        //                 imputedYear: parseInt(dayjs().format('YYYY')),
        //                 itemCode: data.data.itemCode
        //             };
        //             actionDelete(variables);
        //         },
        //         class: 'confirm',
        //     });
        // }
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteEmployeeExtra
        );
        const onCloseAddNewModal = () => {
            modalAddNewStatus.value = false;
            refetchData();
        };
        watch(result, (value) => {
            if (value) {
                // console.log(value);
                listEmployeeExtra.value = value.getEmployeeExtras
                trigger.value = false;
            }
        });
        return {
            loading,
            loadingForm,
            labelCol: { style: { width: "150px" } },
            formState,
            // valueCountry,
            // valueStayQualifiction,
            // valueTypeCode,
            valueForeigner,
            optionsRadio,
            onSubmit,
            modalHistory,
            returnRadio,
            modalEditStatus,
            popupData,
            listEmployeeExtra,
            DeleteOutlined,
            // deleteConfig,
            modalAddNewStatus,
            onCloseAddNewModal,
            openAddNewModal,
        };
    },
});
</script> 
<style scoped lang="scss" src="./style/style.scss" >

</style>
