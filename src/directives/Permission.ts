import {
  getJwtObject,
  AdminScreenRole,
  WorkScreenRole,
} from "@bankda/jangbuda-common";
import { DirectiveBinding } from "vue";

export default {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    let token = sessionStorage.getItem("token");
    let statusShowHidden: boolean = false; // default is hidden
    if (token) {
      const jwtObject = getJwtObject(token);
      const arrKey = binding.value;
      const adminAll = AdminScreenRole.all(); // Administrator screen role
      const filDataAdmin = adminAll?.filter((item: any) =>
        arrKey?.includes(item.enumKey)
      );
      const wokrAll = WorkScreenRole.all(); // Work screen role
      const filDataWork = wokrAll?.filter((item: any) =>
        arrKey?.includes(item.enumKey)
      );
      const filDataAll = filDataAdmin.concat(filDataWork)

      /**
       * If the jwtObject has a readScreenRole, then set the statusShowHidden to true.
       * @param {any} item - any - this is the object that is being passed in.
       */
      const checkReadRole = (item: any) => {
        if (jwtObject.hasReadScreenRole(item)) {
          statusShowHidden = true;
        }
      };

      /**
       * If the jwtObject has a write screen role, then set the statusShowHidden to true.
       * @param {any} item - any - this is the object that is being passed in.
       */
      const checkWriteRole = (item: any) => {
        if (jwtObject.hasWriteScreenRole(item)) {
          statusShowHidden = true;
        }
      };

      /* This is a code that checks whether the user has a read or write role. */
      if (binding.arg == "read") {
        filDataAll?.map((item: any) => {
          checkReadRole(item);
        });
      } else if (binding.arg == "write") {
        filDataAll?.map((item: any) => {
          checkWriteRole(item);
        });
      } else {
        filDataAll?.map((item: any) => {
          checkReadRole(item);
          checkWriteRole(item);
        });
      }
    }
    if (!statusShowHidden) {
      el.style.display = "none";
    }
  },
};
