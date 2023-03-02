<template>
    <standard-form action="" name="add-page-210" class="formPA510" :class="store.state.common.statusDisabledStatus ? 'disabledBlock' : ''">
        <a-spin :spinning="loading || loadingIncomeWageDaily" >
            <a-row :key="countKey">
                <a-col :span="12" style="padding-right: 10px">
                    <a-form-item label="일용직사원">
                        <EmploySelect :arrayValue="arrayEmploySelect" :disabled="!store.state.common.actionAddItem"
                            v-model:valueEmploy="dataIncomeWageDaily.employee.employeeId" :required="true"
                            @onChange="onChange" :activeType20="false" />
                    </a-form-item>
                    <a-form-item label="지급일">
                        <number-box :required="true" :min="1" v-model:valueInput="dataIncomeWageDaily.paymentDay" :max="31"
                            :spinButtons="true" :disabled="!store.state.common.actionAddItem" :isFormat="true"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">요약</a-typography-title>
                    </div>
                    <a-form-item label="근무일수">
                        <number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.workingDays" width="200px"
                            :required="true" min="1" max="31" />
                    </a-form-item>
                    <a-form-item label="월급여">
                        <number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.monthlyWage"
                            width="200px" :required="true" />
                    </a-form-item>
                    <a-form-item label="공제합계">
                        <number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.totalDeduction"
                            width="200px" :required="true" />
                    </a-form-item>
                    <a-form-item label="차인지급액">
                        <number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.actualPayment"
                            width="200px" :required="true" />
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="style-note">
                            급여합계 - 공제합계
                        </span>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">급여 / 공제</a-typography-title>
                    </div>
                </a-col>
                <a-col :span="10" style="padding-right: 5px;">
                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">
                            월급여 {{
                                dataIncomeWageDaily.employee.monthlyPaycheck ?
                                $filters.formatCurrency(dataIncomeWageDaily.monthlyWage) :
                                $filters.formatCurrency(dataIncomeWageDaily.dailyWage * dataIncomeWageDaily.workingDays)
                            }}
                            원</a-typography-title>
                    </div>
                    <div class="input-text">
                        <span>일급/월급:</span>
                        <switch-basic v-model:valueSwitch="dataIncomeWageDaily.employee.monthlyPaycheck" :textCheck="'월급'"
                            :textUnCheck="'일급'" />
                        <number-box-money v-if="dataIncomeWageDaily.employee.monthlyPaycheck" width="110px" :required="true"
                            placeholder='월급여' :spinButtons="false" v-model:valueInput="dataIncomeWageDaily.monthlyWage" />
                        <number-box-money v-else width="110px" :required="true" placeholder='일급여' :spinButtons="false"
                            v-model:valueInput="dataIncomeWageDaily.dailyWage" />
                    </div>
                    <div style="margin-bottom: 10px;">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="style-note" v-if="dataIncomeWageDaily.employee.monthlyPaycheck">월급 선택시, 일급 = 월급 /
                            근무일수</span>
                        <span class="style-note" v-else>일급 선택시, 월급 = 일급 x 근무일수</span>
                    </div>
                    <a-form-item label="근무일수">
                        <number-box width="150px" v-model:valueInput="dataIncomeWageDaily.workingDays"
                            :spinButtons="true" min="1" max="31"/>
                    </a-form-item>
                    <div style="font-weight: bold;">
                        <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{
                            showDailyWage()
                        }}원</span>

                        <span v-else>일급여 {{ $filters.formatCurrency(dataIncomeWageDaily.dailyWage) }}원</span>
                        <br>

                        <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">월급여 {{
                            $filters.formatCurrency(dataIncomeWageDaily.monthlyWage)
                        }}원</span>

                        <span v-else>월급여 {{
                           showMonthlyWage()
                        }}원</span>
                    </div>

                </a-col>
                <a-col :span="14" style="padding-leftt: 5px;">
                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">공제 항목 {{ totalDeduction }}
                            원</a-typography-title>
                    </div>
                    <a-spin :spinning="loadingDeductionItem" size="large">
                        <div class="deduction-main">
                            <div v-for="(item, index) in arrDeduction" :key="index" class="custom-deduction">
                                <span>
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                            :name="item.name" :type="1" subName="과세" />
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                        :name="item.name" :type="2" subName="상여(과세)" />
                                    <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                        :name="item.name" :type="3"
                                        :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                    <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                        :name="item.name" :width="'130px'" :type="4" subName="공제" />
                                </span>
                                <div>
                                    <number-box-money min="0" width="130px" :spinButtons="false"
                                        v-model:valueInput="item.price"/>
                                    <span class="pl-5">원</span>
                                </div>
                            </div>
                        </div>
                    </a-spin>
                </a-col>
            </a-row>
        </a-spin>
        <div class="text-align-center mt-50" style="display: flex; justify-content: center;">
            <a-tooltip placement="top">
                <template #title>입력된 급여 금액으로 공제 재계산합니다.</template>
                <div>
                    <!-- <button-basic style="margin: 0px 5px" @onClick="actionDedution" mode="contained" 
                    :type="store.state.common.statusChangeFormPrice ? 'calculate' : 'default'" text="공제 재계산" /> -->
                    <button-tooltip-error :statusChange="store.state.common.statusChangeFormPrice" :showError="showErrorButton" @onClick="actionDedution"/>  
                </div>
            </a-tooltip>
            <a-tooltip placement="top">
                <template #title>4대보험 EDI 의 공제 금액이 있는 경우, 조회 후 적용합니다</template>
                <div>
                    <button-basic style="margin: 0px 5px" @onClick="actionInsurance" mode="contained" type="default" text="4대보험 EDI 조회/적용" />
                </div>
            </a-tooltip>
            <button-basic style="margin: 0px 5px" @onClick="submitForm" :disabled="store.state.common.statusDisabledStatus" mode="contained" type="default" text="저장" />
        </div>
    </standard-form>

    <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" :data="arrDeduction"
        @updateDate="updateDataDeduction" />
<InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
</template>
<script lang="ts">

import { defineComponent, ref, computed, watch } from "vue";
import DxButton from "devextreme-vue/button"
import notification from "@/utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable"
import queries from "@/graphql/queries/PA/PA5/PA510/index"
import query520 from "@/graphql/queries/PA/PA5/PA520/index"
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
import DeductionPopup from "./Popup/DeductionPopup.vue"
import InsurancePopup from "./Popup/InsurancePopup.vue"
import { sampleDataIncomeWageDaily } from "../utils/index"
import filters from "@/helpers/filters";
import { Message } from "@/configs/enum"
import { Formula } from "@bankda/jangbuda-common";
import ButtonTooltipError from "@/components/common/ButtonTooltipError.vue";
export default defineComponent({
    components: {
        DxButton,
        DeductionPopup,
        InsurancePopup,
        ButtonTooltipError,
    },
    props: {
        isTaxhasData: Boolean,
    },
    setup(props, { emit }) {
        const messageUpdateSuccess = Message.getMessage('COMMON', '106').message
        const messageAddSuccess = Message.getMessage('COMMON', '101').message

        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const processKey = computed(() => store.state.common.processKeyPA510)
        const modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const dataIncomeWageDaily: any = ref({ ...sampleDataIncomeWageDaily })
        const arrayEmploySelect: any = ref([])
        const dataEmployeeWageDailies: any = ref([])
        const arrDeduction: any = ref([])
        const totalDeduction = ref(0)
        const triggerCalculateIncome: any = ref<boolean>(false)
        const triggerWithholdingConfigDeductionItems: any = ref<boolean>(true)
        const triggerIncomeWageDaily: any = ref<boolean>(false)
        const countKey: any = ref(0)
        const employeeWageDailyTrigger = ref<boolean>(false);
        const showErrorButton = ref(false)
        let employeeWageDailyParam = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: null,
        });
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const originDataCalculateIncome = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            totalTaxPay: 10,
            dependentCount: dataIncomeWageDaily.value.employee.dependentCount,
        })
        const originDataIncomeWageDaily = ref({
            companyId: companyId,
            incomeId: store.state.common.incomeId,
            processKey: store.state.common.processKeyPA510
        })

        // ============ GRAPQL ===============================
        const {
            loading: loadingDeductionItem,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            enabled: triggerWithholdingConfigDeductionItems.value,
            fetchPolicy: "no-cache",
        }))
        const {
            loading: loadingEmployeeWage,
            onResult: resEmployeeWage,
        } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        const {
            loading: loadingIncomeWageDaily,
            onResult: resIncomeWageDaily,
        } = useQuery(queries.getIncomeWageDaily, originDataIncomeWageDaily, () => ({
            enabled: triggerIncomeWageDaily.value,
            fetchPolicy: "no-cache",
        }))
        const {
            loading: loadingCalculateIncome,
            onResult: resCalculateIncome,
        } = useQuery(queries.calculateIncomeWageTax, originDataCalculateIncome, () => ({
            enabled: triggerCalculateIncome.value,
            fetchPolicy: "no-cache",
        }))
        const {
            mutate: mutateAdd,
            onDone: onDoneAdd,
            onError: onerrorAdd,
        } = useMutation(mutations.createIncomeWageDaily);
        const {
            mutate: mutateUpdate,
            onDone: onDoneUpdate,
            onError: onerrorUpdate,
        } = useMutation(mutations.updateIncomeWageDaily);
        const { result: resultEmployeeWageDaily, refetch: refetchEmployeeWageDaily, loading } = useQuery(query520.getEmployeeWageDaily, employeeWageDailyParam.value, () => ({
            enabled: employeeWageDailyTrigger.value,
            fetchPolicy: 'no-cache'
        }))

        // ===================DONE GRAPQL==================================
        onDoneAdd((data: any) => {
            if (store.state.common.focusedRowKey == store.state.common.dataRowOnActive?.incomeId) { // if click save modal
                store.state.common.incomeId = store.state.common.dataRowOnActive.incomeId
            } else { // if click submit
                store.state.common.incomeId = data.data.createIncomeWageDaily.incomeId
            }
            store.state.common.statusRowAdd = true;
            store.state.common.actionAddItem = false;
            // store.state.common.incomeId = data.data.createIncomeWageDaily.incomeId
            store.state.common.loadingTableInfo++
            notification('success', messageAddSuccess)
        })
        onerrorAdd((e: any) => {
            notification('error', e.message)
        })
        onDoneUpdate(() => {
            store.state.common.loadingTableInfo++
            triggerIncomeWageDaily.value = true;
            notification('success', messageUpdateSuccess)
        })
        onerrorUpdate((e: any) => {
            notification('error', e.message)
        })

        resEmployeeWage(value => {
            dataEmployeeWageDailies.value = value.data.getEmployeeWageDailies
            if (store.state.common.actionAddItem) {
                dataEmployeeWageDailies.value?.map((dataEmployee: any) => {
                    if (!store.state.common.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
                        arrayEmploySelect.value.push(dataEmployee)
                    }
                })
            } else {
                arrayEmploySelect.value = dataEmployeeWageDailies.value
            }
        })
        resWithholdingConfigPayItems(res => {
            arrDeduction.value = []
            res.data.getWithholdingConfigDeductionItems?.map((val: any) => {
                if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode)) {
                    let price = funcCheckPrice(val.itemCode)
                    arrDeduction.value.push({
                        ...val,
                        price: price
                    })
                }
            })
            triggerWithholdingConfigDeductionItems.value = false
        })
        resIncomeWageDaily((value: any) => {
            dataIncomeWageDaily.value = value.data.getIncomeWageDaily
            store.state.common.dataRowOld = { ...value.data.getIncomeWageDaily }
            arrDeduction.value?.map((data: any) => {
                data.price = 0
                dataIncomeWageDaily.value.deductionItems?.map((val: any) => {
                    if (val.itemCode == data.itemCode) {
                        data.price = val.amount
                    }
                })
            })
            store.state.common.selectionFilter = ['incomeId', '=', store.state.common.incomeId]
            triggerIncomeWageDaily.value = false;
            setTimeout(() => {
                store.state.common.statusChangeFormEdit = false;
            }, 500);
        })


        // ===================WATCH==================================
        watch(() => store.state.common.loadingFormData, (value) => {
            triggerIncomeWageDaily.value = true;
        })
        // Watching the value of the store.state.common.actionAddItem and if it is true, it will do
        // some stuff.
        watch(() => store.state.common.actionAddItem, (value) => {
            if (value) {
                countKey.value++;
                employeeWageDailyParam.value.employeeId = null
                arrDeduction.value?.map((data: any) => {
                    data.price = 0
                })
                arrayEmploySelect.value = []
                dataEmployeeWageDailies.value?.map((dataEmployee: any) => {
                    if (!store.state.common.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
                        arrayEmploySelect.value.push(dataEmployee)
                    }
                })
                setTimeout(() => {
                    store.state.common.statusChangeFormPrice = false;
                }, 500);
            } else {
                arrayEmploySelect.value = dataEmployeeWageDailies.value
            }
        })
        watch(() => dataIncomeWageDaily.value, (value) => {
            // Checking if the data in the store has changed.
            if (JSON.stringify(store.state.common.dataRowOld) !== JSON.stringify(dataIncomeWageDaily.value) && !store.state.common.actionAddItem && store.state.common.dataRowOld) {
                store.state.common.statusChangeFormPrice = true;
                store.state.common.statusChangeFormEdit = true;
            } else {
                store.state.common.statusChangeFormEdit = false;
                store.state.common.statusChangeFormPrice = false;
            }

            // Checking if the data in the form is different from the data in the database.
            if (JSON.stringify({ ...sampleDataIncomeWageDaily }) !== JSON.stringify(dataIncomeWageDaily.value)) {
                // store.state.common.statusChangeFormPrice = true;
                store.state.common.statusChangeFormAdd = true
                if (!store.state.common.statusRowAdd) {
                    store.state.common.statusChangeFormEdit = true
                    store.state.common.statusChangeFormPrice = true;
                }
            } else {
                store.state.common.statusChangeFormAdd = false
            }
            // store.state.common.focusedRowKey = dataIncomeWageDaily.value?.employee.employeeId
        }, { deep: true })

        watch(() => store.state.common.statusChangeFormPrice, (value) => {
            if (!value) {
                showErrorButton.value = false
            }
        })

        // Watching the value of incomeId in the store. If the value is not null, it will set the value
        // of incomeId in originDataIncomeWageDaily.value.incomeId to the value of incomeId in the
        // store. Then it will set triggerIncomeWageDaily.value to true.
        watch(() => store.state.common.incomeId, (value) => {
            if (value && value != 'PA510') {
                originDataIncomeWageDaily.value.incomeId = value
                triggerIncomeWageDaily.value = true;
            } else {
                if (!store.state.common.actionAddItem) {
                    arrDeduction.value?.map((data: any) => {
                        data.price = 0
                    })
                    dataIncomeWageDaily.value = JSON.parse(JSON.stringify({ ...sampleDataIncomeWageDaily }))
                }
            }
        })

        // Watching the value of actionSubmit and if it is true, it will execute the code inside the if
        // statement.
        watch(() => store.state.common.actionSubmit, (value) => {
            submitForm()
        })

        // reset form data
        watch(() => store.state.common.actionResetForm, (value) => {
            countKey.value++;
            dataIncomeWageDaily.value = JSON.parse(JSON.stringify({ ...sampleDataIncomeWageDaily }))
            arrDeduction.value?.map((data: any) => {
                data.price = 0
            })
            store.state.common.statusChangeFormPrice = false
        })

        // Watching the array arrDeduction and updating the totalDeduction.value whenever the array is
        // changed.
        watch(() => arrDeduction.value, (res) => {
            let total = 0
            res.value?.map((val: any) => {
                total += val.price
            })
            totalDeduction.value = filters.formatCurrency(total)
        }, { deep: true })

        // Watching the resultEmployeeWageDaily and when it changes, it will update the
        // dataIncomeWageDaily.value.
        watch(resultEmployeeWageDaily, async (res: any) => {
            employeeWageDailyTrigger.value = false;
            if (store.state.common.actionAddItem) {
                let data = res.getEmployeeWageDaily;
                await (dataIncomeWageDaily.value.monthlyWage = data.monthlyWage)
                await (dataIncomeWageDaily.value.dailyWage = data.dailyWage)
                await (dataIncomeWageDaily.value.workingDays = data.workingDays)
                await (dataIncomeWageDaily.value.totalDeduction = data.totalDeduction)
                await (dataIncomeWageDaily.value.employee.monthlyPaycheck = data.monthlyPaycheck)
                await (dataIncomeWageDaily.value.employee.employeeId = data.employeeId)
                await (dataIncomeWageDaily.value.employee.name = data.name)
                await (dataIncomeWageDaily.value.employee.status = data.status)
                await (dataIncomeWageDaily.value.employee.foreigner = data.foreigner)
                await (arrDeduction.value?.map((dataRow: any) => {
                    dataRow.price = 0
                    data.deductionItems?.map((val: any) => {
                        if (val.itemCode == dataRow.itemCode) {
                            dataRow.price = val.amount
                        }
                    })
                }))
             }
        }, { deep: true })

        // Watching the statusRowAdd property of the store.state.common object. If the value of
        // statusRowAdd is false, then it will add a new row to the table.
        watch(() => store.state.common.statusRowAdd, (newVal) => {
            if (!newVal) { // add row table
                store.state.common.dataTaxPayInfo = store.state.common.dataTaxPayInfo.concat(JSON.parse(JSON.stringify({ ...sampleDataIncomeWageDaily })))
                dataIncomeWageDaily.value = store.state.common.dataTaxPayInfo[store.state.common.dataTaxPayInfo?.length - 1]
                store.state.common.focusedRowKey = 'PA510'
                // setTimeout(() => {
                //     let a = document.body.querySelectorAll('[aria-rowindex]');
                //     (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
                // }, 100);
            }
        })

        watch(() => store.state.common.actionCopy, (newVal) => {
            setTimeout(() => {
                dataIncomeWageDaily.value.paymentDay = store.state.common.paymentDayCopy
            }, 1000)
        })

        // Watching the store.state.common.resetArrayEmploySelect and when it changes it will reset the
        // arrayEmploySelect.value to [] and then it will do some other stuff.
        watch(() => store.state.common.resetArrayEmploySelect, (newVal) => {
            arrayEmploySelect.value = []
            if (store.state.common.actionAddItem) {
                dataEmployeeWageDailies.value?.map((dataEmployee: any) => {
                    if (!store.state.common.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
                        arrayEmploySelect.value.push(dataEmployee)
                    }
                })
            } else {
                arrayEmploySelect.value = dataEmployeeWageDailies.value
            }
        })

        // ===================FUNCTION==================================
        // A function that is used in a Vue HTML template.
        const funcCheckPrice = (id: any) => {
            let price = 0
            dataIncomeWageDaily.value.deductionItems?.map((e: any) => {
                if (e.itemCode == id)
                    price = e.amount
            })
            return price
        }
        // Calculating the deduction of the employee.
        const actionDedution = () => {
            let dataDefault = dataIncomeWageDaily.value.employee
            let totalPrices = parseInt(dataIncomeWageDaily.value.employee.monthlyPaycheck ?
                dataIncomeWageDaily.value.monthlyWage :
                dataIncomeWageDaily.value.dailyWage * dataIncomeWageDaily.value.workingDays)
            let total1 = dataDefault.nationalPensionDeduction == true ? calculateNationalPensionEmployee(totalPrices, dataDefault.nationalPensionSupportPercent) : 0
            let total2 = calculateHealthInsuranceEmployee(totalPrices)
            let total3 = calculateLongTermCareInsurance(totalPrices)
            let total4 = dataDefault.employeementInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(totalPrices, dataDefault.employeementInsuranceSupportPercent) : 0
            let objectData = Formula.getDailyEmployeeTax(
                parseInt(`${processKey.value.paymentYear}${processKey.value.paymentMonth}`),
                dataIncomeWageDaily.value.workingDays,
                dataIncomeWageDaily.value.dailyWage,
                dataIncomeWageDaily.value.monthlyWage);

            arrDeduction.value?.map((val: any) => {
                val.priceNew = 0
                if (val.deductionItemCode == 1001)
                    val.priceNew = total1
                if (val.deductionItemCode == 1002)
                    val.priceNew = total2
                if (val.deductionItemCode == 1003)
                    val.priceNew = total3
                if (val.deductionItemCode == 1004)
                    val.priceNew = total4
                if (val.deductionItemCode == 1011 && Number.isInteger(objectData.incomeAmount))
                    val.priceNew = objectData.incomeAmount
                if (val.deductionItemCode == 1012 && Number.isInteger(objectData.localIncomeTax))
                    val.priceNew = objectData.localIncomeTax
            })
            modalDeductions.value = true;
        }
        const updateDataDeduction = () => {
            arrDeduction.value?.map((val: any) => {
                if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.deductionItemCode))
                    val.price = val.priceNew
            })
            store.state.common.statusChangeFormPrice = false;
            showErrorButton.value = false;
        }

        const actionInsurance = () => {
            modalInsurance.value = true;
        }
        // A function that is called when the employeeId is changed.
        const onChange = () => {
            if (employeeWageDailyParam.value.employeeId != dataIncomeWageDaily.value.employee.employeeId) {
                employeeWageDailyParam.value.employeeId = dataIncomeWageDaily.value.employee.employeeId;
                employeeWageDailyTrigger.value = true;
            }
        }
        
        const submitForm = () => {
            if (store.state.common.statusChangeFormPrice) {
                store.state.common.focusedRowKey = dataIncomeWageDaily.value?.incomeId
                showErrorButton.value = true;
            } else {
                let arrDeductionItems: any = []
                arrDeduction.value.forEach((value: any) => {
                    arrDeductionItems.push({
                        itemCode: value.itemCode,
                        amount: value.price,
                    })
                })
                let input = {
                    dailyWage: dataIncomeWageDaily.value.employee.monthlyPaycheck ? Math.round(dataIncomeWageDaily.value.monthlyWage / dataIncomeWageDaily.value.workingDays) : dataIncomeWageDaily.value.dailyWage,
                    monthlyWage: dataIncomeWageDaily.value.employee.monthlyPaycheck ? dataIncomeWageDaily.value.monthlyWage : dataIncomeWageDaily.value.dailyWage * dataIncomeWageDaily.value.workingDays,
                    workingDays: dataIncomeWageDaily.value.workingDays,
                    deductionItems: arrDeductionItems,
                }
                if (store.state.common.actionAddItem) {
                    mutateAdd({
                        companyId: companyId,
                        processKey: { ...processKey.value },
                        input: {
                            paymentDay: dataIncomeWageDaily.value.paymentDay,
                            employeeId: dataIncomeWageDaily.value.employee.employeeId,
                            ...input
                        },
                    })
                } else {
                    mutateUpdate({
                        companyId: companyId,
                        processKey: { ...processKey.value },
                        incomeId: dataIncomeWageDaily.value.incomeId,
                        input: input,
                    })
                }
            }
        }
        const showDailyWage = () => {
            let price = Math.round(dataIncomeWageDaily.value.monthlyWage /  dataIncomeWageDaily.value.workingDays)
            dataIncomeWageDaily.value.dailyWage = price ? price : dataIncomeWageDaily.value.dailyWage
            return filters.formatCurrency(dataIncomeWageDaily.value.dailyWage)
            
        }
        const showMonthlyWage = () => {
            let price = dataIncomeWageDaily.value.dailyWage * dataIncomeWageDaily.value.workingDays
            dataIncomeWageDaily.value.monthlyWage = price ? price : dataIncomeWageDaily.value.monthlyWage
            return filters.formatCurrency(dataIncomeWageDaily.value.monthlyWage)
        }
        return {
            dataIncomeWageDaily,
            arrDeduction,
            loadingDeductionItem,
            modalDeductions,
            modalInsurance,
            arrayEmploySelect,
            actionDedution,
            actionInsurance,
            updateDataDeduction,
            totalDeduction,
            onChange,
            loading,
            loadingIncomeWageDaily,
            store,
            countKey,
            submitForm,
            showErrorButton,
            showDailyWage, showMonthlyWage
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" ></style>