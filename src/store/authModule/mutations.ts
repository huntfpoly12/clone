const mutations = {
  setAuthData: (state: { authData: any; }, authData: string) => {
    sessionStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state: { authData: null; }) => {
    state.authData = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  dataSearchBF320: (state: { dataSearchBF320: any; }, dataSearchBF320: string) => { 
    state.dataSearchBF320 = dataSearchBF320;
  },
  dataSearchBF310: (state: { dataSearchBF310: any; }, dataSearchBF310: string) => {
    state.dataSearchBF310 = dataSearchBF310;
  },

};

export default mutations;
