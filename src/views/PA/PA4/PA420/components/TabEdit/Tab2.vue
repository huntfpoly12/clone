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

        <div class="mt-20 mb-20 wf-100">
          <div class="d-flex-center justify-content-center">
            <button-basic text="퇴직금 계산" type="default" mode="contained" @onClick="calculateIncomeRetirement"/>
            <div class="absolute ml-5 d-flex-center">
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
import {computed, reactive, ref, watch, watchEffect} from 'vue'
import {useApolloClient} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import {companyId} from '@/helpers/commonFunction';
import {useStore} from 'vuex';
import {IncomeRetirement} from "@/views/PA/PA4/PA420/types";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

interface DataFormIncomeCalculation {
  additionalDays: number;
  annualLeaveAllowance: number;
  exclusionDays: number;
  settlementFinishDate: number;
  settlementStartDate: number;
  totalAnualBonus: number;
  totalPay3Month: number;
}

const props = defineProps<{ dataDetail: IncomeRetirement }>()
const emit = defineEmits(['closePopup', 'nextPage'])

const store = useStore();
const incomeCalculationInput = computed(() => store.getters['common/getIncomeCalculationInput'])

const dataFormOld = computed(() => cloneDeep(incomeCalculationInput.value))

const dataFormIncomeCalculation = reactive<DataFormIncomeCalculation>(cloneDeep(incomeCalculationInput.value))
const dataIncomeRetirement = ref(0)
const definedRetirementBenefits = ref(0) // 5. 퇴직급여(확정)

const isChangeForm = computed(() => !isEqual(dataFormIncomeCalculation, dataFormOld.value))
const emptyForm = computed(() => {
  return dataFormIncomeCalculation.totalAnualBonus === 0 || dataFormIncomeCalculation.totalPay3Month === 0 || dataFormIncomeCalculation.annualLeaveAllowance === 0
})
store.commit('common/setIsDisableBtnTab2', emptyForm.value)

// watch isChangeForm to set value to store
watch(isChangeForm, (value) => {
  store.commit('common/setIsChangeForm', {tab2: value})
  store.commit('common/setIsDisableBtnTab2', value)
}, {deep: true})

watchEffect(() => {
  console.log('props.', props.dataDetail)
  dataIncomeRetirement.value = props.dataDetail.specification?.expectedRetirementBenefits || 0
  definedRetirementBenefits.value= props.dataDetail.specification?.definedRetirementBenefits || 0
})
// watch definedRetirementBenefits to set value to store
watchEffect( () => {
  store.commit('common/setDefinedRetirementBenefits', definedRetirementBenefits.value)
})
const trigger = ref(false)
const formRef = ref()
const { client } = useApolloClient()

const calculateIncomeRetirement = async () => {
  const res = formRef.value?.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    console.log('dataFormIncomeCalculation', dataFormIncomeCalculation)
    const { data } = await client.query({
      query: queries.calculateIncomeRetirement,
      variables: {
        companyId: companyId,
        input: {
          ...incomeCalculationInput.value,
          totalPay3Month:dataFormIncomeCalculation.totalPay3Month,
          totalAnualBonus:dataFormIncomeCalculation.totalAnualBonus,
          annualLeaveAllowance:dataFormIncomeCalculation.annualLeaveAllowance,
        },
      },
    })
    if (data) {
      dataIncomeRetirement.value = data.calculateIncomeRetirement;
      store.commit('common/setIncomeCalculationInput', {...dataFormIncomeCalculation})
      store.commit('common/setIsDisableBtnTab2', false)
      trigger.value = false;
    }
  }
}
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
<style scoped lang="scss">
::v-deep label {
  min-width: 250px !important;
}
::v-deep .custom-input-number .dx-texteditor-input {
  color: red;
}
.absolute {
  position: absolute;
  left: 60%;
}
</style>
