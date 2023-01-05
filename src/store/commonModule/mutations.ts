import screenMutatePA720 from "./screenMutates/screenMutatePA720.js";
const mutations = {
    loadDataEmployee(state: any,dataEmployee :  any) {
        state.arrayEmployeePA410 = dataEmployee
    },
    ...screenMutatePA720
};

export default mutations;
