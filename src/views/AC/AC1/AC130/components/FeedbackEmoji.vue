<template>
  <div class="feedback-emoji" @mouseenter="mousemove" @mouseleave="mouseleave">
    <div class="feedback-emoji-icon">
      <SmileOutlined style="font-size: 15px;" />
    </div>
    <div v-if="isShow" class="feedback-emoji-list">
      <div class="feedback-emoji-list-icon" v-for="(emoji, index) in emojis" :key="index" @click="feedback(emoji)">{{
        emoji }}</div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  props: {
  },
  components: {
    SmileOutlined
  },
  setup(props, { emit }) {
    const emojis = ['❤️', '👍', '👎', '😄', '🤣', '😮', '😥', '😭', '😕', '😡', '🎉', '🚀', '👀']
    const isShow = ref(false)
    const feedback = (emoji: any) => {
      isShow.value = false
      emit('feedback', emoji)
    }

    const mousemove = () => {
      isShow.value = true
    }

    const mouseleave = () => {
      isShow.value = false
    }
    return {
      emojis,
      isShow,
      feedback,
      mousemove,
      mouseleave
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
    height: 26.55px;
    display: flex;
    align-items: center;
  }

  &-list {

    display: flex;
    align-items: center;
    scale: 1.3;
    margin-left: 40px;

    &-icon {
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
}</style>