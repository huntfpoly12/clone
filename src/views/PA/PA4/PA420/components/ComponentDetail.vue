<template>
    <a-col :span="24">
        <div class="header-detail-main">
            <div class="table-detail-left d-flex-center">
                <div class="text-box-1">귀 {{ dataTableDetail.processKey.imputedYear }}-{{
                    dataTableDetail.processKey.imputedMonth
                }}</div>
                <div class="text-box-2">지 {{ dataTableDetail.processKey.paymentYear }}-{{
                    dataTableDetail.processKey.paymentMonth
                }}</div>
                <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm" />
            </div>
            <div class="table-detail-right">
                <DxButton @click="deleteItem">
                    <DeleteOutlined style="font-size: 18px;" />
                </DxButton>
                <DxButton icon="plus" @click="addRow" />
                <DxButton @click="onItemClick('history')">
                    <a-tooltip placement="left">
                        <template #title>근로소득자료 변경이력</template>
                        <div class="text-center">
                            <HistoryOutlined style="font-size: 16px" />
                        </div>
                    </a-tooltip>
                </DxButton>
                <DxButton @click="onItemClick('historyEdit')">
                    <a-tooltip placement="left">
                        <template #title>근로소득 마감상태 변경이력</template>
                        <div class="text-center">
                            <img src="@/assets/images/icon_status_history.png" alt=""
                                style="width: 16px; height: 16px;" />
                        </div>
                    </a-tooltip>
                </DxButton>
                <DxButton @click="editPaymentDate" class="custom-button-checkbox">
                    <div class="d-flex-center">
                        <checkbox-basic  :valueCheckbox="true" disabled="true" />
                        <span class="fz-12 pl-5">지급일변경</span>
                    </div>
                </DxButton>
            </div>
        </div>
    </a-col>
    <a-col :span="24">
        <a-spin :spinning="(loadingTableDetail)" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                :show-borders="true" key-expr="incomeId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always"/>
                <DxSelection mode="multiple" :fixed="true" />
                <DxColumn caption="사원" cell-template="tag" width="300px" />
                <DxColumn caption="구분" cell-template="retirementType" data-type="string" />
                <DxColumn caption="입사일 (정산시작일)" cell-template="joinedAt" />
                <DxColumn caption="퇴사일 (정산종료일)" cell-template="leavedAt" />
                <DxColumn caption="퇴직급여" data-field="retirementBenefits" data-type="string" format="#,###"
                    width="120px" />
                <DxColumn width="150px" caption="비과세 퇴직급여" data-field="nonTaxableRetirementBenefits" data-type="string"
                    format="#,###" />
                <DxColumn caption="과세대상 퇴직급여" width="160px" data-field="taxableRetirementBenefits" data-type="string"
                    format="#,###" />
                <DxColumn caption="공제" width="100px" data-field="totalDeduction" data-type="string" format="#,###" />
                <DxColumn caption="차인지급액" width="130px" data-field="employee.totalPay" data-type="string"
                    format="#,###" />
                <DxColumn caption="비고" cell-template="note" data-type="string" width="250px" />
                <DxColumn caption="지급일" data-field="paymentDay" data-type="string" />
                <DxColumn caption="" cell-template="action" width="50px" />
                <template #joinedAt="{ data }">
                    <div>{{ $filters.formatDate(data.data.employee.joinedAt) }}</div>
                </template>
                <template #leavedAt="{ data }">
                    <div>{{ $filters.formatDate(data.data.employee.leavedAt) }}</div>
                </template>
                <template #retirementType="{ data }">
                    <div v-if="data.data.retirementType == 1" class="retirementType-1">퇴직</div>
                    <div v-if="data.data.retirementType == 2" class="retirementType-2">중간</div>
                </template>
                <template #tag="{ data }" class="custom-action">
                    <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                        :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                        :foreigner="data.data.employee.foreigner" :checkStatus="false"
                        :forDailyUse="data.data.employeeType == 10 ? true : false" />
                </template>
                <template #note="{ data }" class="custom-action">
                    <div>
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
                    </div>
                </template>
                <template #action="{ data }" class="custom-action">
                    <div class="wf-100 text-center">
                        <EditOutlined class="fz-18" @click="actionEditRow(data.data.incomeId)" />
                    </div>
                </template>
                <DxSummary v-if="dataSourceDetail.length > 0">
                    <DxTotalItem column="사원" :customize-text="customTextSummaryInfo" />
                    <DxTotalItem class="custom-sumary" column="retirementBenefits" summary-type="sum"
                        display-format="퇴직급여합계: {0}" value-format="#,###" />
                    <DxTotalItem class="custom-sumary" column="nonTaxableRetirementBenefits" summary-type="sum"
                        display-format="비과세퇴직급여합계: {0}" value-format="#,###" />
                    <DxTotalItem class="custom-sumary" column="taxableRetirementBenefits" summary-type="sum"
                        display-format="과세대상퇴직급여합계: {0}" value-format="#,###" />
                    <DxTotalItem class="custom-sumary" column="totalDeduction" summary-type="sum"
                        display-format="공제합계: {0}" value-format="#,###" />
                    <DxTotalItem class="custom-sumary" column="차인지급액" summary-type="sum" display-format="차인지급액합계: {0}"
                        value-format="#,###" />
                </DxSummary>
            </DxDataGrid>
        </a-spin>
    </a-col>
    <!--============================================= Components ============================================-->
    <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-420" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
        :data="dataTableDetail.processKey" title="변경이력" typeHistory="pa-status-420" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
    <AddPopup :modalStatus="modalAdd" @closePopup="actionDeleteSuccess" :data="popupDataDelete" :key="resetFormNum"
        :processKey="dataTableDetail.processKey" />
    <UpdatePopup :modalStatus="modalUpdate" @closePopup="actionClosePopup" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" :keyRowIndex="keyDetailRow" @updateSuccess="actionDeleteSuccess" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { dataActionUtils } from "../utils/index";
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import type { DropdownProps } from "ant-design-vue";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPaymentDayPopup.vue"
import AddPopup from "./AddPopup.vue"
import UpdatePopup from "./UpdatePopup.vue"
import filters from "@/helpers/filters";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import { companyId } from '@/helpers/commonFunction';
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxDropDownButton, DxGrouping, DxItem, DxButton, DxMasterDetail, DxSummary, DxTotalItem,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
        DeletePopup, EditPopup, AddPopup, UpdatePopup
    },
    props: {
        dataCallTableDetail: {
            type: Object
        },
        statusButton: {
            type: Number
        },
        actionSave: {
            type: Number
        }
    },
    setup(props, { emit }) {
        let statusButton = ref(props.statusButton)
        let dataSourceDetail = ref([]);
        let arrayEmploySelect: any = ref([])
        let placements = ["bottomRight"] as DropdownProps["placement"][];
        const keyDetailRow = ref()
        const modalEdit = ref<boolean>(false)
        const popupDataDelete: any = ref([])
        const modalDelete = ref<boolean>(false)
        const triggerDetail = ref<boolean>(true);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const modalHistory = ref<boolean>(false)
        const modalAdd = ref(false)
        const modalUpdate = ref(false)
        const modalHistoryStatus = ref<boolean>(false)
        const resetFormNum = ref(1);
        let dataAction: any = reactive({
            ...dataActionUtils
        })
        let dataTableDetail: any = ref({
            ...props.dataCallTableDetail
        })
        // ================GRAPQL============================================== 
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorTableDetail, onResult: resTableDetail } = useQuery(queries.getIncomeRetirements, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resTableDetail(res => {
            dataSourceDetail.value = res.data.getIncomeRetirements
            triggerDetail.value = false
        })
        errorTableDetail(res => {
            notification('error', res.message)
        })
        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.changeIncomeProcessRetirementStatus)
        onError(e => {
            notification('error', e.message)
        })
        onDone(e => {
            actionDeleteSuccess()
            notification('success', `업데이트 완료!`)
        })
        // ================WATCHING============================================
        watch(() => props.dataCallTableDetail, (newValue) => {
            dataTableDetail.value = newValue
            triggerDetail.value = true
            refetchTableDetail()
        }, { deep: true })
        watch(() => dataTableDetail, (newValue) => {
        }, { deep: true })
        watch(() => props.statusButton, (newValue) => {
            statusButton.value = newValue
        })
        // ================FUNCTION============================================   
        const addRow = () => {
            modalAdd.value = true
        }
        const changeIncomeTypeCode = (res: string) => {
            dataAction.input.incomeTypeCode = res
        }
        const selectionChanged = (event: any) => {
            popupDataDelete.value = event.selectedRowKeys
        }
        const deleteItem = () => {
            if (popupDataDelete.value.length > 0) {
                modalDelete.value = true;
            }
        };
        const actionDeleteSuccess = () => {
            resetFormNum.value++
            modalDelete.value = false
            modalEdit.value = false
            triggerDetail.value = true
            refetchTableDetail()
            emit('createdDone', true)
            modalAdd.value = false
            modalUpdate.value = false
        }
        const actionClosePopup = () => {
            modalUpdate.value = false
        }
        const onItemClick = (key: String) => {
            if (key == 'history') {
                modalHistory.value = true
            } else {
                modalHistoryStatus.value = true
            }
        }
        const editPaymentDate = () => {
            if (popupDataDelete.value.length > 0) {
                modalEdit.value = true
            }
        }
        const customTextSummary = () => {
            let total = 0
            dataSourceDetail.value.map((val: any) => {
                total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
            })
            return '공제합계: ' + filters.formatCurrency(total)
        }
        const customTextSummaryInfo = () => {
            let total1 = 0
            let total2 = 0
            dataSourceDetail.value.map((val: any) => {
                if (val.retirementType == 1)
                    total1++
                else
                    total2++
            })
            return '사원수: ' + dataSourceDetail.value.length + " (퇴직:" + total1 + ", 중간:" + total2 + ")"
        }
        const actionEditRow = (data: any) => {
            modalUpdate.value = true
            keyDetailRow.value = data
        }
        const statusComfirm = () => {
            mutate({
                companyId: companyId,
                processKey: dataTableDetail.value.processKey,
                status: statusButton.value
            })
        }
        return {
            keyDetailRow,
            modalAdd, modalUpdate,
            arrayEmploySelect,
            statusButton,
            dataTableDetail,
            dataAction,
            rowTable, per_page, move_column, colomn_resize,
            loadingTableDetail,
            dataSourceDetail,
            placements,
            modalDelete,
            popupDataDelete,
            modalHistory,
            modalHistoryStatus,
            modalEdit,
            statusComfirm,
            addRow,
            deleteItem,
            changeIncomeTypeCode,
            selectionChanged,
            actionDeleteSuccess,
            onItemClick,
            editPaymentDate,
            customTextSummary, customTextSummaryInfo,
            actionEditRow,
            actionClosePopup,
            refetchTableDetail,
            resetFormNum,
        }
    }
});
</script>
<style scoped src="../style/style.scss" >

</style>
