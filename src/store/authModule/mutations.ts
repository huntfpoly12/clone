
const mutations = {
  setAuthData: (state : any,authData: string) => {
    sessionStorage.setItem("token", authData);
    
    
    state.authData = 'dsfsdfsdfsdfsdfsf';
    console.log(state.authData);
  },
  logout: (state: { authData: null; }) => {
    state.authData = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  },
  loadUserInfor(state: any, dataInfor: any) {
    state.userInfor = dataInfor
  }
};

export default mutations;
