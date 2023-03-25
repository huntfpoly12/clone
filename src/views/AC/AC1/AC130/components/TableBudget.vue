<template>
  <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="data" :show-borders="true"
    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
    <DxScrolling mode="standard" show-scrollbar="always" />
    <DxColumn caption="구분" cell-template="labelDivision" />
    <template #labelDivision="{ data }">
      <b style="color: #7F7F7F;">{{ labelDivision[data.rowIndex] }}</b>
    </template>
    <DxColumn caption="연예산(C)" data-field="key2" />
    <DxColumn caption="당월집행" data-field="key3" />
    <DxColumn caption="집합누계(D)" data-field="key4" />
    <DxColumn caption="잔액(C-D)" data-field="key5" />
    <DxColumn caption="집행율(%)" data-field="key6" />
  </DxDataGrid>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxMasterDetail } from "devextreme-vue/data-grid";
export default defineComponent({
  props: {
    data: {
      type: Array,
      default: [{
        key1: '12',
        key2: '23',
        key3: '34',
        key4: '45',
        key5: '56',
        key6: '67',
        key7: '78',
      },{
        key1: '89',
        key2: '90',
        key3: '01',
        key4: '12',
        key5: '23',
        key6: '34',
        key7: '45',
      },{
        key1: '56',
        key2: '67',
        key3: '78',
        key4: '89',
        key5: '90',
        key6: '01',
        key7: '12',
      }]
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxMasterDetail
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const labelDivision = [
      '세입(A)',
      '세출(B)',
      '차액(A-B)'
    ]
    return {
      move_column,
      colomn_resize,
      labelDivision
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-detail {
  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
