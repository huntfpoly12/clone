<template>
  <a-modal :visible="visible" centered @cancel="actionClose()" :mask-closable="btnClose" :footer="false"
    :closable="btnClose">
    <div v-if="step === StepCreateBudget.Step1" class="text-center">
      {{ dataBudget?.index }} 작성하시겠습니까?
    </div>
    <div v-else-if="step === StepCreateBudget.Step2">
      <div class="modal-content">
        <span>최종차수(본예산인 경우 전년도 최종차수) 임직원보수일람표,</span>
        <span>세출예산서, 세입예산서 중 없는 내역이 있습니다. 내역이 없으면 </span>
        <span>모두 공란으로 불러와지며, 이후 수기작성할 수 있습니다.</span>
        <span>그래도 작성하시겠습니까?</span>
      </div>
    </div>
    <div v-else>
      <div class="modal-content">
        <span>최종차수(본예산인 경우 전년도 최종차수) 임직원보수일람표,</span>
        <span>세출예산서, 세입예산서를 불러와서 새로 작성되었습니다.</span>
        <span>이후 수기작성할 수 있습니다.</span>
      </div>
    </div>

    <div v-if="step !== StepCreateBudget.Step3" class="footer">
      <button-basic class="button-form-modal" text="아니요" :type="'default'" :mode="'outlined'" @onClick="actionClose()" />
      <button-basic class="button-form-modal" text="네. 작성합니다." :width="140" :type="'default'" :mode="'contained'"
        @onClick="onConfirm" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, watch, watchEffect } from 'vue'
import { ACTION, Budget, ComponentCreateBudget, StepCreateBudget } from "@/views/AC/AC5/AC520/type";
import EmployeeSalaryTable from "./EmployeeSalaryTable.vue";
import ExpenseAndRevenueBudget from "./ExpenseAndRevenueBudget.vue";
import { useStore } from "vuex";
import deletePopup from "@/utils/deletePopup";

export default defineComponent({
  components: {
    EmployeeSalaryTable,
    ExpenseAndRevenueBudget
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['closePopup'],
  setup(props, { emit }) {
    const store = useStore()
    const step = ref<StepCreateBudget>(props.index > 0 ? StepCreateBudget.Step1 : StepCreateBudget.Step2)
    const typePopup = computed(() => store.getters['common/getTypeCreateBudget'])
    const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters['common/getDataBudget'])
    const btnClose = ref(false)
    const actionClose = () => {
      emit('closePopup', false)
    };
    const onConfirm = () => {
      if (step.value === StepCreateBudget.Step1) {
        step.value = StepCreateBudget.Step2
      } else if (step.value === StepCreateBudget.Step2) {
        step.value = StepCreateBudget.Step3
        emit('closePopup', ACTION.ADD)
        btnClose.value = true
      } else {
        btnClose.value = false
      }
    }
    watchEffect(() => {
      if (props.visible) step.value = StepCreateBudget.Step1
    })
    watch(dataBudget, (val) => {
      if (val?.action === ACTION.EDIT) {
        step.value = StepCreateBudget.Step2
      }
    })
    const closePopup = (e: boolean) => {
      if (e) {
        emit('closePopup', true)
      }
    }
    return {
      actionClose,
      onConfirm,
      step,
      StepCreateBudget,
      dataBudget,
      closePopup,
      typePopup,
      ComponentCreateBudget,
      btnClose
    }
  }
})
</script>

<style scoped lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;

  span {
    text-align: center;
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
