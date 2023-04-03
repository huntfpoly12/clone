<template>
  <pre style="height: 700px;">
    {{ jwtObject }}
  </pre>
</template>

<script lang="ts">
import { getJwtObject } from "@bankda/jangbuda-common";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const token  = sessionStorage.getItem("token")
    const jwtObject = getJwtObject(token!);
    return {
      jwtObject
    }
   }
});
</script> 
<style lang="scss" scoped>

</style>
