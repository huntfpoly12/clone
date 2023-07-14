<template>
  <a-modal
      :visible="visible"
      footer=""
      :closable="visibleCreate"
      @cancel="$emit('closePopup', false)"
      :mask-closable="false"
      :width="!visibleCreate ? 600 : 1200"
  >
    <div v-if="!visibleCreate">
      <div class="d-flex-center justify-content-center gap-10 mb-20">
        <span>결제예정연월</span>
        <month-picker-box v-model="month" width="100px"/>
      </div>
      <div class="d-flex-center justify-content-center gap-10">
        <button-basic class="button-form-modal" text="아니요" type="default" :mode="'outlined'"
                      @onClick="cancel"/>
        <button-basic class="button-form-modal" text="다음" type="default" :mode="'contained'"
                      @onClick="submit"/>
      </div>
    </div>
    <div v-else>
      <a-steps :current="step" type="navigation" class="pointer-event">
        <a-step
            :status="step === 0 ? 'process' : 'finish'"
            title="결제예정일자"
            @click="changeStep(0)"
        />
        <a-step
            title="출금자료 미리보기"
            @click="changeStep(1)"
            :status="checkStepTwo"
        />
        <a-step
            title="출금자료 등록"
            @click="changeStep(2)"
            :status="checkStepThree"
        />
      </a-steps>
      <div class="step-content pt-20">
        <keep-alive>
          <Tab1 v-if="step === 0" @nextPage="step++"/>
          <Tab2 v-else-if="step === 1"/>
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
        />
        <button-basic
            text="다음"
            type="default"
            mode="contained"
            @onClick="nextStep"
            v-if="step < 2"
        />
        <button-basic
            text="네. 출금자료 등록합니다"
            type="default"
            mode="contained"
            @onClick="created"
            v-if="step === 2"
        />
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import { ref, computed } from "vue";
import dayjs from "dayjs";
import Tab1 from "./withDrawalDataRegistration/Tab1.vue";
import Tab2 from "./withDrawalDataRegistration/Tab2.vue";
import Tab3 from "./withDrawalDataRegistration/Tab3.vue";
import notification from "@/utils/notification";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(["closePopup", "submit"]);
const month = ref<string>(dayjs().format("YYYYMM"));
const step = ref(0);
const visibleCreate = ref(false);
const prevStep = () => {
  if(step.value === 0) {
    emit("closePopup", false)
  } else {
    step.value--;
  }
};
const nextStep = () => {
  step.value++;
};
const changeStep = (stepChange: any) => {
  step.value = stepChange;
};
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
const created = () => {
  notification("success", "성공적으로 출금자료등록되었습니다")
  emit("submit")
};
const cancel = () => {
  emit("closePopup", false)
};
const submit = () => {
  visibleCreate.value = true;
  // emit("submit")
}
const cancelCreate = () => {
  visibleCreate.value = false;
  emit("closePopup", false)
};
</script>

<style scoped>

</style>
