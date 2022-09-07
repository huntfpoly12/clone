const mutations = {
  setAuthData: (state: { authData: any; }, authData: string) => {
    localStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state: { authData: null; }) => {
    state.authData = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },
};

export default mutations;
