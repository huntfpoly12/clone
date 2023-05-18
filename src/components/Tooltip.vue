<template>
  <div @mouseleave="hover && closePopper()" ref="popperContainerNode">
    <div class="h-full flex-center" ref="triggerNode" @mouseover="hover && openPopper()" @click="togglePopper"
         @focus="openPopper" @keyup.esc="closePopper">
      <!-- The default slot to trigger the popper  -->
      <slot/>
    </div>
    <Transition name="fade">
      <div v-show="shouldShowPopper" class="popper" ref="popperNode" @mouseover="hover && openPopper()">
        <slot name="content" :close="close" :isOpen="modifiedIsOpen">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";
import {
  ref,
  computed,
  useSlots,
  toRefs,
  watch,
  watchEffect,
  onMounted, Ref, onBeforeUnmount, reactive, nextTick, unref, isRef,
} from "vue";
import {Instance, arrow, createPopper, flip, offset, preventOverflow} from '@popperjs/core';

const emit = defineEmits(["open:popper", "close:popper"]);
const slots: any = useSlots();
const props = defineProps({
  /**
   * Preferred placement (the "auto" placements will choose the side with most space.)
   */
  placement: {
    type: String,
    default: "top",
    validator: function (value: string) {
      return [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
      ].includes(value);
    },
  },
  /**
   * Disables automatically closing the popover when the user clicks away from it
   */
  disableClickAway: {
    type: Boolean,
    default: false,
  },
  /**
   * Offset in pixels along the trigger element
   */
  offsetSkid: {
    type: String,
    default: "0",
  },
  /**
   * Offset in pixels away from the trigger element
   */
  offsetDistance: {
    type: String,
    default: "12",
  },
  /**
   * Trigger the popper on hover
   */
  hover: {
    type: Boolean,
    default: true,
  },
  /**
   * Manually open/close the Popper, other events are ignored if this prop is set
   */
  show: {
    type: Boolean,
    default: null,
  },
  /**
   * Disables the Popper. If it was already open, it will be closed.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Open the Popper after a delay (ms).
   */
  openDelay: {
    type: [Number],
    default: 200,
  },
  /**
   * Close the Popper after a delay (ms).
   */
  closeDelay: {
    type: [Number],
    default: 200,
  },
  /**
   * The z-index of the Popper.
   */
  zIndex: {
    type: [Number, String],
    default: 9999,
  },
  /**
   * Display an arrow on the popper
   */
  arrow: {
    type: Boolean,
    default: true,
  },
  /**
   * Stop arrow from reaching the edge of the popper
   */
  arrowPadding: {
    type: String,
    default: "0",
  },
  /**
   * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
   */
  locked: {
    type: Boolean,
    default: false,
  },
  /**
   * If the content is just a simple string, it can be passed in as a prop
   */
  content: {
    type: String,
    default: null,
  },
});

const popperContainerNode = ref(null);
const popperNode = ref(null);
const triggerNode = ref(null);
const modifiedIsOpen = ref(false);

onMounted(() => {
  const children = slots?.default();

  if (children && children.length > 1) {
    return console.error(
      `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
    );
  }
});

const {
  arrowPadding,
  closeDelay,
  content,
  disableClickAway,
  disabled,
  locked,
  offsetDistance,
  offsetSkid,
  openDelay,
  placement,
  show,
} = toRefs(props);

const {isOpen, open, close} = usePopper({
  arrowPadding,
  emit,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  popperNode,
  triggerNode,
});
const {hasContent} = useContent({slots, popperNode, content});

const manualMode = computed(() => show.value !== null);
const invalid = computed(() => disabled.value || !hasContent.value);
const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
const enableClickAway = computed(
  () => !disableClickAway.value && !manualMode.value,
);
const openPopperDebounce = debounce(open, openDelay.value);
const closePopperDebounce = debounce(close, closeDelay.value);

const openPopper = async () => {
  if (invalid.value || manualMode.value) {
    return;
  }

  closePopperDebounce.cancel();
  openPopperDebounce();
};

const closePopper = async () => {
  if (manualMode.value) {
    return;
  }

  openPopperDebounce.cancel();
  closePopperDebounce();
};

const togglePopper = () => {
  isOpen.value ? closePopper() : openPopper();
};

/**
 * If Popper is open, we automatically close it if it becomes
 * disabled or without content.
 */
watch([hasContent, disabled], ([hasContent, disabled]) => {
  if (isOpen.value && (!hasContent || disabled)) {
    close();
  }
});

/**
 * In order to eliminate flickering or visibly empty Poppers due to
 * the transition when using the isOpen slot property, we need to return a
 * separate debounced value based on isOpen.
 */
watch(isOpen, isOpen => {
  if (isOpen) {
    modifiedIsOpen.value = true;
  } else {
    debounce(() => {
      modifiedIsOpen.value = false;
    }, 200);
  }
});

/**
 * Watch for manual mode.
 */
watchEffect(() => {
  if (manualMode.value) {
    show.value ? openPopperDebounce() : closePopperDebounce();
  }
});

/**
 * Use click away if it should be enabled.
 */
watchEffect(() => {
  if (enableClickAway.value) {
    useClickAway(popperContainerNode, closePopper);
  }
});

interface UseContentOptions {
  slots: any;
  popperNode: Ref<HTMLElement | null>;
  content: Ref<any>;
}

function useContent({slots, popperNode, content}: UseContentOptions) {
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

// interface UsePopperOptions {
//   arrowPadding: Ref<string>;
//   emit: (event: string) => void;
//   locked: Ref<boolean>;
//   offsetDistance: Ref<number>;
//   offsetSkid: Ref<number>;
//   placement: Ref<Placement>;
//   popperNode: Ref<HTMLElement | null>;
//   triggerNode: Ref<HTMLElement | null>;
// }
const toInt = (x: string): number => parseInt(x, 10);

function usePopper(
  {
    arrowPadding,
    emit,
    locked,
    offsetDistance,
    offsetSkid,
    placement,
    popperNode,
    triggerNode,
  }: any) {
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

const useClickAway = (target: any, handler: any) => {
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

function useEventListener(
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
</script>

<style scoped>
.h-full {
  height: 100%;
}

.flex-center {
  display: flex;
  align-items: center;
}

.popper {
  transition: background 250ms ease-in-out;
  background: #121212;
  padding: 5px;
  color: #ffffff;
  border-radius: 3px;
  border-width: 0px;
  border-style: solid;
  border-color: #121212;
  box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  z-index: v-bind(zIndex);
}

.popper:hover,
.popper:hover > #arrow::before {
  background: #121212;
}

.inline-block {
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#arrow,
#arrow::before {
  transition: background 250ms ease-in-out;
  position: absolute;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  background: #121212;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

/* Top arrow */
.popper[data-popper-placement^="top"] > #arrow {
  bottom: -5px;
}

.popper[data-popper-placement^="top"] > #arrow::before {
  border-right: 0px solid #121212;
  border-bottom: 0px solid #121212;
}

/* Bottom arrow */
.popper[data-popper-placement^="bottom"] > #arrow {
  top: -5px;
}

.popper[data-popper-placement^="bottom"] > #arrow::before {
  border-left: 0px solid #121212;
  border-top: 0px solid #121212;
}

/* Left arrow */
.popper[data-popper-placement^="left"] > #arrow {
  right: -5px;
}

.popper[data-popper-placement^="left"] > #arrow::before {
  border-right: 0px solid #121212;
  border-top: 0px solid #121212;
}

/* Right arrow */
.popper[data-popper-placement^="right"] > #arrow {
  left: -5px;
}
</style>
