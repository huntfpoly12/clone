import screenGetterPA120 from "./screenGetters/screenPA120";
const getters = {
    isErrorFormPA720:(state:any)=> state.isErrorFormPA720,
    actionSavePA720: (state: any) => state.actionSavePA720,
    keyActivePA720: (state: any) => state.keyActivePA720,
    ...screenGetterPA120,
};

export default getters;
