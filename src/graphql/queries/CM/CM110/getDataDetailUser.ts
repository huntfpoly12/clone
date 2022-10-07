import gql from "graphql-tag";
export default gql`
    query
        getMyCompany(
            $companyId: Int!,  
        ) {
            searchSalesRepresentatives(
                filter: { 
                    companyId:  $companyId,  
                }
                ) {
                    datas {
                        id
                        name
                    }
                }
        }
    
    
`