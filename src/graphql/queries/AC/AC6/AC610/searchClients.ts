import gql from "graphql-tag";
export default gql`
    query searchClients($companyId: Int!, $filter: ClientSearchFilter!) {
        searchClients(companyId: $companyId, filter: $filter) {
            totalCount
            page
            rows
            datas {
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
    }
`;
