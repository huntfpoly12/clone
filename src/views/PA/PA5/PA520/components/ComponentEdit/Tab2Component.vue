<template>
    <div id="tab2-pa520">
        <div class="header-text-1">공제</div>
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
                    <div class="d-flex-center">
                        <checkbox-basic size="14px" label="국민연금" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.nationalPensionDeduction" />
                        <checkbox-basic size="14px" label="건강보험" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.healthInsuranceDeduction" />
                        <checkbox-basic size="14px" label="고용보험" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.employeementInsuranceDeduction" />
                        <div class="pr-5 pl-10">
                            <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                        </div>
                        <span class="fz-11">본 항목은 공제 계산을 위한 설정으로 실제 4대보험 <br> 신고 여부와는 무관합니다.
                        </span>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2">두루누리사회보험 공제</div>
                <a-form-item label="두루누리사회보험 공제 여부" label-align="right" class="durunuri-insurance">
                    <switch-basic textCheck="Y" textUnCheck="N"
                        v-model:valueSwitch="originDataUpdate.input.insuranceSupport" class="switch-insurance" />
                </a-form-item>
                <a-form-item label="국민연금 적용율" label-align="right" class="custom-style-label">
                    <radio-group :arrayValue="radioCheckPersenPension"
                        v-model:valueRadioCheck="originDataUpdate.input.nationalPensionSupportPercent"
                        layoutCustom="horizontal" />
                </a-form-item>
                <a-form-item label="고용보험 적용율" label-align="right" class="custom-style-label">
                    <radio-group :arrayValue="radioCheckPersenPension"
                        v-model:valueRadioCheck="originDataUpdate.input.employeementInsuranceSupportPercent"
                        layoutCustom="horizontal" />
                </a-form-item>
            </a-col>
        </a-row>
        <div class="header-text-3">급여 (기본값)
            <span>
                <img src="@/assets/images/iconInfoWrite.png" style="width: 16px;">
                <p>급여소득자료 입력시 본 급여 기본값을 불러옵니다</p>
            </span>
        </div>
        <a-row :gutter="16">
            <a-col :span="24"><b class="fz-20">차인지급액</b>
                <b>{
                    {{ originDataUpdate.input.monthlyPaycheck == true ?
                            $filters.formatCurrency(totalDeduction + (originDataUpdate.input.monthlyWage *
                                originDataUpdate.input.workingDays)) : $filters.formatCurrency(totalDeduction +
                                    (originDataUpdate.input.monthlyWage))
                    }} }</b>
                원
            </a-col>
            <a-col :span="12">
                <div class="header-text-0">월급여
                    <span class="fz-12">
                        {
                        {{ originDataUpdate.input.monthlyPaycheck == true ?
                                $filters.formatCurrency(originDataUpdate.input.monthlyWage *
                                    originDataUpdate.input.workingDays) :
                                $filters.formatCurrency(originDataUpdate.input.monthlyWage)
                        }}
                        }
                    </span>
                </div>
                <div>
                    <a-form-item label="일급/월급">
                        <div class="d-flex-center">
                            <switch-basic textCheck="일급" textUnCheck="월급" class="mr-10"
                                v-model:valueSwitch="originDataUpdate.input.monthlyPaycheck" />
                            <number-box-money :min="0" width="200px" class="mr-5"
                                v-model:valueInput="originDataUpdate.input.monthlyWage"
                                :placeholder="originDataUpdate.input.monthlyPaycheck == false ? '일급여' : '월급여'" />
                        </div>
                    </a-form-item>
                    <div class="pl-10">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                        <span class="pl-5 fz-11">
                            {{ messageMonthlySalary }}
                        </span>
                    </div>
                    <a-form-item label="근무일수">
                        <div class="d-flex-center">
                            <number-box-money width="200px" class="mr-5" :min="0"
                                v-model:valueInput="originDataUpdate.input.workingDays" />
                            <span class="ml-10">일</span>
                        </div>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="header-text-0">공제 항목 <span class="fz-12">{ {{ $filters.formatCurrency(totalDeduction) }}
                        }원</span></div>
                <a-spin :spinning="loading" size="large">
                    <div class="deduction-main">
                        <div v-for="(item, index) in arrDeduction" class="custom-deduction" :key="index">
                            <span>
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                    :name="item.name" :type="1" subName="과세" />
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                    :name="item.name" :type="2" subName="상여(과세)" />
                                <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                    :name="item.name" :type="3"
                                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                    :name="item.name" :type="4" subName="과세" />
                            </span>
                            <div>
                                <number-box-money :min="0" width="150px" :spinButtons="false"
                                    v-model:valueInput="item.price" :disabled="true" />
                                <span class="pl-5">원</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </a-col>
        </a-row>
        <div class="button-action">
            <button-basic text="공제계산" type="default" mode="contained" @onClick="callFuncCalculate" />
            <button-basic text="저장" type="default" mode="contained" class="ml-5" @onClick="updateDeduction" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { radioCheckPersenPension, originDataInputUpdate } from "../../utils/index";
import dayjs from 'dayjs';
import { useQuery, useMutation } from "@vue/apollo-composable"
import { useStore } from 'vuex';
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from "@/helpers/commonFunction"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import notification from "@/utils/notification";  
export default defineComponent({
    props: {
        modalStatus: Boolean,
        idRowEdit: Number
    },
    setup(props, { emit }) {
        let arrEdit: any = []
        let dataReturn = ref()
        const messageMonthlySalary = ref('일급 선택시, 월급 = 일급 x 근무일수')
        const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);
        const store = useStore();
        const globalYear: any = computed(() => store.state.settings.globalYear);
        const totalDeduction = ref(0)
        const arrDeduction: any = ref()
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const totalAmountDifferencePayment = ref(0)
        const originDataDetail = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit
        })
        let originDataUpdate: any = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit,
            input: {
                ...originDataInputUpdate
            },
        })
        // ================== GRAPQL ====================================
        const {
            refetch: refectchDetail,
            onResult: resApiGetEmployeeWageDaily,
        } = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
            fetchPolicy: "no-cache",
        }))
        resApiGetEmployeeWageDaily(e => {
            if (e.data) {
                let res = e.data.getEmployeeWageDaily
                originDataUpdate.value.input.nationalPensionDeduction = res.nationalPensionDeduction
                originDataUpdate.value.input.healthInsuranceDeduction = res.healthInsuranceDeduction
                originDataUpdate.value.input.longTermCareInsuranceDeduction = res.longTermCareInsuranceDeduction
                originDataUpdate.value.input.employeementInsuranceDeduction = res.employeementInsuranceDeduction
                originDataUpdate.value.input.insuranceSupport = res.insuranceSupport
                originDataUpdate.value.input.nationalPensionSupportPercent = res.nationalPensionSupportPercent ? res.nationalPensionSupportPercent : 0
                originDataUpdate.value.input.employeementInsuranceSupportPercent = res.employeementInsuranceSupportPercent ? res.employeementInsuranceSupportPercent : 0
                originDataUpdate.value.input.monthlyPaycheck = res.monthlyPaycheck
                originDataUpdate.value.input.workingDays = res.workingDays
                originDataUpdate.value.input.dailyWage = res.dailyWage
                originDataUpdate.value.input.monthlyWage = res.monthlyWage
                dataReturn.value = res.deductionItems
                let dataAddDedution: any = []
                arrDeduction.value?.map((val: any) => {
                    let arrReturn = addDedution(val.itemCode)
                    if (arrReturn.itemCode) {
                        val.price = arrReturn.amount
                        dataAddDedution.push(addDedution(val.itemCode))
                    }
                    else {
                        dataAddDedution.push({ itemCode: val.itemCode, amount: 0 })
                    }
                })
                originDataUpdate.value.input.deductionItems = dataAddDedution
            }
        })
        const {
            loading: loading,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigPayItems(res => {
            arrDeduction.value = []
            res.data.getWithholdingConfigDeductionItems.map((val: any) => {
                let price = funcCheckPrice(val.itemCode)
                arrDeduction.value.push({
                    ...val,
                    price: price
                })
            })
        })
        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.saveEmployeeWageDailyPayDeduction);
        onError(e => {
            notification('error', e.message)
        })
        onDone(res => {
            emit('closePopup', false)
            notification('success', '업데이트 완료!')
        })
        // ================== WATCH ====================================
        watch(() => props.idRowEdit, (res) => {
            let countArr = 0
            let arr: any = []
            arrEdit.map((val: any) => {
                if (res == val.employeeId) {
                    countArr = 1
                    arr = val
                }
            })
            if (countArr == 0) {
                originDataDetail.value.employeeId = res
                originDataUpdate.value.employeeId = res
                refectchDetail()
            } else {
                originDataUpdate.value.employeeId = arr.employeeId
                originDataUpdate.value.input.nationalPensionDeduction = arr.input.nationalPensionDeduction
                originDataUpdate.value.input.healthInsuranceDeduction = arr.input.healthInsuranceDeduction
                originDataUpdate.value.input.longTermCareInsuranceDeduction = arr.input.longTermCareInsuranceDeduction
                originDataUpdate.value.input.employeementInsuranceDeduction = arr.input.employeementInsuranceDeduction
                originDataUpdate.value.input.insuranceSupport = arr.input.insuranceSupport
                originDataUpdate.value.input.nationalPensionSupportPercent = arr.input.nationalPensionSupportPercent ? arr.input.nationalPensionSupportPercent : 0
                originDataUpdate.value.input.employeementInsuranceSupportPercent = arr.input.employeementInsuranceSupportPercent ? arr.input.employeementInsuranceSupportPercent : 0
                originDataUpdate.value.input.monthlyPaycheck = arr.input.monthlyPaycheck
                originDataUpdate.value.input.workingDays = arr.input.workingDays
                originDataUpdate.value.input.dailyWage = arr.input.dailyWage
                originDataUpdate.value.input.monthlyWage = arr.input.monthlyWage
                originDataUpdate.value.input.deductionItems = arr.input.deductionItems
                arrDeduction.value?.map((val: any) => {
                    val.price = funcCheckPrice(val.itemCode)
                })
            }
        }, { deep: true })
        watch(() => arrDeduction, (res) => {
            let total = 0
            res.value.map((val: any) => {
                total += val.price
            })
            totalDeduction.value = total
        }, { deep: true })
        watch(() => JSON.parse(JSON.stringify(originDataUpdate.value)), (newVal, oldVal) => {
            arrEdit.map((val: any, index: any) => {
                if (val.employeeId == newVal.employeeId) {
                    arrEdit.splice(index, 1);
                }
            })
            arrEdit.push(newVal)
        })
        // ================== FUNCTION ==================================
        const updateDeduction = () => { 
            arrEdit.map((val: any) => {
                mutate(val)
            })
        }
        const callFuncCalculate = () => {
            let dataDefault = originDataUpdate.value.input
            let totalPrices = totalAmountDifferencePayment.value
            let total1 = dataDefault.nationalPensionDeduction == true ? calculateNationalPensionEmployee(totalPrices, dataDefault.nationalPensionSupportPercent) : 0
            let total2 = calculateHealthInsuranceEmployee(totalPrices)
            let total3 = calculateLongTermCareInsurance(totalPrices)
            let total4 = dataDefault.employeementInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(totalPrices, dataDefault.employeementInsuranceSupportPercent) : 0
            arrDeduction.value?.map((val: any) => {
                if (val.deductionItemCode == 1001)
                    val.price = total1
                if (val.deductionItemCode == 1002)
                    val.price = total2
                if (val.deductionItemCode == 1003)
                    val.price = total3
                if (val.deductionItemCode == 1004)
                    val.price = total4
            })
        }
        const funcCheckPrice = (id: any) => {
            let price = 0
            originDataUpdate.value.input.deductionItems.map((val: any) => {
                if (val.itemCode == id)
                    price = val.amount
            })
            return price
        }
        const addDedution = (id: any) => {
            let arrReturn: any = []
            dataReturn.value.map((val: any) => {
                if (id == val.itemCode) {
                    arrReturn = val
                    delete val.__typename
                }
            })
            return arrReturn
        }
        return {
            originDataUpdate,
            messageMonthlySalary,
            totalDeduction,
            arrDeduction,
            rangeDate,
            radioCheckPersenPension,
            loading,
            totalAmountDifferencePayment,
            callFuncCalculate,
            updateDeduction
        };
    },
});
</script>
<style lang="scss" scoped src="../../style/tab2.scss">
</style>
