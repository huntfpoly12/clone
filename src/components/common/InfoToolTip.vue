<template>
  <Popper :placement="placement">
    <div :style="{ 'cursor': 'pointer', 'margin-left': '10px' }" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px"/>
    </div>
    <template #content>
      <slot/>
    </template>
  </Popper>
</template>

<script lang="ts">
import Popper from '@/components/Tooltip.vue'

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
