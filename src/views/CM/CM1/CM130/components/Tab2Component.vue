<template>
    <a-spin tip="Loading..." :spinning="loadingWithholdingConfig">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
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
                        <a-tooltip color="black" v-if="data.data.editable" placement="top">
                            <template #title>편집</template>
                            <EditOutlined @click="setModalEditVisible(data)" />
                        </a-tooltip>
                        <a-tooltip color="black" placement="top">
                            <template #title>변경이력</template>
                            <HistoryOutlined @click="modalHistory(data)" />
                        </a-tooltip>
                        <deleteOutlined v-if="data.data.editable" @click="deleteConfig(data)" />
                    </a-space>
                </div>
            </template>
        </DxDataGrid>
        <standard-form formName="add-cm-310" class="standard-form">
            <a-spin tip="Loading..." :spinning="false">
                <h2 class="title_modal">급여항목추가</h2>
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
            </a-spin>
            <div class="text-align-center mt-20">
                <!-- <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible()" /> -->
                <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit($event)" />
            </div>
        </standard-form>
        <!-- <AddCM130Popup></AddCM130Popup> -->
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
            title="변경이력" :idRowEdit="idRowEdit" typeHistory="cm-130" />
    </a-spin>
</template>
<script lang="ts">
import { companyId } from "@/helpers/commonFunction";
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
import { initialState } from "../utils/data";
import dayjs from 'dayjs';
import { TaxPayItem, TaxFreePayItem } from "@bankda/jangbuda-common";
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
        const popupData = ref([]);
        const modalHistoryStatus = ref<boolean>(false);

        const idRowEdit = ref(0);
        const triggerDetail = ref<boolean>(false);

        const dataSource = ref([]);
        let itemCodeMax = ref(0);
        const focusedRowKeyTab2 = ref<number>();

        const gridRefCM110Tab2 = ref(); // ref of grid

        // get config
        const dataQuery = ref({ companyId: companyId, imputedYear: globalYear });
        // const trigger = ref(false)
        // const triggerWithholdingConfig = ref<boolean>(true)
        const triggerWithholdingConfigPayItems = ref<boolean>(true)

        const formState = reactive({ ...initialState });
        // const triggerWithholdingConfigDeductionItems = ref<boolean>(true)
        // let runOne = ref<boolean>(true);

        // =================== GRAPHQL ===================
        // get withholding config pay items  
        const {
            result: resultWithholdingConfig, loading: loadingWithholdingConfig
        } = useQuery(queries.getWithholdingConfigPayItems, dataQuery, () => ({
            enabled: triggerWithholdingConfigPayItems.value,
            fetchPolicy: "no-cache",
        }));
        // get detail withholding config pay item
        const { result: resultConfigPayItem, loading: loadingDetail } = useQuery(
            queries.getWithholdingConfigPayItem,
            dataQuery,
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
        });
        watch(resultConfigPayItem, (value) => {
            triggerDetail.value = false
            if (value) {
                formState.itemCode = value.getWithholdingConfigPayItem.itemCode;
                formState.taxPayCode = value.getWithholdingConfigPayItem.taxfreePayItemCode != null ? ['비과세', value.getWithholdingConfigPayItem.taxfreePayItemCode] : ['과세', value.getWithholdingConfigPayItem.taxPayItemCode];
                formState.name = value.getWithholdingConfigPayItem.name;
                formState.use = value.getWithholdingConfigPayItem.use;
                formState.formula = value.getWithholdingConfigPayItem.formula;
                // objDataDefault.value = { ...formState };
            }
        });

        //================================================= FUNCTION============================================

        const onFocusedRowChangingTab2 = (e: any) => {
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

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else if (!formState.taxPayCode?.length) {
                notification('error', `선택해 주세요 과세구분/유형!`)
            } else {
                let variables = {
                    companyId: companyId,
                    imputedYear: parseInt(dayjs().format("YYYY")),
                    input: {
                        // itemCode: props.itemCodeMax + 1,
                        name: formState.name,
                        use: formState.use,
                        sort: 0,
                        formula: formState.formula,
                        tax: formState.taxPayCode[0] === "비과세" ? false : true,
                        taxfreePayItemCode:
                            formState.taxPayCode[0] === "비과세" ? formState.taxPayCode[1] : null,
                        taxPayItemCode:
                            formState.taxPayCode[0] === "과세" ? formState.taxPayCode[1] : null,
                    },
                };
                // makeDataClean(variables)
                creactConfigPayItem(variables);
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
        const onExporting = (e: any) => {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("employees");
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "DataGrid.xlsx"
                    );
                });
            });
            e.cancel = true;
        };

        const openAddNewModal = () => {
            if (dataSource.value.length <= 20) {
                // resetFormNum.value++;
                // modalAddNewStatus.value = true;
            } else {
                notification('error', `이용 가능한 급여항목은 최대 20개입니다. 기존항목을 이용중지한 후 새로 추가하세요`)
            }
        }

        const setModalEditVisible = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            // modalEditStatus.value = true;
            popupData.value = data;
        };

        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }



        const taxPayItem = Object.keys(TaxPayItem.all()).map((k, index) => ({
            value: TaxPayItem.all()[index].enumOrdinal,
            label: TaxPayItem.all()[index].name,
        }));

        const arrLabel = Array();
        TaxFreePayItem.all().forEach((k, index) => {
            if (JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.monthlyLimit) {
                arrLabel[index] = TaxFreePayItem.all()[index].name + ' 월' + JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.monthlyLimit
            } else if (JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.annualLimit) {
                arrLabel[index] = TaxFreePayItem.all()[index].name + ' 년' + JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.annualLimit
            } else {
                arrLabel[index] = TaxFreePayItem.all()[index].name
            }
        });

        const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
            value: TaxFreePayItem.all()[index].enumKey,
            label: arrLabel[index],
            submission: JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.submission,
        }));

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
            idRowEdit,
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            activeKey: ref("1"),
            changeColorRow,

            dataSource,

            loadingWithholdingConfig,

            deleteConfig,
            popupData,
            // modalAddNewStatus,
            modalHistoryStatus,

            openAddNewModal,

            setModalEditVisible,

            modalHistory,
            onExporting,
            itemCodeMax,
            focusedRowKeyTab2,
            gridRefCM110Tab2,
            formState,
            onSubmit, onFocusedRowChangingTab2
        };
    },
});
</script>
<style lang="scss" scoped src="../style/style.scss"></style>
