import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import { userId } from '@/helpers/commonFunction';
const actions = {
    getUserInfor: (context: any ) => {
        let dataInfor: any = ref([]);
        const {
            loading,
            result 
        } = useQuery(queries.getUser, {id: userId}, () => ({
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
