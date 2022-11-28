<template>
  <a-cascader
    v-model:value="value"
    :options="options"
    placeholder="Please select"
    @change="selectTaxPay"
    :disabled="disabled"
    style="width: 100%"
  />
</template>
  <script lang="ts">
import { defineComponent, ref,watch } from "vue";
import type { CascaderProps } from "ant-design-vue";
import { TaxPayItem, TaxFreePayItem } from "@bankda/jangbuda-common";

const taxPayItem = Object.keys(TaxPayItem.all()).map((k, index) => ({
  value: TaxPayItem.all()[index].enumOrdinal,
  label: TaxPayItem.all()[index].name,
}));
const arrLabel = Array();

TaxFreePayItem.all().forEach((k, index) => {
  let data = TaxFreePayItem.all()[index];
  let parseToStringData = JSON.parse(JSON.stringify(data)).props;
  let submission = parseToStringData.submission ? 'O' : 'X'
  if (parseToStringData.monthlyLimit) {
    arrLabel[index] = data.enumKey +' '+ data.name + ' 월' + parseToStringData.monthlyLimit + ', 제출' + submission
  } else if (parseToStringData.annualLimit) {
    arrLabel[index] = data.enumKey +' '+ data.name + ' 년' + parseToStringData.annualLimit + ', 제출' + submission
  } else {
    arrLabel[index] = data.enumKey +' '+ data.name + ', 제출' + submission
  }
});
const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
  value: TaxFreePayItem.all()[index].enumKey,
  label: arrLabel[index]
}));
const options: CascaderProps["options"] = [
  {
    value: "과세",
    label: "과세",
    children: taxPayItem,
  },
  {
    value: "비과세",
    label: "비과세",
    children: taxFreePayItem,
  },
];
export default defineComponent({
  props: {
    selectedValue:{
        type: Array,
        required: true
    },
    disabled:{
        type: Boolean,
        default: false,
        required: false
    }
  },
  setup(props,{emit}) {
    const value = ref();
    watch(
      () => props.selectedValue,
      (newValue) => {
        value.value = props.selectedValue;
      }
    );
    
    const selectTaxPay = (event: any)=>{
        emit('update:selectedValue', event)
    }
    
    return {
      value,
      options,
      selectTaxPay
    };
  },
});
</script>
  
  