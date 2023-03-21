<template>
  <a-spin :spinning="loadingIncomeExtras || isRunOnce" size="large">
    <!-- {{ firsTimeRow }} firsTimeRow <br />
    {{ focusedRowKey }} focusedRowKey <br /> -->
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail" :show-borders="true"
      :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
      focused-row-enabled="true" key-expr="incomeId" :auto-navigate-to-focused-row="true" @cell-click="onCellClick"
      v-model:focused-row-key="focusedRowKey" @selection-changed="selectionChanged" @row-click="onRowClick"
      v-model:selected-row-keys="selectedRowKeys">
      <DxScrolling mode="standard" show-scrollbar="always" />
      <!-- <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" /> -->
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
            {{ checkLen(data.data?.employee?.incomeTypeName) }}
          </a-tooltip>
        </div>
      </template>
      <DxColumn caption="지급일" width="60" alignment="left" cell-template="paymentDay" />
      <template #paymentDay="{ data }">
        {{ formatMonth(data.data.paymentDay) }}
      </template>
      <DxColumn caption="지급액" data-field="paymentAmount" :customize-text="formateMoney" width="100" alignment="right" />
      <DxColumn caption="필요경비" data-field="requiredExpenses" :customize-text="formateMoney" width="100"
        alignment="right" />
      <DxColumn caption="소득금액" data-field="incomePayment" :customize-text="formateMoney" width="100" alignment="right" />
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
      <DxColumn caption="차인지급액" data-field="actualPayment" :customize-text="formateMoney" width="120px"
        alignment="right" />
      <DxSummary v-if="dataSourceDetail?.length > 0">
        <DxTotalItem column="기타소득자 [소득구분]" summary-type="count" display-format="사업소득자[소득구분]수: {0}" />
        <DxTotalItem class="custom-sumary" column="지급액" summary-type="sum" display-format="지급액합계: {0}"
          value-format="#,###" />
        <DxTotalItem class="custom-sumary" column="필요경비" summary-type="sum" value-format="#,###"
          display-format="필요경비합계: {0}" />
        <DxTotalItem class="custom-sumary" column="소득금액" summary-type="sum" value-format="#,###"
          display-format="소득금액합계: {0}" />
        <DxTotalItem class="custom-sumary" column="공제" :customize-text="customTextSummary" />
        <DxTotalItem class="custom-sumary" column="actualPayment" summary-type="sum" display-format="차인지급액합계: {0}"
          value-format="#,###" />
      </DxSummary>
    </DxDataGrid>
  </a-spin>
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
import { formatMonth } from '../utils/index';

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
  props: {
    dataCallTableDetail: {
      type: Object,
    },
    changeFommDone: {
      type: Number,
    },
    isRunOnce: Boolean,
    isChangeRow: {
      type: Boolean,
      default: false,
    },
    addItemClick: Boolean,
    saveToNewRow: {
      type: Function,
      default: () => { },
    },
    compareType: Number,
  },
  setup(props, { emit }) {
    let dataSourceDetail = ref([]);
    const triggerDetail = ref<boolean>(false);
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const rowTable = ref(0);
    let updateParam = reactive<any>({});
    let dataTableDetail: any = ref({
      ...props.dataCallTableDetail,
    });
    const incomeIdDels = ref<any>([]);
    const paymentData = ref<any>([]);
    const formPA720 = computed(() => store.getters['common/formPA720']);
    const dataActionUtilsPA720 = computed(() => store.getters['common/dataActionUtilsPA720']);

    // ================GRAPQL==============================================

    // API QUERY TABLE SMALL LEFT SIDE
    const {
      refetch: refetchIncomeExtras,
      loading: loadingIncomeExtras,
      onError: errorIncomeExtras,
      result: resIncomeExtras,
    } = useQuery(queries.getIncomeExtras, dataTableDetail, () => ({
      enabled: triggerDetail.value,
      fetchPolicy: 'no-cache',
    }));
    watch(resIncomeExtras, async (res) => {
      dataSourceDetail.value = res.getIncomeExtras;

      if (firsTimeRow.value && res.getIncomeExtras[0]?.incomeId) {
        focusedRowKey.value = res.getIncomeExtras[0]?.incomeId ?? 1;
        onRowClick({ data: { incomeId: res.getIncomeExtras[0]?.incomeId } });
        // firsTimeRow.value = false;
      }
      if (!firsTimeRow.value && res) {
        if (props.compareType == 3) {
          props.saveToNewRow();
          dataSourceDetail.value = dataSourceDetail.value.concat(formPA720.value.input);
          focusedRowKey.value = formPA720.value.input.incomeId;
          store.commit('common/selectedRowKeysPA720', formPA720.value.input.incomeId);
        }
      }
      if (res.getIncomeExtras.length == 0) {
        onRowClick({ data: {} });
        store.commit('common/formPA720', dataActionUtilsPA720.value);
        store.commit('common/formEditPA720', formPA720.value);
      }
      triggerDetail.value = false;
    });
    errorIncomeExtras((res) => {
      triggerDetail.value = false;
    });

    // ================WATCHING============================================
    watch(
      () => props.dataCallTableDetail,
      (newValue) => {
        dataTableDetail.value = newValue;
        triggerDetail.value = true;
      },
      { deep: true }
    );

    watch(
      () => props.changeFommDone,
      () => {
        triggerDetail.value = true;
        firsTimeRow.value = false;
      }
    );

    // ================FUNCTION============================================
    const firsTimeRow = ref(true);

    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 7) + '...';
      }
      return text;
    };
    const customTextSummary = () => {
      let total = 0;
      dataSourceDetail.value.map((val: any) => {
        total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax;
      });
      return '공제합계: ' + filters.formatCurrency(total);
    };
    const formateMoney = (options: any) => {
      return filters.formatCurrency(options.value);
    };
    const selectedRowKeys = computed(() => store.state.common.selectedRowKeysPA720);
    const selectionChanged = (e: any) => {
      incomeIdDels.value = e.selectedRowsData.map((item: { incomeId: number }) => {
        return item.incomeId;
      });
      paymentData.value = e.selectedRowsData.map((item: { incomeId: number; paymentDay: number }) => {
        return { incomeId: item.incomeId, day: item.paymentDay, ...dataTableDetail.value };
      });
    };
    // set key again
    const focusedRowKey = ref<Number | null>(1);
    const loadIndexInit = ref<Number>(0); // check click same row?
    watch(() => props.addItemClick, (newVal) => {
      loadIndexInit.value = -1;
    }, { deep: true })
    const onRowClick = (e: any) => {
      const data = e.data && e.data;
      store.commit('common/selectedRowKeysPA720', data.incomeId);
      if (e.loadIndex != loadIndexInit.value) {
        updateParam = {
          companyId: companyId,
          processKey: {
            imputedYear: dataTableDetail.value.processKey?.imputedYear,
            imputedMonth: dataTableDetail.value.processKey?.imputedMonth,
            paymentYear: dataTableDetail.value.processKey?.paymentYear,
            paymentMonth: dataTableDetail.value.processKey?.paymentMonth,
          },
          incomeId: data.incomeId,
        };
        emit('editTax', updateParam, firsTimeRow.value);
        setTimeout(() => {
          firsTimeRow.value = false;
        }, 100);
      }
      if (e.loadIndex == undefined) {
        loadIndexInit.value = 0;
      } else {
        loadIndexInit.value = e.loadIndex;
      }
    };
    const onCellClick = (e: any) => {
      if (e.columnIndex === 0 && e.column.type == 'selection') {
        focusedRowKey.value = formPA720.value.input?.incomeId;
        return;
      }
    }
    return {
      rowTable,
      per_page,
      move_column,
      colomn_resize,
      dataSourceDetail,
      checkLen,
      loadingIncomeExtras,
      customTextSummary,
      formateMoney,
      selectionChanged,
      incomeIdDels,
      paymentData,
      refetchIncomeExtras,
      triggerDetail,
      dataTableDetail,
      focusedRowKey,
      onRowClick,
      firsTimeRow,
      formatMonth,
      onCellClick,
      selectedRowKeys,
    };
  },
});
</script>

<style></style>
