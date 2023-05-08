<template>
  <standard-form class="modal-add" name="tab-3-420" ref="tab3AddForm">
    <a-row :gutter="16" class="modal-add modal-add-step-3">
      <a-col :span="12">
        <a-form-item label="퇴직급여(확정)">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled v-model:valueInput="retirementBenefits" format="#0,###"
              :min="1" />
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
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="formState.nonTaxableRetirementBenefits" format="#0,###" :min="0" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="과세대상 퇴직급여(확정)">
          <div class="d-flex-center">
            <div>
              <number-box-money :required="false" width="150px" :value-input="retirementBenefits - formState.nonTaxableRetirementBenefits"
                :disabled="true" format="#0,###" />
            </div>
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
              <number-box-money :required="false" width="150px" disabled v-model:valueInput="formState.taxCredit" format="0,###"
                :min="0" />
              <span class="pl-5 mr-5">원</span>
              <a-tooltip placement="top">
                <template #title>거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할
                  것이
                  있을 때에는 해당 금액을 기재합니다.
                </template>
                <div>
                  <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"></span>
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="기납부(기과세이연)세액">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="formState.prePaidDelayedTaxPaymentTaxAmount" format="0,###" :min="0" />
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
            $filters.formatCurrency(formState.calculationOfDeferredRetirementIncomeTax.totalAmount)
          }} 원)
        </div>
        <div class="d-flex">
          <default-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].pensionAccountHolder"
            :required="isReqStatements1" width="20%" class="mr-5" placeholder="연금계좌취급자" disabled />
          <biz-number-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].bizNumber"
            :required="isReqStatements1" width="20%" class="mr-5" placeholder="사업자등록번호" disabled />
          <default-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].bankAccountNumber"
            :required="isReqStatements1" width="15%" class="mr-5" placeholder="계좌번호" disabled />
          <date-time-box
            v-model:valueDate="formState.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate"
            :required="isReqStatements1" width="25%" class="mr-5" placeholder="입금일" ref="statements1Ref" disabled />
          <number-box-money
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount"
            :required="isReqStatements1" width="20%" placeholder="계좌입금금액" disabled />
        </div>
        <div class="d-flex mt-5">
          <default-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].pensionAccountHolder"
            :required="isReqStatements2" width="20%" class="mr-5" placeholder="연금계좌취급자" disabled />
          <biz-number-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].bizNumber"
            :required="isReqStatements2" width="20%" class="mr-5" placeholder="사업자등록번호" disabled />
          <default-text-box
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].bankAccountNumber"
            :required="isReqStatements2" width="15%" class="mr-5" placeholder="계좌번호" disabled />
          <date-time-box
            v-model:valueDate="formState.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate"
            :required="isReqStatements2" width="25%" class="mr-5" placeholder="입금일" ref="statements2Ref" disabled />
          <number-box-money
            v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount"
            :required="isReqStatements2" width="20%" placeholder="계좌입금금액" disabled />
        </div>
      </a-col>

      <a-col :span="12">
        <div class="header-text-2 mb-10">과세표준계산</div>
        <a-form-item label="퇴직소득">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.retirementIncome" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="근속연수공제">
          <div class="d-flex-center">
            <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionForYearsOfService" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="환산급여">
          <div class="d-flex-center">
            <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.conversionBenefit" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="환산급여별공제">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionByConversionBenefit" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="퇴직소득과세표준">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
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
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.convertedTaxAmount" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="퇴직소득 산출세액">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountCalculatedForRetirementIncome" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="세액공제">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxCredit" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="기납부(기과세이연)세액">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="신고대상세액">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
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
            <number-box-money :required="false" width="150px" disabled
              v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountSubjectToReporting" />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>

        <!-- TODO table input deferred retirement income tax -->
        <div>연금계좌입금명세 ({{
          dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.totalAmount ?
          $filters.formatCurrency(dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.totalAmount)
          :
          ''
        }} 원)
        </div>
        <div class="d-flex">
          <default-text-box v-model:valueInput="statementsAfterCal1.pensionAccountHolder" disabled :required="false"
            width="20%" class="mr-5" placeholder="연금계좌취급자" />
          <biz-number-text-box v-model:valueInput="statementsAfterCal1.bizNumber" disabled :required="false" width="20%"
            class="mr-5" placeholder="사업자등록번호" />
          <default-text-box v-model:valueInput="statementsAfterCal1.bankAccountNumber" disabled :required="false"
            width="20%" class="mr-5" placeholder="계좌번호" />
          <date-time-box v-model:valueDate="statementsAfterCal1.depositDate" disabled :required="false" width="20%"
            class="mr-5" placeholder="입금일" />
          <number-box-money v-model:valueInput="statementsAfterCal1.accountDepositAmount" disabled :required="false"
            width="20%" placeholder="계좌입금금액" />
        </div>
        <div class="d-flex mt-5 mb-5">
          <default-text-box v-model:valueInput="statementsAfterCal2.pensionAccountHolder" disabled :required="false"
            width="20%" class="mr-5" placeholder="연금계좌취급자" />
          <biz-number-text-box v-model:valueInput="statementsAfterCal2.bizNumber" disabled :required="false" width="20%"
            class="mr-5" placeholder="사업자등록번호" />
          <default-text-box v-model:valueInput="statementsAfterCal2.bankAccountNumber" disabled :required="false"
            width="20%" class="mr-5" placeholder="계좌번호" />
          <date-time-box v-model:valueDate="statementsAfterCal2.depositDate" disabled :required="false" width="20%"
            class="mr-5" placeholder="입금일" />
          <number-box-money v-model:valueInput="statementsAfterCal2.accountDepositAmount" disabled :required="false"
            width="20%" placeholder="계좌입금금액" />
        </div>
        <a-form-item label="이연퇴직소득세">
          <div class="d-flex-center">
            <number-box-money :required="false" width="150px" disabled
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
        <a-row>
          <a-col :span="12">
            <a-form-item label="소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.incomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>
            <a-form-item label="지방소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.localIncomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <div>신고대상세액</div>
            <a-form-item class="label-children" label="소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.incomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>
            <a-form-item class="label-children" label="지방소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.localIncomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>

            <div>이연퇴직소득세</div>
            <a-form-item class="label-children" label="소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.incomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>
            <a-form-item class="label-children" label="지방소득세">
              <div class="d-flex-center">
                <number-box-money :required="false" width="100px" disabled
                  v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.localIncomeTax" />
                <span class="pl-5">원</span>
              </div>
            </a-form-item>
          </a-col>
        </a-row>


      </a-col>
    </a-row>
  </standard-form>
</template>


<script lang="ts" setup>
import { IncomeRetirement } from "@/views/PA/PA4/PA420/types";
import { reactive, ref, watch } from 'vue';

const props = defineProps<{ dataDetail: IncomeRetirement }>()
const tab3AddForm = ref()
const statements1Ref = ref()
const statements2Ref = ref()
const isReqStatements1 = ref<boolean>(false)
const isReqStatements2 = ref<boolean>(false)
const retirementBenefits = ref(props.dataDetail.specification?.definedRetirementBenefits || 0)
const FORM_STATE_OLD = {
  calculationOfDeferredRetirementIncomeTax: {
    totalAmount: props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax.totalAmount,
    statements: [
      props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements?.[0] || {
        pensionAccountHolder: '',
        bizNumber: '',
        bankAccountNumber: '',
        depositDate: null,
        accountDepositAmount: 0,
      },
      props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements?.[1] || {
        pensionAccountHolder: '',
        bizNumber: '',
        bankAccountNumber: '',
        depositDate: null,
        accountDepositAmount: 0,
      }
    ]
  },
  nonTaxableRetirementBenefits: Number(props.dataDetail.specification?.nonTaxableRetirementBenefits),
  taxCredit: props.dataDetail.specification?.specificationDetail.taxAmountCalculation.taxCredit,
  prePaidDelayedTaxPaymentTaxAmount: props.dataDetail.specification?.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount,
  prevRetirementBenefitStatus: props.dataDetail.specification?.specificationDetail.prevRetirementBenefitStatus,
  prevRetiredYearsOfService: props.dataDetail.specification?.specificationDetail.prevRetiredYearsOfService,
  lastRetiredYearsOfService: props.dataDetail.specification?.specificationDetail.lastRetiredYearsOfService
}
const initialIncomeRetirementTax_old = {
  taxBaseCalculation: props.dataDetail.specification?.specificationDetail.taxBaseCalculation,
  taxAmountCalculation: props.dataDetail.specification?.specificationDetail.taxAmountCalculation,
  calculationOfDeferredRetirementIncomeTax: {
    ...props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax,
    statements: [
      props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements?.[0] || {
        pensionAccountHolder: '',
        bizNumber: '',
        bankAccountNumber: '',
        depositDate: null,
        accountDepositAmount: 0,
      },
      props.dataDetail.specification?.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements?.[1] || {
        pensionAccountHolder: '',
        bizNumber: '',
        bankAccountNumber: '',
        depositDate: null,
        accountDepositAmount: 0,
      }
    ]
  },
  deductibleWithholdingTax: props.dataDetail.specification?.specificationDetail.deductibleWithholdingTax,
  taxAmountToBeReported: props.dataDetail.specification?.specificationDetail.taxAmountToBeReported,
  retirementIncomeTax: props.dataDetail.specification?.specificationDetail.retirementIncomeTax
}
const formState = reactive(FORM_STATE_OLD)

const dataIncomeRetirementTax: any = reactive(initialIncomeRetirementTax_old)
const statementsAfterCal1 = reactive(initialIncomeRetirementTax_old.calculationOfDeferredRetirementIncomeTax.statements[0])
const statementsAfterCal2 = reactive(initialIncomeRetirementTax_old.calculationOfDeferredRetirementIncomeTax.statements[1])
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">
</style>
