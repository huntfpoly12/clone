<template>
    <div id="pa-110">
        <a-spin :spinning="loading" size="large">
            <a-row class="row-1">
                <a-col :span="12">
                    <a-form-item label="사원">
                        <EmploySelect :arrayValue="arrayEmploySelect" :disabled="!store.state.common.actionAddItem" :required="true"
                            v-model:valueEmploy="dataIW.employee.employeeId" width="316px" @onChange="onUpdateValue" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="지급일">
                        <number-box width="100px" :min="1" v-model="dataIW.paymentDay" :max="31"
                            :disabled="!store.state.common.actionAddItem" :spinButtons="true" :required="true" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="14">
                    <div class="header-text-2">요약</div>
                    <div class="summary">
                        <div class="text0 d-flex-center">
                            <span class="w-100">소득수당합계</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="totalPayItem" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text1 d-flex-center">
                            <span class="w-100">수당 과세합계</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="totalPayItemTax" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text2 d-flex-center">
                            <span class="w-100">수당 비과세 합계</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="totalPayItemTaxFree" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="text d-flex-center">
                            <span class="w-100">공제 합계</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="totalDeduction" />
                            <span class="pl-5">원</span>
                        </div>
                        <div class="d-flex-center">
                            <span class="w-100">차인지급액</span>
                            <number-box-money :readOnly="true" width="100px" v-model:valueInput="subPayment" />
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
                            <number-box :spinButtons="true" :max="31" :min="0" width="70px"
                                v-model:valueInput="dataIW.workingDays" /><span style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="총근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :max="999" :min="0" width="70px"
                                v-model:valueInput="dataIW.totalWorkingHours" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="연장근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :max="999" :min="0" width="70px"
                                v-model:valueInput="dataIW.overtimeWorkingHours" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="야간근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :max="999" :min="0" width="70px"
                                v-model:valueInput="dataIW.workingHoursAtNight" /><span
                                style="padding-left: 5px;">시간</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="휴일근로시간" label-align="right">
                        <div style="display: flex;align-items: center;">
                            <number-box :spinButtons="true" :max="999" :min="0" width="70px"
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
                    <div class="header-text-2">수당 항목 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세 + 비과세 </div>
                    <a-spin :spinning="loadingConfigPayItems" size="large">
                        <div class="deduction-main">
                            <div v-for="(item) in dataConfigPayItems" :key="item.name" class="custom-deduction">
                                <span>
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                        :name="item.name" :type="1" subName="과세" />
                                    <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                        :name="item.name" :type="2" subName="상여(과세)" />
                                    <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                        :name="item.name" :type="3"
                                        :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                    <deduction-items
                                        v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                        :name="item.name" :type="4" subName="과세" />
                                </span>
                                <div>
                                    <number-box-money width="130px" :spinButtons="false" :rtlEnabled="false"
                                        v-model:valueInput="item.value" :min="0">
                                    </number-box-money>
                                    <span class="pl-5">원</span>
                                </div>
                            </div>
                        </div>
                    </a-spin>
                </a-col>
                <a-col :span="12">
                    <div class="header-text-2">공제 항목 {{ $filters.formatCurrency(totalDeduction) }}원 </div>
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
                                    <deduction-items :name="item.name" :type="4" subName="과세" />
                                </span>
                                <div>
                                    <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true"
                                        v-model:valueInput="item.price" :readOnly="true" :min="0">
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
                        <DxButton @click="popupCompareData" :text="'공제 재계산'"
                            :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                        <DxButton @click="modalInsurance = true" :text="'4대보험 EDI 조회/적용'"
                            :style="{ color: 'white', backgroundColor: 'gray', margin: '0px 10px' }" :height="'33px'" />
                        <DxButton @click="modalDeteleMidTerm = true" :text="'중도정산 삭제'"
                            :style="{ color: 'white', backgroundColor: 'gray', margin: '0px 10px 0px 0px' }"
                            :height="'33px'" />
                        <DxButton @click="modalDeteleTaxpay = true" :text="'중도정산 반영'"
                            :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                    </div>
                </a-col>
            </a-row>
            <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false"
                :data="dataConfigDeductions" @updateCaculate="calculateTax" />
            <InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
            <DeletePopupTaxPay :modalStatus="modalDeteleTaxpay" @closePopup="modalDeteleTaxpay = false" />
            <DeletePopupMidTerm :modalStatus="modalDeteleMidTerm" @closePopup="modalDeteleMidTerm = false" />
        </a-spin>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
    initFormState1,
    initFormState2,
} from "../utils/index";
import dayjs from 'dayjs';
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

export default defineComponent({
    components: {
        DxButton, DeductionPopup, InsurancePopup, DeletePopupTaxPay, DeletePopupMidTerm
    },
    props: {
        dataIncomeWage: {
            type: Object,
            default: []
        },
        // actionUpdateItem: {
        //     type: Number,
        //     default: 0
        // },
        // actionAddItem: {
        //     type: Boolean,
        //     default: false
        // },
        // actionSaveItem: {
        //     type: Number,
        //     default: 0
        // },
        modalStatus: Boolean,
        keyForm: Number,
    },
    setup(props, { emit }) {
        const arrayEmploySelect: any = ref([])
        let totalPayItemTaxFree = ref(0);
        let totalPayItemTax = ref(0);
        let totalPayItem = ref(0);
        let modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const modalDeteleTaxpay = ref<boolean>(false)
        const modalDeteleMidTerm = ref<boolean>(false)
        const dependentCount = ref(0);
        const totalDeduction = ref(0);
        let switchAction = ref<boolean>(false)
        // let month1: any = ref(dayjs().format("YYYY-MM"))
        // let month2: any = ref(dayjs().format("YYYY-MM"))
        const subPayment = computed(() => totalPayItem.value - totalDeduction.value);
        const dataIW: any = ref({ ...props.dataIncomeWage })
        const processKey = computed(() => store.state.common.processKeyPA110)
        const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);
        const store = useStore();
        const dataConfigPayItems = ref();
        const dataConfigDeductions: any = ref([]);

        const triggerConfigPayItems = ref<boolean>(false);
        const triggerConfigDeductions = ref<boolean>(false);
        const triggerDetail = ref<boolean>(false);
        const triggerCalcIncome = ref<boolean>(false);
        const employeeIdPA120 = ref(1);
        const employeeWageTrigger = ref<boolean>(false);
        const globalYear = computed(() => store.state.settings.globalYear);
        let formState2 = reactive<any>({
            ...initFormState2,
        });

        const arrDeduction: any = ref()
        const calculateVariables = {
            companyId: companyId,
            imputedYear: globalYear.value,
            totalTaxPay: totalPayItem.value,
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
            enabled: triggerConfigPayItems.value,
            fetchPolicy: "no-cache",
        }))
        const {
            onResult: resConfigDeductions,
            loading: loadingConfigDeductions,
            refetch: refetchConfigDeduction,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            enabled: triggerConfigDeductions.value,
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
            loading: loading3,
            refetch: refetchCalcIncomeWageTax,
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
        const { refetch: refetchEmployeeWage, result: resultEmployeeWage } = useQuery(queries120.getEmployeeWage,
            {
                companyId: companyId,
                imputedYear: globalYear.value,
                employeeId: employeeIdPA120.value,
            },
            () => ({
                fetchPolicy: 'no-cache',
                enabled: employeeWageTrigger.value,
            })
        );

        // ===================DONE GRAPQL==================================
        resEmployeeWage(value => {
            arrayEmploySelect.value = value.data.getEmployeeWages
        })
        resConfigPayItems(value => {
            if (value) {
                dataConfigPayItems.value = []
                dataConfigPayItems.value = value.data.getWithholdingConfigPayItems.map((item: any) => {
                    return {
                        itemCode: item.itemCode,
                        name: item.name,
                        taxPayItemCode: item.taxPayItemCode,
                        taxfreePayItemCode: item.taxfreePayItemCode,
                        taxfreePayItemName: item.taxfreePayItemName,
                        taxFreeIncludeSubmission: item.taxFreeIncludeSubmission,
                        value: 0
                    }
                });
            }
        });
        resConfigDeductions(value => {
            if (value) {
                dataConfigDeductions.value = []
                value.data.getWithholdingConfigDeductionItems.map((item: any) => {
                    if ([1001, 1002, 1003, 1004, 1011, 1012].includes(item.itemCode)) {
                        let price = 0
                        dataIW.value.deductionItems.map((e: any) => {
                            if (e.itemCode == item.itemCode)
                                price = e.amount
                        })
                        dataConfigDeductions.value.push({
                            itemCode: item.itemCode,
                            name: item.name,
                            price: price
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
            // emit("loadingTableInfo", dataIW.value.employee.employeeId)
            // emit('closePopup', false)
            notification('success', '업데이트 완료!')
        })
        doneCreated(res => {
            store.state.common.loadingTableInfo++
            // emit("loadingTableInfo", dataIW.value.employee.employeeId)
            notification('success', `업데이트 완료!`)
        })

        errorCreated(res => {
            store.state.common.loadingTableInfo++
            // emit("loadingTableInfo", dataIW.value.employee.employeeId)
            notification('error', res.message)
        })

        // ===================WATCH==================================
        watch(() => props.dataIncomeWage, (value) => {
            if (value?.incomeId) {
                incomeWageParams.incomeId = value.incomeId;
                triggerDetail.value = true;
                // refetchValueDetail();
                dataIW.value = value
                // refetchConfigPayItems()
                triggerConfigPayItems.value = true;
                // refetchConfigDeduction()
                triggerConfigDeductions.value = true;
            } else {
                addRow()
            }
        })
        watch(() => props.dataIncomeWage, (newVal: any) => {
            if (newVal?.incomeId) {
                incomeWageParams.incomeId = newVal.incomeId;
                triggerDetail.value = true;
                // refetchValueDetail();
            }
        })
        // watch(() => props.actionAddItem, (value) => {
        //     if (value) {
        //         switchAction.value = true
        //     }
        // })
        // action update
        // watch(() => props.actionUpdateItem, () => {
        //     updateIncomeWage()
        // })
        // watch(() => props.actionSaveItem, () => {
        //     calculateTax()
        //     // refetchConfigPayItems()
        //     triggerConfigPayItems.value = true;
        //     // refetchConfigDeduction()
        //     triggerConfigDeductions.value = true;
        //     // createWage()

        // })
        watch(() => store.state.common.actionSubmit, () => {
            updateIncomeWage()
        })
        


        watch(result, (value) => {
            if (value?.getIncomeWage?.payItems) {
                value.getIncomeWage.payItems.map((item: any) => {
                    dataConfigPayItems.value.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.value = item.amount;
                        }
                    });
                })
                value.getIncomeWage.deductionItems.map((item: any) => {
                    dataConfigDeductions.value.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.value = item.amount;
                        }
                    });
                })
                calculateTax();
            }
            triggerDetail.value = false;
        })
        watch(resCalcIncomeWageTax, (value) => {
            if (value) {
                dataConfigDeductions.value?.map((item: any) => {
                    if (item.itemCode == 1011) {
                        item.value = value.calculateIncomeWageTax
                        formState2.deductionItems[4] = {
                            itemCode: 1001,
                            amount: value.calculateIncomeWageTax
                        }
                    }
                })
            }
        })
        watch(totalPayItem, (newValue) => {
            if (newValue != 0) {
                triggerCalcIncome.value = true;
                refetchCalcIncomeWageTax({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    totalTaxPay: newValue,
                    dependentCount: dependentCount.value
                })
            }
        })

        watch(resultEmployeeWage, (newVal: any) => {
            if (newVal.getEmployeeWage.payItems) {
                newVal.getEmployeeWage.payItems.map((item: any) => {
                    dataConfigPayItems.value.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.value = item.amount;
                        }
                    });
                })
                newVal.getEmployeeWage.deductionItems.map((item: any) => {
                    dataConfigDeductions.value.find((Obj: any) => {
                        if (item.itemCode == Obj.itemCode) {
                            Obj.value = item.amount;
                        }
                    });
                })
                // calculateTax();
            }
            // resultEmployeeWage
        })
        watch(() => props.keyForm, () => {
            addRow();
        }, { deep: true })

        // ===================FUNCTION==================================
        // const funcCheckPrice = (id: any) => {
        //     let price = 0
        //     dataIW.value.deductionItems.map((e: any) => {
        //         if (e.itemCode == id)
        //             price = e.amount
        //     })
        //     return price
        // }
        //  Calculate Pension Employee 
        const calculateTax = () => {
            dataConfigDeductions.value?.map((item: any) => {
                if (item.itemCode == 1001) {
                    let total1 = formState2.nationalPensionDeduction ? calculateNationalPensionEmployee(totalPayItem.value, formState2.nationalPensionSupportPercent) : 0
                    item.value = total1
                    formState2.deductionItems[0] = {
                        itemCode: 1001,
                        amount: total1
                    }
                }
                if (item.itemCode == 1002) {
                    let total2 = calculateHealthInsuranceEmployee(totalPayItem.value)
                    item.value = total2
                    formState2.deductionItems[1] = {
                        itemCode: 1002,
                        amount: total2
                    }
                }
                if (item.itemCode == 1003) {
                    let total3 = calculateLongTermCareInsurance(totalPayItem.value)
                    item.value = total3
                    formState2.deductionItems[2] = {
                        itemCode: 1003,
                        amount: total3
                    }
                }
                if (item.itemCode == 1004) {
                    let total4 = formState2.employeementInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(totalPayItem.value, formState2.employeementInsuranceSupportPercent) : 0
                    item.value = total4
                    formState2.deductionItems[3] = {
                        itemCode: 1004,
                        amount: total4
                    }
                }
            })
            formState2.payItems = dataConfigPayItems.value?.map((item: any) => {
                return {
                    itemCode: item.itemCode,
                    amount: item.value
                }
            });
            totalPayItem.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                return accumulator + object.value;
            }, 0);
            totalPayItemTax.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                if (object.tax) {
                    accumulator += object.value
                }
                return accumulator;
            }, 0);
            totalPayItemTaxFree.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
                if (!object.tax) {
                    accumulator += object.value
                }
                return accumulator;
            }, 0);
            totalDeduction.value = dataConfigDeductions.value?.reduce((accumulator: any, object: any) => {
                return accumulator + object.price;
            }, 0);

        }

        // refresh value
        const addRow = () => {
            dataIW.value = { ...initFormState1 };
            dataIW.value.employee.employeeId = null;
            dataConfigDeductions.value = dataConfigDeductions.value?.map((item: any) => {
                return { ...item, value: 0 };
            })
            dataConfigPayItems.value = dataConfigPayItems.value?.map((data: any) => {
                return { ...data, value: 0 };
            })
            totalPayItem.value = 0;
            totalPayItemTax.value = 0;
            totalPayItemTaxFree.value = 0;
            totalDeduction.value = 0;
            // calculateTax()
            // emit('updateData', true)
        }
        // action update
        const updateIncomeWage = () => {
            const variables = {
                companyId: companyId,
                processKey: { ...processKey.value },
                incomeId: props.dataIncomeWage.incomeId,
                input: {
                    workingDays: dataIW.value.workingDays,
                    totalWorkingHours: dataIW.value.totalWorkingHours,
                    overtimeWorkingHours: dataIW.value.overtimeWorkingHours,
                    workingHoursAtNight: dataIW.value.workingHoursAtNight,
                    workingHoursOnHolidays: dataIW.value.workingHoursOnHolidays,
                    payItems: formState2.payItems,
                    deductionItems: formState2.deductionItems,
                }
            };
            switchAction.value = false
            actionUpdate(variables)
        }
        // create wage
        // const createWage = () => {
        //     const variables = {
        //         companyId: companyId,
        //         processKey: { ...processKey.value },
        //         incomeId: props.dataIncomeWage.incomeId,
        //         input: {
        //             workingDays: dataIW.value.workingDays,
        //             totalWorkingHours: dataIW.value.totalWorkingHours,
        //             overtimeWorkingHours: dataIW.value.overtimeWorkingHours,
        //             workingHoursAtNight: dataIW.value.workingHoursAtNight,
        //             workingHoursOnHolidays: dataIW.value.workingHoursOnHolidays,
        //             paymentDay: dataIW.value.paymentDay,
        //             employeeId: dataIW.value.employee.employeeId,
        //             payItems: formState2.payItems,
        //             deductionItems: formState2.deductionItems
        //         }
        //     };
        //     actionCreated(variables)
        // }

        // open popup deduction
        const popupCompareData = () => {
            modalDeductions.value = true
        }
        // update data deduction
        // const calculate = () => {
        //     calculateTax()
        // }

        const onUpdateValue = (e: any) => {
            employeeIdPA120.value = e;
            employeeWageTrigger.value = true;
            refetchEmployeeWage();
        }

        return {
            // formState2, 
            loadingConfigPayItems, loadingConfigDeductions, loading,
            rangeDate, modalDeductions, globalYear,
            modalInsurance, modalDeteleTaxpay, modalDeteleMidTerm,
            totalPayItem, totalPayItemTaxFree, totalPayItemTax,
            totalDeduction, dataIW,
            subPayment, arrayEmploySelect,
            calculateTax,
            loadingEmployeeWage, arrDeduction,
            updateIncomeWage, actionUpdate,
            // calculate, 
            // createWage, 
            popupCompareData, onUpdateValue,
            companyId, dataConfigPayItems, dataConfigDeductions,
            // month1, month2,
            addRow, store
        };
    },
});
</script>
<style lang="scss" scoped src="../style/styleForm.scss">

</style>
