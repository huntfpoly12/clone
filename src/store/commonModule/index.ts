import getters from "./getters";
import mutations from "./mutations";
import statesPA120 from "./screenStates/screenStatePA120";
import statesPA410 from "./screenStates/screenStatePA410";
const commonModule = {
    state: () => ({
        ...statesPA120,
        ...statesPA410
    }),
    getters,
    mutations,
};

export default commonModule;
