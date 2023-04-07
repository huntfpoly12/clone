<template>
  <div class="item-wrap">
    <span class="item-wrap-title">{{ title }}</span>
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
    left: 23px;
    background-color: #ffffff;
    z-index: 100;
    text-align: center;
    padding: 6px 10px;
  }
}
</style>
