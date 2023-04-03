import {
  getJwtObject,
  AdminScreenRole,
  WorkScreenRole,
} from "@bankda/jangbuda-common";
import { DirectiveBinding} from "vue";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let token = sessionStorage.getItem("token");
    if (token) {
      const jwtObject = getJwtObject(token);
      const arrKey = binding.value;
      const adminAll = AdminScreenRole.all(); // Administrator screen role
      const filDataAdmin = adminAll?.filter((item: any) =>
        arrKey.includes(item.enumKey)
      );
      const wokrAll = WorkScreenRole.all(); // Work screen role
      const filDataWork = wokrAll?.filter((item: any) =>
        arrKey.includes(item.enumKey)
      );
      let statusShowHidden: boolean = false; // default is hidden

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
        if (filDataAdmin.length) {
          filDataAdmin.map((item: any) => {
            checkReadRole(item); // Whether the company information management read role is held
          });
        } else if (filDataWork.length) {
          filDataWork.map((item: any) => {
            checkReadRole(item); // Whether the basic settings read role is held
          });
        }
      } else if (binding.arg == "write") {
        if (filDataAdmin.length) {
          filDataAdmin.map((item: any) => {
            checkWriteRole(item); // Whether the company information management write role is held
          });
        } else if (filDataWork.length) {
          filDataWork.map((item: any) => {
            checkWriteRole(item); // Whether the basic settings write role is held
          });
        }
      } else {
        if (filDataAdmin.length) {
          filDataAdmin.map((item: any) => {
            checkReadRole(item); // Whether the company information management read role is held
            checkWriteRole(item); // Whether the company information management write role is held
          });
        } else if (filDataWork.length) {
          filDataWork.map((item: any) => {
            checkReadRole(item); // Whether the basic settings read role is held
            checkWriteRole(item); // Whether the basic settings write role is held
          });
        }
      }
      if (!statusShowHidden) {
        el.style.display = "none";
      }
    }
  },
};
