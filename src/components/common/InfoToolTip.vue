<template>
  <a-tooltip placement="top">
    <template #title>
      <slot />
    </template>
    <div style="cursor: pointer" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px" />
    </div>
  </a-tooltip>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.ant-tooltip {
  max-width: 300px !important;
}
</style>
