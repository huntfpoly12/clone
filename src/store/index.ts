import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";
const store : any= createStore({
  modules: {
    auth: authModule,
    settings: settingModule,
    common: commonModule,
  },
});
export default store;

// gọi lại hàm checkToken mỗi 19 phút
setInterval(() => {
  store.dispatch('auth/checkToken')
}, 10 * 60 * 1000) // 19 phút
