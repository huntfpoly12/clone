import gql from "graphql-tag";
export default gql`
  query getWithholdingConfigPayItems($companyId: Int!, $imputedYear: Int!) {
    getWithholdingConfigPayItems(companyId: $companyId, imputedYear: $imputedYear, useOnly : true) {
      itemCode
      name
      taxPayItemCode
      taxPayItemName
      taxfreePayItemCode
      taxfreePayItemName
      taxFreeIncludeSubmission
    }
  }
`;
