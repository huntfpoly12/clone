<template>
  <div class="ac130TableCashRegisterSummary">
    <div class="ac130TableCashRegisterSummary-header">
      <span class="ac130TableCashRegisterSummary-header-label">기간:</span>
      {{ year }}-01 ~ {{ year }}-{{ parseInt(month.toString()) < 10 ? '0' + month : month }}</div>
        <DxDataGrid ref="refAc130TableCashRegisterSummary" :show-row-lines="true" :hoverStateEnabled="true" :data-source="[dataCalculated]" :show-borders="true"
          :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
          noDataText="내역이 없습니다">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="총수입(A)" data-field="totalIncome" format="fixedPoint" alignment="end" width="20%"/>
          <DxColumn caption="총지출(B)" data-field="totalSpending" format="fixedPoint" alignment="end" width="20%"/>
          <DxColumn caption="장부잔액(A-B)" data-field="bookBalance" format="fixedPoint" alignment="end" width="20%"/>
          <DxColumn caption="통장잔액(C)" data-field="bankbookBalance" format="fixedPoint" alignment="end" width="20%"/>
          <DxColumn caption="차액(C-(A-B))" data-field="difference" format="fixedPoint" alignment="end" width="20%"/>
        </DxDataGrid>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling } from "devextreme-vue/data-grid";
export default defineComponent({
  props: {
    year: {
      type: [String, Number],
      default: ''
    },
    month: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const dataCalculated: any = ref({})

    const refAc130TableCashRegisterSummary = ref()

    const checkNumber = (value: any) => {
      if (Number.isNaN(Number.parseFloat(value)) || value === Infinity) {
        return 0;
      }
      return value
    }
    
    watch(() => props.data, (value) => {
      dataCalculated.value = {
        ...value,
        totalIncome: value?.totalIncome,
        totalSpending: value?.totalSpending,
        bookBalance: checkNumber(value?.totalIncome - value?.totalSpending),
        difference: checkNumber(value?.bankbookBalance - (value?.totalIncome - value?.totalSpending))
      }
    }, {
      deep: true,
      immediate: true
    })

    const resetTable = () => {
      refAc130TableCashRegisterSummary.value.instance.refresh()
    }
    
    return {
      move_column,
      colomn_resize,
      dataCalculated,
      refAc130TableCashRegisterSummary,
      resetTable
    }
  },
})
</script>

<style lang="scss" scoped>
.ac130TableCashRegisterSummary {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;

  &-header {
    margin: 0 1px;
    padding: 0 10px 5px 10px;
    text-align: end;

    &-label {
      margin-right: 10px;
    }
  }
}
</style>
