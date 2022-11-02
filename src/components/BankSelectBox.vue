<template>
  <div>
    <DxSelectBox
      :width="width"
      :data-source="bankTypeSelect"
      placeholder="은행 선택"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="n"
      value-expr="c"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
    />
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { BankType } from "@bankda/jangbuda-common";
import type { SelectProps } from "ant-design-vue";
export default {
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
      type: [Number, String],
      default: 0,
    },
    placeholder: String,
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
  },
  setup(props:any, { emit }:any) {
    const value = ref(props.valueInput);
    const bankTypeSelect = ref<SelectProps["options"]>([]);
    onMounted(() => {
      bankTypeSelect.value = BankType.all();
    });
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
      bankTypeSelect,
      updateValue,
      value,
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 30px;
}
</style>
