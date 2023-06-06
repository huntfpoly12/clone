import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";
// import dayjs from "dayjs";
// import { getJwtObject } from "@bankda/jangbuda-common";
// dayjs
const store : any= createStore({
  modules: {
    auth: authModule,
    settings: settingModule,
    common: commonModule,
  },
});
export default store;

// gọi lại hàm checkToken
// const now = dayjs().valueOf()
// const token = sessionStorage.getItem('token')
// if (token) {
  // const expirationTime = getJwtObject(token).expiredTime;
  // const timeRemaining = expirationTime - now;
  // setTimeout(() => store.dispatch('auth/checkToken'), timeRemaining);
// }

