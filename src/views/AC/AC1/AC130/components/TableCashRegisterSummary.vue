<template>
 <div class="ac130TableBalanceOfCashRegister">
  <div class="ac130TableBalanceOfCashRegister-header">
    <span class="ac130TableBalanceOfCashRegister-header-label">기간:</span>
     {{ year }}-01 ~ {{ year }}-{{ parseInt(month.toString()) < 10 ? '0'+month : month }}</div>
  <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="[dataCalculated]"
    :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
    :column-auto-width="true" noDataText="내역이 없습니다">
    <DxScrolling mode="standard" show-scrollbar="always" />
    <DxColumn caption="총수입(A)" data-field="totalIncome" format="fixedPoint"/>
    <DxColumn caption="총지출(B)" data-field="totalSpending" format="fixedPoint"/>
    <DxColumn caption="장부잔액(A-B)" data-field="bookBalance" format="fixedPoint"/>
    <DxColumn caption="통장잔액(C)" data-field="bankbookBalance" format="fixedPoint"/>
    <DxColumn caption="차액(C-(A-B))" data-field="difference" format="fixedPoint"/>
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
      default: () => {}
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const dataCalculated:any = ref({})

    watch(() => props.data, (value) => {
      dataCalculated.value = {
        ...value,
        bookBalance: value.totalIncome - value.totalSpending,
        difference: value.bankbookBalance - value.totalIncome - value.totalSpending
      }
    },{
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
.ac130TableBalanceOfCashRegister {
  &-header {
    padding: 0 10px 5px 10px;
    text-align: end;
    &-label {
      margin-right: 10px;
    }
  }
}
</style>
