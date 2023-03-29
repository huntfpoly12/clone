<template>
  <a-tooltip placement="top">
    <template #title>
      <slot />
    </template>
    <div>
      <img src="@/assets/images/iconInfo.png" style="width: 14px" />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {


    return {}
  }
})
</script>

<style lang="scss">
.ant-tooltip {
  max-width: 300px !important;
}
</style>
