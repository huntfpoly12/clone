import gql from "graphql-tag";
export default gql`
  query getWithholdingConfigPayItems($companyId: Int!, $imputedYear: Int!,$useOnly:Boolean) {
    getWithholdingConfigPayItems(companyId: $companyId, imputedYear: $imputedYear, useOnly : $useOnly) {
      itemCode
      name
    }
  }
`;
