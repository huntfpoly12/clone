import {useQuery} from "@vue/apollo-composable";
import GET_EMPLOYEE_PAY_TABLE_REPORT_VIEW_URL from "@/graphql/queries/AC/AC5/AC520/getEmployeePayTableReportViewUrl";
import {Ref, UnwrapNestedRefs} from "vue";
export const initialState = {
  index : 0,
  employeePaySum: null,
  expenditureBudgetSum: null,
  revenueBudgetSum: null,
  createdAt: new Date().getTime()
}
// create function get data from useQuery hook
interface IGetEmployeePayTableReportViewUrl {
  companyId: number
  fiscalYear: number
  facilityBusinessId: number
  index: number
}
export const useGetEmployeePayTableReportViewUrl = (dataQuery: IGetEmployeePayTableReportViewUrl) => {
  const { result , loading, error, onResult } = useQuery(GET_EMPLOYEE_PAY_TABLE_REPORT_VIEW_URL,
    dataQuery,
    () => ({
      fetchPolicy: "no-cache",
    }));
  return { result, loading, error, onResult };
}
