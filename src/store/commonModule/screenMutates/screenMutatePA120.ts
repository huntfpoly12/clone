const screenMutatePA120 = {
  actionFormDonePA120(state: any) {
    state.actionFormDonePA120++;
  },
  actionFormErrorPA120(state: any) {
    state.actionFormErrorPA120++;
  },
  activeTabEditKeyPA120(state: any, payload: any) {
    state.activeTabEditKeyPA120 = payload;
  },
  createSucessTab1PA120(state: any, payload: any) {
    state.createSucessTab1PA120 = payload;
  },
  formStateTab1PA120(state: any, payload: any) {
    state.formStateTab1PA120 = {
      ...state.formStateTab1PA120,
      ...payload,
    };
  },
  formOriginTab1PA120(state: any, payload: any) {
    state.formOriginTab1PA120 = {
      ...state.formOriginTab1PA120,
      ...payload,
    };
  },
  formStateTab2PA120(state: any, payload: any) {
    state.formStateTab2PA120 = {
      ...state.formStateTab2PA120,
      ...payload,
    };
  },
  formOriginTab2PA120(state: any, payload: any) {
    state.formOriginTab2PA120 = {
      ...state.formOriginTab2PA120,
      ...payload,
    };
  },
  deductionItemsPA120(state: any, payload: any) {
    state.deductionItemsPA120 = payload;
  },
  payItemsPA120(state: any, payload: any) {
    state.payItemsPA120 = payload;
  },
};

export default screenMutatePA120;
