
const mutations = {
  setAuthData: (state : any,authData: string) => {
    sessionStorage.setItem("token", authData);
    state.authData = authData;
  },
  logout: (state: { authData: null; }) => {
    state.authData = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  loadUserInfor(state: any, dataInfor: any) {
    state.userInfor = dataInfor
  },
  setToken: (state: any, token: string) => {
    state.token = sessionStorage.getItem("token");
  }
};

export default mutations;
