const screenMutatePA720 = {
    isErrorFormPA720(state: any, data: Boolean) {
        state.isErrorFormPA720 = data;
    },
    keyActivePA720(state: any,data: Number){
        state.keyActivePA720 = data;
    },
    actionSavePA720(state:any) {
        state.actionSavePA720++;
    },
    actionSaveTypePA720(state:any, payload: 0 | 1) {
        state.actionSaveTypePA720 = payload;
    }
};
  
export default screenMutatePA720;