import screenMutatePA720 from "./screenMutates/screenMutatePA720.js";
import screenMutatePA120 from "./screenMutates/screenMutatePA120.js";
import screenMutatePA620 from "./screenMutates/screenMutatePA620.js";
import screenMutatePA520 from "./screenMutates/screenMutatePA520.js";
const mutations = {
    loadDataEmployee(state: any,dataEmployee :  any) {
        state.arrayEmployeePA410 = dataEmployee
    },
    ...screenMutatePA720,
    ...screenMutatePA120,
    ...screenMutatePA520,
    ...screenMutatePA620,
};

export default mutations;
