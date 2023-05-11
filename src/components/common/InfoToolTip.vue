<template>
  <!-- <a-tooltip :placement="placement" :overlayStyle="{'max-width': width}">
    <template #title>
      <slot/>
    </template>
    <div :style="{'cursor': 'pointer','margin-left': '10px'}" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px" />
    </div>
  </a-tooltip> -->
  <Popper :placement="placement">
    <div :style="{ 'cursor': 'pointer', 'margin-left': '10px' }" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px" />
    </div>
  <template #content>
      <slot />
    </template>
  </Popper>
</template>

<script lang="ts">
import Popper from '@/components/Popper.vue'
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
  components: {
    Popper,
  },

};
</script>
<style>
:root {
  --popper-theme-background-color: #121212;
  --popper-theme-background-color-hover: #121212;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 3px;
  --popper-theme-padding: 5px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
