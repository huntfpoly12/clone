<template>
    <action-header title="원천징수이행상황신고서" />
    <div class="page-content">
        <a-spin :spinning="loading" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="reportId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                :column-auto-width="true">
                <DxToolbar>
                    <DxItem location="after" template="button-history" css-class="cell-button-add" />
                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                </DxToolbar>
                <template #button-template>
                    <DxButton icon="plus" @click="openAddNewModal" />
                </template>
                <template #button-history>
                    <DxButton>
                        <HistoryOutlined @click="openModalHistory" class="fz-18" />
                    </DxButton>
                </template>
                <DxColumn caption="마감 현황" cell-template="process-status" width="100" />
                <template #process-status="{ data }">
                    <process-status-tooltip v-model:valueStatus="data.data.status" :height="32"
                        :dataRow="data.data" @dataRow="changeStatus" />
                </template>
                <DxColumn caption="귀속 연월" cell-template="imputed" />
                <template #imputed="{ data }">
                    <DxButton
                        :text="'귀' + data.data.imputedYear + '-' + (data.data.imputedMonth > 9 ? data.data.imputedMonth : '0' + data.data.imputedMonth)"
                        :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                </template>
                <DxColumn caption="지급 연월" cell-template="payment" />
                <template #payment="{ data }">
                    <DxButton
                        :text="'지' + data.data.paymentYear + '-' + (data.data.paymentMonth > 9 ? data.data.paymentMonth : '0' + data.data.paymentMonth)"
                        :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                </template>
                <DxColumn caption="신고 주기" cell-template="reportType" />
                <template #reportType="{ data }">
                    <DxButton
                    :text="getText(data.data.reportType)[0]"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                </template>
                <DxColumn caption="신고 종류" cell-template="afterDeadline" />
                <template #afterDeadline="{ data }">
                    <DxButton v-if="data.data.index" :text="'수정' + (data.data.afterDeadline ? '' : data.data.index)"
                        :style="{ color: 'white', backgroundColor: 'orange' }" :height="'33px'" />
                    <DxButton v-else :text="data.data.afterDeadline ? '기한후' : '정기'"
                        :style="data.data.afterDeadline ? { color: 'white', backgroundColor: 'black' } : { color: 'black', backgroundColor: 'white', border: 'black' }"
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

                <DxColumn caption="신고서" cell-template="editIcon" />
                <template #editIcon="{ data }">
                    <DxButton class="ml-3" icon="edit" @click="editRow(data.data)" />
                </template>
                <DxColumn caption="수정 신고" css-class="cell-center" cell-template="add" />
                <template #add="{ data }">
                    <div style="width: 100%;text-align: center;" >[+]</div>
                </template>
                <DxColumn :width="80" cell-template="pupop" caption="출력 메일" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action" style="text-align: center; ">
                        <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                            style="width: 28px;" />
                        <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                            style="width: 28px; margin-left: 10px;" />
                    </div>
                </template>
            </DxDataGrid>
        </a-spin>
    </div>
    <AddPA210Popup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false"/>
</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive, watch } from "vue";
import {
    WageReportType,
    enum2Entries,
} from "@bankda/jangbuda-common";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import AddPA210Popup from "./components/AddPA210Popup.vue"
import { DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxTotalItem } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import queries from "@/graphql/queries/PA/PA2/PA210/index";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxTotalItem, EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined,
        AddPA210Popup,
    },
    setup() {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const modalAddNewStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const modalEmailSingle = ref<boolean>(false);
        const triggerPrint = ref<boolean>(false);
        const dataSource: any = ref({})

        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        // ================GRAPQL====================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getTaxWithholdingStatusReports, originData, () => ({
            // enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        // ===================WATCH==================================
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getTaxWithholdingStatusReports;
                // trigger.value = false;
            }
        });

        // ===================FUNCTION===============================
        const openAddNewModal = () => {
            // count.value++
            modalAddNewStatus.value = true;
        }
        const openModalHistory = (data: any) => {
            // idRowEdit.value = data.data.id
            modalHistoryStatus.value = true;
            // popupData.value = data;
        }
        const actionOpenPopupEmailSingle = (data: any) => {
            // popupDataEmailSingle.value = {
            //     companyId: companyId,
            //     input: {
            //         imputedYear: globalYear,
            //         type: valueDefaultIncomeBusiness.value.input.type,
            //         receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
            //     },
            //     employeeInputs: {
            //         senderName: sessionStorage.getItem("username"),
            //         receiverName: data.employee.name,
            //         receiverAddress: data.employee.email,
            //         employeeId: data.employee.employeeId,
            //         incomeTypeCode: data.employee.incomeTypeCode
            //     }
            // }
            modalEmailSingle.value = true
        }
        const actionPrint = (data: any) => {
            // valueDefaultIncomeBusiness.value.employeeKeys.employeeId = data.employee.employeeId
            // valueDefaultIncomeBusiness.value.employeeKeys.incomeTypeCode = data.employee.incomeTypeCode
            triggerPrint.value = true;
        }
        const changeStatus = (data: any) => {
            let dataChangeStatus = {
                "companyId": data.companyId,
                "imputedYear": data.imputedYear,
                "reportId": data.reportId,
                "status": data.status
            }
            // actionChangeStatus(dataChangeStatus)
        }
        const editRow = (value: any) => {
            // if (props.dataRows.length == 1) {
            //     modalEdit.value = true;
            //     popupDataEdit.value = props.dataRows[0]

            // } else {
            //     notification('error', `항목을 하나 이상 선택해야합니다`)
            // }
        };
        var getText = (data?: any) => {
            let row:any = ''
            enum2Entries(WageReportType).map((value) => {
                if (data == value[1]) {
                    row = value
                }
            });
            return row;
        };

        return {
            globalYear, move_column, colomn_resize,
            dataSource, loading,
            getText,

            openAddNewModal, modalAddNewStatus,
            openModalHistory,
            actionOpenPopupEmailSingle,
            actionPrint,
            changeStatus,
            editRow,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss">

</style>
