const mutations = {
  setAuthData: (state, authData) => {
    localStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state) => {
    state.authData = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },
  dataSearchBF320: (state, dataSearchBF320) => {
    // console.log(state);
    state.dataSearchBF320 = dataSearchBF320;
  },
 
};

export default mutations;
