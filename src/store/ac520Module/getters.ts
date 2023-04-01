import {GetterTree} from "vuex";
import {AC520State} from "@/store/ac520Module/types";

const getters : GetterTree<AC520State, any> = {
  getDataBudget(state) {
    return state.dataBudget
  },
  getTypeCreateBudget(state) {
    return state.typeCreateBudget
  }
}
export default getters
