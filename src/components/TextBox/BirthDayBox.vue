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
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
        <DxPatternRule :pattern="pattern" :message="maskMess" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule,
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
    readOnly: Boolean,
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxAsyncRule,
  },
  setup(props, { emit }) {
    const mask = ref("0000-00-00");
    const maskMess = ref("The value must have a correct date format");
    const value = ref(props.valueInput);
    const pattern = ref(/((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/);
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    return {
      updateValue,
      value,
      mask,
      maskMess,
      pattern,
    };
  },
});
</script>
