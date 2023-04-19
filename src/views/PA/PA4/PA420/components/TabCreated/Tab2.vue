<template>
  <a-row :gutter="16">
    <a-col :span="6"></a-col>
    <a-col :span="12" class="custom-label">
      <standard-form formName="pa-420" ref="formRef">
        <div class="header-text-2 mb-10">급여/상여/수당</div>
        <a-form-item label="퇴직전 3개월 임금 총액 (세전)">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.totalPay3Month"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연간 상여금 총액">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.totalAnualBonus"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연차수당">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.annualLeaveAllowance"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>

        <div class="d-flex mt-20 mb-20 wf-100">
          <div class="d-flex-center" style="margin-left: 250px;">
            <button-basic text="퇴직금 계산" type="default" mode="contained" @onClick="calculateIncomeRetirement"
                          :disabled="isDisableBtnCalculate"/>
            <div class="ml-5 d-flex-center">
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              <span class="custom-waring">상기 급여(수당)으로 퇴직금 계산합니다.</span>
            </div>
          </div>
        </div>
      </standard-form>
      <div class="header-text-2 mb-10">퇴직급여</div>
      <div class="retire-benefit">
        <a-form-item label="퇴직급여(예상)">
          <div class="d-flex-center">
            <number-box-money v-model:valueInput="dataIncomeRetirement" :required="false" width="200px" :disabled="true" format="#0,###"/>
            <span class="pl-5 mr-5">원</span>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.
              </template>
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
            </a-tooltip>
          </div>

        </a-form-item>
        <a-form-item label="퇴직급여(확정)">
          <div class="d-flex-center"
               :class="definedRetirementBenefits != Number(dataIncomeRetirement) ? 'custom-input-number' : ''">
            <number-box-money :required="false" width="200px"
                              v-model:valueInput="definedRetirementBenefits" format="#0,###"/>
            <span class="pl-5 mr-5">원</span>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                실제 지급된 퇴직급여를 입력합니다.
              </template>
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
            </a-tooltip>
          </div>

        </a-form-item>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import {companyId} from "@/helpers/commonFunction"
import notification from '@/utils/notification';
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import {useStore} from "vuex";
import {Message} from "@/configs/enum";

interface DataFormIncomeCalculation {
  additionalDays: number;
  annualLeaveAllowance: number;
  exclusionDays: number;
  settlementFinishDate: number;
  settlementStartDate: number;
  totalAnualBonus: number;
  totalPay3Month: number;
}

interface DataFormTaxCalculation {
  additionalDays: number;
  annualLeaveAllowance: number;
}

const trigger = ref<boolean>(false)
const dataIncomeRetirement = ref()
const store = useStore()
const incomeCalculationInput = computed(() => store.getters['common/getIncomeCalculationInput'])

const dataFormIncomeCalculation = ref<DataFormIncomeCalculation>(cloneDeep(incomeCalculationInput.value))
const dataFormOld = ref<DataFormIncomeCalculation>(cloneDeep(incomeCalculationInput.value))
const isChangeForm = computed(() => !isEqual(dataFormIncomeCalculation.value, dataFormOld.value))

const isDisableBtnCalculate = ref(true)

const definedRetirementBenefits = ref(0) // 5. 퇴직급여(확정)
const emptyForm = computed(() => {
  return dataFormIncomeCalculation.value.totalAnualBonus === 0 || dataFormIncomeCalculation.value.totalPay3Month === 0 || dataFormIncomeCalculation.value.annualLeaveAllowance === 0
})
store.commit('common/setIsDisableBtnTab2', emptyForm.value)

// watch isChangeForm to set value to store
watch(isChangeForm, (value) => {
  store.commit('common/setIsChangeForm', {tab2: value})
}, {deep: true})

// watch definedRetirementBenefits to set value to store
watch(definedRetirementBenefits, (value) => {
  store.commit('common/setDefinedRetirementBenefits', value)
})
watch([isChangeForm, emptyForm], ([valueIsChangeForm, valueEmptyForm]) => {
  isDisableBtnCalculate.value = !valueIsChangeForm || valueEmptyForm
}, {deep: true})
const formRef = ref()
const {
  result, loading, refetch, onError, onResult
} = useQuery(queries.calculateIncomeRetirement,  {
  companyId: companyId,
  input: dataFormIncomeCalculation.value,
}, () => ({
  enabled: trigger.value,
  fetchPolicy: "no-cache",
}))
onError(e => {
  notification('error', e.message)
  isDisableBtnCalculate.value = false
  trigger.value = false;
})
onResult(({data}) => {
  if (data) {
    dataIncomeRetirement.value = data.calculateIncomeRetirement;
    store.commit('common/setIncomeCalculationInput', {...dataFormIncomeCalculation.value})
    store.commit('common/setIsDisableBtnTab2', false)
    trigger.value = false;

  }
})
//
const calculateIncomeRetirement = () => {
  const res = formRef.value?.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    isDisableBtnCalculate.value = true
    trigger.value = true;
  }
}
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
<style scoped lang="scss">
::v-deep label {
  min-width: 200px !important;
}

::v-deep .custom-input-number .dx-texteditor-input {
  color: red;
}
</style>
