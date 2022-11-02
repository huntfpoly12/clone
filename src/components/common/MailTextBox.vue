<template>
  <div>
    <DxTextBox
      :width="width"
      value-change-event="keyup"
      :show-clear-button="clearButton"
      mode="mail"
      :placeholder="placeholder"
      v-model:value="value"
      :disabled="disabled"
      :readOnly="readOnly"
      @change="updateValue(value)"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
        <DxEmailRule message="이메일 형식이 정확하지 않습니다" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,watch } from "vue";
import {
  DxValidator,
  DxRequiredRule,
  DxEmailRule,
} from "devextreme-vue/validator";
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
    placeholder: String,
    readOnly: Boolean,
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxEmailRule
  },
  setup(props, { emit }) {
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
    };
  },
});
</script>
