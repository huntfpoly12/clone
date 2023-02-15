import screenGetterPA120 from "./screenGetters/screenPA120";
import screenGetterPA620 from "./screenGetters/screenGetterPA620";
import { companyId } from "@/helpers/commonFunction";
const getters = {
    isErrorFormPA720:(state:any)=> state.isErrorFormPA720,
    actionSavePA720: (state: any) => state.actionSavePA720,
    keyActivePA720: (state: any) => state.keyActivePA720,
    formPA720: (state: any) => ({...state.formPA720, companyId: companyId,}),
    formEditPA720: (state: any) => ({...state.formEditPA720, companyId: companyId,}),
    ...screenGetterPA120,
    ...screenGetterPA620,
};
export default getters;
