import gql from "graphql-tag";
export default gql`
    query
        searchSalesRepresentatives(
            $page: Int, 
            $rows: Int!, 
            $grade: Int!
            $name: String
            $code: String
            $statuses: [Int!]!
        ) {
            searchSalesRepresentatives(
                filter: { 
                    page:  $page, 
                    rows:  $rows, 
                    grade: $grade, 
                    name:  $name, 
                    code:  $code, 
                    statuses: $statuses,  
                }
                ) {
                    datas {
                        id
                        name
                    }
                }
        }
    
    
`