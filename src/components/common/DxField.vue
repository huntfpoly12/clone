<template>
  <div :class="computedClass" :style="style">
    <div v-if="label" :class="dxFieldLabel" :title="showTitle ? label : ' '" :style="styleLabel">{{ label }}:</div>
    <div class="dx-field-value">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'FormDxField',
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
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
    styleLabel: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    alignment: {
      type: String,
      default: 'left'
    }
  },
  setup(props) {
    const dxFieldLabel = computed(() => {
      return `dx-field-label ${props.required ? 'required' : ''}`
    })
    const computedClass = computed(() => {
      return `dx-field px-10 d-flex items-center ${props.class}`;
    });
    const styleLabel = computed(() => {
      return `text-align: ${props.alignment}; ${props.styleLabel}`;
    });
    return {
      computedClass,
      dxFieldLabel,
      styleLabel
    };
  },
})
</script>
<style lang="scss" scoped>
.dx-field {
  align-items: center;
  margin-bottom: 0;
  .dx-field-label {
    width: 110px ;
    flex: 0 0 auto;
    &.required {
      color: red;
    }
  }
  .dx-field-value {
    flex:  1;
  }
  &.field-custom {
    .dx-field-label {
      width: 170px ;
    }
    .dx-field-value {
      width: calc(100% - 170px) !important;
    }
  }
  &.field-custom-1 {
    .dx-field-label {
      width: 130px ;
    }
    .dx-field-value {
      width: calc(100% - 130px) !important;
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
  &.field-custom-auto {
    .dx-field-label {
      width: auto ;
    }
  }
}
</style>
