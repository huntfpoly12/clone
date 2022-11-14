import getters from "./getters";
import mutations from "./mutations";
import { grid_config } from "../../configs/styles/index";
const settingModule = {
  state: () => ({...grid_config}),
  getters,
  mutations,
};

export default settingModule;
