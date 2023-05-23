<template>
  <a-tooltip v-bind="$props">
    <div :style="{ 'cursor': 'pointer', 'margin-left': '10px' }" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px"/>
    </div>
    <template #title>
      <slot/>
    </template>
  </a-tooltip>
</template>

<script lang="ts">

export default {
  props: {
    width: {
      type: String,
      default: "300px",
    }
  },
};
</script>
