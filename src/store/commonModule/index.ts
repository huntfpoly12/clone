import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import statesPA120 from "./screenStates/screenStatePA120";
import statesPA510 from "./screenStates/screenStatePA510";
import statesPA410 from "./screenStates/screenStatePA410";
const commonModule = {
    state: () => ({
        ...statesPA120,
        ...statesPA510,
        ...statesPA410
    }),
    getters,
    mutations,
    actions
};

export default commonModule;
