import gql from "graphql-tag";
export default gql`
query me {
  me {
    type
    username
    name
    mobilePhone
    email
    president
    managerGrade
    createdAt
    updatedAt
  }
}
`