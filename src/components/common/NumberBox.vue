<template>
  <DxNumberBox @valueChanged="updateValue" :width="width" value-change-event="input"
    :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :placeholder="placeholder"
    :show-spin-buttons="spinButtons" @input="onChange" @keyDown="onChange" :rtlEnabled="rtlEnabled" :min="min" :format="isFormat && formatNumber"
    :mode="mode" :style="{ height: $config_styles.HeightInput }" :name="nameInput" :readOnly="readOnly" @focusIn="onFocusIn">
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
      <DxRangeRule v-if="required && min" :min="min" :message="messageMin"/>
    </DxValidator>
  </DxNumberBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxValidator, DxRequiredRule,DxRangeRule } from "devextreme-vue/validator";
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
    min: {
      type: Number,
      default: null,
    },
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
    },
    select: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    DxNumberBox,
    DxValidator,
    DxRequiredRule,
    DxRangeRule
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const messageMin = ref(messages.getCommonMessage('103').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);
    const maxNum = ref(props.max??0);
    const updateValue = (e: any) => {
      if (props.max && e.value >= props.max) {
        e.component.option('value', +props.max);
        emit("update:valueInput", +props.max);
        return;
      }
      emit("update:valueInput", e.value);
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
    const onFocusIn = (e: any) => {
      if(props.select && !props.readOnly){
          e.event.target.select()
      }
      emit("focusInput", e);
    }
    return {
      updateValue,onChange,
      value,
      messageRequired,messageMin,
      formatValue:(value:any)=> {
        return value < 10 ? `0${value}` : value;
      },
      formatNumber,
      onFocusIn
    };
  },
});
</script>
