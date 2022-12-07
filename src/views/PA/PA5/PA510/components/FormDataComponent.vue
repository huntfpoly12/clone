<template>
    <standard-form action="" name="add-page-210" style="border: 1px solid #d7d7d7; padding: 10px;">
        <a-row>
            <a-col :span="12">
                <a-form-item label="근무일수">
                    <EmploySelect :arrayValue="arrayEmploySelect"
                        v-model:valueEmploy="dataIncomeWageDaily.employee.employeeId" width="316px" :required="true" />
                </a-form-item>
                <a-form-item label="지급일">
                    <!-- <EmploySelect :arrayValue="arrayEmploySelect" v-model:valueEmploy="formIncomeWageDaily.input.employeeId"
                                    width="200px" :required="true" /> -->
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">요약</a-typography-title>
                </div>
                <a-form-item label="근무일수">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.employee.workingDays"
                        width="200px" :required="true" />
                </a-form-item>
                <a-form-item label="월급여">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.employee.monthlyWage"
                        width="200px" :required="true" />
                </a-form-item>
                <a-form-item label="공제합계">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.employee.totalDeduction"
                        width="200px" :required="true" />
                </a-form-item>
                <a-form-item label="차인지급액">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.actualPayment"
                        width="200px" :required="true" />
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span>
                        급여합계 - 공제합계
                    </span>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">급여 / 공제</a-typography-title>
                </div>
            </a-col>
            <a-col :span="12" style="padding-right: 5px;">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">월급여 원</a-typography-title>
                </div>
                <a-form-item label="근무일수" style="display: flex;">
                    <div class="input-text">
                        <switch-basic v-model:valueSwitch="dataIncomeWageDaily.employee.monthlyPaycheck"
                            :textCheck="'일급'" :textUnCheck="'월급'" />
                        <number-box-money v-if="dataIncomeWageDaily.employee.monthlyPaycheck" width="150px"
                            :required="true" placeholder='월급여' :spinButtons="false"
                            v-model:valueInput="dataIncomeWageDaily.monthlyWage" />
                        <number-box-money v-else width="150px" :required="true" placeholder='일급여' :spinButtons="false"
                            v-model:valueInput="dataIncomeWageDaily.dailyWage" />
                    </div>
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">월급 선택시, 일급 = 월급 / 근무일수</span>
                    <span v-else>일급 선택시, 월급 = 일급 x 근무일수</span>
                </a-form-item>
                <a-form-item label="근무일수">
                    <text-number-box width="150px" :required="true" v-model:valueInput="dataIncomeWageDaily.workingDays"
                        :min="1" :max="30" :spinButtons="true"></text-number-box>
                </a-form-item>
                <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{
                        dataIncomeWageDaily.monthlyWage / dataIncomeWageDaily.workingDays
                }}원</span>
                <span v-else>일급여 {{ dataIncomeWageDaily.dailyWage }}원</span>
                <br>
                <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{
                        dataIncomeWageDaily.monthlyWage
                }}원</span>
                <span v-else>일급여 {{ dataIncomeWageDaily.dailyWage * dataIncomeWageDaily.workingDays
                }}원</span>
            </a-col>
            <a-col :span="12" style="padding-leftt: 5px;">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">월급여 원</a-typography-title>
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
                                    :name="item.name" :type="4" subName="과세" />
                            </span>
                            <div>
                                <number-box-money min="0" width="150px" :spinButtons="false"
                                    v-model:valueInput="item.price" :disabled="true" />
                                <span class="pl-5">원</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </a-col>
        </a-row>
        <div class="text-align-center mt-50">
            <DxButton @click="modalDeductions = true" :text="'공제 재계산'"
                :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
            <DxButton @click="modalInsurance = true" :text="'4대보험 EDI 조회/적용'"
                :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
        </div>
    </standard-form>
    <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" />
    <InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import DxButton from "devextreme-vue/button"
import notification from "@/utils/notification";
import { sampleDataIncomeWageDaily } from "../utils/index"
import { useQuery, useMutation } from "@vue/apollo-composable"
import queries from "@/graphql/queries/PA/PA5/PA510/index"
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import { companyId } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DxButton
    },
    props: {
        dataIncomeWageDaily: {
            type: Object
        },
        arrayEmploySelect: {
            type: Array,
            default: []
        }
    },
    setup(props, { emit }) {
        const modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const dataIncomeWageDaily: any = ref({...props.dataIncomeWageDaily})
        watch(() => props.dataIncomeWageDaily, (value) => {
            dataIncomeWageDaily.value = value
        })

        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrDeduction: any = ref([])
        const {
            loading: loadingDeductionItem,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigPayItems(res => {
            res.data.getWithholdingConfigDeductionItems.map((val: any) => {
                let price = funcCheckPrice(val.itemCode)
                arrDeduction.value.push({
                    ...val,
                    price: price
                })
            })
        })
        const { mutate: actionUpdateIncomeWageDaily, onDone: onDoneUpdated, onError: errorUpdate } = useMutation(
            mutations.updateIncomeWageDaily
        );
        errorUpdate((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(() => {
            notification('success', `업데이트 성공되었습니다!`)
        });
        const onSubmit = () => {
            let variables = {
                companyId: companyId,
                incomeId: dataIncomeWageDaily,
                processKey: {
                    imputedYear: dataIncomeWageDaily,
                    imputedMonth: dataIncomeWageDaily,
                    paymentYear: dataIncomeWageDaily,
                    paymentMonth: dataIncomeWageDaily,
                },
                input: {
                    // dailyWage: 
                    // monthlyWage: 
                    // workingDays: 
                    // deductionItems: 
                }
            };
            actionUpdateIncomeWageDaily(variables)
        };
        const funcCheckPrice = (id: any) => {
            let price = 0
            dataIncomeWageDaily.value.deductionItems.map((e: any) => {
                if (e.itemCode == id)
                    price = e.amount
            })
            return price
        }
        return {
            dataIncomeWageDaily,
            arrDeduction,
            loadingDeductionItem,
            modalDeductions,
            modalInsurance,
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>