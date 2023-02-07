const screenMutatePA120 = {
    actionFormDonePA120(state: any) {
        state.actionFormDonePA120 = !state.actionFormDonePA120;
    },
    keyActivePA120(state: any,data: Number){
        state.keyActivePA120 = data;
    },
    resetTabPA120(state: any, payload: any){
        state.resetTabPA120 = payload;
    },
    presidentPA120(state: any,payload: any){
        state.presidentPA120 = payload;
    },
    initFormStateTabPA120(state: any, payload: any){
        state.initFormStateTabPA120 = {
            ...state.initFormStateTabPA120,
            ...payload
        }
    },
    editRowPA120(state: any, payload: any){
        state.editRowPA120 = {
            ...state.editRowPA120,
            ...payload
        }
    }
};
  
export default screenMutatePA120;