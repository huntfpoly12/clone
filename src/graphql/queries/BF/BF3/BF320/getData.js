import gql from "graphql-tag";
const queries = {
  findParters: gql`
      query searchCompanies ($page: Int!, $rows: Int!, $excludeCancel: Boolean!) {
        searchCompanies (filter: { page: $page, rows: $rows, excludeCancel: $excludeCancel }) {
          datas {
            name
          }
        }
      }
    `,

};

export default queries;