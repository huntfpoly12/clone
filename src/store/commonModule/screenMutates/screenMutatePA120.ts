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
  initFormStateTabPA120(state: any, payload: any) {
    state.initFormStateTabPA120 = {
      ...state.initFormStateTabPA120,
      ...payload
    }
  },
  editRowPA120(state: any, payload: any) {
    state.editRowPA120 = {
      ...state.editRowPA120,
      ...payload
    }
  },
  initFormTab2PA120(state: any, payload: any) {
    state.initFormTab2PA120 = {
      ...state.initFormTab2PA120,
      ...payload
    }
  },
  editRowTab2PA120(state: any, payload: any) {
    state.editRowTab2PA120 = {
      ...state.editRowTab2PA120,
      ...payload
    }
  },
};

export default screenMutatePA120;