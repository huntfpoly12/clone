import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule = {
  state: () => ({
    userInfor:[]
  }),
  getters,
  mutations,
  actions
};

export default authModule;
