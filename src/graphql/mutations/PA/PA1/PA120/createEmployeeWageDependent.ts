import gql from "graphql-tag";
export default gql`
  mutation createEmployeeWageDependent($companyId:Int!,$imputedYear:Int!,$employeeId:Int!,$input:EmployeeWageDependentCreateInput!) {
    createEmployeeWageDependent(companyId:$companyId,imputedYear:$imputedYear,input:$input){
      employeeId
      incomeTypeCode
      index
      relation
      name
      foreigner
      residentIdValidity
      basicDeduction
      women
      singleParent
      senior
      disabled
      maternityAdoption
      descendant
      consignmentRelationship
      householder
      residentId
  }
  }
`;
