import { Ref, ref, onMounted, onBeforeUnmount, watch } from "vue";

interface UseContentOptions {
  slots: any;
  popperNode: Ref<HTMLElement | null>;
  content: Ref<any>;
}

export default function useContent({ slots, popperNode, content }: UseContentOptions) {
  let observer: MutationObserver | null = null;
  const hasContent: Ref<boolean> = ref(false);
  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }

    observer = new MutationObserver(checkContent);
    observer.observe(popperNode.value!, {
      childList: true,
      subtree: true,
    });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  /**
   * Watch the content prop
   */
  watch(content, (newValue) => {
    if (newValue) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
