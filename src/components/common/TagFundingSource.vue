<template>
  <div :class="cssClass">
    <div v-if="fundingSource1" class="tag">
      <a-tooltip :title="`자부담 ${filters.formatNumber(Number(fundingSource1))}`">
        <div>자</div>
      </a-tooltip>
    </div>
    <div v-if="fundingSource2" class="tag">
      <a-tooltip :title="`수익사업 ${filters.formatNumber(Number(fundingSource2))}`">
        <div>수</div>
      </a-tooltip>
    </div>
    <div v-if="fundingSource3" class="tag">
      <a-tooltip :title="`보조금 ${filters.formatNumber(Number(fundingSource3))}`">
        <div>보</div>
      </a-tooltip>
    </div>
    <div v-if="fundingSource4" class="tag">
      <a-tooltip :title="`후원금 ${filters.formatNumber(Number(fundingSource4))}`">
        <div>후</div>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import filters from '@/helpers/filters';
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
    return {
      filters
    }
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
