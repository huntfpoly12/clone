const screenMutatePA720 = {
    hasError(state: any, data: Boolean) {
        state.isErrorForm = data;
    },
    changeKeyActive(state: any,data: Number){
        state.keyActive = data;
    },
    pending(state:any) {
        state.pending = true;
    },
    actionSave(state:any) {
        state.pending++;
    }
};
  
export default screenMutatePA720;