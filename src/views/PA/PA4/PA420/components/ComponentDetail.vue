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
                <process-status v-model:valueStatus="statusButton" />
            </div>
            <div class="table-detail-right">
                <DxButton @click="deleteItem">
                    <DeleteOutlined style="font-size: 18px;" />
                </DxButton>
                <DxButton icon="plus" @click="addRow" />
                <DxButton @click="editPaymentDate">
                    <EditOutlined style="font-size: 18px;" />
                </DxButton>
                <template v-for="(placement, index) in placements" :key="placement">
                    <a-dropdown :placement="placement" class="ml-5">
                        <a-button class="button-open-tab">선택</a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <div class="custom-select-tab">
                                        <a href="/dashboard/pa-610" style="color: white;">
                                            기타소득자등록
                                        </a>
                                    </div>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-tooltip placement="left">
                                        <template #title>사업소득자료 변경이력</template>
                                        <div style="text-align: center;" @click="onItemClick('history')">
                                            <HistoryOutlined style="font-size: 20px" />
                                        </div>
                                    </a-tooltip>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-tooltip placement="left">
                                        <template #title>사업소득 마감상태 변경이력</template>
                                        <div style="text-align: center;" @click="onItemClick('historyEdit')">
                                            <img src="@/assets/images/icon_status_history.png" alt=""
                                                style="width: 20px; height: 20px;" />
                                        </div>
                                    </a-tooltip>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </div>
        </div>
    </a-col>

    <a-col :span="14" class="custom-layout ">
        <a-spin :spinning="(loadingTableDetail || loadingCreated || loadingEdit)" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                :show-borders="true" key-expr="incomeId" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEditFuc"
                :focused-row-enabled="true" @selection-changed="selectionChanged">
                <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                <template #tag="{ data }" class="custom-action">
                    <income-type :typeCode="data.data.incomeTypeCode" :typeName="(data.data.employee.name)"
                        :incomeTypeName="data.data.employee.incomeTypeName" />
                </template>
                <DxColumn width="80px" caption="지급일" data-field="paymentDay" data-type="string"
                    :format="amountFormat" />
                <DxColumn caption="지급액" width="100px" data-field="paymentAmount" data-type="string"
                    :format="amountFormat" />
                <DxColumn caption="세율" width="80px" data-field="taxRate" data-type="string" :format="amountFormat" />
                <DxColumn caption="공제" cell-template="income-tax" width="100px" />
                <template #income-tax="{ data }" class="custom-action">
                    {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax)
                    }}
                </template>
                <DxColumn caption="차인지급액" width="120px" data-field="actualPayment" data-type="string"
                    :format="amountFormat" />
                <DxSummary>
                    <DxTotalItem column="기타소득자 [소득구분]" summary-type="count" display-format="사업소득자[소득구분]수:{0}" />
                    <DxTotalItem class="custom-sumary" column="지급액" summary-type="sum" display-format="지급액합계: {0}"
                        value-format="#,###" />
                    <DxTotalItem class="custom-sumary" column="공제" :customize-text="customTextSummary" />
                    <DxTotalItem class="custom-sumary" column="actualPayment" summary-type="sum"
                        display-format="차인지급액합계: {0}" value-format="#,###" />
                </DxSummary>
            </DxDataGrid>
        </a-spin>
    </a-col>
    <a-col :span="10" class="custom-layout form-action">
        <a-spin :spinning="(loadingTableDetail || loadingCreated || loadingDetailEdit || loadingEdit)" size="large">
            <a-form-item label="사업소득자" label-align="right">
                <employ-type-select :disabled="disabledInput" :arrayValue="arrayEmploySelect"
                    v-model:valueEmploy="dataAction.input.employeeId" width="350px" :required="true"
                    @incomeTypeCode="changeIncomeTypeCode" />
            </a-form-item>
            <div class="header-text-1 mb-10">소득내역</div>
            <div class="income-details">
                <a-row>
                    <a-col :span="13">
                        <a-form-item label="귀속/지급연월" label-align="right">
                            <div class="d-flex-center">
                                <div class="month-custom-1 d-flex-center">
                                    귀 <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" />
                                </div>
                                <div class="month-custom-2 d-flex-center">
                                    지 <month-picker-box v-model:valueDate="month2" class="ml-5" width="65px" />
                                </div>
                            </div>
                        </a-form-item>
                        <a-form-item label="지급일" label-align="right">
                            <number-box :max="31" :min="1" width="150px" class="mr-5"
                                v-model:valueInput="dataAction.input.paymentDay" :disabled="disabledInput" />
                        </a-form-item>
                        <a-form-item label="지급액" label-align="right">
                            <number-box-money min="0" width="150px" class="mr-5"
                                v-model:valueInput="dataAction.input.paymentAmount" />
                        </a-form-item>
                        <a-form-item label="세율" label-align="right">
                            3%
                        </a-form-item>
                    </a-col>
                    <a-col :span="11">
                        <div class="header-text-2 mb-10">공제합계 <b>{{
                                ($filters.formatCurrency(dataAction.input.withholdingIncomeTax +
                                    dataAction.input.withholdingLocalIncomeTax))
                        }}</b>원</div>
                        <div>
                            <a-form-item label="소득세(공제)" label-align="right">
                                <div class="d-flex-center">
                                    <number-box-money min="0" width="150px" class="mr-5"
                                        v-model:valueInput="dataAction.input.withholdingIncomeTax" /> 원
                                </div>
                            </a-form-item>
                            <a-form-item label="지방소득세(공제)" label-align="right">
                                <div class="d-flex-center">
                                    <number-box-money min="0" width="150px" class="mr-5"
                                        v-model:valueInput="dataAction.input.withholdingLocalIncomeTax" /> 원
                                </div>
                            </a-form-item>
                        </div>
                        <div class="header-text-2 mb-10 d-flex-center">
                            공제합계 <b class="ml-5"> {{ ($filters.formatCurrency(dataAction.input.paymentAmount -
                                    dataAction.input.withholdingIncomeTax -
                                    dataAction.input.withholdingLocalIncomeTax))
                            }}</b>원
                            <span class="d-flex-center fz-11 ml-10" style="color: gray;">
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                                지급액 - 공제합계
                            </span>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </a-col>
    <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />

    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="actionDeleteSuccess" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620-status" />
    <EditPopup :modalStatus="modalEdit" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import { dataActionUtils, dataGetDetailEdit } from "../utils/index";
import dayjs from "dayjs";
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import type { DropdownProps } from "ant-design-vue";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPopup.vue"
import filters from "@/helpers/filters";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxDropDownButton, DxGrouping, DxItem, DxButton, DxMasterDetail, DxSummary, DxTotalItem,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
        DeletePopup, EditPopup
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
        let disabledInput = ref(false)
        let switchAction = ref<boolean>(true)
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))
        let statusButton = ref(props.statusButton)
        let dataSourceDetail = ref([]);
        const modalEdit = ref<boolean>(false)
        const popupDataDelete: any = ref([])
        const modalDelete = ref<boolean>(false)
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const triggerDetail = ref<boolean>(true);
        const triggerDetailOption = ref<boolean>(true);
        const triggerDetailDetailEdit = ref<boolean>(false);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const globalYear = computed(() => store.state.settings.globalYear)
        const modalHistory = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        let arrayEmploySelect: any = ref([])
        let placements = ["bottomRight"] as DropdownProps["placement"][];

        let dataAction: any = reactive({
            ...dataActionUtils
        })
        let dataCallApiGetOption = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        let dataTableDetail: any = ref({
            ...props.dataCallTableDetail
        })
        let dataCallApiDetailEdit = reactive({
            ...dataGetDetailEdit
        })
        const arrDropDown = [
            { id: 1, url: '520', event: '520', title: '' },
            { id: 2, function: 'History', event: 'History', title: '일용직근로소득자료 변경이력' },
            { id: 2, function: 'HistoryStatus', event: 'HistoryStatus', title: '일용직근로소득 마감상태 변경이력' },
        ]


        // ================GRAPQL==============================================

        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinessesDetail(res => {
            dataSourceDetail.value = res.data.getIncomeBusinesses
            triggerDetail.value = false
        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })

        // API QUERY GET VALUE OPTION
        const { refetch: refetchOption, loading: loadingOption, onError: errorOption, result: resOption } = useQuery(queries.getEmployeeBusinesses, dataCallApiGetOption, () => ({
            enabled: triggerDetailOption.value,
            fetchPolicy: "no-cache",
        }));
        watch(() => resOption, (newValue, old) => {
            let respon = newValue.value.getEmployeeBusinesses
            respon.map((val: any) => {
                arrayEmploySelect.value.push({
                    employeeId: val.employeeId,
                    incomeTypeCode: val.incomeTypeCode,
                    name: val.name,
                    incomeTypeName: val.incomeTypeName,
                })
            })
        }, { deep: true })

        // API QUERY DETAIL VALUE TO EDIT
        const { refetch: refetchDetailEdit, loading: loadingDetailEdit, onError: errorDetailEdit, result: resDetailEdit } = useQuery(queries.getIncomeBusiness, dataCallApiDetailEdit, () => ({
            enabled: triggerDetailDetailEdit.value,
            fetchPolicy: "no-cache",
        }));
        watch(() => resDetailEdit, (newValue, old) => {
            if (newValue.value) {
                let respon = newValue.value.getIncomeBusiness
                dataAction.input.paymentDay = respon.paymentDay
                dataAction.input.employeeId = respon.employeeId
                dataAction.input.incomeTypeCode = respon.incomeTypeCode
                dataAction.input.paymentAmount = respon.paymentAmount
                dataAction.input.withholdingIncomeTax = respon.withholdingIncomeTax
                dataAction.input.withholdingLocalIncomeTax = respon.withholdingLocalIncomeTax
            }
        }, { deep: true })
        errorDetailEdit(res => {
            notification('error', res.message)
        })

        // API CREATED 
        const {
            mutate: actionCreated,
            onError: errorCreated,
            loading: loadingCreated,
            onDone: doneCreated,
        } = useMutation(mutations.createIncomeBusiness);
        doneCreated(res => {
            emit('createdDone', true)
            notification('success', `업데이트 완료!`)
            triggerDetail.value = true
            refetchTableDetail()
        })
        errorCreated(res => {
            notification('error', res.message)
        })

        // API EDIT 
        const {
            mutate: actionEdit,
            onError: errorEdit,
            loading: loadingEdit,
            onDone: doneEdit,
        } = useMutation(mutations.updateIncomeBusiness);
        doneEdit(() => {
            emit('createdDone', true)
            notification('success', `업데이트 완료!`)
            triggerDetail.value = true
            refetchTableDetail()
        })
        errorEdit(res => {
            notification('error', res.message)
        })

        // ================WATCHING============================================
        watch(() => props.dataCallTableDetail, (newValue) => {
            dataTableDetail.value = newValue
            triggerDetail.value = true
            refetchTableDetail()
        }, { deep: true })

        watch(() => dataTableDetail, (newValue) => {
            let date1 = dataAction.processKey.imputedYear + '-' + dataAction.processKey.imputedMonth
            let date2 = dataAction.processKey.paymentYear + '-' + dataAction.processKey.paymentMonth
            month1.value = dayjs(date1).format("YYYY-MM")
            month2.value = dayjs(date2).format("YYYY-MM")
        }, { deep: true })

        watch(() => props.statusButton, (newValue) => {
            statusButton.value = newValue
        })

        // Action save value
        watch(() => props.actionSave, () => {
            dataAction.processKey.imputedMonth = parseInt(month1.value.split('-')[1])
            dataAction.processKey.imputedYear = parseInt(month1.value.split('-')[0])
            dataAction.processKey.paymentMonth = parseInt(month2.value.split('-')[1])
            dataAction.processKey.paymentYear = parseInt(month2.value.split('-')[0])
            if (switchAction.value == true) {
                actionCreated(dataAction)
            }
            else {
                let inputEdit = {
                    ...dataAction,
                    incomeId: dataCallApiDetailEdit.incomeId,
                    input: {
                        paymentAmount: dataAction.input.paymentAmount,
                        taxRate: 3,
                        withholdingIncomeTax: dataAction.input.withholdingIncomeTax,
                        withholdingLocalIncomeTax: dataAction.input.withholdingLocalIncomeTax,
                    }
                }
                actionEdit(inputEdit)
            }
        })

        // ================FUNCTION============================================   
        const addRow = () => {
            disabledInput.value = false
            dataAction.input.paymentDay = null
            dataAction.input.employeeId = 0
            dataAction.input.incomeTypeCode = ""
            dataAction.input.paymentAmount = 0
            dataAction.input.withholdingIncomeTax = 0
            dataAction.input.withholdingLocalIncomeTax = 0
            switchAction.value = true
        }

        const actionEditFuc = (data: any) => {
            disabledInput.value = true
            switchAction.value = false
            dataCallApiDetailEdit.processKey = dataTableDetail.value.processKey
            dataCallApiDetailEdit.incomeId = data.data.incomeId
            triggerDetailDetailEdit.value = true
            refetchDetailEdit()
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
            modalDelete.value = false
            modalEdit.value = false
            triggerDetail.value = true
            refetchTableDetail()
            addRow()
            emit('createdDone', true)
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


        return {
            month1, month2,
            arrayEmploySelect,
            statusButton,
            dataTableDetail,
            dataAction,
            rowTable, per_page, move_column, colomn_resize,
            loadingTableDetail,
            dataSourceDetail,
            amountFormat,
            loadingCreated,
            loadingDetailEdit,
            arrDropDown,
            placements,
            loadingEdit,
            disabledInput,
            modalDelete,
            popupDataDelete,
            modalHistory,
            modalHistoryStatus,
            modalEdit,
            addRow,
            deleteItem,
            actionEditFuc,
            changeIncomeTypeCode,
            selectionChanged,
            actionDeleteSuccess,
            onItemClick,
            editPaymentDate,
            customTextSummary
        }
    }
});
</script>
<style scoped src="../style/style.scss" >

</style>
