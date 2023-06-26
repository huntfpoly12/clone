const screenMutatePA120 = {
  actionFormDonePA120(state: any) {
    state.actionFormDonePA120++;
  },
  actionFormErrorPA120(state: any) {
    state.actionFormErrorPA120++;
  },
  keyActivePA120(state: any, data: Number) {
    state.keyActivePA120 = data;
  },
  activeTabEditKeyPA120(state: any, payload: any) {
    state.activeTabEditKeyPA120 = payload;
  },
  activeTabAddKeyPA120(state: any, payload: any) {
    state.activeTabAddKeyPA120 = payload;
  },
  presidentPA120(state: any, payload: any) {
    state.presidentPA120 = payload;
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
};

export default screenMutatePA120;
