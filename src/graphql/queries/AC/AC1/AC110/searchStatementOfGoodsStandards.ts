import gql from "graphql-tag";
export default gql`
  query searchStatementOfGoodsStandards($companyId: Int!) {
    searchStatementOfGoodsStandards(companyId: $companyId, keyword: $keyword) {
      scalar
    }
  }
`;
