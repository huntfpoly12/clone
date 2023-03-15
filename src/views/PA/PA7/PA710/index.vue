<template>
    <action-header title="기타소득자등록" @actionSave="actionSave()" :buttonDelete="false" />
    <div id="pa-710">
        <div class="page-content">
            <a-row>
                <a-col span="2" class="total-user">
                    <div>
                        <span>{{ listEmployeeExtra.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <img src="@/assets/images/user.svg" style="width: 39px;" />
                    </div>
                </a-col>
                <a-col span="22"></a-col>
                <a-col span="16" class="custom-layout">
                    <a-spin :spinning="loading || loadingCreated" size="large">
                        <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="listEmployeeExtra" :show-borders="true" key-expr="residentIdHide"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="onSelectionClick"
                            @focused-row-changing="onFocusedRowChanging"
                            v-model:focused-row-key="focusedRowKey" :focused-row-enabled="true">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxPaging :enabled="false" />
                            <DxExport :enabled="true"/>
                            <DxToolbar>
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" css-class="cell-button-export"/>
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            </DxToolbar>
                            <template #button-history>
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #button-template>
                                <a-tooltip placement="top">
                                    <template #title>신규</template>
                                    <div>
                                        <DxButton icon="plus" @click="actionCreate" />
                                    </div>
                                </a-tooltip>
                            </template>
                            <DxColumn caption="성명 (상호)" cell-template="company-name" data-field="name"/>
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
                            <DxColumn caption="주민등록번호" cell-template="residentId" data-field="residentId"/>
                            <template #residentId="{ data }">
                              <resident-id :residentId="data.data.residentId"></resident-id>
                            </template>
                            <DxColumn caption="소득구분" cell-template="grade-cell" data-field="incomeTypeName"/>
                            <template #grade-cell="{ data }">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="data.data.incomeTypeName"></income-type>
                            </template>
                            <DxColumn :width="50" cell-template="pupop" css-class="cell-center"/>
                            <template #pupop="{ data }">
                                    <DeleteOutlined v-if="data.data.deletable" style="font-size: 16px; width: 100%; height: 30px; line-height: 30px;"
                                        @click="statusAddRow ? modalStatusDelete = true : ''" />
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <a-col span="8" class="custom-layout" :class="{'disabledBlock': disabledBlock}">
                    <a-spin :spinning="loadingDetail" size="large" :key="resetFormNum"><StandardForm formName="pa-710-form" ref="pa710FormRef">
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
                                @onClick="actionSave()" />
                        </div>
                        <!-- <button-basic @onClick="actionToAddFromEdit" mode="outlined" type="default" text="취소"
                            id="active-save" /> -->
                    </StandardForm></a-spin>
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
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirm" />
        <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirmAdd" />
        <!-- <PopupMessage :modalStatus="confirmSave" @closePopup="confirmSave = false" :typeModal="'confirm'"
            title="입력한 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="confimSaveWhenChangeRow" /> -->
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed, watchEffect } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxPaging } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import { initialState, initialOptionsRadio } from "./utils/index"
import mutations from "@/graphql/mutations/PA/PA7/PA710/index";
import queries from "@/graphql/queries/PA/PA7/PA710/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, EditOutlined, HistoryOutlined, DxToolbar, DxItem, DxExport, DxSearchPanel, DeleteOutlined, DxButton, HistoryPopup, SaveOutlined, DxScrolling, DxPaging
    },
    setup() {
        // const contentDelete = Message.getMessage('PA120', '002').message
        const contentDelete = ref('선택된 소득자의 해당 원천년도에 소득 내역들이 있다면 삭제불가하며, 삭제한 후 복구불가합니다. 그래도 삭제하시겠습니까?')
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
        const statusAddRow = ref(true);
        const statusClickButtonSave = ref<boolean>(true);
        const statusClickButtonAdd = ref<boolean>(false);
        const originData = {
            companyId: companyId,
            imputedYear: globalYear,
        }
        const originDataDetail: any = ref({
            companyId: companyId,
            imputedYear: globalYear,
            employeeId: null,
            incomeTypeCode: null,
        });
        let confirmSave = ref(false)
        const optionsRadio = ref([...initialOptionsRadio]);
        let runOne = ref(true);
        const dataYearNew = ref(globalYear.value)
        const checkClickYear = ref<Boolean>(false)
        var disabledBlock = ref<boolean>(false);

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
                formState.value.residentIdHide = data.residentId // forcus row key
                formState.value.incomeTypeCode = data.incomeTypeCode
                formState.value.incomeTypeName = data.incomeTypeName
                formState.value.deletable = data.deletable
                dataRowOld = { ...formState.value }
                dataRow = { ...formState.value }
                focusedRowKey.value = data.residentId
            }
            triggerDetail.value = false;
        })
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteEmployeeExtra
        );
        onDoneAdd(async (data) => {
            notification('success', `업데이트 완료되었습니다!`)
            if (checkClickYear.value) {
                originData.imputedYear = dataYearNew.value
                runOne.value = true;
                trigger.value = true;
                store.state.settings.globalYear = dataYearNew.value
                setTimeout(() => {
                    checkClickYear.value = false;
                }, 500);
                return;
            }
            await (trigger.value = true);
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                return
            }
            if (statusClickButtonSave.value) { // if click submit
                originDataDetail.value.employeeId = data.data.createEmployeeExtra?.employeeId
                originDataDetail.value.incomeTypeCode = data.data.createEmployeeExtra?.incomeTypeCode  
            } else { // if click save modal
                originDataDetail.value.employeeId = dataRow.employeeId
                originDataDetail.value.incomeTypeCode = dataRow.incomeTypeCode
            }
            await (triggerDetail.value = true);
            await (statusFormUpdate.value = true);
            await (statusAddRow.value = true);
            store.state.common.savePA710++;
            
        });
        onErrorAdd((e) => {
            focusedRowKey.value = 'PA710'
            notification('error', e.message)
        });
        onDoneDelete(() => {
            modalStatusDelete.value = false;
            runOne.value = true;
            trigger.value = true;
            // resetFormNum.value++;
            // statusFormUpdate.value = false;
            // focusedRowKey.value = null;
            // Object.assign(formState.value, initialState);
            store.state.common.savePA710++;
        });
        onDoneUpdate(async (data) => {
            notification('success', `업데이트 완료되었습니다!`)
            if (checkClickYear.value) {
                originData.imputedYear = dataYearNew.value
                runOne.value = true;
                trigger.value = true;
                store.state.settings.globalYear = dataYearNew.value
                setTimeout(() => {
                    checkClickYear.value = false;
                }, 500);
                return;
            }
            await (trigger.value = true);
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                return
            }
            if (statusClickButtonSave.value) { // if click submit
                originDataDetail.value.employeeId = data.data.updateEmployeeExtra?.employeeId
                originDataDetail.value.incomeTypeCode = data.data.updateEmployeeExtra?.incomeTypeCode  
            } else { // if click save modal
                originDataDetail.value.employeeId = dataRow.employeeId
                originDataDetail.value.incomeTypeCode = dataRow.incomeTypeCode
            }
            await (triggerDetail.value = true);
            store.state.common.savePA710++;
        });
        onErrorUpdate((e) => {
            triggerDetail.value = true;
            notification('error', e.message)
        });

        // ================FUNCTION============================================
        const pa710FormRef = ref()
        const actionSave = () => {
            statusClickButtonSave.value = true;
            checkClickYear.value = false
            submitForm()
        }
        const submitForm = () => {
            var res = pa710FormRef.value.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                checkClickYear.value ? checkClickYear.value = false : '';
            } else {
                let residentId = formState.value.residentId.replace('-', '')
                let input = {
                    name: formState.value.name,
                    foreigner: formState.value.foreigner,
                    nationality: formState.value.nationality,
                    nationalityCode: formState.value.nationalityCode,
                    stayQualification: formState.value.stayQualification,
                    residentId: residentId.slice(0, 6) + '-' + residentId.slice(6, 13),
                    email: formState.value.email,
                    incomeTypeName: formState.value.incomeTypeName,
                }
                if (statusFormUpdate.value) {
                    let dataUpdate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: parseInt(formState.value.employeeId),
                        incomeTypeCode: formState.value.incomeTypeCode,
                        input: { ...input }
                    };
                    updateEmployeeExtra(dataUpdate);
                } else {
                    let dataCreate = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        input: {
                            employeeId: parseInt(formState.value.employeeId),
                            incomeTypeCode: formState.value.incomeTypeCode,
                            ...input,
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
        // const actionToAddFromEdit = (e: any) => {
        //     var res = e.validationGroup.validate();
        //     //remove active row edit
        //     const element = document.querySelector('.dx-row-focused');
        //     if (element)
        //         (element as HTMLInputElement).classList.remove("dx-row-focused");

        //     if (!res.isValid) {
        //         res.brokenRules[0].validator.focus();
        //     } else
        //         confirmSave.value = true
        // }
        const onSelectionClick = (data: any) => {
            // dataRow = data.data
            // if (dataRow.employeeId && dataRow.employeeId != formState.value.employeeId) {
            //     originDataDetail.value.employeeId = data.data.employeeId
            //     originDataDetail.value.incomeTypeCode = data.data.incomeTypeCode
            //     if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) {
            //         modalStatus.value = true;
            //     } else {
            //         if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) {
            //             modalStatus.value = true;
            //         } else {
            //             if (!statusAddRow.value && listEmployeeExtra.value[listEmployeeExtra.value.length - 1]?.employeeId == null) {
            //                 listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
            //                 statusAddRow.value = true
            //             }
            //             triggerDetail.value = true;
            //         }
            //         statusFormUpdate.value = true;
            //     }
            // }
        }
        const onFocusedRowChanging = (e: any) => {
            dataRow = e.rows[e.newRowIndex]?.data
            if (dataRow.employeeId && dataRow.employeeId != formState.value.employeeId) {
                originDataDetail.value.employeeId = e.rows[e.newRowIndex]?.data.employeeId
                originDataDetail.value.incomeTypeCode = e.rows[e.newRowIndex]?.data.incomeTypeCode
                if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) {
                    modalStatus.value = true;
                    e.cancel = true;
                } else {
                    if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) {
                        modalStatus.value = true;
                        e.cancel = true;
                    } else {
                        if (!statusAddRow.value && listEmployeeExtra.value[listEmployeeExtra.value.length - 1]?.employeeId == null) {
                            listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
                            statusAddRow.value = true
                        }
                        triggerDetail.value = true;
                    }
                    statusFormUpdate.value = true;
                }
            }
        }
        const actionCreate = (e: any) => {
            let statusChangeFormAdd = (JSON.stringify({ ...initialState }) !== JSON.stringify(formState.value) && statusFormUpdate.value == false)
            let statusChangeFormEdit = (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true)
            if (statusChangeFormEdit) { // if status form add and form not null
                modalStatusAdd.value = true
                statusClickButtonAdd.value = true
            } else {
                if (statusChangeFormAdd) { // if status form add and form not null
                    modalStatusAdd.value = true
                    statusClickButtonAdd.value = true
                } else if(statusAddRow.value) {
                    addRow()
                    // statusAddRow.value = false;
                    // listEmployeeExtra.value = JSON.parse(JSON.stringify(listEmployeeExtra.value)).concat({ ...initialState })
                    // formState.value = listEmployeeExtra.value[listEmployeeExtra.value.length - 1]
                    // resetFormNum.value++;
                    // focusedRowKey.value = 'PA710';
                    // statusFormUpdate.value = false;
                }
            }
        }

        // A function that is called when the user clicks on the delete button.
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
                statusClickButtonSave.value = false;
                submitForm();
            } else {
                if (checkClickYear.value) {
                    originData.imputedYear = dataYearNew.value
                    runOne.value = true;
                    trigger.value = true;
                    store.state.settings.globalYear = dataYearNew.value
                    setTimeout(() => {
                        checkClickYear.value = false;
                    }, 500);
                    return;
                }
                if (!statusAddRow.value) {
                    listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
                    statusAddRow.value = true
                }
                statusFormUpdate.value = true
                triggerDetail.value = true;
            }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                statusClickButtonSave.value = false;
                checkClickYear.value = false;
                submitForm();
            } else {
                if(statusAddRow.value && statusClickButtonAdd.value) { // add row
                    addRow()
                } else { // reset form
                    resetFormNum.value++;
                    Object.assign(formState.value, initialState);
                }
            }
        }
        const addRow = () => {
            disabledBlock.value = false;
            statusClickButtonAdd.value = false;
            statusAddRow.value = false;
            listEmployeeExtra.value = JSON.parse(JSON.stringify(listEmployeeExtra.value)).concat({ ...initialState })
            formState.value = listEmployeeExtra.value[listEmployeeExtra.value.length - 1]
            resetFormNum.value++;
            focusedRowKey.value = 'PA710';
            statusFormUpdate.value = false;
        }

        // ================WATCHING============================================
        watch(result, (value) => {
            trigger.value = false;
            statusAddRow.value = true;
            if (value) {
                listEmployeeExtra.value = value.getEmployeeExtras.map((value: any) => {
                    return {
                        ...value,
                        residentIdHide: value.residentId
                    }
                })
                if (runOne.value) {
                    if (listEmployeeExtra.value.length) {
                        originDataDetail.value.employeeId = listEmployeeExtra.value[0]?.employeeId
                        originDataDetail.value.incomeTypeCode = listEmployeeExtra.value[0]?.incomeTypeCode
                        triggerDetail.value = true;
                        statusFormUpdate.value = true;
                    } else {
                        statusFormUpdate.value = false;
                        resetFormNum.value++;
                        Object.assign(formState.value, initialState);
                    }
                    runOne.value = false;
                }
                if (listEmployeeExtra.value.length) {
                    disabledBlock.value = false;
                } else {
                    disabledBlock.value = true;
                }
                // listEmployeeExtra.value = value.getEmployeeExtras
                
            }
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                addRow()
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
        watchEffect(() => {
            formState.value.name = formState.value.name?.toUpperCase() ?? '';
        });
        
        watch(globalYear, (newVal, oldVal) => {
            let statusChangeFormAdd = (JSON.stringify({ ...initialState }) !== JSON.stringify(formState.value) && statusFormUpdate.value == false)
            let statusChangeFormEdit = (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true)
            if (statusChangeFormEdit || statusChangeFormAdd) { // if status form add and form not null
                if (!checkClickYear.value) {
                    modalStatus.value = true
                    checkClickYear.value = true
                    store.state.settings.globalYear = oldVal;
                    dataYearNew.value = newVal;
                    return
                }
                return
            } else {
                originData.imputedYear = newVal
                runOne.value = true;
                trigger.value = true;
            }
        });

        return {
            confirmSave, move_column, colomn_resize, idRowEdit, loading, loadingDetail, modalHistoryStatus, labelCol: { style: { width: "150px" } }, formState, optionsRadio, statusFormUpdate, popupData, listEmployeeExtra, DeleteOutlined, modalStatus, focusedRowKey, resetFormNum, modalStatusAdd, loadingCreated,
            // confimSaveWhenChangeRow, 
            onFocusedRowChanging,
            // actionToAddFromEdit, 
            textCountry, actionCreate, textTypeCode, onSelectionClick, actionSave, modalHistory, statusComfirm, statusComfirmAdd,
            contentDelete, modalStatusDelete, onSubmitDelete, statusAddRow, Message, pa710FormRef, disabledBlock,
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
