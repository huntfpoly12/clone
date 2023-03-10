<template>
  <div :class="computedClass" :style="style">
    <div class="dx-field-label" :title="label">{{ label }}:</div>
    <div class="dx-field-value">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'FormInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const computedClass = computed(() => {
      return `dx-field px-10 d-flex items-center ${props.class}`;
    });

    return {
      computedClass,
    };
  },
})
</script>
<style lang="scss" scoped>
.dx-field {
  .dx-field-label {
    width: 100px ;
  }
  .dx-field-value {
    width: calc(100% - 100px) !important;
  }
}
</style>
