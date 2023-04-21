<template>
  <standard-form class="modal-add" name="tab-1-420" ref="formRef">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="구분">
          <a-tag :color="retirementType == 2 ? 'green' : 'red'">{{
              retirementType == 2 ? '중간정산' : '퇴직소득'
            }}
          </a-tag>
        </a-form-item>
        <a-form-item label="귀속/지급연월">
          <div class="d-flex-center">
            <month-picker-box-custom v-model:valueDate="attributionDate" text="귀"
                                     bgColor="gray"></month-picker-box-custom>
            <month-picker-box-custom v-model:valueDate="paymentYearAndMonth" text="지"></month-picker-box-custom>
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="label-required">
          <div class="d-flex-center">
            <number-box min="1" max="31" :required="true" width="150px"
                        v-model:valueInput="paymentDay" is-format/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring">
                지급일은 저장 후 수정불가
              </div>
            </div>
          </div>

        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="사원" class="label-required">
          <div class="d-flex-center">
            <employ-select :arrayValue="arrayEmploySelect" :required="true"
                           v-model:valueEmploy="inputFormTab1.employeeId" width="300px"/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring" style="width: 180px;">
                대상: 사원과 일용직사<br>원 중 퇴직금 대상자.
              </div>
            </div>
          </div>
        </a-form-item>

        <a-form-item label="입사일">
          <div class="d-flex-center">
            <date-time-box width="150px" :disabled="true" :valueDate="joinedAt"/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring">
                수정이 필요한 경우 <b @click="openNewTab" style="cursor: pointer;">[사원등록]</b>에서 수정하시기 바랍니다.
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="임원여부">
          <switch-basic textCheck="O" textUnCheck="X" width="60px"
                        v-model:valueSwitch="inputFormTab1.executive"/>
        </a-form-item>
        <a-form-item label="퇴직사유" class="label-required">
          <select-box-common :arrSelect="arrayReasonResignation" :required="true"
                             v-model:valueInput="inputFormTab1.retirementReason" placeholder="선택" width="300px"/>
        </a-form-item>
      </a-col>
      <div class="header-text-1">근속연수</div>
      <a-col :span="24">
        <checkbox-basic label="중간지급여부" class="mb-10"
                        v-model:valueCheckbox="interimPaymentTab1"/>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">중간지급 근속연수</div>
        <a-form-item label="정산시작(입사)일" :class="interimPaymentTab1 ? 'label-required' : ''">
          <div class="d-flex-center">
            <!-- TODO PRE Settlement START DATE -->
            <date-time-box-custom
              width="150px" :disabled="!interimPaymentTab1"
              v-model:valueDate="taxCalculationInput.prevRetiredYearsOfService.settlementStartDate"
              ref="prevSettlementStartDate"
              :startDate="joinedAt ? dayjs(String(joinedAt)) : joinedAt"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의
                  다음날입니다.
                </template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="정산종료(퇴사)일" :class="interimPaymentTab1 ? 'label-required' : ''">
          <div class="d-flex-center">
            <!-- TODO PRE Settlement END DATE -->
            <date-time-box-custom width="150px"
                                  :disabled="!interimPaymentTab1"
                                  :startDate="dayjs(String(taxCalculationInput.prevRetiredYearsOfService.settlementStartDate))"
                                  v-model:valueDate="taxCalculationInput.prevRetiredYearsOfService.settlementFinishDate"
                                  ref="prevSettlementFinishDate"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="지급일" :class="interimPaymentTab1 ? 'label-required' : ''">
          <date-time-box-custom
            :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
            v-model:valueDate="taxCalculationInput.prevRetiredYearsOfService.paymentDate"
            :startDate="dayjs(String(taxCalculationInput.prevRetiredYearsOfService.settlementStartDate))"
            :finishDate="dayjs(String(taxCalculationInput.prevRetiredYearsOfService.settlementFinishDate))"
            ref="prevRetiredYearsOfServicePaymentDate"
          />
        </a-form-item>
        <a-form-item label="제외일수" :class="interimPaymentTab1 ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
                              v-model:valueInput="taxCalculationInput.prevRetiredYearsOfService.exclusionDays"
                              :rule-custom="positiveNumber" :message-rule-custom="'값은 0보다 커야 합니다'"
            />
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="가산일수" :class="interimPaymentTab1 ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
                              v-model:valueInput="taxCalculationInput.prevRetiredYearsOfService.additionalDays"
                              :rule-custom="positiveNumber" :message-rule-custom="'값은 0보다 커야 합니다'"
            />
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <div>
          근속연수 / 근속월수 / 근속일수:
          {{ dataPrevRetiredYearsOfService.yearsOfService }}년/
          {{ dataPrevRetiredYearsOfService.monthsOfService }}개월/
          {{ dataPrevRetiredYearsOfService.daysOfService }}일
        </div>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">최종 근속연수</div>
        <a-form-item label="정산시작(입사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box :required="true" width="150px"
                           v-model:valueDate="taxCalculationInput.lastRetiredYearsOfService.settlementStartDate"
                           ref="lastSettlementStartDate"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의
                  다음날입니다.
                </template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="정산종료(퇴사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box-custom :required="true" width="150px"
                                  v-model:valueDate="taxCalculationInput.lastRetiredYearsOfService.settlementFinishDate"
                                  :startDate="dayjs(String(taxCalculationInput.lastRetiredYearsOfService.settlementStartDate))"
                                  ref="lastSettlementFinishDate"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="label-required">
          <date-time-box-custom :required="false" width="150px"
                                :startDate="dayjs(String(taxCalculationInput.lastRetiredYearsOfService.settlementStartDate))"
                                :finishDate="dayjs(String(taxCalculationInput.lastRetiredYearsOfService.settlementFinishDate))"
                                v-model:valueDate="taxCalculationInput.lastRetiredYearsOfService.paymentDate"
                                ref="lastRetiredYearsOfServicePaymentDate"/>
        </a-form-item>
        <a-form-item label="제외일수">
          <div class="d-flex-center">
            <number-box :required="false" width="150px"
                        v-model:valueInput="taxCalculationInput.lastRetiredYearsOfService.exclusionDays"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="가산일수">
          <div class="d-flex-center">
            <number-box :required="false" width="150px"
                        v-model:valueInput="taxCalculationInput.lastRetiredYearsOfService.additionalDays"/>
            <div class="ml-5 d-flex-center">
              <a-tooltip placement="top">
                <template #title>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</template>
                <div>
                  <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-form-item>
        <div>
          근속연수 / 근속월수 / 근속일수:
          {{ dataLastRetiredYearsOfService.yearsOfService }}년/
          {{ dataLastRetiredYearsOfService.monthsOfService }}개월/
          {{ dataLastRetiredYearsOfService.daysOfService }}일
        </div>
      </a-col>
      <a-col :span="12" class="mt-10 custom-label"
             :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
        <div class="header-text-2 mb-10">중간지급 퇴직급여</div>
        <a-form-item label="중간지급 퇴직급여">
          <div class="d-flex-center"
               :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
            <number-box-money width="150px" :disabled="!interimPaymentTab1"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="taxCalculationInput.prevRetirementBenefitStatus.retirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 비과세퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" :disabled="!interimPaymentTab1"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="taxCalculationInput.prevRetirementBenefitStatus.nonTaxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 과세대상 퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" :disabled="!interimPaymentTab1"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="taxCalculationInput.prevRetirementBenefitStatus.taxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12" class="mt-10">
        <div class="header-text-2 mb-10">정산 근속연수</div>
        <!--        TODO incomeCalculationInput settlementStartDate -->
        <a-form-item label="정산시작(입사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box width="150px" :required="true"
                           v-model:valueDate="incomeCalculationInput.settlementStartDate"
                           ref="incomeCalculationInputSettlementStartDate"/>
          </div>
        </a-form-item>
        <!--        TODO incomeCalculationInput settlementFinishDate -->
        <a-form-item label="정산종료(퇴사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box width="150px"
                           v-model:valueDate="incomeCalculationInput.settlementFinishDate"
                           ref="incomeCalculationInputSettlementFinishDate"/>
          </div>
        </a-form-item>
        <div>근속연수 / 근속월수 / 근속일수: {{ dataSettlement.yearsOfService }}년/{{ dataSettlement.monthsOfService }}개월/{{
            dataSettlement.daysOfService
          }}일
        </div>
      </a-col>
    </a-row>
    <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="submitForm" id="btn-next-step"
                  style="display: none;"/>
  </standard-form>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch, watchEffect} from 'vue'
import dayjs from "dayjs";
import {
  arrayReasonResignationUtils,
  INCOME_CALCULATION_INPUT,
  INPUT_FORM_TAB_1,
  TAX_CALCULATION_INPUT
} from '../../utils'
import {Formula} from "@bankda/jangbuda-common";
import filters from '@/helpers/filters';
import {useStore} from 'vuex';
import cloneDeep from "lodash/cloneDeep";
import NumberBoxMoney from "@/components/common/NumberBoxMoney.vue";
import isEqual from "lodash/isEqual";
import DateTimeBoxCustom from "@/components/common/DateTimeBoxCustom.vue";

interface Props {
  arrayEmploySelect: Array<any>,
  actionNextStep: number,
  retirementType: number,
}

const store = useStore();

const props = defineProps<Props>()
const emit = defineEmits(['nextPage'])
const inputFormTab1:any = ref(cloneDeep(INPUT_FORM_TAB_1))
const taxCalculationInput:any = ref(cloneDeep(TAX_CALCULATION_INPUT))
const incomeCalculationInput:any = ref(cloneDeep(INCOME_CALCULATION_INPUT))

const interimPaymentTab1 = ref(false)

const prevSettlementStartDate = ref()
const prevSettlementFinishDate = ref()
const lastSettlementStartDate = ref()
const lastSettlementFinishDate = ref()
const lastRetiredYearsOfServicePaymentDate = ref()
const incomeCalculationInputSettlementStartDate = ref()
const incomeCalculationInputSettlementFinishDate = ref()
const prevRetiredYearsOfServicePaymentDate = ref()

const joinedAt = ref(filters.formatDateToInterger(dayjs()))
const ProcessKey = computed(() => store.getters['common/getSelectMonthColumn'])
// Checking if the month is less than 9, if it is, it is adding a 0 to the month.
let attributionDate = ref(`${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}`)
let paymentYearAndMonth = ref(`${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}`)
const validatePreRetirementBenefitStatus = computed(() => {
  return +taxCalculationInput.value.prevRetirementBenefitStatus.retirementBenefits > 0 ||
    +taxCalculationInput.value.prevRetirementBenefitStatus.nonTaxableRetirementBenefits > 0 ||
    +taxCalculationInput.value.prevRetirementBenefitStatus.taxableRetirementBenefits > 0
})
const arrayReasonResignation = reactive([...arrayReasonResignationUtils])

// calculate date of service
const dataPrevRetiredYearsOfService = computed(() => {
  if (taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate && taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date(taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date(taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      taxCalculationInput.value.prevRetiredYearsOfService.exclusionDays,
      taxCalculationInput.value.prevRetiredYearsOfService.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})
const dataLastRetiredYearsOfService = computed(() => {
  if (taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate && taxCalculationInput.value.lastRetiredYearsOfService.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date(taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date(taxCalculationInput.value.lastRetiredYearsOfService.settlementFinishDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      taxCalculationInput.value.lastRetiredYearsOfService.exclusionDays,
      taxCalculationInput.value.lastRetiredYearsOfService.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})
const dataSettlement = computed(() => {
  if (incomeCalculationInput.value.settlementStartDate && incomeCalculationInput.value.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date(String(incomeCalculationInput.value.settlementStartDate).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date(String(incomeCalculationInput.value.settlementFinishDate).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      incomeCalculationInput.value.exclusionDays,
      incomeCalculationInput.value.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})

const paymentDayOld = store.getters['common/getPaymentDay']
const paymentDay = ref(store.getters['common/getPaymentDay'])

const formRef = ref()
// =============== WATCH ==================================
const isChangeForm = computed(() => {
  return !isEqual(inputFormTab1.value, INPUT_FORM_TAB_1) ||
    !isEqual(taxCalculationInput.value, TAX_CALCULATION_INPUT) ||
    !isEqual(incomeCalculationInput.value, INCOME_CALCULATION_INPUT) ||
    attributionDate.value != `${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}` ||
    paymentYearAndMonth.value != `${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}` ||
    interimPaymentTab1.value ||
    paymentDay.value != paymentDayOld
})
watchEffect(() => {
  store.commit('common/setIsChangeForm', {tab1: isChangeForm.value})
})

// Step 1:  watch employeeId
watch(() => inputFormTab1.value.employeeId, (value) => {
  let dataEmployee: any = props.arrayEmploySelect.find((element: any) => element.employeeId == value)
  inputFormTab1.value.employeeType = dataEmployee?.type
  joinedAt.value = dataEmployee?.joinedAt // add join at of employee
  taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate = dataEmployee?.joinedAt
  incomeCalculationInput.value.settlementStartDate = dataEmployee?.joinedAt
  if (interimPaymentTab1.value) {
    taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate = dataEmployee?.joinedAt
  }
});
// Step 2: Watch interimPaymentTab1 true or false
watch(interimPaymentTab1, (value) => {
  if (!value) {
    taxCalculationInput.value = cloneDeep(TAX_CALCULATION_INPUT)
    taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate = cloneDeep(joinedAt.value)
  } else {
    taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate = cloneDeep(joinedAt.value)
    incomeCalculationInput.value.settlementStartDate = cloneDeep(joinedAt.value)
  }
})

watch(() => taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate, (value: any) => {
  if (value) {
    incomeCalculationInput.value.settlementStartDate = value
    if (+value > +taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate) {
      taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate = value
    }
  }
});
watch(() => taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate, (value: any) => {
  if (value) {
    taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate = value
    taxCalculationInput.value.lastRetiredYearsOfService.settlementFinishDate = value
  }
});

watch(() => taxCalculationInput.value.lastRetiredYearsOfService.settlementFinishDate, (value: any) => {
  incomeCalculationInput.value.settlementFinishDate = value
});

watch(() => [
  taxCalculationInput.value.prevRetiredYearsOfService.additionalDays,
  taxCalculationInput.value.lastRetiredYearsOfService.additionalDays
], () => {
  incomeCalculationInput.value.additionalDays = +taxCalculationInput.value.prevRetiredYearsOfService.additionalDays + +taxCalculationInput.value.lastRetiredYearsOfService.additionalDays
})
watch(() => [
  taxCalculationInput.value.prevRetiredYearsOfService.exclusionDays,
  taxCalculationInput.value.lastRetiredYearsOfService.exclusionDays
], () => {
  incomeCalculationInput.value.exclusionDays = +taxCalculationInput.value.prevRetiredYearsOfService.exclusionDays + +taxCalculationInput.value.lastRetiredYearsOfService.exclusionDays
})

watch(() => props.actionNextStep, () => {
  (document.getElementById("btn-next-step") as HTMLInputElement).click();
});


// watch(() => taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate, (newVal) => {
//   taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate = newVal
// });
// watch(paymentDay, (newVal) => {
//   store.commit('common/setPaymentDay', newVal)
// });

// =============== FUNCTION ================================
const openNewTab = () => {
  window.open('pa-120')
};
const positiveNumber = (value: any) => {
  return value.value > 0
}
const submitForm = (e: any) => {
  // validate input date time
  let dtValidate = true
  if (interimPaymentTab1.value && !taxCalculationInput.value.prevRetiredYearsOfService.settlementStartDate) {
    prevSettlementStartDate.value.validate(true)
    dtValidate = false
  } else {
    prevSettlementStartDate.value.validate(false)
  }
  if (interimPaymentTab1.value && !taxCalculationInput.value.prevRetiredYearsOfService.settlementFinishDate) {
    prevSettlementFinishDate.value.validate(true)
    dtValidate = false
  } else {
    prevSettlementFinishDate.value.validate(false)
  }

  if (!interimPaymentTab1.value && !taxCalculationInput.value.lastRetiredYearsOfService.settlementStartDate) {
    lastSettlementStartDate.value.validate(true)
    dtValidate = false
  } else {
    lastSettlementStartDate.value.validate(false)
  }
  if (!interimPaymentTab1.value && !taxCalculationInput.value.lastRetiredYearsOfService.settlementFinishDate) {
    lastSettlementFinishDate.value.validate(true)
    dtValidate = false
  } else {
    lastSettlementFinishDate.value.validate(false)
  }
  if (interimPaymentTab1.value && !taxCalculationInput.value.prevRetiredYearsOfService.paymentDate) {
    prevRetiredYearsOfServicePaymentDate.value.validate(true)
    dtValidate = false
  } else {
    prevRetiredYearsOfServicePaymentDate.value.validate(false)
  }
  if (!taxCalculationInput.value.lastRetiredYearsOfService.paymentDate) {
    lastRetiredYearsOfServicePaymentDate.value.validate(true)
    dtValidate = false
  }
  if (!incomeCalculationInput.value.settlementStartDate) {
    incomeCalculationInputSettlementStartDate.value.validate(true)
    dtValidate = false
  }
  if (!incomeCalculationInput.value.settlementFinishDate) {
    incomeCalculationInputSettlementFinishDate.value.validate(true)
    dtValidate = false
  }
  const res = e.validationGroup.validate();
  const res1 = formRef.value?.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
    dtValidate = true
  } else if (!dtValidate) {
    dtValidate = true
  } else {
    store.commit('common/setIncomeCalculationInput', incomeCalculationInput.value)
    store.commit('common/setTaxCalculationInput', taxCalculationInput.value)
    store.commit('common/setIsDisableBtnTab1', false)
    store.commit('common/setInputTab1', {...inputFormTab1.value, retirementType: props.retirementType})
    store.commit('common/setInterimPaymentTab1', interimPaymentTab1.value)
    emit('nextPage', true)
  }
}

</script>
<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
