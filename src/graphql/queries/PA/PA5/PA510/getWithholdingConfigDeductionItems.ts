import gql from "graphql-tag";
export default gql`
  query getWithholdingConfigDeductionItems($companyId: Int!, $imputedYear: Int!) {
    getWithholdingConfigDeductionItems(companyId: $companyId, imputedYear: $imputedYear, useOnly : true) {
      itemCode
      name
      deductionItemCode
    }
  }
`;
