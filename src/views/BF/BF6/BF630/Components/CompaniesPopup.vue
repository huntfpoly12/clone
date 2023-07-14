<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="644"
  >
    <div class="grid-view-companies pt-10">
      <div class="content-grid">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid
            noDataText="내역이 없습니다"
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            class="mt-10"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
          >
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxColumn caption="사업자코드" data-field="code" />
            <DxColumn caption="사업자번호" cell-template="bizNumber" />
            <template #bizNumber="{ data }">
              {{ $filters.formatBizNumber(data.data.bizNumber) }}
            </template>
            <DxColumn caption="상호" data-field="name" />
            <DxColumn caption="대표자명" data-field="presidentName" />
            <DxSummary>
              <DxTotalItem
                column="사업자코드"
                summary-type="count"
                display-format="전체: {0}"
              />
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
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
import notification from "@/utils/notification";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
    tabName: {
      type: String,
      default: "",
    },
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
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const dataSource = ref([]);
    // ============ GRAPQL ===============================
    const { result, loading, onError } = useQuery(
      queries.getCompaniesInElectronicFilingFile,
      {
        type: props.data.type,
        electronicFilingId: props.data.electronicFilingId,
      },
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    // ===================DONE GRAPQL==================================
    // watch result  api searchElectronicFilingFileProductions

    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getCompaniesInElectronicFilingFile;
      }
    });
    onError((e) => {
      //notification('error', e.message)
    });
    // const formatBizNumber = (value: any) => {
    //   const bizNumber = value.toString();
    //   return `${bizNumber.slice(0, 3)}-${bizNumber.slice(
    //     3,
    //     5
    //   )}-${bizNumber.slice(5)}`;
    // };

    return {
      move_column,
      colomn_resize,
      dataSource,
      loading,
      setModalVisible,
      // formatBizNumber,
    };
  },
});
</script>

<style lang="scss" scoped></style>
