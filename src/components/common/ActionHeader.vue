<template>
  <div class="top-content">
    <a-typography-title :level="3" style="margin-bottom: 0">
      {{tabTitle.name}} [{{tabTitle.id}}]
    </a-typography-title>
    <div class="list-action">
        <DxButton @click="actionHeader($event, 'Search')"  :disabled="!buttonSearch">
          <SearchOutlined :style="{fontSize: '17px', color: 'black'}"/> 조회
        </DxButton>
        <DxButton @click="actionHeader($event, 'Save')" size="large" :disabled="!buttonSave">
          <SaveOutlined :style="{fontSize: '17px', color: 'black'}"/> 저장
        </DxButton>
        <DxButton @click="actionHeader($event, 'Delete')" size="large"  :disabled="!buttonDelete">
          <DeleteOutlined :style="{fontSize: '17px', color: 'black'}"/> 삭제
        </DxButton>
        <DxButton @click="actionHeader($event, 'Print')" size="large" :disabled="!buttonPrint">
          <PrinterOutlined :style="{fontSize: '17px', color: 'black'}"/> 인쇄
        </DxButton>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  SearchOutlined,
  SaveOutlined,
  DeleteOutlined,
  PrinterOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    title: {
      type: String,
    },
    buttonDelete: {
      type: Boolean,
      default: true,
    },
    buttonSearch: {
      type: Boolean,
      default: true,
    },
    buttonSave: {
      type: Boolean,
      default: true,
    },
    buttonPrint: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SearchOutlined,
    SaveOutlined,
    DeleteOutlined,
    PrinterOutlined,
    DxButton,
  },

  setup(props, { emit }) {
    const store = useStore();
    const tabTitle = computed(()=>store.state.common.activeTab)
    const actionHeader = (event: any, method: any) => {
      emit("action" + method, event);
    };
    return {
      actionHeader,
      tabTitle
    };
  },
});
</script>
<style lang="scss" scoped>
.dx-button-mode-contained {
  font-size: 19px;
  margin-left: 3px;
}

.top-content {
  padding: 2px 10px;
}
</style>
