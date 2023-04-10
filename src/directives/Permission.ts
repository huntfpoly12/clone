import useCheckPermission from "@/helpers/useCheckPermission";
import { DirectiveBinding } from "vue";

export default {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {

    const arrKey: Array<string> = binding.value;
    const getDisplay = (status: boolean) => status ? "Antd" : "none";

    const { read, write } = useCheckPermission(arrKey)
    /* This is a code that checks whether the user has a read or write role. */
    if (binding.arg == "read") {
      el.style.display = getDisplay(read)
    } else if (binding.arg == "write") {
      el.style.display = getDisplay(write)
    } else {
      el.style.display = getDisplay(read && write)
    }
  },
};
