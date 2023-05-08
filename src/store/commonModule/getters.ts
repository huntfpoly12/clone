import screenGetterPA120 from "./screenGetters/screenPA120";
import screenGetterPA210 from "./screenGetters/screenGetterPA210";
import screenGetterPA410 from "./screenGetters/screenGetterPA410";
import screenGetterPA420 from "./screenGetters/screenGetterPA420";
import screenGetterPA520 from "./screenGetters/screenGetterPA520";
import screenGetterPA620 from "./screenGetters/screenGetterPA620";
import screenGetterPA720 from "./screenGetters/screenGetterPA720";
import screenGetterAC520 from "./screenGetters/screenGetterAC520"
import {GetterTree} from "vuex";
import {TypeCommonState} from "@/store/commonModule/index";

const getters: GetterTree<TypeCommonState, any> = {
    ...screenGetterPA120,
    ...screenGetterPA210,
    ...screenGetterPA410,
    ...screenGetterPA420,
    ...screenGetterPA520,
    ...screenGetterPA620,
    ...screenGetterPA720,
    ...screenGetterAC520
};
export default getters;
