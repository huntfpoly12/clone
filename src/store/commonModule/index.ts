import getters from "./getters";
import mutations from "./mutations";

const commonModule = {
    state: () => ({
        arrayRowedited : []
    }),
    getters,
    mutations,
};

export default commonModule;