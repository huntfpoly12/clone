import gql from "graphql-tag";
export default gql`
mutation createMyCompanyUser( 
            $companyId : Int!,
            $input : CompanyUserCreateInput!, 
        ) {
            createMyCompanyUser( 
            companyId : $companyId,
            input : $input 
            ){
                id
            }
            
}
`