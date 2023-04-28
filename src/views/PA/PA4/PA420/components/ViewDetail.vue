<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md " footer=""
    width="70%" style="top: 20px">
    <div class="header-text-title mt-20">퇴직소득자료입력</div>
    <a-steps :current="step" type="navigation">
      <a-step :status="step === 0 ? 'process' : 'finish'" title="기본정보" @click="changeStep(0)" />
      <a-step :status="checkStepTwo" title="퇴직금계산" @click="changeStep(1)" />
      <a-step :status="checkStepThree" title="퇴직소득세" @click="changeStep(2)" />
    </a-steps>
    <div class="step-content pt-20" v-if="dataDetail.incomeId !== 0">
      <a-spin :spinning="loading">
        <keep-alive>
          <template v-if="step === 0">
            <Tab1 @closePopup="setModalVisible" :actionNextStep="valueNextStep" @nextPage="step++"
              :data-detail="dataDetail" />
          </template>
          <template v-else-if="step === 1">
            <Tab2 :data-detail="dataDetail" />
          </template>
          <template v-else>
            <Tab3 ref="formEditTab3" :data-detail="dataDetail" />
          </template>
        </keep-alive>
      </a-spin>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from '@/helpers/commonFunction';
import notification from "@/utils/notification";
import { IncomeRetirement } from "@/views/PA/PA4/PA420/types";
import { dataDefaultDetailUtils } from "@/views/PA/PA4/PA420/utils";
import { useQuery } from "@vue/apollo-composable";
import cloneDeep from "lodash/cloneDeep";
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Tab1 from './TabView/Tab1.vue';
import Tab2 from './TabView/Tab2.vue';
import Tab3 from './TabView/Tab3.vue';

interface Props {
  modalStatus: boolean,
  keyRowIndex: number,
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup'])

const formEditTab3 = ref()
const store = useStore();
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])

const step = ref(0)
const valueNextStep = ref(0)
const isDataFormChange = ref(false)
const dataDetail = reactive<IncomeRetirement>(cloneDeep(dataDefaultDetailUtils))

const variableGetDetail: any = ref({
  companyId: companyId,
  processKey: selectMonthColumn.value,
  incomeId: props.keyRowIndex
})
const firstLoad = ref(0)
// =========================  GRAPQL =================================================


// Get Detail Income Retirement
const {
  loading,
  refetch: refetchGetDetail,
  onError: errorGetDetail,
  onResult: resultGetDetail
} = useQuery(queries.getIncomeRetirement, variableGetDetail, () => ({
  fetchPolicy: "no-cache",
}));
resultGetDetail(async (newValue) => {
  if (newValue && newValue.data) {
    Object.assign(dataDetail, newValue.data.getIncomeRetirement)
    // if prevRetiredYearsOfService or prevRetirementBenefitStatus is null then assign it with a default value
    if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService == null) {
      newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService = {
        settlementStartDate: null,
        settlementFinishDate: null,
        paymentDate: null,
        exclusionDays: 0,
        additionalDays: 0,
      }
    }
    if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus == null) {
      newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus = {
        retirementBenefits: 0,
        nonTaxableRetirementBenefits: 0,
        taxableRetirementBenefits: 0
      }
    }
    store.commit('common/setEmployee', newValue.data.getIncomeRetirement.employee)

    step.value = 0
  }
})
errorGetDetail(res => {
  notification('error', res.message)
})
// ================WATCHING============================================
watch(() => store.state.common.formStateEditPA420, (newValue, oldValue) => {
  if (Object.keys(oldValue).length !== 0 && firstLoad.value > 0) {
    isDataFormChange.value = true
  }
  firstLoad.value++
}, { deep: true })

watch(() => props.modalStatus, (newValue) => {
  variableGetDetail.value.incomeId = props.keyRowIndex
  if (newValue) {
    refetchGetDetail()
    firstLoad.value = 0
  }
}, { deep: true })
// =========================  FUNCTION ===============================================
const checkStepTwo = computed(() => {
  if (step.value === 0) {
    return "wait";
  } else if (step.value === 1) {
    return "process";
  } else {
    return "finish";
  }
});
const checkStepThree = computed(() => {
  if (step.value < 2) {
    return "wait";
  } else if (step.value === 2) {
    return "process";
  } else {
    return "finish";
  }
});
const changeStep = (stepChange: any) => {
  console.log('stepChange', stepChange)
  step.value = stepChange
}
const setModalVisible = () => {
  emit('closePopup')
};

</script>
<style lang="scss" scoped src="../style/modalAdd.scss">
</style>
