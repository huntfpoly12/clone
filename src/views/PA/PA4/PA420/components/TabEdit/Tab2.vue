<template>
  <a-row :gutter="16">
    <a-col :span="6"></a-col>
    <a-col :span="12" class="custom-label">
      <standard-form formName="pa-420" ref="formRef">
        <div class="header-text-2 mb-10">급여/상여/수당</div>
        <a-form-item label="퇴직전 3개월 임금 총액 (세전)">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.totalPay3Month"
                              format="#0,###"
                              :disabled="!isEdit"
            />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연간 상여금 총액">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.totalAnualBonus"
                              format="#0,###"
                              :disabled="!isEdit"
            />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연차수당">
          <div class="d-flex-center">
            <number-box-money required width="200px" v-model:valueInput="dataFormIncomeCalculation.annualLeaveAllowance"
                              format="#0,###"
                              :disabled="!isEdit"
            />
            <span class="pl-5">원</span>
          </div>
        </a-form-item>

        <div class="mt-20 mb-20 wf-100">
          <div class="d-flex-center justify-content-center">
            <button-basic text="퇴직금 계산" type="default" mode="contained" @onClick="calculateIncomeRetirement" :disabled="!isEdit"/>
            <info-tool-tip>상기 급여(수당)으로 퇴직금 계산합니다.</info-tool-tip>
          </div>
        </div>
      </standard-form>
      <div class="header-text-2 mb-10">퇴직급여</div>
      <div class="retire-benefit">
        <a-form-item label="퇴직급여(예상)">
          <div class="d-flex-center">
            <number-box-money v-model:valueInput="dataIncomeRetirement" :required="false" width="200px" :disabled="true"
                              format="#0,###"/>
            <span class="pl-5">원</span>
            <info-tool-tip>상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.</info-tool-tip>
          </div>

        </a-form-item>
        <a-form-item label="퇴직급여(확정)">
          <div class="d-flex-center"
               :class="definedRetirementBenefits != Number(dataIncomeRetirement) ? 'custom-input-number' : ''">
            <number-box-money :required="false" width="200px" :disabled="!isEdit"
                              v-model:valueInput="definedRetirementBenefits" format="#0,###"/>
            <span class="pl-5">원</span>
            <info-tool-tip>실제 지급된 퇴직급여를 입력합니다.</info-tool-tip>
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
import { companyId, userType } from '@/helpers/commonFunction';
import {useStore} from 'vuex';
import {IncomeRetirement} from "@/views/PA/PA4/PA420/types";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

interface DataFormIncomeCalculation {
  annualLeaveAllowance: number;
  totalAnualBonus: number;
  totalPay3Month: number;
}

const props = defineProps<{ dataDetail: IncomeRetirement }>()
// const emit = defineEmits(['closePopup', 'nextPage'])

const store = useStore();
const incomeCalculationInput = computed(() => store.getters['common/getIncomeCalculationInput'])
const isDisableBtnTab1 = computed(() => store.getters["common/getIsDisableBtnTab1"]);
const retirementStatus = computed(() => store.getters["common/getRetirementStatus"]);
const dataFormOld = {
  annualLeaveAllowance: props.dataDetail.specification?.annualLeaveAllowance || 0,
  totalAnualBonus: props.dataDetail.specification?.totalAnualBonus || 0,
  totalPay3Month: props.dataDetail.specification?.totalPay3Month || 0,
}
const dataFormIncomeCalculation = reactive<DataFormIncomeCalculation>(cloneDeep(dataFormOld))
const dataIncomeRetirement = ref(props.dataDetail.specification?.expectedRetirementBenefits)
const definedRetirementBenefits = ref(props.dataDetail.specification?.definedRetirementBenefits) // 5. 퇴직급여(확정)
const isEdit = computed(() => (userType === 'm' && retirementStatus.value !== 40) || (userType !== 'm' && retirementStatus.value < 30))

// const emptyForm = computed(() => {
//   return dataFormIncomeCalculation.totalAnualBonus === 0 || dataFormIncomeCalculation.totalPay3Month === 0 || dataFormIncomeCalculation.annualLeaveAllowance === 0
// })
// store.commit('common/setIsDisableBtnTab2', emptyForm.value)

// watch isChangeForm to set value to store
watch(dataFormIncomeCalculation, (value) => {
  if(!isDisableBtnTab1.value) {
    if (!isEqual(value, dataFormOld)){
      store.commit('common/setIsChangeForm', {tab2: false})
      store.commit('common/setIsDisableBtnTab2', true)
    } else {
      store.commit('common/setIsChangeForm', {tab2: true})
      store.commit('common/setIsDisableBtnTab2', false)
    }
    store.commit('common/setIncomeCalculationInputOld', value)

  } else {
    store.commit('common/setIsDisableBtnTab2', true)
  }
}, {deep: true})

// watch definedRetirementBenefits to set value to store
watchEffect(() => {
  store.commit('common/setDefinedRetirementBenefits', definedRetirementBenefits.value)
  if(!isDisableBtnTab1.value) {
    if(!definedRetirementBenefits.value) store.commit('common/setIsDisableBtnTab2', true)
    else {
      if(definedRetirementBenefits.value && !isEqual(dataFormIncomeCalculation, dataFormOld)) store.commit('common/setIsDisableBtnTab2', true)
      else store.commit('common/setIsDisableBtnTab2', false)
    }
  } else {
    store.commit('common/setIsDisableBtnTab2', true)
  }
})
const formRef = ref()
const {client} = useApolloClient()

const calculateIncomeRetirement = async () => {
  const res = formRef.value?.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    const {data} = await client.query({
      query: queries.calculateIncomeRetirement,
      variables: {
        companyId: companyId,
        input: {
          ...incomeCalculationInput.value,
          ...dataFormIncomeCalculation
        },
      },
    })
    if (data) {
      dataIncomeRetirement.value = data.calculateIncomeRetirement;
      definedRetirementBenefits.value = data.calculateIncomeRetirement;
      store.commit('common/setIncomeCalculationInput', dataFormIncomeCalculation)
      store.commit('common/setIncomeCalculationInputOld', dataFormIncomeCalculation)
      store.commit('common/setIsDisableBtnTab2', false)
      store.commit('common/setIsDisableBtnTab1', false)
      store.commit('common/setNeedToRecalculatePa420', true)
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
