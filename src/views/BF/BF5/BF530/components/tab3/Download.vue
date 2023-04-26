<template>
  <a-modal title="" :visible="true" @cancel="setModalStatus" :mask-closable="false" class="confirm-md"
    footer="" :width="700">
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="code" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxEditing :allow-updating="true" mode="cell" />
          <DxColumn caption="신고종류" data-field="code" :allowEditing="false" />
          <DxColumn caption="신고대상" data-field="bizNumber" />
          <DxColumn caption="사무위탁" data-field="name" />
          <DxColumn caption="다운로드" cell-template="name1" />
          <template #name1>
            <button-basic text="받기" type="default" mode신고대상="contained" :width="90" />
          </template>
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import mutations from '@/graphql/mutations/BF/BF6/BF620/index';
import notification from '@/utils/notification';
import { useStore } from 'vuex';
import DxDataGrid, { DxColumn, DxEditing, DxScrolling, DxSummary } from 'devextreme-vue/data-grid';

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([
      { code: '취득', bizNumber: '', name: '' },
      { code: '휴직', bizNumber: '', name: '' },
      { code: '성실', bizNumber: '', name: '' },
      { code: '급여변경', bizNumber: '', name: '' },
    ]);
    const setModalStatus = () => {
      emit("closeModal", false)
    };
    const onAllowUpdate = (e: any) => {
      // console.log(`output->e`, e)
    }
    return {
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      onAllowUpdate,
    };
  },
  components: { DxDataGrid, DxScrolling, DxColumn, DxSummary, DxEditing }
});
</script>
<style lang="scss" scoped>
:deep .dx-datagrid-content .dx-datagrid-table .dx-row>td {
  height: 20px;
}
</style>
