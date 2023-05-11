import {GetterTree} from "vuex";
import {AuthState} from "@/store/authModule/types";
import {JwtObject} from "@bankda/jangbuda-common";

const getters: GetterTree<AuthState, any> = {
  getAuthData: (state) => state.authData,
  getUserInfo: (state) => state.userInfor,
  getTokenInfo: (state): JwtObject => state.tokenInfo as JwtObject,
};

export default getters;
