<template>
    <action-header title="원천징수이행상황신고서" />
    <div class="page-content">
        <a-spin :spinning="loading" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="reportId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                :column-auto-width="true">
                <DxToolbar>
                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                    <DxItem location="after" template="button-history" css-class="cell-button-add" />
                </DxToolbar>
                <template #button-history>
                    <DxButton>
                        <HistoryOutlined @click="openModalHistory" class="fz-18" />
                    </DxButton>
                </template>
                <template #button-template>
                    <a-tooltip>
                        <template #title>정기(기한후)신고서 새로 작성</template>
                        <div class="custom-grade-cell">
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </div>
                    </a-tooltip>
                </template>
                <DxColumn caption="마감 현황" cell-template="process-status" width="100" />
                <template #process-status="{ data }">
                    <process-status-tooltip v-model:valueStatus="data.data.status" :height="32" :dataRow="data.data"
                        @dataRow="changeStatus" />
                </template>
                <DxColumn caption="귀속 연월" cell-template="imputed" />
                <template #imputed="{ data }">
                    <a-tooltip>
                        <template #title>
                            귀속기간
                            {{
                                data.data.reportType == 1 ?
                                    dayjs(data.data.imputedFinishYearMonth.toString()).format('YYYY-MM') :
                                    dayjs(data.data.imputedStartYearMonth.toString()).format('YYYY-MM') + '~' +
                                    dayjs(data.data.imputedFinishYearMonth.toString()).format('YYYY-MM')
                            }}
                        </template>
                        <div class="custom-grade-cell">
                            <DxButton
                                :text="'귀' + data.data.imputedYear + '-' + (data.data.imputedMonth > 9 ? data.data.imputedMonth : '0' + data.data.imputedMonth)"
                                :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                        </div>
                    </a-tooltip>
                </template>
                <DxColumn caption="지급 연월" cell-template="payment" />
                <template #payment="{ data }">
                    <a-tooltip>
                        <template #title>
                            지급기간
                            {{
                                data.data.reportType == 1 ?
                                    dayjs(data.data.paymentFinishYearMonth.toString()).format('YYYY-MM') :
                                    dayjs(data.data.paymentStartYearMonth.toString()).format('YYYY-MM') + '~' +
                                    dayjs(data.data.paymentFinishYearMonth.toString()).format('YYYY-MM')
                            }}
                        </template>
                        <div class="custom-grade-cell">
                            <DxButton
                                :text="'지' + data.data.paymentYear + '-' + (data.data.paymentMonth > 9 ? data.data.paymentMonth : '0' + data.data.paymentMonth)"
                                :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                        </div>
                    </a-tooltip>
                </template>
                <DxColumn caption="신고 주기" cell-template="reportType" />
                <template #reportType="{ data }">
                    <DxButton :text="getText(data.data.reportType)[0]"
                        :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                </template>
                <DxColumn caption="신고 종류" cell-template="afterDeadline" />
                <template #afterDeadline="{ data }">
                    <DxButton :text="getColorButton(data.data)?.text" :style="getColorButton(data.data)?.style"
                        :height="'33px'" />
                </template>

                <DxColumn data-field="yearEndTaxAdjustment" caption="연말" css-class="cell-center"
                    cell-template="yearEndTaxAdjustment" />
                <template #yearEndTaxAdjustment="{ data }">{{ data.data.yearEndTaxAdjustment ? 'O' : '' }}</template>

                <DxColumn data-field="refund" caption="환급" css-class="cell-center" cell-template="refund" />
                <template #refund="{ data }">{{ data.data.refund ? 'O' : '' }}</template>

                <DxColumn data-field="wageIncomeSimplified" caption="근로 간이" css-class="cell-center"
                    cell-template="wageIncomeSimplified" />
                <template #wageIncomeSimplified="{ data }">{{ data.data.wageIncomeSimplified ? 'O' : '' }}</template>

                <DxColumn data-field="yearEndAdjustmentRetirement" caption="근로 중도" css-class="cell-center"
                    cell-template="yearEndAdjustmentRetirement" />
                <template #yearEndAdjustmentRetirement="{ data }">{{
                    data.data.yearEndAdjustmentRetirement ? 'O' : ''
                }}</template>

                <DxColumn data-field="dailyWageIncome" caption="근로 일용" css-class="cell-center"
                    cell-template="dailyWageIncome" />

                <template #dailyWageIncome="{ data }">{{ data.data.dailyWageIncome ? 'O' : '' }}</template>

                <DxColumn data-field="yearEndAdjustment" caption="근로 연말" css-class="cell-center"
                    cell-template="yearEndAdjustment" />
                <template #yearEndAdjustment="{ data }">{{ data.data.yearEndAdjustment ? 'O' : '' }}</template>

                <DxColumn data-field="retirementIncome" caption="퇴직 소득" css-class="cell-center"
                    cell-template="retirementIncome" />
                <template #retirementIncome="{ data }">{{ data.data.retirementIncome ? 'O' : '' }}</template>

                <DxColumn data-field="businessIncome" caption="사업 소득" css-class="cell-center"
                    cell-template="businessIncome" />
                <template #businessIncome="{ data }">{{ data.data.businessIncome ? 'O' : '' }}</template>

                <DxColumn data-field="extraIncome" caption="기타 소득" css-class="cell-center"
                    cell-template="extraIncome" />
                <template #extraIncome="{ data }">{{ data.data.extraIncome ? 'O' : '' }}</template>

                <DxColumn data-field="totalPayment" caption="총지급액 (A99)" css-class="cell-center" />
                <DxColumn data-field="totalCollectedTaxAmount" caption="납부세액 소득세등 (A99)" css-class="cell-center" />
                <DxColumn data-field="nextMonthRefundTaxAmount" caption="(20) 차월이월 환급세액계" css-class="cell-center" />
                <DxColumn data-field="refundApplicationAmount" caption="(21) 환급 신청액" css-class="cell-center" />

                <DxColumn caption="신고서" cell-template="editIcon" :fixed="true" fixedPosition="right" />
                <template #editIcon="{ data }">
                    <DxButton class="ml-3" icon="edit" @click="editRow(data.data)" />
                </template>
                <DxColumn caption="수정 신고" css-class="cell-center" cell-template="add" :fixed="true" fixedPosition="right"/>
                <template #add="{ data }">
                    <a-tooltip>
                        <template #title>본 신고서에 대한 수정신고서를 작성합니다.</template>
                        <div class="custom-grade-cell">
                            <div style="width: 100%;text-align: center;">[+]</div>
                        </div>
                    </a-tooltip>

                </template>
                <DxColumn :width="80" cell-template="pupop" caption="출력 메일" :fixed="true" fixedPosition="right" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action" style="text-align: center; ">
                        <img @click="openPopupPrint(data.data)" src="@/assets/images/print.svg" alt=""
                            style="width: 28px;" />
                        <img @click="openPopupEmail(data.data)" src="@/assets/images/email.svg" alt=""
                            style="width: 28px; margin-left: 10px;" />
                    </div>
                </template>
            </DxDataGrid>
        </a-spin>
    </div>
    <AddPA210Popup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false"
        :dataPopupAdd="dataPopupAdd" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
        typeHistory="pa-210" />
    <PopupPrint :modalStatus="modalPrintStatus" @closePopup="modalPrintStatus = false" :dataCall="dataPopup" />
    <PopupSendEmail :modalStatus="modalSendEmailStatus" @closePopup="modalSendEmailStatus = false"
        :dataCall="dataPopup" />
    <ReportGrid :modalStatus="reportGridStatus" @closePopup="reportGridStatus = false" :dataReport="dataReport">
    </ReportGrid>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import {
    WageReportType,
    enum2Entries,
} from "@bankda/jangbuda-common";
import dayjs from 'dayjs';
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import notification from "@/utils/notification"
import { useQuery, useMutation } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import ReportGrid from "./components/ReportGrid/ReportGrid.vue";
import AddPA210Popup from "./components/AddPA210Popup.vue";
import PopupPrint from "./components/PopupPrint.vue";
import PopupSendEmail from "./components/PopupSendEmail.vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid"
import { HistoryOutlined } from "@ant-design/icons-vue"
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxToolbar, DxItem, DxButton, HistoryOutlined,
        AddPA210Popup, HistoryPopup, PopupPrint, PopupSendEmail, ReportGrid
    },
    setup() {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const modalAddNewStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const modalPrintStatus = ref<boolean>(false);
        const modalSendEmailStatus = ref<boolean>(false);
        const reportGridStatus = ref<boolean>(false)
        const dataReport: any = ref([])
        const dataSource: any = ref([])
        const dataPopup = ref()
        const dataPopupAdd: any = ref({
            lastMonth: 0,
            reportType: 0,
            paymentType: 0,
            withholdingDutyName: '',
            withholdingDutyPresidentName: '',
            withholdingDutyBizNumber: '',
            withholdingDutyAddress: '',
            withholdingDutyTelephone: '',
            withholdingDutyEmail: '',
            withholdingDutyCollectivePayment: false,
            withholdingDutyTaxForEachBusiness: false,
            reportClassCodes: [],
        })
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });

        // ================GRAPQL====================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getTaxWithholdingStatusReports, originData, () => ({ fetchPolicy: "no-cache" }));
        const { result: resultConfig } = useQuery(queries.getWithholdingConfig, originData,() => ({ fetchPolicy: "no-cache" }));
        const { result: resultCompany } = useQuery(queries.getCompany, {id: companyId},() => ({ fetchPolicy: "no-cache" }));
        const {
            mutate: actionChangeStatus,
            onDone: doneChangeStatus,
            onError: errChangeStatus
        } = useMutation(mutations.changeTaxWithholdingStatusReportStatus);
        doneChangeStatus(() => {
            notification('success', `업부상태 변경되었습니다!`)
            refetchData()
        })
        errChangeStatus((error) => {
            notification('error', error.message)
        })

        // ===================WATCH==================================
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getTaxWithholdingStatusReports;
                value.getTaxWithholdingStatusReports.map((data: any) => {
                    dataPopupAdd.value.reportClassCodes.push(data.reportClassCode)
                })
            }
        });
        watch(resultConfig, (value) => {
            if (value) {
                dataPopupAdd.value.reportType = value.getWithholdingConfig.reportType;
                dataPopupAdd.value.paymentType = value.getWithholdingConfig.paymentType;
                dataPopupAdd.value.withholdingDutyCollectivePayment = value.getWithholdingConfig.collectivePayment;
                dataPopupAdd.value.withholdingDutyTaxForEachBusiness = value.getWithholdingConfig.taxForEachBusiness;
                // dataPopupAdd.value.reportType = 6;
                // dataPopupAdd.value.paymentType = 2;
            }
        });
        watch(resultCompany, (value) => {
            let data = value.getCompany;
            if (data) {
                dataPopupAdd.value.withholdingDutyName = data.name;
                dataPopupAdd.value.withholdingDutyPresidentName = data.presidentName;
                dataPopupAdd.value.withholdingDutyBizNumber = data.bizNumber;
                dataPopupAdd.value.withholdingDutyAddress = data.address;
                dataPopupAdd.value.withholdingDutyTelephone = data.phone;
                dataPopupAdd.value.withholdingDutyEmail = data.extendInfo.president.email;
            }
        });

        // ===================FUNCTION===============================
        const openAddNewModal = () => {
            dataPopupAdd.value.lastMonth = Math.max(...dataSource.value.map((data: any) => data.imputedMonth));
            // dataPopupAdd.value.lastMonth = 12;
            modalAddNewStatus.value = true;
        }
        const openModalHistory = (data: any) => {
            modalHistoryStatus.value = true;
        }
        const openPopupEmail = (data: any) => {
            dataPopup.value = {
                reportId: data.reportId,
                companyId: data.companyId,
                imputedYear: data.imputedYear,
            }
            modalSendEmailStatus.value = true
        }
        const openPopupPrint = (data: any) => {
            dataPopup.value = {
                reportId: data.reportId,
                companyId: data.companyId,
                imputedYear: data.imputedYear,
            }
            modalPrintStatus.value = true;
        }
        const changeStatus = (data: any) => {
            actionChangeStatus({
                "companyId": data.companyId,
                "imputedYear": data.imputedYear,
                "reportId": data.reportId,
                "status": data.status
            })
        }
        const editRow = (value: any) => {
            dataReport.value = [{
                reportId: value.reportId,
                imputedYear: value.imputedYear,
                imputedMonth: value.imputedMonth,
                paymentYear: value.paymentYear,
                paymentMonth: value.paymentMonth,
                reportType: value.reportType,
                paymentType: value.paymentType,
                reportClassCode: value.reportClassCode,
                index: value.index,
                status: value.status,
                refund: value.refund,
                submissionDate: value.submissionDate,
                yearEndTaxAdjustment: value.yearEndTaxAdjustment,
                imputedFinishYearMonth: value.imputedFinishYearMonth,
                paymentFinishYearMonth: value.paymentFinishYearMonth,
                detailId: value.detailId,
            }];
            reportGridStatus.value = true;
        };
        const getText = (data?: any) => {
            let row: any = ''
            enum2Entries(WageReportType).map((value) => {
                if (data == value[1]) {
                    row = value
                }
            });
            return row;
        };
        const getColorButton = (data: any) => {
            if (data.index) {
                return {
                    "text": '수정' + (data.afterDeadline ? '' : data.index),
                    "style": { color: 'white', backgroundColor: 'orange' }
                };
            } else {
                return {
                    "text": data.afterDeadline ? '기한후' : '정기',
                    "style": data.afterDeadline ?
                        { color: 'white', backgroundColor: 'black' } :
                        { color: 'black', backgroundColor: 'white', border: 'black' }
                };
            }
        }

        return {
            globalYear, move_column, colomn_resize, dayjs,
            dataSource, loading,
            getText, getColorButton,
            dataPopupAdd,
            openAddNewModal, modalAddNewStatus,
            openModalHistory, modalHistoryStatus,
            openPopupEmail, modalSendEmailStatus,
            openPopupPrint, modalPrintStatus,
            editRow, reportGridStatus, dataReport,
            dataPopup,
            changeStatus,

        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss">

</style>
