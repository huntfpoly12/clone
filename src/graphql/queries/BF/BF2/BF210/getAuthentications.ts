import gql from "graphql-tag";
export default gql`  
  query getAuthentications($userId: Int!, $page: Int, $rows: Int!) {
    getAuthentications(
        userId: $userId,
        filter: {
            page: $page,
            rows: $rows
        }
    ){
      totalCount
      page
      rows
      datas {
        status
        message
        cause
        createdAt
        ip
        success
      }
    }
  }

`