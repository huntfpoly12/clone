<template>
  <standard-form class="modal-add">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="구분">
          <a-tag :color="dataDetail.retirementType == 2 ? 'green' : 'red'">
            {{ dataDetail.retirementType == 2 ? '중간정산' : '퇴직소득' }}
          </a-tag>
        </a-form-item>
        <a-form-item label="귀속/지급연월">
          <div class="d-flex-center">
            <month-picker-box-custom v-model:valueDate="attributionDate" disabled text="귀" bgColor="gray"/>
            <month-picker-box-custom v-model:valueDate="paymentYearAndMonth" disabled text="지"/>
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="label-required">
          <div class="d-flex-center">
            <number-box min="1" max="31" :required="true" width="150px"
                        v-model:valueInput="dataDetail.paymentDay" disabled/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring" style="width: 180px;">지급일은 저장 후 수정불가</div>
            </div>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="사원" class="label-required">
          <div class="d-flex-center">
            <employ-select :arrayValue="[employee]"
                           :valueEmploy="employee.employeeId" width="300px"
                           :required="true" disabled/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring" style="width: 180px;">대상: 사원과 일용직사<br>원 중 퇴직금 대상자.</div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="입사일">
          <div class="d-flex-center">
            <date-time-box width="130px" disabled :valueDate="employee.joinedAt"/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <div class="custom-waring">
                수정이 필요한 경우 <span style="cursor: pointer; color: blue;" @click="openTabFuc">[사원등록]
                                </span> 에서 수정하시기 바랍니다.
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="임원여부">
          <switch-basic textCheck="O" textUnCheck="X" width="60px" disabled
                        v-model:valueSwitch="formState.inputFormTab1.executive"/>
        </a-form-item>
        <a-form-item label="퇴직사유" class="label-required">
          <select-box-common :arrSelect="arrayReasonResignationUtils" disabled
                             v-model:valueInput="retirementReason" placeholder="선택"
                             width="150px"/>
        </a-form-item>
      </a-col>
      <div class="header-text-1">근속연수</div>
      <a-col :span="24">
        <checkbox-basic label="중간지급여부" class="mb-10" disabled
                        v-model:valueCheckbox="interimPaymentTab1"/>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">중간지급 근속연수</div>
        <a-form-item label="정산시작(기산)일" :class="interimPaymentTab1 ? 'label-required' : ''">
          <div class="d-flex-center">
            <!-- TODO PRE Settlement START DATE -->
            <date-time-box-custom
              width="150px" disabled
              v-model:valueDate="formState.prevRetiredYearsOfService.settlementStartDate"
              ref="prevSettlementStartDate"
              :startDate="employee.joinedAt ? dayjs(String(employee.joinedAt)) : employee.joinedAt"
              :finishDate="finishDateRetirement"
            />
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
                                  disabled
                                  :startDate="dayjs(String(formState.prevRetiredYearsOfService.settlementStartDate)).add(1, 'day')"
                                  :finishDate="finishDateRetirement"
                                  v-model:valueDate="formState.prevRetiredYearsOfService.settlementFinishDate"
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
            :required="interimPaymentTab1" width="150px" disabled
            v-model:valueDate="formState.prevRetiredYearsOfService.paymentDate"
            ref="prevRetiredYearsOfServicePaymentDate"
          />
        </a-form-item>
        <a-form-item label="제외일수">
          <div class="d-flex-center">
            <number-box-money
              :required="interimPaymentTab1" width="150px" disabled
              v-model:valueInput="formState.prevRetiredYearsOfService.exclusionDays"

              format="#0,###"
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
        <a-form-item label="가산일수">
          <div class="d-flex-center">
            <number-box-money :required="interimPaymentTab1" width="150px" disabled
                              v-model:valueInput="formState.prevRetiredYearsOfService.additionalDays"

                              format="#0,###"
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
          {{ dataPrevRetiredYearsOfService.yearsOfService || 0 }}년/
          {{ dataPrevRetiredYearsOfService.monthsOfService || 0 }}개월/
          {{ dataPrevRetiredYearsOfService.daysOfService || 0 }}일
        </div>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">최종 근속연수</div>
        <a-form-item label="정산시작(입사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box-custom :required="true" width="150px" disabled
                                  v-model:valueDate="formState.lastRetiredYearsOfService.settlementStartDate"
                                  :startDate="interimPaymentTab1? dayjs(String(formState.prevRetiredYearsOfService.settlementFinishDate)).add(1, 'day') : (employee.joinedAt ? dayjs(String(employee.joinedAt)).add(1, 'day') : employee.joinedAt)"
                                  :finishDate="finishDateRetirement"
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
                                  v-model:valueDate="formState.lastRetiredYearsOfService.settlementFinishDate"
                                  disabled
                                  :startDate="dayjs(String(formState.lastRetiredYearsOfService.settlementStartDate))"
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
          <date-time-box-custom :required="false" width="150px" disabled
                                v-model:valueDate="formState.lastRetiredYearsOfService.paymentDate"
                                ref="lastRetiredYearsOfServicePaymentDate"/>
        </a-form-item>
        <a-form-item label="제외일수" class="label-required">
          <div class="d-flex-center">
            <number-box :required="true" width="150px" disabled
                        v-model:valueInput="formState.lastRetiredYearsOfService.exclusionDays"/>
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
        <a-form-item label="가산일수" class="label-required">
          <div class="d-flex-center">
            <number-box :required="true" width="150px" disabled
                        v-model:valueInput="formState.lastRetiredYearsOfService.additionalDays"/>
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
          {{ dataLastRetiredYearsOfService.yearsOfService || 0 }}년/
          {{ dataLastRetiredYearsOfService.monthsOfService || 0 }}개월/
          {{ dataLastRetiredYearsOfService.daysOfService || 0 }}일
        </div>
      </a-col>
      <a-col :span="12" class="mt-10 custom-label"
             :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
        <div class="header-text-2 mb-10">중간지급 퇴직급여</div>
        {{ validatePreRetirementBenefitStatus  }}

        <a-form-item label="중간지급 퇴직급여">
          <div class="d-flex-center"
               :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
            <number-box-money width="150px" disabled
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="formState.prevRetirementBenefitStatus.retirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 비과세퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" :disabled="!interimPaymentTab1"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 과세대상 퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" disabled
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="taxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12" class="mt-10">
        <div class="header-text-2 mb-10">정산 근속연수</div>
        <!--        TODO incomeCalculationInput settlementStartDate -->
        <a-form-item label="정산시작(기산)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box width="150px" disabled :required="true"
                           v-model:valueDate="formState.incomeCalculationInput.settlementStartDate"
                           ref="incomeCalculationInputSettlementStartDate"/>
          </div>
        </a-form-item>
        <!--        TODO incomeCalculationInput settlementFinishDate -->
        <a-form-item label="정산종료(퇴사)일" class="label-required">
          <div class="d-flex-center">
            <date-time-box width="150px" disabled
                           v-model:valueDate="formState.incomeCalculationInput.settlementFinishDate"
                           ref="incomeCalculationInputSettlementFinishDate"/>
          </div>
        </a-form-item>
        <div>근속연수 / 근속월수 / 근속일수: {{ dataSettlement.yearsOfService || 0 }}년/{{ dataSettlement.monthsOfService || 0 }}개월/{{
            dataSettlement.daysOfService || 0
          }}일
        </div>
      </a-col>
    </a-row>
  </standard-form>
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watch, watchEffect} from 'vue'
import dayjs from "dayjs";
import {openTab} from '@/helpers/commonFunction';
import filters from '@/helpers/filters';
import {arrayReasonResignationUtils, Prev_Retired_Years_Of_Service} from '../../utils/index'
import {Formula} from "@bankda/jangbuda-common";
import {useStore} from 'vuex';
import {IncomeRetirement} from "@/views/PA/PA4/PA420/types";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

const props = defineProps<{ actionNextStep: number, dataDetail: IncomeRetirement }>()
const emit = defineEmits(['closePopup', 'nextPage'])

const prevRetiredYearsOfService = computed(() => props.dataDetail.specification?.specificationDetail.prevRetiredYearsOfService)
const lastRetiredYearsOfService = computed(() => props.dataDetail.specification?.specificationDetail.lastRetiredYearsOfService)
const prevRetirementBenefitStatus = computed(() => props.dataDetail.specification?.specificationDetail.prevRetirementBenefitStatus)
const FORM_STATE_OLD = computed(() => cloneDeep({
  prevRetiredYearsOfService: {
    settlementStartDate: prevRetiredYearsOfService.value?.settlementStartDate || null,
    settlementFinishDate: prevRetiredYearsOfService.value?.settlementFinishDate || null,
    paymentDate: prevRetiredYearsOfService.value?.paymentDate || null,
    exclusionDays: prevRetiredYearsOfService.value?.exclusionDays || 0,
    additionalDays: prevRetiredYearsOfService.value?.additionalDays || 0,
  },
  lastRetiredYearsOfService: {
    settlementStartDate: lastRetiredYearsOfService.value?.settlementStartDate || null,
    settlementFinishDate: lastRetiredYearsOfService.value?.settlementFinishDate || null,
    paymentDate: lastRetiredYearsOfService.value?.paymentDate || null,
    exclusionDays: lastRetiredYearsOfService.value?.exclusionDays || 0,
    additionalDays: lastRetiredYearsOfService.value?.additionalDays  || 0,
  },
  prevRetirementBenefitStatus: {
    retirementBenefits: prevRetirementBenefitStatus.value?.retirementBenefits || 0,
    nonTaxableRetirementBenefits: prevRetirementBenefitStatus.value?.nonTaxableRetirementBenefits  || 0,
    taxableRetirementBenefits: prevRetirementBenefitStatus.value?.taxableRetirementBenefits || 0,
  },
  incomeCalculationInput: {
    settlementStartDate: prevRetiredYearsOfService.value?.settlementStartDate || lastRetiredYearsOfService.value?.settlementStartDate,
    settlementFinishDate:  prevRetiredYearsOfService.value?.settlementFinishDate || lastRetiredYearsOfService.value?.settlementFinishDate,
    exclusionDays: (prevRetiredYearsOfService.value?.exclusionDays || 0) + (lastRetiredYearsOfService.value?.exclusionDays || 0),
    additionalDays: lastRetiredYearsOfService.value?.additionalDays || 0,
    annualLeaveAllowance: props.dataDetail.specification?.annualLeaveAllowance || 0,
    totalAnualBonus:props.dataDetail.specification?.totalAnualBonus || 0,
    totalPay3Month:props.dataDetail.specification?.totalPay3Month || 0,
  },
  inputFormTab1: {
    employeeId: props.dataDetail.employeeId,
    employeeType: props.dataDetail.employeeType,
    retirementType: props.dataDetail.retirementType,
    executive: props.dataDetail.specification?.executive,
    retirementReason: props.dataDetail.specification?.retirementReason,
  }
}))
const formState = reactive(cloneDeep(FORM_STATE_OLD.value))
// watch FORM_STATE_OLD for changes to the formState
watch(FORM_STATE_OLD, () => {
  Object.assign(formState, cloneDeep(FORM_STATE_OLD.value))
})

const retirementReason = computed(() => props.dataDetail.specification?.retirementReason)
const finishDateRetirement = computed(() => props.dataDetail.retirementType === 1 ? formState.lastRetiredYearsOfService.settlementFinishDate : null)
const interimPaymentTab1 = ref(false)
watch(props.dataDetail, (value) => {
  interimPaymentTab1.value = Boolean(value.specification?.specificationDetail.prevRetiredYearsOfService?.settlementStartDate)
})
const prevSettlementStartDate = ref()
const prevSettlementFinishDate = ref()
const lastSettlementStartDate = ref()
const lastSettlementFinishDate = ref()
const lastRetiredYearsOfServicePaymentDate = ref()
const incomeCalculationInputSettlementStartDate = ref()
const incomeCalculationInputSettlementFinishDate = ref()
const prevRetiredYearsOfServicePaymentDate = ref()

const store = useStore();
const employee = computed(() => store.getters['common/getEmployeeEdit']);
const ProcessKey = computed(() => store.getters['common/getSelectMonthColumn'])
// Checking if the month is less than 9, if it is, it is adding a 0 to the month.
let attributionDate = ref(`${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}`)
let paymentYearAndMonth = ref(`${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}`)

const dataPrevRetiredYearsOfService = computed(() => {
  if (formState.prevRetiredYearsOfService.settlementStartDate && formState.prevRetiredYearsOfService.settlementFinishDate) {
      new Date((formState.prevRetiredYearsOfService.settlementFinishDate).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      formState.prevRetiredYearsOfService.exclusionDays,
      formState.prevRetiredYearsOfService.additionalDays
    return Formula.getDateOfService(
      new Date((formState.prevRetiredYearsOfService.settlementStartDate).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date((formState.prevRetiredYearsOfService.settlementFinishDate).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      formState.prevRetiredYearsOfService.exclusionDays,
      formState.prevRetiredYearsOfService.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})
const dataLastRetiredYearsOfService = computed(() => {
  if (formState.lastRetiredYearsOfService.settlementStartDate && formState.lastRetiredYearsOfService.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date((formState.lastRetiredYearsOfService.settlementStartDate).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date((formState.lastRetiredYearsOfService.settlementFinishDate).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      formState.lastRetiredYearsOfService.exclusionDays,
      formState.lastRetiredYearsOfService.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})
const dataSettlement = computed(() => {
  if (formState.incomeCalculationInput.settlementStartDate && formState.incomeCalculationInput.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date(String(formState.incomeCalculationInput.settlementStartDate).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date(String(formState.incomeCalculationInput.settlementFinishDate).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      formState.incomeCalculationInput.exclusionDays,
      formState.incomeCalculationInput.additionalDays
    );
  }
  return {
    yearsOfService: 0,
    monthsOfService: 0,
    daysOfService: 0,
  }
})
const validatePreRetirementBenefitStatus = computed(() => {
  return +formState.prevRetirementBenefitStatus.retirementBenefits > 0 ||
    +formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits > 0 ||
    +formState.prevRetirementBenefitStatus.taxableRetirementBenefits > 0
})
const taxableRetirementBenefits = computed(() => +formState.prevRetirementBenefitStatus.retirementBenefits - +formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits )
const isChangeForm = computed(() => {
  return !isEqual(formState.inputFormTab1, FORM_STATE_OLD.value.inputFormTab1) ||
    !isEqual(formState, FORM_STATE_OLD.value) ||
    !isEqual(formState.incomeCalculationInput, FORM_STATE_OLD.value.incomeCalculationInput) ||
    attributionDate.value != `${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}` ||
    paymentYearAndMonth.value != `${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}` ||
    interimPaymentTab1.value
})
// =============== WATCH ==================================
// Step 1: Watch interimPaymentTab1 true or false
watch(interimPaymentTab1, (value) => {
  if (!value) {
    formState.prevRetiredYearsOfService = {...Prev_Retired_Years_Of_Service}
    formState.lastRetiredYearsOfService.settlementStartDate = cloneDeep(props.dataDetail.employee?.joinedAt) as number | null
  } else {
    formState.prevRetiredYearsOfService = cloneDeep(FORM_STATE_OLD.value.prevRetiredYearsOfService)
  }
})

watch(() => formState.prevRetiredYearsOfService.settlementStartDate, (value: any) => {
  if (value) {

    formState.incomeCalculationInput.settlementStartDate = value
    if (+value >= Number(formState.prevRetiredYearsOfService.settlementFinishDate)) {
      formState.prevRetiredYearsOfService.settlementFinishDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
    }
  }
});
watch(() => formState.prevRetiredYearsOfService.settlementFinishDate, (value: any) => {
  if (value && +value > Number(formState.lastRetiredYearsOfService.settlementStartDate)) {
    formState.lastRetiredYearsOfService.settlementStartDate = value
    formState.lastRetiredYearsOfService.settlementFinishDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
  }
});

watch(() => formState.lastRetiredYearsOfService.settlementStartDate, (value: any) => {
  if (!interimPaymentTab1.value) formState.incomeCalculationInput.settlementStartDate = value
});
watch(() => formState.lastRetiredYearsOfService.settlementFinishDate, (value: any) => {
  formState.incomeCalculationInput.settlementFinishDate = value
});
watch(() => [
  formState.prevRetiredYearsOfService.additionalDays,
  formState.lastRetiredYearsOfService.additionalDays
], () => {
  formState.incomeCalculationInput.additionalDays = +formState.prevRetiredYearsOfService.additionalDays + +formState.lastRetiredYearsOfService.additionalDays
})
watch(() => [
  formState.prevRetiredYearsOfService.exclusionDays,
  formState.lastRetiredYearsOfService.exclusionDays
], () => {
  formState.incomeCalculationInput.exclusionDays = +formState.lastRetiredYearsOfService.exclusionDays
})

// =============== FUNCTION ================================
const openTabFuc = () => {
  emit('closePopup', true)
  openTab({name: "일용직사원등록", url: "/pa-520", id: "pa-520"})
}

watch(() => props.actionNextStep, (newVal) => {
  (document.getElementById("btn-next-step") as HTMLInputElement).click();
});

</script>
<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
