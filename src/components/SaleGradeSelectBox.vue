<template>
  <div>
    <DxSelectBox
      :width="width"
      :data-source="saleGrade"
      :placeholder="placeholder"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="label"
      value-expr="value"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { SalesRepresentativeGrade,getEnumKey,enum2Array ,enum2KeysByValueMap,enum2Entries} from "@bankda/jangbuda-common";

const saleGrade = enum2Entries(SalesRepresentativeGrade).map(value => ({ value:value[1],label: value[0]}));

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
      type: Number,
      default: 0,
    },
    placeholder: String,
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
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
      saleGrade,
      value,
    };
  },
});
</script>
  <style scoped></style>
  