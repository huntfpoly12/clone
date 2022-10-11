import gql from "graphql-tag";
export default gql`
mutation sendEmailToResetMyCompanyUserPassword( 
            $companyId : Int!,
            $userId : Int!, 
        ) {
            sendEmailToResetMyCompanyUserPassword( 
            companyId : $companyId,
            userId : $userId 
            )
            
}
`