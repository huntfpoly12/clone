<template>
  <a-modal :visible="true" @cancel="setModalStatus" :mask-closable="false" class="confirm-md" footer="" :width="'80%'">
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="code" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="기록일시" data-field="code" />
          <DxColumn caption="내용" data-field="bizNumber" />
          <DxColumn caption="사업장관리번호" data-field="name" />
          <DxColumn caption="수임상태" data-field="presidentName" />
          <DxColumn caption="처리상태" data-field="presidentName1" />
          <DxColumn caption="연금EDI상태" data-field="presidentName2" />
          <DxColumn caption="건보EDI상태" data-field="presidentName3" />
          <DxColumn caption="연금지사명" data-field="presidentName4" />
          <DxColumn caption="연금지사FAX" data-field="presidentName5" />
          <DxColumn caption="건보지사명" data-field="presidentName6" />
          <DxColumn caption="건보지사FAX" data-field="presidentName7" />
          <DxColumn caption="고용지사명" data-field="presidentName8" />
          <DxColumn caption="고용FAX" data-field="presidentName9" />
          <DxColumn caption="산재지사명" data-field="presidentName10" />
          <DxColumn caption="산재FAX" data-field="presidentName11" />
          <DxColumn caption="메모" data-field="presidentName12" />
          <DxColumn caption="IP" data-field="presidentName13" />
          <DxColumn caption="수정ID" data-field="presidentName14" />
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import DxDataGrid, { DxColumn, DxScrolling, DxSummary } from 'devextreme-vue/data-grid';

export default defineComponent({
  components: { DxDataGrid, DxScrolling, DxColumn, },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([]);
    
    const setModalStatus = () => {
      emit("closeModal", false)
    };
    return {
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
