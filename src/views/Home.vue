<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>Home</div>
</template>
<script>
import LayoutDefault from '../layouts/DefaultLayout.vue';
export default {
   name: `Home`,
  created() {
    this.$emit(`update:layout`, LayoutDefault);
  },
}
</script>
