<template>
    <action-header title="일용직근로소득자료입력" :buttonSave="false" :buttonDelete="false" />
    <div id="pa-510" class="page-content">
        <a-row>
            <a-spin :spinning="loading" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" key-expr="companyId"
                    :focused-row-enabled="true" :show-borders="true" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn :caption="processKey.imputedYear + '귀속월'" cell-template="imputed-year" />
                    <template #imputed-year="{}">
                        <span>지급연월</span>
                    </template>
                    <DxColumn width="100px" caption="01" cell-template="imputed-month1" />
                    <template #imputed-month1="{ data }">
                        <div v-if="data.data.month1">
                            <colorful-badge class="hover-underlined" :value="data.data.month1.status"
                                @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
                                :month="data.data.month1.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 1" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(1)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="02" cell-template="imputed-month2" />
                    <template #imputed-month2="{ data }">
                        <div v-if="data.data.month2">
                            <colorful-badge class="hover-underlined" :value="data.data.month2.status"
                                @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
                                :month="data.data.month2.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 2" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(2)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="03" cell-template="imputed-month3" />
                    <template #imputed-month3="{ data }">
                        <div v-if="data.data.month3">
                            <colorful-badge class="hover-underlined" :value="data.data.month3.status"
                                @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
                                :month="data.data.month3.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 3" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(3)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="04" cell-template="imputed-month4" />
                    <template #imputed-month4="{ data }">
                        <div v-if="data.data.month4">
                            <colorful-badge class="hover-underlined" :value="data.data.month4.status"
                                @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
                                :month="data.data.month4.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 4" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(4)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="05" cell-template="imputed-month5" />
                    <template #imputed-month5="{ data }">
                        <div v-if="data.data.month5">
                            <colorful-badge class="hover-underlined" :value="data.data.month5.status"
                                @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
                                :month="data.data.month5.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 5" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(5)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="06" cell-template="imputed-month6" />
                    <template #imputed-month6="{ data }">
                        <div v-if="data.data.month6">
                            <colorful-badge class="hover-underlined" :value="data.data.month6.status"
                                @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
                                :month="data.data.month6.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 6" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(6)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="07" cell-template="imputed-month7" />
                    <template #imputed-month7="{ data }">
                        <div v-if="data.data.month7">
                            <colorful-badge class="hover-underlined" :value="data.data.month7.status"
                                @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
                                :month="data.data.month7.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 7" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(7)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="08" cell-template="imputed-month8" />
                    <template #imputed-month8="{ data }">
                        <div v-if="data.data.month8">
                            <colorful-badge class="hover-underlined" :value="data.data.month8.status"
                                @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
                                :month="data.data.month8.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 8" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(8)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="09" cell-template="imputed-month9" />
                    <template #imputed-month9="{ data }">
                        <div v-if="data.data.month9">
                            <colorful-badge class="hover-underlined" :value="data.data.month9.status"
                                @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
                                :month="data.data.month9.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 9" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(9)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="10" cell-template="imputed-month10" />
                    <template #imputed-month10="{ data }">
                        <div v-if="data.data.month10">
                            <colorful-badge class="hover-underlined" :value="data.data.month10.status"
                                @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
                                :month="data.data.month10.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 10" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(10)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="11" cell-template="imputed-month11" />
                    <template #imputed-month11="{ data }">
                        <div v-if="data.data.month11">
                            <colorful-badge class="hover-underlined" :value="data.data.month11.status"
                                @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
                                :month="data.data.month11.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 11" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(11)">[+]</div>
                    </template>
                    <DxColumn width="100px" caption="12" cell-template="imputed-month12" />
                    <template #imputed-month12="{ data }">
                        <div v-if="data.data.month12">
                            <colorful-badge class="hover-underlined" :value="data.data.month12.status"
                                @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
                                :month="data.data.month12.paymentMonth"
                                :isUnder="store.state.common.processKeyPA510.imputedMonth == 12" />
                        </div>
                        <div v-else style="width: 100%;text-align: center;" @click="copyMonth(12)">[+]</div>
                    </template>
                    <DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
                    <template #row-detail="{}">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCustomRes"
                            :show-borders="true" :column-auto-width="true" :show-column-headers="false">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxColumn cell-template="col-first" data-type="string" />
                            <template #col-first="{ data }">
                                <b>{{ data.data.name }}</b><br>
                            </template>
                            <DxColumn width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div class="custom-detail" v-if="(data.data.month1)">{{ data.data.month1.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div class="custom-detail" v-if="(data.data.month2)">{{ data.data.month2.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div class="custom-detail" v-if="(data.data.month3)">{{ data.data.month3.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div class="custom-detail" v-if="(data.data.month4)">{{ data.data.month4.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div class="custom-detail" v-if="(data.data.month5)">{{ data.data.month5.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div class="custom-detail" v-if="(data.data.month6)">{{ data.data.month6.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div class="custom-detail" v-if="(data.data.month7)">{{ data.data.month7.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div class="custom-detail" v-if="(data.data.month8)">{{ data.data.month8.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div class="custom-detail" v-if="(data.data.month9)">{{ data.data.month9.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div class="custom-detail" v-if="data.data.month10">{{ data.data.month10.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div class="custom-detail" v-if="(data.data.month11)">{{ data.data.month11.value }}
                                </div>
                            </template>
                            <DxColumn width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div class="custom-detail" v-if="(data.data.month12)">{{ data.data.month12.value }}
                                </div>
                            </template>
                        </DxDataGrid>
                    </template>
                </DxDataGrid>
            </a-spin>
        </a-row>
        <a-row :class="statusDisabledBlock ? 'disabledBlock' : ''"
            style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between;">
            <a-col>
                <DxButton
                    :text="'귀' + processKey.imputedYear + '-' + (processKey.imputedMonth > 9 ? processKey.imputedMonth : '0' + processKey.imputedMonth)"
                    :style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
                <DxButton
                    :text="'지' + processKey.paymentYear + '-' + (processKey.paymentMonth > 9 ? processKey.paymentMonth : '0' + processKey.paymentMonth)"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
                <ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm"
                    :disabled="status == 30 || status == 40" />
            </a-col>
            <a-col class="">
                <SelectActionComponent :dataRows="dataRows" />
            </a-col>
        </a-row>
        <a-row :class="statusDisabledBlock ? 'disabledBlock' : ''">
            <a-col :span="14" class="custom-layout">
                <a-spin :spinning="loadingTaxPayInfo" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true"
                        :data-source="store.state.common.dataTaxPayInfo" :show-borders="true"
                        :allow-column-reordering="move_column" :focused-row-enabled="true"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="incomeId"
                        :onRowClick="actionEditTaxPay" @selection-changed="selectionChanged"
                        :selection-filter="store.state.common.selectionFilter"
                        v-model:focused-row-key="store.state.common.focusedRowKey" :auto-navigate-to-focused-row="true">
                        <DxSelection :deferred="true" select-all-mode="allPages" show-check-boxes-mode="onClick"
                            mode="multiple" />
                        <DxColumn caption="일용직사원" cell-template="tag" width="150" />
                        <template #tag="{ data }">
                            <div class="custom-action">
                                <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                                    :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                                    :foreigner="data.data.employee.foreigner" :checkStatus="false" />
                            </div>
                        </template>
                        <DxColumn width="75" caption="근무일수" data-field="workingDays" />
                        <DxColumn width="85" caption="일급여" data-field="dailyWage" format="fixedPoint" />
                        <DxColumn width="85" caption="월급여" data-field="monthlyWage" format="fixedPoint" />
                        <DxColumn width="85" caption="공제" data-field="totalDeduction" cell-template="total-deduction" />
                        <template #total-deduction="{ data }">
                            <a-tooltip placement="top">
                                <template #title>소득세 {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} / 지방소득세
                                    {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
                                </template>
                                <span>
                                    {{ $filters.formatCurrency(data.data.totalDeduction) }}
                                </span>
                            </a-tooltip>
                        </template>
                        <DxColumn width="85" caption="차인지급액" data-field="actualPayment" format="fixedPoint" />
                        <DxColumn caption="비고" cell-template="four-major-insurance" />
                        <template #four-major-insurance="{ data }">
                            <div class="custom-action custom-grade-cell">
                                <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                                    :ratio="data.data.employee.nationalPensionSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
                                    :typeTag="7" :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
                                    :typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
                                <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                                    :ratio="data.data.employee.incomeTaxMagnification" />
                            </div>
                        </template>
                        <DxColumn caption="지급일" data-field="paymentDay" width="60px" />
                        <DxSummary>
                            <DxTotalItem column="일용직사원" summary-type="count" display-format="사원수: {0}" />
                            <DxTotalItem column="월급여" summary-type="sum" display-format="월급여합계: {0}" value-format="#,###" />
                            <DxTotalItem column="공제" summary-type="sum" display-format="공제합계: {0}" value-format="#,###" />
                            <DxTotalItem column="차인지급액" summary-type="sum" display-format="차인지급액합계: {0}"
                                value-format="#,###" />
                        </DxSummary>
                    </DxDataGrid>
                </a-spin>
            </a-col>
            <a-col :span="10" class="custom-layout" style="padding-right: 0px;">
                <FormDataComponent />
            </a-col>
        </a-row>
        <PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirmChange" />
        <!-- <PopupMessage :modalStatus="modalChangeRowPrice" @closePopup="modalChangeRowPrice = false" typeModal="confirm"
            :title="Message.getMessage('PA110', '001').message" content="" :okText="Message.getMessage('PA110', '001').yes" :cancelText="Message.getMessage('PA110', '001').no" @checkConfirm="statusComfirmChangePrice" /> -->
        <CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" @closePopup="modalCopy = false"
            @dataAddIncomeProcess="dataAddIncomeProcess" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxSelection, DxSummary, DxTotalItem, DxScrolling, DxMasterDetail } from "devextreme-vue/data-grid"
import notification from "@/utils/notification"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent.vue"
import queries from "@/graphql/queries/PA/PA5/PA510/index"
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import CopyMonth from "./components/Popup/CopyMonth.vue";
import filters from "@/helpers/filters";
import { userType } from "@/helpers/commonFunction";
import { Message } from '@/configs/enum';
export default defineComponent({
    components: {
        DxMasterDetail,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxSelection,
        DxButton,
        DxSummary,
        DxTotalItem,
        SelectActionComponent,
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
            imputedYear: globalYear.value,
            imputedMonth: dayjs().month() + 1,
            paymentYear: globalYear.value,
            paymentMonth: dayjs().month() + 1,
        }
        const processKey = computed(() => store.state.common.processKeyPA510)
        const modalCopy = ref<boolean>(false);
        const modalChangeRow = ref(false)
        // const modalChangeRowPrice = ref(false)
        let dataCustomRes: any = ref([])
        const dataRows: any = ref([])
        const dataSource: any = ref([])
        let status: any = ref()
        const dataModalCopy: any = ref()
        const IncomeWageDailiesTrigger = ref<boolean>(false)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        const originDataTaxPayInfo = ref({
            companyId: companyId,
            processKey: processKey.value,
        })
        const isRunOnce = ref<boolean>(true);
        const statusDisabledBlock = ref<boolean>(true);
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
            enabled: IncomeWageDailiesTrigger.value,
            fetchPolicy: 'no-cache',
        }));
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
            refetchData() //reset data table 1
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
                        value: val.employeeStat ? `${filters.formatCurrency(val.employeeStat.employeeCount)}(${filters.formatCurrency(val.employeeStat.retireEmployeeCount)})` : 0,
                        ...dataAdd
                    }

                    dataCustomRes.value[1]['month' + val.imputedMonth] =
                    {
                        value: val.incomeStat ? filters.formatCurrency(val.incomeStat.incomePayment) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? filters.formatCurrency(val.incomeStat.withholdingIncomeTax) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? filters.formatCurrency(val.incomeStat.totalDeduction) : 0,
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + val.imputedMonth] = {
                        value: val.incomeStat ? filters.formatCurrency(val.incomeStat.actualPayment) : 0,
                        ...dataAdd
                    }
                })
            }
            const obj = dataSource.value[0]['month' + store.state.common.processKeyPA510.imputedMonth]
            if (obj) {
                statusDisabledBlock.value = false;
            } else {
                status.value = null
                statusDisabledBlock.value = true;
            }
            if (isRunOnce.value) {
                isRunOnce.value = false;
                if (obj) {
                    showDetailSelected(obj)
                }
            }
        })
        watch(resultTaxPayInfo, (value) => {
            IncomeWageDailiesTrigger.value = false;
            store.state.common.dataTaxPayInfo = value.getIncomeWageDailies;
            // if (value.getIncomeWageDailies[0] && !store.state.common.actionAddItem) { // if have data
            if (value.getIncomeWageDailies[0]) { // if have data
                if (store.state.common.incomeId && value.getIncomeWageDailies.find((element: any) => element.incomeId == store.state.common.incomeId ?? null)) {
                    store.state.common.focusedRowKey = store.state.common.incomeId
                    // store.state.common.incomeId = value.getIncomeWageDailies.find((element: any) => element.employeeId == store.state.common.employeeId).incomeId
                } else {
                    store.state.common.focusedRowKey = value.getIncomeWageDailies[0].incomeId
                    store.state.common.incomeId = value.getIncomeWageDailies[0].incomeId
                    // store.state.common.employeeId = value.getIncomeWageDailies[0].employeeId
                }
                store.state.common.actionAddItem = false
            } else {
                store.state.common.actionAddItem = true
                store.state.common.focusedRowKey = null;
                store.state.common.incomeId = null;
                // store.state.common.employeeId = null;
                store.state.common.actionResetForm++;
            }
            store.state.common.resetArrayEmploySelect++
        })
        watch(() => store.state.common.loadingTableInfo, (newVal) => {
            refetchData() //reset data table 1
            IncomeWageDailiesTrigger.value = true; //reset data table 2
            // refetchDataTaxPayInfo() //reset data table 2
        })
        watch(() => status.value, (newVal) => {
            if (userType != 'm' && (newVal == 20 || newVal == 30 || newVal == 40)) {
                store.state.common.statusDisabledStatus = true;
            } else {
                store.state.common.statusDisabledStatus = false;
            }
        })
        watch(globalYear, (newVal) => {
            store.state.common.processKeyPA510.imputedYear = newVal
            store.state.common.processKeyPA510.paymentYear = newVal
            IncomeWageDailiesTrigger.value = true; //reset data table 2
            // refetchDataTaxPayInfo() //reset data table 2
        })
        // ======================= FUNCTION ================================
        const statusComfirm = () => {
            actionChangeIncomeProcess({
                companyId: companyId,
                processKey: { ...processKey.value },
                status: status.value
            })
        }

        // action click row table 2
        // let rowEdit = ref()
        const actionEditTaxPay = (data: any) => {
            store.state.common.dataRowOnActive = data.data
            if (store.state.common.dataRowOnActive.employeeId) { // if row data (not row add)
                if (store.state.common.statusChangeFormEdit) {
                    // if (store.state.common.statusChangeFormPrice) {
                    //     modalChangeRowPrice.value = true;
                    // } else {
                    modalChangeRow.value = true;
                    // }
                } else {
                    if (!store.state.common.statusRowAdd && store.state.common.dataTaxPayInfo[store.state.common.dataTaxPayInfo.length - 1]?.employee.employeeId == null) {
                        store.state.common.dataTaxPayInfo = store.state.common.dataTaxPayInfo.splice(0, store.state.common.dataTaxPayInfo.length - 1)
                        store.state.common.statusRowAdd = true
                    }
                    store.state.common.incomeId = data.data.incomeId
                    // store.state.common.employeeId = data.data.employeeId
                }
                if (store.state.common.statusRowAdd) {
                    store.state.common.actionAddItem = false
                }
            }
        }

        const selectionChanged = (data: any) => {
            data.component.getSelectedRowsData().then((rowData: any) => {
                dataRows.value = rowData
                if ( rowData.length > 1 ) {
                    // store.state.common.incomeId = rowData[0].
                    store.state.common.focusedRowKey = store.state.common.incomeId
                }
            })
        }
        const showDetailSelected = (data: any) => {
            IncomeWageDailiesTrigger.value = true;
            status.value = data.status
            store.state.common.processKeyPA510.imputedMonth = data.imputedMonth
            store.state.common.processKeyPA510.paymentYear = data.paymentYear
            store.state.common.processKeyPA510.paymentMonth = data.paymentMonth
            statusDisabledBlock.value = false;
            store.state.common.statusRowAdd = true;
        }
        const statusComfirmChange = (res: any) => {
            if (res) {
                (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
            } else {
                if (!store.state.common.statusRowAdd) {
                    store.state.common.actionAddItem = false
                    store.state.common.dataTaxPayInfo = store.state.common.dataTaxPayInfo.splice(0, store.state.common.dataTaxPayInfo.length - 1)
                    store.state.common.statusRowAdd = true
                }
                store.state.common.incomeId = store.state.common.dataRowOnActive.incomeId
            }

        }

        const copyMonth = (month: number) => {
            dataModalCopy.value = month
            modalCopy.value = true
        }
        const dataAddIncomeProcess = (data: any) => {
            dataSource.value[0]['month' + data.imputedMonth] = data
            dataSource.value[0]['month' + data.imputedMonth].status = 10
            status.value = 10
            // refetchDataTaxPayInfo()
            IncomeWageDailiesTrigger.value = true; //reset data table 2
            statusDisabledBlock.value = false;
        }
        return {
            processKey,
            loading,
            status,
            dataSource,
            per_page, move_column, colomn_resize,
            selectionChanged,
            dataCustomRes,
            showDetailSelected,
            actionEditTaxPay,
            dataRows,
            loadingTaxPayInfo,
            // customizeTotalMonthly,
            copyMonth,
            modalCopy,
            dataModalCopy,
            dataAddIncomeProcess,
            statusComfirm,
            store,
            modalChangeRow, statusComfirmChange,
            // modalChangeRowPrice, statusComfirmChangePrice,
            statusDisabledBlock,
            Message,
        }

    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" ></style>
