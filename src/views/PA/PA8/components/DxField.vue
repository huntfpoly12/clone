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
  align-items: center;
  .dx-field-label {
    width: 110px ;
  }
  .dx-field-value {
    width: calc(100% - 140px) !important;
  }
  &.field-custom {
    .dx-field-label {
      width: 150px ;
    }
    .dx-field-value {
      width: calc(100% - 150px) !important;
    }
  }
  &.field-custom-2 {
    .dx-field-label {
      width: 200px ;
    }
    .dx-field-value {
      width: calc(100% - 200px) !important;
    }
  }
}
</style>
