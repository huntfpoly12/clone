<template>
  <a-spin :spinning="false" size="large">
    <h4>후원품(수입) 검색결과</h4>
    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTable1" :show-borders="true"
      key-expr="employeeId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
      :column-auto-width="true">
      <DxPaging :page-size="0" />
      <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']" placeholder="검색"/>
      <DxExport :enabled="true" />
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxToolbar>
        <DxItem name="searchPanel" />
        <DxItem name="exportButton" css-class="cell-button-export" />
      </DxToolbar>
      <DxColumn caption="발생일" data-field="name" />
      <DxColumn caption="후원품종류" data-field="bizNumber" />
      <DxColumn caption="후원자구분" data-field="presidentName" />
      <DxColumn caption="비영리법인구분 "></DxColumn>
      <DxColumn caption="모금자 기관 여부" data-field="presidentName2"></DxColumn>
      <DxColumn caption="기부금 단체 여부"></DxColumn>
      <DxColumn caption="후원자"></DxColumn>
      <DxColumn caption="명세"></DxColumn>
      <DxColumn caption="품명"></DxColumn>
      <DxColumn caption="수량/단위"></DxColumn>
      <DxColumn caption="상당금액" data-field="jobTypeCode" cell-template="jobTypeCode" />
      <template #jobTypeCode="{ data }" class="custom-action">
        <div class="d-flex justify-content-center" v-if="data.data.hasDownFile">
          {{ data.value }}
        </div>
      </template>
      <DxSummary>
        <DxTotalItem column="발생일" summary-type="count" display-format="건수: {0}" />
        <DxTotalItem class="custom-sumary" column="상당금액" summary-type="sum" display-format="금액 합계: {0}" />
      </DxSummary>
    </DxDataGrid>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA730/index";
import { Message } from "@/configs/enum";
import { printRadio } from '../utils/index';
import { useStore } from "vuex";
import DxDataGrid, { DxColumn, DxExport, DxPaging, DxScrolling, DxSearchPanel, DxSummary, DxToolbar, DxTotalItem } from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/select-box";
export default defineComponent({
  props: {
    printData: {
      type: Number,
      default: '',
    }
  },
  components: { DxDataGrid, DxPaging, DxColumn, DxSummary, DxTotalItem, DxSearchPanel, DxExport, DxScrolling, DxToolbar, DxItem },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataTable1 = ref([]);
    // const {
    //   refetch: refetchIncomeExtras,
    //   loading: loadingIncomeExtras,
    //   onError: errorIncomeExtras,
    //   result: resIncomeExtras,
    // } = useQuery(queries.getIncomeExtras, dataTableDetail, () => ({
    //   enabled: triggerDetail.value,
    //   fetchPolicy: 'no-cache',
    // }));
    // watch(resIncomeExtras, async (res) => {
    //   dataSourceDetail.value = res.getIncomeExtras;

    //   if (firsTimeRow.value && res.getIncomeExtras[0]?.incomeId) {
    //     focusedRowKey.value = res.getIncomeExtras[0]?.incomeId ?? 1;
    //     onRowClick({ data: { incomeId: res.getIncomeExtras[0]?.incomeId } });
    //     // firsTimeRow.value = false;
    //   }
    //   if (!firsTimeRow.value && res) {
    //     if (props.compareType == 3) {
    //       props.saveToNewRow();
    //       dataSourceDetail.value = dataSourceDetail.value.concat(formPA720.value.input);
    //       focusedRowKey.value = formPA720.value.input.incomeId;
    //       store.commit('common/selectedRowKeysPA720', formPA720.value.input.incomeId);
    //     }
    //   }
    //   if (res.getIncomeExtras.length == 0) {
    //     onRowClick({ data: {} });
    //     store.commit('common/formPA720', dataActionUtilsPA720.value);
    //     store.commit('common/formEditPA720', formPA720.value);
    //   }
    //   triggerDetail.value = false;
    // });
    // errorIncomeExtras((res) => {
    //   triggerDetail.value = false;
    // });
    // onDoneAdd(() => {
    //   notification("success", Message.getMessage('COMMON', '801').message);
    //   emit("closePopup", false);
    // });
    // errorSendEmail((e: any) => {
    //   notification("error", e.message);
    // });

    return {
      per_page, move_column, colomn_resize,
      printRadio,
      dataTable1
    };
  },
});
</script>

<style lang="scss"></style>
