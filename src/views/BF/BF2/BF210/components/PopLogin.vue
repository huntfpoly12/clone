<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      :title="title"
      centered
      @cancel="setModalVisible()"
      width="50%"
      :mask-closable="false"
    >
      <DxDataGrid
        :data-source="dataTableShow"
        :show-borders="true"
        key-expr="key"
      >
        <DxColumn data-field="기록일시" :width="150" />
        <DxColumn
          data-field="성공여부"
          :width="80"
          cell-template="modal-table"
        />
        <template #modal-table="{ data }">
          <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="응답상태" :width="80" />
        <DxColumn data-field="오류메세지" />
        <DxColumn data-field="오류시스템메세지" />
        <DxColumn data-field="IP주소" :width="100" />
      </DxDataGrid>
      <template #footer> </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { DxDataGrid, DxColumn, DxPaging } from "devextreme-vue/data-grid";
import { ZoomInOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  props: ["modalStatus", "data", "title"],
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    ZoomInOutlined,
  },

  setup(props) {
    const dataTableShow = ref([
      {
        key: 0,
        기록일시: "2022-09-05 13:52:09",
        성공여부: "성공",
        응답상태: "200",
        오류메세지: "",
        오류시스템메세지: "",
        IP주소: "123.451.342.1",
      },
      {
        key: 1,
        기록일시: "2022-09-05 13:52:09",
        성공여부: "실패",
        응답상태: "401",
        오류메세지: "아이디 또는 비밀번호가 일치하지 않습 ",
        오류시스템메세지: "비밀번호 불일치",
        IP주소: "123.451.342.1",
      },
    ]);

    return {
      dataTableShow,
    };
  },
  methods: {
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    getColorTag(data: any) {
      if (data === "성공") {
        return "blue";
      } else if (data === "실패") {
        return "#d5a7a7";
      }
    },
  },
});
</script>
<style></style>
