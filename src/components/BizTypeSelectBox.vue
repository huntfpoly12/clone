<template>
  <div>
    <DxSelectBox
    :noDataText="Message.getMessage('COMMON', '901').message"
      :width="width"
      :data-source="bizType"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="label"
      value-expr="value"
      :disabled="disabled"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
      :name="nameInput"
    >
      <DxValidator :name="nameInput">
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch,getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { BizType } from "@bankda/jangbuda-common";
import { Message } from "@/configs/enum"
const bizType = Object.keys(BizType.all()).map((k, index) => {
  let data: any = BizType.all();
  return {
    value: data[index].v,
    label: data[index].name,
  };
});
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
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: Number,
      default: "",
    },
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
    },
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
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
      messageRequired,
      updateValue,
      value,
      bizType,
      BizType,
      Message,
    };
  },
});
</script>
<style scoped></style>
