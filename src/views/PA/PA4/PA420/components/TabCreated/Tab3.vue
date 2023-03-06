<template>
    <a-spin :spinning="loading">
        <a-row :gutter="16" class="modal-add modal-add-step-3">
            <a-col :span="12">
                <a-form-item label="퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.retirementBenefits" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>실제 지급된 퇴직급여를 입력합니다.</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
                <a-form-item label="비과세퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.nonTaxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="과세대상 퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.taxableRetirementBenefits" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>= 퇴직급여(확정) - 비과세퇴직급여(확정)</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
                <a-form-item label="세액공제">
                    <div class="d-flex-top">
                        <div class="d-flex-center">
                            <number-box-money :required="false" width="150px"
                                v-model:valueInput="dataForm.taxCalculationInput.taxCredit" />
                            <span class="pl-5 mr-5">원</span>
                            <a-tooltip placement="top">
                                <template #title>거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할
                                    것이
                                    있을 때에는 해당 금액을 기재합니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt=""
                                            style="width: 15px;"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="기납부(기과세이연)세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.prePaidDelayedTaxPaymentTaxAmount" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>직전 중간정산시 소득세를 입력합니다.</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">연금계좌입금명세
                    ({{
                        $filters.formatCurrency(dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.totalAmount
                            =
                            dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount
                            +
                            dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount)
                    }} 원)</div>
                <div class="d-flex">
                    <default-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].pensionAccountHolder"
                        :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                    <biz-number-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].bizNumber"
                        :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                    <default-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].bankAccountNumber"
                        :required="false" width="15%" class="mr-5" placeholder="계좌번호" />
                    <date-time-box
                        v-model:valueDate="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate"
                        :required="true" width="25%" class="mr-5" placeholder="입금일" />
                    <number-box-money
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount"
                        :required="false" width="20%" placeholder="계좌입금금액" />
                </div>
                <div class="d-flex mt-5">
                    <default-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].pensionAccountHolder"
                        :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                    <biz-number-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].bizNumber"
                        :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                    <default-text-box
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].bankAccountNumber"
                        :required="false" width="15%" class="mr-5" placeholder="계좌번호" />
                    <date-time-box
                        v-model:valueDate="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate"
                        :required="true" width="25%" class="mr-5" placeholder="입금일" />
                    <number-box-money
                        v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount"
                        :required="false" width="20%" placeholder="계좌입금금액" />
                </div>
            </a-col>
            <div class="mb-10 wf-100 text-center">
                <button-basic text="퇴직소득세 계산" type="default" mode="contained" @onClick="calculateIncomeRetirementTax" />
            </div>

            <a-col :span="12">
                <div class="header-text-2 mb-10">과세표준계산</div>
                <a-form-item label="퇴직소득">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.retirementIncome" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="근속연수공제">
                    <div class="d-flex-center">
                        <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionForYearsOfService" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="환산급여">
                    <div class="d-flex-center">
                        <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.conversionBenefit" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="환산급여별공제">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionByConversionBenefit" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="퇴직소득과세표준">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.taxBaseForRetirementIncome" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>= [환산급여] - [환산급여별공제]</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">세액계산</div>
                <a-form-item label="환산산출세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.convertedTaxAmount" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="퇴직소득 산출세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountCalculatedForRetirementIncome" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="세액공제">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxCredit" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="기납부(기과세이연)세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="신고대상세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountSubjectToReporting" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>= [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">이연퇴직소득세액계산</div>
                <a-form-item label="신고대상세액">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountSubjectToReporting" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <div>연금계좌입금명세 (${{
                    dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.totalAmount ?
                        $filters.formatCurrency(dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.totalAmount)
                        :
                        ''
                }} 원)</div>
                <div class="d-flex">
                    <default-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].pensionAccountHolder"
                        disabled="true" :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                    <biz-number-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].bizNumber"
                        disabled="true" :required="false" width="15%" class="mr-5" placeholder="사업자등록번호" />
                    <default-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].bankAccountNumber"
                        disabled="true" :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                    <date-time-box
                        v-model:valueDate="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate"
                        disabled="true" :required="false" width="25%" class="mr-5" placeholder="입금일" />
                    <number-box-money
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount"
                        disabled="true" :required="false" width="20%" placeholder="계좌입금금액" />
                </div>
                <div class="d-flex mt-5 mb-5">
                    <default-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].pensionAccountHolder"
                        disabled="true" :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                    <biz-number-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].bizNumber"
                        disabled="true" :required="false" width="15%" class="mr-5" placeholder="사업자등록번호" />
                    <default-text-box
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].bankAccountNumber"
                        disabled="true" :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                    <date-time-box
                        v-model:valueDate="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate"
                        disabled="true" :required="false" width="25%" class="mr-5" placeholder="입금일" />
                    <number-box-money
                        v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount"
                        disabled="true" :required="false" width="20%" placeholder="계좌입금금액" />
                </div>
                <a-form-item label="이연퇴직소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.retirementIncomeTax" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top">
                            <template #title>= [신고대상세액] * [계좌입금금액합계] / [과세대상 퇴직급여(확정)]</template>
                            <div>
                                <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                            </div>
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">납부명세(차감원천징수세액)</div>
                <a-form-item label="소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.incomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.localIncomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <div>신고대상세액</div>
                <a-form-item class="label-children" label="소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.incomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item class="label-children" label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.localIncomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>

                <div>이연퇴직소득세</div>
                <a-form-item class="label-children" label="소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.incomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item class="label-children" label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" disabled="true"
                            v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.localIncomeTax" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
            </a-col>
        </a-row>
    </a-spin>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from "@/helpers/commonFunction"
import notification from '@/utils/notification';
import { initialIncomeRetirementTax } from "../../utils/index"
export default defineComponent({
    props: {
        dataForm: {
            type: Object,
            default: {}
        },
    },
    setup(props, { emit }) {
        const trigger = ref<boolean>(false)
        const variables: any = ref({})
        const dataIncomeRetirementTax: any = ref({ ...initialIncomeRetirementTax })
        
        const {
            result,
            loading,
            onError
        } = useQuery(queries.calculateIncomeRetirementTax, variables, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        onError(e => {
            trigger.value = false;
            notification('error', e.message)
        })

        watch(result, (value) => {
            if (value.calculateIncomeRetirementTax) {
                dataIncomeRetirementTax.value = value.calculateIncomeRetirementTax;
                dataIncomeRetirementTax.value.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate = parseInt(value.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate)
                dataIncomeRetirementTax.value.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate = parseInt(value.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate)
            }
            trigger.value = false;
        })

        const calculateIncomeRetirementTax = () => {
            variables.value = {
                companyId: companyId,
                input: { ...props.dataForm.taxCalculationInput }
            }
            if (!props.dataForm.checkBoxCallApi) {
                delete variables.value.input.prevRetiredYearsOfService
                delete variables.value.input.prevRetirementBenefitStatus
            }
            delete variables.value.input.checkBoxCallApi
            variables.value.input.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate = parseInt(variables.value.input.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate)
            variables.value.input.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate = parseInt(variables.value.input.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate)
            trigger.value = true;
        }

        // if there is any change in the two inputs retirementBenefits or nonTaxableRetirementBenefits is  ( taxableRetirementBenefits = retirementBenefits - nonTaxableRetirementBenefits)
        watch(() => [props.dataForm.taxCalculationInput.lastRetirementBenefitStatus.nonTaxableRetirementBenefits,
                    props.dataForm.taxCalculationInput.lastRetirementBenefitStatus.retirementBenefits], () => {
            props.dataForm.taxCalculationInput.lastRetirementBenefitStatus.taxableRetirementBenefits =
            props.dataForm.taxCalculationInput.lastRetirementBenefitStatus.retirementBenefits -
            props.dataForm.taxCalculationInput.lastRetirementBenefitStatus.nonTaxableRetirementBenefits
        }) 
        return {
            loading,
            calculateIncomeRetirementTax,
            dataIncomeRetirementTax,
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
