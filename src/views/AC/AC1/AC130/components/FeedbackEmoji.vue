<template>
  <div class="feedback-emoji">
    <div class="feedback-emoji-icon">
      <SmileOutlined style="font-size: 15px;"/>
    </div>
    <div class="feedback-emoji-list">
      <div class="feedback-emoji-list-icon" v-for="(emoji, index) in emojis" :key="index">{{ emoji }}</div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue';
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
// import css
import 'vue3-emoji-picker/css'
import MarkdownCustom from './MarkdownCustom.vue';
export default defineComponent({
  props: {
  },
  components: {
    SmileOutlined
  },
  setup(props, { emit }) {
    const emojis = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀']
    return {
      emojis
    }
  },
})
</script>
    
<style lang="scss" scoped>
.feedback-emoji {
  transition: 1s;
  display: flex;
  align-items: center;
  &-icon {
    cursor: pointer;
    height: 16px;
  }
  &-list {
    
    display: flex;
    align-items: center;
    scale: 1.3;
    margin-left: 25px;
    &-icon {
      display: none;
      cursor: pointer;
      &:hover {
        scale: 1.4;
      }
    }
  }
  &:hover {
    .feedback-emoji-list-icon {
      display: block;
    }
  }
}
</style>