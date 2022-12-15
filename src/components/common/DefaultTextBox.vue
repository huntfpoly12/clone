<template>
  <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" :placeholder="placeholder"
    v-model="value" :disabled="disabled" :maxLength="maxCharacter" :readOnly="readOnly" @input="updateValue(value)"
    :height="$config_styles.HeightInput" @value-changed="valueChanged" :name="nameInput">
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <DxStringLengthRule v-if="minCharacter > 0" :min="minCharacter" :message="messageString" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule } from "devextreme-vue/validator";
import DxTextBox from "devextreme-vue/text-box";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    width: String,
    maxCharacter: Number,
    minCharacter: {
      type: Number,
      default: 0,
    },
    replaceRegex: {
      type: Boolean,
      default: false,
    },
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String || Number,
      default: "",
    },
    placeholder: String,
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
    },
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const value = ref(props.valueInput);
    const messageString = ref(messages.getCommonMessage('103').message);
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    watch(() => props.valueInput, (newValue) => {
      value.value = newValue;
    }
    );

    const valueChanged = () => {
      if (props.replaceRegex) {
        setTimeout(() => {
          value.value = value.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
        }, 100);
      }
    }
    return {
      valueChanged,
      messageString,
      messageRequired,
      updateValue,
      value,
    };
  },
});
</script>
<style>
.dx-placeholder::before {
  padding: 6px 9px 8px;
}
</style>