<template>
  <DxSelectBox v-if="isSelect" :noDataText="Message.getMessage('COMMON', '901').message" :width="width" :search-enabled="false"
    :data-source="accountingReportType" placeholder="선택" value-expr="value" display-expr="label" v-model:value="valueBinding"
    :disabled="disabled" :read-only="readOnly"
    :height="$config_styles.HeightInput">
  </DxSelectBox>
  <div v-else class="category-select">
    {{ accountingReportType.find((items: any) => items.value === valueBinding)?.label }}
  </div>
</template>
<script lang="ts">
import { ref, watch, computed } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum"
import {
  AccountingReportType,
  enum2Entries,
} from "@bankda/jangbuda-common";
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    width: String,
    disabled: Boolean,
    valueSelect: {
      type: [Number, String],
      default: null,
    },
    readOnly: Boolean,
    isSelect: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    DxSelectBox,
    DxTextBox,
  },
  setup(props: any, { emit }: any) {
    const accountingReportType: any = computed(() => {
      let bsDeduction: any = enum2Entries(AccountingReportType).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });

    let valueBinding: any = ref(props.valueSelect || null)

    const objectFilter = computed(() => {
      return accountingReportType.find((item: any) => item.id === valueBinding.value)
    })

    watch(() => valueBinding.value, (value) => {
      emit("update:valueSelect", value);
    })

    return {
      valueBinding,
      accountingReportType,
      Message,
      objectFilter
    };
  },
};
</script>
  
<style scoped lang="scss">
</style>
  