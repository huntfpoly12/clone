const screenMutatePA620 = {
    processKeyPA620(state: any, payload: any){
        state.processKeyPA620={
            ...state.processKeyPA620,
            ...payload
        }
    },
    paymentDayPA620(state: any, payload: any){
        state.paymentDayPA620=payload
    }
};
export default screenMutatePA620;