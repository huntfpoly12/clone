import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule = {
  state: () => ({
    userInfor: [],
    authData: ''
  }),
  getters,
  mutations,
  actions
};

export default authModule;
