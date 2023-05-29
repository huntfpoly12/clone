import { Budget, ComponentCreateBudget } from "@/views/AC/AC5/AC520/type";

const screenMutateAC520 = {
  setDataBudget(state: any, data: Budget | null) {
    state.dataBudget = data
  },
  setTypeCreateBudget(state: any, typeCreateBudget: ComponentCreateBudget) {
    state.typeCreateBudget = typeCreateBudget
  },
  setDataPreIndexBudget(state: any, data: any) {
    state.dataPreIndexBudget = data
  },
  setIsChangedFormAc520(state: any, isChangedForm: boolean) {
    state.isChangedFormAc520 = isChangedForm
  }
}
export default screenMutateAC520
