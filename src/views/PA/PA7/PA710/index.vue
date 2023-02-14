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
                    <a-spin :spinning="loading || loadingCreated" size="large">
                        <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="listEmployeeExtra" :show-borders="true" key-expr="employeeId"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="onSelectionClick"
                            v-model:focused-row-key="focusedRowKey" :focused-row-enabled="true">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" :allow-export-selected-data="true" />
                            <DxToolbar>
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" css-class="cell-button-export"/>
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
                                <div class="custom-action" v-if="data.data.__typename">
                                    <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                        :idCardNumber="data.data.residentId" :status="data.data.status"
                                        :employeeId="data.data.employeeId" :foreigner="data.data.foreigner"
                                        :checkStatus="false" />
                                </div>
                                <div class="custom-action" v-else>
                                    <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                        :status="data.data.status" :foreigner="data.data.foreigner"
                                        :checkStatus="false" />
                                </div>
                            </template>
                            <DxColumn caption="주민등록번호" cell-template="residentId" />
                            <template #residentId="{ data }">
                                <div v-if="data.data.residentId?.length == 14">
                                    <a-tooltip placement="top"
                                        v-if="parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13 && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32"
                                        key="black">
                                        {{ data.data.residentId }}
                                    </a-tooltip>
                                    <a-tooltip placement="top" v-else title="ERROR" color="red">
                                        {{ data.data.residentId }}
                                    </a-tooltip>
                                </div>
                                <div v-else>
                                    <a-tooltip placement="top" key="black">
                                        {{ data.data.residentId.slice(0, 6) + '-' + data.data.residentId.slice(6, 13) }}
                                    </a-tooltip>
                                </div>
                            </template>
                            <DxColumn caption="소득부분" cell-template="grade-cell" />
                            <template #grade-cell="{ data }" class="custom-action">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="data.data.incomeTypeName"></income-type>
                            </template>
                            <DxColumn :width="50" cell-template="pupop" />
                            <template #pupop="{ data }" class="custom-action">
                                <div class="custom-action">
                                    <a-space :size="10">
                                        <DeleteOutlined v-if="data.data.deletable"
                                            @click="statusRemoveRow ? modalStatusDelete = true : ''" />
                                    </a-space>
                                </div>
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <a-col span="8" class="custom-layout">
                    <a-spin :spinning="loadingDetail" size="large" :key="resetFormNum">
                        <a-form-item label="코드" :label-col="labelCol" class="red">
                            <div class="custom-note d-flex-center">
                                <number-box :required="true" :width="200" v-model:valueInput="formState.employeeId"
                                    placeholder="숫자만 입력 가능" :disabled="statusFormUpdate">
                                </number-box>
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
                                @textTypeCode="textTypeCode" :required="true" :disabled="statusFormUpdate">
                            </type-code-select-box>
                        </a-form-item>
                        <a-form-item label="이메일" :label-col="labelCol">
                            <div class="custom-note">
                                <mail-text-box placeholder="abc@example.com" v-model:valueInput="formState.email"
                                    id="email" />
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등 주요
                                    서류를
                                    메일로 전달 가능합니다.
                                </span>
                            </div>
                        </a-form-item>
                        <div class="text-align-center mt-20">
                            <button-basic :text="'저장'" type="default" :mode="'contained'"
                                @onClick="actionSave($event)" />
                        </div>
                        <button-basic @onClick="actionToAddFromEdit" mode="outlined" type="default" text="취소"
                            id="active-save" />
                    </a-spin>
                </a-col>
            </a-row>
        </div>
        <a-modal :visible="modalStatusDelete" @cancel="modalStatusDelete = false" :mask-closable="false"
            class="confirm-md" footer="" :width="500">
            <standard-form action="" name="delete-510">
                <div class="custom-modal-delete">
                    <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px;">
                    <span>{{ contentDelete }}</span>
                </div>
                <div class="text-align-center mt-30">
                    <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="modalStatusDelete = false" />
                    <button-basic class="button-form-modal" :text="'네. 삭제합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="onSubmitDelete" />
                </div>
            </standard-form>
        </a-modal>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
            title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-710" />
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="'confirm'"
            title="변경 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
        <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
            title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" />
        <PopupMessage :modalStatus="confirmSave" @closePopup="confirmSave = false" :typeModal="'confirm'"
            title="입력한 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="confimSaveWhenChangeRow" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import { initialState, initialOptionsRadio } from "./utils/index"
import mutations from "@/graphql/mutations/PA/PA7/PA710/index";
import queries from "@/graphql/queries/PA/PA7/PA710/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
// import { DxTooltip } from 'devextreme-vue/tooltip';
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, EditOutlined, HistoryOutlined, DxToolbar, DxItem, DxExport, DxSearchPanel, DeleteOutlined, DxButton, HistoryPopup, SaveOutlined, DxScrolling, 
        // DxSorting,
        // DxTooltip, 
        // DxEditing,
    },
    setup() {
        const contentDelete = Message.getMessage('PA120', '002').message
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)

        let statusFormUpdate = ref(false)
        const modalHistoryStatus = ref<boolean>(false);
        var idRowEdit = ref<number>(0);
        let popupData = ref();
        const focusedRowKey = ref()
        const modalStatus = ref(false)
        const modalStatusAdd = ref(false);
        const modalStatusDelete = ref(false);
        let dataRowOld = reactive({ ...initialState })
        let trigger = ref(true);
        let triggerDetail = ref(false);
        const listEmployeeExtra: any = ref([])
        let formState: any = ref({ ...initialState });
        let dataRow = reactive({ ...initialState });
        const resetFormNum = ref(1);
        const statusRemoveRow = ref(true);
        // const statusRemoveRow = ref(true);
        const originData = {
            companyId: companyId,
            imputedYear: globalYear.value,
        }
        const originDataDetail: any = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: null,
            incomeTypeCode: null,
        });
        let confirmSave = ref(false)
        const optionsRadio = ref([...initialOptionsRadio]);

        // ================GRAPQL==============================================
        const { mutate: createEmployeeExtra, onDone: onDoneAdd, onError: onErrorAdd, loading: loadingCreated } = useMutation(
            mutations.createEmployeeExtra
        );
        const { mutate: updateEmployeeExtra, onDone: onDoneUpdate, onError: onErrorUpdate } = useMutation(
            mutations.updateEmployeeExtra
        );
        const { refetch: refetchData, loading, result } = useQuery(queries.getEmployeeExtras, originData, () => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        }));
        const { refetch: refetchDataDetail, loading: loadingDetail, onResult: resultDetail } = useQuery(queries.getEmployeeExtra, originDataDetail, () => ({
            fetchPolicy: "no-cache",
            enabled: triggerDetail.value,
        }));
        resultDetail(res => {
            var data = res.data.getEmployeeExtra;
            if (data) {
                formState.value.name = data.name
                formState.value.foreigner = data.foreigner
                formState.value.nationality = data.nationality
                formState.value.nationalityCode = data.nationalityCode
                formState.value.stayQualification = data.stayQualification
                formState.value.residentId = data.residentId
                formState.value.email = data.email
                formState.value.employeeId = data.employeeId
                formState.value.incomeTypeCode = data.incomeTypeCode
                formState.value.incomeTypeName = data.incomeTypeName
                formState.value.deletable = data.deletable
                dataRowOld = { ...formState.value }
            }
            triggerDetail.value = false;
        })
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteEmployeeExtra
        );
        onDoneAdd(() => {
            trigger.value = true;
            focusedRowKey.value = parseInt(formState.value.employeeId)
            dataRowOld = { ...formState.value }
            statusFormUpdate.value = true;
            statusRemoveRow.value = true;
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorAdd((e) => {
            notification('error', e.message)
        });
        onDoneDelete(() => {
            modalStatusDelete.value = false;
            trigger.value = true;
            resetFormNum.value++;
            statusFormUpdate.value = false;
            focusedRowKey.value = null;

            Object.assign(formState.value, initialState);
        });
        onDoneUpdate(() => {
            trigger.value = true;
            if (formState.value.employeeId == focusedRowKey.value) {
                originDataDetail.value.employeeId = formState.value.employeeId
                originDataDetail.value.incomeTypeCode = formState.value.incomeTypeCode
                dataRowOld = { ...formState.value }
            } else {
                originDataDetail.value.employeeId = dataRow.employeeId
                originDataDetail.value.incomeTypeCode = dataRow.incomeTypeCode
            }
            triggerDetail.value = true;
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorUpdate((e) => {
            triggerDetail.value = true;
            notification('error', e.message)
        });

        // ================FUNCTION============================================
        const actionSave = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                focusedRowKey.value = parseInt(formState.value.employeeId)
                // dataRow.employeeId = formState.value.employeeId
                // dataRow.incomeTypeCode = formState.value.incomeTypeCode
            } else {
                let residentId = formState.value.residentId.replace('-', '')
                if (statusFormUpdate.value) {
                    let dataUpdate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: parseInt(formState.value.employeeId),
                        incomeTypeCode: formState.value.incomeTypeCode,
                        input: {
                            name: formState.value.name,
                            foreigner: formState.value.foreigner,
                            nationality: formState.value.nationality,
                            nationalityCode: formState.value.nationalityCode,
                            stayQualification: formState.value.stayQualification,
                            residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                            email: formState.value.email,
                            incomeTypeName: formState.value.incomeTypeName,
                        }
                    };
                    updateEmployeeExtra(dataUpdate);
                } else {
                    let dataCreate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        input: {
                            employeeId: parseInt(formState.value.employeeId),
                            incomeTypeCode: formState.value.incomeTypeCode,
                            name: formState.value.name,
                            foreigner: formState.value.foreigner,
                            nationality: formState.value.nationality,
                            nationalityCode: formState.value.nationalityCode,
                            stayQualification: formState.value.stayQualification,
                            residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                            email: formState.value.email,
                            incomeTypeName: formState.value.incomeTypeName,
                        },
                    };
                    createEmployeeExtra(dataCreate);
                }
            }
        };

        const modalHistory = (data: any) => {
            modalHistoryStatus.value = true
        }
        const textCountry = (val: any) => {
            formState.value.nationality = val ? val : null;
        }
        const textTypeCode = (e: any) => {
            formState.value.incomeTypeName = e
        }
        

        // When changing the value in the input form then moving to another row, check the valid form and display the popup
        const actionToAddFromEdit = (e: any) => {
            var res = e.validationGroup.validate();
            //remove active row edit
            const element = document.querySelector('.dx-row-focused');
            if (element)
                (element as HTMLInputElement).classList.remove("dx-row-focused");

            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else
                confirmSave.value = true
        }
        const onSelectionClick = (data: any) => {
            dataRow = data.data
            if (dataRow.employeeId) {
                originDataDetail.value.employeeId = data.data.employeeId
                originDataDetail.value.incomeTypeCode = data.data.incomeTypeCode
                if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) {
                    modalStatus.value = true;
                } else {
                    if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) {
                        modalStatus.value = true;
                    } else {
                        if (!statusRemoveRow.value && listEmployeeExtra.value[listEmployeeExtra.value.length - 1]?.employeeId == null) {
                            listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
                            statusRemoveRow.value = true
                        }
                        triggerDetail.value = true;
                    }
                    statusFormUpdate.value = true;
                }
            }
        }
        const formCreate = (e: any) => {
            if (statusRemoveRow.value) {
                if (JSON.stringify({ ...initialState }) !== JSON.stringify(formState.value) && statusFormUpdate.value == false) { // if status form add and form not null
                    modalStatusAdd.value = true
                } else {
                    statusRemoveRow.value = false;
                    listEmployeeExtra.value = JSON.parse(JSON.stringify(listEmployeeExtra.value)).concat({ ...initialState })
                    formState.value = listEmployeeExtra.value[listEmployeeExtra.value.length - 1]
                    setTimeout(() => {
                        let a = document.body.querySelectorAll('[aria-rowindex]');
                        (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
                    }, 100);
                    resetFormNum.value++;
                    focusedRowKey.value = null;
                    statusFormUpdate.value = false;
                }
            } else {
                notification('error', "nhập vàooooo")
            }
        }

        const onSubmitDelete = () => {
            let variables = {
                companyId: companyId,
                imputedYear: globalYear.value,
                employeeId: formState.value.employeeId,
                incomeTypeCode: formState.value.incomeTypeCode
            };
            actionDelete(variables);
        }
        const statusComfirm = (val: any) => {
            if (val) {
                (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
            } else {
                if (!statusRemoveRow.value) {
                    listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
                    statusRemoveRow.value = true
                }
                statusFormUpdate.value = true
                triggerDetail.value = true;
            }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                resetFormNum.value++;
                Object.assign(formState.value, initialState);
            }
        }

        const confimSaveWhenChangeRow = (status: any) => {
            if (status == true) {
                let residentId = formState.value.residentId.replace('-', '')
                let dataCreate = {
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    input: {
                        employeeId: parseInt(formState.value.employeeId),
                        incomeTypeCode: formState.value.incomeTypeCode,
                        name: formState.value.name,
                        foreigner: formState.value.foreigner,
                        nationality: formState.value.nationality,
                        nationalityCode: formState.value.nationalityCode,
                        stayQualification: formState.value.stayQualification,
                        residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                        email: formState.value.email,
                        incomeTypeName: formState.value.incomeTypeName,
                    },
                };
                createEmployeeExtra(dataCreate);
            }
            triggerDetail.value = true;
        }

        // ================WATCHING============================================
        watch(result, (value) => {
            if (value) {
                listEmployeeExtra.value = value.getEmployeeExtras
                trigger.value = false;
            }
        });
        watch(() => formState.value.foreigner, (newValue) => {
            if (!newValue) {
                formState.value.nationalityCode = 'KR'
                formState.value.stayQualification = null
            } else {
                resetFormNum.value++;
                formState.value.nationalityCode = formState.value.nationalityCode == 'KR' ? null : formState.value.nationalityCode
            }
        });
        watch(globalYear, () => {
            trigger.value = true;
        });

        return {
            confirmSave, move_column, colomn_resize, idRowEdit, loading, loadingDetail, modalHistoryStatus, labelCol: { style: { width: "150px" } }, formState, optionsRadio, statusFormUpdate, popupData, listEmployeeExtra, DeleteOutlined, modalStatus, focusedRowKey, resetFormNum, modalStatusAdd, loadingCreated,
            confimSaveWhenChangeRow, actionToAddFromEdit, textCountry, formCreate, textTypeCode, onSelectionClick, actionSave, modalHistory, statusComfirm, statusComfirmAdd,
            contentDelete, modalStatusDelete, onSubmitDelete, statusRemoveRow,
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
