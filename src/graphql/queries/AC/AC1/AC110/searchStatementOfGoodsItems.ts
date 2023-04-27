import gql from "graphql-tag";
export default gql`
  query searchStatementOfGoodsItems($companyId: Int!, $keyword: String) {
    searchStatementOfGoodsItems(companyId: $companyId, keyword: $keyword) 
  }
`;
