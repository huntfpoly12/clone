<template>
  <a-tooltip :placement="placement" :overlayStyle="{'max-width': width}">
    <template #title>
      <slot/>
    </template>
    <div :style="{'cursor': 'pointer','margin-left': '10px'}" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px" />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
export default {
    props: {
      placement: {
        type: String,
        default: "top",
      },
      width: {
        type: String,
        default: "300px",
      }
    },

};
</script>
