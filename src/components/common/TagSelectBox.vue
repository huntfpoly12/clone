<template>
  <div>
    <DxTagBox :items="simpleProducts" :search-enabled="true">
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxTagBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule,
} from "devextreme-vue/validator";
import DxTagBox from "devextreme-vue/tag-box";
export default defineComponent({
  props: {
    dataInit: {},
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    width: String,
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
    readOnly: Boolean,
  },
  components: {
    DxTagBox,
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxAsyncRule,
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(
      messages
        .getCommonMessage("102")
        .message.replaceAll("{object}", props.label)
    );
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput.replaceAll("-", ""));
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };

    const simpleProducts = [
      "HD Video Player",
      "SuperHD Video Player",
      "SuperPlasma 50",
      "SuperLED 50",
      "SuperLED 42",
      "SuperLCD 55",
      "SuperLCD 42",
      "SuperPlasma 65",
      "SuperLCD 70",
      "Projector Plus",
      "Projector PlusHT",
      "ExcelRemote IR",
      "ExcelRemote Bluetooth",
      "ExcelRemote IP",
    ];
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue.replaceAll("-", "");
      }
    );
    return {
      updateValue,
      value,
      messageRequired,
      simpleProducts,
    };
  },
});
</script>
