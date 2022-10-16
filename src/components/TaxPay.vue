<template>
  <a-cascader
    v-model:value="value"
    :options="options"
    placeholder="Please select"
    @change="selectTaxPay"
  />
</template>
  <script lang="ts">
import { defineComponent, ref } from "vue";
import type { CascaderProps } from "ant-design-vue";
import { TaxPayItem, TaxFreePayItem } from "@bankda/jangbuda-common";

const taxPayItem = Object.keys(TaxPayItem.all()).map((k, index) => ({
  value: TaxPayItem.all()[index].enumKey,
  label: TaxPayItem.all()[index].name,
}));

const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
  value: TaxFreePayItem.all()[index].enumKey,
  label: TaxFreePayItem.all()[index].name,
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
        type: String,
        default: null,
        required: true
    },
  },
  setup(props,{emit}) {
    
    let parentValue = '';
    let childValue = ''; 
    let taxValue =  taxPayItem.find(ob => ob.value === props.selectedValue);
    let taxFreeValue =  taxFreePayItem.find(ob => ob.value === props.selectedValue);
    console.log(taxFreePayItem);
    if(taxValue != undefined){
        parentValue = "과세";
        childValue = props.selectedValue;
    }

    if(taxFreeValue != undefined){
        parentValue = "비과세";
        childValue = props.selectedValue;
    }
   
    let value = ref<string[]>([parentValue,childValue]);
    const selectTaxPay = (event: any)=>{
        emit('update:selectedValue', event[1])
    }
    return {
      value,
      options,
      selectTaxPay
    };
  },
});
</script>
  
  