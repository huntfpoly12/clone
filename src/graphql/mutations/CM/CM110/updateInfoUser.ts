import gql from "graphql-tag";
export default gql`
mutation updateMyCompanyUser( 
            $companyId : Int!,
            $userId : Int!,
            $input : CompanyUserUpdateInput!
        ) {
        updateMyCompanyUser( 
            companyId : $companyId,
            userId : $userId
            input: $input
            )
            {
                username
            }
}
`