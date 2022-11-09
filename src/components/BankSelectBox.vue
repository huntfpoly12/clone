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
      :disabled="disabled"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch ,getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
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
      default: "",
    },
    width: String,
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: [Number, String],
      default: "",
    },
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props: any, { emit }: any) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
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
      messageRequired,
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
