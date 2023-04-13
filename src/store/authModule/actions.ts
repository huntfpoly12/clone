import {watch, ref} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import {ActionTree} from "vuex";
import {AuthState} from "./types";

const actions: ActionTree<AuthState, any> = {
  /* A function that gets the user information from the server. */
  getUserInfor: (context) => {
    let dataInfor: any = ref([]);
    const {
      loading,
      result
    } = useQuery(queries.getMe, {}, () => ({
      fetchPolicy: "no-cache",
    }));
    if (loading) {
      watch(result, value => {
        dataInfor.value = value.me;
      })
    }
    context.commit('loadUserInfo', dataInfor)
  }
};

export default actions;
