<template>
  <div id="pa820">
    <a-spin :spinning="false" size="large">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="incomeId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" ref="taxPayDataRef">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxSelection select-all-mode="allPages" mode="multiple" />
        <DxPaging :page-size="15" />
        <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" width="205" />
        <template #tag="{ data }">
          <div>
            <button class="btn-container">
              {{ data.data.employeeId }}
            </button>
            {{ data.data?.employee?.name }}
            <a-tooltip placement="top" v-if="data.data?.employee?.incomeTypeName">
              <template #title>
                {{ data.data.incomeTypeCode }}
                <span v-if="data.data?.employee?.incomeTypeName?.length > 10">{{ data.data?.employee?.incomeTypeName
                }}</span>
              </template>
              <!-- {{ checkLen(data.data?.employee?.incomeTypeName) }} -->
            </a-tooltip>
          </div>
        </template>
        <DxColumn caption="지급일" width="60" alignment="left" cell-template="paymentDay" />
        <template #paymentDay="{ data }">
          <!-- {{ formatMonth(data.data.paymentDay) }} -->
        </template>
        <DxColumn caption="지급액" data-field="paymentAmount" width="100" alignment="right" />
        <DxColumn caption="필요경비" data-field="requiredExpenses" width="100" alignment="right" />
        <DxColumn caption="소득금액" data-field="incomePayment" width="100" alignment="right" />
        <DxColumn caption="세율" data-field="taxRate" width="45" alignment="left" cell-template="taxRateSlot" />
        <template #taxRateSlot="{ data }">
          {{ data.value }}%
        </template>
        <DxColumn caption="공제" cell-template="incomLocalTax" width="85px" alignment="right" />
        <template #incomLocalTax="{ data }">
          <a-tooltip placement="top">
            <template #title>소득세 {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} / 지방소득세
              {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
            </template>
            <span>
              {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax) }}
            </span>
          </a-tooltip>
        </template>
        <DxColumn caption="차인지급액" data-field="actualPayment" width="120px" alignment="right" />
      </DxDataGrid>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem,
  DxMasterDetail,
  DxSummary,
  DxTotalItem,
} from 'devextreme-vue/data-grid';
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import filters from '@/helpers/filters';
// import { formatMonth } from '../utils/index';

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxMasterDetail,
    DxSummary,
    DxTotalItem,
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref();
    const focusedRowKey = ref();
    return {
      per_page, move_column, colomn_resize,
      focusedRowKey, dataSource
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>