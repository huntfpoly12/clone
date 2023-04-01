import {MutationTree} from "vuex";
import {AC520State} from "@/store/ac520Module/types";
import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";

const mutations: MutationTree<AC520State>={
  setDataBudget(state, data: Budget | null) {
    state.dataBudget = data
  },
  setTypeCreateBudget(state, typeCreateBudget: ComponentCreateBudget) {
    state.typeCreateBudget = typeCreateBudget
  }
}
export default mutations
