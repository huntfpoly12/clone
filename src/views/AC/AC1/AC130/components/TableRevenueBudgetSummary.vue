<template>
  <div class="ac130TableRevenueBudgetSummary">
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCalculated" :show-borders="true"
      :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
      noDataText="내역이 없습니다">
      <DxPaging :enabled="false" />
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxColumn caption="계정과목" data-field="name" />
      <DxColumn caption="연예산(C)" data-field="amount" format="fixedPoint" alignment="end" />
      <DxColumn caption="월환산예산 (C /12)" data-field="monthlyBudget" format="fixedPoint" width="130" alignment="end" />
      <DxColumn caption="당월집행" data-field="currentMonthExecution" format="fixedPoint" alignment="end" />
      <DxColumn caption="당월 인건비비율 (%)" data-field="currentMonthlyFeeRate" format="fixedPoint" width="140" alignment="end" />
      <DxColumn caption="집합누계(D)" data-field="cumulativeTotal" format="fixedPoint" alignment="end" />
      <DxColumn caption="잔액(C-D)" data-field="balance" format="fixedPoint" alignment="end" />
      <DxColumn caption="집행율(%)" data-field="executionRate" format="fixedPoint" alignment="end" />
      <DxSummary>
        <DxTotalItem column="계정과목" summary-type="count" display-format="합계: [{0}]" />
        <DxTotalItem column="연예산(C)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="월환산예산 (C /12)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="당월집행" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="당월 인건비비율 (%)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="집합누계(D)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="잔액(C-D)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
        <DxTotalItem column="집행율(%)" summary-type="sum" :customize-text="(e: any) => `[${$filters.formatCurrency(e.value)}]`"/>
      </DxSummary>
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxPaging, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
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

    const checkNumber = (value: any) => {
      if (Number.isInteger(value)) {
        return value
      } else {
        return 0
      }
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
    return {
      move_column,
      colomn_resize,
      dataCalculated,
    }
  },
})
</script>

<style lang="scss" scoped>
.ac130TableRevenueBudgetSummary {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
