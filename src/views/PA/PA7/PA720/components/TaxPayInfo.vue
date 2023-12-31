<template>
  <a-spin :spinning="loadingIncomeExtras" size="large">
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail" :show-borders="true"
      key-expr="incomeId" :allow-column-reordering="move_column" :onRowClick="onRowClick"
      :allow-column-resizing="colomn_resize" :column-auto-width="true" :focused-row-enabled="true"
      @selection-changed="selectionChanged" v-model:focused-row-key="focusedRowKey"
      v-model:selected-row-keys="selectedRowKeys" @focused-row-changing="onFocusedRowChanging" ref="taxPayDataRef"
      id="tax-pay-720" noDataText="내역이 없습니다">
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxSelection select-all-mode="allPages" mode="multiple" />
      <DxPaging :page-size="15" />
      <DxColumn caption="기타소득자 [소득구분]" data-field="employeeId" cell-template="tag" alignment="left"/>
      <template #tag="{ data }">
        <!-- <employ-type-select :readOnly="true"
              :arrayValue="employSelect" v-model:valueEmploy="data.data.employeeId" :newLoadKey="data.data.employeeId"/> -->
        <!-- <div> -->
          <div v-if="data.data.employeeId" class="d-flex-center">
            <span class="btn-container">
              {{ data.data.employeeId }}
            </span>
            <a-tooltip placement="top" zIndex="999999" :title="data.data?.employee?.name">
            <div class="name-w-1 text-overflow mr-5 ml-5">
              {{ data.data?.employee?.name }}
            </div>
          </a-tooltip>
          <!-- <div class="name-w-1 text-overflow" v-else>
            {{ data.data?.employee?.name }}
          </div> -->
          <a-tooltip placement="top" zIndex="999999" :title="data.data?.employee?.incomeTypeCode + ' ' + data.data?.employee?.incomeTypeName">
            <a-tag class="py-1 mr-0 text-overflow">{{ data.data?.employee?.incomeTypeName }}</a-tag>
          </a-tooltip>
        </div>
        <div v-else></div>
      <!-- </div> -->
      </template>
      <DxColumn caption="지급일" width="55" alignment="left" data-field="paymentDay" cell-template="paymentDay" />
      <template #paymentDay="{ data }">
        {{ formatMonth(data.data.paymentDay) }}
      </template>
      <DxColumn caption="지급액" data-field="paymentAmount" :format="$filters.formatCurrency" alignment="right"  width="80"/>
      <DxColumn caption="필요경비" data-field="requiredExpenses" :format="$filters.formatCurrency" alignment="right"  width="80"/>
      <DxColumn caption="소득금액" data-field="incomePayment" :format="$filters.formatCurrency" alignment="right"  width="80"/>
      <DxColumn caption="세율" data-field="taxRate" width="45" alignment="left" cell-template="taxRateSlot"/>
      <template #taxRateSlot="{ data }">
        {{ data.value }}%
      </template>
      <DxColumn caption="공제" cell-template="incomLocalTax" alignment="right"
        :calculateCellValue="calculateIncomeTypeCodeAndName"  width="80"/>
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
      <DxColumn caption="차인지급액" data-field="actualPayment" :format="$filters.formatCurrency" alignment="right" width="80" />
    </DxDataGrid>
    <a-row class="fs-14 summary-ctn">
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          <div style="width: 160px;">
            사업소득자[소득구분]수
            <div style="font-size: 16px;">[{{ dataSourceDetail.length }}]</div>
          </div>
        </div>
      </a-col>
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          지급액합계
          <div style="font-size: 16px;">[{{ calcSummary(dataSourceDetail, 'paymentAmount') }}]</div>
        </div>
      </a-col>
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          필요경비합계
          <div style="font-size: 16px;">[{{ calcSummary(dataSourceDetail, 'requiredExpenses') }}]</div>
        </div>
      </a-col>
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          소득금액합계
          <div style="font-size: 16px;">[{{ calcSummary(dataSourceDetail, 'incomePayment') }}]</div>
        </div>
      </a-col>
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          공제합계
          <div style="font-size: 16px;">[{{ customTextSummary() }}]</div>
        </div>
      </a-col>
      <a-col class="sum-item">
        <div class="dx-datagrid-summary-item dx-datagrid-text-content">
          차인지급액합계
          <div style="font-size: 16px;">[{{ calcSummary(dataSourceDetail, 'actualPayment') }}]</div>
        </div>
      </a-col>
    </a-row>
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
import { calcSummary, companyId } from '@/helpers/commonFunction';
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
    saveToNewRow: {
      type: Function,
      default: () => { },
    },
    compareType: Number,
    compareForm: {
      type: Function,
      default: () => { },
    },
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
    const changeDayDataPA720 = computed(() => store.state.common.changeDayDataPA720);
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
    const customTextSummary = () => {
      let total = 0;
      dataSourceDetail.value.map((val: any) => {
        total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax;
      });
      return filters.formatCurrency(total);
    };
    const selectedRowKeys = computed(() => store.state.common.selectedRowKeysPA720);
    const selectionChanged = (e: any) => {
      if (e.selectedRowsData.length > 0) {
        var days: any = [];
        var employeeIds: any[] = [];
        incomeIdDels.value = e.selectedRowsData.map((item: { incomeId: number }) => {
          return item.incomeId;
        });
        paymentData.value = e.selectedRowsData.map((item: any) => {
          if (employeeIds.indexOf(item.employeeId) < 0) {
            employeeIds.push(item.employeeId);
            days = [...days, ...(dataSourceDetail.value.filter((item2: any) => item2.employeeId == item.employeeId).map((item1: any) => item1.paymentDay))];
          }
          return {
            param: { incomeId: item.incomeId, day: item.paymentDay, ...dataTableDetail.value },
            errorInfo: { employeeId: item.employee.employeeId, incomeTypeName: item.employee.incomeTypeName, name: item.employee.name },
          };
        });
        store.state.common.dayArrPA720 = days;
      }
    };
    // set key again
    const focusedRowKey = ref<Number | null>(1);
    const loadIndexInit = ref<Number>(0); // check click same row?
    const onRowClick = (e: any) => {
      if(e.key === "99axbzkk"){
        return;
      }
      if (!props.compareForm() && !firsTimeRow.value) {
        e.component.selectRows(formPA720.value.input.incomeId, true);
      }
      const data = e.data && e.data;
      // store.commit('common/selectedRowKeysPA720', data.incomeId);
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

    //-----------------------hover when click diff row----------------
    const taxPayDataRef = ref(); // ref of grid
    const dataGridRef = computed(() => taxPayDataRef.value?.instance as any); // ref of grid Instance
    const onFocusedRowChanging = (e: any) => {
      const rowElement = e.rowElement[0];
      if (e.event.target.classList.value == "dx-checkbox-icon" || e.event.target.classList.contains('dx-command-select')) {
        e.cancel = true;
      }
      if (!props.compareForm()) {
        e.cancel = true;
        rowElement?.classList.add("dx-state-hover-custom");
      } else {
        removeHoverRowKey();
      }
    }
    const removeHoverRowKey = () => {
      const element = document.querySelector(".dx-state-hover-custom");
      if (element)
        dataGridRef.value?.refresh();
      focusedRowKey.value = props.compareType == 2 ? 681 : formPA720.value.input.incomeId;
    }
    const selectRow = (val: any) => {
      dataGridRef.value.selectRows(val, true)
    }
    
    const checkLen = (text: String, num: number) => {
      if (text.replace(/\s/g, "").length > num) {
        return text.substring(0, num - 2) + ' ' + '...';
      }
      return text;
    };
    const checkLenTooltip = (text: String, num: number) => {
      return text.length > num ? text : '';
    };

    function countOccurrences(arr: any[], number: number) {
      return arr.reduce((count, element) => {
        if (element === number) {
          return count + 1;
        }
        return count;
      }, 0);
    }
    const checkLoopDay = () => {
      let employeeId = formPA720.value.input.employeeId;
      if (dataSourceDetail.value.length) {
        store.state.common.dayArrPA720 = dataSourceDetail.value.filter((item: any) => item.employeeId == employeeId).map((item1: any) => item1.paymentDay);
        if (countOccurrences(store.state.common.dayArrPA720, formPA720.value.input.paymentDay) > 1) {
          store.state.common.isLoopDayPA720 = true;
        } else {
          store.state.common.isLoopDayPA720 = false;
        }
      }
    }
    watch(() => [formPA720.value.input.employeeId, formPA720.value.input.paymentDay], ([newVal]) => {
      if (newVal) {
        checkLoopDay();
      }
    }, { deep: true });
    function calculateIncomeTypeCodeAndName(rowData: any) {
      return rowData.withholdingIncomeTax + rowData.withholdingLocalIncomeTax;
    }
    const employSelect = computed(() => store.state.common.employSelect);
    return {
      rowTable,
      per_page,
      move_column,
      colomn_resize,
      dataSourceDetail,
      checkLen, checkLenTooltip,
      loadingIncomeExtras,
      customTextSummary,
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
      selectedRowKeys,
      onFocusedRowChanging,
      taxPayDataRef,
      removeHoverRowKey,
      store, employSelect,
      changeDayDataPA720,
      selectRow, calcSummary,
      calculateIncomeTypeCodeAndName
    };
  },
});
</script>

<style lang="scss">
@import './../style/style.scss';
</style>
