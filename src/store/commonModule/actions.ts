import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries1 from "@/graphql/queries/PA/PA1/PA120/index";
import queries2 from "@/graphql/queries/PA/PA2/PA230/index";
import screenActionPA720 from './screenActions/screenActionPA720'
const actions = {
    getListEmployee: (context: any, originData: any) => {
    
        let dataEmployee: any = ref([]);
        const {
            loading: loading1,
            result : resultEmployeeWages,
        } = useQuery(queries1.getEmployeeWages, originData, () => ({
            fetchPolicy: "no-cache",
        }));
        const {
            refetch,
            loading: loading2,
            result : resultEmployeeWageDailies,
        } = useQuery(queries2.getEmployeeWageDailies, originData, () => ({
          
            fetchPolicy: "no-cache",
        }));
        if (loading1 && loading2) {
            //dataEmployee = resultEmployeeWages
            watch(resultEmployeeWages, value => {
                value.getEmployeeWages.map((item: any) => { 
                    dataEmployee.value.push(item)
                })
            })
            watch(resultEmployeeWageDailies, value => {
                value.getEmployeeWageDailies.map((item: any) => {
                    if(item.retirementIncome) {
                        dataEmployee.value.push(item) 
                    }
                   
                })
            })
           
        }
        context.commit('loadDataEmployee',dataEmployee)  
        
    },
    ...screenActionPA720,
  };
  
  export default actions;
