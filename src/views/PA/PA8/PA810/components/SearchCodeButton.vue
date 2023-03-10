<template>
  <div style="margin-left: 5px">
    <a-tooltip :title="textTooltip" placement="top" color="gray">
      <div>
        <DxButton
          icon="search"
          :width="width"
          :text="textBtn"
          type="ghost"
          styling-mode="outlined"
          @click="isOpen = true"
          :height="$config_styles.HeightInput"
          class="post-code"
        />
      </div>
      
    </a-tooltip>

    <a-modal v-model:visible="isOpen" footer="" :mask-closable="false" :width="widthModal" :bodyStyle="{padding: '50px 24px'}">
      <iframe
        :src="src"
        type="application/pdf"
        width="100%"
        :height="iframe.height"
        frameborder="0"
        style="position:relative;z index:999"
        ref="frame"
        v-show="iframe.loaded"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DxButton from "devextreme-vue/button";
import { Tooltip } from "ant-design-vue";

export default defineComponent({
  components: {
    DxButton,
    Tooltip
  },
  props: {
    textBtn: {
      type: String,
      default: "",
    },
    textTooltip: {
      type: String,
      default: "취득부호조회",
    },
    width: {
      type: String,
      default: "28",
    },
    widthModal: {
      type: Number,
      default: 610,
    },
    src: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      iframe: {
        loaded: true,
        height: "650px",
      },
    };
  },
});
</script>

<style scoped>
.post-code :deep(.dx-button-content) {
  padding: 0px;
}
</style>
