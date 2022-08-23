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
};

export default mutations;
