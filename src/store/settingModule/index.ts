import getters from "./getters";
import mutations from "./mutations";
import { grid_config } from "../../configs/styles/index";
const settingModule = {
  state: () => ({...grid_config,globalYear:2022}),
  getters,
  mutations,
};

export default settingModule;
