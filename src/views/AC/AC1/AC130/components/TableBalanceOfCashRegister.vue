<template>
  <p>기간: ${회계연도 시작연월(YYYY-MM)} ~ ${해당연월(YYYY-MM)}</p>
  <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="data"
    :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
    :column-auto-width="true">
    <DxScrolling mode="standard" show-scrollbar="always" />
    <DxColumn caption="총수입(A)" data-field="key1" />
    <DxColumn caption="총지출(B)" data-field="key2" />
    <DxColumn caption="장부잔액(A-B)" data-field="key3" />
    <DxColumn caption="통장잔액(C)" data-field="key4" />
    <DxColumn caption="차액(C-(A-B))" data-field="key5" />
  </DxDataGrid>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { DxItem, DxDataGrid, DxColumn, DxScrolling } from "devextreme-vue/data-grid";
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
      },{
        key1: '56',
        key2: '67',
        key3: '78',
        key4: '89',
        key5: '90',
        key6: '01',
        key7: '12',
      },{
        key1: '56',
        key2: '67',
        key3: '78',
        key4: '89',
        key5: '90',
        key6: '01',
        key7: '12',
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
    DxItem, DxDataGrid, DxColumn, DxScrolling
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    return {
      move_column,
      colomn_resize
    }
  },
})
</script>

<style lang="scss" scoped>
p {
  padding: 10px 10px 0 10px;
}
.ac-110-popup-detail {
  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
