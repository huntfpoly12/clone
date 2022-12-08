import getters from "./getters";
import mutations from "./mutations";
import statesPA120 from "./screenStates/screenStatePA120";

const commonModule = {
    state: () => ({
        ...statesPA120,
    }),
    getters,
    mutations,
};

export default commonModule;