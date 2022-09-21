const mutations = {
  setAuthData: (state, authData) => {
    sessionStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state) => {
    state.authData = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  dataSearchBF320: (state, dataSearchBF320) => { 
    state.dataSearchBF320 = dataSearchBF320;
  },
  dataSearchBF310: (state, dataSearchBF310) => { 
    state.dataSearchBF310 = dataSearchBF310;
  },
 
};

export default mutations;
