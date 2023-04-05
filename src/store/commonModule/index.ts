import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import statesPA110 from "./screenStates/screenStatePA110";
import statesPA120 from "./screenStates/screenStatePA120";
import statesPA210 from "./screenStates/screenStatePA210";
import statesPA410 from "./screenStates/screenStatePA410";
import statesPA420 from "./screenStates/screenStatePA420";
import statesPA510 from "./screenStates/screenStatePA510";
import statesPA610 from "./screenStates/screenStatePA610";
import statesPA620 from "./screenStates/screenStatePA620";
import statesPA720 from "./screenStates/screenStatePA720";
import layputState from "./screenStates/layoutState";
import statesPA520 from "./screenStates/screenStatePA520";
import statesBF620 from "./screenStates/screenStateBF620";
import statesAC580 from "./screenStates/screenStateAC580";
import statesAC520 from "./screenStates/screenStateAC520";
import {Module} from "vuex";
const commonState = {
  ...layputState,
  ...statesPA110,
  ...statesPA120,
  ...statesPA210,
  ...statesPA410,
  ...statesPA420,
  ...statesPA510,
  ...statesPA610,
  ...statesPA620,
  ...statesPA720,
  ...statesPA520,
  ...statesBF620,
  ...statesAC580,
  ...statesAC520
}
export type TypeCommonState = typeof commonState;
const commonModule: Module<TypeCommonState, any> = {
    namespaced: true,
    state: () => (commonState),
    getters,
    mutations,
    actions
};
export default commonModule;
