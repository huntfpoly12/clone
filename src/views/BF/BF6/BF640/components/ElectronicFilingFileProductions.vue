<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="700">
    <div class="pt-10">
      <a-spin :spinning="companiesInElectronicLoading" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="id" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" noDataText="내역이 없습니다">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="사업자코드" data-field="code" />
          <DxColumn caption="사업자번호" cell-template="bizNumber" data-field="bizNumber" />
          <template #bizNumber=" { data }: any ">
            <div> {{ data.data.bizNumber.toString().slice(0, 3) }}-{{
              data.data.bizNumber.toString().slice(3, 5)
              }}-{{
              data.data.bizNumber.toString().slice(5, 10)
              }}</div>
          </template>
          <DxColumn caption="상호" data-field="name" />
          <DxColumn caption="대표자명" data-field="presidentName" />
          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import {
  DxDataGrid,
  DxToolbar,
  DxSelection,
  DxColumn,
  DxItem,
  DxScrolling,
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";
import dayjs from "dayjs";
export default defineComponent({
  props: {
    modalStatus: Boolean,
    data: Object,
    step: Number,
  },
  components: {
    DxDataGrid,
    DxToolbar,
    DxSelection,
    DxColumn,
    DxItem,
    DxScrolling,
    DxSummary,
    DxTotalItem,
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = +dayjs().format('YYYY');
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref([]);
    const companiesInElectronicParam = ref(props.data ?? {});

    // Query getCompaniesInElectronicFilingFile

    let {
      loading: companiesInElectronicLoading,
      result: companiesInElectronicResult,
    } = useQuery(
      queries.getCompaniesInElectronicFilingFile,
      companiesInElectronicParam.value,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(companiesInElectronicResult, (newVal) => {
      let data = newVal.getCompaniesInElectronicFilingFile;
      dataSource.value = data;
    });

    watch(
      () => props.modalStatus,
      (newVal) => {
        if (newVal == true) {
        }
      }
    );

    const setModalVisible = () => {
      emit("closePopup", true);
    };

    return {
      globalYear,
      move_column,
      colomn_resize,
      dataSource,
      // loading,
      setModalVisible,
      companiesInElectronicLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep .dx-datagrid-total-footer>.dx-datagrid-content {
  padding: 0;
}
</style>
