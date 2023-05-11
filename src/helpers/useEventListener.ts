import { isRef, watch, unref, onMounted, onBeforeUnmount, Ref } from "vue";

type EventListenerTarget = EventTarget | Ref<EventTarget | null>;

export default function useEventListener(
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
