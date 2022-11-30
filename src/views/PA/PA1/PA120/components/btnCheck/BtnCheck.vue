<template>
  <button v-if="value" class="btn-green">O</button>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: ['value'],
  mounted() {
    console.log(this.value);
  }
});
</script>

<style scoped>
  .btn-green {
    background: #77933C;
    padding: 3px 15px;
    border: 1px solid transparent;
    color: #ffffff;
    border-radius: 3px;
    font-size: 12px;
  }
</style>>