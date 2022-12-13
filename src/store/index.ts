import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";

const store : any= createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    settings: { ...settingModule, namespaced: true },
    common: { ...commonModule, namespaced: true},
  },
});

export default store;
