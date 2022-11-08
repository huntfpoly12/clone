<template>
  <div>
    <DxTextArea
      :height="height"
      :width="width"
      value-change-event="input"
      :max-length="maxCharacter"
      :placeholder="placeholder"
      v-model:value="value"
      :disabled="disabled"
      :readOnly="readOnly"
      @input="updateValue(value)"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxTextArea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
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
    height: String,
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
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
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(
      messages.getCommonMessage(props.label, "102").message
    );
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
      messageRequired,
      value,
    };
  },
});
</script>
