import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries1 from "@/graphql/queries/PA/PA1/PA120/index";
import queries2 from "@/graphql/queries/PA/PA2/PA230/index";
import screenActionPA720 from './screenActions/screenActionPA720'
import screenActionPA520 from './screenActions/screenActionPA520';
import screenActionPA420 from './screenActions/screenActionPA420';
import screenActionAC520 from './screenActions/screenActionAC520';
import {ActionTree} from "vuex";
import {TypeCommonState} from "@/store/commonModule/index";
import screenActionPA410 from './screenActions/screenActionPA410';
import screenActionPA120 from './screenActions/screenActionPA120';
const actions: ActionTree<TypeCommonState, any> = {
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
    ...screenActionPA520,
    ...screenActionPA410,
    ...screenActionPA420,
    ...screenActionAC520,
    ...screenActionPA120,
  };

  export default actions;
