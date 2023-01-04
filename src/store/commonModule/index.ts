import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import statesPA120 from "./screenStates/screenStatePA120";
import statesPA410 from "./screenStates/screenStatePA410";
import statesPA510 from "./screenStates/screenStatePA510";
import statesPA620 from "./screenStates/screenStatePA620";
import statesPA720 from "./screenStates/screenStatePA720";
import layputState from "./screenStates/layoutState";
const commonModule = {
    state: () => ({
        ...layputState,
        ...statesPA120,
        ...statesPA410,
        ...statesPA510,
        ...statesPA620,
        ...statesPA720,
    }),
    getters,
    mutations,
    actions
};
console.log(`output->commonModule`,commonModule.state)
export default commonModule;
