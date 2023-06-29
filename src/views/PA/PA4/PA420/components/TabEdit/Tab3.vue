<template>
  <standard-form class="modal-add" name="tab-3-420" ref="tab3EditForm">
    <a-spin :spinning="loading">
      <a-row :gutter="16" class="modal-add modal-add-step-3">
        <a-col :span="12">
          <a-form-item label="퇴직급여(확정)">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                v-model:valueInput="retirementBenefits"
                disabled
                format="#0,###"
              />
              <span class="pl-5">원</span>
              <info-tool-tip>실제 지급된 퇴직급여를 입력합니다.</info-tool-tip>
            </div>
          </a-form-item>
          <a-form-item label="비과세퇴직급여(확정)">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                v-model:valueInput="formState.nonTaxableRetirementBenefits"
                format="#0,###"
                :min="0"
                :disabled="retirementStatus === 20 || retirementStatus === 40"
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="과세대상 퇴직급여(확정)">
            <div class="d-flex-center">
              <div
                :class="
                  taxableRetirementBenefitsRef <= 0 ? 'validate-caculate' : ''
                "
              >
                <number-box-money
                  :required="false"
                  width="150px"
                  :value-input="taxableRetirementBenefitsRef"
                  :disabled="true"
                  format="#0,###"
                />
                <div
                  v-if="taxableRetirementBenefitsRef <= 0"
                  class="message-error"
                >
                  <span style="word-wrap: break-word; hyphens: auto">{{
                    Message.getMessage("PA420", "001").message
                  }}</span>
                </div>
              </div>
              <span class="pl-5">원</span>
              <info-tool-tip
                >= 퇴직급여(확정) - 비과세퇴직급여(확정)</info-tool-tip
              >
            </div>
          </a-form-item>
          <a-form-item label="세액공제">
            <div class="d-flex-top">
              <div class="d-flex-center">
                <number-box-money
                  :required="false"
                  width="150px"
                  v-model:valueInput="formState.taxCredit"
                  format="0,###"
                  :min="0"
                  :disabled="retirementStatus === 20 || retirementStatus === 40"
                />
                <span class="pl-5">원</span>
                <info-tool-tip>
                  거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서
                  그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나
                  납부할 것이 있을 때에는 해당 금액을 기재합니다.
                </info-tool-tip>
              </div>
            </div>
          </a-form-item>
          <a-form-item label="기납부(기과세이연)세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                v-model:valueInput="formState.prePaidDelayedTaxPaymentTaxAmount"
                format="0,###"
                :min="0"
                :disabled="retirementStatus === 20 || retirementStatus === 40"
              />
              <span class="pl-5">원</span>
              <info-tool-tip
                >직전 중간정산시 소득세를 입력합니다.</info-tool-tip
              >
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">
            연금계좌입금명세 ({{
              $filters.formatCurrency(
                formState.calculationOfDeferredRetirementIncomeTax.totalAmount
              )
            }}
            원)
          </div>
          <div class="d-flex">
            <default-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[0]
                  .pensionAccountHolder
              "
              :required="isReqStatements1"
              width="20%"
              class="mr-5"
              placeholder="연금계좌취급자"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <biz-number-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[0]
                  .bizNumber
              "
              :required="isReqStatements1"
              width="20%"
              class="mr-5"
              placeholder="사업자등록번호"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <default-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[0]
                  .bankAccountNumber
              "
              :required="isReqStatements1"
              width="15%"
              class="mr-5"
              placeholder="계좌번호"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <date-time-box
              v-model:valueDate="
                formState.calculationOfDeferredRetirementIncomeTax.statements[0]
                  .depositDate
              "
              :required="isReqStatements1"
              width="25%"
              class="mr-5"
              placeholder="입금일"
              ref="statements1Ref"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <number-box-money
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[0]
                  .accountDepositAmount
              "
              :required="isReqStatements1"
              width="20%"
              placeholder="계좌입금금액"
              :min="1"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
          </div>
          <div class="d-flex mt-5">
            <default-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[1]
                  .pensionAccountHolder
              "
              :required="isReqStatements2"
              width="20%"
              class="mr-5"
              placeholder="연금계좌취급자"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <biz-number-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[1]
                  .bizNumber
              "
              :required="isReqStatements2"
              width="20%"
              class="mr-5"
              placeholder="사업자등록번호"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <default-text-box
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[1]
                  .bankAccountNumber
              "
              :required="isReqStatements2"
              width="15%"
              class="mr-5"
              placeholder="계좌번호"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <date-time-box
              v-model:valueDate="
                formState.calculationOfDeferredRetirementIncomeTax.statements[1]
                  .depositDate
              "
              :required="isReqStatements2"
              width="25%"
              class="mr-5"
              placeholder="입금일"
              ref="statements2Ref"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
            <number-box-money
              v-model:valueInput="
                formState.calculationOfDeferredRetirementIncomeTax.statements[1]
                  .accountDepositAmount
              "
              :required="isReqStatements2"
              width="20%"
              placeholder="계좌입금금액"
              :min="1"
              :disabled="retirementStatus === 20 || retirementStatus === 40"
            />
          </div>
        </a-col>
        <div class="mb-10 wf-100 text-center">
          <button-basic
            text="퇴직소득세 계산"
            type="default"
            mode="contained"
            @onClick="handleCalculateIncomeRetirementTax"
            :disabled="taxableRetirementBenefitsRef <= 0 || disableBtn || retirementStatus === 20 || retirementStatus === 40"
          />
        </div>

        <a-col :span="12">
          <div class="header-text-2 mb-10">과세표준계산</div>
          <a-form-item label="퇴직소득">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="dataIncomeRetirementTax.taxBaseCalculation.retirementIncome"
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="근속연수공제">
            <div class="d-flex-center">
              <number-box-money
                width="150px"
                dateFormat="YYYY-MM-DD"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxBaseCalculation
                    .deductionForYearsOfService
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="환산급여">
            <div class="d-flex-center">
              <number-box-money
                width="150px"
                dateFormat="YYYY-MM-DD"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxBaseCalculation.conversionBenefit
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="환산급여별공제">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxBaseCalculation
                    .deductionByConversionBenefit
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="퇴직소득과세표준">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxBaseCalculation
                    .taxBaseForRetirementIncome
                "
              />
              <span class="pl-5">원</span>
              <info-tool-tip>= [환산급여] - [환산급여별공제]</info-tool-tip>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">세액계산</div>
          <a-form-item label="환산산출세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation
                    .convertedTaxAmount
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="퇴직소득 산출세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation
                    .taxAmountCalculatedForRetirementIncome
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="세액공제">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation.taxCredit
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="기납부(기과세이연)세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation
                    .prePaidDelayedTaxPaymentTaxAmount
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="신고대상세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation
                    .taxAmountSubjectToReporting
                "
              />
              <span class="pl-5">원</span>
              <info-tool-tip
                >= [환산산출세액] - [세액공제] -
                [기납부(기과세이연)세액]</info-tool-tip
              >
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">이연퇴직소득세액계산</div>
          <a-form-item label="신고대상세액">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax.taxAmountCalculation
                    .taxAmountSubjectToReporting
                "
              />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>

          <!-- TODO table input deferred retirement income tax -->
          <div>
            연금계좌입금명세 ({{
              dataIncomeRetirementTax.calculationOfDeferredRetirementIncomeTax
                .totalAmount
                ? $filters.formatCurrency(
                    dataIncomeRetirementTax
                      .calculationOfDeferredRetirementIncomeTax.totalAmount
                  )
                : ""
            }}
            원)
          </div>
          <div class="d-flex">
            <default-text-box
              v-model:valueInput="statementsAfterCal1.pensionAccountHolder"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="연금계좌취급자"
            />
            <biz-number-text-box
              v-model:valueInput="statementsAfterCal1.bizNumber"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="사업자등록번호"
            />
            <default-text-box
              v-model:valueInput="statementsAfterCal1.bankAccountNumber"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="계좌번호"
            />
            <date-time-box
              v-model:valueDate="statementsAfterCal1.depositDate"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="입금일"
            />
            <number-box-money
              v-model:valueInput="statementsAfterCal1.accountDepositAmount"
              disabled
              :required="false"
              width="20%"
              placeholder="계좌입금금액"
            />
          </div>
          <div class="d-flex mt-5 mb-5">
            <default-text-box
              v-model:valueInput="statementsAfterCal2.pensionAccountHolder"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="연금계좌취급자"
            />
            <biz-number-text-box
              v-model:valueInput="statementsAfterCal2.bizNumber"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="사업자등록번호"
            />
            <default-text-box
              v-model:valueInput="statementsAfterCal2.bankAccountNumber"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="계좌번호"
            />
            <date-time-box
              v-model:valueDate="statementsAfterCal2.depositDate"
              disabled
              :required="false"
              width="20%"
              class="mr-5"
              placeholder="입금일"
            />
            <number-box-money
              v-model:valueInput="statementsAfterCal2.accountDepositAmount"
              disabled
              :required="false"
              width="20%"
              placeholder="계좌입금금액"
            />
          </div>
          <a-form-item label="이연퇴직소득세">
            <div class="d-flex-center">
              <number-box-money
                :required="false"
                width="150px"
                disabled
                v-model:valueInput="
                  dataIncomeRetirementTax
                    .calculationOfDeferredRetirementIncomeTax
                    .retirementIncomeTax
                "
              />
              <span class="pl-5">원</span>
              <info-tool-tip
                >= [신고대상세액] * [계좌입금금액합계] / [과세대상
                퇴직급여(확정)]</info-tool-tip
              >
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">납부명세(차감원천징수세액)</div>
          <a-row>
            <a-col :span="12">
              <a-form-item label="소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.deductibleWithholdingTax.incomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>
              <a-form-item label="지방소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.deductibleWithholdingTax
                        .localIncomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <div>신고대상세액</div>
              <a-form-item class="label-children" label="소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.taxAmountToBeReported.incomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>
              <a-form-item class="label-children" label="지방소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.taxAmountToBeReported
                        .localIncomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>

              <div>이연퇴직소득세</div>
              <a-form-item class="label-children" label="소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.retirementIncomeTax.incomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>
              <a-form-item class="label-children" label="지방소득세">
                <div class="d-flex-center">
                  <number-box-money
                    :required="false"
                    width="100px"
                    disabled
                    v-model:valueInput="
                      dataIncomeRetirementTax.retirementIncomeTax.localIncomeTax
                    "
                  />
                  <span class="pl-5">원</span>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-spin>
  </standard-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import { useStore } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { IncomeRetirementSpecification } from "@/views/PA/PA4/PA420/types";
import { FORM_STATE_TAB_3 } from "@/views/PA/PA4/PA420/utils";

const {dataDetail} = defineProps<{ dataDetail: IncomeRetirementSpecification }>();
const store = useStore();
const taxCalculationInputStore = computed(() => store.getters['common/getTaxCalculationInput'])
const retirementStatus = computed(() => store.getters["common/getRetirementStatus"]);
const retirementBenefitsStore = computed(
  () => store.getters["common/getDefinedRetirementBenefits"]
);
const interimPaymentTab1 = computed(
  () => store.getters["common/getInterimPaymentTab1"]
);

const trigger = ref<boolean>(false);
const tab3EditForm = ref();
const statements1Ref = ref();
const statements2Ref = ref();
const isReqStatements1 = ref<boolean>(false);
const isReqStatements2 = ref<boolean>(false);
const variables: any = ref({});
const retirementBenefits = ref(retirementBenefitsStore.value);
const disableBtn = ref(false);

const FORM_STATE_OLD = {
  calculationOfDeferredRetirementIncomeTax: {
    totalAmount:
      dataDetail.specificationDetail
        .calculationOfDeferredRetirementIncomeTax?.totalAmount || 0,
    statements: [
      dataDetail.specificationDetail
        .calculationOfDeferredRetirementIncomeTax?.statements?.[0] || {
        pensionAccountHolder: "",
        bizNumber: "",
        bankAccountNumber: "",
        depositDate: null,
        accountDepositAmount: "",
      },
      dataDetail.specificationDetail
        .calculationOfDeferredRetirementIncomeTax?.statements?.[1] || {
        pensionAccountHolder: "",
        bizNumber: "",
        bankAccountNumber: "",
        depositDate: null,
        accountDepositAmount: "",
      },
    ],
  },
  nonTaxableRetirementBenefits: Number(
    dataDetail.nonTaxableRetirementBenefits
  ),
  taxCredit: dataDetail.specificationDetail.taxAmountCalculation.taxCredit,
  prePaidDelayedTaxPaymentTaxAmount: dataDetail.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount,
  prevRetirementBenefitStatus: dataDetail.specificationDetail.prevRetirementBenefitStatus,
  prevRetiredYearsOfService: dataDetail.specificationDetail.prevRetiredYearsOfService,
  lastRetiredYearsOfService: dataDetail.specificationDetail.lastRetiredYearsOfService,
};

const initialIncomeRetirementTax_old = computed(() =>
  cloneDeep({
    taxBaseCalculation:
      dataDetail.specificationDetail.taxBaseCalculation,
    taxAmountCalculation:
      dataDetail.specificationDetail.taxAmountCalculation,
    calculationOfDeferredRetirementIncomeTax: {
      totalAmount:
        dataDetail.specificationDetail
          .calculationOfDeferredRetirementIncomeTax?.totalAmount || 0,
      statements: [
        dataDetail.specificationDetail
          .calculationOfDeferredRetirementIncomeTax?.statements?.[0] || {
          pensionAccountHolder: "",
          bizNumber: "",
          bankAccountNumber: "",
          depositDate: null,
          accountDepositAmount: "",
        },
        dataDetail.specificationDetail
          .calculationOfDeferredRetirementIncomeTax?.statements?.[1] || {
          pensionAccountHolder: "",
          bizNumber: "",
          bankAccountNumber: "",
          depositDate: null,
          accountDepositAmount: "",
        },
      ],
    },
    deductibleWithholdingTax:
      dataDetail.specificationDetail
        .deductibleWithholdingTax,
    taxAmountToBeReported:
      dataDetail.specificationDetail.taxAmountToBeReported,
    retirementIncomeTax:
      dataDetail.specificationDetail.retirementIncomeTax,
  })
);
const formState = reactive(cloneDeep(FORM_STATE_OLD));

const dataIncomeRetirementTax: any = reactive(
  cloneDeep(initialIncomeRetirementTax_old.value)
);
const statementsAfterCal1 = reactive(
  cloneDeep(
    initialIncomeRetirementTax_old.value
      .calculationOfDeferredRetirementIncomeTax.statements[0]
  )
);
const statementsAfterCal2 = reactive(
  cloneDeep(
    initialIncomeRetirementTax_old.value
      .calculationOfDeferredRetirementIncomeTax.statements[1]
  )
);

const isChangeTaxInput = computed(() => !isEqual(formState, FORM_STATE_OLD));
watch(isChangeTaxInput, (val) => {
  store.commit("common/setIsChangeForm", { tab3: val });
});
watchEffect(() => {
  retirementBenefits.value = retirementBenefitsStore.value;
});

// calculate taxableRetirementBenefits
const taxableRetirementBenefitsRef = computed<number>(
  () => retirementBenefits.value - formState.nonTaxableRetirementBenefits
);

const { result, loading, onError, onResult } = useQuery(
  queries.calculateIncomeRetirementTax,
  variables,
  () => ({
    enabled: trigger.value,
    fetchPolicy: "no-cache",
  })
);
onError((e) => {
  trigger.value = false;
  //notification('error', e.message)
});

onResult((value) => {
  if (value.loading) return;

  const result = value.data.calculateIncomeRetirementTax
    .calculationOfDeferredRetirementIncomeTax
    ? value.data.calculateIncomeRetirementTax
    : {
        ...value.data.calculateIncomeRetirementTax,
        calculationOfDeferredRetirementIncomeTax: {
          retirementIncomeTax: 0,
          statements: [],
          totalAmount: 0,
        },
      };
  Object.assign(dataIncomeRetirementTax, cloneDeep(result));

  if (
    value.data.calculateIncomeRetirementTax &&
    value.data.calculateIncomeRetirementTax
      .calculationOfDeferredRetirementIncomeTax?.statements.length > 0
  ) {
    Object.assign(
      dataIncomeRetirementTax,
      cloneDeep(value.data.calculateIncomeRetirementTax)
    );
    Object.assign(
      statementsAfterCal1,
      cloneDeep(
        value.data.calculateIncomeRetirementTax
          .calculationOfDeferredRetirementIncomeTax?.statements[0]
      )
    );
    if (
      value.data.calculateIncomeRetirementTax
        .calculationOfDeferredRetirementIncomeTax.statements.length > 1
    )
      Object.assign(
        statementsAfterCal2,
        cloneDeep(
          value.data.calculateIncomeRetirementTax
            .calculationOfDeferredRetirementIncomeTax?.statements[1]
        )
      );
  }
  store.commit("common/setIsDisableBtnTab3", false);
  store.commit('common/setNeedToRecalculatePa420', false)
  store.commit("common/setTaxCalculationInput", {
    calculationOfDeferredRetirementIncomeTax: {
      statements:
        formState.calculationOfDeferredRetirementIncomeTax.statements.filter(
          (i) => Object.values(i).every((j) => Boolean(j))
        ),
      totalAmount:
        formState.calculationOfDeferredRetirementIncomeTax.totalAmount,
    },
    lastRetirementBenefitStatus: {
      nonTaxableRetirementBenefits: formState.nonTaxableRetirementBenefits,
      taxableRetirementBenefits: taxableRetirementBenefitsRef.value,
      retirementBenefits: retirementBenefits.value,
    },
    taxCredit: formState.taxCredit,
    prePaidDelayedTaxPaymentTaxAmount:
      formState.prePaidDelayedTaxPaymentTaxAmount,
  });
  // notification calculation success
  trigger.value = false;
});
const handleCalculateIncomeRetirementTax = () => {
  let dtValidate1 = true;
  let dtValidate2 = true;
  if (
    isReqStatements1.value &&
    !formState.calculationOfDeferredRetirementIncomeTax.statements[0]
      .depositDate
  ) {
    statements1Ref.value.validate(true);
    dtValidate1 = false;
  } else {
    statements1Ref.value.validate(false);
    dtValidate1 = true;
  }
  if (
    isReqStatements2.value &&
    !formState.calculationOfDeferredRetirementIncomeTax.statements[1]
      .depositDate
  ) {
    statements2Ref.value.validate(true);
    dtValidate2 = false;
  } else {
    statements2Ref.value.validate(false);
    dtValidate2 = true;
  }
  const res = tab3EditForm.value.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
    return;
  } else if (!dtValidate1 || !dtValidate2) {
    dtValidate1 = true;
    dtValidate2 = true;
    return;
  } else {
    const { nonTaxableRetirementBenefits, ...newFormState } = formState;
    let result: any = {
      ...newFormState,
      calculationOfDeferredRetirementIncomeTax: {
        ...newFormState.calculationOfDeferredRetirementIncomeTax,
        statements:
          newFormState.calculationOfDeferredRetirementIncomeTax.statements.filter(
            (i) => Object.values(i).every((j) => Boolean(j))
          ),
      },
      lastRetirementBenefitStatus: {
        nonTaxableRetirementBenefits: nonTaxableRetirementBenefits,
        taxableRetirementBenefits: taxableRetirementBenefitsRef.value,
        retirementBenefits: retirementBenefits.value,
      },
      lastRetiredYearsOfService: {
        ...FORM_STATE_OLD.lastRetiredYearsOfService,
      },
    };
    if (interimPaymentTab1.value) {
      result = {
        ...result,
        prevRetiredYearsOfService: {
          ...taxCalculationInputStore.value.prevRetiredYearsOfService,
        },
      };
      if (FORM_STATE_OLD.prevRetirementBenefitStatus?.nonTaxableRetirementBenefits) {
        result.prevRetirementBenefitStatus = FORM_STATE_OLD.prevRetirementBenefitStatus;
      } else {
        delete result.prevRetirementBenefitStatus;
      }

    } else {
      // delete key prevRetiredYearsOfService, prevRetirementBenefitStatus
      delete result.prevRetiredYearsOfService;
      delete result.prevRetirementBenefitStatus;
    }
    if (!result.calculationOfDeferredRetirementIncomeTax?.statements?.length)
      delete result.calculationOfDeferredRetirementIncomeTax;
    variables.value = {
      companyId: companyId,
      input: result,
    };

    trigger.value = true;
  }
};

function compareObjects(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  let count = 0;
  if (keys1.length != keys2.length) return false;
  for (let key of keys1) {
    if (obj1[key] == obj2[key] || (!obj1[key] && !obj2[key])) {
      count++;
    }
  }
  return !(count === keys1.length || count === 0);
}

watch(
  formState.calculationOfDeferredRetirementIncomeTax.statements,
  (value) => {
    if (value[0] && value[1]) {
      const isNotEmpty1 = compareObjects(
        value[0],
        FORM_STATE_TAB_3.calculationOfDeferredRetirementIncomeTax.statements[0]
      );
      const isNotEmpty2 = compareObjects(
        value[1],
        FORM_STATE_TAB_3.calculationOfDeferredRetirementIncomeTax.statements[1]
      );
      if (!isNotEmpty1) statements1Ref.value.validate(false);
      if (!isNotEmpty2) statements2Ref.value.validate(false);
      isReqStatements1.value = isNotEmpty1;
      isReqStatements2.value = isNotEmpty2;
      formState.calculationOfDeferredRetirementIncomeTax.totalAmount =
        +value[0].accountDepositAmount + +value[1].accountDepositAmount;
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped src="../../style/modalAdd.scss"></style>
