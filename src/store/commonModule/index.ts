import getters from "./getters";
import mutations from "./mutations";
import {
    DependantsRelation,
    enum2Entries,
} from "@bankda/jangbuda-common";
var dependantsRelation = enum2Entries(DependantsRelation).map((value) => ({
    value: value[1],
    label: value[0],
}));
const commonModule = {
    state: () => ({
        dependantsRelation
    }),
    getters,
    mutations,
};

export default commonModule;