import { toRefs, watch, nextTick, onBeforeUnmount, reactive, Ref } from 'vue';
import { createPopper, Instance, Modifier, Options, Placement, preventOverflow, flip, offset, arrow } from '@popperjs/core';

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

export default function usePopper({
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
      modifiers: [...<[]>options.modifiers, { name: 'eventListeners', enabled }],
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
