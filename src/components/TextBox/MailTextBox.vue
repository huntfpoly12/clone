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
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
        <DxEmailRule message="Email is invalid @..@ " />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
  DxEmailRule,
} from "devextreme-vue/validator";
import { defineComponent, ref } from "vue";
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
  },
  setup(props, { emit }) {
    const value = ref(props.valueInput);
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    return {
      updateValue,
      value,
    };
  },
});
</script>
