import {watch, ref} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import {ActionTree} from "vuex";
import {AuthState} from "./types";
import { getJwtObject } from '@bankda/jangbuda-common';
import { trigger } from 'devextreme/events';

const actions: ActionTree<AuthState, any> = {
  /* A function that gets the user information from the server. */
  getUserInfor: (context) => {
    let dataInfor: any = ref([]);
    const {
      result
    } = useQuery(queries.getMe, {}, () => ({
      fetchPolicy: "no-cache",
    }));
    
    watch(result, value => {
      if (value && value.me) {
        dataInfor.value = value.me;
        context.commit('loadUserInfo', dataInfor.value)
      }
    })
  },
  checkToken:({ state, dispatch,commit })=>{
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    console.log(token, 'kkkkkkkkkkkkkkkkkkk', refreshToken);
    const trigger = ref(false)
    const {
      result,refetch
    } = useQuery(queries.refreshLogin,
    { 
      accessToken:token,
      refreshToken:refreshToken
      }, () => ({
      enabled:trigger.value,
      fetchPolicy: "no-cache",
    }));

    watch(result, value => {
      if (value && value.refreshLogin) {
        trigger.value = false
        commit('setAuthData', value.refreshLogin)
      }
    })
    if (token && refreshToken) {
      const jwtObject = getJwtObject(token);
      if (jwtObject.isExpired()) {
        trigger.value = true
        refetch()
      }

    }
  }
};

export default actions;

