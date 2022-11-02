<template>
    <div>
      <DxTextArea
        :height="height"
        :width="width"
        value-change-event="keyup"
        :max-length="maxCharacter"
        :placeholder="placeholder"
        v-model:value="value"
        :disabled="disabled"
        :readOnly="readOnly"
        @change="updateValue(value)"
      >
        <DxValidator>
          <DxRequiredRule v-if="required" :message="messRequired" />
        </DxValidator>
      </DxTextArea>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from "vue";
  import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
  import DxTextArea from 'devextreme-vue/text-area';
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
      height: String,
      clearButton: Boolean,
      disabled: Boolean,
      valueInput: {
        type: String,
        default: "",
      },
      maxCharacter: Number,
      placeholder: String,
      readOnly: Boolean,
    },
    components: {
      DxTextArea,
      DxValidator,
      DxRequiredRule,
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
  