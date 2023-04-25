<template>
  <standard-form class="modal-add" name="tab-3-420" ref="tab3AddForm">
    <a-spin :spinning="loading">
      <a-row :gutter="16" class="modal-add modal-add-step-3">
        <a-col :span="12">
          <a-form-item label="퇴직급여(확정)">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px"
                                v-model:valueInput="retirementBenefits" format="#0,###" :min="1"/>
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
                                v-model:valueInput="formState.nonTaxableRetirementBenefits"
                                format="#0,###" :min="0"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="과세대상 퇴직급여(확정)">
            <div class="d-flex-center">
              <div :class="taxableRetirementBenefitsRef <= 0 ? 'validate-caculate':''">
                <number-box-money :required="false" width="150px"
                                  :value-input="taxableRetirementBenefitsRef" :disabled="true" format="#0,###"
                />
                <div v-if="taxableRetirementBenefitsRef <= 0" class="message-error">
                  <span style="word-wrap: break-word;hyphens: auto;">{{
                      Message.getMessage('PA420', '001').message
                    }}</span>
                </div>
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
                <number-box-money :required="false" width="150px"
                                  v-model:valueInput="formState.taxCredit" format="0,###" :min="0"/>
                <span class="pl-5 mr-5">원</span>
                <a-tooltip placement="top">
                  <template #title>거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할
                    것이
                    있을 때에는 해당 금액을 기재합니다.
                  </template>
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
                                v-model:valueInput="formState.prePaidDelayedTaxPaymentTaxAmount"
                                format="0,###" :min="0"/>
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
              :required="isReqStatements1" width="20%" class="mr-5" placeholder="연금계좌취급자"/>
            <biz-number-text-box
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].bizNumber"
              :required="isReqStatements1" width="20%" class="mr-5" placeholder="사업자등록번호"/>
            <default-text-box
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].bankAccountNumber"
              :required="isReqStatements1" width="15%" class="mr-5" placeholder="계좌번호"/>
            <date-time-box
              v-model:valueDate="formState.calculationOfDeferredRetirementIncomeTax.statements[0].depositDate"
              :required="isReqStatements1" width="25%" class="mr-5" placeholder="입금일" ref="statements1Ref"/>
            <number-box-money
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[0].accountDepositAmount"
              :required="isReqStatements1" width="20%" placeholder="계좌입금금액"/>
          </div>
          <div class="d-flex mt-5">
            <default-text-box
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].pensionAccountHolder"
              :required="isReqStatements2" width="20%" class="mr-5" placeholder="연금계좌취급자"/>
            <biz-number-text-box
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].bizNumber"
              :required="isReqStatements2" width="20%" class="mr-5" placeholder="사업자등록번호"/>
            <default-text-box
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].bankAccountNumber"
              :required="isReqStatements2" width="15%" class="mr-5" placeholder="계좌번호"/>
            <date-time-box
              v-model:valueDate="formState.calculationOfDeferredRetirementIncomeTax.statements[1].depositDate"
              :required="isReqStatements2" width="25%" class="mr-5" placeholder="입금일" ref="statements2Ref"/>
            <number-box-money
              v-model:valueInput="formState.calculationOfDeferredRetirementIncomeTax.statements[1].accountDepositAmount"
              :required="isReqStatements2" width="20%" placeholder="계좌입금금액"/>
          </div>
        </a-col>
        <div class="mb-10 wf-100 text-center">
          <button-basic text="퇴직소득세 계산" type="default" mode="contained" @onClick="handleCalculateIncomeRetirementTax"
                        :disabled="taxableRetirementBenefitsRef <= 0 || disableBtn"/>
        </div>

        <a-col :span="12">
          <div class="header-text-2 mb-10">과세표준계산</div>
          <a-form-item label="퇴직소득">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.retirementIncome"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="근속연수공제">
            <div class="d-flex-center">
              <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionForYearsOfService"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="환산급여">
            <div class="d-flex-center">
              <number-box-money width="150px" dateFormat="YYYY-MM-DD" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.conversionBenefit"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="환산급여별공제">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.deductionByConversionBenefit"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="퇴직소득과세표준">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.taxBaseForRetirementIncome"/>
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
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.convertedTaxAmount"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="퇴직소득 산출세액">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountCalculatedForRetirementIncome"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="세액공제">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxCredit"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="기납부(기과세이연)세액">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="신고대상세액">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountSubjectToReporting"/>
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
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountCalculation.taxAmountSubjectToReporting"/>
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
            <default-text-box
              v-model:valueInput="statementsAfterCal1.pensionAccountHolder"
              disabled :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자"/>
            <biz-number-text-box
              v-model:valueInput="statementsAfterCal1.bizNumber"
              disabled :required="false" width="15%" class="mr-5" placeholder="사업자등록번호"/>
            <default-text-box
              v-model:valueInput="statementsAfterCal1.bankAccountNumber"
              disabled :required="false" width="20%" class="mr-5" placeholder="계좌번호"/>
            <date-time-box
              v-model:valueDate="statementsAfterCal1.depositDate"
              disabled :required="false" width="25%" class="mr-5" placeholder="입금일"/>
            <number-box-money
              v-model:valueInput="statementsAfterCal1.accountDepositAmount"
              disabled :required="false" width="20%" placeholder="계좌입금금액"/>
          </div>
          <div class="d-flex mt-5 mb-5">
            <default-text-box
              v-model:valueInput="statementsAfterCal2.pensionAccountHolder"
              disabled :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자"/>
            <biz-number-text-box
              v-model:valueInput="statementsAfterCal2.bizNumber"
              disabled :required="false" width="15%" class="mr-5" placeholder="사업자등록번호"/>
            <default-text-box
              v-model:valueInput="statementsAfterCal2.bankAccountNumber"
              disabled :required="false" width="20%" class="mr-5" placeholder="계좌번호"/>
            <date-time-box
              v-model:valueDate="statementsAfterCal2.depositDate"
              disabled :required="false" width="25%" class="mr-5" placeholder="입금일"/>
            <number-box-money
              v-model:valueInput="statementsAfterCal2.accountDepositAmount"
              disabled :required="false" width="20%" placeholder="계좌입금금액"/>
          </div>
          <a-form-item label="이연퇴직소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.retirementIncomeTax"/>
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
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.incomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="지방소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.deductibleWithholdingTax.localIncomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <div>신고대상세액</div>
          <a-form-item class="label-children" label="소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.incomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item class="label-children" label="지방소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.taxAmountToBeReported.localIncomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>

          <div>이연퇴직소득세</div>
          <a-form-item class="label-children" label="소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.incomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item class="label-children" label="지방소득세">
            <div class="d-flex-center">
              <number-box-money :required="false" width="150px" disabled
                                v-model:valueInput="dataIncomeRetirementTax.retirementIncomeTax.localIncomeTax"/>
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-spin>
  </standard-form>
</template>


<script lang="ts" setup>
import {computed, reactive, ref, watch, watchEffect} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import {companyId} from "@/helpers/commonFunction"
import notification from '@/utils/notification';
import {FORM_STATE_TAB_3} from "../../utils/index"
import {Message} from '@/configs/enum';
import {useStore} from "vuex";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import DefaultTextBox from "@/components/common/DefaultTextBox.vue";
import {IncomeRetirement} from "@/views/PA/PA4/PA420/types";

const props = defineProps<{ dataDetail: IncomeRetirement }>()
console.log('props', props.dataDetail)
const store = useStore()
// const taxCalculationInputStore = computed(() => store.getters['common/getTaxCalculationInput'])
const retirementBenefitsStore = computed(() => store.getters['common/getDefinedRetirementBenefits'])
const interimPaymentTab1 = computed(() => store.getters['common/getInterimPaymentTab1'])

const trigger = ref<boolean>(false)
const tab3AddForm = ref()
const statements1Ref = ref()
const statements2Ref = ref()
const isReqStatements1 = ref<boolean>(false)
const isReqStatements2 = ref<boolean>(false)
const variables: any = ref({})
const retirementBenefits = ref(retirementBenefitsStore.value)

const FORM_STATE_OLD = computed(() =>cloneDeep({
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
  nonTaxableRetirementBenefits:  Number(props.dataDetail.specification?.nonTaxableRetirementBenefits),
  taxCredit: props.dataDetail.specification?.specificationDetail.taxAmountCalculation.taxCredit,
  prePaidDelayedTaxPaymentTaxAmount: props.dataDetail.specification?.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount,
  prevRetirementBenefitStatus: {
    retirementBenefits: null,
    nonTaxableRetirementBenefits: null,
    taxableRetirementBenefits: null,
  },
  prevRetiredYearsOfService: {
    settlementStartDate: null,
    settlementFinishDate: null,
    paymentDate: null,
    exclusionDays: 0,
    additionalDays: 0,
  },
  lastRetiredYearsOfService: {
    settlementStartDate: null,
    settlementFinishDate: null,
    paymentDate: null,
    exclusionDays: 0,
    additionalDays: 0,
  }
}))
const initialIncomeRetirementTax_old = computed(() => cloneDeep({
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
}))
const formState = reactive(cloneDeep(FORM_STATE_OLD.value))

const dataIncomeRetirementTax: any = reactive(cloneDeep(initialIncomeRetirementTax_old.value))
const statementsAfterCal1 = reactive(cloneDeep(initialIncomeRetirementTax_old.value.calculationOfDeferredRetirementIncomeTax.statements[0]))
const statementsAfterCal2 = reactive(cloneDeep(initialIncomeRetirementTax_old.value.calculationOfDeferredRetirementIncomeTax.statements[1]))
const disableBtn = ref(true)

const isChangeRetirementBenefits = computed(() => {
  return !isEqual(dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0], FORM_STATE_OLD.value.calculationOfDeferredRetirementIncomeTax.statements[0]) ||
    !isEqual(dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1], FORM_STATE_OLD.value.calculationOfDeferredRetirementIncomeTax.statements[0])
})
const isChangeTaxInput = computed(() => !isEqual(formState, FORM_STATE_TAB_3))

watchEffect(() => {
  store.commit('common/setIsChangeForm', {tab3: isChangeRetirementBenefits.value || isChangeTaxInput.value})
})
watchEffect(() => {
  retirementBenefits.value = retirementBenefitsStore.value
})

// calculate taxableRetirementBenefits
const taxableRetirementBenefitsRef = computed<number>(() => retirementBenefits.value - formState.nonTaxableRetirementBenefits)

const {
  result,
  loading,
  onError,
  onResult
} = useQuery(queries.calculateIncomeRetirementTax, variables, () => ({
  enabled: trigger.value,
  fetchPolicy: "no-cache",
}))
onError(e => {
  trigger.value = false;
  notification('error', e.message)
})

onResult((value) => {
  if (value.loading) return
  if (value.data.calculateIncomeRetirementTax && value.data.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements.length > 0) {
    Object.assign(dataIncomeRetirementTax, cloneDeep(value.data.calculateIncomeRetirementTax))
    Object.assign(statementsAfterCal1, cloneDeep(value.data.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[0]))
    if (value.data.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements.length > 1)
      Object.assign(statementsAfterCal2, cloneDeep(value.data.calculateIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax.statements[1]))
  }
  store.commit('common/setIsDisableBtnTab3', false)
  store.commit('common/setTaxCalculationInput', {
    calculationOfDeferredRetirementIncomeTax: {
      statements: formState.calculationOfDeferredRetirementIncomeTax.statements.filter(i => Object.values(i).every(j => Boolean(j))),
      totalAmount: formState.calculationOfDeferredRetirementIncomeTax.totalAmount
    },
    lastRetirementBenefitStatus: {
      nonTaxableRetirementBenefits: formState.nonTaxableRetirementBenefits,
      taxableRetirementBenefits: taxableRetirementBenefitsRef.value,
      retirementBenefits: retirementBenefits.value,
    },
    taxCredit: formState.taxCredit,
    prePaidDelayedTaxPaymentTaxAmount: formState.prePaidDelayedTaxPaymentTaxAmount
  })
  // notification calculation success
  trigger.value = false;
})
const handleCalculateIncomeRetirementTax = () => {
  const {nonTaxableRetirementBenefits, ...newFormState} = formState
  let result: any = {
    ...newFormState,
    calculationOfDeferredRetirementIncomeTax: {
      ...newFormState.calculationOfDeferredRetirementIncomeTax,
      statements: newFormState.calculationOfDeferredRetirementIncomeTax.statements.filter(i => Object.values(i).every(j => Boolean(j)))
    },
    lastRetirementBenefitStatus: {
      nonTaxableRetirementBenefits: nonTaxableRetirementBenefits,
      taxableRetirementBenefits: taxableRetirementBenefitsRef.value,
      retirementBenefits: retirementBenefits.value
    },
    lastRetiredYearsOfService: {
      ...FORM_STATE_OLD.value.lastRetiredYearsOfService
    },
  }

  if (interimPaymentTab1.value) {
    result = {
      ...result,
      prevRetiredYearsOfService: {
        ...FORM_STATE_OLD.value.prevRetiredYearsOfService,
        paymentDate: FORM_STATE_OLD.value.prevRetiredYearsOfService.paymentDate
      },
    }
    if (FORM_STATE_OLD.value.prevRetirementBenefitStatus.nonTaxableRetirementBenefits) {
      result.prevRetirementBenefitStatus = FORM_STATE_OLD.value.prevRetirementBenefitStatus
    }
  } else {
    // delete key prevRetiredYearsOfService, prevRetirementBenefitStatus
    delete result.prevRetiredYearsOfService
    delete result.prevRetirementBenefitStatus
  }

  variables.value = {
    companyId: companyId,
    input: result
  }

  trigger.value = true;
}

function compareObjects(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false
  for (let key of keys1) {
    if (obj1[key] === obj2[key]) return false
  }
  return true;
}

watch(formState.calculationOfDeferredRetirementIncomeTax.statements, (value) => {
  if (value[0] && value[1]) {
    const isNotEmpty1 = compareObjects(value[0], FORM_STATE_TAB_3.calculationOfDeferredRetirementIncomeTax.statements[0])
    const isNotEmpty2 = compareObjects(value[1], FORM_STATE_TAB_3.calculationOfDeferredRetirementIncomeTax.statements[1])
    if (!isNotEmpty1 && !isNotEmpty2) {
      disableBtn.value = true
      return
    }
    if (isNotEmpty1) {
      disableBtn.value = false
    }
    if (isNotEmpty2) {
      disableBtn.value = false
    }
    formState.calculationOfDeferredRetirementIncomeTax.totalAmount = +value[0].accountDepositAmount + +value[1].accountDepositAmount
  }
}, {deep: true})

</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
