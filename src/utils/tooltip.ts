import {isRef, toRefs, unref, onMounted, onBeforeUnmount, Ref, nextTick, watch, reactive, ref} from "vue";
import {
  createPopper,
  Instance,
  Modifier,
  Options,
  Placement,
  preventOverflow,
  flip,
  offset,
  arrow
} from '@popperjs/core';
export function useClickAway(target: any, handler: any) {
  const event = "pointerdown";

  if (typeof window === 'undefined' || !window) {
    return;
  }

  const listener = (event: Event) => {
    const el = unref(target);
    if (!el) {
      return;
    }

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}


type EventListenerTarget = EventTarget | Ref<EventTarget | null>;

export function useEventListener(
  target: EventListenerTarget,
  event: string,
  handler: EventListenerOrEventListenerObject
) {
  if (isRef(target)) {
    watch(target, (value: EventListenerTarget, oldValue: EventListenerTarget) => {
      unref(oldValue)?.removeEventListener(event, handler);
      unref(value)?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      unref(target)?.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}

interface UsePopperOptions {
  arrowPadding: Ref<string>;
  emit: (event: string) => void;
  locked: Ref<boolean>;
  offsetDistance: Ref<number>;
  offsetSkid: Ref<number>;
  placement: Ref<Placement>;
  popperNode: Ref<HTMLElement | null>;
  triggerNode: Ref<HTMLElement | null>;
}
const toInt = (x: string): number => parseInt(x, 10);
export function usePopper(
  {
    arrowPadding,
    emit,
    locked,
    offsetDistance,
    offsetSkid,
    placement,
    popperNode,
    triggerNode,
  }: UsePopperOptions) {
  const state = reactive({
    isOpen: false,
    popperInstance: null as Instance | null,
  });

  // Enable or disable event listeners to optimize performance.
  const setPopperEventListeners = (enabled: boolean) => {
    state.popperInstance?.setOptions(options => ({
      ...options,
      modifiers: [...<[]>options.modifiers, {name: 'eventListeners', enabled}],
    }));
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);
  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit('close:popper');
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit('open:popper');
  };

  // When isOpen or placement change
  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async () => {
    await nextTick();
    state.popperInstance = createPopper(triggerNode.value!, popperNode.value!, {
      placement: placement.value,
      modifiers: [
        preventOverflow,
        flip,
        {
          name: 'flip',
          enabled: !locked.value,
        },
        arrow,
        {
          name: 'arrow',
          options: {
            padding: toInt(arrowPadding.value),
          },
        },
        offset,
        {
          name: 'offset',
          options: {
            offset: [toInt(offsetSkid.value.toString()), toInt(offsetDistance.value.toString())],
          },
        },
      ],
    });

    // Update its position
    state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close,
  };
}

interface UseContentOptions {
  slots: any;
  popperNode: Ref<HTMLElement | null>;
  content: Ref<any>;
}
export function useContent({ slots, popperNode, content }: UseContentOptions) {
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
