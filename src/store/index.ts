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

// gọi lại hàm checkToken mỗi 5 phút
setInterval(() => {
  store.dispatch('auth/checkToken')
}, 5 * 60 * 1000) // 5 phút
