import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import { getJwtObject } from "@bankda/jangbuda-common";
const actions = {
    getUserInfor: (context: any) => {
        const jwtObject = getJwtObject(context.state.authData);
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
        context.commit('loadUserInfor',dataInfor)  
    }
  };
  
  export default actions;
