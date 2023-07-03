<template>
  <div>
    <DxSelectBox
      :noDataText="Message.getMessage('COMMON', '901').message"
      :width="width"
      :data-source="basicDeductionData"
      placeholder="선택"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="label"
      value-expr="value"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
      :name="nameInput"
      :disabled="disabled"
    >
      <DxValidator :name="nameInput">
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { Message } from "@/configs/enum";
import DxSelectBox from "devextreme-vue/select-box";
import { BasicDeduction, enum2Entries } from "@bankda/jangbuda-common";

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
      default: 0,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: "",
    },
    ageCount: {
      type: [String, Number],
      default: 0,
    },
    itemSelected: {
      type: Array,
      default: [],
    },
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    var basicDeduction: any = computed(() => {
      let bsDeduction: any = enum2Entries(BasicDeduction).map((item) => {
        let label = item[1] + ". " + item[0];
        return {
          value: item[1],
          label,
        };
      });
      if (props.selectAll) {
        bsDeduction.unshift({ value: null, label: "전체" });
      }
      return bsDeduction;
    });
    let basicDeductionData = ref(basicDeduction.value);
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage("102").message);
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
    watch(
      () => props.ageCount,
      (newVal) => {
        value.value = 0;
        basicDeductionData.value = basicDeductionData.value.map((item: any) => {
          let label = item.label;
          if (
            props.itemSelected.find(
              (item2: any) => item2.value == item.value && item2.value == 2
            )
          ) {
            return { value: item.value, label, disabled: true };
          }
          if (+newVal == 0) {
            // value.value = props.valueInput || 0;
            value.value =  0;
            return item.value == 1
              ? { value: item.value, label, disabled: true }
              : { value: item.value, label };
          }
          if (+newVal <= 20) {
            // value.value = props.valueInput || 3;
            value.value = 3;
            return item.value == 1 || item.value == 4
              ? { value: item.value, label, disabled: true }
              : { value: item.value, label };
          }
          if (+newVal >= 60) {
            // value.value = props.valueInput || 4;
            value.value = 4;
            return item.value == 3 || item.value == 1
              ? { value: item.value, label, disabled: true }
              : { value: item.value, label };
          }
          return item.value == 3 || item.value == 4 || item.value == 1
            ? { value: item.value, label, disabled: true }
            : { value: item.value, label };
        });
      },
      { immediate: true }
    );
    return {
      updateValue,
      basicDeductionData,
      value,
      messageRequired,
      Message,
    };
  },
});
</script>
<style scoped></style>
