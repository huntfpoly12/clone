import gql from "graphql-tag";
export default gql`
  query getWithholdingConfigDeductionItems(
    $companyId: Int!
    $imputedYear: Int!
    $useOnly: Boolean
  ) {
    getWithholdingConfigDeductionItems(
      companyId: $companyId
      imputedYear: $imputedYear
      useOnly: $useOnly
    ) {
      itemCode
      name
      deductionItemCode
      static
      formula
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    }
  }
`;
