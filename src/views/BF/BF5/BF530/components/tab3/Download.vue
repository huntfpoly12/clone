<template>
  <a-modal
    title=""
    :visible="true"
    @cancel="setModalStatus"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="700"
  >
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="typeId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn
            caption="신고종류"
            data-field="typeName"
            :allowEditing="false"
            alignment="center"
          />
          <DxColumn
            caption="신고대상"
            data-field="subject"
            alignment="center"
          />
          <DxColumn
            caption="사무위탁"
            data-field="consignment"
            alignment="center"
          />
          <DxColumn
            caption="다운로드"
            cell-template="name1"
            alignment="center"
          />
          <template #name1="{ data }">
            <div v-if="!data.data.url" style="padding: 5px">{{data.data.nameBtn}}</div>
            <button-basic
              v-else
              text="받기"
              type="default"
              mode신고대상="contained"
              :width="90"
              @onClick="() => onDownLoad(data.data.url)"
            />
          </template>
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxScrolling,
  DxSummary,
} from "devextreme-vue/data-grid";
import { watch } from "vue";

export default defineComponent({
  props: {
    payload: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;

    // --------------------------GET DATASOURCE --------------------------

    const dataSource = ref([
      {
        typeId: 1,
        typeName: "취득",
        subject: "",
        consignment: "",
        url: "",
        nameBtn: "취득신고",
      },
      {
        typeId: 4,
        typeName: "휴직",
        subject: "",
        consignment: "",
        url: "",
        nameBtn: "휴직신고",
      },
      {
        typeId: 2,
        typeName: "상실",
        subject: "",
        consignment: "",
        url: "",
        nameBtn: "상실신고",
      },
      {
        typeId: 3,
        typeName: "급여변경",
        subject: "",
        consignment: "",
        url: "",
        nameBtn: "급여변경 신고",
      },
    ]);
    watch(
      () => props.payload,
      (newVal: any) => {
        if (newVal) {
          dataSource.value.forEach((item: any) => {
            if (item.typeId == props.payload.type) {
              item.subject =
                props.payload.companyName + "/" + props.payload.name;
              item.url = props.payload.url;
              return;
            }
          });
        }
      },
      { immediate: true }
    );
    const setModalStatus = () => {
      emit("closeModal", false);
    };
    const onDownLoad = (e: any) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = e;
      downloadLink.download = "filename.ext";
      downloadLink.target = "_blank";
      downloadLink.click();
    };
    return {
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      onDownLoad,
    };
  },
  components: { DxDataGrid, DxScrolling, DxColumn, DxSummary, DxEditing },
});
</script>
<style lang="scss" scoped>
:deep .dx-datagrid-content .dx-datagrid-table .dx-row > td {
  height: 20px;
}
</style>
