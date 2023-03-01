<template>
  <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" v-model:value="value"
    :disabled="disabled" :readOnly="readOnly" @input="updateValue(value)" :mask="mask" :mask-invalid-message="maskMess"
    :height="$config_styles.HeightInput" :name="nameInput">
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
} from "devextreme-vue/validator";
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
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
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const mask = ref("000000-0000000");
    const maskMess = ref(messages.getCommonMessage('105').message);
    const messageRequired = ref(messages.getCommonMessage('102').message);
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
    return {
      updateValue,
      value,
      mask,
      maskMess,
      messageRequired
    };
  },
});
</script>
