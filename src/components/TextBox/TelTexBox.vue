<template>
  <div>
    <DxTextBox
      :width="width"
      value-change-event="keyup"
      :show-clear-button="clearButton"
      mode="tel"
      :placeholder="placeholder"
      v-model:value="value"
      :disabled="disabled"
      :readOnly="readOnly"
      @change="updateValue(value)"
      :mask-rules="rules"
      :mask="mask"
      :mask-invalid-message="maskMess"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
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
    const rules = ref({ X: /[02-9]/ });
    const mask = ref("0000-000000000");
    const maskMess = ref("");
    const value = ref(props.valueInput);
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    return {
      updateValue,
      value,
      rules,
      mask,
      maskMess,
    };
  },
});
</script>
