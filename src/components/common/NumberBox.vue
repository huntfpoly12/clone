<template>
  <div>
    <DxNumberBox
      :width="width"
      value-change-event="keyup"
      :show-clear-button="clearButton"
      v-model:value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :show-spin-buttons="spinButtons"
      @change="updateValue(value)"
      :rtlEnabled="rtlEnabled"
      :max="max"
      :min="min"
      :mode="mode"
      format="0"
      :style="{ height: $config_styles.HeightInput }"
    >
    <DxValidator v-if="required">
      <DxRequiredRule v-if="required" :message="messRequired" />
    </DxValidator>
    </DxNumberBox>
 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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
      default: "Input is required :) !!!!",
    },
    valueInput: {
      type: [String, Number],
      default: "",
    },
    min: Number,
    max: Number,
    readOnly: Boolean,
    rtlEnabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    mode: String,
  },
  components: {
    DxNumberBox,
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
