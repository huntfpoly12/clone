import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";
import commonModule from "./commonModule/index";
const store : any= createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    settings: { ...settingModule, namespaced: true },
    common: { ...commonModule, namespaced: true}
  },
});
console.log(`output->common, PA720`,commonModule, PA720)
export default store;
