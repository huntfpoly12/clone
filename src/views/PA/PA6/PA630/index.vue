<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="거주자의 사업소득원천징수영수증 " @actionSearch="searching" :buttonSearch="true" />
        <div id="pa-630">
            <div class="search-form">
                <a-row>
                    <a-col :span="22">
                        <a-row :gutter="[24, 8]">
                            <a-col>
                                <div class="custom-flex global-year">
                                    <label class="lable-item">귀속연도 :</label>
                                    <a-tag color="#a3a2a0">귀 {{ paYear }}</a-tag>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <DxDataGrid noDataText="내역이 없습니다" id="gridContainerPA630" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" @exporting="onExporting"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    ref="gridRef" @selection-changed="selectionChanged">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxPaging :enabled="false" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem template="box-search-left" location="before" />
                        <DxItem template="box-search-right" location="after" />
                        <DxItem template="send-group-mail" />
                        <DxItem template="send-group-print" />
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" css-class="cell-button-export" />
                    </DxToolbar>
                    <template #box-search-left>
                        <a-form-item label="서식 설정">
                            <div class="custom-flex">
                                <switch-basic style="width: 120px;" v-model:valueSwitch="valueSwitch" :textCheck="'소득자 보관용'"
                                    :textUnCheck="'발행자 보관용'" />
                                <a-tooltip color="black" placement="top">
                                    <template #title>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</template>
                                    <img src="@/assets/images/iconInfo.png" class="img-info" />
                                </a-tooltip>
                            </div>
                        </a-form-item>
                    </template>
                    <template #box-search-right>
                        <div class="created-date">
                            <label class="lable-item">영수일 :</label>
                            <date-time-box width="150px"
                                v-model:valueDate="valueDefaultIncomeBusiness.input.receiptDate"></date-time-box>
                        </div>
                    </template>
                    <template #send-group-mail>
                        <DxButton @click="actionOpenPopupEmailMulti">
                            <img src="@/assets/images/emailGroup.png" alt="" style="width: 28px;" />
                        </DxButton>
                    </template>
                    <template #send-group-print>
                        <DxButton @click="onPrintGroup">
                            <a-tooltip title="출력 / 저장" placement="topLeft">
                                <img src="@/assets/images/printGroup.png" alt="" style="width: 28px;" />
                            </a-tooltip>
                        </DxButton>
                    </template>
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple" />
                    <DxColumn :width="250" caption="성명 (상호)" css-class="cell-left" cell-template="tag"
                        data-field="employee.name" />
                    <template #tag="{ data }">
                        <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                            :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                            :foreigner="data.data.employee.foreigner" :checkStatus="false" />
                    </template>
                    <DxColumn caption="주민등록번호" cell-template="residentId" data-field="employee.residentId" />
                    <template #residentId="{ data }">
                        <resident-id :residentId="data.data.employee?.residentId"></resident-id>
                    </template>
                    <DxColumn caption="소득구분" cell-template="grade-cell" :width="200" data-field="employee.incomeTypeCode" />
                    <template #grade-cell="{ data }">
                        <income-type :typeCode="data.data.employee.incomeTypeCode"
                            :typeName="data.data.employee.incomeTypeName"></income-type>
                    </template>
                    <DxColumn caption="지급총액" data-field="paymentAmount" format="fixedPoint" />
                    <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" format="fixedPoint" />
                    <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" format="fixedPoint" />
                    <DxColumn caption="원천징수세액 계" cell-template="sumWithholdingRuralSpecialTax" data-field="total"
                        css-class="money-column" />
                    <template #sumWithholdingRuralSpecialTax="{ data }">
                        {{ $filters.formatCurrency(data.data.total) }}
                    </template>
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }">
                        <div class="custom-action">
                            <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px;" />
                            <a-tooltip title="출력 / 저장" placement="topLeft">
                                <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                                    style="width: 25px;" />
                            </a-tooltip>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="custom-smmary">
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                            전체 <span>[{{ dataSource.length }}]</span>
                        </div>
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customPaymentAmount()">
                        </div>
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                            v-html="customWithholdingIncomeTax()">
                        </div>
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                            v-html="customWithholdingLocalIncomeTax()">
                        </div>
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTextSummaryWRST()">
                        </div>
                </div>
                <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal"
                    :data="popupDataEmailSingle" />
                <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="onCloseEmailMultiModal"
                    :data="popupDataEmailMulti" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { useQuery } from "@vue/apollo-composable";
import filters from "@/helpers/filters";
import DxButton from "devextreme-vue/button";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    DxTotalItem, DxScrolling,
    DxSummary
} from "devextreme-vue/data-grid";
import { companyId, onExportingCommon, userId } from "@/helpers/commonFunction";
import dayjs, { Dayjs } from 'dayjs';
import queries from "@/graphql/queries/PA/PA6/PA630/index";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
import EmailMultiPopup from "./components/EmailMultiPopup.vue";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";

export default defineComponent({
    components: {
        DxSummary,
        DxButton,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxTotalItem,
        DxScrolling,
        DxToolbar,
        DxItem,
        EmailSinglePopup,
        EmailMultiPopup
    },
    setup() {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const valueSwitch = ref(true);
        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})
        const dataSelect = ref<any>([])
        const store = useStore();
        const gridRef = ref(); // ref of grid
        const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
        const trigger = ref<boolean>(true);
        const triggerPrint = ref<boolean>(false);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)
        const dataSource: any = ref([])
        // const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const originData = ref({
            companyId: companyId,
            imputedYear: paYear.value,
        });
        const valueDefaultIncomeBusiness = ref({
            companyId: companyId,
            input: {
                imputedYear: paYear.value,
                type: 1,
                receiptDate: parseInt(dayjs().format('YYYYMMDD')),
            },
            employeeIds: [null]
        });
        const {
            result,
            loading,
        } = useQuery(queries.searchIncomeBusinessWithholdingReceipts, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        const {
            result: resultPrint
        } = useQuery(queries.getIncomeBusinessWithholdingReceiptReportViewUrl, valueDefaultIncomeBusiness, () => ({
            enabled: triggerPrint.value,
            fetchPolicy: "no-cache",
        }));
        watch(resultPrint, (value) => {
            if (value) {
                window.open(value.getIncomeBusinessWithholdingReceiptReportViewUrl)
                triggerPrint.value = false
            }
        });
        const onExporting = (e: { component: any; cancel: boolean }) => {
            onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
        };
        const actionOpenPopupEmailSingle = (data: any) => {
            gridRef.value?.instance.deselectAll()
            popupDataEmailSingle.value = {
                companyId: companyId,
                input: {
                    imputedYear: paYear.value,
                    type: valueDefaultIncomeBusiness.value.input.type,
                    receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
                },
                employeeInputs: {
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    // incomeTypeCode: data.employee.incomeTypeCode
                }
            }
            modalEmailSingle.value = true
        }
        const onCloseEmailSingleModal = () => {
            modalEmailSingle.value = false
        }
        const onCloseEmailMultiModal = () => {
            modalEmailMulti.value = false
        }

        const actionOpenPopupEmailMulti = () => {
            if (dataSelect.value.length) {
                popupDataEmailMulti.value = {
                    companyId: companyId,
                    input: {
                        imputedYear: paYear.value,
                        type: valueDefaultIncomeBusiness.value.input.type,
                        receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
                    },
                    employeeInputs: dataSelect.value
                }
                modalEmailMulti.value = true
            } else {
                notification('error', messages.getCommonMessage('404').message)
            }
        }
        const onPrintGroup = () => {
            if (dataSelect.value.length) {
                var array: any = [];
                dataSelect.value.map((val: any) => {
                    array.push(val.employeeId)
                })
                valueDefaultIncomeBusiness.value.employeeIds = array
                triggerPrint.value = true;
            } else {
                notification('error', messages.getCommonMessage('404').message)
            }
        };
        const selectionChanged = (data: any) => {
            dataSelect.value = []
            data.selectedRowKeys.forEach((data: any) => {
                dataSelect.value.push({
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    // incomeTypeCode: data.employee.incomeTypeCode
                })
            })
        }

        watch(result, (value) => {
            if (value) {
                dataSource.value = value.searchIncomeBusinessWithholdingReceipts.map((value: any) => {
                    return {
                        ...value,
                        total: value.withholdingIncomeTax + value.withholdingLocalIncomeTax
                    }
                });
                trigger.value = false;
            }
        });
        watch(valueSwitch, (newValue) => {
            if (newValue) {
                valueDefaultIncomeBusiness.value.input.type = 1
            } else {
                valueDefaultIncomeBusiness.value.input.type = 2
            }
        });
        // watch(paYear, (newValue) => {
        //     trigger.value = true;
        // })

        const searching = () => {
            trigger.value = true;
        };

        const actionPrint = (data: any) => {
            gridRef.value?.instance.deselectAll()
            valueDefaultIncomeBusiness.value.employeeIds = [data.employee.employeeId]
            triggerPrint.value = true;
        }
        const customPaymentAmount = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.paymentAmount
            })
            return `지급총액합계 <span>[${filters.formatCurrency(sum)}]</span>`;
        }
        const customWithholdingIncomeTax = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.withholdingIncomeTax
            })
            return `원천징수세액 소득세합계 <span>[${filters.formatCurrency(sum)}]</span> `;
        }
        const customWithholdingLocalIncomeTax = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.withholdingLocalIncomeTax
            })
            return `원천징수세액 지방소득세합계 <span>[${filters.formatCurrency(sum)}]</span>`;
        }
        const customTextSummaryWRST = () => {
            let sum = 0
            dataSource.value?.map((value: any) => {
                sum += value.withholdingLocalIncomeTax + value.withholdingIncomeTax
            })
            return `원천징수세액 계합계 <span>[${filters.formatCurrency(sum)}]</span>`
        }

        return {
            customPaymentAmount, customWithholdingIncomeTax, customWithholdingLocalIncomeTax,
            valueDefaultIncomeBusiness,
            valueSwitch,
            loading,
            popupDataEmailSingle,
            popupDataEmailMulti,
            actionOpenPopupEmailSingle,
            actionOpenPopupEmailMulti,
            searching,
            paYear,
            dataSource,
            move_column,
            colomn_resize,
            onExporting,
            modalEmailSingle,
            modalEmailMulti,
            onCloseEmailSingleModal,
            onCloseEmailMultiModal,
            selectionChanged,
            actionPrint, onPrintGroup, gridRef,
            // amountFormat,
            customTextSummaryWRST,
        };
    },
});
</script>








<style lang="scss" scoped src="./style/style.scss" />
