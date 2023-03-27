import clickOutside from "./ClickOutside";
import Permission from "./Permission";
export default {
  install (Vue : any) {
    Vue.directive('click-outside', clickOutside)
    Vue.directive('check-permission', Permission)
  }
}
