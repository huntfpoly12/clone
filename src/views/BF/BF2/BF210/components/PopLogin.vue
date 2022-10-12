<template>
  <div id="components-modal-demo-position">
    <a-modal :visible="modalStatus" :title="title" centered @cancel="setModalVisible()" width="50%"
      :mask-closable="false">
      <DxDataGrid :data-source="arrayLog" :show-borders="true">
        <DxColumn data-field="createdAt" caption="기록일시" :width="150" />
        <DxColumn data-field="success" caption="성공여부" :width="80" cell-template="modal-table" />
        <template #modal-table="{ data }">
          <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="status" caption="응답상태" :width="80" />
        <DxColumn data-field="message" caption="오류메세지" />
        <DxColumn data-field="cause" caption="오류시스템메세지" />
        <DxColumn data-field="ip" caption="IP주소" :width="100" />
      </DxDataGrid>
      <template #footer> </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { DxDataGrid, DxColumn, DxPaging } from "devextreme-vue/data-grid";
import { ZoomInOutlined } from "@ant-design/icons-vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/BF/BF2/BF210/index";
export default defineComponent({
  props: {
    modalStatus: Boolean,
    data: Array,
    title: String,
    idRow: Number
  }
  ,
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    ZoomInOutlined,
  },

  watch: {
    idRow(newVal) {
      this.trigger = true
      console.log(newVal);
      setTimeout(() => {
        let dataCall = {
          userId: newVal,
          page: 1,
          rows: 100
        }
        this.refetchData(dataCall)
      }, 500);
    }
  },

  setup(props) {
    let trigger = ref<boolean>(false);
    const dataTableShow = ref({
      status: 1,
      message: "",
      cause: "",
      createdAt: "",
      ip: "",
      success: "",
    });
    const originData = ref({
      userId: 1,
      rows: 1,
      page: 1,
    })

    let arrayLog = ref([])

    //CHỉ viết trong setup
    const { result, refetch: refetchData, loading, error, onResult } = useQuery(queries.getAuthentications, {}, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));
    onResult((res) => {
<<<<<<< HEAD
      arrayLog.value = res.data.getAuthentications.datas
=======
      let data = res.data.getAuthentications.datas 
      arrayLog.value = data
>>>>>>> develop
    })

    return {
      dataTableShow,
      refetchData,
      result,
      arrayLog,
      trigger
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
<style>

</style>
