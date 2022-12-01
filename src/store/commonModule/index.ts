import getters from "./getters";
import mutations from "./mutations";

const commonModule = {
  state: () => ({
    user: {
      name: "",
      email: "",
      password: "",
    }
  }),
  getters,
  mutations,
};

export default commonModule;