<template>
  <DxNumberBox @valueChanged="updateValue(value)" :width="width" value-change-event="input"
    :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :placeholder="placeholder"
    :show-spin-buttons="spinButtons" @input="onChange" :rtlEnabled="rtlEnabled" :max="max" :min="min" :format="isFormat && formatNumber"
    :mode="mode" :style="{ height: $config_styles.HeightInput }" :name="nameInput" :readOnly="readOnly">
    <DxValidator v-if="required" :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
    </DxValidator>
  </DxNumberBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default defineComponent({
  props: {
    width: String,
    clearButton: Boolean,
    spinButtons: Boolean,
    disabled: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    valueInput: {
      type: [String, Number],
      default: 0,
    },
    min: Number,
    max: Number,
    readOnly: Boolean,
    rtlEnabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    mode: {
      type: String,
      default: "number",
    },
    nameInput: {
      type: String,
      default: '',
    },
    isFormat:{
      type: Boolean,
      default: false,
    }
  },
  components: {
    DxNumberBox,
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
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    const onChange = (e: any) => {
            emit("changeInput",e);
    }
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    const formatNumber = (value: any) => {
      if(value == 0) {
        return '';
      }
      if (value !== null && value !== undefined) {
        return value.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
      }
      return value;
    }

    return {
      updateValue,onChange,
      value,
      messageRequired,
      formatValue:(value:any)=> {
        return value < 10 ? `0${value}` : value;
      },
      formatNumber
    };
  },
});
</script>
