<template>
  <div>
    <DxSelectBox
    :noDataText="Message.getMessage('COMMON', '901').message"
      :width="width"
      :data-source="bankTypeSelect"
      placeholder="은행 선택"
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
import { ref, onMounted, watch ,getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { FinancialCompany, enum2Entries } from "@bankda/jangbuda-common";
import type { SelectProps } from "ant-design-vue";
import { Message } from "@/configs/enum"
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
  setup(props: any, { emit }: any) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);
    const bankTypeSelect = ref();
    onMounted(() => {
      bankTypeSelect.value = enum2Entries(FinancialCompany).map((item: any) => {
        return {
          label: item[0], value: item[1]
        }
      });
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
      Message
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 30px;
}
</style>
