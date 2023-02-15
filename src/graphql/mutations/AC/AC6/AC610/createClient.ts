import gql from "graphql-tag";
export default gql`
    mutation createClient($companyId: Int!, $input: ClientInput!) {
        createClient(companyId: $companyId, input: $input) {
            clientId
            name
            bizNumber
            presidentName
            phone
            use
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            residentId
        }
    }
`;
