import {MutationTree} from "vuex";
import {AuthState} from "./types";

const mutations: MutationTree<AuthState> = {
  setAuthData: (state, authData) => {
    sessionStorage.setItem("token", authData.accessToken);
    sessionStorage.setItem("refreshToken", authData.refreshToken);
  },
  setTokenInfo: (state,data) => {
    state.tokenInfo = data
  },
  logout: (state) => {
    state.authData = null;
    state.refreshToken = null
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  loadUserInfo(state: any, dataInfor: any) {
    state.userInfor = dataInfor
  }
};

export default mutations;
