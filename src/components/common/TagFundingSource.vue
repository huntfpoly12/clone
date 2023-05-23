<template>
  <div :class="cssClass">
    <div v-if="fundingSource1" class="tag">자</div>
    <div v-if="fundingSource2" class="tag">수</div>
    <div v-if="fundingSource3" class="tag">보</div>
    <div v-if="fundingSource4" class="tag">후</div>
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
    fundingSource1: {
      type: String,
      default: false,
    },
    fundingSource2: {
      type: String,
      default: false,
    },
    fundingSource3: {
      type: String,
      default: false,
    },
    fundingSource4: {
      type: String,
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
