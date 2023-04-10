import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";

const screenActionAC520 = {
  setDataBudget({commit}: {commit: any}, {data, type}: {data: Budget | null, type: ComponentCreateBudget}) {
    commit('setDataBudget', data)
    commit('setTypeCreateBudget', type)
  }
}
export default screenActionAC520
