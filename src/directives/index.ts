import clickOutside from "./ClickOutside";
import Permission from "./Permission";
import Scroll from "./Scroll";
export default {
  install (Vue : any) {
    Vue.directive('click-outside', clickOutside)
    Vue.directive('check-permission', Permission)
    Vue.directive('chat-scroll', Scroll)
  }
}
