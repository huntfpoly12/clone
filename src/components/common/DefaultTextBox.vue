<template>
  <div>
    <DxTextBox
      :width="width"
      value-change-event="input"
      :show-clear-button="clearButton"
      :placeholder="placeholder"
      v-model="value"
      :disabled="disabled"
      :maxLength="maxCharacter"
      :readOnly="readOnly"
      @input="updateValue(value)"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
        <DxStringLengthRule v-if="minCharacter > 0"
                            :min="minCharacter"
                            :message="messageString"
        />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch , getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule,DxStringLengthRule } from "devextreme-vue/validator";
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
    placeholder: String,
    readOnly: Boolean,
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule
  },
  setup(props, { emit }) {
    const app : any= getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const value = ref(props.valueInput);
    const messageString = ref(messages.getCommonMessage(props.label,'103',props.minCharacter).message);
    const messageRequired = ref(messages.getCommonMessage(props.label,'102').message);
    if(props.messRequired != ""){
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
    return {
      messageString,
      messageRequired,
      updateValue,
      value,
    };
  },
});
</script>