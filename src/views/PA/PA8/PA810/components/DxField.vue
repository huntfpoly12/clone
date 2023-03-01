<template>
  <div class="dx-field px-10 d-flex items-center" :style="style">
    <div class="dx-field-label">{{ label }}:</div>
    <div class="dx-field-value">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

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
    }
  }
})
</script>
