<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalSelectVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    style="top: 20px"
  >
    <div class="block-radio">
      <radio-group
        class="radio-group one"
        :arrayValue="optionEmployeeType"
        v-model:valueRadioCheck="retirementIncome"
        layoutCustom="horizontal"
      />
      <radio-group
        class="radio-group two"
        :arrayValue="option2"
        v-model:valueRadioCheck="retirementType"
        layoutCustom="horizontal"
      />
      <div class="mt-10">
        <span> 퇴직소득자료 입력하시겠습니까? </span>
      </div>
    </div>
    <div class="footer mt-30">
      <button-basic
        class="button-form-modal mr-5"
        text="아니요"
        type="default"
        mode="outlined"
        @onClick="setModalVisible"
      />
      <button-basic
        class="button-form-modal"
        text="네. 입력합니다"
        :width="140"
        type="default"
        mode="contained"
        @onClick="openModalAdd"
      />
    </div>
  </a-modal>

  <a-modal
    :visible="modalStatusAccept"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    width="70%"
    style="top: 20px"
  >
    <div class="header-text-title mt-20">퇴직소득자료입력</div>
    <a-steps :current="step" type="navigation">
      <a-step
        :status="step === 0 ? 'process' : 'finish'"
        title="기본정보"
      />
<!--        @click="changeStep(0)"-->
      <a-step
        :status="checkStepTwo"
        title="퇴직금계산"
      />
<!--        @click="changeStep(1)"-->
      <a-step
        :status="checkStepThree"
        title="퇴직소득세"
      />
<!--        @click="changeStep(2)"-->
    </a-steps>
    <div class="step-content pt-20">
      <keep-alive>
          <Tab1
            v-if="step === 0"
            :retirementIncome="retirementIncome"
            :actionNextStep="valueNextStep"
            :retirement-type="retirementType"
            @nextPage="step++"
          />
          <Tab2  v-else-if="step === 1"/>
          <Tab3 v-else/>
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
        @onClick="created"
        :disabled="isDisableCreate"
        v-if="step === 2"
      />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import notification from "@/utils/notification";
import {companyId} from "@/helpers/commonFunction";
import {useMutation, useQuery} from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import queriescm130 from "@/graphql/queries/CM/CM130/index";
import Tab1 from "./TabCreated/Tab1.vue";
import Tab2 from "./TabCreated/Tab2.vue";
import Tab3 from "./TabCreated/Tab3.vue";
import {useStore} from "vuex";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import {Message} from "@/configs/enum";
import dayjs from "dayjs";
enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20,
}
interface Props {
  modalStatus: boolean,
  listEmployeeexist: Array<any>
}
const props = defineProps<Props>();
const emit = defineEmits(["closePopup", "createdDone"]);

const store = useStore();
const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'));
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const paymentDay = computed(() => store.getters['common/getPaymentDay'])
const step = ref(0);
const valueNextStep = ref(0);
const modalStatusAccept = ref(false);
const retirementIncome = ref(EmployeeWageType.WAGE);
const isDisableBtnTab2 = computed(() => store.getters['common/getIsDisableBtnTab2'])
const isChangeForm = computed(() => store.getters['common/getIsChangeForm'])

const retirementType = ref(1)

const optionEmployeeType = reactive([
  {id: 10, text: "사원"},
  {id: 20, text: "일용직사원"},
]);
const option2 = reactive([
  {id: 1, text: "퇴직소득(퇴직자)"},
  {id: 2, text: "중도정산"},
]);
const setModalVisible = () => {
  if (!isChangeForm.value) {
    emit("closePopup", false)
    modalStatusAccept.value = false;
  } else {
    comfirmClosePopup(() => {
      emit("closePopup", false);
      store.commit('common/resetForm');
      modalStatusAccept.value = false;
    }, {
      cancelText: '아니요'
    })
  }
};
const setModalSelectVisible = () => {
  emit("closePopup", false)
};
// =========================  GRAPQL =================================================
// query get config from screen cm-130
const {
  loading: loadingConfig,
  result: resultConfig,
} = useQuery(
  queriescm130.getWithholdingConfig,
  {
    companyId: companyId,
    imputedYear: globalYear
  },
  () => ({
    fetchPolicy: "no-cache",
  })
);

watch(resultConfig, (resConfig) => {
  if (resConfig) {
    store.commit('common/setPaymentDay', resConfig.getWithholdingConfig.paymentDay || Number(dayjs(`${selectMonthColumn.value.paymentYear}${selectMonthColumn.value.paymentMonth}`).endOf('month').format('DD')))
  }
})
const {
  mutate: mutateCreateIncomeRetirement,
  onDone: onDoneCreateIncomeRetirement,
  onError: onErrorCreateIncomeRetirement,
} = useMutation(mutations.createIncomeRetirement);
onDoneCreateIncomeRetirement(() => {
  notification("success", Message.getCommonMessage('101').message);
  modalStatusAccept.value = false;
  emit("closePopup", true);
  emit("createdDone", true);
  store.commit('common/resetForm')
});
onErrorCreateIncomeRetirement((e: any) => {
  notification("error", e.message);
});

// ================WATCHING============================================

// =========================  FUNCTION ===============================================
// all Computed
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
const checkStepFour = computed(() => {
  if (step.value < 3) {
    return "wait";
  } else if (step.value === 3) {
    return "process";
  } else {
    return "finish";
  }
});

const changeStep = (stepChange: any) => {
  step.value = stepChange;
};

const nextStep = (event: any) => {
  if (step.value == 0) valueNextStep.value++;
  else if (step.value == 1) step.value++;
};

const prevStep = () => {
  step.value--;
};
const isDisableCreate = computed(() => store.getters['common/getIsDisableCreate'])
const getAllData = computed(() => store.getters['common/getAllData'])
const interimPaymentTab1 = computed(() => store.getters['common/getInterimPaymentTab1'])

const created = (e: any) => {
  if (isDisableCreate.value) {
  } else {
    const dataForm: any = getAllData.value;
    if (!interimPaymentTab1.value) {
      delete dataForm.taxCalculationInput.prevRetiredYearsOfService
      delete dataForm.taxCalculationInput.prevRetirementBenefitStatus
    }
    if (!dataForm.taxCalculationInput?.prevRetirementBenefitStatus?.retirementBenefits)
      delete dataForm.taxCalculationInput.prevRetirementBenefitStatus
    if (!dataForm.taxCalculationInput?.calculationOfDeferredRetirementIncomeTax.statements.length)
      delete dataForm.taxCalculationInput.calculationOfDeferredRetirementIncomeTax
    const variables: any = reactive({
      companyId: companyId,
      ...dataForm
    });
    mutateCreateIncomeRetirement(variables)
  }
};
const openModalAdd = () => {
  modalStatusAccept.value = true;
};

</script>

<style lang="scss" scoped src="../style/modalAdd.scss"></style>
