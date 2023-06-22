<template>
  <standard-form class="modal-add" name="tab-1-420" ref="formRef">
    <a-spin :spinning="loading">
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
              <month-picker-box-custom v-model:valueDate="attributionDate" text="귀" bgColor="gray" disabled/>
              <month-picker-box-custom v-model:valueDate="paymentYearAndMonth" text="지" disabled/>
            </div>
          </a-form-item>
          <a-form-item label="지급일" class="label-required">
            <div class="d-flex-center">
              <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
                                    v-model:valueDate="paymentDay"/>
              <info-tool-tip class="ml-5">
                지급일은 저장 후 수정불가
              </info-tool-tip>
            </div>

          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="사원" class="label-required">
            <div class="d-flex-center">
              <employ-select :arrayValue="employeeList" :required="true"
                             v-model:valueEmploy="formState.inputFormTab1.employeeId" width="300px"/>
              <info-tool-tip class="ml-5">
                <div>대상: 사원과 일용직사</div>
                <div>원 중 퇴직금 대상자</div>
              </info-tool-tip>
            </div>
          </a-form-item>

          <a-form-item label="입사일">
            <div class="d-flex-center">
              <date-time-box width="150px" :disabled="true" :valueDate="joinedAt"/>
              <info-tool-tip class="ml-5">
                수정이 필요한 경우 <b @click="openNewTab" style="cursor: pointer;">[사원등록]</b>에서 수정하시기 바랍니다
              </info-tool-tip>
            </div>
          </a-form-item>
          <a-form-item label="임원여부">
            <switch-basic textCheck="O" textUnCheck="X" width="60px"
                          v-model:valueSwitch="formState.inputFormTab1.executive" />
          </a-form-item>
          <a-form-item label="퇴직사유" class="label-required">
            <select-box-common :arrSelect="arrayReasonResignationUtils" :required="true"
                               v-model:valueInput="retirementReason" placeholder="선택" width="150px"/>
          </a-form-item>
        </a-col>
        <div class="header-text-1">근속연수</div>
        <a-col :span="24">
          <checkbox-basic label="중간지급여부" class="mb-10"
                          v-model:valueCheckbox="interimPaymentTab1"/>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">중간지급 근속연수</div>
          <DxFieldCustom label="정산시작(기산)일" :required="interimPaymentTab1" class="field-custom">
            <div class="d-flex-center">
              <!-- TODO PRE Settlement START DATE -->
              <date-time-box-custom
                width="150px" :disabled="!interimPaymentTab1"
                v-model:valueDate="formState.prevRetiredYearsOfService.settlementStartDate"
                ref="prevSettlementStartDate"
                :startDate="joinedAt ? dayjs(String(joinedAt)) : joinedAt"
                :finishDate="finishDateRetirement && dayjs(String(finishDateRetirement))"
              />
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의
                  다음날입니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="정산종료(퇴사)일" :required="interimPaymentTab1" class="field-custom">
            <div class="d-flex-center">
              <!-- TODO PRE Settlement END DATE -->
              <date-time-box-custom width="150px"
                                    :disabled="!interimPaymentTab1"
                                    :startDate="dayjs(String(formState.prevRetiredYearsOfService.settlementStartDate)).add(1, 'day')"
                                    :finishDate="finishDateRetirement && dayjs(String(finishDateRetirement))"
                                    v-model:valueDate="formState.prevRetiredYearsOfService.settlementFinishDate"
                                    ref="prevSettlementFinishDate"/>
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="지급일" :required="interimPaymentTab1" class="field-custom">
            <date-time-box-custom
              :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
              v-model:valueDate="formState.prevRetiredYearsOfService.paymentDate"
              ref="prevRetiredYearsOfServicePaymentDate"
            />
          </DxFieldCustom>
          <DxFieldCustom label="제외일수" class="field-custom">
            <div class="d-flex-center">
              <number-box-money
                :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
                v-model:valueInput="formState.prevRetiredYearsOfService.exclusionDays"
                format="#0,###"
              />

              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="가산일수" class="field-custom">
            <div class="d-flex-center">
              <number-box-money :required="interimPaymentTab1" width="150px" :disabled="!interimPaymentTab1"
                          v-model:valueInput="formState.prevRetiredYearsOfService.additionalDays"
                          format="#0,###"
              />
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <div>
            근속연수 / 근속월수 / 근속일수:
            {{ dataPrevRetiredYearsOfService.yearsOfService }}년/
            {{ dataPrevRetiredYearsOfService.monthsOfService }}개월/
            {{ dataPrevRetiredYearsOfService.daysOfService }}일
          </div>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2 mb-10">최종 근속연수</div>
          <DxFieldCustom label="정산시작(입사)일" class="field-custom" required>
            <div class="d-flex-center">
              <date-time-box-custom :required="true" width="150px"
                                    v-model:valueDate="formState.lastRetiredYearsOfService.settlementStartDate"
                                    :startDate="interimPaymentTab1? dayjs(String(formState.prevRetiredYearsOfService.settlementFinishDate)).add(1, 'day') : (joinedAt ? dayjs(String(joinedAt)).add(1, 'day') : joinedAt)"
                                    :finishDate="finishDateRetirement && dayjs(String(finishDateRetirement))"
                                    ref="lastSettlementStartDate"/>
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다. 중간정산지급한 경우 중간정산 정산종료(퇴사)일의
                  다음날입니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="정산종료(퇴사)일" class="field-custom" required>
            <div class="d-flex-center">
              <date-time-box-custom :required="true" width="150px"
                                    v-model:valueDate="formState.lastRetiredYearsOfService.settlementFinishDate"
                                    :disabled="retirementType == 1"
                                    :startDate="dayjs(String(formState.lastRetiredYearsOfService.settlementStartDate)).add(1, 'day')"
                                    ref="lastSettlementFinishDate"/>
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="지급일" class="field-custom" required>
            <date-time-box-custom :required="false" disabled width="150px"
                                  v-model:valueDate="paymentDay"/>
          </DxFieldCustom>
          <DxFieldCustom label="제외일수" class="field-custom" required>
            <div class="d-flex-center">
              <number-box-money :required="true" width="150px" format="#0,###"
                          v-model:valueInput="formState.lastRetiredYearsOfService.exclusionDays"/>
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
          <DxFieldCustom label="가산일수" class="field-custom" required>
            <div class="d-flex-center">
              <number-box-money :required="true" width="150px" format="#0,###"
                          v-model:valueInput="formState.lastRetiredYearsOfService.additionalDays"/>
              <div class="ml-5 d-flex-center">
                <info-tool-tip class="ml-5">
                  정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다
                </info-tool-tip>
              </div>
            </div>
          </DxFieldCustom>
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
          <div>근속연수 / 근속월수 / 근속일수: {{ dataSettlement.yearsOfService }}년/{{ dataSettlement.monthsOfService }}개월/{{
              dataSettlement.daysOfService
            }}일
          </div>
        </a-col>
      </a-row>
      <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="submitForm" id="btn-next-step"
                    style="display: none;"/>
    </a-spin>
  </standard-form>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch, watchEffect} from 'vue'
import dayjs from "dayjs";
import {
  arrayReasonResignationUtils,
  FORM_STATE_TAB_1,
  INPUT_FORM_TAB_1,
  Prev_Retired_Years_Of_Service
} from '../../utils'
import {Formula} from "@bankda/jangbuda-common";
import filters from '@/helpers/filters';
import {useStore} from 'vuex';
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420";
import {companyId} from "@/helpers/commonFunction";
import DateTimeBoxCustom from "@/components/common/DateTimeBoxCustom.vue";
import NumberBoxMoney from "@/components/common/NumberBoxMoney.vue";

enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20,
}

interface Props {
  retirementIncome: EmployeeWageType,
  actionNextStep: number,
  retirementType: number,
}

const store = useStore();

const props = defineProps<Props>()
const emit = defineEmits(['nextPage'])
// const inputFormTab1:any = ref(cloneDeep(INPUT_FORM_TAB_1))
// const formState:any = ref(cloneDeep(TAX_CALCULATION_INPUT))
// const incomeCalculationInput:any = ref(cloneDeep(INCOME_CALCULATION_INPUT))

const formState: any = reactive(cloneDeep(FORM_STATE_TAB_1))

const interimPaymentTab1 = ref(false)

const prevSettlementStartDate = ref()
const prevSettlementFinishDate = ref()
const lastSettlementStartDate = ref()
const lastSettlementFinishDate = ref()
// const lastRetiredYearsOfServicePaymentDate = ref()
const incomeCalculationInputSettlementStartDate = ref()
const incomeCalculationInputSettlementFinishDate = ref()
const prevRetiredYearsOfServicePaymentDate = ref()

const joinedAt = ref(null)
const ProcessKey = computed(() => store.getters['common/getSelectMonthColumn'])
// Checking if the month is less than 9, if it is, it is adding a 0 to the month.
let attributionDate = ref(`${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}`)
let paymentYearAndMonth = ref(`${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}`)
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const incomeCalculationInputCur = computed(() => store.getters['common/getIncomeCalculationInput'])
const incomeCalculationInputOld = computed(() => store.getters['common/getIncomeCalculationInputOld'])
const employeeIdCreated = computed(() => store.getters['common/getEmployeeIdCreated'])
const startDate = computed(() => dayjs(`${paymentYearAndMonth.value}`).startOf('month').toDate());
const finishDate = computed(() => dayjs(`${paymentYearAndMonth.value}`).endOf('month').toDate());
// get employee list
const {
  result: resultEmployee,
  loading
} = useQuery(queries.findEmployeesForIncomeRetirement, {
  companyId: companyId,
  imputedMonth: selectMonthColumn.value.imputedMonth,
  imputedYear: selectMonthColumn.value.imputedYear,
  retirementType: props.retirementType,
}, () => ({
  fetchPolicy: "no-cache",
}));
const employeeList = computed(() => {
  if (!resultEmployee.value) return []
  const isJoinedBeforeSelectedMonth = (item: any) => (+item.joinedAt.toString().slice(0, 6) <= Number(`${selectMonthColumn.value.imputedYear}${filters.formatMonth(selectMonthColumn.value.imputedMonth)}`))
    && !employeeIdCreated.value?.find((i:any) => i.employeeId === item.employeeId && i.employeeType === item.type)
  const isLeavedAfterSelectedMonth = (item: any) => (+item.leavedAt.toString().slice(0, 6) >= Number(`${selectMonthColumn.value.imputedYear}${filters.formatMonth(selectMonthColumn.value.imputedMonth)}`))
   && !employeeIdCreated.value?.find((i:any) => i.employeeId === item.employeeId && i.employeeType === item.type);
  if (props.retirementIncome === EmployeeWageType.WAGE) { // 10
    if (props.retirementType === 1) { // 1 is leaved
      return resultEmployee.value.findEmployeesForIncomeRetirement.employeeWages.filter(isLeavedAfterSelectedMonth).filter((i:any) => i.type == props.retirementIncome)
    } else {
      return resultEmployee.value.findEmployeesForIncomeRetirement.employeeWages.filter(isJoinedBeforeSelectedMonth).filter((i:any) => i.type == props.retirementIncome)
    }
  } else {
    if (props.retirementType === 1) { // 1 is leaved
      return resultEmployee.value.findEmployeesForIncomeRetirement.employeeWageDailies.filter(isLeavedAfterSelectedMonth).filter((i:any) => i.type == props.retirementIncome)
    } else {
      return resultEmployee.value.findEmployeesForIncomeRetirement.employeeWageDailies.filter(isJoinedBeforeSelectedMonth).filter((i:any) => i.type == props.retirementIncome)
    }
  }
})

const validatePreRetirementBenefitStatus = computed(() => {
  return +formState.prevRetirementBenefitStatus.retirementBenefits > 0 ||
    +formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits > 0 ||
    +formState.prevRetirementBenefitStatus.taxableRetirementBenefits > 0
})
const taxableRetirementBenefits = computed(() => +formState.prevRetirementBenefitStatus.retirementBenefits - +formState.prevRetirementBenefitStatus.nonTaxableRetirementBenefits)
const retirementReasonOld = () => {
  if (props.retirementType === 1 && formState.inputFormTab1.executive) {
    return 4
  } else if (props.retirementType === 2) {
    return 5
  }
  return 99
}
const retirementReason = ref(retirementReasonOld())
// calculate date of service
const dataPrevRetiredYearsOfService = computed(() => {
  if (formState.prevRetiredYearsOfService.settlementStartDate && formState.prevRetiredYearsOfService.settlementFinishDate) {
    return Formula.getDateOfService(
      new Date((formState.prevRetiredYearsOfService.settlementStartDate as string).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date((formState.prevRetiredYearsOfService.settlementFinishDate as string).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
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
      new Date((formState.lastRetiredYearsOfService.settlementStartDate as string).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
      new Date((formState.lastRetiredYearsOfService.settlementFinishDate as string).toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')),
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
const finishDateRetirement = computed(() => props.retirementType === 1 ? formState.lastRetiredYearsOfService.settlementFinishDate : null)
const paymentDayOld = Number(`${paymentYearAndMonth.value}${store.getters['common/getPaymentDay']}`)
const paymentDay = ref(Number(`${paymentYearAndMonth.value}${store.getters['common/getPaymentDay']}`))
const formRef = ref()
// =============== WATCH ==================================
const isChangeForm = computed(() => {
  return !isEqual(formState.inputFormTab1, INPUT_FORM_TAB_1) ||
    !isEqual(formState, FORM_STATE_TAB_1) ||
    !isEqual(formState.incomeCalculationInput, FORM_STATE_TAB_1.incomeCalculationInput) ||
    attributionDate.value != `${ProcessKey.value.imputedYear}${filters.formatMonth(ProcessKey.value.imputedMonth)}` ||
    paymentYearAndMonth.value != `${ProcessKey.value.paymentYear}${filters.formatMonth(ProcessKey.value.paymentMonth)}` ||
    interimPaymentTab1.value ||
    paymentDay.value != paymentDayOld ||
    retirementReason.value !== retirementReasonOld()
})
// watchEffect(() => {
//   formState.lastRetiredYearsOfService.paymentDate = paymentDay.value
// })
watchEffect(() => {
  store.commit('common/setIsChangeForm', {tab1: isChangeForm.value})
})

// Step 1:  watch employeeId
watch(() => formState.inputFormTab1.employeeId, (value) => {
  let dataEmployee: any = employeeList.value.find((element: any) => element.employeeId == value)
  if(dataEmployee && dataEmployee.president) {
    if (props.retirementType === 1) {
      retirementReason.value = 4
    } else {
      retirementReason.value = 5
    }
  }
  formState.inputFormTab1.employeeType = dataEmployee?.type
  joinedAt.value = dataEmployee?.joinedAt // add join at of employee
  formState.lastRetiredYearsOfService.settlementStartDate = dataEmployee?.joinedAt
  formState.lastRetiredYearsOfService.settlementFinishDate = dataEmployee?.leavedAt
  formState.incomeCalculationInput.settlementStartDate = dataEmployee?.joinedAt
  if (interimPaymentTab1.value) {
    formState.prevRetiredYearsOfService.settlementStartDate = dataEmployee?.joinedAt
  }
});
// Step 2: Watch interimPaymentTab1 true or false
watch(interimPaymentTab1, (value) => {
  if (!value) {
    formState.prevRetiredYearsOfService = {...Prev_Retired_Years_Of_Service}
    formState.lastRetiredYearsOfService.settlementStartDate = cloneDeep(joinedAt.value)
  } else {
    formState.prevRetiredYearsOfService.settlementStartDate = cloneDeep(joinedAt.value)
    formState.incomeCalculationInput.settlementStartDate = cloneDeep(joinedAt.value)
  }
})
watch(() => formState.prevRetiredYearsOfService.settlementFinishDate, (value: any) => {
  if (value && +value > +formState.lastRetiredYearsOfService.settlementStartDate) {
    formState.lastRetiredYearsOfService.settlementStartDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
    // formState.lastRetiredYearsOfService.settlementFinishDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
  }
});

watch(() => formState.lastRetiredYearsOfService.settlementStartDate, (value: any) => {
  if (!interimPaymentTab1.value) formState.incomeCalculationInput.settlementStartDate = value
  // else if (value && +value > +formState.prevRetiredYearsOfService.settlementFinishDate) {
  //   formState.lastRetiredYearsOfService.settlementStartDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
  //   // formState.lastRetiredYearsOfService.settlementFinishDate = Number(dayjs(String(value)).add(1, 'day').format('YYYYMMDD'))
  // }
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

watch(() => props.actionNextStep, () => {
  (document.getElementById("btn-next-step") as HTMLInputElement).click();
});

watch(() => paymentYearAndMonth.value, (val) => {
  store.commit('common/setSelectMonthColumn', {
    paymentYear: parseInt(val.toString().slice(0, 4)),
    paymentMonth: parseInt(val.toString().slice(4, 6))
  })
})
// =============== FUNCTION ================================
const openNewTab = () => {
  window.open('pa-120')
};
const submitForm = (e: any) => {
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
    if (!isEqual({...incomeCalculationInputCur.value, ...incomeCalculationInput}, incomeCalculationInputOld.value)) {
      store.commit('common/setIncomeCalculationInputOld', {...incomeCalculationInputCur.value, ...incomeCalculationInput})
      store.commit('common/setIsDisableBtnTab1', true)
      store.commit('common/setNeedToRecalculatePa420', true)
    }
    store.commit('common/setTaxCalculationInput', {
      ...taxCalculationInput,
      prevRetirementBenefitStatus: {
        ...taxCalculationInput.prevRetirementBenefitStatus,
        taxableRetirementBenefits: taxableRetirementBenefits.value
      },
      lastRetiredYearsOfService: {
        ...taxCalculationInput.lastRetiredYearsOfService,
        paymentDate: paymentDay
      }
    })
    // store.commit('common/setIsDisableBtnTab1', false)
    store.commit('common/setInputTab1', {
      ...inputFormTab1,
      retirementType: props.retirementType,
      retirementReason: retirementReason.value,
      paymentDay: Number(dayjs(String(paymentDay.value)).format('DD'))
    })
    store.commit('common/setInterimPaymentTab1', interimPaymentTab1.value)
    emit('nextPage', true)
  }
}

</script>
<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
