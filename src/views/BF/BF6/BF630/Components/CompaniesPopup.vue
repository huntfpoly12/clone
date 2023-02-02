<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
      :width="644">
     <div class="grid-view-companies">
        <div class="content-grid">
          <a-spin :spinning="loading" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxColumn caption="사업자코드" data-field="code" />
                    <DxColumn caption="사업자번호" data-field="bizNumber"/>
                    <DxColumn caption="상호" data-field="cname"/>
                    <DxColumn caption="대표자명" data-field="presidentName" />
                </DxDataGrid>
            </a-spin>
        </div>
      </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import notification from "@/utils/notification";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import { useStore } from 'vuex';
export default defineComponent({
  props: {
      modalStatus: {
          type: Boolean,
          default: false,
      },
      data: {
          type: Object,
          default: {}
      },
      tabName: {
          type: String,
          default: ''
      }
  },
  components: {
    DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear)
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const setModalVisible = () => {
        emit("closePopup", false)
    };
    const dataSource = ref([])
    // ============ GRAPQL ===============================
    const {
        result,
        loading,
        onError
    } = useQuery(queries.getCompaniesInElectronicFilingFile, {
        type: props.data.type,
        electronicFilingId: props.data.electronicFilingId,
    }, () => ({
            fetchPolicy: "no-cache",
    }))
    // ===================DONE GRAPQL==================================
    // watch result  api searchElectronicFilingFileProductions

    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getCompaniesInElectronicFilingFile
      }
    })
    onError(e => {
      notification('error', e.message)
    })

    return {
        globalYear,
        move_column,
        colomn_resize,
        dataSource,
        loading,
        setModalVisible
      }
  },
})
</script>

<style lang="scss" scoped>

</style>
