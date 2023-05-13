<template>
  <div class="item-wrap">
    <div class="item-wrap-title">
      <span>{{ title }}</span> 
      <info-tool-tip v-if="tooltip.length">
        {{ tooltip }}
      </info-tool-tip>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    tooltip: {
      type: String,
      default: '',
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped lang="scss">
.item-wrap {
  position: relative;
  width: 100%;
  border: 1px solid #cfcfcf77;
  border-radius: 10px;
  padding: 15px;
  margin: 8px 5px;
  &-title {
    position: absolute;
    top: -15px;
    left: 15px;
    background-color: #ffffff;
    z-index: 100;
    display: flex;
    text-align: center;
    padding: 6px 10px;
  }
}
</style>
