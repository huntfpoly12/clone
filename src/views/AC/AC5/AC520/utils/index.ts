import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520";

export const initialState = {
  index : 0,
  employeePaySum: null,
  expenditureBudgetSum: null,
  revenueBudgetSum: null,
  createdAt: new Date().getTime(),
  status: 10
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
interface Employee {
  classification: number;
  salary?: number;
  allowance?: number;
  dailyAllowance?: number;
  retirementReserve?: number;
  socialInsuranceLevy?: number;
}

interface Result {
  salary1: number;
  salary2: number;
  allowance1: number;
  allowance2: number;
  dailyAllowance1: number;
  dailyAllowance2: number;
  retirementReserve1: number;
  retirementReserve2: number;
  socialInsuranceLevy1: number;
  socialInsuranceLevy2: number;
  total1: number;
  total2: number;
  total: number;
}

export function calculateEmployeeResult(employees: Employee[]): Result {
  const initialValue: Result = {
    salary1: 0,
    salary2: 0,
    allowance1: 0,
    allowance2: 0,
    dailyAllowance1: 0,
    dailyAllowance2: 0,
    retirementReserve1: 0,
    retirementReserve2: 0,
    socialInsuranceLevy1: 0,
    socialInsuranceLevy2: 0,
    total1: 0,
    total2: 0,
    total: 0,
  };
  if(!employees || employees.length === 0) return initialValue;
  const result = employees.reduce((acc: Result, item: Employee) => {
    const {
      classification,
      salary = 0,
      allowance = 0,
      dailyAllowance = 0,
      retirementReserve = 0,
      socialInsuranceLevy = 0,
    } = item;

    if (classification === 1) {
      acc.salary1 += salary;
      acc.allowance1 += allowance;
      acc.dailyAllowance1 += dailyAllowance;
      acc.retirementReserve1 += retirementReserve;
      acc.socialInsuranceLevy1 += socialInsuranceLevy;
    } else if (classification === 2) {
      acc.salary2 += salary;
      acc.allowance2 += allowance;
      acc.dailyAllowance2 += dailyAllowance;
      acc.retirementReserve2 += retirementReserve;
      acc.socialInsuranceLevy2 += socialInsuranceLevy;
    }
    acc.total1 = acc.salary1 + acc.allowance1 + acc.dailyAllowance1 + acc.retirementReserve1 + acc.socialInsuranceLevy1;
    acc.total2 = acc.salary2 + acc.allowance2 + acc.dailyAllowance2 + acc.retirementReserve2 + acc.socialInsuranceLevy2;
    acc.total = acc.total1 + acc.total2;
    return acc;
  }, initialValue);

  return result;
}