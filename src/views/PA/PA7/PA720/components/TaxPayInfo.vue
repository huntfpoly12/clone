<template>
  <a-spin :spinning="loadingIncomeExtras || isRunOnce" size="large">
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail" :show-borders="true"
      :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
      focused-row-enabled="true" key-expr="incomeId" :auto-navigate-to-focused-row="true"
      v-model:focused-row-key="focusedRowKey" @selection-changed="selectionChanged" @row-click="onRowClick">
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
      <DxPaging :page-size="15" />
      <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" width="205" />
      <template #tag="{ data }" class="custom-action">
        <div>
          <button style="margin-right: 5px">
            {{ data.data.incomeTypeCode }}
          </button>
          {{ data.data?.employee?.name }}
          <a-tooltip placement="top" v-if="data.data?.employee?.incomeTypeName">
            <template #title v-if="data.data?.employee?.incomeTypeName?.length > 10">
              <span>{{ data.data?.employee?.incomeTypeName }}</span>
            </template>

            {{ checkLen(data.data?.employee?.incomeTypeName) }}
          </a-tooltip>
        </div>
      </template>
      <DxColumn caption="지급일" data-field="paymentDay" width="60" alignment="left" />
      <DxColumn caption="지급액" data-field="paymentAmount" :customize-text="formateMoney" width="100" alignment="left" />
      <DxColumn caption="필요경비" data-field="requiredExpenses" :customize-text="formateMoney" width="100"
        alignment="left" />
      <DxColumn caption="소득금액" data-field="incomePayment" :customize-text="formateMoney" width="100" alignment="left" />
      <DxColumn caption="세율" data-field="taxRate" width="45" alignment="left" />
      <DxColumn caption="공제" cell-template="incomLocalTax" width="85px" alignment="left" />
      <template #incomLocalTax="{ data }">
        {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax) }}
      </template>
      <DxColumn caption="차인지급액" data-field="actualPayment" :customize-text="formateMoney" width="120px"
        alignment="left" />
      <DxSummary v-if="dataSourceDetail.length > 0">
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
import { ref, defineComponent, watch, computed, reactive } from 'vue';
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
    const actionSavePA720 = computed(() => store.getters['common/actionSavePA720']);

    // ================GRAPQL==============================================

    // API QUERY TABLE SMALL LEFT SIDE
    const {
      refetch: refetchIncomeExtras,
      loading: loadingIncomeExtras,
      onError: errorIncomeExtras,
      onResult: resIncomeExtras,
    } = useQuery(queries.getIncomeExtras, dataTableDetail, () => ({
      enabled: triggerDetail.value,
      fetchPolicy: 'no-cache',
    }));
    resIncomeExtras((res) => {
      dataSourceDetail.value = res.data.getIncomeExtras;
      if (firsTimeRow.value && res.data.getIncomeExtras[0]?.incomeId) {
        focusedRowKey.value = res.data.getIncomeExtras[0]?.incomeId ?? 1;
        onRowClick({ data: { incomeId: res.data.getIncomeExtras[0]?.incomeId } });
        firsTimeRow.value = false;
      }else {
        store.commit('common/formPA720', store.getters['common/dataActionUtilsPA720']);
        emit('resetForm')
      }
      triggerDetail.value = false;
      loadingIncomeExtras.value = true;
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
        refetchIncomeExtras();
      },
      { deep: true }
    );

    watch(
      () => props.changeFommDone,
      () => {
        triggerDetail.value = true;
        refetchIncomeExtras();
        firsTimeRow.value = false;
      }
    );

    // ================FUNCTION============================================
    const firsTimeRow = ref(true);

    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
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
    const selectionChanged = (data: any) => {
      incomeIdDels.value = data.selectedRowsData.map((item: { incomeId: number }) => {
        return item.incomeId;
      });
      paymentData.value = data.selectedRowsData.map((item: { incomeId: number; paymentDay: number }) => {
        return { incomeId: item.incomeId, day: item.paymentDay, ...dataTableDetail.value };
      });
    };
    // set key again
    const isErrorFormPA720 = computed(() => store.getters['common/isErrorFormPA720']);
    const keyActivePA720 = computed(() => store.getters['common/keyActivePA720']);
    const focusedRowKey = ref<Number | null>(1);
    watch(actionSavePA720, () => {
      setTimeout(() => {
        if (isErrorFormPA720.value || store.state.common.actionSaveTypePA720 === 1) {
          focusedRowKey.value = keyActivePA720.value;
        }
      }, 100);
    });
    const loadIndexInit = ref<Number>(0); // check click same row?
    watch(() => props.addItemClick, () => {
      loadIndexInit.value = -1;
    }, { deep: true })
    const onRowClick = (e: any) => {
      const data = e.data && e.data;
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
    };
  },
});
</script>

<style>

</style>
