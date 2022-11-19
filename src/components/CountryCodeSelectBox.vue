<template> 
     <DxSelectBox  :data-source="countryCodes"  field-template="field"  item-template="item">
     
     </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { CountryCode , enum2KeysByValueMap} from "@trandung1291/common-tsv";
const countryCodes = enum2KeysByValueMap(CountryCode).forEach((codeCountry,nameCountry)=>{
    return { key :codeCountry, value: nameCountry };
});
export default defineComponent({
  components: {
    DxSelectBox,
  },
  setup() {

    return {countryCodes};
  },
});
</script>
