import { watch, ref } from 'vue'
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import mutations from "@/graphql/mutations/index";
import { ActionTree } from "vuex";
import { AuthState } from "./types";
import { getJwtObject } from '@bankda/jangbuda-common';
import { provideApolloClient } from "@vue/apollo-composable";
import { client } from '@/ApolloClient.d';

provideApolloClient(client)

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
  checkToken: ({ state, dispatch, commit }) => {
    const token = sessionStorage.getItem('token')
    const refreshToken = sessionStorage.getItem('refreshToken')
    const {
      onDone, mutate,onError
    } = useMutation(mutations.refreshLogin, () => ({
      variables: {
        accessToken: token,
        refreshToken: refreshToken
      }
    }));

    onDone(result=>{
      if (result && result.data.refreshLogin) {
      commit('setAuthData', result.data.refreshLogin)
      }
    })
    onError((error) => {
      console.log(error);
      //commit('logout')
    });
    if (token && refreshToken) {
      const jwtObject = getJwtObject(token);
      if (jwtObject.isExpired()) {
        mutate()
      }

    }
  }
};

export default actions;

