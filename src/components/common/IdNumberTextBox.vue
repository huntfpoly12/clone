<template>
  <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" v-model:value="value"
    :disabled="disabled" :readOnly="readOnly" @input="updateValue(value)" :mask="mask" :mask-invalid-message="maskMess"
    :height="$config_styles.HeightInput" :name="nameInput">
    <DxValidator>
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <!-- <DxCustomRule :validation-callback="checkID" :message="msgError" /> -->
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
  DxCustomRule,
} from "devextreme-vue/validator";
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import { validResidentId } from "@bankda/jangbuda-common";
import { Message } from '@/configs/enum';
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
      type: String,
      default: "",
    },
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
    DxCustomRule
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const mask = ref("000000-0000000");
    const maskMess = ref(messages.getCommonMessage('105').message);
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const msgError = Message.getMessage('COMMON', '701').message;
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
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
    const checkID = (e: any) => {
      return validResidentId(value.value);
    }
    return {
      updateValue,
      value,
      mask,
      maskMess,
      messageRequired,
      msgError,
      validResidentId,
      checkID
    };
  },
});
</script>
