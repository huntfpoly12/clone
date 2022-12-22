<template>
    <a-spin :spinning="loading" size="large">
        <a-row :gutter="16" class="modal-add modal-add-step-3">
            <a-col :span="12">
                <a-form-item label="퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.definedRetirementBenefits" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                실제 지급된 퇴직급여를 입력합니다.
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </a-form-item>
                <a-form-item label="비과세퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.nonTaxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="과세대상 퇴직급여(확정)">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.taxableRetirementBenefits" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                = 퇴직급여(확정) - 비과세퇴직급여(확정)
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </a-form-item>
                <a-form-item label="세액공제">
                    <div class="d-flex-top">
                        <div class="d-flex-center">
                            <number-box-money width="150px"
                                v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.taxCredit" />
                            <span class="pl-5 mr-5">원</span>
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할 것이 있을 때에는 해당
                                    금액을
                                    기재합니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="기납부(기과세이연)세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount" />
                        <span class="pl-5 mr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                직전 중간정산시 소득세를 입력합니다.
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">연금계좌입금명세
                    {{
                            $filters.formatCurrency(
                                dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount
                                +
                                dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount
                            )
                    }} 원
                </div>
                <template
                    v-for="(value, index) in dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements">
                    <div class="d-flex mb-5">
                        <default-text-box width="18%" class="mr-5" placeholder="연금계좌취급자"
                            v-model:valueInput="value.pensionAccountHolder" />
                        <default-text-box width="18%" class="mr-5" placeholder="사업자등록번호"
                            v-model:valueInput="value.bizNumber" />
                        <default-text-box width="18%" class="mr-5" placeholder="계좌번호"
                            v-model:valueInput="value.bankAccountNumber" /> 
                        <date-time-box width="28%" class="mr-5" v-model:valueDate="value.depositDate"
                            placeholder="입금일" />
                        <number-box-money width="18%" placeholder="계좌입금금액"
                            v-model:valueInput="value.accountDepositAmount" />
                    </div>
                </template>
            </a-col>
            <div class="mb-10 wf-100 text-center">
                <button-basic text="퇴직소득세 계산" type="default" mode="contained" @onClick="actionCaculate" />
            </div>
            <a-col :span="12">
                <div class="header-text-2 mb-10">과세표준계산</div>
                <a-form-item label="퇴직소득">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxBaseCalculation.retirementIncome"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="근속연수공제">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxBaseCalculation.deductionForYearsOfService"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="환산급여">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxBaseCalculation.conversionBenefit"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="환산급여별공제">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxBaseCalculation.taxBaseForRetirementIncome"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="퇴직소득과세표준">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxBaseCalculation.deductionByConversionBenefit"
                            disabled="true" />
                        <span class="pl-5 pr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                = [환산급여] - [환산급여별공제]
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">세액계산</div>
                <a-form-item label="환산산출세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.convertedTaxAmount" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="퇴직소득 산출세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.taxAmountCalculatedForRetirementIncome" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="세액공제">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.taxCredit" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="기납부(기과세이연)세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="신고대상세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.taxAmountSubjectToReporting" />
                        <span class="pl-5 pr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                = [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">세액계산</div>
                <a-form-item label="환산산출세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.taxAmountSubjectToReporting"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <div>연금계좌입금명세 ($
                    {{
                            $filters.formatCurrency(
                                dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount
                                +
                                dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount
                            )
                    }}
                    원)</div>
                <template
                    v-for="(value, index) in dataGet.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements">
                    <div class="d-flex mb-5">
                        <default-text-box width="19%" class="mr-5" placeholder="연금계좌취급자"
                            v-model:valueInput="value.pensionAccountHolder" disabled="true" />
                        <default-text-box width="19%" class="mr-5" placeholder="사업자등록번호"
                            v-model:valueInput="value.bizNumber" disabled="true" />
                        <default-text-box width="19%" class="mr-5" placeholder="계좌번호"
                            v-model:valueInput="value.bankAccountNumber" disabled="true" />
                        <date-time-box width="24%" class="mr-5" disabled="true" v-model:valueDate="value.depositDate"
                            placeholder="입금일" />
                        <number-box-money width="19%" placeholder="계좌입금금액"
                            v-model:valueInput="value.accountDepositAmount" disabled="true" />
                    </div>
                </template>
                <a-form-item label="신고대상세액">
                    <div class="d-flex-center">
                        <number-box-money width="150px" disabled="true"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountCalculation.retirementIncomeTax" />
                        <span class="pl-5 pr-5">원</span>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                = [신고대상세액] * [계좌입금금액합계] / [과세대상 퇴직급여(확정)]
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>

                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">세액계산</div>
                <a-form-item label="소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.deductibleWithholdingTax.incomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.deductibleWithholdingTax.localIncomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <div>신고대상세액</div>
                <a-form-item class="label-children" label="소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountToBeReported.incomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item class="label-children" label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.taxAmountToBeReported.localIncomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>

                <div>이연퇴직소득세</div>
                <a-form-item class="label-children" label="소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.retirementIncomeTax.incomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item class="label-children" label="지방소득세">
                    <div class="d-flex-center">
                        <number-box-money width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.retirementIncomeTax.localIncomeTax"
                            disabled="true" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
            </a-col>
        </a-row>
    </a-spin>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from '@/helpers/commonFunction';
import dayjs from "dayjs";

export default defineComponent({
    props: {
        dataDetail: Object,
        actionNextStep: Number,
    },

    setup(props, { emit }) {
        const trigger = ref(false)
        const dataGet: any = ref({
            ...props.dataDetail
        })
        const dataRequestCaculate: any = ref({
            companyId: companyId,
            input: {}
        });

        // ====================== GRAPQL =======================================
        const { refetch: refetchCaculate, onError: errorCaculate, result: resultCaculate, loading } = useQuery(queries.calculateIncomeRetirementTax, dataRequestCaculate, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));


        // ====================== WATCH =======================================
        watch(() => dataGet, (newValue) => {
            emit("update:dataDetail", newValue);
        }, { deep: true })

        watch(() => resultCaculate, (newValue) => {
            dataGet.value.specification.specificationDetail.lastRetirementBenefitStatus = newValue.value.calculateIncomeRetirementTax.lastRetirementBenefitStatus
            dataGet.value.specification.specificationDetail.lastRetiredYearsOfService = newValue.value.calculateIncomeRetirementTax.lastRetiredYearsOfService
            dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService = newValue.value.calculateIncomeRetirementTax.settlementRetiredYearsOfService
            dataGet.value.specification.specificationDetail.taxAmountCalculation = newValue.value.calculateIncomeRetirementTax.taxAmountCalculation
            dataGet.value.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax = newValue.value.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax
            dataGet.value.specification.specificationDetail.taxBaseCalculation = newValue.value.calculateIncomeRetirementTax.taxBaseCalculation
            dataGet.value.specification.specificationDetail.deductibleWithholdingTax = newValue.value.calculateIncomeRetirementTax.deductibleWithholdingTax
            dataGet.value.specification.specificationDetail.taxAmountToBeReported = newValue.value.calculateIncomeRetirementTax.taxAmountToBeReported
            dataGet.value.specification.specificationDetail.retirementIncomeTax = newValue.value.calculateIncomeRetirementTax.retirementIncomeTax

            if (!newValue.value.calculateIncomeRetirementTax.prevRetirementBenefitStatus) {
                dataGet.value.specification.specificationDetail.prevRetirementBenefitStatus = {
                    "retirementBenefits": 0,
                    "nonTaxableRetirementBenefits": 0,
                    "taxableRetirementBenefits": 0
                }

                dataGet.value.specification.specificationDetail.prevRetiredYearsOfService = {
                    "settlementStartDate": '',
                    "settlementFinishDate": '',
                    "paymentDate": '',
                    "exclusionDays": 0,
                    "additionalDays": 0,
                }
            }
        }, { deep: true })

        // ====================== FUNCTION =======================================

        // Click button caculate step-3
        const actionCaculate = () => {
            // Remove redundant lines 
            const cleanData = JSON.parse(
                JSON.stringify(dataGet.value, (name, val) => {
                    if (
                        name === "__typename"
                    ) {
                        delete val[name];
                    } else {
                        return val;
                    }
                })
            );


            // Setup value call api
            dataRequestCaculate.value.input = {
                "taxCredit": cleanData.specification.specificationDetail.taxAmountCalculation.taxCredit,
                "prevRetirementBenefitStatus": cleanData.specification.specificationDetail.prevRetirementBenefitStatus,
                "prevRetiredYearsOfService": {
                    ...cleanData.specification.specificationDetail.prevRetiredYearsOfService,
                    settlementStartDate: cleanData.specification.specificationDetail.prevRetiredYearsOfService.settlementStartDate,
                    settlementFinishDate: cleanData.specification.specificationDetail.prevRetiredYearsOfService.settlementFinishDate
                },
                "prePaidDelayedTaxPaymentTaxAmount": cleanData.specification.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount,
                "lastRetirementBenefitStatus": cleanData.specification.specificationDetail.lastRetirementBenefitStatus,
                "lastRetiredYearsOfService": {
                    ...cleanData.specification.specificationDetail.lastRetiredYearsOfService,
                    settlementStartDate: cleanData.specification.specificationDetail.lastRetiredYearsOfService.settlementStartDate,
                    settlementFinishDate: cleanData.specification.specificationDetail.lastRetiredYearsOfService.settlementFinishDate,
                },
                "calculationOfDeferredRetirementIncomeTax": cleanData.specification.specificationDetail.calculationOfDeferredRetirementIncomeTax
            }

            delete dataRequestCaculate.value.input.calculationOfDeferredRetirementIncomeTax.retirementIncomeTax

            // If step 1 is not checked, delete some variables that do not need to be passed
            if (cleanData.checkBoxCallApi == false) {
                delete dataRequestCaculate.value.input.prevRetirementBenefitStatus
                delete dataRequestCaculate.value.input.prevRetiredYearsOfService
            }

            trigger.value = true
            if (dataRequestCaculate.value.input)
                refetchCaculate()


        }

        return {
            dataGet,
            dayjs,
            loading,
            actionCaculate,
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>