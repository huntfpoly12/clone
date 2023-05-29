<template>
  <a-modal :visible="modalStatus" centered
    @cancel="setModalVisible()" :mask-closable="false"
    :width="step === StepCreateBudget.Step2 ? typePopup === ComponentCreateBudget.EmployeeSalaryTable ? '1300px' : '90%' : 500"
    :footer="false" v-if="modalStatus" :class="step === StepCreateBudget.Step1 && `clear-border-header`">
    <div v-if="step === StepCreateBudget.Step1">
      <div v-if="dataBudget?.index" class="modal-content">
        <span>전년도 최종차수 {{ dataBudget?.columnName }}를 불러와서 작성합니다.</span>
        <span>(단, 과목전용조서 전용액은 불러오지 않습니다.) 상기의</span>
        <span>내역들이 없으면 초기상태로 작성합니다. </span>
        <span>{{ dataBudget?.columnName }}를 작성하시겠습니까?</span>
      </div>
      <div v-else class="modal-content">
        <span>직전 최종차수 {{ dataBudget?.columnName }}를 불러와서 작성합니다.</span>
        <span>(단, 과목전용조서 전용액은 불러오지 않습니다.) 상기의</span>
        <span>내역들이 없으면 초기상태로 작성합니다.</span>
        <span>{{ dataBudget?.columnName }}를 작성하시겠습니까?</span>
      </div>
    </div>
    <div v-else-if="step === StepCreateBudget.Step2">
      <div v-if="typePopup === ComponentCreateBudget.EmployeeSalaryTable">
        <EmployeeSalaryTable @closePopup="closePopup" />
      </div>
      <div v-else>
        <ExpenseAndRevenueBudget @closePopup="closePopup" :index="index" />
      </div>
    </div>
    <div v-else>

    </div>

    <div v-if="step === StepCreateBudget.Step1" class="footer">
      <button-basic class="button-form-modal" text="아니요" :type="'default'" :mode="'outlined'"
        @onClick="setModalVisible()" />
      <button-basic class="button-form-modal" text="네. 작성합니다" :width="140" :type="'default'" :mode="'contained'"
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
import { Message } from '@/configs/enum';

export default defineComponent({
  components: {
    EmployeeSalaryTable,
    ExpenseAndRevenueBudget
  },
  props: {
    modalStatus: {
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
    const step = ref<StepCreateBudget>(StepCreateBudget.Step1)
    const typePopup = computed(() => store.getters['common/getTypeCreateBudget'])
    const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters['common/getDataBudget'])
    const isChangedFormAc520 = computed(() => store.getters['common/getIsChangedFormAc520'])
    const setModalVisible = () => {
      if (!isChangedFormAc520.value) {
        emit('closePopup', false)
      } else {
        deletePopup({
          callback: () => {
            emit('closePopup', false)
          },
          message: Message.getCommonMessage('301').message,
          okText: '네',
          cancelText: '아니요'
        })
      }
    };
    const onConfirm = () => {
      if (step.value === StepCreateBudget.Step1) {
        step.value = StepCreateBudget.Step2
      } else if (step.value === StepCreateBudget.Step2) {
        step.value = StepCreateBudget.Step3
      } else {
        emit('closePopup', false)
      }
    }
    watchEffect(() => {
      if (props.modalStatus) step.value = StepCreateBudget.Step1
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
      setModalVisible,
      onConfirm,
      step,
      StepCreateBudget,
      dataBudget,
      closePopup,
      typePopup,
      ComponentCreateBudget
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