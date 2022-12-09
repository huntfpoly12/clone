import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
const actions = {
    getListEmployee: () => {
        const originData = {
        
        };
        const {
            refetch: refetchData,
            onError: errorEmployeeWages,
            result,
            loading,
        } = useQuery(queries.getEmployeeWages, originData, () => ({
            fetchPolicy: "no-cache",
        }));
    }
  };
  
  export default actions;
