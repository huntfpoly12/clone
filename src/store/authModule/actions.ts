import {watch, ref} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import {getJwtObject} from "@bankda/jangbuda-common";
import {ActionTree} from "vuex";
import {AuthState} from "./types";

const actions: ActionTree<AuthState, any> = {
  /* A function that gets the user information from the server. */
  getUserInfor: (context, token: string) => {
    const jwtObject = getJwtObject(token);
    let dataInfor: any = ref([]);
    const {
      loading,
      result
    } = useQuery(queries.getUser, {id: jwtObject.userId}, () => ({
      fetchPolicy: "no-cache",
    }));
    if (loading) {
      watch(result, value => {
        dataInfor.value = value.getUser;
      })
    }
    context.commit('loadUserInfo', dataInfor)
  }
};

export default actions;
