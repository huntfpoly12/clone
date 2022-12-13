<template>
  <component v-bind:is="currentPage"/>
</template>
<script lang="ts">
import { defineComponent, computed, defineAsyncComponent, onActivated } from "vue";
import { useStore } from 'vuex';
import { companyId } from "@/helpers/commonFunction";
const PA410Page1 = defineAsyncComponent(() =>
  import("./components/PA410Page1.vue")
);
const PA410Page2 = defineAsyncComponent(() =>
  import("./components/PA410Page2.vue")
);
export default defineComponent({
  components: {
    PA410Page1,
    PA410Page2
  },
  computed: {
    
  },
  setup() {
    const store = useStore();
    const currentPage = computed(() => store.state.common.currentPagePA410);
    return {
      currentPage
    };
  },
});
</script>














































































































<style lang="scss" scoped src="./style/style.scss" />
