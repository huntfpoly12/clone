<template>
  <a-modal :visible="modalStatus" centered
           :title="dataBudget?.index === 0  ? '' : typePopup === ComponentCreateBudget.EmployeeSalaryTable && `임직원보수일람표`"
    @cancel="setModalVisible()" :mask-closable="false"
    :width="typePopup === ComponentCreateBudget.EmployeeSalaryTable ? '1300px' : '90%' "
    :footer="false" v-if="modalStatus">
    <div v-if="typePopup === ComponentCreateBudget.EmployeeSalaryTable">
      <EmployeeSalaryTable @closePopup="closePopup" />
    </div>
    <div v-else>
      <ExpenseAndRevenueBudget @reload="reload" @closePopup="closePopup"/>
    </div>
  </a-modal>
</template>

<script lang="ts">
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { Budget, ComponentCreateBudget, StepCreateBudget } from "@/views/AC/AC5/AC520/type";
import { ComputedRef, computed, defineComponent } from 'vue';
import { useStore } from "vuex";
import EmployeeSalaryTable from "./EmployeeSalaryTable.vue";
import ExpenseAndRevenueBudget from "./ExpenseAndRevenueBudget.vue";

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
  },
  emits: ['closePopup', 'reload'],
  setup(_, { emit }) {
    const store = useStore()
    const typePopup = computed(() => store.getters['common/getTypeCreateBudget'])
    const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters['common/getDataBudget'])
    const isChangedFormAc520 = computed(() => store.getters['common/getIsChangedFormAc520'])
    const setModalVisible = () => {
      if (!isChangedFormAc520.value) {
        emit('closePopup', false)
      } else {
        comfirmClosePopup(() => {
          emit('closePopup', false)
        }, {
          cancelText: '아니요',
        })
      }
    };
    const reload = () => {
      emit('reload')
    }
    const closePopup = (e: boolean) => {
      if (e) {
        emit('closePopup', true)
      }
    }
    return {
      setModalVisible,
      StepCreateBudget,
      dataBudget,
      closePopup,
      typePopup,
      ComponentCreateBudget,
      reload
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
