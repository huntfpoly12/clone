import gql from "graphql-tag";
export default gql`
  mutation saveEmployeeWagePayDeductionReduction($companyId:Int!,$imputedYear:Int!,$employeeId: Int!,$input:EmployeeWagePayDeductionReductionInput!) {
    saveEmployeeWagePayDeductionReduction(companyId:$companyId,imputedYear:$imputedYear,employeeId: $employeeId,input:$input){
    employeeId
  }
  }
`;
