<template>
    <a-row :gutter="16" class="modal-add modal-add-step-3">
        <a-col :span="12">
            <a-form-item label="퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.retirementBenefits"/>
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        실제 지급된 퇴직급여를 입력합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="비과세퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.nonTaxableRetirementBenefits"/>
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="과세대상 퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" v-model:valueInput="dataForm.taxCalculationInput.lastRetirementBenefitStatus.taxableRetirementBenefits"/>
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = 퇴직급여(확정) - 비과세퇴직급여(확정)
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="세액공제">
                <div class="d-flex-top">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" v-model:valueInput="dataForm.taxCalculationInput.taxCredit"/>
                        <span class="pl-5">원</span>
                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    </div>
                    <span class="custom-waring">
                        거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할 것이 있을 때에는 해당 금액을 기재합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="기납부(기과세이연)세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" v-model:valueInput="dataForm.taxCalculationInput.prePaidDelayedTaxPaymentTaxAmount"/>
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        직전 중간정산시 소득세를 입력합니다.
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">연금계좌입금명세 ({{dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.totalAmount}} 원)</div>
            <div class="d-flex">
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].pensionAccountHolder" :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].bizNumber" :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].bankAccountNumber" :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate" :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount" :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <div class="d-flex mt-5">
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].pensionAccountHolder" :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].bizNumber" :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].bankAccountNumber" :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate" :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money v-model:valueInput="dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount" :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
        </a-col>
        <div class="mb-10 wf-100 text-center">
            <button-basic text="퇴직소득세 계산" type="default" mode="contained" @onClick="calculateIncomeRetirementTax"/>
        </div>

        <a-col :span="12">
            <div class="header-text-2 mb-10">과세표준계산</div>
            <a-form-item label="퇴직소득">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="근속연수공제">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산급여">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산급여별공제">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="퇴직소득과세표준">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산급여] - [환산급여별공제]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="퇴직소득 산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="세액공제">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="기납부(기과세이연)세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="신고대상세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <div>연금계좌입금명세 (${계좌입금금액합계} 원)</div>
            <div class="d-flex">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <div class="d-flex mt-5 mb-5">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <a-form-item label="신고대상세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <div>신고대상세액</div>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>

            <div>이연퇴직소득세</div>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item> 
        </a-col>
    </a-row>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from "@/helpers/commonFunction"
import notification from '@/utils/notification';
export default defineComponent({
    props: {
        dataForm: {
            type: Object,
            default: {}
        },
    },
    setup(props, { emit }) {
        const trigger = ref<boolean>(false)
        const variables = ref({})
        const {
            result, loading, refetch, onError
        } = useQuery(queries.calculateIncomeRetirementTax, variables, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        onError(e => {
            notification('error', e.message)
        })

        watch(result, (value) => {
            if (value && value.calculateIncomeRetirementTax) {
                // caculateValue.value = value.calculateIncomeRetirementTax;
            }
            trigger.value = false;
        })

        const calculateIncomeRetirementTax = () => {
            variables.value = {
                companyId: companyId,
                input: {
                    settlementStartDate: props.dataForm.incomeCalculationInput.settlementStartDate,
                    settlementFinishDate: props.dataForm.incomeCalculationInput.settlementFinishDate,
                    exclusionDays: props.dataForm.taxCalculationInput.lastRetiredYearsOfService.exclusionDays,
                    additionalDays: props.dataForm.taxCalculationInput.lastRetiredYearsOfService.additionalDays,
                    totalPay3Month: props.dataForm.incomeCalculationInput.totalPay3Month,
                    totalAnualBonus: props.dataForm.incomeCalculationInput.totalAnualBonus,
                    annualLeaveAllowance: props.dataForm.incomeCalculationInput.annualLeaveAllowance,
                }
            }
            trigger.value = true;
        }


        return {
            calculateIncomeRetirementTax
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>