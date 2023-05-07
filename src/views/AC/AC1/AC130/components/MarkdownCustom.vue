<template>
  <div class="Markdown">
    <Markdown v-bind="options" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';
export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => { }
    },
  },
  components: {
    Markdown
  },
  setup(props, { emit }) {

    return {}
  }
});
</script>
<style scoped lang="scss">
.Markdown {
  :deep h1 {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :deep img {
    max-width: 100%;
  }
}</style>