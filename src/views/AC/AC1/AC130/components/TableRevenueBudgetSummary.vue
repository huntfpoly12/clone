<template>
  <div class="ac130TableRevenueBudgetSummary">
    <DxDataGrid ref="refAc130TableRevenueBudgetSummary" :show-row-lines="true" :hoverStateEnabled="true"
      :data-source="dataCalculated" :show-borders="true" :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다">
      <DxPaging :enabled="false" />
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxColumn caption="계정과목" data-field="name" width="21%" />
      <DxColumn caption="연예산(C)" data-field="amount" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)" width="11%" />
      <DxColumn caption="월환산예산 (C /12)" data-field="monthlyBudget" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)"
        width="13%" />
      <DxColumn caption="당월집행" data-field="currentMonthExecution" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)"
        width="11%" />
      <DxColumn caption="당월 인건비비율 (%)" data-field="currentMonthlyFeeRate" alignment="end"
        :customizeText="(e: any) => handleValueNumberColumn(e.value)" width="14%"/>
      <DxColumn caption="집합누계(D)" data-field="cumulativeTotal" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)" width="11%"/>
      <DxColumn caption="잔액(C-D)" data-field="balance" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)" width="11%"/>
      <DxColumn caption="집행율(%)" data-field="executionRate" alignment="end" :customizeText="(e: any) => handleValueNumberColumn(e.value)" width="8%"/>
      <DxSummary>
        <DxTotalItem column="계정과목" summary-type="count" display-format="합계: [{0}]" />
        <DxTotalItem column="연예산(C)" summary-type="sum"
          :customize-text="(e: any) => `[${handleValueNumberColumn(e.value)}]`" />
        <DxTotalItem column="월환산예산 (C /12)" summary-type="sum"
          :customize-text="(e: any) => `[${totalMonthlyBudget()}]`" />
        <DxTotalItem column="당월집행" summary-type="sum"
          :customize-text="(e: any) => `[${handleValueNumberColumn(e.value)}]`" />
        <DxTotalItem column="당월 인건비비율 (%)" summary-type="sum"
          :customize-text="(e: any) => `[${totalCurrentMonthlyFeeRate()}]`" />
        <DxTotalItem column="집합누계(D)" summary-type="sum"
          :customize-text="(e: any) => `[${handleValueNumberColumn(e.value)}]`" />
        <DxTotalItem column="잔액(C-D)" summary-type="sum"
          :customize-text="(e: any) => `[${handleValueNumberColumn(e.value)}]`" />
        <DxTotalItem column="집행율(%)" summary-type="sum"
          :customize-text="(e: any) => `[${totalExecutionRate()}]`" />
      </DxSummary>
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxPaging, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import filters from '@/helpers/filters'
export default defineComponent({
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxPaging, DxSummary, DxTotalItem
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const dataCalculated: any = ref([])

    const refAc130TableRevenueBudgetSummary = ref()

    const checkNumber = (value: any) => {
      if (Number.isNaN(Number.parseFloat(value)) || value === Infinity) {
        return 0;
      }
      return value
    }

    watch(() => props.data, (value) => {
      if (value) {
        dataCalculated.value = value.map((item: any) => {
          return {
            ...item,
            monthlyBudget: checkNumber(item?.amount / 12),
            currentMonthlyFeeRate: checkNumber(item?.currentMonthExecution / (item?.amount / 12)),
            balance: checkNumber(item?.amount - item?.cumulativeTotal),
            executionRate: checkNumber(item?.cumulativeTotal / item?.amount) * 100
          }
        })
      }

    }, {
      deep: true,
      immediate: true
    })

    const handleValueNumberColumn = (value: any) => {
      if (value) {
        if (Number.isInteger(value)) {
          return filters.formatCurrency(value)
        } else {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value).replace('$', '')
        }
      }
      return '0'
    }

    const totalMonthlyBudget = () => {
      let totalAmount = 0
      dataCalculated.value.forEach((items: any) => {
        totalAmount += checkNumber(items.amount)
      })
      return handleValueNumberColumn(totalAmount/12)
    }

    const totalCurrentMonthlyFeeRate = () => {
      let totalAmount = 0
      let totalCurrentMonthExecution = 0
      dataCalculated.value.forEach((items: any) => {
        totalCurrentMonthExecution += checkNumber(items.currentMonthExecution)
        totalAmount += checkNumber(items.amount)
      })

      return handleValueNumberColumn(totalCurrentMonthExecution/(totalAmount/12))
    }

    const totalExecutionRate = () => {
      let totalCumulativeTotal = 0
      let totalAmount = 0
      dataCalculated.value.forEach((items: any) => {
        totalCumulativeTotal += checkNumber(items.cumulativeTotal)
        totalAmount += checkNumber(items.amount)
      })
      return handleValueNumberColumn((totalCumulativeTotal/totalAmount)*100)
    }
    const resetTable = () => {
      refAc130TableRevenueBudgetSummary.value.instance.refresh()
    }
    return {
      move_column,
      colomn_resize,
      dataCalculated,
      handleValueNumberColumn,
      totalExecutionRate,
      totalMonthlyBudget,
      totalCurrentMonthlyFeeRate,
      resetTable,
      refAc130TableRevenueBudgetSummary
    }
  },
})
</script>

<style lang="scss" scoped>
.ac130TableRevenueBudgetSummary {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;

  :deep .dx-datagrid-scrollable-simulated {
    padding: 0;

    td+td {
      padding: 7px 3px;
      border-left: 1px solid #ddd;
    }
  }
}
</style>
