import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";
import screen from "./screenModule/index";
import PA720 from "./screenModule/PA720";
import PA730 from "./screenModule/PA730";
const store : any= createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    settings: { ...settingModule, namespaced: true },
    common: { ...commonModule, namespaced: true},
    PA720,
    PA730,
    // ...screen,
  },
});
export default store;
