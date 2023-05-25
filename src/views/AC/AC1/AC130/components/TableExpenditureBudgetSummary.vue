<template>
  <div class="ac130TableExpenditureBudgetSummary">
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCalculated" :show-borders="true"
    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
    <DxScrolling mode="standard" show-scrollbar="always" noDataText="내역이 없습니다"/>
    <DxColumn caption="구분" cell-template="label" />
    <template #label="{ data }">
      <b style="color: #7F7F7F;">{{ data.data.label }}</b>
    </template>
    <DxColumn caption="연예산(C)" data-field="amount" />
    <DxColumn caption="당월집행" data-field="currentMonthExecution" />
    <DxColumn caption="집합누계(D)" data-field="cumulativeTotal" />
    <DxColumn caption="잔액(C-D)" />
    <DxColumn caption="집행율(%)" data-field="executionRate" />
  </DxDataGrid>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxMasterDetail } from "devextreme-vue/data-grid";
export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxMasterDetail
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataCalculated: any = ref([])
    
    const checkNumber = (value: any) => {
      if (Number.isInteger(value)) {
        return value
      } else {
        return null
      }
    }

    watch(() => props.data, (value) => {
      dataCalculated.value = [
        {
          label: '세입(A)',
          amount: checkNumber(value?.revenueBudgetSummary?.amount),
          currentMonthExecution: checkNumber(value?.revenueBudgetSummary?.currentMonthExecution),
          cumulativeTotal: checkNumber(value?.revenueBudgetSummary?.currentMonthExecution),
          executionRate: checkNumber((value?.revenueBudgetSummary?.cumulativeTotal / value?.revenueBudgetSummary?.amount) * 100)
        },
        {
          label: '세출(B)',
          amount: checkNumber(value?.expenditureBudgetSummary?.amount),
          currentMonthExecution: checkNumber(value?.expenditureBudgetSummary?.currentMonthExecution),
          cumulativeTotal: checkNumber(value?.expenditureBudgetSummary?.currentMonthExecution),
          executionRate: checkNumber((value?.expenditureBudgetSummary?.cumulativeTotal / value?.expenditureBudgetSummary?.amount) * 100)
        },
        {
          label: '차액(A-B)',
          amount: checkNumber(value?.revenueBudgetSummary?.amount - value?.expenditureBudgetSummary?.amount),
          currentMonthExecution: checkNumber(value?.revenueBudgetSummary?.currentMonthExecution - value?.expenditureBudgetSummary?.currentMonthExecution),
          cumulativeTotal: checkNumber(value?.revenueBudgetSummary?.cumulativeTotal - value?.expenditureBudgetSummary?.cumulativeTotal),
          executionRate: checkNumber(((value?.revenueBudgetSummary?.cumulativeTotal / value?.revenueBudgetSummary?.amount) * 100) - ((value?.expenditureBudgetSummary?.cumulativeTotal / value?.expenditureBudgetSummary?.amount) * 100))
        }
      ]
    }, {
      deep: true,
      immediate: true
    })
    return {
      move_column,
      colomn_resize,
      dataCalculated
    }
  },
})
</script>

<style lang="scss" scoped>
.ac130TableExpenditureBudgetSummary {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
