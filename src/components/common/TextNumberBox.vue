<template>
  <div>
    <DxTextBox
      :ref="numberTextBox"
      :width="width"
      value-change-event="input"
      :show-clear-button="clearButton"
      :placeholder="placeholder"
      v-model:value="value"
      mode="text"
      :disabled="disabled"
      :readOnly="readOnly"
      :on-input="onInputValue"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messRequired" />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
      default: "Input is required!",
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
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    const numberTextBox = ref();
    const rules = ref({ X: /[0-9]/ });
    const value = ref(props.valueInput);
    const onInputValue = (e: any) => {
      var inputElement = e.event.target;
      inputElement.value = inputElement.value.replaceAll(/\D/g, '');
      emit("update:valueInput", inputElement.value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    return {
      onInputValue,
      numberTextBox,
      value,
      rules,
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