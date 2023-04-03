import {ActionTree} from "vuex";
import {AC520State} from "@/store/ac520Module/types";
import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";

const actions: ActionTree<AC520State, any> = {
  setDataBudget({commit}, {data, type}: {data: Budget | null, type: ComponentCreateBudget}) {
    commit('setDataBudget', data)
    commit('setTypeCreateBudget', type)
  }
}
export default actions
