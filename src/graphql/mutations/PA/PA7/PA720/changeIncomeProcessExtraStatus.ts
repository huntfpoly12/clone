import gql from "graphql-tag";
export default gql`
mutation changeIncomeProcessExtraStatus(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $status: ProcessStatusScalar!
  ) {
    changeIncomeProcessExtraStatus(
      companyId: $companyId
      processKey: $processKey
      status: $status
    ) {
      companyId 
      type 
      imputedYear 
      imputedMonth 
      paymentYear 
      paymentMonth 
    }
  }
`;