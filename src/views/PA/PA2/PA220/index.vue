<template>
    <action-header title="일용직근로소득원천징수영수증" @actionSearch="onSearch" :buttonSearch="true" />
    <div id="pa-220">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col>
                    <label class="lable-item">귀속연도 :</label>
                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </a-col>
                <a-col>
                    <div class="selectRatio">
                        <label class="lable-item">구분 :</label>
                        <radio-group :arrayValue="arrayRadioDivision" v-model:valueRadioCheck="searchParam.filter.leaved"
                            :layoutCustom="'horizontal'" valueExpr="value" />
                    </div>
                </a-col>
                <!-- <a-col>
                    <div class="selectRatio">
                        <label class="lable-item">성명 :</label>
                        <default-text-box v-model:valueInput="searchParam.filter.name" width="200px" />
                    </div>
                </a-col> -->
            </a-row>
        </div>
        <div class="page-content">
            <a-spin :spinning="loadingSearch" size="large">
                <DxDataGrid id="gridContainerPA220" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                    :allow-column-reordering="move_column" noDataText="내역이 없습니다" :allow-column-resizing="colomn_resize"
                    @selection-changed="selectionChanged" :column-auto-width="true">
                    <DxSelection mode="multiple" />
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxPaging :enabled="false" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem template="box-search-left" location="before" />
                        <DxItem template="box-search-right" location="after" />
                        <DxItem template="pagination-send-group-mail" />
                        <DxItem template="send-group-print" />
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" css-class="cell-button-export" />
                    </DxToolbar>
                    <template #box-search-left>
                        <a-form-item label="서식 설정">
                            <div class="custom-flex">
                                <radio-group :arrayValue="arrayRadioType" v-model:valueRadioCheck="viewUrlParam.input.type"
                                    :layoutCustom="'horizontal'" valueExpr="id" />
                                <a-tooltip title="본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.">
                                    <img src="@/assets/images/iconInfo.png" class="img-info" />
                                </a-tooltip>
                            </div>
                        </a-form-item>
                    </template>
                    <template #box-search-right>
                        <div class="created-date">
                            <label class="lable-item">작성일 :</label>
                            <date-time-box width="160px" v-model:valueDate="viewUrlParam.input.receiptDate"
                                dateFormat="YYYY-MM-DD" />
                        </div>
                    </template>
                    <template #pagination-send-group-mail>
                        <div class="custom-mail-group">
                            <DxButton @click="sendMailGroup">
                                <img src="@/assets/images/emailGroup.png" alt="" style="width: 28px;" />
                            </DxButton>
                        </div>
                    </template>
                    <template #send-group-print>
                        <div class="custom-mail-group" @click="onPrintGroup">
                            <DxButton>
                                <a-tooltip>
                                    <template #title>출력 / 저장</template>
                                    <img src="@/assets/images/printGroup.png" alt="" style="width: 28px;" />
                                </a-tooltip>
                            </DxButton>
                        </div>
                    </template>
                    <DxColumn caption="성명" cell-template="tag" data-field="employee.name" width="200px" />
                    <template #tag="{ data }">
                        <div class="custom-action">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.employee.name"
                                :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                                :foreigner="data.data.employee.foreigner" :checkStatus="false" />
                        </div>
                    </template>
                    <DxColumn caption="주민등록번호" cell-template="residentId" data-field="employee.residentId" width="150px" />
                    <template #residentId="{ data }">
                        <resident-id :residentId="data.data.employee?.residentId"></resident-id>
                    </template>
                    <DxColumn caption="비고" css-class="cell-left" cell-template="four-major"
                        data-field="employee.nationalPensionDeduction" />
                    <template #four-major="{ data }">
                        <!-- <div> -->
                        <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                            :typeValue="1" />
                        <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                            :typeValue="1" />
                        <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                            :typeValue="1" />
                        <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                            :ratio="data.data.employee.nationalPensionSupportPercent" />
                        <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent" :typeTag="7"
                            :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                        <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent" :typeTag="8"
                            :ratio="data.data.employee.employeementReductionRatePercent" />
                        <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                            :ratio="data.data.employee.incomeTaxMagnification" />
                        <!-- </div> -->
                    </template>
                    <DxColumn caption="구분" data-field="leaved" cell-template="leaved" />
                    <template #leaved="{ data }">
                        <span class="status-blue" v-if="data.data.leaved">중도</span>
                        <span class="status-red" v-else>계속</span>
                    </template>
                    <DxColumn caption="총급여액" data-field="totalSalary" format="fixedPoint" />
                    <DxColumn caption="비과세금액" data-field="taxFreeIncome" format="fixedPoint" />
                    <DxColumn caption="결정세액" data-field="decidedTaxAmount" format="fixedPoint" />
                    <DxColumn caption="기납부세액 (현)" data-field="prePaidIncomeTaxAmount" format="fixedPoint" />
                    <DxColumn caption="차감징수세액" data-field="deductibleIncomeTaxAmount" format="fixedPoint" />
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }">
                        <div class="custom-action" style="text-align: center;">
                            <img @click="onOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px;" />
                            <a-tooltip>
                                <template #title>출력 / 저장</template>
                                <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                                    style="width: 25px;" />
                            </a-tooltip>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="custom-smmary">
                    <!-- <div style="margin-left: 70px;"> -->
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTextSummaryInfo()"></div>
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTextSummaryTotalSalary()">
                    </div>
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                        v-html="customTextSummaryTaxFreeIncome()"></div>
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                        v-html="customTextSummaryDecidedTaxAmount()"></div>
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                        v-html="customTextSummaryPrePaidTaxAmount()"></div>
                    <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                        v-html="customTextSummaryDeductibleTaxAmount()"></div>
                </div>
            </a-spin>
            <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
                :data="popupDataEmailSingle" />
            <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false"
                :data="popupDataEmailMulti" :dataSelect="dataSelect" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive, watch } from "vue";
import { useStore } from 'vuex';
import notification from "@/utils/notification";
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from "@vue/apollo-composable";
import { DxDataGrid, DxColumn, DxSelection, DxToolbar, DxScrolling, DxItem, DxSearchPanel, DxExport, DxPaging } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { radioLeaved, radioType } from "./utils/index"
import {
    companyId,
    onExportingCommon,
    makeDataClean,
} from "@/helpers/commonFunction";
import EmailSinglePopup from "./components/EmailSinglePopup.vue"
import EmailMultiPopup from "./components/EmailMultiPopup.vue"
import queries from "@/graphql/queries/PA/PA2/PA220/index";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxSelection, DxScrolling, DxToolbar, DxItem, DxButton, EmailSinglePopup, EmailMultiPopup, DxSearchPanel, DxExport, DxPaging
    },
    setup() {
        const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? "0"))
        const arrayRadioDivision = ref([...radioLeaved])
        const arrayRadioType = ref([...radioType])
        const formSearch = ref({
            division: 1,
            type: 1,
            receiptDate: parseInt(dayjs().format('YYYYMMDD')),
        })

        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})

        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)

        const dataSource: any = ref([]);
        const dataSelect = ref<any>([]);
        const incomeIds = ref<any>([])
        const store = useStore();

        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };


        // Search
        // const searchData = ref([]);
        const searchParam = reactive({
            companyId: companyId,
            filter: { imputedYear: globalYear.value, leaved: null, name: null }
        })
        let payloadSearchParamClear: any = ref(makeDataClean(searchParam))
        const searchTrigger = ref<boolean>(true)
        const {
            result: resultSearch,
            loading: loadingSearch,
        } = useQuery(queries.searchIncomeWageWithholdingReceipts, payloadSearchParamClear.value, () => ({
            enabled: searchTrigger.value,
            fetchPolicy: "no-cache",
        }));

        watch(resultSearch, (newData) => {
            searchTrigger.value = false;
            dataSource.value = newData.searchIncomeWageWithholdingReceipts;
            viewUrlParam.input.type = newData.searchIncomeWageWithholdingReceipts?.employee?.type ?? viewUrlParam.input.type;
            searchParam.filter.leaved = newData.searchIncomeWageWithholdingReceipts?.leaved ?? searchParam.filter.leaved;
        })
        const onSearch = () => {
            payloadSearchParamClear.value = makeDataClean(searchParam)
            searchTrigger.value = true;
            // refetchSearch()
        }

        // PRINT VIEW URL
        const viewUrlParam: any = reactive({
            companyId: companyId,
            input: { imputedYear: globalYear.value, type: 1, receiptDate: parseInt(dayjs().format('YYYYMMDD')) },
            incomeIds: [],
        })
        const printTrigger = ref<boolean>(false);
        const {
            result: resultPrint,
        } = useQuery(queries.getIncomeWageWithholdingReceiptReportViewUrl, viewUrlParam, () => ({
            enabled: printTrigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(resultPrint, (value) => {
            printTrigger.value = false
            if (value) {
                window.open(value.getIncomeWageWithholdingReceiptReportViewUrl)
            }
        });
        const selectionChanged = (data: any) => {
            dataSelect.value = []
            incomeIds.value = []
            data.selectedRowsData.forEach((item: any) => {
                dataSelect.value.push({
                    senderName: sessionStorage.getItem("username") ?? "",
                    receiverName: item.employee.name,
                    receiverAddress: item.employee.email,
                    employeeId: item.employeeId
                })
                incomeIds.value.push(item.incomeId)
            })
        }
        const actionPrint = (data: any) => {
            viewUrlParam.incomeIds = [data.incomeId]
            printTrigger.value = true
        }
        //SEND MAIL SINGLE
        const onOpenPopupEmailSingle = (data: any) => {
            popupDataEmailSingle.value = {
                companyId: companyId,
                input: {
                    imputedYear: globalYear.value,
                    type: viewUrlParam.input.type,
                    receiptDate: viewUrlParam.input.receiptDate,
                },
                employeeInputs: {
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId
                }
            }
            modalEmailSingle.value = true
        }
        const sendMailGroup = () => {
            if (dataSelect.value.length) {
                popupDataEmailMulti.value = {
                    imputedYear: globalYear.value,
                    type: viewUrlParam.input.type,
                    receiptDate: viewUrlParam.input.receiptDate
                };
                modalEmailMulti.value = true
            } else {
                notification('error', Message.getCommonMessage('404').message)
            }
        }
        const onPrintGroup = () => {
            if (incomeIds.value.length) {
                viewUrlParam.incomeIds = incomeIds.value
                printTrigger.value = true;
            } else {
                notification('error', Message.getCommonMessage('404').message)
            }
        };

        const customTextSummaryInfo = () => {
            let total = 0;
            let continuee = 0;
            let halfWay = 0;
            dataSource.value.map((val: any) => {
                total++;
                if (val.employee.status !== 0) {
                    continuee++;
                } else {
                    halfWay++;
                }
            });
            return `전체 <span>[${filters.formatCurrency(total)}]</span> (계속 <span>[${filters.formatCurrency(continuee)}]</span> / 중도 <span>[${filters.formatCurrency(halfWay)}]</span>)`;
        };
        const customTextSummaryTotalSalary = () => {
            let total = 0;
            dataSource.value.map((val: any) => {
                total = total + val.totalSalary
            });
            return `총급여액합계 <span>[${filters.formatCurrency(total)}]</span>`;
        };
        const customTextSummaryTaxFreeIncome = () => {
            let total = 0;
            dataSource.value.map((val: any) => {
                total = total + val.taxFreeIncome
            });
            return `비과세금액합계 <span>[${filters.formatCurrency(total)}]</span>`;
        };
        const customTextSummaryDecidedTaxAmount = () => {
            let total = 0;
            dataSource.value.map((val: any) => {
                total = total + val.decidedTaxAmount
            });
            return `결정세액합계 <span>[${filters.formatCurrency(total)}]</span>`;
        };
        const customTextSummaryPrePaidTaxAmount = () => {
            let total = 0;
            dataSource.value.map((val: any) => {
                total = total + val.prePaidIncomeTaxAmount
            });
            return `기납부세액 (현)합계 <span>[${filters.formatCurrency(total)}]</span>`;
        };
        const customTextSummaryDeductibleTaxAmount = () => {
            let total = 0;
            dataSource.value.map((val: any) => {
                total = total + val.deductibleIncomeTaxAmount
            });
            return `차감징수세액합계 <span>[${filters.formatCurrency(total)}]</span>`;
        };

        return {
            arrayRadioDivision,
            arrayRadioType,
            formSearch,
            dataSource,
            per_page, move_column, colomn_resize,
            globalYear,
            selectionChanged,
            popupDataEmailSingle,
            popupDataEmailMulti,
            modalEmailSingle,
            modalEmailMulti,
            onOpenPopupEmailSingle,
            sendMailGroup,
            onExporting,
            loadingSearch,
            viewUrlParam,
            actionPrint,
            onPrintGroup,
            searchParam,
            onSearch,
            incomeIds, dataSelect,
            customTextSummaryInfo, customTextSummaryTotalSalary,
            customTextSummaryTaxFreeIncome, customTextSummaryDecidedTaxAmount,
            customTextSummaryPrePaidTaxAmount, customTextSummaryDeductibleTaxAmount,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss"></style>
