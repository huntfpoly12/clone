<template>
  <DxTextBox v-bind="$props" :width="width" value-change-event="input" :show-clear-button="clearButton" :placeholder="placeholder"
    v-model="value" :disabled="disabled" :maxLength="maxCharacter" :readOnly="readOnly" @input="updateValue(value)"
    :height="$config_styles.HeightInput" @value-changed="valueChanged" :name="nameInput" :rtlEnabled="rtlEnabled"  @focusIn="onFocusIn">
    <DxValidator :name="nameInput" :value="textBoxValue" v-bind="$props">
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <DxStringLengthRule v-if="minCharacter > 0" :min="minCharacter" :message="messageString" />
      <DxStringLengthRule v-if="lengthFixed > 0" :min="lengthFixed" :max="lengthFixed" :message="lengthFixMsg" />
      <DxCustomRule :validation-callback="ruleCustom" :message="messageRuleCustom" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxCustomRule } from "devextreme-vue/validator";
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
    width: {
      type: String,
      default: "100%",
    },
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
      type: String,
      default: "",
    },
    placeholder: String,
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
    },
    textBoxValue: String,
    ruleCustom: {
      type: Function,
      default: () => true,
    },
    messageRuleCustom: {
      type: String,
      default: "",
    },
    lengthFixMsg: {
      type: String,
      default: "",
    },
    textUppercase: {
      type: Boolean,
      default: false,
    },
    rtlEnabled: {
      type: Boolean,
      default: false,
    },
    lengthFixed: {
      type: Number,
      default: 0,
    },
    select: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule,
    DxCustomRule
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
    const updateValue = (e: any) => {
      emit("update:valueInput", e);
      emit('onChange', e);
    };

    watch(() => props.valueInput, (newValue) => {
      value.value = props.textUppercase ? newValue?.toUpperCase(): newValue;
    });

    const valueChanged = () => {
      if (props.replaceRegex) {
        setTimeout(() => {
          // value.value = value.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
          value.value = value.value.replace(/[^A-Za-z0-9 ]/g, '')
        }, 100);
      }
    }
    const onFocusIn = (e: any) => {
      if(props.select && !props.readOnly){
          e.event.target.select()
      }
      emit("focusInput", e);
    }
    return {
      valueChanged,
      messageString,
      messageRequired,
      updateValue,
      value,
      onFocusIn
    };
  },
});
</script>
<style>
.dx-placeholder::before {
  padding: 6px 9px 8px;
}
</style>
