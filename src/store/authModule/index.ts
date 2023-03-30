import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import {Module} from "vuex";
import {AuthState} from "./types";

const authModule: Module<AuthState, any> = {
  namespaced: true,
  state: () => ({
    userInfor: null,
    authData: '',
    token: 'hi',
    tokenInfo: {}
  }),
  getters,
  mutations,
  actions
};

export default authModule;
