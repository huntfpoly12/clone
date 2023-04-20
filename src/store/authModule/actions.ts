import {watch, ref} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import {ActionTree} from "vuex";
import {AuthState} from "./types";
import { getJwtObject } from '@bankda/jangbuda-common';

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
  checkToken:({commit })=>{
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    if (token && refreshToken) {
      const jwtObject = getJwtObject(token);
      if (jwtObject.isExpired()) {
        const {
          result
        } = useQuery(queries.refreshLogin,
        { 
          accessToken:token,
          refreshToken:refreshToken
        }, () => ({
          fetchPolicy: "no-cache",
        }));

        watch(result, value => {
          if (value && value.refreshLogin) {
            commit('setAuthData', value.refreshLogin)
          }
        })
      }

    }
  }
};

export default actions;

