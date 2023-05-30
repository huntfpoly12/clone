import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520";

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
interface IGetBudgetSummaryTableReportViewUrl extends IGetEmployeePayTableReportViewUrl {}
interface IGetBudgetReportViewUrl extends IGetEmployeePayTableReportViewUrl {
  displayCode: boolean
  type: number
}
// v3
export const useGetEmployeePayTableReportViewUrl = (dataQuery: IGetEmployeePayTableReportViewUrl) => {
  const { result , loading, error, onResult } = useQuery(queries.getEmployeePayTableReportViewUrl,
    dataQuery,
    () => ({
      fetchPolicy: "no-cache",
    }));
  return { result, loading, error, onResult };
}
// v2
export const useGetBudgetSummaryTableReportViewUrl = (dataQuery: IGetBudgetSummaryTableReportViewUrl) => {
  const { result , loading, error, onResult } = useQuery(queries.getBudgetSummaryTableReportViewUrl,
    dataQuery,
    () => ({
      fetchPolicy: "no-cache",
    }));
  return { result, loading, error, onResult };
}

export const useGetBudgetReportViewUrl = (dataQuery: IGetBudgetReportViewUrl) => {
  console.log('dataQuery', dataQuery)
  const { result , loading, error, onResult } = useQuery(queries.getBudgetReportViewUrl,
    {...dataQuery},
    () => ({
      fetchPolicy: "no-cache",
    }));
  return { result, loading, error, onResult };
}
