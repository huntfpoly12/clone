<template>
  <div style="margin-left: 5px">
    <DxButton icon="search" :width="width" :text="text" type="default" styling-mode="outlined" @click="isOpen = true"
      :height="$config_styles.HeightInput" class="post-code" :disabled="disabled"/>
    <a-modal v-model:visible="isOpen" footer="" :mask-closable="false">
      <div v-if="isOpen">
        <VueDaumPostcode @complete="onComplete" />
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DxButton from "devextreme-vue/button";
import {
  VueDaumPostcodeCompleteResult,
  VueDaumPostcode,
} from "vue-daum-postcode";

export default defineComponent({
  components: {
    VueDaumPostcode,
    DxButton,
  },
  props:{
    text: {
        type: String,
        default: "우편번호 검색",
    },
    width: {
        type: String,
        default: "145",
    },
    disabled: {
        type: Boolean,
        default: false,
    }
  },
  data() {
    return {
      isOpen: false,
      result: null as VueDaumPostcodeCompleteResult | null,
    };
  },
  methods: {
    onComplete(result: VueDaumPostcodeCompleteResult) {
      this.$emit("dataAddress", result);
      this.isOpen = false;
    },
  },
});
</script>
<style scoped>
.post-code :deep(.dx-button-content) {
    padding: 0px;
}
</style>
