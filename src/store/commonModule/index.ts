import getters from "./getters";
import mutations from "./mutations";
import statesPA120 from "./screenStates/screenStatePA120";
import statesPA510 from "./screenStates/screenStatePA510";

const commonModule = {
    state: () => ({
        ...statesPA120,
        ...statesPA510,
    }),
    getters,
    mutations,
};

export default commonModule;