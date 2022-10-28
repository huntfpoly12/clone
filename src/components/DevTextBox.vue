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
    />
  </div>
</template>
ClearButton, Placeholder, disabled, readOnly, MaxCha
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import { switchCase } from "@babel/types";
export default defineComponent({
  props: {
    width: String,
    format: String,
    nameService: String,
    maxCharacter: Number,
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
        // The value must match one of these strings
        return ["email", "password", "search", "tel", "text", "url"].includes(
          value
        );
      },
      default: "text",
    },
    validateType: {
      validator(value: string) {
        // The value must match one of these strings
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
  },
  mounted() {
    switch (this.validateType) {
      case "bisinessId":
        this.rules =  { X: /[02-9]/ };
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
        this.mask = "";
        break;
      case "birthDay":
        this.rules =  { X: /[02-9]/ };
        this.mask = "00-00-0000";
        this.maskMess = "sai định dạng"
        break;
      default:
        break;
    }
    console.log(this.validateType, "tu mounted"); // 0
  },
  setup(props, { emit }) {
    const rules = ref({});
    const mask = ref("");
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
      maskMess
    };
  },
});
</script>
