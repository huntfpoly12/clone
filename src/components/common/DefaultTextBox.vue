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
      @value-changed="valueChanged"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
        <DxStringLengthRule v-if="minCharacter > 0"
                            :min="minCharacter"
                            :message="messageString"
        />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
      default: "Input is required!",
    },
    width: String,
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
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule
  },
  setup(props, { emit }) {
    const value = ref(props.valueInput);
    const messageString = ref('이 덱스트를 ' +props.minCharacter+ '자 이상으로 늘리세요!');

    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    watch(() => props.valueInput, (newValue) => {
            value.value = newValue;
        }
    );

    const valueChanged = () => {
      if (props.replaceRegex) {
        setTimeout(() => {
          value.value= value.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
        }, 100);
      }
    }
    return {
      valueChanged,
      messageString,
      updateValue,
      value,
    };
  },
});
</script>