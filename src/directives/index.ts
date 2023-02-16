import clickOutside from "./ClickOutside";
export default {
  install (Vue : any) {
    Vue.directive('click-outside', clickOutside)
    // Vue.directive('other-directive', myOtherDirective)
  }
}
