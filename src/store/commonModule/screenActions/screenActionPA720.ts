import queries from "@/graphql/queries/PA/PA7/PA720/index";
import { useQuery } from "@vue/apollo-composable";

const screenActionPA720 = {
  formPA720(context: any, payload: any) {
    context.commit("formPA720", {
      input: {
        ...payload.input,
        paymentDay:
          payload.input.paymentDay || context.state.common.paymentDayPA720,
      },
    });
  },
  employSelect: (context: any, payload: any) => {
    const { onResult } = useQuery(queries.getEmployeeExtras, payload, () => ({
      fetchPolicy: "no-cache",
    }));
    onResult((res: any) => {
      let arrayEmploySelect = res.data.getEmployeeExtras.map((item: any) => ({
        ...item,
        key: item.employeeId,
      }));
      context.commit('employSelect', arrayEmploySelect)
    });
    // watch(resultEmployeeExtras, (newValue: any) => {
    //   let arrayEmploySelect = newValue.getEmployeeExtras.map((item: any) => ({
    //     ...item, key: item.employeeId
    //   }));
    // });
  },
};

export default screenActionPA720;
