import gql from "graphql-tag";
export default gql`
mutation sendEmailToResetUserPassword( 
            $userId : Int!, 
        ) {
            sendEmailToResetUserPassword( 
            userId : $userId 
            )
            
}
`