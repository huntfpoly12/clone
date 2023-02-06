<template>
    <div id="pa-110">
        <a-spin :spinning="loading || loadingGetEmployeeWage" size="large">
            <a-row class="row-1" :key="countKey">
                <a-col :span="12">
                    <a-form-item label="사원">
                        <EmploySelect :arrayValue="arrayEmploySelect" :disabled="!store.state.common.actionAddItem"
                            :required="true" v-model:valueEmploy="dataIW.employee.employeeId" width="316px"
                            @onChange="onUpdateValue" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="지급일">
                        <number-box width="100px" :min="1" v-model="dataIW.paymentDay" :max="31"
                            :disabled="!store.state.common.actionAddItem" :spinButtons="true" :required="true" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16" :spinning="loadingGetEmployeeWage">

                <a-col :span="14">
                    <div class="header-text-2">요약</div>
                    <div class="summary">
                        <div class="text0 d-flex-center">
                            <span class="w-100">소득수당합계</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="dataIW.totalPayItem" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text1 d-flex-center">
                            <span class="w-100">수당 과세합계</span>
                            <number-box-money :readOnly="true" width="100px"
                                v-model:valueInput="dataIW.totalPayItemTax" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text2 d-flex-center">
                            <span class="w-100">수당 비과세 합계</span>
                            <number-box-money :readOnly="true" width="100px"
                                v-model:valueInput="dataIW.totalPayItemTaxFree" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text d-flex-center">
                            <span class="w-100">공제 합계</span>
                            <number-box-money :readOnly="true" width="100px"
                                v-model:valueInput="dataIW.totalDeduction" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="d-flex-center">
                            <span class="w-100">차인지급액</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="dataIW.subPayment" />
                            <span class="pl-5">원</span>
                            <span class="fz-10 ml-10" style="color: gray; font-weight: 300;">
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                                차인지급액 = 수당 합계 - 공제 합계
                            </span>
                        </div>
                    </div>
                </a-col>
                <a-col :span="10" class="input-items">
                    <div class="header-text-2">근로시간
                        <span class="d-flex-center fz-11 ml-10" style="color: gray;">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            사원별 급여명세서에 표시 됩니다.
                        </span>
                    </div>
                    <a-form-item label="근무일수" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :min="0" width="70px"
                                v-model:valueInput="dataIW.workingDays" /><span style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="총근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :min="0" width="70px"
                                v-model:valueInput="dataIW.totalWorkingHours" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="연장근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :min="0" width="70px"
                                v-model:valueInput="dataIW.overtimeWorkingHours" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="야간근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :min="0" width="70px"
                                v-model:valueInput="dataIW.workingHoursAtNight" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="휴일근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :min="0" width="70px"
                                v-model:valueInput="dataIW.workingHoursOnHolidays" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                </a-col>

            </a-row>
            <div class="header-text-3">급여 / 공제
            </div>
            <a-row :gutter="16">
                <a-col :span="12">
                    <div class="header-text-2">수당 항목 {{ $filters.formatCurrency(dataIW.totalPayItem) }} 원 = {{
                        $filters.formatCurrency(dataIW.totalPayItemTax)
                    }} 과세 + {{
    $filters.formatCurrency(dataIW.totalPayItemTaxFree)
}} 비과세 </div>
                    <a-spin :spinning="loadingConfigPayItems" size="large">
                        <div class="deduction-main">
                            <div v-for="(item) in dataConfigPayItems" :key="item.name" class="custom-deduction">
                                <span>
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                        :name="item.name" :type="1" subName="과세" :width="'130px'" />
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                        :name="item.name" :type="2" subName="상여(과세)" :width="'130px'" />
                                    <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                        :name="item.name" :type="3"
                                        :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" :width="'130px'" />
                                    <deduction-items
                                        v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                        :name="item.name" :type="4" subName="과세" :width="'130px'" />
                                </span>
                                <div>
                                    <number-box-money width="130px" :spinButtons="false" :rtlEnabled="false"
                                        v-model:valueInput="item.amount" :min="0">
                                    </number-box-money>
                                    <span class="pl-5">원</span>
                                </div>
                            </div>
                        </div>
                    </a-spin>
                </a-col>
                <a-col :span="12">
                    <div class="header-text-2">공제 항목 {{ $filters.formatCurrency(dataIW.totalDeduction) }} 원 </div>
                    <a-spin :spinning="loadingConfigDeductions" size="large">
                        <div class="deduction-main">
                            <div v-for="(item, index) in dataConfigDeductions" :key="index" class="custom-deduction">
                                <span>
                                    <!-- <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                        :name="item.name" :type="1" subName="과세" />
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                        :name="item.name" :type="2" subName="상여(과세)" />
                                    <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                        :name="item.name" :type="3"
                                        :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" /> -->
                                    <deduction-items :name="item.name" :width="'130px'" :type="4" subName="과세" />
                                </span>
                                <div>
                                    <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true"
                                        v-model:valueInput="item.amount" :readOnly="true" :min="0">
                                    </number-box-money>
                                    <span class="pl-5">원</span>
                                </div>
                            </div>
                        </div>
                    </a-spin>
                </a-col>
            </a-row>
            <a-row class="mt-20 mb-10">
                <a-col :offset="4" style="text-align: center;">
                    <div class="text-align-center ">
                        <DxButton @click="actionDedution" :text="'공제 재계산'"
                            :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                        <DxButton @click="modalInsurance = true" :text="'4대보험 EDI 조회/적용'"
                            :style="{ color: 'white', backgroundColor: 'gray', margin: '0px 10px' }" :height="'33px'" />
                        <DxButton @click="modalDeteleTaxpay = true" :text="'중도정산 삭제'"
                            :style="{ color: 'white', backgroundColor: 'gray', margin: '0px 10px 0px 0px' }"
                            :height="'33px'" />
                        <DxButton @click="!store.state.common.actionAddItem ? modalDeteleMidTerm = true : ''"
                            :text="'중도정산 반영'" :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                    </div>
                </a-col>
            </a-row>
            <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false"
                :data="dataConfigDeductions" @updateDate="updateDataDeduction" />
            <InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
            <DeletePopupTaxPay :modalStatus="modalDeteleTaxpay" @closePopup="modalDeteleTaxpay = false" />
            <DeletePopupMidTerm :modalStatus="modalDeteleMidTerm" @closePopup="modalDeteleMidTerm = false"
                :data="dataIW" />
        </a-spin>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import {
    companyId,
    calculateNationalPensionEmployee,
    calculateHealthInsuranceEmployee,
    calculateLongTermCareInsurance,
    calculateEmployeementInsuranceEmployee
} from "@/helpers/commonFunction"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index";
import queries from "@/graphql/queries/PA/PA1/PA110/index";
import notification from "@/utils/notification";
import DxButton from "devextreme-vue/button"
import DeductionPopup from "./Popup/DeductionPopup.vue"
import InsurancePopup from "./Popup/InsurancePopup.vue"
import DeletePopupTaxPay from "./Popup/DeletePopupTaxPay.vue"
import DeletePopupMidTerm from "./Popup/DeletePopupMidTerm.vue"
import queries120 from '@/graphql/queries/PA/PA1/PA120/index';
import { sampleDataIncomeWage } from "../utils/index"

export default defineComponent({
    components: {
        DxButton, DeductionPopup, InsurancePopup, DeletePopupTaxPay, DeletePopupMidTerm
    },
    props: {
        modalStatus: Boolean,
    },
    setup(props, { emit }) {
        const store = useStore();
        const processKey = computed(() => store.state.common.processKeyPA110)
        const globalYear = computed(() => store.state.settings.globalYear);
        const arrayEmploySelect: any = ref([])
        let modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const modalDeteleTaxpay = ref<boolean>(false)
        const modalDeteleMidTerm = ref<boolean>(false)
        const triggerDetail = ref<boolean>(false);
        const triggerCalcIncome = ref<boolean>(false);
        const employeeWageTrigger = ref<boolean>(false);

        const dataIW: any = ref(JSON.parse(JSON.stringify({ ...sampleDataIncomeWage })))

        const dataConfigPayItems: any = ref([]);
        const dataConfigDeductions: any = ref([]);
        const dataEmployeeWageDailies: any = ref([])

        const countKey: any = ref(0)
        const originDataEmployeeWage = {
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: null,
        }
        const calculateVariables = {
            companyId: companyId,
            imputedYear: globalYear.value,
            totalTaxPay: 0,
            dependentCount: 1
        }
        const originData = reactive({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const incomeWageParams = reactive({
            companyId: companyId,
            processKey: { ...processKey.value },
            incomeId: 0
        })

        // ============ GRAPQL ===============================
        // get employeewage
        const { loading: loadingEmployeeWage, onResult: resEmployeeWage } = useQuery(queries.getEmployeeWages, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        const { refetch: refetchConfigPayItems, onResult: resConfigPayItems, loading: loadingConfigPayItems } = useQuery(queries.getWithholdingConfigPayItems, originData, () => ({
            // enabled: triggerConfigPayItems.value,
            fetchPolicy: "no-cache",
        }))
        const {
            onResult: resConfigDeductions,
            loading: loadingConfigDeductions,
            refetch: refetchConfigDeduction,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            // enabled: triggerConfigDeductions.value,
            fetchPolicy: "no-cache",
        }))
        const {
            refetch: refetchValueDetail, result, loading
        } = useQuery(queries.getIncomeWage, incomeWageParams, () => ({
            fetchPolicy: "no-cache",
            enabled: triggerDetail.value,
        }))
        const {
            result: resCalcIncomeWageTax,
            onError: onIncomeWageTaxError
        } = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
            enabled: triggerCalcIncome.value,
            fetchPolicy: "no-cache",
        }))
        // API EDIT
        const {
            mutate: actionUpdate,
            onError: actionUpdateErr,
            onDone: actionUpdateDone,
        } = useMutation(mutations.updateIncomeWage);
        const {
            mutate: actionCreated,
            onError: errorCreated,
            onDone: doneCreated,
        } = useMutation(mutations.createIncomeWage);
        const { refetch: refetchEmployeeWage, result: resultEmployeeWage, loading: loadingGetEmployeeWage, } = useQuery(queries120.getEmployeeWage,
            originDataEmployeeWage, () => ({
                fetchPolicy: 'no-cache',
                enabled: employeeWageTrigger.value,
            })
        );

        // ===================DONE GRAPQL==================================
        resEmployeeWage(value => {
            dataEmployeeWageDailies.value = value.data.getEmployeeWages
            if (store.state.common.actionAddItem) {
                dataEmployeeWageDailies.value.map((dataEmployee: any) => {
                    if (!store.state.common.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
                        arrayEmploySelect.value.push(dataEmployee)
                    }
                })
            } else {
                arrayEmploySelect.value = dataEmployeeWageDailies.value
            }
        })
        resConfigPayItems(value => {
            if (value) {
                dataConfigPayItems.value = []
                value.data.getWithholdingConfigPayItems.map((item: any) => {
                    dataConfigPayItems.value.push({
                        itemCode: item.itemCode,
                        name: item.name,
                        amount: 0,
                        taxPayItemCode: item.taxPayItemCode,
                        taxfreePayItemCode: item.taxfreePayItemCode,
                        taxfreePayItemName: item.taxfreePayItemName,
                        taxFreeIncludeSubmission: item.taxFreeIncludeSubmission,
                    })
                });
            }
        });
        resConfigDeductions(value => {
            if (value) {
                dataConfigDeductions.value = []
                value.data.getWithholdingConfigDeductionItems.map((item: any) => {
                    if ([1001, 1002, 1003, 1004, 1011, 1012].includes(item.itemCode)) {
                        let amount = 0
                        dataIW.value.deductionItems.map((e: any) => {
                            if (e.itemCode == item.itemCode)
                                amount = e.amount
                        })
                        dataConfigDeductions.value.push({
                            itemCode: item.itemCode,
                            name: item.name,
                            amount: amount
                        })
                    }
                });
            }
        });
        onIncomeWageTaxError(e => {
            notification('error', e.message)
        })
        actionUpdateErr(e => {
            notification('error', e.message)
        })
        actionUpdateDone(res => {
            store.state.common.loadingTableInfo++
            triggerDetail.value = true;
            notification('success', '업데이트 완료!')
        })
        doneCreated(res => {
            store.state.common.actionAddItem = false;
            store.state.common.employeeId = dataIW.value.employee.employeeId
            store.state.common.loadingTableInfo++
            notification('success', `업데이트 완료!`)
        })

        errorCreated(res => {
            store.state.common.loadingTableInfo++
            notification('error', res.message)
        })

        // ===================WATCH==================================
        watch(() => dataConfigDeductions.value, (value) => {
            calculateTax();
        }, { deep: true })
        watch(() => dataConfigPayItems.value, (value) => {
            calculateTax();
        }, { deep: true })

        watch(() => store.state.common.incomeId, (value) => {
            if (value) {
                incomeWageParams.incomeId = value
                triggerDetail.value = true;
            } else {
                dataConfigDeductions.value.map((data: any) => {
                    data.amount = 0
                })
                dataConfigPayItems.value.map((data: any) => {
                    data.amount = 0
                })
                dataIW.value = JSON.parse(JSON.stringify({ ...sampleDataIncomeWage }))
            }
        })
        watch(() => store.state.common.statusRowAdd, (newVal) => {
            if (!newVal) {
                store.state.common.dataTaxPayInfo = JSON.parse(JSON.stringify(store.state.common.dataTaxPayInfo)).concat({ ...sampleDataIncomeWage })
                dataIW.value = store.state.common.dataTaxPayInfo[store.state.common.dataTaxPayInfo.length - 1]
                setTimeout(() => {
                    let a = document.body.querySelectorAll('[aria-rowindex]');
                    (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
                }, 100);
            } else {

            }
        })

        watch(() => store.state.common.actionAddItem, (value) => {
            if (value) {
                countKey.value++;
                dataIW.value = JSON.parse(JSON.stringify({ ...sampleDataIncomeWage }))
                dataConfigDeductions.value.map((data: any) => {
                    data.amount = 0
                })
                dataConfigPayItems.value.map((data: any) => {
                    data.amount = 0
                })
                arrayEmploySelect.value = []
                dataEmployeeWageDailies.value.map((dataEmployee: any) => {
                    if (!store.state.common.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
                        arrayEmploySelect.value.push(dataEmployee)
                    }
                })
            } else {
                arrayEmploySelect.value = dataEmployeeWageDailies.value
            }
        })
        watch(() => dataIW.value, (value) => {
            if (JSON.stringify(store.state.common.dataRowOld) !== JSON.stringify(dataIW.value) && !store.state.common.actionAddItem && store.state.common.dataRowOld) {
                store.state.common.statusChangeFormEdit = true
                console.log(1);
            } else {
                store.state.common.statusChangeFormEdit = false
            }
            if (JSON.stringify({ ...sampleDataIncomeWage }) !== JSON.stringify(dataIW.value)) {
                store.state.common.statusChangeFormAdd = true
                if (!store.state.common.statusRowAdd) {
                    console.log(2);
                    store.state.common.statusChangeFormEdit = true
                }
            } else {
                store.state.common.statusChangeFormAdd = false
            }
            if (!store.state.common.statusRowAdd) {
                store.state.common.dataTaxPayInfo[store.state.common.dataTaxPayInfo.length - 1] = dataIW.value
                store.state.common.focusedRowKey = dataIW.value?.employee.employeeId
            }

        }, { deep: true })
        watch(() => store.state.common.actionSubmit, () => {
            submitForm();
        })

        watch(result, (value) => {
            triggerDetail.value = false;
            let data = value.getIncomeWage
            if (data) {
                dataIW.value.employee.employeeId = data.employee.employeeId
                dataIW.value.paymentDay = data.paymentDay
                dataIW.value.workingDays = data.workingDays
                
                dataIW.value.totalWorkingHours = data.totalWorkingHours
                dataIW.value.overtimeWorkingHours = data.overtimeWorkingHours
                dataIW.value.workingHoursAtNight = data.workingHoursAtNight
                dataIW.value.workingHoursOnHolidays = data.workingHoursOnHolidays
                dataConfigPayItems.value?.map((data: any) => {
                    data.amount = 0
                })
                data.payItems?.map((item: any) => {
                    dataIW.value.payItems.push({itemCode: item.itemCode, amount:item.amount})
                    dataConfigPayItems.value?.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.amount = item.amount;
                        }
                    });
                })

                dataConfigDeductions.value?.map((data: any) => {
                    data.amount = 0
                })
                data.deductionItems?.map((item: any) => {
                    dataIW.value.deductionItems.push({itemCode: item.itemCode, amount:item.amount})
                    dataConfigDeductions.value.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.amount = item.amount;
                        }
                    });
                })
                originDataEmployeeWage.employeeId = data.employee.employeeId
                employeeWageTrigger.value = true;
                calculateTax();
                store.state.common.dataRowOld = { ...dataIW.value }
                setTimeout(() => {
                    store.state.common.statusChangeFormEdit = false;
                }, 500);
            }
        })
        watch(resCalcIncomeWageTax, (value) => {
            triggerCalcIncome.value = false
            if (value) {
                dataConfigDeductions.value.find((item: any) => item.itemCode == 1011).amountNew = value.calculateIncomeWageTax
                dataConfigDeductions.value.find((item: any) => item.itemCode == 1012).amountNew = Math.floor(value.calculateIncomeWageTax/10)*10
            }
        })

        watch(resultEmployeeWage, (newVal: any) => {
            employeeWageTrigger.value = false;
            if (store.state.common.actionAddItem) {
                if (newVal.getEmployeeWage.payItems) {
                    dataConfigPayItems.value.map((data: any) => {
                        data.amount = 0
                    })
                    newVal.getEmployeeWage.payItems.map((item: any) => {
                        dataConfigPayItems.value.find((Obj: any) => {
                            if (item.itemCode == Obj.itemCode) {
                                Obj.amount = item.amount;
                            }
                        });
                    })
                    dataConfigDeductions.value.map((data: any) => {
                        data.amount = 0
                    })
                    newVal.getEmployeeWage.deductionItems.map((item: any) => {
                        dataConfigDeductions.value.find((Obj: any) => {
                            if (item.itemCode == Obj.itemCode) {
                                Obj.amount = item.amount;
                            }
                        });
                    })
                    calculateTax();
                }
            }
            calculateVariables.dependentCount = newVal.getEmployeeWage.deductionDependentCount
            
        })
        //  Calculate Pension Employee 
        const calculateTax = () => {
            dataIW.value.payItems = dataConfigPayItems.value?.map((item: any) => {
                return {
                    itemCode: item.itemCode,
                    amount: item.amount
                }
            });
            dataIW.value.totalPayItem = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                return accumulator + object.amount;
            }, 0);

            dataIW.value.totalPayItemTax = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                if (object.taxfreePayItemCode) {
                    accumulator += object.amount
                }
                return accumulator;
            }, 0);
            dataIW.value.totalPayItemTaxFree = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                if (!object.taxfreePayItemCode) {
                    accumulator += object.amount
                }
                return accumulator;
            }, 0);
            dataIW.value.totalDeduction = dataConfigDeductions.value?.reduce((accumulator: any, object: any) => {
                return accumulator + object.amount;
            }, 0);
            dataIW.value.subPayment = dataIW.value.totalPayItem - dataIW.value.totalDeduction
        }
        const submitForm = () => {
            const variables: any = {
                companyId: companyId,
                processKey: { ...processKey.value },
                incomeId: store.state.common.incomeId,
                input: {
                    workingDays: dataIW.value.workingDays,
                    totalWorkingHours: dataIW.value.totalWorkingHours,
                    overtimeWorkingHours: dataIW.value.overtimeWorkingHours,
                    workingHoursAtNight: dataIW.value.workingHoursAtNight,
                    workingHoursOnHolidays: dataIW.value.workingHoursOnHolidays,
                    payItems: dataIW.value.payItems,
                    deductionItems: dataIW.value.deductionItems,
                }
            };
            if (store.state.common.actionAddItem) {
                variables.input.employeeId = dataIW.value.employee.employeeId,
                variables.input.paymentDay = dataIW.value.paymentDay,
                actionCreated(variables)
            } else {
                actionUpdate(variables)
            }
        }
        // open popup deduction
        const actionDedution = () => {
            dataConfigDeductions.value?.map((item: any) => {
                if (item.itemCode == 1001) {
                    let total1 = calculateNationalPensionEmployee(dataIW.value.totalPayItem) ?? 0
                    item.amountNew = total1
                }
                if (item.itemCode == 1002) {
                    let total2 = calculateHealthInsuranceEmployee(dataIW.value.totalPayItem) ?? 0
                    item.amountNew = total2
                }
                if (item.itemCode == 1003) {
                    let total3 = calculateLongTermCareInsurance(dataIW.value.totalPayItem) ?? 0
                    item.amountNew = total3
                }
                if (item.itemCode == 1004) {
                    let total4 = calculateEmployeementInsuranceEmployee(dataIW.value.totalPayItem) ?? 0
                    item.amountNew = total4
                }
                calculateVariables.totalTaxPay = dataIW.value.totalPayItemTax
                triggerCalcIncome.value = true
            })
            modalDeductions.value = true
        }
        const updateDataDeduction = () => {
            console.log(dataIW.value.deductionItems);
            
            dataConfigDeductions.value.forEach((val: any, index: number) => {
                if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode))
                    val.amount = val.amountNew
                    dataIW.value.deductionItems[index] = {amount: val.amountNew, itemCode: val.itemCode}
            })
        }

        const onUpdateValue = (employeeId: any) => {
            originDataEmployeeWage.employeeId = employeeId
            employeeWageTrigger.value = true;
        }

        return {
            loadingConfigPayItems, loadingConfigDeductions, loading,
            modalDeductions, globalYear,
            modalInsurance, modalDeteleTaxpay, modalDeteleMidTerm,
            dataIW,
            arrayEmploySelect,
            calculateTax,
            loadingEmployeeWage,
            actionUpdate,
            actionDedution, onUpdateValue,
            companyId, dataConfigPayItems, dataConfigDeductions,
            store,
            countKey,
            loadingGetEmployeeWage,
            updateDataDeduction,
        };
    },
});
</script>
<style lang="scss" scoped src="../style/styleForm.scss">

</style>
