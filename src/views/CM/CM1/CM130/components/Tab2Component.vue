<template>
    {{ focusedRowKeyTab2 }}
    <a-spin tip="Loading..." :spinning="loadingWithholdingConfig">
        <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
            key-expr="itemCode" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKeyTab2"
            :focused-row-enabled="true" ref="gridRefCM110Tab2" @focused-row-changing="onFocusedRowChangingTab2"
            :auto-navigate-to-focused-row="true" :allow-column-resizing="colomn_resize" :column-auto-width="true"
            :onRowPrepared="changeColorRow">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                <DxItem name="groupPanel" />
                <DxItem name="addRowButton" show-text="always" />
                <DxItem name="columnChooserButton" />
            </DxToolbar>
            <template #button-template>
                <DxButton icon="plus" @click="openAddNewModal" />
            </template>
            <DxColumn data-field="itemCode" :width="80" css-class="cell-center" caption="코드" />
            <DxColumn data-field="use" caption="이용여부" :width="100" cell-template="use" css-class="cell-center" />
            <template #use="{ data }">
                <tag-color-use :valueUse="data.value" />
            </template>
            <DxColumn data-field="printName" caption="과세구분" />
            <DxColumn data-field="name" caption="항목명" />
            <DxColumn data-field="taxfreePayItemCode" caption="비과세코드" css-class="cell-center" />
            <DxColumn data-field="printTaxFreeIncludeSubmission" caption="제출여부" />
            <DxColumn data-field="printCode" caption="유형" />
            <DxColumn data-field="formula" caption="산출방법" />
            <DxColumn cell-template="pupop" css-class="cell-center" :width="100" />
            <template #pupop="{ data }">
                <div class="custom-action">
                    <a-space :size="10">
                        <!-- <a-tooltip color="black" v-if="data.data.editable" placement="top">
                            <template #title>편집</template>
                            <EditOutlined @click="setModalEditVisible(data)" />
                        </a-tooltip> -->
                        <a-tooltip color="black" placement="top">
                            <template #title>변경이력</template>
                            <HistoryOutlined @click="modalHistory(data)" />
                        </a-tooltip>
                        <deleteOutlined v-if="data.data.editable" @click="statusAddRow ? '' : deleteConfig(data)" />
                    </a-space>
                </div>
            </template>
        </DxDataGrid>
        <standard-form formName="add-cm-310" class="standard-form" ref="formRefTab2">
            <a-spin tip="Loading..." :spinning="loadingDetail" :key="resetFormNum">
                <h2 class="title_modal">{{ statusFormUpdate ? '급여상세항목' : '급여항목추가' }}</h2>
                <div v-if="!statusFormUpdate">
                    <a-row>
                        <a-col :span="14">
                            <a-form-item label="항목명" :label-col="labelCol" class="red">
                                <default-text-box style="width: 150px; margin-right: 10px" :required="true"
                                    v-model:valueInput="formState.name">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="과세구분/유형" :label-col="labelCol" class="red">
                                <TaxPay style="width: 320px" placeholder="선택" v-model:selectedValue="formState.taxPayCode"
                                    :required="true"></TaxPay>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <div style="display: -webkit-inline-box;">
                                <a-form-item label="산출방법" :label-col="labelCol">
                                    <default-text-box style="width: 320px" placeholder="예) 통상시급 x 연장근로시간 x 1.5"
                                        v-model:valueInput="formState.formula">
                                    </default-text-box>
                                </a-form-item>
                            </div>
                            <a-tooltip color="black" placement="top">
                                <template #title>급여명세서 계산방법에 표시됩니다.</template>
                                <img src="@/assets/images/iconInfo.png" class="img-info" />
                            </a-tooltip>
                        </a-col>
                    </a-row>
                </div>
                <div v-else>
                    <a-row :gutter="24">
                        <a-col :span="14">
                            <a-form-item label="코드" :label-col="labelCol">
                                <number-box :width="150" placeholder="Number box" :min="0" :max="30" :disabled="true"
                                    v-model:valueInput="formState.itemCode" :spinButtons="true">
                                </number-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="4"></a-col>
                        <a-col :span="6">
                            <switch-basic style="width: 80px;" v-model:valueSwitch="formState.use" :disabled="editable"
                                :textCheck="'이용중'" :textUnCheck="'이용중지'" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="14">
                            <a-form-item label="항목명" :label-col="labelCol" class="red">
                                <default-text-box style="width: 150px; margin-right: 10px" :disabled="editable"
                                    :required="true" v-model:valueInput="formState.name">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="과세구분/유형" :label-col="labelCol">
                                <div style="width: 320px;">
                                    <TaxPay placeholder="선택" v-model:selectedValue="formState.taxPayCode" :disabled="true">
                                    </TaxPay>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <div style="display: -webkit-inline-box;">
                                <a-form-item label="산출방법" :label-col="labelCol">
                                    <default-text-box style="width: 320px" placeholder="예) 통상시급 x 연장근로시간 x 1.5"
                                        v-model:valueInput="formState.formula" :disabled="editable">
                                    </default-text-box>
                                </a-form-item>
                            </div>
                            <a-tooltip color="black" placement="top">
                                <template #title>급여명세서 계산방법에 표시됩니다.</template>
                                <img src="@/assets/images/iconInfo.png" class="img-info" />
                            </a-tooltip>
                        </a-col>
                    </a-row>
                </div>
            </a-spin>
            <!-- <a-spin tip="Loading..." :spinning="loadingDetail" :key="resetFormNum">
                <h2 style="font-weight: 600; color: gray" class="title_modal">
                    급여상세항목
                </h2>
                
            </a-spin> -->
            <div class="text-align-center mt-20">
                <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="actionSave" />
            </div>
        </standard-form>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
            title="변경이력" typeHistory="cm-130" />
        <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
            :title="Message.getMessage('COMMON', '501').message" content=""
            :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
            @checkConfirm="statusComfirmAdd" />
    </a-spin>
</template>
<script lang="ts">
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import {
    EditOutlined,
    SearchOutlined,
    PrinterOutlined,
    DeleteOutlined, SaveOutlined,
    HistoryOutlined,
} from "@ant-design/icons-vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import queries from "@/graphql/queries/CM/CM130/index";
import mutations from "@/graphql/mutations/CM/CM130/index";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, watch, createVNode, computed } from "vue";
import { useStore } from 'vuex';
import { DxNumberBox } from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import { Modal } from 'ant-design-vue';
import {
    DxDataGrid,
    DxColumn,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem, DxScrolling,
} from "devextreme-vue/data-grid";
import notification from "@/utils/notification";
// import EditCM130Popup from "../CM130/components/EditCM130Popup.vue";
// import SettingPopup from "./components/SettingPopup.vue";
import { Workbook } from "exceljs";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
// import AddCM130Popup from "./components/AddCM130Popup.vue";
import { Message } from "@/configs/enum"
import { initialState, taxPayItem, taxFreePayItem } from "../utils/data";
import dayjs from 'dayjs';

export default defineComponent({
    components: {
        DxNumberBox,
        // SettingPopup,
        DxDataGrid,
        DxColumn,
        DxExport,
        DxScrolling,
        DxSearchPanel,
        DxButton,
        DxToolbar,
        DxItem,
        EditOutlined,
        HistoryOutlined,
        // EditCM130Popup,
        HistoryPopup,
        // AddCM130Popup,
        SearchOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
    },
    setup() {
        // config grid
        const store = useStore();
        const globalYear = dayjs().year()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        // const popupData = ref([]);
        const modalHistoryStatus = ref<boolean>(false);

        // const idRowEdit = ref(0);
        const triggerDetail = ref<boolean>(false);

        const editable = ref<boolean>(false);

        const dataSource = ref<any>([]);
        let itemCodeMax = ref(0);
        const focusedRowKeyTab2 = ref();
        const formRefTab2 = ref()

        const gridRefCM110Tab2 = ref(); // ref of grid

        // get config
        const dataQueryConfigPayItems = ref({ companyId: companyId, imputedYear: globalYear });
        const dataQueryConfigPayItem = ref({ companyId: companyId, imputedYear: globalYear, itemCode: null });
        // const trigger = ref(false)
        // const triggerWithholdingConfig = ref<boolean>(true)
        const triggerWithholdingConfigPayItems = ref<boolean>(true)

        const formState: any = ref({ ...initialState });
        let dataRow = reactive({ ...initialState });
        const resetFormNum = ref(0);
        const modalStatusAdd = ref<boolean>(false);
        const statusClickButtonAdd = ref<boolean>(false);
        const statusAddRow = ref<boolean>(true);

        let runOne = ref<boolean>(true);
        let statusFormUpdate = ref<boolean>(false)
        let dataRowOld = reactive({ ...initialState })
        const statusClickButtonSave = ref<boolean>(true);

        // =================== GRAPHQL ===================
        // get withholding config pay items  
        const {
            result: resultWithholdingConfig, loading: loadingWithholdingConfig
        } = useQuery(queries.getWithholdingConfigPayItems, dataQueryConfigPayItems, () => ({
            enabled: triggerWithholdingConfigPayItems.value,
            fetchPolicy: "no-cache",
        }));
        // get detail withholding config pay item
        const { result: resultConfigPayItem, loading: loadingDetail } = useQuery(
            queries.getWithholdingConfigPayItem,
            dataQueryConfigPayItem,
            () => ({
                enabled: triggerDetail.value,
                fetchPolicy: "no-cache",
            })
        );

        // Create With holding Config Pay Item
        const { mutate: creactConfigPayItem, loading: loadingAdd, onDone: onDoneAdd, onError: errorAdd
        } = useMutation(mutations.createWithholdingConfigPayItem);

        // update detail withholding config pay item
        const { mutate: actionUpdateWithholdingConfigPayItem, onDone: onDoneUpdated, onError: errorUpdated } = useMutation(
            mutations.updateWithholdingConfigPayItem
        );

        // delete withholding config pay item
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteWithholdingConfigPayItem
        );

        // ============== ON DONE MUTATION GRAPHQL ===============
        errorAdd((error) => {
            notification('error', error.message)
        });
        onDoneAdd((res) => {
            notification('success', `원천항목 새로 추가되었습니다!`)
        });

        errorUpdated((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(() => {
            notification('success', Message.getMessage('COMMON', '106').message)
            // refetchConfigPayItem();
            triggerDetail.value = true
        });

        onDoneDelete(() => {
            notification('success', Message.getMessage('COMMON', '402').message)
            // refetchWithholdingConfig()
            triggerWithholdingConfigPayItems.value = true;
        });

        // ================== WATCH ================
        watch(resultWithholdingConfig, (value) => {
            triggerWithholdingConfigPayItems.value = false;
            dataSource.value = value.getWithholdingConfigPayItems;
            dataSource.value.map((e: any) => {
                if (e.itemCode > itemCodeMax.value) {
                    itemCodeMax.value = e.itemCode
                }
                if (e.taxPayItemCode != null) {
                    taxPayItem.map((eData: any) => {
                        if (eData.value == e.taxPayItemCode) {
                            e.printCode = eData.label
                        }
                    })
                    e.printName = "과세"
                } else {
                    taxFreePayItem.map((eData: any) => {
                        if (eData.value == e.taxfreePayItemCode) {
                            e.printCode = eData.label
                            if (eData.submission) {
                                e.printTaxFreeIncludeSubmission = 'O'
                            } else {
                                e.printTaxFreeIncludeSubmission = 'X'
                            }
                        }
                    })
                    e.printName = "비과세"
                }
            })

            if (runOne.value) {
                runOne.value = false;
                if (dataSource.value.length) {
                    focusedRowKeyTab2.value = dataSource.value[0].itemCode
                    dataQueryConfigPayItem.value.itemCode = dataSource.value[0].itemCode
                    triggerDetail.value = true;

                } else {
                    focusedRowKeyTab2.value = null
                    statusFormUpdate.value = false;
                    resetFormNum.value++;
                    Object.assign(formState, initialState);
                }
            }

        });
        watch(resultConfigPayItem, (value) => {
            triggerDetail.value = false
            statusFormUpdate.value = true;
            if (value) {
                formState.value.itemCode = value.getWithholdingConfigPayItem.itemCode;
                formState.value.taxPayCode = value.getWithholdingConfigPayItem.taxfreePayItemCode != null ? ['비과세', value.getWithholdingConfigPayItem.taxfreePayItemCode] : ['과세', value.getWithholdingConfigPayItem.taxPayItemCode];
                formState.value.name = value.getWithholdingConfigPayItem.name;
                formState.value.use = value.getWithholdingConfigPayItem.use;
                formState.value.formula = value.getWithholdingConfigPayItem.formula;
                dataRowOld = { ...formState.value }
                editable.value = value.getWithholdingConfigPayItem.editable;
                // objDataDefault.value = { ...formState.value };
            }
        });

        //================================================= FUNCTION============================================

        const onFocusedRowChangingTab2 = (e: any) => {
            // statusClickButtonAdd.value = false
            dataRow = e.rows[e.newRowIndex]?.data
            const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
            if (dataRow.itemCode && (dataRow.itemCode != formState.value.itemCode)) {
                dataQueryConfigPayItem.value.itemCode = e.rows[e.newRowIndex]?.data.itemCode
                triggerDetail.value = true;

                // if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) {
                //     modalStatus.value = true;
                //     rowElement?.classList.add("dx-state-hover-custom")
                //     e.cancel = true;
                // } else {
                //     if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) {
                //         modalStatus.value = true;
                //         rowElement?.classList.add("dx-state-hover-custom")
                //         e.cancel = true;
                //     } else {
                //         if (!statusAddRow.value && listEmployeeExtra.value[listEmployeeExtra.value.length - 1]?.employeeId == null) {
                //             listEmployeeExtra.value = listEmployeeExtra.value.splice(0, listEmployeeExtra.value.length - 1)
                //             statusAddRow.value = true
                //         }

                //     }
                //     statusFormUpdate.value = true;
                // }
            }
            // const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
            // let data = e.rows[e.newRowIndex]?.data
            // if (JSON.stringify(dataOldFormStateDeduction) !== JSON.stringify(formStateDeduction)) {
            //     if (data) {
            //         dataOldFormStateDeduction.itemCode = data.itemCode;
            //         dataOldFormStateDeduction.taxPayCode = data.taxfreePayItemCode != null ? ['비과세', data.taxfreePayItemCode] : ['과세', data.taxPayItemCode];
            //         dataOldFormStateDeduction.name = data.name;
            //         dataOldFormStateDeduction.use = data.use;
            //         dataOldFormStateDeduction.formula = data.formula;
            //     }
            //     modalStatus.value = true;
            //     rowElement?.classList.add("dx-state-hover-custom")
            //     e.cancel = true;
            // } else {
            //     if (data) {
            //         dataOldFormStateDeduction.itemCode = data.itemCode;
            //         dataOldFormStateDeduction.taxPayCode = data.taxfreePayItemCode != null ? ['비과세', data.taxfreePayItemCode] : ['과세', data.taxPayItemCode];
            //         dataOldFormStateDeduction.name = data.name;
            //         dataOldFormStateDeduction.use = data.use;
            //         dataOldFormStateDeduction.formula = data.formula;
            //     }
            //     Object.assign(formStateDeduction, dataOldFormStateDeduction);
            // }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                statusClickButtonSave.value = false;
                // checkClickYear.value = false;
                onSubmit();
            } else {
                if (statusAddRow.value && statusClickButtonAdd.value) { // add row
                    addRow()
                } else { // reset form
                    resetFormNum.value++;
                    Object.assign(formState.value, initialState);
                }
            }
            gridRefCM110Tab2.value?.instance.refresh();
        }

        const actionSave = () => {
            statusClickButtonSave.value = true;
            onSubmit()
        }

        const onSubmit = () => {
            var res = formRefTab2.value.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else if (!formState.value.taxPayCode?.length) {
                notification('error', `선택해 주세요 과세구분/유형!`)
            } else {
                if (statusFormUpdate.value) {
                    let variables = {
                        companyId: companyId,
                        imputedYear: globalYear,
                        itemCode: formState.itemCode,
                        input: {
                            name: formState.name,
                            use: formState.use,
                            formula: formState.formula
                        }
                    };
                    makeDataClean(variables)
                    actionUpdateWithholdingConfigPayItem(variables)
                } else {
                    let variables = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format("YYYY")),
                        input: {
                            itemCode: itemCodeMax.value + 1,
                            name: formState.value.name,
                            use: formState.value.use,
                            sort: 0,
                            formula: formState.value.formula,
                            tax: formState.value.taxPayCode[0] === "비과세" ? false : true,
                            taxfreePayItemCode:
                                formState.value.taxPayCode[0] === "비과세" ? formState.value.taxPayCode[1] : null,
                            taxPayItemCode:
                                formState.value.taxPayCode[0] === "과세" ? formState.value.taxPayCode[1] : null,
                        },
                    };
                    makeDataClean(variables)
                    creactConfigPayItem(variables);
                }

            }
        };

        const deleteConfig = (data: any) => {
            Modal.confirm({
                title: '삭제하겠습니까?',
                icon: createVNode(ExclamationCircleOutlined),
                okText: '네',
                cancelText: '아니요',
                onOk() {
                    let variables = {
                        companyId: companyId,
                        imputedYear: globalYear,
                        itemCode: data.data.itemCode
                    };
                    actionDelete(variables);
                },
                class: 'confirm',
            });
        }

        const openAddNewModal = () => {
            if (dataSource.value.length <= 20) {
                let statusChangeFormAdd = (JSON.stringify({ ...initialState }) !== JSON.stringify(formState) && statusFormUpdate.value == false)
                let statusChangeFormEdit = (JSON.stringify(dataRowOld) !== JSON.stringify(formState) && statusFormUpdate.value == true)
                if (statusChangeFormEdit || statusChangeFormAdd) { // if status form add and form not null
                    modalStatusAdd.value = true
                    statusClickButtonAdd.value = true
                } else if (!statusAddRow.value) {
                    addRow()
                }
                // resetFormNum.value++;
                // modalAddNewStatus.value = true;
            } else {
                notification('error', `이용 가능한 급여항목은 최대 20개입니다. 기존항목을 이용중지한 후 새로 추가하세요`)
            }
        }

        // const setModalEditVisible = (data: any) => {
        //     // idRowEdit.value = data.data.itemCode;
        //     // modalEditStatus.value = true;
        //     // popupData.value = data;
        // };

        const modalHistory = (data: any) => {
            // idRowEdit.value = data.data.itemCode;
            modalHistoryStatus.value = true;
            // popupData.value = data;
        }

        const addRow = () => {
            // disabledBlock.value = false;
            statusClickButtonAdd.value = false;
            statusAddRow.value = true;
            dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ ...initialState })
            formState.value = dataSource.value[dataSource.value.length - 1]
            resetFormNum.value++;
            focusedRowKeyTab2.value = 'PA710';
            statusFormUpdate.value = false;
        }

        const changeColorRow = (e: any) => {
            if (e.data?.use) {
                if (e.data.tax) {
                    e.rowElement.style.backgroundColor = '#FFB6C1';
                } else {
                    e.rowElement.style.backgroundColor = '#D2ECFC';
                }
            } else if (e.data?.use == "false") {
                e.rowElement.style.backgroundColor = '#ECECEC';
            }
        }

        return {
            // idRowEdit,
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            changeColorRow,
            dataSource,
            loadingWithholdingConfig,

            deleteConfig,
            // popupData,
            modalHistoryStatus,

            openAddNewModal,

            // setModalEditVisible,

            modalHistory,
            focusedRowKeyTab2,
            gridRefCM110Tab2,
            formState,
            actionSave, onFocusedRowChangingTab2,
            loadingDetail,
            resetFormNum, statusFormUpdate, editable,
            statusAddRow, modalStatusAdd, Message,
            statusComfirmAdd, formRefTab2,
        };
    },
});
</script>
<style lang="scss" scoped src="../style/style.scss"></style>
