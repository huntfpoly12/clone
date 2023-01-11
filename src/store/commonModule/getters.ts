import screenGetterPA120 from "./screenGetters/screenPA120";
import screenGetterPA620 from "./screenGetters/screenGetterPA620";
const getters = {
    isErrorFormPA720:(state:any)=> state.isErrorFormPA720,
    actionSavePA720: (state: any) => state.actionSavePA720,
    keyActivePA720: (state: any) => state.keyActivePA720,
    ...screenGetterPA120,
    ...screenGetterPA620,
};

export default getters;
