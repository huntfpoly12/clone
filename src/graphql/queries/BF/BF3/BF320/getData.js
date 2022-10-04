import gql from "graphql-tag";

export default gql`
query searchCompanies ($page: Int!, $rows: Int!, $excludeCancel: Boolean!) {
  searchCompanies (filter: { page: $page, rows: $rows, excludeCancel: $excludeCancel }) {
    datas {
      name
    }
  }
}
`