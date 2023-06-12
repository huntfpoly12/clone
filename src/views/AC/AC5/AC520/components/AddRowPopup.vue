<template>
  <a-modal :visible="visible" centered @cancel="actionClose()" :mask-closable="btnClose" :footer="false"
    :closable="btnClose" class="clear-border-header">
    <div  class="text-center">
      {{ index === 0 ? `본예산 작성하시겠습니까?` : `추경 ${index}차 작성하시겠습니까?` }}
    </div>

    <div class="footer">
      <button-basic class="button-form-modal" text="아니요" :type="'default'" :mode="'outlined'" @onClick="actionClose()" />
      <button-basic class="button-form-modal" text="네. 작성합니다" :width="140" :type="'default'" :mode="'contained'"
        @onClick="onConfirm" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { ACTION, Budget, ComponentCreateBudget, StepCreateBudget } from "@/views/AC/AC5/AC520/type";
import { computed, ComputedRef, defineComponent, ref, watch, watchEffect } from 'vue';
import { useStore } from "vuex";
import EmployeeSalaryTable from "./EmployeeSalaryTable.vue";
import ExpenseAndRevenueBudget from "./ExpenseAndRevenueBudget.vue";

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
      step.value = StepCreateBudget.Step3
      emit('closePopup', ACTION.ADD)
      btnClose.value = true
    }
    const closePopup = (e: boolean) => {
      if (e) {
        emit('closePopup', true)
      }
    }
    return {
      actionClose,
      onConfirm,
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
<style lang="scss">
.clear-border-header {
  .ant-modal-header {
    border-bottom: none;
  }
}
</style>