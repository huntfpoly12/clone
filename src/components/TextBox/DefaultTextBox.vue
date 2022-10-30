<template>
  <div>
    <DxTextBox
      :width="width"
      :show-clear-button="clearButton"
      :placeholder="placeholder"
      v-model:value="value"
      :disabled="disabled"
      :maxLength="maxCharacter"
      :readOnly="readOnly"
      @change="updateValue(value)"
    >
    </DxTextBox>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
  },
  setup(props, { emit }) {
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
    };
  },
});
</script>
  