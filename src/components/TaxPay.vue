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
console.log();

const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
  value: TaxFreePayItem.all()[index].enumKey,
  label: JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.submission ? TaxFreePayItem.all()[index].enumKey +' '+ TaxFreePayItem.all()[index].name + ',  제출O' : TaxFreePayItem.all()[index].enumKey +' '+ TaxFreePayItem.all()[index].name + ',  제출X' ,
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
  
  