<template>
  <DxTextBox :ref="numberTextBox" :width="width" value-change-event="input" :show-clear-button="clearButton"
    :placeholder="placeholder" v-model:value="value" mode="text" :disabled="disabled" :readOnly="readOnly"
    :on-input="onInputValue" :height="$config_styles.HeightInput" :name="nameInput" :maxLength="maxLength" :rtlEnabled="rtlEnabled" @focusIn="onFocusIn">
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <DxCustomRule :validation-callback="ruleCustom" :message="messageRuleCustom" />
      <DxStringLengthRule v-if="lengthFixed > 0" :min="lengthFixed" :max="lengthFixed" :message="lengthFixMsg" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule, DxCustomRule, DxStringLengthRule } from "devextreme-vue/validator";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum";
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
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: [Number, String]
    },
    placeholder: String,
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: null,
    },
    ruleCustom: {
      type: Function,
      default: () => true,
    },
    messageRuleCustom: {
      type: String,
      default: Message.getCommonMessage('105').message,
    },
    rtlEnabled: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: true,
    },
    lengthFixed: {
      type: Number,
      default: 0,
    },
    lengthFixMsg: {
      type: String,
      default: "",
    },
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxCustomRule,
    DxStringLengthRule
},
  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const numberTextBox = ref();
    const rules = ref({ X: /[0-9]/ });
    const value = ref(props.valueInput);
    const onInputValue = (e: any) => {
      var inputElement = e.event.target;
      inputElement.value = inputElement.value.replaceAll(/\D/g, '');
      // if (inputElement.value)
        emit("update:valueInput", inputElement.value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue?.toString();
      }
    );
    const onFocusIn = (e: any) => {
      if(props.select && !props.readOnly){
          e.event.target.select()
      }
      emit("focusInput", e);
    }
    return {
      onInputValue,
      numberTextBox,
      messageRequired,
      value,
      rules,
      onFocusIn
    };
  },
});
</script>
<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
::v-deep input[type=number] {
  -moz-appearance: textfield;
}
</style>
