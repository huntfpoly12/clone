<template>
  <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" mode="text"
    :placeholder="placeholder" v-model:value="value" :disabled="disabled" :readOnly="readOnly" :on-input="onInputValue"
    :height="$config_styles.HeightInput" :name="nameInput" @focusIn="onFocusIn">
    <DxValidator  :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
    </DxValidator>
  </DxTextBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
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
    placeholder: String,
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
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);
    const onInputValue = (e: any) => {
      var inputElement = e.event.target;
      inputElement.value = inputElement.value.replace(/\D/g, '');
      if (inputElement.value.length > 11) {
        inputElement.value = inputElement.value.slice(0, 11);
      }
      emit("update:valueInput", inputElement.value);
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
    return {
      onInputValue,
      value,
      messageRequired,
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
