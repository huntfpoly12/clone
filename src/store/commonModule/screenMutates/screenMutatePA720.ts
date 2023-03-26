const screenMutatePA720 = {
  isErrorFormPA720(state: any, data: Boolean) {
    state.isErrorFormPA720 = data;
  },
  formPA720(state: any, payload: any) {
    state.formPA720.input = {
      ...payload.input,
    };
  },
  formEditPA720(state: any, payload: any) {
    state.formEditPA720.input = {
      ...payload.input,
    };
  },
  paymentDayPA720(state: any, payload: any) {
    state.paymentDayPA720 = payload;
  },
  processKeyPA720(state: any, payload: any) {
    state.processKeyPA720.processKey = {
      ...state.processKeyPA720.processKey,
      imputedYear: payload,
      paymentYear: payload,
    }
  },
  selectedRowKeysPA720(state: any, payload: any){
    state.selectedRowKeysPA720 = [payload]
  }
};

export default screenMutatePA720;
