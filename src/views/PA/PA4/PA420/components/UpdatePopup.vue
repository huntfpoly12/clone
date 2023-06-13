<template>
  <a-modal
    :visible="statusModal"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    width="70%"
    style="top: 20px"
  >
    <div class="header-text-title mt-20">퇴직소득자료입력</div>
    <a-steps :current="step" type="navigation">
      <a-step :status="step === 0 ? 'process' : 'finish'" title="기본정보" />
      <a-step :status="checkStepTwo" title="퇴직금계산" />
      <a-step :status="checkStepThree" title="퇴직소득세" />
    </a-steps>
    <div class="step-content pt-20">
      <div class="text-center">
        <a-spin :spinning="loading" size="large" />
      </div>
      <keep-alive v-if="dataDetail.incomeId !== 0">
        <template v-if="step === 0">
          <Tab1
            @closePopup="setModalVisible"
            :actionNextStep="valueNextStep"
            @nextPage="step++"
            :data-detail="dataDetail"
          />
        </template>
        <template v-else-if="step === 1">
          <Tab2 :data-detail="dataDetail" />
        </template>
        <template v-else>
          <Tab3 ref="formEditTab3" :data-detail="dataDetail" />
        </template>
      </keep-alive>
    </div>
    <div style="justify-content: center" class="pt-10 wf-100 d-flex-center">
      <button-basic
        text="이전"
        type="default"
        mode="outlined"
        class="mr-5"
        @onClick="prevStep"
        v-if="step != 0"
      />
      <button-basic
        text="다음"
        type="default"
        mode="contained"
        @onClick="nextStep"
        :disabled="isDisableBtnTab2 && step === 1"
        v-if="step < 2"
      />
      <button-basic
        text="저장"
        type="default"
        mode="contained"
        @onClick="updated"
        :disabled="isDisableCreate || !isChangeForm"
        v-if="step === 2"
      />
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import Tab1 from "./TabEdit/Tab1.vue";
import Tab2 from "./TabEdit/Tab2.vue";
import Tab3 from "./TabEdit/Tab3.vue";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { useStore } from "vuex";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import { Message } from "@/configs/enum";
import { dataDefaultDetailUtils } from "@/views/PA/PA4/PA420/utils";
import cloneDeep from "lodash/cloneDeep";
import { IncomeRetirement } from "@/views/PA/PA4/PA420/types";

interface Props {
  modalStatus: boolean;
  keyRowIndex: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["closePopup", "updateSuccess", "closePopup"]);

const formEditTab3 = ref();
const store = useStore();
const selectMonthColumn = computed(() => store.getters["common/getSelectMonthColumn"]);
const isDisableCreate = computed(() => store.getters['common/getNeedToRecalculatePa420'])
const getAllData = computed(() => store.getters["common/getAllDataUpdate"]);
const interimPaymentTab1 = computed(() => store.getters["common/getInterimPaymentTab1"]);
const isDisableBtnTab2 = computed(() => store.getters["common/getIsDisableBtnTab2"]);
const isChangeForm = computed(() => store.getters["common/getIsChangeForm"]);

const step = ref(0);
const valueNextStep = ref(0);
const isDataFormChange = ref(false);
const statusModal = ref(props.modalStatus);
const dataDetail = reactive<IncomeRetirement>(
  cloneDeep(dataDefaultDetailUtils)
);

const variableGetDetail: any = ref({
  companyId: companyId,
  processKey: selectMonthColumn.value,
  incomeId: props.keyRowIndex,
});
const firstLoad = ref(0);
// =========================  GRAPQL =================================================

// Update Income Retirement
const { mutate, onDone, onError } = useMutation(
  mutations.updateIncomeRetirement
);
onDone(() => {
  notification("success", Message.getCommonMessage("106").message);
  store.commit("common/resetForm");
  emit("closePopup", false);
  emit("updateSuccess", true);
});
onError((e: any) => {
  //notification('error', e.message)
});

// Get Detail Income Retirement
const {
  loading,
  refetch: refetchGetDetail,
  onError: errorGetDetail,
  onResult: resultGetDetail,
} = useQuery(queries.getIncomeRetirement, variableGetDetail, () => ({
  fetchPolicy: "no-cache",
}));
resultGetDetail(async (newValue) => {
  if (newValue && newValue.data) {
    Object.assign(dataDetail, newValue.data.getIncomeRetirement);
    // if prevRetiredYearsOfService or prevRetirementBenefitStatus is null then assign it with a default value
    if (
      newValue.data.getIncomeRetirement.specification.specificationDetail
        .prevRetiredYearsOfService == null
    ) {
      newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService =
        {
          settlementStartDate: null,
          settlementFinishDate: null,
          paymentDate: null,
          exclusionDays: 0,
          additionalDays: 0,
        };
    }
    if (
      newValue.data.getIncomeRetirement.specification.specificationDetail
        .prevRetirementBenefitStatus == null
    ) {
      newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus =
        {
          retirementBenefits: 0,
          nonTaxableRetirementBenefits: 0,
          taxableRetirementBenefits: 0,
        };
    }
    store.commit(
      "common/setEmployee",
      newValue.data.getIncomeRetirement.employee
    );

    firstLoad.value = 0;
    step.value = 0;
  }
});
errorGetDetail((res) => {
  notification("error", res.message);
});
// ================WATCHING============================================
watch(
  () => store.state.common.formStateEditPA420,
  (newValue, oldValue) => {
    if (Object.keys(oldValue).length !== 0 && firstLoad.value > 0) {
      isDataFormChange.value = true;
    }
    firstLoad.value++;
  },
  { deep: true }
);

watch(
  () => props.modalStatus,
  (newValue) => {
    variableGetDetail.value.incomeId = props.keyRowIndex;
    statusModal.value = newValue;
    if (newValue) {
      refetchGetDetail();
      firstLoad.value = 0;
    }
  },
  { deep: true }
);
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
// const changeStep = (stepChange: any) => {
//   step.value = stepChange
// }
const nextStep = (event: any) => {
  if (step.value == 0) valueNextStep.value++;
  else if (step.value == 1) step.value++;
};

const prevStep = () => {
  step.value--;
};
const updated = () => {
  if (isDisableCreate.value) {
  } else {
    const dataForm: any = getAllData.value;
    if (!interimPaymentTab1.value) {
      delete dataForm.taxCalculationInput.prevRetiredYearsOfService;
      delete dataForm.taxCalculationInput.prevRetirementBenefitStatus;
    }
    if (
      !dataForm.taxCalculationInput?.prevRetirementBenefitStatus
        ?.retirementBenefits
    )
      delete dataForm.taxCalculationInput.prevRetirementBenefitStatus;
    if (
      !dataForm.taxCalculationInput?.calculationOfDeferredRetirementIncomeTax
        .statements.length
    )
      delete dataForm.taxCalculationInput
        .calculationOfDeferredRetirementIncomeTax;
    const variables: any = reactive({
      companyId: companyId,
      incomeId: props.keyRowIndex,
      ...dataForm,
    });
    mutate(variables);
  }
};

const setModalVisible = () => {
  if (!isChangeForm.value) {
    emit("closePopup", false);
    statusModal.value = false;
  } else {
    comfirmClosePopup(() => {
      emit("closePopup", false);
      statusModal.value = false;
    });
  }
};
</script>
<style lang="scss" scoped src="../style/modalAdd.scss"></style>
