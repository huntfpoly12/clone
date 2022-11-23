import gql from "graphql-tag";
export default gql`
    query
    searchIncomeRetirementWithholdingReceipts($companyId: Int!){
            searchIncomeRetirementWithholdingReceipts(companyId: $companyId,) { 
            }
        }`;
