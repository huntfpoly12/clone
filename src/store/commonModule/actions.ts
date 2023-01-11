import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries1 from "@/graphql/queries/PA/PA1/PA120/index";
import queries2 from "@/graphql/queries/PA/PA2/PA230/index";
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
            result : searchIncomeWageWithholdingTaxByEmployees,
        } = useQuery(queries2.searchIncomeWageWithholdingTaxByEmployees, originData, () => ({
          
            fetchPolicy: "no-cache",
        }));
        if (loading1 && loading2) { 
            watch(resultEmployeeWages, value => {
                value.getEmployeeWages.map((item: any) => { 
                    dataEmployee.value.push(item)
                })
            })
            watch(searchIncomeWageWithholdingTaxByEmployees, value => {
                value.searchIncomeWageWithholdingTaxByEmployees.map((item: any) => {
                    if(item.retirementIncome) {
                        dataEmployee.value.push(item) 
                    }
                   
                })
            })
           
        }
        context.commit('loadDataEmployee',dataEmployee)  
        
    }
  };
  
  export default actions;
