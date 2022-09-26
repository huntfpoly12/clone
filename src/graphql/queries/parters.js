import gql from "graphql-tag";
const queries = {
  findParters: gql`
      query searchPublicInstitutions {
        CompetentTaxOfficeLegalDong  {
            id
            code
            name
            description
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
        }
      }
    `,

};

export default queries;