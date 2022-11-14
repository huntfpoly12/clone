import { createStore } from "vuex";

import authModule from "./authModule/index";
import settingModule from "./settingModule/index";

const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    settings: { ...settingModule, namespaced: true },
  },
});

export default store;
