import gql from "graphql-tag";
export default gql`
mutation updateMyCompany( 
            $companyId : Int!,
            $input : MyCompanyChangeInput!
        ) {
        updateMyCompany( 
            companyId : $companyId,
            input: $input)
            {
                code
                name
            }
}
`