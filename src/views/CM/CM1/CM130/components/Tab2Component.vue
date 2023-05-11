<template>
    <a-spin tip="Loading..." :spinning="loadingWithholdingConfig">
        <DxDataGrid id="dataGridTab2" noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
            :data-source="dataSource" :show-borders="true" key-expr="itemCode" :allow-column-reordering="move_column"
            v-model:focused-row-key="focusedRowKeyTab2" :focused-row-enabled="true" ref="gridRefCM110Tab2"
            @focused-row-changing="onFocusedRowChangingTab2" :auto-navigate-to-focused-row="true"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowPrepared="changeColorRow">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                <!-- <DxItem name="groupPanel" /> -->
                <!-- <DxItem name="addRowButton" show-text="always" /> -->
                <!-- <DxItem name="columnChooserButton" /> -->
            </DxToolbar>
            <template #button-template>
                <DxButton icon="plus" @click="openAddNewModal" />
            </template>
            <template #button-history>
                <a-tooltip color="black" placement="top">
                    <template #title>변경이력</template>
                    <DxButton icon="plus">
                        <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                    </DxButton>
                </a-tooltip>
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
            <DxColumn cell-template="pupop" css-class="cell-center" :width="50" />
            <template #pupop="{ data }">
                <div class="custom-action">
                    <deleteOutlined v-if="data.data.useChangable" @click="statusAddRow ? deleteConfig(data) : ''" />
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
                                    v-model:valueInput="formState.name" placeholder="기존항목과 중복불가">
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
                    <div class="mt-20" style="margin-left: 230px">
                        <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                            :mode="'contained'" @onClick="actionSave" />
                    </div>
                </div>
                <div v-else>
                    <a-row :gutter="24">
                        <a-col :span="5">
                            <a-form-item label="코드" :label-col="labelCol">
                                <number-box :width="150" placeholder="Number box" :min="0" :max="30" :disabled="true"
                                    v-model:valueInput="formState.itemCode" :spinButtons="true">
                                </number-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <switch-basic style="width: 80px;" v-model:valueSwitch="formState.use" :disabled="useChangable"
                                :textCheck="'이용중'" :textUnCheck="'이용중지'" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="14">
                            <a-form-item label="항목명" :label-col="labelCol" class="red">
                                <default-text-box style="width: 150px; margin-right: 10px" :disabled="useChangable"
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
                                        v-model:valueInput="formState.formula" :disabled="useChangable">
                                    </default-text-box>
                                </a-form-item>
                            </div>
                            <a-tooltip color="black" placement="top">
                                <template #title>급여명세서 계산방법에 표시됩니다.</template>
                                <img src="@/assets/images/iconInfo.png" class="img-info" />
                            </a-tooltip>
                        </a-col>
                    </a-row>
                    <div class="mt-20" style="margin-left: 230px">
                        <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                            :mode="'contained'" @onClick="actionSave" />
                    </div>
                </div>
            </a-spin>
        </standard-form>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
            typeHistory="cm-130" />
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="'confirm'"
            :title="Message.getMessage('COMMON', '501').message" content=""
            :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
            @checkConfirm="statusComfirm" />
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
import { useQuery, useMutation } from "@vue/apollo-composable";
import { Message } from "@/configs/enum"
import { initialState, taxPayItem, taxFreePayItem } from "../utils/data";
import dayjs from 'dayjs';

export default defineComponent({
    components: {
        DxNumberBox,
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
        HistoryPopup,
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

        const modalHistoryStatus = ref<boolean>(false);
        const triggerDetail = ref<boolean>(false);

        const useChangable = ref<boolean>(false);

        const dataSource = ref<any>([]);
        let itemCodeMax = ref(0);
        const focusedRowKeyTab2 = ref();
        const formRefTab2 = ref()
        const gridRefCM110Tab2 = ref(); // ref of grid

        // get config
        const dataQueryConfigPayItems = ref({ companyId: companyId, imputedYear: globalYear });
        const dataQueryConfigPayItem = ref<any>({ companyId: companyId, imputedYear: globalYear, itemCode: null });
        const triggerWithholdingConfigPayItems = ref<boolean>(true)

        const formState: any = ref({ ...initialState });
        let dataRow = reactive({ ...initialState });
        const resetFormNum = ref(0);
        const modalStatus = ref<boolean>(false);
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
            result: resultWithholdingConfig, loading: loadingWithholdingConfig,
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
        onDoneAdd(async (res) => {
            await (triggerWithholdingConfigPayItems.value = true);
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                return
            }
            if (statusClickButtonSave.value) { // if click submit
                dataQueryConfigPayItem.value.itemCode = res.data.createWithholdingConfigPayItem?.itemCode
            } else { // if click save modal
                dataQueryConfigPayItem.value.itemCode = dataRow.itemCode
            }
            await (triggerDetail.value = true);
            await (statusFormUpdate.value = true);
            await (statusAddRow.value = true);
            notification('success', `원천항목 새로 추가되었습니다!`)
        });

        errorUpdated((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(async (res) => {
            notification('success', Message.getMessage('COMMON', '106').message)
            await (triggerWithholdingConfigPayItems.value = true);
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                return
            }
            if (statusClickButtonSave.value) { // if click submit
                dataQueryConfigPayItem.value.itemCode = res.data.updateWithholdingConfigPayItem?.itemCode
            } else { // if click save modal
                dataQueryConfigPayItem.value.itemCode = dataRow.itemCode
            }
            await (triggerDetail.value = true);
        });

        onDoneDelete(() => {
            notification('success', Message.getMessage('COMMON', '402').message)
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
                    // focusedRowKeyTab2.value = dataSource.value[0].itemCode
                    dataQueryConfigPayItem.value.itemCode = dataSource.value[0].itemCode
                    triggerDetail.value = true;

                } else {
                    // focusedRowKeyTab2.value = null
                    statusFormUpdate.value = false;
                    resetFormNum.value++;
                    Object.assign(formState, initialState);
                }
            }
            if (statusClickButtonAdd.value && !statusClickButtonSave.value) { // nếu trước đó ấn button add
                addRow()
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

                focusedRowKeyTab2.value = value.getWithholdingConfigPayItem.itemCode
                useChangable.value = !value.getWithholdingConfigPayItem.useChangable;
                // objDataDefault.value = { ...formState.value };
            }
        });

        //================================================= FUNCTION============================================

        const onFocusedRowChangingTab2 = (e: any) => {
            dataRow = e.rows[e.newRowIndex]?.data
            const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
            if (dataRow.itemCode && (dataRow.itemCode != formState.value.itemCode)) {
                dataQueryConfigPayItem.value.itemCode = e.rows[e.newRowIndex]?.data.itemCode
                if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) {
                    modalStatus.value = true;
                    rowElement?.classList.add("dx-state-hover-custom")
                    e.cancel = true;
                } else {
                    if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) {
                        modalStatus.value = true;
                        rowElement?.classList.add("dx-state-hover-custom")
                        e.cancel = true;
                    } else {
                        if (!statusAddRow.value && dataSource.value[dataSource.value.length - 1]?.employeeId == null) {
                            dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1)
                            statusAddRow.value = true
                        }
                        triggerDetail.value = true;
                    }
                    statusFormUpdate.value = true;
                }
            }
        }
        const statusComfirm = (val: any) => {
            if (val) {
                statusClickButtonSave.value = false;
                onSubmit();
            } else {
                if (!statusAddRow.value) {
                    dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1)
                    statusAddRow.value = true
                }
                statusFormUpdate.value = true
                triggerDetail.value = true;
            }
            gridRefCM110Tab2.value?.instance.refresh();
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                statusClickButtonSave.value = false;
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
                    console.log(formState);

                    let variables = {
                        companyId: companyId,
                        imputedYear: globalYear,
                        itemCode: formState.value.itemCode,
                        input: {
                            name: formState.value.name,
                            use: formState.value.use,
                            formula: formState.value.formula
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
                                formState.value.taxPayCode[0] === "비과세" ? formState.value.taxPayCode[1] + 1 : null,
                            taxPayItemCode:
                                formState.value.taxPayCode[0] === "과세" ? formState.value.taxPayCode[1] + 1 : null,
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
                console.log(JSON.stringify(dataRowOld));
                console.log(JSON.stringify(dataRowOld));

                let statusChangeFormAdd = (JSON.stringify({ ...initialState }) !== JSON.stringify(formState.value) && statusFormUpdate.value == false)
                let statusChangeFormEdit = (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true)
                if (statusChangeFormEdit) { // if status form add and form not null
                    console.log(1);

                    modalStatusAdd.value = true
                    statusClickButtonAdd.value = true
                } else {
                    if (statusChangeFormAdd) { // if status form add and form not null
                        console.log(2);
                        modalStatusAdd.value = true
                        statusClickButtonAdd.value = true
                    } else if (statusAddRow.value) {
                        addRow()
                    }
                }
            } else {
                notification('error', `이용 가능한 급여항목은 최대 20개입니다. 기존항목을 이용중지한 후 새로 추가하세요`)
            }
        }

        const modalHistory = () => {
            modalHistoryStatus.value = true;
        }

        const addRow = () => {
            statusClickButtonAdd.value = false;
            statusAddRow.value = false;
            initialState.itemCode = itemCodeMax.value + 1
            dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ ...initialState })
            formState.value = dataSource.value[dataSource.value.length - 1]
            resetFormNum.value++;
            focusedRowKeyTab2.value = initialState.itemCode;
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
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            changeColorRow,
            dataSource,
            loadingWithholdingConfig,

            deleteConfig,
            modalHistoryStatus,

            openAddNewModal,
            modalHistory,
            focusedRowKeyTab2,
            gridRefCM110Tab2,
            formState,
            actionSave, onFocusedRowChangingTab2,
            loadingDetail,
            resetFormNum, statusFormUpdate, useChangable,
            statusAddRow, modalStatus, modalStatusAdd, Message,
            statusComfirm, statusComfirmAdd, formRefTab2,
        };
    },
});
</script>
<style lang="scss" scoped src="../style/style.scss"></style>
