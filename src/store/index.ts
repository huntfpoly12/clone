import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";
import ac520Module from "@/store/ac520Module";
const store : any= createStore({
  modules: {
    auth: authModule,
    settings: settingModule,
    common: { ...commonModule, namespaced: true},
    ac520Module
  },
});
export default store;
