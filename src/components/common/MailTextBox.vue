<template>
  <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" mode="mail"
    :placeholder="placeholder" v-model:value="value" :disabled="disabled" :readOnly="readOnly"
    @input="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput" @focusIn="onFocusIn">
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <DxCustomRule  :validation-callback="ruleCustom" message="이메일 형식이 정확하지 않습니다" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import isEmail from 'validator/lib/isEmail';
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import {
  DxValidator,
  DxRequiredRule,
  DxEmailRule,
  DxCustomRule
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
      default: "",
    },
    width: String,
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "abc@example.com",
    },
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
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
    DxEmailRule,
    DxCustomRule

  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const value = ref(props.valueInput);
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    
    const onFocusIn = (e: any) => {
      if(props.select && !props.readOnly){
          e.event.target.select()
      }
      emit("focusInput", e);
    }
    const ruleCustom = (e: any) => {
      return e.value ? isEmail(e.value) : false;
    }
    return {
      updateValue,
      value,
      messageRequired,
      onFocusIn,
      ruleCustom
    };
  },
});
</script>
