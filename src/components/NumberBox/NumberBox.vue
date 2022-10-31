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
    >
    </DxNumberBox>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref,watch } from "vue";
import DxNumberBox from "devextreme-vue/number-box";
export default defineComponent({
  props: {
    width: String,
    clearButton: Boolean,
    spinButtons: Boolean,
    disabled: Boolean,
    valueInput: {
      type: [String,Number],
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
    mode:String
  },
  components: {
    DxNumberBox,
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
  