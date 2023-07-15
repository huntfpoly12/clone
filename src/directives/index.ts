import clickOutside from "./ClickOutside";
import Permission from "./Permission";
import Scroll from "./Scroll";
import ResizeTextarea from "./ResizeTextarea";
export default {
  install (Vue : any) {
    Vue.directive('click-outside', clickOutside)
    Vue.directive('check-permission', Permission)
    Vue.directive('chat-scroll', Scroll)
    Vue.directive('resize-textarea', ResizeTextarea)
  }
}
