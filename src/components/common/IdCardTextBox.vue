<template>
  <div>
    <DxTextBox
      :width="width"
      value-change-event="keyup"
      :show-clear-button="clearButton"
      v-model:value="value"
      :disabled="disabled"
      :readOnly="readOnly"
      @change="updateValue(value)"
      :mask="mask"
      :mask-invalid-message="maskMess"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
} from "devextreme-vue/validator";
import { defineComponent, ref,watch } from "vue";
import DxTextBox from "devextreme-vue/text-box";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "Input is required :) !!!!",
    },
    width: String,
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String,
      default: "",
    },
    readOnly: Boolean,
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    const mask = ref("000000-0000000");
    const maskMess = ref("입력한 정보가 충분하지 않습니다!");
    const value = ref(props.valueInput);
  
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    return {
      updateValue,
      value,
      mask,
      maskMess,
    };
  },
});
</script>
