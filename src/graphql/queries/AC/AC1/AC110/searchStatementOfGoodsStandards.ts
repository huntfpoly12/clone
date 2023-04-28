import gql from "graphql-tag";
export default gql`
  query searchStatementOfGoodsStandards($companyId: Int!, $keyword: String) {
    searchStatementOfGoodsStandards(companyId: $companyId, keyword: $keyword)
  }
`;
