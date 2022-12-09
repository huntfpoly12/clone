<template>
  xxx<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
  <component v-bind:is="'PA410Page1'"/>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed ,defineAsyncComponent} from "vue";
const PA410Page1 = defineAsyncComponent(() =>
  import("./components/PA410Page1.vue")
);
export default defineComponent({
  components: {
    PA410Page1
  },
  setup() {
  
    return {
      show : ref(true)
    };
  },
});
</script>














































































































<style lang="scss" scoped src="./style/style.scss" />
