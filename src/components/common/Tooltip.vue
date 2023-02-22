<template>
  <dx-tooltip :target="target" :showEvent="showEvent" :hideEvent="hideEvent" :position="{at: 'top', my: 'bottom'}">
    {{ content }}
  </dx-tooltip>
</template>

<script>
import { DxTooltip } from 'devextreme-vue/tooltip';

export default {
  name: 'Tooltip',
  components: {
    DxTooltip,
  },
  props: {
    target: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    showEvent: {
      type: String,
      default: 'mouseenter',
    },
    hideEvent: {
      type: String,
      default: 'mouseleave',
    },
  },
};
</script>
