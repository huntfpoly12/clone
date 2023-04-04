<template>
  <div :class="cssClass">
    <div v-if="selfFunding" class="tag">자</div>
    <div v-if="revenueGeneratingBusiness" class="tag">수</div>
    <div v-if="subsidy" class="tag">보</div>
    <div v-if="donation" class="tag">후</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    cssClass: {
      type: String,
      default: 'tag-center',
    },
    selfFunding: {
      type: Boolean,
      default: false,
    },
    revenueGeneratingBusiness: {
      type: Boolean,
      default: false,
    },
    subsidy: {
      type: Boolean,
      default: false,
    },
    donation: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.tag-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.tag {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #000000;
  border: 1px solid #2a2a2a;
}
</style>
