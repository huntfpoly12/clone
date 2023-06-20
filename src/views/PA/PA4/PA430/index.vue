<template>
    <a-spin :spinning="loading || loadingReport" size="large">
        <action-header title="거주자의 사업소득원천징수영수증 " @actionSearch="searching" :buttonSearch="true" />
        <div id="pa-430">
            <div class="search-form">
                <a-row :gutter="20">
                    <a-col>
                        <div class="custom-flex">
                            <label class="lable-item">귀속기간: </label>
                            <div style="width: 70px;" class="label-belonging">귀속</div>
                        </div>
                    </a-col>
                    <a-col>
                        <div class="custom-flex">
                            <range-month-time-box v-model:valueDate="rangeDate" :minDate="minDate" :maxDate="maxDate"
                                placeholder="시작월 > 종료월" />
                        </div>
                    </a-col>
                    <a-col>
                        <div class="selectRatio custom-flex">
                            <strong class="lable-item">구분 :</strong>
                            <radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="originData.filter.type"
                                :layoutCustom="'horizontal'" />
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <DxDataGrid noDataText="내역이 없습니다" id="gridContainerPA430" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxPaging :enabled="false" />
                    <DxSelection mode="multiple" />
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
                                <radio-group :arrayValue="arrayRadioType" :layoutCustom="'horizontal'"
                                    v-model:valueRadioCheck="dataInputReport.input.type" />
                                <a-tooltip title="본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.">
                                    <img src="@/assets/images/iconInfo.png" class="img-info" />
                                </a-tooltip>
                            </div>
                        </a-form-item>
                    </template>
                    <template #box-search-right>
                        <div class="created-date">
                            <label class="lable-item">영수일 :</label>
                            <date-time-box width="150px" v-model:valueDate="dataInputReport.input.receiptDate" />
                        </div>
                    </template>
                    <template #send-group-mail>
                        <DxButton @click="actionOpenPopupEmailMulti" class="bt-email-group">
                            <img src="@/assets/images/emailGroup.png" alt="" style="width: 28px;" />
                        </DxButton>
                    </template>
                    <template #send-group-print>
                        <DxButton @click="onPrintGroup" class="bt-print-group">
                            <a-tooltip title="출력 / 저장" placement="topLeft">
                                <img src="@/assets/images/printGroup.png" alt="" style="width: 28px;" />
                            </a-tooltip>
                        </DxButton>
                    </template>
                    <DxColumn :width="230" caption="사원" css-class="cell-left" cell-template="employee-info"
                        data-field="employee.name" />
                    <template #employee-info="{ data }">
                        <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                            :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                            :foreigner="data.data.employee.foreigner" :checkStatus="false"
                            :forDailyUse="data.data.employeeType == 20 ? true : false" />
                    </template>
                    <DxColumn width="55" data-field="retirementType" caption="구분 " cell-template="grid-cell"
                        css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)?.name">{{
                            getColorTag(data.value)?.tag_name
                        }}</a-tag>
                    </template>
                    <DxColumn caption="입사일 (정산시작일) " data-field="settlementStartDate" cell-template="settlementStartDate"
                        css-class="cell-center" :width="140" />
                    <template #settlementStartDate="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn caption="퇴사일 (정산종료일) " data-field="settlementFinishDate" cell-template="settlementFinishDate"
                        css-class="cell-center" :width="140" />
                    <template #settlementFinishDate="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn width="70" caption="귀속연월" css-class="cell-center" data-field="imputedMonth"
                        cell-template="inputedYearMonth" />
                    <template #inputedYearMonth="{ data }">
                        {{ paYear }}-{{ $filters.formatMonth(data.data.imputedMonth) }}
                    </template>
                    <DxColumn width="70" caption="지급연월" css-class="cell-center" data-field="paymentMonth"
                        cell-template="paymentYearMonth" />
                    <template #paymentYearMonth="{ data }">
                        {{ data.data.paymentYear }}-{{ $filters.formatMonth(data.data.paymentMonth) }}
                    </template>
                    <DxColumn caption="퇴직급여" data-field="retirementBenefits" width="100" format="#,###" alignment="right" />
                    <DxColumn caption="비과세 퇴직급여" data-field="nonTaxableRetirementBenefits" width="110" format="#,###"
                        alignment="right" />
                    <DxColumn caption="과세대상 퇴직급여" data-field="taxableRetirementBenefits" width="123" format="#,###"
                        alignment="right" />
                    <DxColumn caption="공제" data-field="totalDeduction" cell-template="total-deduction" width="90"
                        format="#,###" alignment="right" />
                    <template #total-deduction="{ data }">
                        <a-tooltip placement="top">
                            <template #title>소득세 {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} / 지방소득세 {{
                                $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}</template>
                            <div>{{ $filters.formatCurrency(data.data.totalDeduction) }}</div>
                        </a-tooltip>
                    </template>
                    <DxColumn caption="차인지급액" data-field="actualPayment" width="70" format="#,###" alignment="right" />
                    <DxColumn caption="비고" css-class="cell-left" cell-template="note"
                        data-field="employee.nationalPensionDeduction" />
                    <template #note="{ data }">
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
                    </template>
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }">
                        <div style="text-align: center;">
                            <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px;" />
                            <a-tooltip title="출력 / 저장" placement="topLeft">
                                <img src="@/assets/images/print.svg" alt="" style="width: 25px;"
                                    @click="actionPrint(data.data)" />
                            </a-tooltip>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="custom-smmary">
                    <!-- <div style="margin-left: 70px;"> -->
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                            <div v-html="employeeType1()"></div>
                        </div>
                    <!-- </div>
                    <div style="margin-left: 50px;"> -->
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                            v-html="customNonTaxableRetirementBenefits()">
                        </div>
                    <!-- </div>
                    <div style="margin-left: 50px;"> -->
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                            v-html="customTaxableRetirementBenefits()">
                        </div>
                    <!-- </div>
                    <div style=" margin-left: 50px;"> -->
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTotalDeduction()">
                        </div>
                    <!-- </div>
                    <div style=" margin-left: 50px;"> -->
                        <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customActualPayment()">
                        </div>
                    <!-- </div> -->
                </div>
                <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
                    :data="popupDataEmailSingle" />
                <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false"
                    :data="popupDataEmailMulti" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
import DxButton from "devextreme-vue/button";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxSearchPanel,
    DxToolbar, DxScrolling,
    DxItem, DxSummary, DxTotalItem, DxExport
} from "devextreme-vue/data-grid";
import { Message } from '@/configs/enum';
import {
    companyId,
    userId,
} from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA430/index";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
import EmailMultiPopup from "./components/EmailMultiPopup.vue";
import dayjs, { Dayjs } from 'dayjs';
import filters from "@/helpers/filters";
export default defineComponent({
    components: {
        DxExport,
        DxButton, DxDataGrid, DxScrolling, DxColumn, DxPaging, DxSelection, DxSearchPanel, DxToolbar, DxItem, DxSummary, DxTotalItem, EmailSinglePopup, EmailMultiPopup
    },
    setup() {
        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})
        const dataSelect = ref<any>([])
        const incomeIds = ref<any>([])
        const store = useStore();
        const mode2 = ref<any>(['month', 'month']);
        const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
        const trigger = ref<boolean>(true);
        const triggerReport = ref<boolean>(false);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)
        const emplRetirementType1 = ref(0)
        const emplRetirementType2 = ref(0)
        const totalEmployee = ref(0)
        // const valSwitch = ref(false)
        const dataSource = ref([]);
        const arrayRadioCheck = ref([
            { id: null, text: "전체" },
            { id: 1, text: "퇴직소득" },
            { id: 2, text: "중간정산" },
        ]);
        const arrayRadioType = [
            { id: 1, text: "소득자보관용" },
            { id: 2, text: "발행자 보관용" },
            { id: 3, text: "발행자 보고용" },
        ]
        const minDate = ref(dayjs(`${paYear.value}-01-01`).startOf('year'));
        const maxDate = ref(dayjs(`${paYear.value}-12-31`).endOf('year'));
        const valueRadioBox = ref(0);
        const rangeDate = ref([
            { "month": 0, "year": paYear.value },
            { "month": 11, "year": paYear.value }
        ]);


        const getColorTag = (data: any) => {
            if (data == 1) {
                return { name: "#C73F09", tag_name: "퇴직" };
            } else if (data == 2) {
                return { name: "#77933C", tag_name: "중간" };
            }
        };
        const originData = ref({
            companyId: companyId,
            filter: {
                imputedYear: paYear.value,
                startMonth: rangeDate.value[0].month + 1,
                finishMonth: rangeDate.value[1].month + 1,
                type: null,
            },
        });
        const dataInputReport = reactive({
            companyId: companyId,
            input: {
                imputedYear: paYear.value,
                type: 1,
                receiptDate: filters.formatDateToInterger(dayjs())
            },
            incomeIds: Array()
        })
        // watch(paYear, (newValue) => {
        //     rangeDate.value[0].year = newValue
        //     rangeDate.value[1].year = newValue
        //     minDate.value = dayjs(`${newValue}-01-01`).startOf('year');
        //     maxDate.value = dayjs(`${newValue}-12-31`).endOf('year');
        //     searching();
        // })

        // watch(valSwitch, (newValue) => {
        //     dataInputReport.input.type = newValue ? 2 : 3;
        // })
        const {
            refetch: refetchData,
            onError,
            result,
            loading,
        } = useQuery(queries.searchIncomeRetirementWithholdingReceipts, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        onError(res => {
            notification('error', res.message)
        })

        const actionOpenPopupEmailSingle = (data: any) => {
            popupDataEmailSingle.value = {
                companyId: companyId,
                input: {
                    imputedYear: paYear.value,
                    type: dataInputReport.input.type,
                    receiptDate: dataInputReport.input.receiptDate,
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
        // const onCloseEmailSingleModal = () => {
        //     modalEmailSingle.value = false
        // }
        // const onCloseEmailMultiModal = () => {
        //     modalEmailMulti.value = false
        // }
        /**
         * action send multi email
         */
        const actionOpenPopupEmailMulti = () => {
            if (dataSelect.value.length) {
                popupDataEmailMulti.value = {
                    companyId: companyId,
                    input: {
                        imputedYear: paYear.value,
                        type: dataInputReport.input.type,
                        receiptDate: dataInputReport.input.receiptDate,
                    },
                    employeeInputs: dataSelect.value
                }
                modalEmailMulti.value = true
            } else {
                notification('error', Message.getMessage('COMMON', '404').message)
            }
        }

        /**
         * action send multi print
         */
        const onPrintGroup = () => {
            if (incomeIds.value.length) {
                dataInputReport.incomeIds = incomeIds.value
                triggerReport.value = true;
                // refetchReport()
            } else {
                notification('error', Message.getMessage('COMMON', '404').message)
            }
        };

        /**
         * action print report
         * @param data
         */
        const {
            refetch: refetchReport,
            result: resultReport,
            onError: errorReport,
            loading: loadingReport,
        } = useQuery(queries.getIncomeRetirementWithholdingReceiptReportViewUrl, dataInputReport, () => ({
            enabled: triggerReport.value,
            fetchPolicy: "no-cache",
        }));
        watch(resultReport, (newValue) => {
            window.open(newValue.getIncomeRetirementWithholdingReceiptReportViewUrl);
            triggerReport.value = false;
        }, { deep: true });
        errorReport(res => {
            triggerReport.value = false
            notification('error', res.message)
        })
        const actionPrint = (data: any) => {
            dataInputReport.incomeIds = [data.incomeId]
            triggerReport.value = true;
            // refetchReport()
        }

        const selectionChanged = (data: any) => {
            dataSelect.value = []
            incomeIds.value = []
            data.selectedRowKeys.forEach((data: any) => {
                dataSelect.value.push({
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    // incomeTypeCode: data.employee.incomeTypeCode
                })
                incomeIds.value.push(data.incomeId)
            })
        }

        watch(result, (value) => {
            trigger.value = false;
            if (value) {
                value.searchIncomeRetirementWithholdingReceipts
                dataSource.value = value.searchIncomeRetirementWithholdingReceipts;
                totalEmployee.value = value.searchIncomeRetirementWithholdingReceipts.length
                emplRetirementType1.value = value.searchIncomeRetirementWithholdingReceipts.filter((item: any) => item.retirementType == 1).length;
                emplRetirementType2.value = value.searchIncomeRetirementWithholdingReceipts.filter((item: any) => item.retirementType == 2).length;

            }
        });

        const searching = () => {
            originData.value.filter.startMonth = rangeDate.value[0].month + 1;
            originData.value.filter.finishMonth = rangeDate.value[1].month + 1
            trigger.value = true;
            // refetchData();
        };

        // const sendMail = (sendType: string) => {
        //     alert(sendType);
        // }

        const handleChange = (val: [Dayjs, Dayjs]) => {
            // rangeDate.value = val;
        };

        const handlePanelChange2 = (val: [Dayjs, Dayjs], mode: any[]) => {
            // originData.value.filter.startMonth = val[0].month() + 1;
            // originData.value.filter.finishMonth = val[1].month() + 1
            // rangeDate.value = val;
            // mode2.value = [
            //     mode[0] === 'date' ? 'month' : mode[0],
            //     mode[1] === 'date' ? 'month' : mode[1],
            // ];
        };

        const employeeType1 = () => {
            return `사원수 <span>[${totalEmployee.value}]</span> (퇴직 <span>[${emplRetirementType1.value}]</span>, 중간 <span>[${emplRetirementType2.value}]</span>)`
        }
        const customNonTaxableRetirementBenefits = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.nonTaxableRetirementBenefits
            })
            return `비과세퇴직급여합계 <span>[${filters.formatCurrency(sum)}]</span>`;
        }
        const customTaxableRetirementBenefits = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.taxableRetirementBenefits
            })
            return `과세대상퇴직급여합계 <span>[${filters.formatCurrency(sum)}]</span>`;
        }
        const customTotalDeduction = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.totalDeduction
            })
            return `공제합계 <span>[${filters.formatCurrency(sum)}]</span> `;
        }
        const customActualPayment = () => {
            let sum = 0
            dataSource.value?.map((row: any) => {
                sum += row.actualPayment
            })
            return `차인지급액합계 <span>[${filters.formatCurrency(sum)}]</span>`;
        }
        return {
            employeeType1,
            locale, handleChange, handlePanelChange2, mode2, dataInputReport,
            loading, loadingReport,
            actionPrint, onPrintGroup,
            popupDataEmailSingle,
            popupDataEmailMulti,
            actionOpenPopupEmailSingle,
            actionOpenPopupEmailMulti,
            searching,
            paYear,
            dataSource,
            // sendMail,
            move_column,
            colomn_resize,
            modalEmailSingle,
            modalEmailMulti,
            // onCloseEmailSingleModal,
            // onCloseEmailMultiModal,
            selectionChanged,
            rangeDate,
            valueRadioBox,
            arrayRadioCheck,
            arrayRadioType,
            getColorTag,
            originData,
            minDate, maxDate,
            customNonTaxableRetirementBenefits, customTaxableRetirementBenefits, customTotalDeduction, customActualPayment,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss" ></style>

