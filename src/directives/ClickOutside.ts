export default {
  beforeMount(el: any, binding: any) {
    const clickOutsideEvent = (event: any) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };

    el.__vueClickEventHandler__ = clickOutsideEvent;
    document.addEventListener('click', clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.__vueClickEventHandler__);
  },
};