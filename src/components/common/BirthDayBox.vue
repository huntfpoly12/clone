<template>
  <div>
    <DxTextBox
      :width="width"
      value-change-event="input"
      :show-clear-button="clearButton"
      v-model:value="value"
      :disabled="disabled"
      :readOnly="readOnly"
      @input="updateValue(value)"
      :mask="mask"
      :mask-invalid-message="maskMess"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
        <DxPatternRule :pattern="pattern" :message="maskMess" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,watch , getCurrentInstance } from "vue";
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
    label: {
      type: String,
      required: true
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
    const app : any= getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const mask = ref("0000-00-00");
    const maskMess = ref(messages.getCommonMessage('105').message.replaceAll('{object}', props.label));
    const messageRequired = ref(messages.getCommonMessage('102').message.replaceAll('{object}', props.label));
    if(props.messRequired != ""){
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput.replaceAll('-', ''));
    const pattern = ref(/((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/);
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue.replaceAll('-', '');
      }
    );
    return {
      updateValue,
      value,
      mask,
      maskMess,
      messageRequired,
      pattern,
    };
  },
});
</script>
