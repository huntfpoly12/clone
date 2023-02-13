import gql from "graphql-tag";
export default gql`
    mutation updateClient($companyId: Int!, $clientId: Int!, $input: ClientInput!) {
        updateClient(companyId: $companyId, clientId: $clientId, input: $input) {
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
