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
  white-space: initial !important;
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
    width: 180px;
    height: 130px;
    object-fit: cover;
  }
  :deep table {
    border: 1px solid #dfe2e5;
    border-collapse: collapse;
  }
  :deep th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    border-collapse: collapse;
  }
  :deep td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    border-collapse: collapse;
  }

  :deep blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    margin-top: 0;
    margin-bottom: 16px;
    background: #f9f9f9;
  }

  :deep hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }

  :deep dl {
    padding: 0;
    margin-top: 0;
    margin-bottom: 16px;
  }
  :deep dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  :deep dd {
    padding: 0 16px;
    margin-bottom: 16px;
    margin-left: 0;
  }

}</style>