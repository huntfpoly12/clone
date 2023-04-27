import gql from "graphql-tag";
export default gql`
  query searchStatementOfGoodsUnits($companyId: Int!, $keyword: String) {
    searchStatementOfGoodsUnits(companyId: $companyId, keyword: $keyword)
  }
`;
