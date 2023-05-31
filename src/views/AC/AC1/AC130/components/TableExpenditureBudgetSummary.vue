<template>
  <div class="ac130TableExpenditureBudgetSummary">
    <DxDataGrid ref="refAc130TableExpenditureBudgetSummary" :show-row-lines="true" :hoverStateEnabled="true"
      :data-source="dataCalculated" :show-borders="true" :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize" :column-auto-width="true">
      <DxScrolling mode="standard" show-scrollbar="always" noDataText="내역이 없습니다" />
      <DxColumn caption="구분" cell-template="label"  width="15%" />
      <template #label="{ data }">
        <b style="color: #7F7F7F;">{{ data.data.label }}</b>
      </template>
      <DxColumn caption="연예산(C)" data-field="amount" :customizeText="customizeTextColumn" alignment="end"  width="17%"/>
      <DxColumn caption="당월집행" data-field="currentMonthExecution" :customizeText="customizeTextColumn" alignment="end"  width="17%"/>
      <DxColumn caption="집합누계(D)" data-field="cumulativeTotal" :customizeText="customizeTextColumn" alignment="end"  width="17%"/>
      <DxColumn caption="잔액(C-D)" data-field="balance" :customizeText="customizeTextColumn" alignment="end"  width="17%"/>
      <DxColumn caption="집행율(%)" data-field="executionRate" :customizeText="customizeTextColumn" alignment="end"  width="17%"/>
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxMasterDetail } from "devextreme-vue/data-grid";
import filters from '@/helpers/filters'
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

    const refAc130TableExpenditureBudgetSummary = ref()

    const checkNumber = (value: any) => {
      if (Number.isNaN(Number.parseFloat(value))) {
        return 0;
      } else {
        return value
      }
    }

    const customizeTextColumn = (e: any) => {
      if (e.value) {
        if (Number.isInteger(e.value)) {
          return filters.formatCurrency(e.value)
        } else {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(e.value).replace('$', '')
        }
      }
      return '0'
    }

    watch(() => props.data, (value) => {
      // A
      const amountA = checkNumber(value?.revenueBudgetSummary?.amount)
      const currentMonthExecutionA = checkNumber(value?.revenueBudgetSummary?.currentMonthExecution)
      const cumulativeTotalA = checkNumber(value?.revenueBudgetSummary?.currentMonthExecution)
      const balanceA = checkNumber(value?.revenueBudgetSummary?.amount - value?.revenueBudgetSummary?.currentMonthExecution)
      const executionRateA = checkNumber((value?.revenueBudgetSummary?.cumulativeTotal / value?.revenueBudgetSummary?.amount) * 100)
      //B
      const amountB = checkNumber(value?.expenditureBudgetSummary?.amount)
      const currentMonthExecutionB = checkNumber(value?.expenditureBudgetSummary?.currentMonthExecution)
      const cumulativeTotalB = checkNumber(value?.expenditureBudgetSummary?.currentMonthExecution)
      const balanceB = checkNumber(value?.expenditureBudgetSummary?.amount - value?.expenditureBudgetSummary?.currentMonthExecution)
      const executionRateB = checkNumber((value?.expenditureBudgetSummary?.cumulativeTotal / value?.expenditureBudgetSummary?.amount) * 100)
      // A - B
      const amountAB = checkNumber(amountA - amountB)
      const currentMonthExecutionAB = checkNumber(currentMonthExecutionA - currentMonthExecutionB)
      const cumulativeTotalAB = checkNumber(cumulativeTotalA - cumulativeTotalB)
      const balanceAB = checkNumber(balanceA - balanceB)
      const executionRateAB = checkNumber((cumulativeTotalAB / amountAB) * 100)
      dataCalculated.value = [
        {
          label: '세입(A)',
          amount: amountA,
          currentMonthExecution: currentMonthExecutionA,
          cumulativeTotal: cumulativeTotalA,
          balance: balanceA,
          executionRate: executionRateA
        },
        {
          label: '세출(B)',
          amount: amountB,
          currentMonthExecution: currentMonthExecutionB,
          cumulativeTotal: cumulativeTotalB,
          balance: balanceB,
          executionRate: executionRateB
        },
        {
          label: '차액(A-B)',
          amount: amountAB,
          currentMonthExecution: currentMonthExecutionAB,
          cumulativeTotal: cumulativeTotalAB,
          balance: balanceAB,
          executionRate: executionRateAB
        }
      ]
    }, {
      deep: true,
      immediate: true
    })

    const resetTable = () => {
      refAc130TableExpenditureBudgetSummary.value.instance.refresh()
    }
    return {
      move_column,
      colomn_resize,
      dataCalculated,
      customizeTextColumn,
      resetTable,
      refAc130TableExpenditureBudgetSummary
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
