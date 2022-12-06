import gql from "graphql-tag";
export default gql`
  query getWithholdingConfigPayItems(
    $companyId: Int!
    $imputedYear: Int!
    $useOnly: Boolean
  ) {
    getWithholdingConfigPayItems(
      companyId: $companyId
      imputedYear: $imputedYear
      useOnly: $useOnly
    ) {
      itemCode
      name
      taxPayItemCode
      taxPayItemName
      taxfreePayItemCode
      taxfreePayItemName
      monthlyLimit
      annualLimit
      tax
      taxFreeIncludeSubmission
      use
      sort
      formula
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      editable
    }
  }
`;
