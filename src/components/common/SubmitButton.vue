<template>
  <div>
    <DxButton
      :text="text"
      :width="width"
      :disabled="disabled"
      :use-submit-behavior="true"
      type="default"
      @click="click"
      :height="$config_styles.HeightInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxButton from "devextreme-vue/button";
export default defineComponent({
  props: {
    width: String,
    disabled: Boolean,
    type: String,
    text: {
      type: String,
      default: "Submit",
    },
  },
  components: {
    DxButton,
  },
  setup(props, { emit }) {
    const click = (value: any) => {
      emit("click", value);
    };

    return {
      click,
    };
  },
});
</script>
