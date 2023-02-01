import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import { getJwtObject } from "@bankda/jangbuda-common";
const actions = {
    
/* A function that gets the user information from the server. */
  getUserInfor: (context: any, token: string) => {
        console.log(token)
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
        context.commit('loadUserInfor',dataInfor)  
    }
  };
  
  export default actions;
