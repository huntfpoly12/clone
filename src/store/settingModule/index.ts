import getters from "./getters";
import mutations from "./mutations";
import { grid_config } from "../../configs/styles/index";
import dayjs, { Dayjs } from "dayjs";
const settingModule = {
  state: () => ({...grid_config,globalYear:dayjs().year()}),
  getters,
  mutations,
};

export default settingModule;
