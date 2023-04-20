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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('refreshToken');
  },
  loadUserInfo(state: any, dataInfor: any) {
    state.userInfor = dataInfor
  }
};

export default mutations;
