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
            <month-picker-box-custom v-model:valueDate="attributionDate" text="귀" bgColor="gray" disabled/>
            <month-picker-box-custom v-model:valueDate="paymentYearAndMonth" text="지" disabled/>
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="label-required">
          <div class="d-flex-center">
            <date-time-box-custom width="150px" disabled v-model:valueDate="paymentDay"/>
            <info-tool-tip>지급일은 저장 후 수정불가</info-tool-tip>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="사원" class="label-required">
          <div class="d-flex-center">
            <employ-select :arrayValue="[employee]"
                           :valueEmploy="employee.employeeId" width="300px"
                           :required="true" disabled="true"/>
            <info-tool-tip>대상: 사원과 일용직사<br>원 중 퇴직금 대상자.</info-tool-tip>
          </div>
        </a-form-item>
        <a-form-item label="입사일">
          <div class="d-flex-center">
            <date-time-box width="130px" disabled="true" :valueDate="employee.joinedAt"/>
            <info-tool-tip>수정이 필요한 경우 <span style="cursor: pointer; color: blue;" @click="openTabFuc">[사원등록]</span> 에서 수정하시기 바랍니다.</info-tool-tip>
          </div>
        </a-form-item>
        <a-form-item label="임원여부">
          <switch-basic textCheck="O" textUnCheck="X" width="60px"
                        v-model:valueSwitch="formState.inputFormTab1.executive" :disabled="retirementStatus === 20"/>
        </a-form-item>
        <a-form-item label="퇴직사유" class="label-required">
          <select-box-common :arrSelect="arrayReasonResignationUtils" :required="true"
                             v-model:valueInput="retirementReason" placeholder="선택"
                             width="150px" :disabled="retirementStatus === 20"/>
        </a-form-item>
      </a-col>
      <div class="header-text-1">근속연수</div>
      <a-col :span="24">
        <checkbox-basic label="중간지급여부" class="mb-10"
                        v-model:valueCheckbox="interimPaymentTab1" :disabled="retirementStatus === 20"/>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">중간지급 근속연수</div>
        <DxFieldCustom label="정산시작(기산)일" :required="interimPaymentTab1" class="field-custom">
          <div class="d-flex-center">
            <!-- TODO PRE Settlement START DATE -->
            <date-time-box-custom
              width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
              v-model:valueDate="formState.prevRetiredYearsOfService.settlementStartDate"
              ref="prevSettlementStartDate"
              :startDate="employee.joinedAt ? dayjs(String(employee.joinedAt)) : employee.joinedAt"
              :finishDate="finishDateRetirement"
            />
            <info-tool-tip>
              퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의 다음날입니다.
            </info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="지급일" :required="interimPaymentTab1" class="field-custom">
          <div class="d-flex-center">
            <!-- TODO PRE Settlement END DATE -->
            <date-time-box-custom width="150px"
                                  :disabled="!interimPaymentTab1 || retirementStatus === 20"
                                  :startDate="dayjs(String(formState.prevRetiredYearsOfService.settlementStartDate)).add(1, 'day')"
                                  :finishDate="finishDateRetirement"
                                  v-model:valueDate="formState.prevRetiredYearsOfService.settlementFinishDate"
                                  ref="prevSettlementFinishDate"/>
            <info-tool-tip>
              퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
            </info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="지급일" :required="interimPaymentTab1" class="field-custom">
          <date-time-box-custom
            :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
            v-model:valueDate="formState.prevRetiredYearsOfService.paymentDate"
            ref="prevRetiredYearsOfServicePaymentDate"
          />
        </DxFieldCustom>
        <DxFieldCustom label="제외일수" class="field-custom">
          <div class="d-flex-center">
            <number-box-money
              :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
              v-model:valueInput="formState.prevRetiredYearsOfService.exclusionDays"
              format="#0,###"
            />
            <info-tool-tip>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="가산일수" class="field-custom">
          <div class="d-flex-center">
            <number-box-money :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
                              v-model:valueInput="formState.prevRetiredYearsOfService.additionalDays"

                              format="#0,###"
            />
            <info-tool-tip>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</info-tool-tip>
          </div>
        </DxFieldCustom>
        <div>
          근속연수 / 근속월수 / 근속일수:
          {{ dataPrevRetiredYearsOfService.yearsOfService || 0 }}년/
          {{ dataPrevRetiredYearsOfService.monthsOfService || 0 }}개월/
          {{ dataPrevRetiredYearsOfService.daysOfService || 0 }}일
        </div>
      </a-col>
      <a-col :span="12">
        <div class="header-text-2 mb-10">최종 근속연수</div>
        <DxFieldCustom label="정산시작(입사)일" class="field-custom" required>
          <div class="d-flex-center">
            <date-time-box-custom :required="true" width="150px"
                                  v-model:valueDate="formState.lastRetiredYearsOfService.settlementStartDate"
                                  :startDate="interimPaymentTab1? dayjs(String(formState.prevRetiredYearsOfService.settlementFinishDate)).add(1, 'day') : (employee.joinedAt ? dayjs(String(employee.joinedAt)).add(1, 'day') : employee.joinedAt)"
                                  :finishDate="finishDateRetirement"
                                  ref="lastSettlementStartDate"
                                  :disabled="retirementStatus === 20"
            />
            <info-tool-tip>
              퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의 다음날입니다.
            </info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="정산종료(퇴사)일" class="field-custom" required>
        <div class="d-flex-center">
            <date-time-box-custom :required="true" width="150px"
                                  v-model:valueDate="formState.lastRetiredYearsOfService.settlementFinishDate"
                                  :disabled="dataDetail.retirementType == 1 || retirementStatus === 20"
                                  :startDate="dayjs(String(formState.lastRetiredYearsOfService.settlementStartDate))"
                                  ref="lastSettlementFinishDate"/>
            <info-tool-tip>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="지급일" class="field-custom" required>
          <date-time-box-custom disabled width="150px" v-model:valueDate="paymentDay"/>
        </DxFieldCustom>
        <DxFieldCustom label="제외일수" class="field-custom" required>
          <div class="d-flex-center">
            <number-box-money :required="true" width="150px" format="#0,###"
                              :disabled="retirementStatus === 20"
                        v-model:valueInput="formState.lastRetiredYearsOfService.exclusionDays"/>
            <info-tool-tip>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</info-tool-tip>
          </div>
        </DxFieldCustom>
        <DxFieldCustom label="가산일수" class="field-custom" required>
          <div class="d-flex-center">
            <number-box-money :required="true" width="150px" format="#0,###"
                              :disabled="retirementStatus === 20"
                        v-model:valueInput="formState.lastRetiredYearsOfService.additionalDays"/>
            <info-tool-tip>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</info-tool-tip>
          </div>
        </DxFieldCustom>
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
        <a-form-item label="중간지급 퇴직급여">
          <div class="d-flex-center"
               :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
            <number-box-money width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="formState.prevRetirementBenefitStatus.retirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 비과세퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" :disabled="!interimPaymentTab1 || retirementStatus === 20"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="중간지급 과세대상 퇴직급여"
                     :class="interimPaymentTab1 && validatePreRetirementBenefitStatus ? 'label-required' : ''">
          <div class="d-flex-center">
            <number-box-money width="150px" :disabled="true"
                              :required="interimPaymentTab1 && validatePreRetirementBenefitStatus"
                              v-model:valueInput="taxableRetirementBenefits"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12" class="mt-10">
        <div class="header-text-2 mb-10">정산 근속연수</div>
        <!--        TODO incomeCalculationInput settlementStartDate -->
        <DxFieldCustom label="정산시작(기산)일" class="field-custom" required>
          <div class="d-flex-center">
            <date-time-box width="150px" disabled :required="true"
                           v-model:valueDate="formState.incomeCalculationInput.settlementStartDate"
                           ref="incomeCalculationInputSettlementStartDate"/>
          </div>
        </DxFieldCustom>
        <!--        TODO incomeCalculationInput settlementFinishDate -->
        <DxFieldCustom label="정산종료(퇴사)일" class="field-custom" required>
          <div class="d-flex-center">
            <date-time-box width="150px" disabled
                           v-model:valueDate="formState.incomeCalculationInput.settlementFinishDate"
                           ref="incomeCalculationInputSettlementFinishDate"/>
          </div>
        </DxFieldCustom>
        <div>근속연수 / 근속월수 / 근속일수: {{ dataSettlement.yearsOfService || 0 }}년/{{ dataSettlement.monthsOfService || 0 }}개월/{{
            dataSettlement.daysOfService || 0
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
import {openTab} from '@/helpers/commonFunction';
import filters from '@/helpers/filters';
import {arrayReasonResignationUtils, Prev_Retired_Years_Of_Service} from '../../utils/index'
import {Formula} from "@bankda/jangbuda-common";
import {useStore} from 'vuex';
import {IncomeRetirement} from "@/views/PA/PA4/PA420/types";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import DateTimeBoxCustom from "@/components/common/DateTimeBoxCustom.vue";

const props = defineProps<{ actionNextStep: number, dataDetail: IncomeRetirement }>()
const emit = defineEmits(['closePopup', 'nextPage'])

const prevRetiredYearsOfService = props.dataDetail.specification?.specificationDetail.prevRetiredYearsOfService
const lastRetiredYearsOfService = props.dataDetail.specification?.specificationDetail.lastRetiredYearsOfService
const prevRetirementBenefitStatus = props.dataDetail.specification?.specificationDetail.prevRetirementBenefitStatus
const FORM_STATE_OLD: any = cloneDeep({
  prevRetiredYearsOfService: {
    settlementStartDate: prevRetiredYearsOfService?.settlementStartDate || null,
    settlementFinishDate: prevRetiredYearsOfService?.settlementFinishDate || null,
    paymentDate: prevRetiredYearsOfService?.paymentDate || null,
    exclusionDays: prevRetiredYearsOfService?.exclusionDays || 0,
    additionalDays: prevRetiredYearsOfService?.additionalDays || 0,
  },
  lastRetiredYearsOfService: {
    settlementStartDate: lastRetiredYearsOfService?.settlementStartDate || null,
    settlementFinishDate: lastRetiredYearsOfService?.settlementFinishDate || null,
    paymentDate: lastRetiredYearsOfService?.paymentDate || null,
    exclusionDays: lastRetiredYearsOfService?.exclusionDays || 0,
    additionalDays: lastRetiredYearsOfService?.additionalDays  || 0,
  },
  prevRetirementBenefitStatus: {
    retirementBenefits: prevRetirementBenefitStatus?.retirementBenefits || 0,
    nonTaxableRetirementBenefits: prevRetirementBenefitStatus?.nonTaxableRetirementBenefits  || 0,
    taxableRetirementBenefits: prevRetirementBenefitStatus?.taxableRetirementBenefits || 0,
  },
  incomeCalculationInput: {
    settlementStartDate: prevRetiredYearsOfService?.settlementStartDate || lastRetiredYearsOfService?.settlementStartDate,
    settlementFinishDate:  prevRetiredYearsOfService?.settlementFinishDate || lastRetiredYearsOfService?.settlementFinishDate,
    exclusionDays: lastRetiredYearsOfService?.exclusionDays || 0,
    additionalDays: (prevRetiredYearsOfService?.additionalDays || 0) + (lastRetiredYearsOfService?.additionalDays || 0) ,
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
})
const store = useStore();

const formState = reactive(cloneDeep(FORM_STATE_OLD))
// watch FORM_STATE_OLD for changes to the formState
store.commit('common/setIncomeCalculationInputOld', cloneDeep(FORM_STATE_OLD.incomeCalculationInput))
const retirementStatus = computed(() => store.getters["common/getRetirementStatus"]);

const retirementReason = ref(props.dataDetail.specification?.retirementReason)
const finishDateRetirement = computed(() => props.dataDetail.retirementType === 1 ? formState.lastRetiredYearsOfService.settlementFinishDate : null)
const interimPaymentTab1Old = Boolean(props.dataDetail.specification?.specificationDetail.prevRetiredYearsOfService?.settlementStartDate)
const interimPaymentTab1 = ref(interimPaymentTab1Old)
const prevSettlementStartDate = ref()
const prevSettlementFinishDate = ref()
const lastSettlementStartDate = ref()
const lastSettlementFinishDate = ref()
// const lastRetiredYearsOfServicePaymentDate = ref()
const incomeCalculationInputSettlementStartDate = ref()
const incomeCalculationInputSettlementFinishDate = ref()
const prevRetiredYearsOfServicePaymentDate = ref()

const employee = computed(() => store.getters['common/getEmployeeEdit']);
const ProcessKey = computed(() => store.getters['common/getSelectMonthColumn'])
const incomeCalculationInputCur = computed(() => store.getters['common/getIncomeCalculationInput'])
const incomeCalculationInputOld = computed(() => store.getters['common/getIncomeCalculationInputOld'])
// Checking if the month is less than 9, if it is, it is adding a 0 to the month.
let attributionDate = ref(`${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}`)
let paymentYearAndMonth = ref(`${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}`)
const paymentDay = computed(() => `${paymentYearAndMonth.value}${props.dataDetail.paymentDay}`)
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
  return !isEqual(formState.inputFormTab1, FORM_STATE_OLD.inputFormTab1) ||
    !isEqual(formState, FORM_STATE_OLD) ||
    !isEqual(formState.incomeCalculationInput, FORM_STATE_OLD.incomeCalculationInput) ||
    attributionDate.value != `${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}` ||
    paymentYearAndMonth.value != `${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}` ||
    interimPaymentTab1.value !== interimPaymentTab1Old ||
    retirementReason.value !== props.dataDetail.specification?.retirementReason
})
watch(() => paymentYearAndMonth.value, (val) => {
  store.commit('common/setSelectMonthColumn', {
    paymentYear: parseInt(val.toString().slice(0, 4)),
    paymentMonth: parseInt(val.toString().slice(4, 6))
  })
})
watchEffect(() => {
  store.commit('common/setIsChangeForm', {tab1: isChangeForm.value})
})
// =============== WATCH ==================================
// Step 1: Watch interimPaymentTab1 true or false
watch(interimPaymentTab1, (value) => {
  if (!value) {
    formState.prevRetiredYearsOfService = {...Prev_Retired_Years_Of_Service}
    formState.lastRetiredYearsOfService.settlementStartDate = cloneDeep(props.dataDetail.employee?.joinedAt) as number | null
  } else {
    formState.prevRetiredYearsOfService = cloneDeep(FORM_STATE_OLD.prevRetiredYearsOfService)
    formState.prevRetiredYearsOfService.settlementStartDate = props.dataDetail.employee?.joinedAt
    formState.lastRetiredYearsOfService.settlementStartDate = ''
  }
})

// watch(() => formState.prevRetiredYearsOfService.settlementStartDate, (value: any) => {
//   if (value) {
//
//     formState.incomeCalculationInput.settlementStartDate = value
//     if (+value >= Number(formState.prevRetiredYearsOfService.settlementFinishDate)) {
//       formState.prevRetiredYearsOfService.settlementFinishDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
//     }
//   }
// });
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

const submitForm = (e: any) => {
  if (retirementStatus.value === 20) {
    emit('nextPage', true)
    return
  }
  // validate input date time
  let dtValidate = true
  if (interimPaymentTab1.value && !formState.prevRetiredYearsOfService.settlementStartDate) {
    prevSettlementStartDate.value.validate(true)
    dtValidate = false
  } else {
    prevSettlementStartDate.value.validate(false)
  }
  if (interimPaymentTab1.value && !formState.prevRetiredYearsOfService.settlementFinishDate) {
    prevSettlementFinishDate.value.validate(true)
    dtValidate = false
  } else {
    prevSettlementFinishDate.value.validate(false)
  }

  if (!interimPaymentTab1.value && !formState.lastRetiredYearsOfService.settlementStartDate) {
    lastSettlementStartDate.value.validate(true)
    dtValidate = false
  } else {
    lastSettlementStartDate.value.validate(false)
  }
  if (!interimPaymentTab1.value && !formState.lastRetiredYearsOfService.settlementFinishDate) {
    lastSettlementFinishDate.value.validate(true)
    dtValidate = false
  } else {
    lastSettlementFinishDate.value.validate(false)
  }
  if (interimPaymentTab1.value && !formState.prevRetiredYearsOfService.paymentDate) {
    prevRetiredYearsOfServicePaymentDate.value.validate(true)
    dtValidate = false
  } else {
    prevRetiredYearsOfServicePaymentDate.value.validate(false)
  }
  if (!formState.incomeCalculationInput.settlementStartDate) {
    incomeCalculationInputSettlementStartDate.value.validate(true)
    dtValidate = false
  }
  if (!formState.incomeCalculationInput.settlementFinishDate) {
    incomeCalculationInputSettlementFinishDate.value.validate(true)
    dtValidate = false
  }
  const res = e.validationGroup.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
    dtValidate = true
  } else if (!dtValidate) {
    dtValidate = true
  } else {
    const {inputFormTab1, incomeCalculationInput, ...taxCalculationInput} = formState
    store.commit('common/setIncomeCalculationInput', incomeCalculationInput)
    if (!isEqual( {...incomeCalculationInputCur.value, ...incomeCalculationInput}, incomeCalculationInputOld.value)) {
      store.commit('common/setIncomeCalculationInputOld', {...incomeCalculationInputCur.value, ...incomeCalculationInput})
      store.commit('common/setIsDisableBtnTab1', true)
      store.commit('common/setNeedToRecalculatePa420', true)
    }
    store.commit('common/setTaxCalculationInput', {
      ...taxCalculationInput,
      prevRetirementBenefitStatus: {
        ...taxCalculationInput.prevRetirementBenefitStatus,
        taxableRetirementBenefits: taxableRetirementBenefits.value
      }
    })
    store.commit('common/setInputTab1', {
      ...inputFormTab1,
      retirementType: props.dataDetail.retirementType,
      retirementReason: retirementReason.value
    })
    store.commit('common/setInterimPaymentTab1', interimPaymentTab1.value)
    emit('nextPage', true)
  }
}

watch(() => props.actionNextStep, (newVal) => {
  (document.getElementById("btn-next-step") as HTMLInputElement).click();
});

</script>
<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
