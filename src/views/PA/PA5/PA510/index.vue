<template>
    <action-header title="일용직근로소득자료입력" @actionSave="actionAddItem ? onSubmit($event) : updateData($event)" />
    <div id="pa-510" class="page-content">
        <a-row>
            <a-spin :spinning="loading" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    key-expr="companyId" :focused-row-enabled="true" :show-borders="true"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxColumn :caption="processKey.imputedYear + '귀속월'" cell-template="imputed-year" />
                    <template #imputed-year="{ data }">
                        <span>지급연월</span>
                    </template>
                    <DxColumn width="100px" caption="01" cell-template="imputed-month1" />
                    <template #imputed-month1="{ data }">
                        <div v-if="data.data.month1">
                            <colorful-badge class="hover-underlined" :value="data.data.month1.status"
                                @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
                                :month="data.data.month1.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(1)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="02" cell-template="imputed-month2" />
                    <template #imputed-month2="{ data }">
                        <div v-if="data.data.month2">
                            <colorful-badge class="hover-underlined" :value="data.data.month2.status"
                                @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
                                :month="data.data.month2.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(2)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="03" cell-template="imputed-month3" />
                    <template #imputed-month3="{ data }">
                        <div v-if="data.data.month3">
                            <colorful-badge class="hover-underlined" :value="data.data.month3.status"
                                @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
                                :month="data.data.month3.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(3)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="04" cell-template="imputed-month4" />
                    <template #imputed-month4="{ data }">
                        <div v-if="data.data.month4">
                            <colorful-badge class="hover-underlined" :value="data.data.month4.status"
                                @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
                                :month="data.data.month4.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(4)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="05" cell-template="imputed-month5" />
                    <template #imputed-month5="{ data }">
                        <div v-if="data.data.month5">
                            <colorful-badge class="hover-underlined" :value="data.data.month5.status"
                                @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
                                :month="data.data.month5.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(5)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="06" cell-template="imputed-month6" />
                    <template #imputed-month6="{ data }">
                        <div v-if="data.data.month6">
                            <colorful-badge class="hover-underlined" :value="data.data.month6.status"
                                @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
                                :month="data.data.month6.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(6)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="07" cell-template="imputed-month7" />
                    <template #imputed-month7="{ data }">
                        <div v-if="data.data.month7">
                            <colorful-badge class="hover-underlined" :value="data.data.month7.status"
                                @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
                                :month="data.data.month7.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(7)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="08" cell-template="imputed-month8" />
                    <template #imputed-month8="{ data }">
                        <div v-if="data.data.month8">
                            <colorful-badge class="hover-underlined" :value="data.data.month8.status"
                                @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
                                :month="data.data.month8.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(8)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="09" cell-template="imputed-month9" />
                    <template #imputed-month9="{ data }">
                        <div v-if="data.data.month9">
                            <colorful-badge class="hover-underlined" :value="data.data.month9.status"
                                @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
                                :month="data.data.month9.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(9)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="10" cell-template="imputed-month10" />
                    <template #imputed-month10="{ data }">
                        <div v-if="data.data.month10">
                            <colorful-badge class="hover-underlined" :value="data.data.month10.status"
                                @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
                                :month="data.data.month10.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(10)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="11" cell-template="imputed-month11" />
                    <template #imputed-month11="{ data }">
                        <div v-if="data.data.month11">
                            <colorful-badge class="hover-underlined" :value="data.data.month11.status"
                                @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
                                :month="data.data.month11.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(11)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="12" cell-template="imputed-month12" />
                    <template #imputed-month12="{ data }">
                        <div v-if="data.data.month12">
                            <colorful-badge class="hover-underlined" :value="data.data.month12.status"
                                @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
                                :month="data.data.month12.paymentMonth" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(12)">[+]</div>
                    </template>
                    <DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
                    <template #row-detail="{ data }">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCustomRes"
                            :show-borders="true" :column-auto-width="true" :show-column-headers="false">
                            <DxColumn cell-template="col-first" data-type="string" />
                            <template #col-first="{ data }">
                                <b>{{ data.data.name }}</b><br>
                            </template>
                            <DxColumn width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div v-if="(data.data.month1)">{{ data.data.month1.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div v-if="(data.data.month2)">{{ data.data.month2.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div v-if="(data.data.month3)">{{ data.data.month3.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div v-if="(data.data.month4)">{{ data.data.month4.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div v-if="(data.data.month5)">{{ data.data.month5.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div v-if="(data.data.month6)">{{ data.data.month6.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div v-if="(data.data.month7)">{{ data.data.month7.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div v-if="(data.data.month8)">{{ data.data.month8.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div v-if="(data.data.month9)">{{ data.data.month9.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div v-if="data.data.month10">{{ data.data.month10.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div v-if="(data.data.month11)">{{ data.data.month11.value }}
                                </div>
                            </template>
                            <DxColumn width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div v-if="(data.data.month12)">{{ data.data.month12.value }}
                                </div>
                            </template>

                        </DxDataGrid>
                    </template>
                </DxDataGrid>
            </a-spin>
        </a-row>
        <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between;">
            <a-col>
                <DxButton
                    :text="'귀' + processKey.imputedYear + '-' + (processKey.imputedMonth > 9 ? processKey.imputedMonth : '0' + processKey.imputedMonth)"
                    :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                <DxButton :text="'지' + processKey.paymentYear + '-' + processKey.paymentMonth"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                <ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm" />
            </a-col>
            <a-col class="">
                <SelectActionComponent :modalStatus="true" :dataRows="dataRows" @actionAddItem="actionAddItem = true"
                    @loadingTableInfo="loadingTableInfo" />
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="14" class="custom-layout">
                <a-spin :spinning="loadingTaxPayInfo" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTaxPayInfo"
                        :show-borders="true" :allow-column-reordering="move_column" :focused-row-enabled="true"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="employeeId"
                        :onRowClick="actionEditTaxPay" @selection-changed="selectionChanged">
                        <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                        <DxColumn width="150" caption="일용직사원" cell-template="tag" />
                        <template #tag="{ data }" class="custom-action">
                            <div class="custom-action">
                                <employee-info :idEmployee="data.data.employee.employeeId"
                                    :name="data.data.employee.name" :idCardNumber="data.data.employee.residentId"
                                    :status="data.data.employee.status" :foreigner="data.data.employee.foreigner"
                                    :checkStatus="false" />
                            </div>
                        </template>
                        <DxColumn width="80" caption="근무일수" data-field="workingDays" />
                        <DxColumn width="100" caption="일급여" data-field="dailyWage" :format="amountFormat" />
                        <DxColumn width="80" caption="공제" data-field="totalDeduction" cell-template="total-deduction" />
                        <template #total-deduction="{ data }">
                            <a-tooltip placement="top">
                                <template #title>소득세 {{ $filters.formatCurrency(data.data.incomePayment) }} / 지방소득세
                                    {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
                                </template>
                                <span>
                                    {{ $filters.formatCurrency(data.data.totalDeduction) }}
                                </span>
                            </a-tooltip>
                        </template>
                        <DxColumn width="117" caption="차인지급액" data-field="actualPayment" :format="amountFormat" />
                        <DxColumn width="300" caption="비고" cell-template="four-major-insurance" />
                        <template #four-major-insurance="{ data }" class="custom-action">
                            <div class="custom-action">
                                <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction"
                                    :typeTag="4" :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent"
                                    :typeTag="6" :ratio="data.data.employee.nationalPensionSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
                                    :typeTag="7" :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
                                    :typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
                                <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                                    :ratio="data.data.employee.incomeTaxMagnification" />
                            </div>
                        </template>
                        <DxColumn caption="지급일" data-field="paymentDay" width="70px" />
                        <DxSummary>
                            <DxTotalItem column="일용직사원" summary-type="count" display-format="사원수: {0}" />
                            <DxTotalItem column="일급여" :customize-text="customizeTotalMonthly" value-format="#,###" />
                            <DxTotalItem column="공제" summary-type="sum" display-format="공제합계: {0}"
                                value-format="#,###" />
                            <DxTotalItem column="차인지급액" summary-type="sum" display-format="차인지급액합계: {0}"
                                value-format="#,###" />
                        </DxSummary>
                    </DxDataGrid>
                </a-spin>

            </a-col>
            <a-col :span="10" class="custom-layout" style="padding-right: 0px;">
                <FormDataComponent :data="dataIncomeWageDaily" @loadingTableInfo="loadingTableInfo"
                    :actionAddItem="actionAddItem" :actionSaveItem="actionSaveItem"
                    :actionUpdateItem="actionUpdateItem" />
            </a-col>
        </a-row>
        <CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" @closePopup="modalCopy = false"
            @loadingTableInfo="loadingTableInfo" @dataAddIncomeProcess="dataAddIncomeProcess" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxSelection, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import notification from "@/utils/notification"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent.vue"
import queries from "@/graphql/queries/PA/PA5/PA510/index"
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import { sampleDataIncomeWageDaily } from "./utils/index"
import EmploySelect from "@/components/common/EmploySelect.vue"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import CopyMonth from "./components/Popup/CopyMonth.vue";
import filters from "@/helpers/filters";
export default defineComponent({
    components: {
        DxMasterDetail,
        DxDataGrid,
        DxColumn,
        DxSelection,
        DxButton,
        DxSummary,
        DxTotalItem,
        SelectActionComponent,
        EmploySelect,
        ProcessStatus,
        FormDataComponent,
        CopyMonth,
    },
    setup() {
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const per_page = computed(() => store.state.settings.per_page)
        const move_column = computed(() => store.state.settings.move_column)
        const colomn_resize = computed(() => store.state.settings.colomn_resize)
        store.state.common.processKeyPA510 = {
            imputedYear: globalYear,
            imputedMonth: dayjs().month() + 1,
            paymentYear: globalYear.value,
            paymentMonth: dayjs().month() + 1,
        }
        const processKey = computed(() => store.state.common.processKeyPA510)
        const modalCopy = ref<boolean>(false);
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const actionAddItem: any = ref<boolean>(true)
        const actionSaveItem: any = ref<number>(0)
        const actionUpdateItem: any = ref<number>(0)
        let dataCustomRes: any = ref([])
        const dataIncomeWageDaily: any = ref({ ...sampleDataIncomeWageDaily })
        const dataRows: any = ref([])
        const dataSource: any = ref([])
        let status: any = ref()
        const dataTaxPayInfo: any = ref([])
        const dataModalCopy: any = ref()

        const arrayEmploySelect: any = ref([])

        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        const originDataTaxPayInfo = ref({
            companyId: companyId,
            processKey: processKey.value,
        })
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getIncomeProcessWageDailies, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        const {
            refetch: refetchDataTaxPayInfo,
            result: resultTaxPayInfo,
            loading: loadingTaxPayInfo,
        } = useQuery(queries.getIncomeWageDailies, originDataTaxPayInfo, () => ({
            fetchPolicy: "no-cache",
        }))
        const {
            mutate: actionChangeIncomeProcess,
            onError: errorChangeIncomeProcess,
            onDone: successChangeIncomeProcess,
        } = useMutation(mutations.changeIncomeProcessWageDailyStatus)
        errorChangeIncomeProcess(e => {
            notification('error', e.message)
        })
        successChangeIncomeProcess(e => {
            notification('success', `업데이트 완료!`)
            refetchData()
        })

        // ======================= WATCH ==================================
        watch(result, (value) => {
            if (value) {
                let respon = value.getIncomeProcessWageDailies
                dataSource.value = [{
                    companyId: companyId,
                }]
                dataCustomRes.value = [
                    { id: 1, name: "인원" },
                    { id: 2, name: "지급액", },
                    { id: 3, name: "소득세", },
                    { id: 4, name: "지방소득세", },
                    { id: 5, name: "공제총액", },
                    { id: 6, name: "차인지급액", },
                ]
                respon.forEach((val: any, index: any) => {
                    let dataAdd = {
                        imputedYear: val.imputedYear,
                        imputedMonth: val.imputedMonth,
                        paymentYear: val.paymentYear,
                        paymentMonth: val.paymentMonth,
                    }
                    if (JSON.stringify(dataAdd) == JSON.stringify(processKey.value)) {
                        status.value = val.status
                    }

                    dataSource.value[0]['month' + val.imputedMonth] = val
                    // data table detail
                    dataCustomRes.value[0]['month' + val.imputedMonth] =
                    {
                        value: val.employeeStat ? `${val.employeeStat.employeeCount.toLocaleString('en-US', { currency: 'VND' })}(${val.employeeStat.retireEmployeeCount})` : 0,
                        ...dataAdd
                    }

                    dataCustomRes.value[1]['month' + val.imputedMonth] =
                    {
                        value: val.incomeStat ? val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? val.incomeStat.totalDeduction.toLocaleString('en-US', { currency: 'VND' }) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? val.incomeStat.actualPayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
                        ...dataAdd
                    }
                })
            }
        })

        watch(resultTaxPayInfo, (value) => {
            dataTaxPayInfo.value = value.getIncomeWageDailies
            dataTaxPayInfo.value.map((value: any) => {
                arrayEmploySelect.value.push({
                    employeeId: value.employee.employeeId,
                    name: value.employee.name,
                    idCardNumber: value.employee.idCardNumber,
                    status: value.employee.status,
                    foreigner: value.employee.foreigner
                })
            })
        })
        // ======================= FUNCTION ================================
        const statusComfirm = () => {
            actionChangeIncomeProcess({
                companyId: companyId,
                processKey: { ...processKey.value },
                status: status.value
            })
        }
        const onSubmit = (e: any) => {
            actionSaveItem.value++
        }
        const updateData = (e: any) => {
            actionUpdateItem.value++
        }

        const actionEditTaxPay = (data: any) => {
            if (data.rowType == "data") {
                actionAddItem.value = false
                dataIncomeWageDaily.value = { ...data.data }
            }
        }

        const selectionChanged = (data: any) => {
            dataRows.value = data.selectedRowsData
        }
        const showDetailSelected = (data: any) => {
            status.value = data.status
            store.state.common.processKeyPA510.imputedMonth = data.imputedMonth
            store.state.common.processKeyPA510.paymentYear = data.paymentYear
            store.state.common.processKeyPA510.paymentMonth = data.paymentMonth
        }
        const loadingTableInfo = () => {
            refetchDataTaxPayInfo()
            refetchData()
        }
        const customizeTotalMonthly = (data: any) => {
            let total: any = 0
            dataTaxPayInfo.value.map((val: any) => {
                total += val.workingDays * val.dailyWage
            })
            return `월급여합계: ${filters.formatCurrency(total)}`;
        }

        const copyMonth = (month: number) => {
            dataModalCopy.value = month
            modalCopy.value = true
        }
        const dataAddIncomeProcess = (data: any) => {
            dataSource.value[0]['month' + data.imputedMonth] = data
            dataSource.value[0]['month' + data.imputedMonth].status = 10
        }
        return {
            processKey,
            loading,
            status,
            dataSource,
            per_page, move_column, colomn_resize,
            refetchData,
            onSubmit,
            updateData,
            dataIncomeWageDaily,
            selectionChanged,
            arrayEmploySelect,
            dataCustomRes,
            showDetailSelected,
            dataTaxPayInfo,
            actionEditTaxPay,
            dataRows,
            actionAddItem,
            actionSaveItem,
            actionUpdateItem,
            loadingTableInfo,
            loadingTaxPayInfo,
            customizeTotalMonthly,
            copyMonth,
            modalCopy,
            dataModalCopy,
            amountFormat,
            dataAddIncomeProcess,
            statusComfirm,
        }

    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
