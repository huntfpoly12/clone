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
  loadUserInfor(state: any, dataInfor: any) {
    console.log(dataInfor);
    
    state.userInfor = dataInfor
  }
};

export default mutations;
