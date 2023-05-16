import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";

const layoutMutate ={
  setApiErrorData(state: any, data: any) {
    state.apiErrorData = data
  },
  setApiErrorStatus(state: any, status: boolean) {
    state.apiErrorStatus = status
  },
}
export default layoutMutate
