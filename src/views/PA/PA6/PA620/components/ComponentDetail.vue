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
                <DxButton>
                    <DeleteOutlined style="font-size: 18px;" />
                </DxButton>
                <DxButton icon="plus" @click="addRow" />
                <DxButton icon="plus">
                    <EditOutlined style="font-size: 18px;" />
                </DxButton>
            </div>
        </div>
    </a-col>

    <a-col :span="12" class="custom-layout ">
        <a-spin :spinning="(loadingTableDetail || loadingCreated)" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
                :focused-row-enabled="true">
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                <template #tag="{ data }" class="custom-action">
                    <income-type :typeCode="data.data.incomeTypeCode" :typeName="(data.data.employee.name)"
                        :incomeTypeName="data.data.employee.incomeTypeName" />
                </template>
                <DxColumn caption="지급일" data-field="paymentDay" data-type="string" :format="amountFormat" />
                <DxColumn caption="지급액" data-field="paymentAmount" data-type="string" :format="amountFormat" />
                <DxColumn caption="세율" data-field="taxRate" data-type="string" :format="amountFormat" />
                <DxColumn caption="공제" cell-template="income-tax" :format="amountFormat" />
                <template #income-tax="{ data }" class="custom-action">
                    <div>
                        {{ data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax }}
                    </div>
                </template>
                <DxColumn caption="차인지급액" data-field="actualPayment" data-type="string" :format="amountFormat" />

            </DxDataGrid>
        </a-spin>
    </a-col>
    <a-col :span="12" class="custom-layout form-action">
        <a-spin :spinning="(loadingTableDetail || loadingCreated)" size="large">
            <a-form-item label="사업소득자" label-align="right">
                <employ-type-select :arrayValue="arrayEmploySelect" v-model:valueEmploy="dataAction.input.employeeId"
                    width="350px" :required="true" @incomeTypeCode="changeIncomeTypeCode" />
            </a-form-item>
            <div class="header-text-1 mb-10">소득내역</div>
            <div class="income-details">
                <a-row>
                    <a-col :span="12">
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
                            <number-box-money min="0" width="150px" class="mr-5"
                                v-model:valueInput="dataAction.input.paymentDay" />
                        </a-form-item>
                        <a-form-item label="지급액" label-align="right">
                            <number-box-money min="0" width="150px" class="mr-5"
                                v-model:valueInput="dataAction.input.paymentAmount" />
                        </a-form-item>
                        <a-form-item label="세율" label-align="right">
                            3%
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
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

</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import dayjs from "dayjs";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined
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
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM")) 
        let statusButton = ref(props.statusButton)
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        let dataSourceDetail = ref([]);
        const triggerDetail = ref<boolean>(true);
        const triggerDetailOption = ref<boolean>(true);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const globalYear = computed(() => store.state.settings.globalYear)
        let dataAction = reactive({
            companyId: companyId,
            processKey: {
                imputedYear: 2022,
                imputedMonth: 1,
                paymentYear: 2022,
                paymentMonth: 1,
            },
            input: {
                paymentDay: 0,
                employeeId: 0,
                incomeTypeCode: "",
                paymentAmount: 0,
                taxRate: 3,
                withholdingIncomeTax: 0,
                withholdingLocalIncomeTax: 0,
            }
        })
        let dataCallApiGetOption = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        let arrayEmploySelect: any = ref([])

        let dataTableDetail: any = ref({ ...props.dataCallTableDetail })

        // ================GRAPQL==============================================

        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinessesDetail(res => {
            dataSourceDetail.value = res.data.getIncomeBusinesses
            triggerDetail.value = false

            emit("createdDone", true)
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

        // API CREATED 
        const {
            mutate: actionCreated,
            onError: errorCreated,
            loading: loadingCreated,
            onDone: doneCreated,
        } = useMutation(mutations.createIncomeBusiness);
        doneCreated(res => {
            notification('success', `업데이트 완료!`)
            triggerDetail.value = true
            refetchTableDetail()
        })
        errorCreated(res => {
            notification('error', res.message)
        })

        // ================WATCHING============================================
        watch(() => props.dataCallTableDetail, (newValue) => {
            dataTableDetail.value = newValue
            triggerDetail.value = true
            refetchTableDetail()
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
            actionCreated(dataAction)
        })

        // ================FUNCTION============================================   


        const addRow = (data: any) => {

        }
        const actionEdit = (data: any) => {

        }

        const changeIncomeTypeCode = (res: string) => {
            dataAction.input.incomeTypeCode = res
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
            addRow,
            actionEdit,
            changeIncomeTypeCode,
        }
    }
});
</script>
<style scoped lang="scss" src="../style/style.scss" >

</style>
