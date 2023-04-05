import screenMutatePA720 from "./screenMutates/screenMutatePA720.js";
import screenMutatePA120 from "./screenMutates/screenMutatePA120.js";
import screenMutatePA620 from "./screenMutates/screenMutatePA620.js";
import screenMutatePA520 from "./screenMutates/screenMutatePA520.js";
import screenMutatePA420 from "./screenMutates/screenMutatePA420.js";
import screenMutateAC520 from "./screenMutates/screenMutateAC520";
import {MutationTree} from "vuex";
import {TypeCommonState} from "@/store/commonModule/index";
// import screenMutateAC580 from "./screenMutates/screenMutateAC580.js";
const mutations: MutationTree<TypeCommonState> = {
    loadDataEmployee(state: any,dataEmployee :  any) {
        state.arrayEmployeePA410 = dataEmployee
    },
    ...screenMutatePA720,
    ...screenMutatePA120,
    ...screenMutatePA420,
    ...screenMutatePA520,
    ...screenMutatePA620,
    ...screenMutateAC520,
};

export default mutations;
