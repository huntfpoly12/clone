<template>
  <div>
    <DxTextBox
      :width="width"
      :show-clear-button="clearButton"
      :mode="modeInput"
      :placeholder="placeholder"
      v-model:value="value"
      :disabled="disabled"
      :maxLength="maxCharacter"
      :readOnly="readOnly"
      @input="updateValue(value)"
      :mask-rules="rules"
      :mask="mask"
      :mask-invalid-message="maskMess"
    >
    
      <DxValidator v-if="validator">
        <DxRequiredRule v-if="required" :message="messRequired" />
        <DxEmailRule v-if="modeInput === 'email'" message="Email is invalid @..@ "/>
        <DxPatternRule
          v-if="usePattern"
          :pattern="pattern"
          :message="maskMess"
        />
        <DxStringLengthRule
          :min="minCharacter"
          :message="'Input must have at least ' +minCharacter+ ' symbols'"
        />
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
    validator: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: 'Input is required :) !!!!',
    },
    width: String,
    format: String,
    nameService: String,
    maxCharacter: Number,
    minCharacter: {
      type: Number,
      default: 0,
    },
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String,
      default: "",
    },
    placeholder: String,
    readOnly: Boolean,
    modeInput: {
      validator(value: string) {
        return ["email", "password", "search", "text", "url"].includes(
          value
        );
      },
      default: "text",
    },
    validateType: {
      validator(value: string) {
        return [
          "bisinessId",
          "corperateId",
          "personalId",
          "email",
          "telNo",
          "birthDay",
        ].includes(value);
      },
      default: "",
    },
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
    DxAsyncRule
  },
  mounted() {
    switch (this.validateType) {
      case "bisinessId":
        this.rules = { X: /[02-9]/ };
        this.mask = "";
        break;
      case "corperateId":
        this.rules = "";
        this.mask = "";
        break;
      case "personalId":
        this.rules = "";
        this.mask = "";
        break;
      case "telNo":
        this.rules = "";
        this.mask = "0000-000000000";
        break;
      case "birthDay":
        this.usePattern = true;
        this.pattern = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
        this.mask = "0000-00-00";
        this.maskMess = "The birthDay must have a correct birthDay format";
        break;
      default:
        break;
    }
  },
  setup(props, { emit }) {
    const rules = ref({});
    const mask = ref("");
    const maskMess = ref("");
    const value = ref(props.valueInput);
    const usePattern = ref(false);
    const pattern = ref<RegExp>();
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    return {
      updateValue,
      value,
      rules,
      mask,
      maskMess,
      pattern,
      usePattern
    };
  },
});
</script>
