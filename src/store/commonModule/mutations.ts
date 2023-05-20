import layoutMutate from "./screenMutates/layoutMutate.js";
import screenMutatePA720 from "./screenMutates/screenMutatePA720.js";
import screenMutatePA120 from "./screenMutates/screenMutatePA120.js";
import screenMutatePA210 from "./screenMutates/screenMutatePA210.js";
import screenMutatePA620 from "./screenMutates/screenMutatePA620.js";
import screenMutatePA520 from "./screenMutates/screenMutatePA520.js";
import screenMutatePA410 from "./screenMutates/screenMutatePA410.js";
import screenMutatePA420 from "./screenMutates/screenMutatePA420.js";
import screenMutateAC520 from "./screenMutates/screenMutateAC520";
import screenMutateBF530 from "./screenMutates/screenMutateBF530";
import {MutationTree} from "vuex";
import {TypeCommonState} from "@/store/commonModule/index";

// import screenMutateAC580 from "./screenMutates/screenMutateAC580.js";
const mutations: MutationTree<TypeCommonState> = {
    loadDataEmployee(state: any,dataEmployee :  any) {
        state.arrayEmployeePA410 = dataEmployee
  },
    ...layoutMutate,
    ...screenMutatePA720,
    ...screenMutatePA120,
    ...screenMutatePA210,
    ...screenMutatePA410,
    ...screenMutatePA420,
    ...screenMutatePA520,
    ...screenMutatePA620,
    ...screenMutateAC520,
    ...screenMutateBF530,
};

export default mutations;
