import gql from "graphql-tag";
export default gql`
    query isBackerRegistableBizNumber($companyId: Int!, $bizNumber: String!) {
      isBackerRegistableBizNumber(companyId: $companyId, residentId: $bizNumber)
    }
`;
