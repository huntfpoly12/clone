const mutations = {
  setAuthData: (state, authData) => {
    localStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state) => {
    state.authData = null;
    localStorage.clear();
  },
};

export default mutations;
