<template>
  <div style="margin-left: 5px">
    <DxButton
      :width="128"
      text="우편번호 검색"
      type="default"
      styling-mode="outlined"
      @click="isOpen = true"
      :height="$config_styles.HeightInput"
    />

    <a-modal v-model:visible="isOpen" footer="" :mask-closable="false">
      <div>
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
